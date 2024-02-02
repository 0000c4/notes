const Note = require('../models/Note');
const User = require('../models/User');
const ApiError = require('../exceptions/api-error')

class NoteService{
    async AddNote(title, body, userId){
        const user = await User.findOne({_id: userId});
        if(!user){
            throw ApiError.BadRequest('user not found');
        }
        const note = await Note.create({
            title,
            body,
            user: userId
        })

        user.notes.push(note._id);
        await user.save();
        return note;
    }

    async DeleteNote(id, userId){
        const user = await User.findOne({_id: userId});
        if(!user){
            throw ApiError.BadRequest('user not found');
        }

        const note = await Note.deleteOne({_id: id, user: userId})
        console.log(note);
        user.notes = user.notes.filter(note=> note._id != id);
        await user.save();
        return user.notes;
    }

    async EditNote(title, body, id, userId){
        const note = await Note.findOne({_id: id, user: userId});
        if(!note){
            throw ApiError.BadRequest('note not found');
        }
        note.title = title;
        note.body = body;
        await note.save();
        return note;
    }
    async getNotes(userId){
        const notes = await Note.find({user: userId})
        return notes;
    }
}

module.exports = new NoteService();