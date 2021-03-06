import {Storage} from '@ionic/storage';
/**
 * Created by zhaojunming on 16/11/7.
 */

export function ProvideStorage() {
    return new Storage(['sqlite', 'websql', 'indexeddb', 'localstorage'], {name: 'SPEED_CAR_CUSTOM'});
}

export const LOCAL_STORAGE_KEY = {
    USER: {
        USER_TOKEN_INFO: 'LOCAL_STORAGE_KEY:USER:USER_TOKEN_INFO',
        USER_INFO: 'LOCAL_STORAGE_KEY:USER:USER_INFO'
    },
    MEMORY_DATA: {
        LAST_USER_USERNAME: "LOCAL_STORAGE_KEY:MEMORY_DATA:LAST_USER_USERNAME"
    }
};

export const SESSION_STORAGE_KEY = {};