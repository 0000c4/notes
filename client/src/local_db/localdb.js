import { openDB } from "idb";
const db = await openDB('notes', 1, {
    upgrade(db) {
        // Create a store of objects
        const store = db.createObjectStore('notes', {
            // The 'id' property of the object will be the key.
            keyPath: '_id',
        });

    },
});
class localDb {
    
    tx = db.transaction('notes', 'readwrite');

    init = () =>{
        let openRequest = indexedDB.open("notes", 1);
        // создаём хранилище объектов для books, если ешё не существует
        openRequest.onupgradeneeded = function() {
          let db = openRequest.result;
          db.createObjectStore('notes', {keyPath: '_id'}); // создаём хранилище
          if (!db.objectStoreNames.contains('notes')) { // если хранилище "books" не существует

          }
        };
    }

    put = async ({ _id, body, title, status }) => {
        await db.put('notes', {
            _id: _id,
            title: title,
            body: body,
            status: status
        });
    }
    delete = async ( _id) => {
        await db.delete('notes', _id);
    }
    getAll = async () => {
        return await db.getAll('notes');

    }
    getOne = async (_id) => {
        return await db.get('notes',_id);
    }
}

export default new localDb();

