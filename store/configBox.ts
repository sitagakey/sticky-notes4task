import { MutationTree } from 'vuex';
import { windowLock, windowUnLock } from '~/assets/ts/utils';
import { ConfigBox } from '~/types/global';
import { STATE_ID } from '~/assets/ts/variables';

export interface State {
    windowLockPoint: number; // windowの固定されているy軸位置
    configBox: ConfigBox;
}

export const state = (): State => ({
    windowLockPoint: 0,
    configBox: {
        isOpen: false,
        label: '',
        categoryConfig: false,
        taskAddConfig: false,
        taskEditConfig: false,
        taskId: 0,
        stateId: STATE_ID.FUTURE,
    },
});

export const mutations: MutationTree<State> = {
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
        state.configBox.stateId = stateId;
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
        state.configBox.taskId = taskId;
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
        state.configBox.taskId = 0;
        state.configBox.stateId = STATE_ID.FUTURE;

        windowUnLock(state.windowLockPoint);
    },
};
