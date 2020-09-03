const db = require("./config");

const MOVIES_PER_PAGE = 3;

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

function getTitlesPending() {
  const title = db.get("titles").find({ status:"pending" }).value();
  return title;
}

function getTitlePending(id) {
  const title = db.get("titles").find({ id, status:"pending" }).value();
  return title;
}


function _filterTitle(title, name) {
  if (name) {
    const titleNameToSearch = title.title.toLowerCase();
    const nameToSearch = name.toLowerCase();

    return titleNameToSearch.includes(nameToSearch);
  } else {
    return true;
  }
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
    totalPages: Math.ceil(allTitles.length / MOVIES_PER_PAGE),
  };
}

function searchTitles(name, page) {
  const offset = page * MOVIES_PER_PAGE;

  const titles = db
    .get("titles")
    .filter((title) => _filterTitle(title, name))
    .slice(offset, offset + MOVIES_PER_PAGE)
    .value();

  const titlesResponse = titles.map((title) => ({
    ...title,
    commentaries: _getCommentaries(title.id),
  }));

  return {
    titles: titlesResponse,
    ..._getMoviesAmountInfos(name),
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

module.exports = {
  createTitle,
  getTitle,
  searchTitles,
  updateTitle,
  getTitlesPending,
  getTitlePending
};
