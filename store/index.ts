import { ActionTree, MutationTree } from 'vuex';
import { Task, Category, StatePanel, SortType } from '~/types/global';
import { State as CategoryState } from '~/store/category';
import { State as ConfigBoxState } from '~/store/configBox';
import { State as StatePanelState } from '~/store/statePanel';
import { State as TaskState } from '~/store/task';
import { State as ToastState } from '~/store/toast';
import {
    getAllDbData,
    addDbData,
    putDbData,
    deleteDbData,
    DB_STORE_NAME,
} from '~/assets/ts/indexedDb';

export interface State {
    db: IDBDatabase | null;
}
export interface ComplexState {
    db: IDBDatabase | null;
    category: CategoryState;
    configBox: ConfigBoxState;
    statePanel: StatePanelState;
    task: TaskState;
    toast: ToastState;
}

export const state = (): State => ({ db: null });
export const actions: ActionTree<ComplexState, State> = {
    /** DBのデータをストアに反映する */
    injectDbDataToStore({ commit }, db: IDBDatabase) {
        commit('setDb', db);

        getAllDbData(db, DB_STORE_NAME.STATE_PANEL_LIST).then((data) => {
            commit('statePanel/destructiveInject', data);
        });
        getAllDbData(db, DB_STORE_NAME.CATEGORY_LIST).then((data) => {
            commit('category/destructiveInject', data);
        });
        getAllDbData(db, DB_STORE_NAME.TASK_LIST).then((data) => {
            commit('task/destructiveInject', data);
        });
    },
    /** DBおよびStoreに課題を追加する */
    addTask({ state, commit }, task: Task) {
        addDbData(state.db as IDBDatabase, DB_STORE_NAME.TASK_LIST, task).then(
            () => {
                commit('task/addTask', task);
            }
        );
    },
    /** DBおよびStoreの課題を更新する */
    putTask({ state, commit }, task: Task) {
        putDbData(state.db as IDBDatabase, DB_STORE_NAME.TASK_LIST, task).then(
            () => {
                commit('task/putTask', task);
            }
        );
    },
    /** DBおよびStoreの課題を削除する */
    deleteTask({ state, commit }, id: number) {
        deleteDbData(state.db as IDBDatabase, DB_STORE_NAME.TASK_LIST, id).then(
            () => {
                commit('task/deleteTask', id);
            }
        );
    },
    /** DBおよびStoreの課題を任意の状態にする */
    moveTaskToAnyStep(
        { state, commit },
        { id, stateId }: { id: number; stateId: number }
    ) {
        const idx = state.task.taskList.findIndex((task) => {
            return task.id === id;
        });
        const task = { ...state.task.taskList[idx] };

        task.stateId = stateId;

        putDbData(state.db as IDBDatabase, DB_STORE_NAME.TASK_LIST, task).then(
            () => {
                commit('task/putTask', task);
            }
        );
    },
    /** DBおよびStoreの課題を前の状態にする */
    moveTaskToPrevStep({ state, commit }, id: number) {
        const idx = state.task.taskList.findIndex((task) => {
            return task.id === id;
        });
        const task = { ...state.task.taskList[idx] };

        task.stateId--;

        putDbData(state.db as IDBDatabase, DB_STORE_NAME.TASK_LIST, task).then(
            () => {
                commit('task/putTask', task);
            }
        );
    },
    /** DBおよびStoreの課題を次の状態にする */
    moveTaskToNextStep({ state, commit }, id: number) {
        const idx = state.task.taskList.findIndex((task) => {
            return task.id === id;
        });
        const task = { ...state.task.taskList[idx] };

        task.stateId++;

        putDbData(state.db as IDBDatabase, DB_STORE_NAME.TASK_LIST, task).then(
            () => {
                commit('task/putTask', task);
            }
        );
    },
    /** DBおよびStoreの全課題のカテゴリーを書き換え、不要なカテゴリを削除する */
    replaceAndDeleteCategoryOfTask(
        { state, commit },
        {
            fromId,
            toId,
        }: {
            fromId: number;
            toId: number;
        }
    ) {
        // DB挿入用のデータを作成
        const taskListShallowCopy = state.task.taskList.map((task) => {
            return { ...task };
        });
        const targetTaskList = taskListShallowCopy.filter((task) => {
            return task.categoryId === fromId;
        });
        // DB挿入用のデータの中身を書き換え
        targetTaskList.forEach((task) => {
            task.categoryId = toId;
        });

        const putDbDataPromiseArr = targetTaskList.map((task) => {
            return putDbData(
                state.db as IDBDatabase,
                DB_STORE_NAME.TASK_LIST,
                task
            );
        });

        Promise.all(putDbDataPromiseArr)
            .then(() => {
                deleteDbData(
                    state.db as IDBDatabase,
                    DB_STORE_NAME.CATEGORY_LIST,
                    fromId
                ).then(() => {
                    commit('task/replaceAllCategoryOfTask', {
                        fromId,
                        toId,
                    });
                    commit('category/deleteCategory', fromId);
                });
            })
            .catch((err) => {
                throw new Error(err);
            });
    },
    /** DBおよびStoreに課題を追加する */
    addCategory({ state, commit }, category: Category) {
        addDbData(
            state.db as IDBDatabase,
            DB_STORE_NAME.CATEGORY_LIST,
            category
        ).then(() => {
            commit('category/addCategory', category);
        });
    },
    /** DBおよびStoreの課題を削除する */
    deleteCategory({ state, commit }, id: number) {
        deleteDbData(
            state.db as IDBDatabase,
            DB_STORE_NAME.CATEGORY_LIST,
            id
        ).then(() => {
            commit('category/deleteTask', id);
        });
    },
    /** カテゴリーの活性状態を変更する */
    changeCategoryState({ state, commit }, category: Category) {
        putDbData(
            state.db as IDBDatabase,
            DB_STORE_NAME.CATEGORY_LIST,
            category
        ).then(() => {
            commit('category/putCategory', category);
        });
    },
    /** 状態パネルの活性状態を変更する */
    changeStatePanelState(
        { state, commit },
        { id, isActive }: { id: number; isActive: boolean }
    ) {
        const idx = state.statePanel.statePanelList.findIndex(
            (statePanel) => statePanel.id === id
        );
        const statePanelShallowCopy: StatePanel = {
            ...state.statePanel.statePanelList[idx],
        };

        statePanelShallowCopy.isActive = isActive;

        putDbData(
            state.db as IDBDatabase,
            DB_STORE_NAME.STATE_PANEL_LIST,
            statePanelShallowCopy
        ).then(() => {
            commit('statePanel/putStatePanel', statePanelShallowCopy);
        });
    },
    /** 状態パネルのソートタイプを変更する */
    changeStatePanelSortType(
        { state, commit },
        {
            id,
            sortType,
        }: {
            id: number;
            sortType: SortType;
        }
    ) {
        const idx = state.statePanel.statePanelList.findIndex(
            (statePanel) => statePanel.id === id
        );
        const statePanelShallowCopy: StatePanel = {
            ...state.statePanel.statePanelList[idx],
        };

        statePanelShallowCopy.sortType = sortType;

        putDbData(
            state.db as IDBDatabase,
            DB_STORE_NAME.STATE_PANEL_LIST,
            statePanelShallowCopy
        ).then(() => {
            commit('statePanel/putStatePanel', statePanelShallowCopy);
        });
    },
};
export const mutations: MutationTree<State> = {
    /** IDBDatabaseをストアに保存する */
    setDb(state: State, db: IDBDatabase) {
        state.db = db;
    },
};
