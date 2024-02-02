const Router = require('express').Router;
const NoteController = require('../controllers/note-controller')
const authMiddleware = require('../middlewares/auth-middleware')
const router = new Router();

router.get('',authMiddleware, NoteController.GetNotes);
router.post('',authMiddleware, NoteController.AddNote);
router.put('',authMiddleware, NoteController.EditNote);
router.delete('',authMiddleware, NoteController.DeleteNote);

module.exports = router