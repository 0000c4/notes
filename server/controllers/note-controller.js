const NoteService = require('../service/note-service')
class NoteController{
    async AddNote(req, res, next){
        try {
            const {title, body} = req.body;
            const userId = req.user.id;
            const noteData = await NoteService.AddNote(title, body,userId);
            return res.json(noteData);
        } catch (error) {
            next();
        }
    }
    async DeleteNote(req, res, next){
            
        try {
            const id = req.query.id;
            console.log(`запрос на удаление ${id} получен`)
            const userId = req.user.id;
            const noteData = await NoteService.DeleteNote(id,userId);
            return res.json(noteData);
        } catch (error) {
            next();
        }
    }
    async EditNote(req, res, next){
        try {
            const {title, body, _id} = req.body;
            console.log(req.body)
            const userId = req.user.id;
            const noteData = await NoteService.EditNote(title, body, _id,userId);
            return res.json(noteData);
        } catch (error) {
            next();
        }
    }
    async GetNotes(req, res, next){
        try {
            const userId = req.user.id;
            const noteData = await NoteService.getNotes(userId);
            res.json(noteData);
        } catch (error) {
            console.log(error)
        }
    }
}
module.exports = new NoteController();