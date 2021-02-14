import { GetterTree, MutationTree } from 'vuex';
import { Task } from '~/types/global';
import { ComplexState } from '~/store/index';

export interface State {
    dragoverTaskFlag: boolean;
    draggingTaskId: number;
    taskList: Task[];
}

export const state = (): State => ({
    dragoverTaskFlag: false,
    draggingTaskId: 0,
    taskList: [],
});
export const getters: GetterTree<State, ComplexState> = {
    /** アクティブなカテゴリの課題を状態別でフィルタリングしたオブジェクトを返す */
    filteringTaskList(
        state: State,
        _: GetterTree<State, ComplexState>,
        rootState: ComplexState
    ) {
        const result = [[] as Task[], [] as Task[], [] as Task[], [] as Task[]];

        state.taskList.forEach((task: Task) => {
            for (const category of rootState.category.categoryList) {
                if (category.id === task.categoryId && category.isActive) {
                    result[task.stateId - 1].push(task);
                }
            }
        });

        return result;
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
    /** 指定されたidを持つ課題の浅いコピーを返す */
    getTaskOfShallowCopy: (state: State) => (id: number): Task => {
        const task = state.taskList.find((task) => {
            return id === task.id;
        });

        if (task) {
            return { ...task };
        }

        throw new Error('Does not exist Task that related ID');
    },
};
export const mutations: MutationTree<State> = {
    /** taskListにデータを破壊的に挿入する */
    destructiveInject(state: State, taskList: Task[]) {
        state.taskList = taskList;
    },
    /** 課題を追加する */
    addTask(state: State, task: Task) {
        state.taskList.push(task);
    },
    /** idを元に課題を更新する、課題がない場合は追加する */
    putTask(state: State, task: Task) {
        const targetTask = state.taskList.find((baseTask) => {
            return baseTask.id === task.id;
        });

        if (targetTask) {
            targetTask.id = task.id;
            targetTask.label = task.label;
            targetTask.description = task.description;
            targetTask.existDescription = task.existDescription;
            targetTask.registerDate = task.registerDate;
            targetTask.existRegisterDate = task.existRegisterDate;
            targetTask.startDate = task.startDate;
            targetTask.existStartDate = task.existStartDate;
            targetTask.expirationDate = task.expirationDate;
            targetTask.existExpirationDate = task.existExpirationDate;
            targetTask.categoryId = task.categoryId;
            targetTask.existCategory = task.existCategory;
            targetTask.stateId = task.stateId;
            targetTask.existController = task.existController;
        } else {
            state.taskList.push(task);
        }
    },
    /** 課題を削除する */
    deleteTask(state: State, id: number) {
        const idx = state.taskList.findIndex((task) => {
            return task.id === id;
        });

        state.taskList.splice(idx, 1);
    },
    /** ドラッグ中の課題idを保存する */
    setDraggingTaskId(state: State, id: number) {
        state.draggingTaskId = id;
    },
    /** ドラッグ中の課題が状態パネルの上にドラッグオーバーしているかどうかの真偽地を保存する */
    setDragoverTaskFlag(state: State, boolean: boolean) {
        state.dragoverTaskFlag = boolean;
    },
    /** 全課題のカテゴリーを書き換える */
    replaceAllCategoryOfTask(
        state: State,
        {
            fromId,
            toId,
        }: {
            fromId: number;
            toId: number;
        }
    ) {
        state.taskList.forEach((task) => {
            if (task.categoryId === fromId) {
                task.categoryId = toId;
            }
        });
    },
};
