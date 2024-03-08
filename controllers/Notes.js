const Notes = require("../models/Notes");
const { body, validationResult } = require("express-validator");

const handleFetchNote = async (req, res) => {
  try {
    const notes = await Notes.find({ user: req.user });
    res.json({ notes });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

const handleCreateNote = async (req, res) => {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    return res.status(400).json({ errors: error.array() });
  }
  try {
    let { title, description, tag } = req.body;
    const notes = await new Notes({
      title,
      description,
      tag,
      user: req.user,
    });
    const result = await notes.save();
    res.status(201).json({ result });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

const handleUpdateNote = async (req, res) => {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    return res.status(400).json({ errors: error.array() });
  }
  try {
    // getting information
    let { title, description, tag } = req.body;
    let newNote = {
      title,
      description,
      tag,
    };

    // finding if note exists
    let note = await Notes.findById(req.params.id);
    if (!note) {
      return res.status(404).send("not found");
    }

    // finding if note belongs to user
    if (note.user.toString() !== req.user) {
      return res.status(401).send("access denied");
    }

    // updating the note
    note = await Notes.findByIdAndUpdate(
      req.params.id,
      { $set: newNote },
      { new: true }
    );
    res.json(note);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

const handleFavorite = async (req, res) => {
  try {
    // getting information
    let { check } = req.body;
    let newNote = {
      check,
    };

    // finding if note exists
    let note = await Notes.findById(req.params.id);
    if (!note) {
      return res.status(404).send("not found");
    }

    // finding if note belongs to user
    if (note.user.toString() !== req.user) {
      return res.status(401).send("access denied");
    }

    // updating the note
    note = await Notes.findByIdAndUpdate(
      req.params.id,
      { $set: newNote },
      { new: true }
    );
    res.json(note);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

const handleDeleteNote = async (req, res) => {
  try {
    // finding if the note exists
    let note = await Notes.findById(req.params.id);
    if (!note) {
      return res.status(404).send("not found");
    }

    // finding if note belongs to user
    if (note.user.toString() !== req.user) {
      return res.status(401).send("access denied");
    }

    // deleting the note
    let result = await Notes.findByIdAndDelete(req.params.id);
    res.send({ Sucess: "Note has been deleted", note: note });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {
  handleFetchNote,
  handleCreateNote,
  handleUpdateNote,
  handleDeleteNote,
  handleFavorite,
};
