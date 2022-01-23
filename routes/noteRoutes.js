const Note = require("../models/Note");
const router = require("express").Router();

//create note
router.post("/", async (req, res) => {
  const { title, text, user } = req.body;
  const note = { title, text, user };

  try {
    await Note.create(note);
    res.status(201).json({ message: "Nota criada!" });
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

//view notes
router.get("/", async (req, res) => {
  try {
    const notes = await Note.find();
    res.status(200).json(notes);
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

router.get("/:id", async (req, res) => {
  const id = req.params.id;
  
  try {
    const notes = await Note.findOne({ _id: id });
    if (!notes) {
      res.status(422).json({ error: "User nao encontrado" });
      return;
    }
    res.status(200).json(notes);
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

//update notes
router.patch("/:id", async (req, res) => {
  const id = req.params.id;
  const { title, text, user } = req.body;
  const notes = { title, text, user };

  try {
    const updatedNote = await Note.updateOne({ _id: id }, notes);

    if (updatedNote.matchedCount === 0) {
      res.status(422).json({ message: "Nota nao encontrado" });
      return;
    }
    res.status(200).json(notes);
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

//delete notes
router.delete("/:id", async (req, res) => {
  const id = req.params.id;
  const notes = await Note.findOne({ _id: id });

  if (!notes) {
    res.status(422).json({ error: "User nao encontrado" });
    return;
  }

  try {
    await Note.deleteOne({ _id: id });
    res.status(200).json({ message: "Usuario deletado" });
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

module.exports = router;
