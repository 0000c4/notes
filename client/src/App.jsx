import React, { useState, useEffect, useMemo, useContext } from 'react';
import { observer } from 'mobx-react-lite';
import Context from './index';
import Header from './components/Header';
import NoteList from './components/NoteList';
import Loading from './UI/Loading/Loading';
import localdb from './local_db/localdb';

function App() {
    const { store } = useContext(Context)
    const [search, setSearch] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        async function serverSync() {
            if (localStorage.getItem('token')) {
                await store.checkAuth();
            }
            await store.getNotes();
        }
        localdb.init()
        try {
            serverSync();

        } catch (error) {
            console.log(error)
        }
        finally {
            setIsLoading(false)
        }
    }, [])
    useMemo(() => {
        store.NoteSearch(search)
    }, [search, store.notes])
    return (
        <div>
            <Header search={search} setSearch={setSearch}></Header>
            <NoteList></NoteList>
            {isLoading &&
                <div style={{ display: 'flex', justifyContent: 'center' }}><Loading /></div>
            }
        </div>
    )
}

export default observer(App);