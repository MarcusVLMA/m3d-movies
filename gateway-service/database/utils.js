function jsonToBase64 (data) {
  try {
    return Buffer.from(JSON.stringify(data)).toString('base64');
  } catch (err) {
    return null;
  }
}

module.exports = {
  jsonToBase64,
};
