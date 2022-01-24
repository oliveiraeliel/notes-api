const mongoose = require("mongoose");

const noteSchema = mongoose.Schema(
  {
    title: String,
    text: String,
    username: String,
  },
  { timestamps: true }
);

const Note = mongoose.model("Note", noteSchema);
module.exports = Note;
