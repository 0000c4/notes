import React,{useContext} from 'react';
import styles from './Nsearch.module.css'
import SyncAnim from '../SyncAnim/SyncAnim';
import Context from '../..';
import { observer } from 'mobx-react-lite';
function Nsearch({search, setSearch}) {
    const { store } = useContext(Context)
    return (
        <div className={styles.search__container}>
            {store.isSync ?
                  <SyncAnim></SyncAnim>
                : <input className={styles.search} type="text" placeholder="Search" 
                    value={search}
                    onChange={(e)=>{setSearch(e.target.value);console.log(store.isSync)}}
                />
            }
        </div>
    )
}

export default observer(Nsearch);