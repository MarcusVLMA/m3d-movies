const db = require("./config");

const MOVIES_PER_PAGE = 15;

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
  // if (name) {
  //   const titleNameToSearch = title.title.toLowerCase();
  //   const nameToSearch = name.toLowerCase();

  //   return titleNameToSearch.includes(nameToSearch);
  // } else {
  //   return true;
  // }
}

function getTitlesPending() {
  const title = db.get("titles").find({ status:"pending" }).value();
  return title;
}

function getTitlePending(id) {
  const title = db.get("titles").find({ id, status:"pending" }).value();
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

function _getMoviesAmountInfos(name) {
  const allTitles = db
    .get("titles")
    .filter((title) => _filterTitle(title, name))
    .value();

  return {
    totalCount: allTitles.length,
    totalPages: Math.ceil(allTitles.length / MOVIES_PER_PAGE) + 1,
  };
}

function searchTitles(searchParams, page) {
  const moviesAmountInfos = _getMoviesAmountInfos(searchParams);
  if (page > moviesAmountInfos.totalPages) {
    page = moviesAmountInfos.totalPages - 1;
  }
  const offset = (page - 1) * MOVIES_PER_PAGE;

  const titles = db
    .get("titles")
    .filter((title) => _filterTitle(title, searchParams))
    .slice(offset, offset + MOVIES_PER_PAGE)
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

function updateTitle(titleInfo) {
  const updatedTitle = db
    .get("titles")
    .find({ id: titleInfo.id })
    .assign(titleInfo)
    .write();

  return updatedTitle;
}

function removeTitle(titleId) {
  db.get("titles")
  .remove({ id: titleId })
  .write();

  db.get("title_commentaries")
  .remove({ title_id: titleId })
  .write();
}

function removeCommentaries(userId) {
  db.get("title_commentaries")
  .remove({ profile_id: userId })
  .write();
}

function countTitle(searchParams) {
  if (searchParams) {
    const titles = db.get("titles").find(searchParams).value();
    return titles ? Object.keys(titles).length : 0;
  } else {
    return 0;
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
};
