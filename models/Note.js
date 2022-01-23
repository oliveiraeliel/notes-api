const mongoose = require("mongoose");

const Note = mongoose.model("Note", {
  title: String,
  text: String,
  user: String,
});

module.exports = Note;