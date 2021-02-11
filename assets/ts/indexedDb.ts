import { STATE_ID } from '~/assets/ts/variables';

/** データベースの名前 */
const DB_NAME = 'KADAINO_FUSEN';
/** データベースのバージョン */
const DB_VERSION = 1;
/** データベースのストア名 */
export const DB_STORE_NAME = {
    STATE_PANEL_LIST: 'statePanelList',
    CATEGORY_LIST: 'categoryList',
    TASK_LIST: 'taskList',
};

/** データベースの取得 */
export const openDb = (
    upgradeProcess: (
        e: IDBVersionChangeEvent,
        request: IDBOpenDBRequest
    ) => void
): Promise<IDBDatabase> => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);

    return new Promise((resolve, reject) => {
        request.addEventListener('error', (e) => {
            reject((e.target as IDBOpenDBRequest).error);
        });
        request.addEventListener(
            'upgradeneeded',
            (e: IDBVersionChangeEvent) => {
                upgradeProcess(e, request);
            }
        );
        request.addEventListener('success', (e: Event) => {
            resolve((e.target as IDBOpenDBRequest).result);
        });
    });
};
/** データベースの初期化（バージョンアップ含む）処理 */
export const dbUpgradeProcess = (
    e: IDBVersionChangeEvent,
    request: IDBOpenDBRequest
): void => {
    const db = (e.target as IDBOpenDBRequest).result;
    const oldVersion = e.oldVersion;

    if (oldVersion < 1) {
        const transaction = request.transaction as IDBTransaction;

        db.createObjectStore(DB_STORE_NAME.STATE_PANEL_LIST, { keyPath: 'id' });
        db.createObjectStore(DB_STORE_NAME.CATEGORY_LIST, { keyPath: 'id' });
        db.createObjectStore(DB_STORE_NAME.TASK_LIST, { keyPath: 'id' });

        const statePanelListStore = transaction.objectStore(
            DB_STORE_NAME.STATE_PANEL_LIST
        );
        const statePanelListStoreInitData = [
            {
                id: STATE_ID.FUTURE,
                label: '未対応',
                isActive: true,
                sortType: 'registerAsc',
            },
            {
                id: STATE_ID.TODO,
                label: '対応予定',
                isActive: true,
                sortType: 'registerAsc',
            },
            {
                id: STATE_ID.DOING,
                label: '対応中',
                isActive: true,
                sortType: 'registerAsc',
            },
            {
                id: STATE_ID.DONE,
                label: '完了',
                isActive: true,
                sortType: 'registerAsc',
            },
        ];
        statePanelListStoreInitData.forEach((data) => {
            statePanelListStore.add(data);
        });

        const categoryListStore = transaction.objectStore(
            DB_STORE_NAME.CATEGORY_LIST
        );
        const categoryListStoreInitData = {
            id: 1,
            label: '未分類',
            isActive: true,
        };
        categoryListStore.add(categoryListStoreInitData);
    }
};
/** 指定されたDBストアにデータを追加する */
export const addDbData = (
    db: IDBDatabase,
    storeName: string,
    data: { id: number }
): Promise<IDBDatabase> => {
    return new Promise((resolve, reject) => {
        const transaction = db.transaction(storeName, 'readwrite');
        const objectStore = transaction.objectStore(storeName);
        const request = objectStore.add(data);

        request.addEventListener('error', (e) => {
            reject((e.target as IDBRequest).error);
        });
        request.addEventListener('success', () => resolve);
    });
};
/** 指定されたDBストアにデータを追加（データが既に存在すれば更新）する */
export const putDbData = (
    db: IDBDatabase,
    storeName: string,
    data: { id: number }
): Promise<IDBDatabase> => {
    return new Promise((resolve, reject) => {
        const transaction = db.transaction(storeName, 'readwrite');
        const objectStore = transaction.objectStore(storeName);
        const request = objectStore.put(data);

        request.addEventListener('error', (e) => {
            reject((e.target as IDBRequest).error);
        });
        request.addEventListener('success', () => resolve);
    });
};
/** 指定されたDBストアの全データを取得する */
export const getAllDbData = (
    db: IDBDatabase,
    storeName: string
): Promise<any[]> => {
    return new Promise((resolve, reject) => {
        const transaction = db.transaction(storeName, 'readonly');
        const objectStore = transaction.objectStore(storeName);
        const request = objectStore.getAll();

        request.addEventListener('error', (e) => {
            reject((e.target as IDBRequest).error);
        });
        request.addEventListener('success', (e) => {
            resolve((e.target as IDBRequest).result);
        });
    });
};
/** idを基に指定されたDBストアのデータを削除する */
export const deleteDbData = (
    db: IDBDatabase,
    storeName: string,
    id: number
): Promise<undefined> => {
    return new Promise((resolve, reject) => {
        const transaction = db.transaction(storeName, 'readwrite');
        const objectStore = transaction.objectStore(storeName);
        const request = objectStore.delete(id);

        request.addEventListener('error', (e) => {
            reject((e.target as IDBRequest).error);
        });
        request.addEventListener('success', () => resolve);
    });
};
