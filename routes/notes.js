const express = require("express");
const router = express.Router();
const fetchuser = require("../middlewares/fetchuser");
const { validateNote } = require("../validators/notesValidator");
const {
  handleFetchNote,
  handleCreateNote,
  handleUpdateNote,
  handleDeleteNote,
  handleFavorite,
} = require("../controllers/Notes");

// Route 1: fetch all the notes using GET => api/notes/fetchnotes
router.get("/fetchnotes", fetchuser, handleFetchNote);

// Route 2: Add a new note using POST => api/notes/addnote
router.post("/addnote", fetchuser, validateNote, handleCreateNote);

// Route 3: Update note using PUT => api/notes/updatenote
router.put("/updatenote/:id", fetchuser, validateNote, handleUpdateNote);

// Route 3: Update note using PUT => api/notes/updatenote
router.put("/updatefavorite/:id", fetchuser,  handleFavorite);

// Route 4: Delete an existing note using DELETE => api/notes/deletenote
router.delete("/deletenote/:id", fetchuser, handleDeleteNote);

module.exports = router;
