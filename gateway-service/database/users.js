require('dotenv-safe').config();
const axios = require('axios');
const { jsonToBase64 } = require("./utils");

async function createUser(userInfo) {

  return axios.post(`${process.env.DB_SERVICE}/user`, userInfo)
  .then(resp => {
    return resp.data;
  })
  .catch(err => {
    return null;
  });
}

async function getUser(id) {
  return axios.get(`${process.env.DB_SERVICE}/user/${id}`)
  .then((resp) => {
    return resp.data;
  }).catch((err) => {
    return null;
  });
}

async function findUser(searchParams) {
  const encodedParams = jsonToBase64(searchParams);

  return axios.get(`${process.env.DB_SERVICE}/user/find/${encodedParams}`)
  .then(resp => {
    return resp.data;
  }).catch(err => {
    return null;
  });
}

function updateUser(userInfo) {

  return axios.put(`${process.env.DB_SERVICE}/user`, userInfo)
  .then(resp => {
    console.log(resp.data)
    return resp.data;
  })
  .catch(err => {
    console.log(err)
    return null;
  });
}

function removeUser(userId) {
  return axios.delete(`${process.env.DB_SERVICE}/user/${userId}`, )
  .then(resp => {
    return resp.data;
  })
  .catch(err => {
    console.log(err)
    return null;
  });
}

module.exports = {
  createUser,
  getUser,
  findUser,
  updateUser,
  removeUser,
};
