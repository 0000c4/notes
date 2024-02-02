import { makeAutoObservable } from 'mobx';
import AuthService from '../services/auth-service';
import noteService from '../services/note-service';
import localdb from '../local_db/localdb';
export default class Store {
    //auth data
    user = {};
    isAuth = false;

    //notes data
    notes = [];
    searchedNotes = [];
    //sync
    isSync = false;
    constructor() {
        makeAutoObservable(this);
    }
    setSync(isSync) {
        this.isSync = isSync;
    }
    setAuth(auth) {
        this.isAuth = auth;
    }
    setUser(user) {
        this.user = user;
    }

    setNotes(notes) {
        this.notes = notes;
    }
    setSearchedNotes(notes) {
        this.searchedNotes = notes;
    }

    async login(email, password) {
        try {
            const response = await AuthService.login(email, password);

            localStorage.setItem('token', response.accessToken);
            this.setAuth(true);
            this.setUser(response.user)
            this.getNotes();

        } catch (error) {
            console.log(error.response.data);
            return error.response.data;
        }
    }

    async registration(email, password, name) {
        try {
            const response = await AuthService.registration(email, password, name);
            console.log(response);
            localStorage.setItem('token', response.accessToken);
            this.setAuth(true);
            this.setUser(response.user);
        } catch (error) {
            return error.response.data;
        }
    }
    async logout() {
        try {
            console.log('logout')
            await AuthService.logout();
            localStorage.removeItem('token')
            this.setAuth(false);
            this.setUser({});
        } catch (error) {
            console.log(error);
        }
    }
    async checkAuth() {
        try {
            await this.syncWithServer()
            const response = await AuthService.checkAuth();
            localStorage.setItem('token', response.accessToken)
            this.setAuth(true);
            this.setUser(response.user)

        } catch (error) {

        }
    }

    async sendResetPasswordEmail(email) {
        try {
            const response = await AuthService.sendResetPasswordEmail(email);
            console.log(response)
        } catch (error) {
            //return error.response.data;
            console.log(error)
        }
    }

    //notes
    async getNotes() {
        let LocalNotes = await localdb.getAll()
        this.setNotes(LocalNotes.filter(note => note.status !== 'delete'));
        console.log(LocalNotes)
        noteService.get().then(async res => { //если сервер доступен проверяем нет ли новых заметок от сервера, если есть добавляем в бд и обновляем ьассив
            if (res.status == 200) {
                this.setSync(true)
                console.log('ну и где блять')
                res.data.forEach(async serverNote => { //проходимся по каждой заметки из сервера и проверяем по _id есть ли она в локальной бд
                    const isSynced = LocalNotes.find(element => element._id == serverNote._id)
                    if (isSynced == undefined) await localdb.put({ ...serverNote, status: 'sync' })

                });
                LocalNotes = await localdb.getAll()
                this.setNotes(LocalNotes.filter(note => note.status !== 'delete'));
                this.setSync(false)
            }

        })


    }
    async editNote(note, sync) {
        try {
            const isNew = await localdb.getOne(note._id)//сначала изменяем заметку в локалбд и стейте, если сервер доступен синхронизируемся с ним
            if (isNew.status == 'new') {//если заметка новая и её нет на сервере, оставляем статус new
                await localdb.put(note)
            }
            else {
                await localdb.put({ ...note, status: 'edit' })
            }

            this.setNotes(this.notes.map(elem => elem._id == note._id ? elem = note : elem))
            noteService.edit(note).then(res => {
                if (res.status == 200) {
                    this.setSync(true)
                    localdb.put({ ...res.data, status: 'sync' })
                    this.setSync(false)
                }
            })



        } catch (error) {
            console.log(error)
        }
        finally {
        }


    }
    async AddNote(note, sync) {
        try {
            // setIsSync(true)
            const localNote = { ...note, status: 'new', _id: new Date() } //сначала создаем заметку в бд
            await localdb.put(localNote)
            this.setNotes([...this.notes, localNote])
            noteService.add(note).then(res => { //если сервер доступен удаляем заметку из notes и меняем ее на валидную
                if (res.status == 200) {
                    this.setSync(true)
                    const syncNote = res.data;
                    const notes = this.notes.filter(e => e._id !== localNote._id)
                    localdb.delete(localNote._id)
                    localdb.put({ ...syncNote, status: 'sync' })
                    this.setNotes([...notes, syncNote])
                    this.setSync(false)
                }
            })

        } catch (error) {
            console.log(error);
        }
        finally {
            //setIsSync(false)
        }

    }
    async RemoveNote(note, sync) {
        try {
            const isNew = await localdb.getOne(note._id)

            if (isNew.status == 'new') {//если заметка новая и её нет на сервере удаляем полностью
                console.log(isNew)
                await localdb.delete(note._id)

            }
            else {
                await localdb.put({ ...note, status: 'delete' })//сначала меняем status заметки на delete
            }

            const notes = this.notes.filter(e => e._id !== note._id)
            noteService.delete(note).then(async res => { //если сервер доступен удаляем заметку из localdb
                if (res.status == 200) {
                    this.setSync(true)
                    await localdb.delete(note._id)
                    this.setSync(false)
                }
            })

            this.setNotes(notes)
        } catch (error) {

        }
    }
    async syncWithServer() {
        //блять я ни черта не понимаю ебучий индекседб какой же говнокод нахуй
        let transactions = []; //хранит массив операций для дальнейшего выполнения всего в одной транзакции
        noteService.get().then(async res => { //если сервер доступен синхронизируем локалбд и сервер
            if (res.status == 200) {
                this.setSync(true)
                const localNotes = await localdb.getAll();//получаем заметки из локалдб и проверяем их статус синхронизации
                localNotes.forEach(async note => {
                    console.log(note.status)
                    if (note.status == 'edit') {
                        const SyncedEdit = await noteService.edit(note)
                        if (SyncedEdit.status == 200) {
                            console.log('work blyat syka')
                            await localdb.put({ ...SyncedEdit.data, status: 'sync' })
                        }
                    }
                    else if (note.status == 'new') {
                        const SyncedNew = await noteService.add(note)
                        if (SyncedNew.status == 200) {

                            await localdb.delete(note._id)
                            await localdb.put({ ...SyncedNew.data, status: 'sync' })
                        }
                    }
                    else if (note.status == 'delete') {

                        const SyncedDelete = await noteService.delete(note)
                        if (SyncedDelete.status == 200) {
                            console.log('its work')
                            await localdb.delete(note._id)
                        }
                    }

                })
                this.setSync(false)
            }

        })
    }
    NoteSearch(search) {
        const notes = this.notes.filter(note => note.title.toLowerCase().includes(search.toLowerCase()))
            .concat(this.notes.filter(note => note.body.toLowerCase().includes(search.toLowerCase())))
        this.setSearchedNotes(notes);
    }
}
