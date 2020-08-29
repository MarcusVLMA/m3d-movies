const db = require("./config");

function createTitle(titleInfo) {
  const titleExists = findUser({ title: titleInfo.title });

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

function searchTitles(name) {
  if (name) {
    const titles = db
      .get("titles")
      .filter((title) => {
        const titleNameToSearch = title.title.toLowerCase();
        const nameToSearch = name.toLowerCase();

        return titleNameToSearch.includes(nameToSearch);
      })
      .value();

    const titlesResponse = titles.map((title) => ({
      ...title,
      commentaries: getCommentaries(title.id),
    }));
    return titlesResponse;
  } else {
    const allTitles = db.get("titles").value();

    const titlesResponse = allTitles.map((title) => ({
      ...title,
      commentaries: getCommentaries(title.id),
    }));

    return titlesResponse;
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
  searchTitles,
  updateTitle,
};
