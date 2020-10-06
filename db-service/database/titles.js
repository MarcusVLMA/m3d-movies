const db = require("./config");

const TITLES_PER_PAGE = 15;

function createTitle(titleInfo) {
  const titleExists = findTitle({ title: titleInfo.title });

  if (titleExists) {
    return null;
  } else {
    const createdTitle = db
      .get("titles")
      .push(titleInfo)
      .last()
      .assign({ id: Date.now().toString() })
      .write();

    return createdTitle;
  }
}

function _getCommentaries(title_id) {
  const commentaries = db
    .get("title_commentaries")
    .filter({ title_id })
    .value();

  const commentariesWithProfiles = [];

  commentaries.forEach((commentary) => {
    const profile = db
      .get("profiles")
      .find({ id: commentary.profile_id })
      .value();
    commentariesWithProfiles.push({
      ...commentary,
      profile,
    });
  });
  return commentariesWithProfiles;
}

function getTitle(id) {
  const title = db.get("titles").find({ id }).value();
  if (title) {
    const commentaries = _getCommentaries(title.id);

    return {
      ...title,
      commentaries,
    };
  } else {
    return null;
  }
}

function _filterTitle(title, searchParams = null) {
  if (searchParams) {
    const properties = Object.keys(searchParams);

    let response = true;
    for (let i = 0; i < properties.length; i++) {
      let propertyToSearch = title[properties[i]];
      if (typeof propertyToSearch === "string") {
        propertyToSearch = propertyToSearch.toLowerCase();
      }

      let providedValue = searchParams[properties[i]];
      if (typeof providedValue === "string") {
        providedValue = providedValue.toLowerCase();
      }

      if (!propertyToSearch.includes(providedValue)) {
        response = false;
        break;
      }
    }
    return response;
  } else {
    return true;
  }
}

function _orderTitles(first, second, orderBy) {
  const orderByTitleName = () => {
    if (first.title.toLowerCase() < second.title.toLowerCase()) {
      return orderBy === "a-z" ? -1 : 1;
    }
    if (first.title.toLowerCase() > second.title.toLowerCase()) {
      return orderBy === "a-z" ? 1 : -1;
    }
    return 0;
  };

  const orderByRelease = () => {
    if (first.release_date < second.release_date) {
      return 1;
    }
    if (first.release_date > second.release_date) {
      return -1;
    }
    return 0;
  };

  const orderByAvaliation = () => {
    if (first.vote_average < second.vote_average) {
      return 1;
    }
    if (first.vote_average > second.vote_average) {
      return -1;
    }
    return 0;
  };

  switch (orderBy) {
    case "a-z":
      return orderByTitleName();
    case "z-a":
      return orderByTitleName();
    case "release":
      return orderByRelease();
    case "avaliation":
      return orderByAvaliation();
    default:
      return orderByRelease();
  }
}

async function getTitlesPending(page) {

  const offset = (page - 1) * TITLES_PER_PAGE;

  let titles = db
    .get("titles")
    .filter({ "status": "pending" })
    .value();

  return {
    totalCount: titles.length,
    totalPages: Math.ceil(titles.length / TITLES_PER_PAGE) + 1,
    titles: titles.slice(offset, offset + TITLES_PER_PAGE),
  }
}

function getTitlePending(id) {
  const title = db.get("titles").find({ id, status: "pending" }).value();
  return title;
}

function findTitle(searchParams) {
  if (searchParams) {
    const title = db.get("titles").find(searchParams).value();
    if (title) {
      const commentaries = _getCommentaries(title.id);
      return {
        ...title,
        commentaries,
      };
    } else {
      return;
    }
  } else {
    return;
  }
}

function _getMoviesAmountInfos(searchParams, subset = null) {
  if (subset) {
    const allTitles = subset.filter((title) =>
      _filterTitle(title, searchParams)
    );

    return {
      totalCount: allTitles.length,
      totalPages: Math.ceil(allTitles.length / TITLES_PER_PAGE) + 1,
    };
  } else {
    const allTitles = db
      .get("titles")
      .filter((title) => _filterTitle(title, searchParams))
      .value();

    return {
      totalCount: allTitles.length,
      totalPages: Math.ceil(allTitles.length / TITLES_PER_PAGE) + 1,
    };
  }
}

function searchTitles(searchParams, page, orderBy) {
  const moviesAmountInfos = _getMoviesAmountInfos(searchParams);
  if (page > moviesAmountInfos.totalPages) {
    page = moviesAmountInfos.totalPages - 1;
  }
  const offset = (page - 1) * TITLES_PER_PAGE;

  const titles = db
    .get("titles")
    .filter((title) => _filterTitle(title, searchParams))
    .sort((first, second) => _orderTitles(first, second, orderBy))
    .slice(offset, offset + TITLES_PER_PAGE)
    .value();

  const titlesResponse = titles.map((title) => ({
    ...title,
    commentaries: _getCommentaries(title.id),
  }));

  return {
    titles: titlesResponse,
    ...moviesAmountInfos,
  };
}

