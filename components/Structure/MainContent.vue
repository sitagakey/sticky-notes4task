<template>
    <div class="main-content">
        <div class="main-content__head">
            <FilterBox
                :label="'状態'"
                :checkbox-data-arr="statePanelCheckBoxData"
            />
            <FilterBox
                :label="'カテゴリ'"
                :checkbox-data-arr="categoryPanelCheckBoxData"
                :menu-btn="{
                    alt: 'カテゴリを追加する',
                }"
            />
        </div>
        <div class="main-content__body">
            <StatePanel
                v-for="statePanelItem in filteringStatePanel"
                :key="statePanelItem.id"
                :label="statePanelItem.label"
                :sort-order="statePanelItem.sortOrder"
                :task-list="filteringTaskList[statePanelItem.id - 1]"
            />
        </div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapState, mapGetters } from 'vuex';

export default Vue.extend({
    computed: {
        ...mapState(['statePanel', 'categoryList', 'taskList']),
        ...mapGetters([
            'filteringStatePanel',
            'filteringTaskList',
            'statePanelCheckBoxData',
            'categoryPanelCheckBoxData',
        ]),
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
        display: flex;
        align-items: flex-start;
        overflow: auto;
        padding: $p-md 0 $p-md $p-md;

        > * {
            min-width: 300px;
            width: 100%;
        }
        > *:not(:first-child) {
            margin-left: $m-md;
        }
        // 右paddingが表示されないため擬似要素で代替
        &:after {
            content: '';
            display: block;
            min-width: $m-md;
            height: 1px;
        }
    }
}
</style>
