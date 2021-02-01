import { TASK_STATE } from '~/assets/ts/variables';
import { StatePanel, Task, Category } from '~/types/global';

type State = {
    statePanel: StatePanel;
    categoryList: Category[];
    taskList: Task[];
};
export const state = (): State => ({
    statePanel: [
        {
            id: TASK_STATE.FUTURE,
            label: '未対応',
            isActive: true,
            sortOrder: 'registerAsc',
        },
        {
            id: TASK_STATE.TODO,
            label: '対応中',
            isActive: true,
            sortOrder: 'registerAsc',
        },
        {
            id: TASK_STATE.DOING,
            label: '着手中',
            isActive: true,
            sortOrder: 'registerAsc',
        },
        {
            id: TASK_STATE.DONE,
            label: '完了',
            isActive: true,
            sortOrder: 'registerAsc',
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
    ],
    taskList: [
        {
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
    filteringStatePanel(state: State) {
        return state.statePanel.filter(
            (statePanelItem) => statePanelItem.isActive
        );
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
        return state.statePanel.map((statePanelItem) => {
            const { id, label, isActive: checked } = statePanelItem;

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
};

// export const mutation = () => ({
//     conter: 1,
// });