function galleryTitles(profileId, searchParams, page, orderBy) {
  const profileGallery = db
    .get("profile_gallery")
    .find({ profile_id: profileId })
    .value();

  if (profileGallery) {
    const allTitles = [];

    profileGallery.title_ids.forEach((titleId) => {
      allTitles.push(findTitle({ id: titleId }));
    });

    const filteredTitles = allTitles
      .filter((title) => _filterTitle(title, searchParams))
      .sort((first, second) => _orderTitles(first, second, orderBy));

    const moviesAmountInfos = _getMoviesAmountInfos(
      searchParams,
      filteredTitles
    );
    if (page > moviesAmountInfos.totalPages) {
      page = moviesAmountInfos.totalPages - 1;
    }
    const offset = (page - 1) * TITLES_PER_PAGE;

    const paginatedTitles = filteredTitles.slice(
      offset,
      offset + TITLES_PER_PAGE
    );

    const titlesResponse = paginatedTitles.map((title) => ({
      ...title,
      commentaries: _getCommentaries(title.id),
    }));

    return {
      titles: titlesResponse,
      ...moviesAmountInfos,
    };
  } else {
    return { titles: [], totalCount: 0, totalPages: 1 };
  }
}

function allGalleryTitleIds(profileId) {
  const profileGallery = db
    .get("profile_gallery")
    .find({ profile_id: profileId })
    .value();

  if (profileGallery) {
    return profileGallery.title_ids;
  } else {
    return [];
  }
}

function addTitleToUserGallery(profileId, titleId) {
  const galleryTitles = allGalleryTitleIds(profileId);

  !galleryTitles.includes(titleId) && galleryTitles.push(titleId);

  const profileGallery = db
    .get("profile_gallery")
    .find({ profile_id: profileId }).value();

  let updatedProfileGallery;

  if (profileGallery) {
    updatedProfileGallery = db
      .get("profile_gallery")
      .find({ profile_id: profileId })
      .assign({ profile_id: profileId, title_ids: galleryTitles })
      .write();
  } else {
    updatedProfileGallery = db
      .get("profile_gallery")
      .push({ title_ids: galleryTitles })
      .last()
      .assign({ profile_id: profileId })
      .write();
  }

  return updatedProfileGallery;
}

function removeTitleFromUserGallery(profileId, titleId) {
  const currentGalleryTitles = allGalleryTitleIds(profileId);

  const galleryTitles = currentGalleryTitles.filter(
    (title_id) => title_id !== titleId
  );

  const updatedProfileGallery = db
    .get("profile_gallery")
    .find({ profile_id: profileId })
    .assign({ profile_id: profileId, title_ids: galleryTitles })
    .write();

  return updatedProfileGallery;
}

function updateTitle(titleInfo) {
  const updatedTitle = db
    .get("titles")
    .find({ id: titleInfo.id })
    .assign(titleInfo)
    .write();

  return updatedTitle;
}

function removeTitle(titleId) {
  db.get("title_commentaries").remove({ title_id: titleId }).write();
  return db.get("titles").remove({ id: titleId }).write();
}

function removeCommentaries(userId) {
  db.get("title_commentaries").remove({ profile_id: userId }).write();
}

function addCommentary(titleId, profileId, text) {
  const today = new Date();
  const day =
    today.getDate().toString().length === 1
      ? "0" + today.getDate().toString()
      : today.getDate().toString();

  const month =
    today.getMonth().toString().length === 1
      ? "0" + today.getMonth().toString()
      : today.getMonth().toString();

  const createdCommentary = db
    .get("title_commentaries")
    .push({
      title_id: titleId,
      profile_id: profileId,
      text,
      date: `${today.getFullYear()}-${month}-${day}`,
    })
    .last()
    .assign({ id: today.getTime().toString() })
    .write();

  return createdCommentary;
}

function removeCommentary(commentaryId) {
  try {
    db.get("title_commentaries").remove({ id: commentaryId }).write();
    return true;
  } catch (error) {
    return false;
  }
}

function countTitle(searchParams) {
  if (searchParams) {
    const titles = db.get("titles").find(searchParams).value();
    return titles ? Object.keys(titles).length : 0;
  } else {
    return 0;
  }
}

function titleAvaliationMean(title_id) {
  const aval = db.get("avaliation").filter({ title_id }).value();
  let med = 0;
  aval.forEach((avaliation) => {
    med += parseFloat(avaliation.entry);
  });
  med = Math.round(((med / aval.length) + Number.EPSILON) * 10) / 10;
  console.log('MED MED', med)
  if (isNaN(med)) {
    return 0;
  } else {
    return med;
  }
}

function addAvaliation(title_id, entry, user_id) {
  const title = findTitle({ id: title_id.toString() });
  const aval = db.get("avaliation").find({ title_id, user_id }).value();
  let addAvaliation;
  if (typeof aval === "undefined") {
    addAvaliation = db
      .get("avaliation")
      .push({
        title_id,
        entry,
        user_id,
        type: title.type,
      })
      .last()
      .write();
  } else {
    addAvaliation = db
      .get("avaliation")
      .find({ title_id, user_id })
      .assign({
        title_id,
        entry,
        user_id,
        type: title.type,
      })
      .write();
  }
  return addAvaliation;
}

function userAvaliationGet(title_id, user_id) {
  const aval = db
    .get("avaliation")
    .filter({ title_id })
    .find({ user_id })
    .value();
  if (typeof aval === "undefined") {
    return 0;
  } else {
    return parseFloat(aval.entry) * 10;
  }
}

module.exports = {
  createTitle,
  getTitle,
  searchTitles,
  updateTitle,
  getTitlesPending,
  getTitlePending,
  removeTitle,
  removeCommentaries,
  countTitle,
  allGalleryTitleIds,
  addCommentary,
  addTitleToUserGallery,
  galleryTitles,
  removeTitleFromUserGallery,
  removeCommentary,
  titleAvaliationMean,
  addAvaliation,
  userAvaliationGet,
};
