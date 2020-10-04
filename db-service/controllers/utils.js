function base64ToJson(data) {
  try {
    return JSON.parse(Buffer.from(data, 'base64').toString());
  } catch (error) {
    return null;
  }
};

module.exports = {
  base64ToJson,
};
