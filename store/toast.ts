import { MutationTree } from 'vuex';
import { formatDate } from '~/assets/ts/utils';
import { Toast } from '~/types/global';

export interface State {
    toastList: Toast[];
}

export const state = (): State => ({
    toastList: [],
});
export const mutations: MutationTree<State> = {
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
};
