import { GetterTree, MutationTree } from 'vuex';
import { CATEGORY_WHITE_LIST } from '~/assets/ts/variables';
import { Category } from '~/types/global';
import { ComplexState } from '~/store/index';

export interface State {
    categoryList: Category[];
}

export const state = (): State => ({ categoryList: [] });
export const getters: GetterTree<State, ComplexState> = {
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
    /** categoryList内に存在するIDの最大値+1を返す */
    categoryUniqueId(state: State): number {
        const idList = state.categoryList.map(
            (category: Category) => category.id
        );
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
    /** 引数で渡されたラベルを持つカテゴリが存在するか判定 */
    searchForExistingCategoriesByLabel: (state: State) => (
        label: string
    ): boolean => {
        return state.categoryList.some(
            (category: Category) => category.label === label
        );
    },
};
export const mutations: MutationTree<State> = {
    /** categoryPanelListにデータを破壊的に挿入する */
    destructiveInject(state: State, categoryList: Category[]) {
        state.categoryList = categoryList;
    },
    /** カテゴリーを追加する */
    addCategory(state: State, category: Category) {
        state.categoryList.push(category);
    },
    /** idを元にカテゴリーを更新する、カテゴリーがない場合は追加する */
    putCategory(state: State, category: Category) {
        const idx = state.categoryList.findIndex(
            (baseCategory) => baseCategory.id === category.id
        );

        if (state.categoryList[idx]) {
            state.categoryList[idx].id = category.id;
            state.categoryList[idx].label = category.label;
            state.categoryList[idx].isActive = category.isActive;
        } else {
            state.categoryList.push(category);
        }
    },
    /** カテゴリーを削除する */
    deleteCategory(state: State, id: number) {
        const idx = state.categoryList.findIndex((category) => {
            return category.id === id;
        });

        state.categoryList.splice(idx, 1);
    },
};
