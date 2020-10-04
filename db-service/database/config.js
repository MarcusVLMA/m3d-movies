const low = require("lowdb");
const FileSync = require("lowdb/adapters/FileSync");

const adapter = new FileSync(__dirname + "/data/db.json");
const db = low(adapter);

const defaultData = require("./data/defaultData.json");

db.defaults(defaultData).write();
module.exports = db;
