import { STATE_ID, CATEGORY_WHITE_LIST } from '~/assets/ts/variables';
import { formatDate, windowLock, windowUnLock } from '~/assets/ts/utils';
import {
    StatePanel,
    Task,
    Category,
    SortType,
    ConfigBox,
    Toast,
} from '~/types/global';

type State = {
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
    statePanelList: [
        {
            id: STATE_ID.FUTURE,
            label: '未対応',
            isActive: true,
            sortType: 'registerAsc',
        },
        {
            id: STATE_ID.TODO,
            label: '対応中',
            isActive: true,
            sortType: 'registerAsc',
        },
        {
            id: STATE_ID.DOING,
            label: '着手中',
            isActive: true,
            sortType: 'registerAsc',
        },
        {
            id: STATE_ID.DONE,
            label: '完了',
            isActive: true,
            sortType: 'registerAsc',
        },
    ],
    categoryList: [
        {
            id: 1,
            label: '未分類',
            isActive: true,
        },
        {
            id: 2,
            label: '英語',
            isActive: true,
        },
        {
            id: 3,
            label: 'コーディング',
            isActive: true,
        },
    ],
    taskList: [
        {
            id: 1,
            label: '英語',
            description: '毎日3ページ教科書をやる',
            existDescription: true,
            registerDate: '2021-01-01',
            existRegisterDate: true,
            startDate: '',
            existStartDate: true,
            expirationDate: '',
            existExpirationDate: true,
            categoryId: 2,
            existCategory: true,
            stateId: 1,
            existController: true,
        },
    ],
});
export const getters = {
    isTouchscreen() {
        const canHover = matchMedia('(any-hover: hover)');

        return !canHover.matches;
    },
    /**
     * 活性状態の状態パネルのみを返す
     * @param state stateオブジェクト
     */
    filteringStatePanelList(state: State) {
        return state.statePanelList.filter((statePanel) => statePanel.isActive);
    },
    /**
     * アクティブなカテゴリの課題を状態別でフィルタリングしたオブジェクトを返す
     * @param state stateオブジェクト
     */
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
    /**
     * 状態パネルに対応したチェックボックスデータを返す
     * @param state stateオブジェクト
     */
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
    /**
     * カテゴリに対応したチェックボックスデータを返す
     * @param state stateオブジェクト
     */
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
    /**
     * 削除可能なカテゴリを配列で返す
     * @param state stateオブジェクト
     */
    deletableCategoryList(state: State) {
        return state.categoryList.filter((category: Category) => {
            return !CATEGORY_WHITE_LIST.includes(category.id);
        });
    },
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
    getTaskOfShallowCopy: (state: State) => (id: number) => {
        const task = state.taskList.find((task) => {
            return id === task.id;
        });

        return { ...task };
    },
};
export const mutations = {
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
    deleteCategory(state: State, id: number) {
        const idx = state.categoryList.findIndex((category) => {
            return category.id === id;
        });

        state.categoryList.splice(idx, 1);
    },
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
    openCategoryConfig(state: State) {
        state.configBox.isOpen = true;
        state.configBox.label = 'カテゴリの設定';
        state.configBox.categoryConfig = true;
        state.windowLockPoint = window.pageYOffset;

        windowLock();
    },
    openTaskAddConfig(state: State, stateId: number) {
        state.configBox.isOpen = true;
        state.configBox.label = '課題を追加する';
        state.configBox.taskAddConfig = true;
        state.configBox.relatedId = stateId;
        state.windowLockPoint = window.pageYOffset;

        windowLock();
    },
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
    closeConfigBox(state: State) {
        state.configBox.isOpen = false;
        state.configBox.label = '';
        state.configBox.categoryConfig = false;
        state.configBox.taskAddConfig = false;
        state.configBox.taskEditConfig = false;
        state.configBox.relatedId = 0;

        windowUnLock(state.windowLockPoint);
    },
    addToast(state: State, label: string) {
        state.toastList.unshift({
            id: formatDate(new Date(), 'yyyy/MM/dd HH:mm:ss.SSS'),
            label,
        });
    },
    deleteToast(state: State, id: string) {
        const idx = state.toastList.findIndex((toast) => toast.id === id);

        state.toastList.splice(idx, 1);
    },
    addTask(state: State, task: Task) {
        state.taskList.push(task);
    },
    setTask(state: State, task: Task) {
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
    deleteTask(state: State, id: number) {
        const idx = state.taskList.findIndex((task) => {
            return task.id === id;
        });

        state.taskList.splice(idx, 1);
    },
    moveTaskToPrevStep(state: State, id: number) {
        const idx = state.taskList.findIndex((task) => {
            return task.id === id;
        });

        state.taskList[idx].stateId--;
    },
    moveTaskToNextStep(state: State, id: number) {
        const idx = state.taskList.findIndex((task) => {
            return task.id === id;
        });

        state.taskList[idx].stateId++;
    },
    setDraggingTaskId(state: State, id: number) {
        state.draggingTaskId = id;
    },
    setDragoverTaskFlag(state: State, boolean: boolean) {
        state.dragoverTaskFlag = boolean;
    },
};
