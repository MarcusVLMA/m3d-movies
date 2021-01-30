const axios = require('axios');
const { jsonToBase64 } = require("./utils");

function getTitle(id) {
  return axios.get(`${process.env.DB_SERVICE}/title/${id}`)
    .then(resp => {
      return resp.data;
    })
    .catch(err => {
      return null;
    });
}

async function getTitlesPending(page, orderBy) {

  return axios.get(`${process.env.DB_SERVICE}/title/pending/all/${page}`, { params: { orderBy } })
    .then(resp => {
      return resp.data;
    })
    .catch(err => {
      return null;
    });
}

function getTitlePending(id) {
  return axios.get(`${process.env.DB_SERVICE}/title/pending/${id}`)
    .then(resp => {
      return resp.data;
    })
    .catch(err => {
      return null;
    });
}

function searchTitles(searchParams, page, orderBy) {
  const encodedParams = jsonToBase64(searchParams);

  return axios.get(`${process.env.DB_SERVICE}/title/search/${encodedParams}/${page}/${orderBy}`)
    .then(resp => {
      return resp.data;
    })
    .catch(err => {
      return null;
    });
}

function galleryTitles(profileId, searchParams, page, orderBy) {
  const encodedParams = jsonToBase64(searchParams);

  return axios.get(
    `${process.env.DB_SERVICE}/user/${profileId}/gallery/${encodedParams}/${page}/${orderBy}`
  )
    .then(resp => {
      return resp.data;
    })
    .catch(err => {
      return null;
    });
}

function allGalleryTitleIds(profileId) {
  return axios.get(
    `${process.env.DB_SERVICE}/user/${profileId}/gallery`
  )
    .then(resp => {
      return resp.data;
    })
    .catch(err => {
      return null;
    });
}

function countTitle(searchParams) {
  const encodedParams = jsonToBase64(searchParams);

  return axios.get(`${process.env.DB_SERVICE}/title/count/${encodedParams}`)
    .then(resp => {
      return resp.data;
    })
    .catch(err => {
      return null;
    });
}

function createTitle(titleInfo) {

  return axios.post(`${process.env.DB_SERVICE}/title`, titleInfo)
    .then(resp => {
      return resp.data;
    })
    .catch(err => {
      return null;
    });
}

function updateTitle(titleInfo) {

  return axios.put(`${process.env.DB_SERVICE}/title`, titleInfo)
    .then(resp => {
      return resp.data;
    })
    .catch(err => {
      return null;
    });
}

function removeTitle(titleId) {

  return axios.delete(`${process.env.DB_SERVICE}/title/${titleId}`)
    .then(resp => {
      return resp.data;
    })
    .catch(err => {
      return null;
    });
}

function addTitleToUserGallery(profileId, titleId) {

  return axios.post(`${process.env.DB_SERVICE}/user/${profileId}/gallery`, { titleId })
    .then(resp => {
      return resp.data;
    })
    .catch(err => {
      return null;
    });
}

function removeTitleFromUserGallery(profileId, titleId) {

  return axios.delete(`${process.env.DB_SERVICE}/user/${profileId}/gallery/${titleId}`)
    .then(resp => {
      return resp.data;
    })
    .catch(err => {
      return null;
    });
}

function addCommentary(titleId, profileId, text) {

  return axios.post(`${process.env.DB_SERVICE}/title/${titleId}/commentary`, {
    profileId,
    text
  })
    .then(resp => {
      return resp.data;
    })
    .catch(err => {
      return null;
    });
}

function removeCommentary(commentaryId) {

  return axios.delete(`${process.env.DB_SERVICE}/title/commentary/${commentaryId}`)
    .then(resp => {
      return resp.data;
    })
    .catch(err => {
      return null;
    });
}

function createAvaliation(title_id, entry, userId) {
  return axios.post(`${process.env.DB_SERVICE}/title/avaliation`, {
    title_id, entry, userId
  })
    .then(resp => {
      return resp.data;
    })
    .catch(err => {
      return null;
    });
}

function titleAvaliationMean(title_id) {
  return axios.get(`${process.env.DB_SERVICE}/title/avaliation-mean/${title_id}`)
    .then(resp => {
      return resp.data;
    })
    .catch(err => {
      return null;
    });
}

function userAvaliationGet(title_id, user_id) {
  return axios.get(`${process.env.DB_SERVICE}/title/avaliation-user/${title_id}/${user_id}`)
    .then(resp => {
      return resp.data;
    })
    .catch(err => {
      return null;
    });
}

module.exports = {
  createTitle,
  getTitle,
  searchTitles,
  updateTitle,
  getTitlesPending,
  getTitlePending,
  removeTitle,
  countTitle,
  allGalleryTitleIds,
  addCommentary,
  addTitleToUserGallery,
  galleryTitles,
  removeTitleFromUserGallery,
  removeCommentary,
  createAvaliation,
  titleAvaliationMean,
  userAvaliationGet
};
