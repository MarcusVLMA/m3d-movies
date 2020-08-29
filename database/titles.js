const db = require("./config");

function createTitle(titleInfo) {
  const titleExists = findUser({ title: titleInfo.title });

  if (titleExists) {
    return null;
  } else {
    const createdtitle = db
      .get("titles")
      .push(titleInfo)
      .last()
      .assign({ id: Date.now().toString() })
      .write();

    return createdTitle;
  }
}

function getCommentaries(title_id) {
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
  const commentaries = getCommentaries(title.id);

  return {
    ...title,
    commentaries,
  };
}

function findTitle(searchParams) {
  if (searchParams) {
    const title = db.get("titles").find(searchParams).value();
    const commentaries = getCommentaries(title.id);

    return {
      ...title,
      commentaries,
    };
  } else {
    const allTitles = db.get("titles").value();

    return allTitles;
  }
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
  findTitle,
  updateTitle,
};
