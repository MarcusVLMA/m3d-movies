const db = require("./config");

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
  console.log(id);
  const title = db.get("titles").find({ id }).value();
  console.log(title);
  const commentaries = getCommentaries(title.id);

  return {
    ...title,
    commentaries,
  };
}

function findTitle(searchParams) {
  if (searchParams) {
    const title = db.get("titles").find(searchParams).value();
    if (title){
      const commentaries = getCommentaries(title.id);
      return {
        ...title,
        commentaries,
      };
    } else {
      return;
    }
    
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
