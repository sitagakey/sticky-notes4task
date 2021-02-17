<template>
    <main class="main-content">
        <div class="main-content__head">
            <FilterBox
                :label="'状態'"
                :checkbox-data-arr="statePanelCheckBoxData"
                @input="changeStatePanelState"
            />
            <FilterBox
                :label="'カテゴリ'"
                :checkbox-data-arr="categoryPanelCheckBoxData"
                :menu-btn="{
                    alt: 'カテゴリの設定',
                    click: openCategoryConfig,
                }"
                @input="changeCategoryState"
            />
        </div>
        <div class="main-content__body">
            <transition-group
                class="main-content__body-inr"
                tag="div"
                name="state-panel-group"
            >
                <StatePanel
                    v-for="statePanel in filteringStatePanelList"
                    :key="statePanel.id"
                    :state-id="statePanel.id"
                    :label="statePanel.label"
                    :sort-type="statePanel.sortType"
                    :task-list="filteringTaskList[statePanel.id - 1]"
                />
            </transition-group>
        </div>

        <transition name="config-box">
            <ConfigBox
                v-if="configBox.isOpen"
                :label="configBox.label"
                :category-config="configBox.categoryConfig"
                :task-add-config="configBox.taskAddConfig"
                :task-edit-config="configBox.taskEditConfig"
                :related-id="configBox.relatedId"
                @close="closeConfigBox"
            />
        </transition>

        <ToastList :list-item-arr="toastList" @close="deleteToast" />
    </main>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex';

export default Vue.extend({
    computed: {
        ...mapState('task', ['taskList']),
        ...mapState('configBox', ['configBox']),
        ...mapState('category', ['categoryList']),
        ...mapState('toast', ['toastList']),
        ...mapGetters('task', ['filteringTaskList']),
        ...mapGetters('statePanel', [
            'statePanelCheckBoxData',
            'filteringStatePanelList',
        ]),
        ...mapGetters('category', ['categoryPanelCheckBoxData']),
    },
    methods: {
        ...mapActions(['changeStatePanelState', 'changeCategoryState']),
        ...mapMutations('toast', ['deleteToast']),
        ...mapMutations('configBox', ['openCategoryConfig', 'closeConfigBox']),
    },
});
</script>

<style lang="scss" scoped>
.main-content {
    display: grid;
    grid-template-rows: auto 1fr;
    grid-template-columns: 1fr;

    &__head {
        padding: $p-md;
    }
    &__body {
        overflow-x: auto;
        overflow-y: hidden;

        &-inr {
            display: flex;
            align-items: stretch;
            padding: $p-md 0 $p-md $p-md;

            > * {
                min-width: 300px;
                width: 100%;
            }
            > *:not(:first-child) {
                margin-left: $m-md;
            }
            // @FIXME 右paddingが表示されないため擬似要素で代替
            &:after {
                content: '';
                display: block;
                min-width: $m-md;
                height: 1px;
            }
        }
    }
    .state-panel-group {
        &-enter-active,
        &-leave-active,
        &-move {
            transition: 0.4s;
        }
        &-enter,
        &-leave-to {
            opacity: 0;
            transform: translateY(60px);
        }
    }
    .config-box {
        &-enter-active,
        &-leave-active {
            transition: 0.1s;
        }
        &-enter,
        &-leave-to {
            opacity: 0;
        }
    }
}
</style>
