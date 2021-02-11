import { GetterTree, ActionTree, MutationTree } from 'vuex';
import { CATEGORY_WHITE_LIST } from '~/assets/ts/variables';
import { formatDate, windowLock, windowUnLock } from '~/assets/ts/utils';
import {
    getAllDbData,
    addDbData,
    putDbData,
    deleteDbData,
    DB_STORE_NAME,
} from '~/assets/ts/indexedDb';
import {
    StatePanel,
    Task,
    Category,
    SortType,
    ConfigBox,
    Toast,
} from '~/types/global';

type State = {
    db: IDBDatabase | null;
    dragoverTaskFlag: boolean;
    draggingTaskId: number;
    windowLockPoint: number;
    toastList: Toast[];
    configBox: ConfigBox;
    statePanelList: StatePanel[];
    categoryList: Category[];
    taskList: Task[];
};
export const state = (): State => ({
    db: null,
    dragoverTaskFlag: false,
    draggingTaskId: 0,
    windowLockPoint: 0,
    toastList: [],
    configBox: {
        isOpen: false,
        label: '',
        categoryConfig: false,
        taskAddConfig: false,
        taskEditConfig: false,
        relatedId: 0,
    },
    statePanelList: [],
    categoryList: [],
    taskList: [],
});
export const getters: GetterTree<State, State> = {
    /** タッチスクリーンかどうかの真偽地を返す */
    isTouchscreen(): boolean {
        const canHover = matchMedia('(any-hover: hover)');

        return !canHover.matches;
    },
    /** 活性状態の状態パネルのみを返す */
    filteringStatePanelList(state: State) {
        return state.statePanelList.filter((statePanel) => statePanel.isActive);
    },
    /** アクティブなカテゴリの課題を状態別でフィルタリングしたオブジェクトを返す */
    filteringTaskList(state: State) {
        const result = [[] as Task[], [] as Task[], [] as Task[], [] as Task[]];

        state.taskList.forEach((task: Task) => {
            for (const category of state.categoryList) {
                if (category.id === task.categoryId && category.isActive) {
                    result[task.stateId - 1].push(task);
                }
            }
        });

        return result;
    },
    /** 状態パネルに対応したチェックボックスデータを返す */
    statePanelCheckBoxData(state: State) {
        return state.statePanelList.map((statePanel) => {
            const { id, label, isActive: checked } = statePanel;

            return {
                id,
                label,
                checked,
            };
        });
    },
    /** カテゴリに対応したチェックボックスデータを返す */
    categoryPanelCheckBoxData(state: State) {
        return state.categoryList.map((category: Category) => {
            const { id, label, isActive: checked } = category;

            return {
                id,
                label,
                checked,
            };
        });
    },
    /** 削除可能なカテゴリを配列で返す */
    deletableCategoryList(state: State) {
        return state.categoryList.filter((category: Category) => {
            return !CATEGORY_WHITE_LIST.includes(category.id);
        });
    },
    /** taskList内に存在するIDの最大値+1を返す */
    taskUniqueId(state: State): number {
        const idList = state.taskList.map((task) => task.id);
        const id = (() => {
            if (idList.length > 0) {
                return Math.max(...idList) + 1;
            } else {
                return 1;
            }
        })();

        return id;
    },
    /** カテゴリのラベルが入った配列を返す */
    categoryLabelList(state: State) {
        interface Result {
            [key: string]: string;
        }
        const result: Result = {};

        for (const category of state.categoryList) {
            result[`id${String(category.id)}`] = category.label;
        }

        return result;
    },
    /** 指定されたidを持つ課題の浅いコピーを返す */
    getTaskOfShallowCopy: (state: State) => (id: number) => {
        const task = state.taskList.find((task) => {
            return id === task.id;
        });

        return { ...task };
    },
};
export const actions: ActionTree<State, State> = {
    /** DBのデータをストア（Vuex）に反映する */
    initDbData({ commit }, db: IDBDatabase) {
        commit('setDb', db);

        getAllDbData(db, DB_STORE_NAME.STATE_PANEL_LIST).then((data) => {
            commit('initStatePanelList', data);
        });
        getAllDbData(db, DB_STORE_NAME.CATEGORY_LIST).then((data) => {
            commit('initCategoryList', data);
        });
        getAllDbData(db, DB_STORE_NAME.TASK_LIST).then((data) => {
            commit('initTaskList', data);
        });
    },
    /** DBおよびStoreに課題を追加する */
    addTask({ state, commit }, task: Task) {
        addDbData(state.db as IDBDatabase, DB_STORE_NAME.TASK_LIST, task).then(
            () => {
                commit('addTask', task);
            }
        );
    },
    /** DBおよびStoreの課題を更新する */
    putTask({ state, commit }, task: Task) {
        putDbData(state.db as IDBDatabase, DB_STORE_NAME.TASK_LIST, task).then(
            () => {
                commit('putTask', task);
            }
        );
    },
    /** DBおよびStoreの課題を削除する */
    deleteTask({ state, commit }, id: number) {
        deleteDbData(state.db as IDBDatabase, DB_STORE_NAME.TASK_LIST, id).then(
            () => {
                commit('deleteTask', id);
            }
        );
    },
    /** DBおよびStoreの課題を前の状態にする */
    moveTaskToPrevStep({ state, commit }, id: number) {
        const idx = state.taskList.findIndex((task) => {
            return task.id === id;
        });
        const task = { ...state.taskList[idx] };

        task.stateId--;

        putDbData(state.db as IDBDatabase, DB_STORE_NAME.TASK_LIST, task).then(
            () => {
                commit('putTask', task);
            }
        );
    },
    /** DBおよびStoreの課題を次の状態にする */
    moveTaskToNextStep({ state, commit }, id: number) {
        const idx = state.taskList.findIndex((task) => {
            return task.id === id;
        });
        const task = { ...state.taskList[idx] };

        task.stateId++;

        putDbData(state.db as IDBDatabase, DB_STORE_NAME.TASK_LIST, task).then(
            () => {
                commit('putTask', task);
            }
        );
    },
};
export const mutations: MutationTree<State> = {
    /** IDBDatabaseをストアに保存する */
    setDb(state: State, db: IDBDatabase) {
        state.db = db;
    },
    /** statePanelListにデータを破壊的に挿入する */
    initStatePanelList(state: State, statePanelList: StatePanel[]) {
        state.statePanelList = statePanelList;
    },
    /** categoryPanelListにデータを破壊的に挿入する */
    initCategoryList(state: State, categoryList: Category[]) {
        state.categoryList = categoryList;
    },
    /** taskListにデータを破壊的に挿入する */
    initTaskList(state: State, taskList: Task[]) {
        state.taskList = taskList;
    },
    /** 課題を追加する */
    addTask(state: State, task: Task) {
        state.taskList.push(task);
    },
    /** 課題を更新する */
    putTask(state: State, task: Task) {
        const idx = state.taskList.findIndex((baseTask) => {
            return baseTask.id === task.id;
        });

        state.taskList[idx].id = task.id;
        state.taskList[idx].label = task.label;
        state.taskList[idx].description = task.description;
        state.taskList[idx].existDescription = task.existDescription;
        state.taskList[idx].registerDate = task.registerDate;
        state.taskList[idx].existRegisterDate = task.existRegisterDate;
        state.taskList[idx].startDate = task.startDate;
        state.taskList[idx].existStartDate = task.existStartDate;
        state.taskList[idx].expirationDate = task.expirationDate;
        state.taskList[idx].existExpirationDate = task.existExpirationDate;
        state.taskList[idx].categoryId = task.categoryId;
        state.taskList[idx].existCategory = task.existCategory;
        state.taskList[idx].stateId = task.stateId;
        state.taskList[idx].existController = task.existController;
    },
    /** 課題を削除する */
    deleteTask(state: State, id: number) {
        const idx = state.taskList.findIndex((task) => {
            return task.id === id;
        });

        state.taskList.splice(idx, 1);
    },
    /** @TODO 削除 */
    moveTaskToPrevStep(state: State, id: number) {
        const idx = state.taskList.findIndex((task) => {
            return task.id === id;
        });

        state.taskList[idx].stateId--;
    },
    /** @TODO 削除 */
    moveTaskToNextStep(state: State, id: number) {
        const idx = state.taskList.findIndex((task) => {
            return task.id === id;
        });

        state.taskList[idx].stateId++;
    },
    /** 状態パネルの活性状態を変更する */
    changeStatePanelState(
        state: State,
        {
            id,
            isActive,
        }: {
            id: number;
            isActive: boolean;
        }
    ) {
        const idx = state.statePanelList.findIndex(
            (statePanel) => statePanel.id === id
        );
        const targetStatePanel = state.statePanelList[idx];

        targetStatePanel.isActive = isActive;
    },
    /** 状態パネルのソートタイプを変更する */
    changeStatePanelSortType(
        state: State,
        {
            id,
            sortType,
        }: {
            id: number;
            sortType: SortType;
        }
    ) {
        const idx = state.statePanelList.findIndex(
            (statePanel) => statePanel.id === id
        );
        const targetStatePanel = state.statePanelList[idx];

        targetStatePanel.sortType = sortType;
    },
    /** カテゴリーを追加する */
    addCategory(state: State, label: string) {
        const idList = state.categoryList.map(
            (category: Category) => category.id
        ) as number[];
        const id = Math.max(...idList) + 1;
        const category: Category = {
            id,
            label,
            isActive: true,
        };

        state.categoryList.push(category);
    },
    /** カテゴリーを削除する */
    deleteCategory(state: State, id: number) {
        const idx = state.categoryList.findIndex((category) => {
            return category.id === id;
        });

        state.categoryList.splice(idx, 1);
    },
    /** カテゴリーの活性状態を変更する */
    changeCategoryState(
        state: State,
        {
            id,
            isActive,
        }: {
            id: number;
            isActive: boolean;
        }
    ) {
        const idx = state.categoryList.findIndex(
            (category) => category.id === id
        );
        const targetCategory = state.categoryList[idx];

        targetCategory.isActive = isActive;
    },
    /** カテゴリーのモーダルを開くために設定を初期化する */
    openCategoryConfig(state: State) {
        state.configBox.isOpen = true;
        state.configBox.label = 'カテゴリの設定';
        state.configBox.categoryConfig = true;
        state.windowLockPoint = window.pageYOffset;

        windowLock();
    },
    /** 課題追加のモーダルを開くために設定を初期化する */
    openTaskAddConfig(state: State, stateId: number) {
        state.configBox.isOpen = true;
        state.configBox.label = '課題を追加する';
        state.configBox.taskAddConfig = true;
        state.configBox.relatedId = stateId;
        state.windowLockPoint = window.pageYOffset;

        windowLock();
    },
    /** 課題編集のモーダルを開くために設定を初期化する */
    openTaskEditConfig(
        state: State,
        {
            taskId,
            taskLabel,
        }: {
            taskId: number;
            taskLabel: string;
        }
    ) {
        state.configBox.isOpen = true;
        state.configBox.label = `「${taskLabel}」を編集`;
        state.configBox.taskEditConfig = true;
        state.configBox.relatedId = taskId;
        state.windowLockPoint = window.pageYOffset;

        windowLock();
    },
    /** モーダルを閉じる */
    closeConfigBox(state: State) {
        state.configBox.isOpen = false;
        state.configBox.label = '';
        state.configBox.categoryConfig = false;
        state.configBox.taskAddConfig = false;
        state.configBox.taskEditConfig = false;
        state.configBox.relatedId = 0;

        windowUnLock(state.windowLockPoint);
    },
    /** トーストのデータを追加する */
    addToast(state: State, label: string) {
        state.toastList.unshift({
            id: formatDate(new Date(), 'yyyy/MM/dd HH:mm:ss.SSS'),
            label,
        });
    },
    /** 指定されたidを元に、トーストのデータを削除する */
    deleteToast(state: State, id: string) {
        const idx = state.toastList.findIndex((toast) => toast.id === id);

        state.toastList.splice(idx, 1);
    },
    /** ドラッグ中の課題idを保存する */
    setDraggingTaskId(state: State, id: number) {
        state.draggingTaskId = id;
    },
    /** ドラッグ中の課題が状態パネルの上にドラッグオーバーしているかどうかの真偽地を保存する */
    setDragoverTaskFlag(state: State, boolean: boolean) {
        state.dragoverTaskFlag = boolean;
    },
};
