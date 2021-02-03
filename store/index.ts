import { STATE_ID, CATEGORY_WHITE_LIST } from '~/assets/ts/variables';
import { formatDate } from '~/assets/ts/utils';
import {
    StatePanel,
    Task,
    Category,
    SortType,
    ConfigBox,
    Toast,
} from '~/types/global';

type State = {
    toastList: Toast[];
    configBox: ConfigBox;
    statePanelList: StatePanel[];
    categoryList: Category[];
    taskList: Task[];
};
export const state = (): State => ({
    toastList: [],
    configBox: {
        isOpen: false,
        label: '',
        categoryConfig: false,
        taskAddConfig: false,
        taskEditConfig: false,
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
            registerDate: new Date(),
            existRegisterDate: true,
            startDate: new Date(),
            existStartDate: true,
            expirationDate: new Date(),
            existExpirationDate: true,
            category: '英語',
            categoryId: 2,
            existCategory: true,
            stateId: 1,
        },
    ],
});
export const getters = {
    /**
     * 活性状態の状態パネルのみを返す
     * @param state stateオブジェクト
     */
    filteringStatePanelList(state: State) {
        return state.statePanelList.filter((statePanel) => statePanel.isActive);
    },
    /**
     * 課題を状態別でフィルタリングしたオブジェクトを返す
     * @param state stateオブジェクト
     */
    filteringTaskList(state: State) {
        const result = [[] as Task[], [] as Task[], [] as Task[], [] as Task[]];

        state.taskList.forEach((task: Task) => {
            result[task.stateId - 1].push(task);
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
        const targetStatePanel = state.statePanelList[id - 1];

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
        const targetStatePanel = state.statePanelList[id - 1];

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
        state.configBox.taskAddConfig = false;
        state.configBox.taskEditConfig = false;
    },
    openTaskAddConfig(state: State) {
        state.configBox.isOpen = true;
        state.configBox.label = '課題を追加する';
        state.configBox.categoryConfig = false;
        state.configBox.taskAddConfig = true;
        state.configBox.taskEditConfig = false;
    },
    closeConfigBox(state: State) {
        state.configBox.isOpen = false;
        state.configBox.label = '';
        state.configBox.categoryConfig = false;
        state.configBox.taskAddConfig = false;
        state.configBox.taskEditConfig = false;
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
};
