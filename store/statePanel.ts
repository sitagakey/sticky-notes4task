import { GetterTree, MutationTree } from 'vuex';
import { StatePanel } from '~/types/global';
import { ComplexState } from '~/store/index';

export interface State {
    statePanelList: StatePanel[];
}

export const state = (): State => ({ statePanelList: [] });
export const getters: GetterTree<State, ComplexState> = {
    /** 活性状態の状態パネルのみを返す */
    filteringStatePanelList(state: State) {
        return state.statePanelList.filter((statePanel) => statePanel.isActive);
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
};
export const mutations: MutationTree<State> = {
    /** idを元に状態を更新する、状態がない場合は追加する */
    putStatePanel(state: State, statePanel: StatePanel) {
        const targetStatePanel = state.statePanelList.find((baseStatePanel) => {
            return baseStatePanel.id === statePanel.id;
        });

        if (targetStatePanel) {
            targetStatePanel.id = statePanel.id;
            targetStatePanel.label = statePanel.label;
            targetStatePanel.isActive = statePanel.isActive;
            targetStatePanel.sortType = statePanel.sortType;
        } else {
            state.statePanelList.push(statePanel);
        }
    },
    /** statePanelListにデータを破壊的に挿入する */
    destructiveInject(state: State, statePanelList: StatePanel[]) {
        state.statePanelList = statePanelList;
    },
};
