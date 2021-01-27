<template>
    <div class="main-content">
        <div class="main-content__head">
            <FilterBox
                :label="'状態'"
                :filter-item-data="[
                    { id: 1, label: '未対応' },
                    { id: 2, label: '対応中' },
                    { id: 2, label: '着手中' },
                    { id: 3, label: '完了' },
                ]"
            />
            <FilterBox
                :label="'カテゴリ'"
                :filter-item-data="[
                    { id: 1, label: '英語' },
                    { id: 2, label: '読書' },
                    { id: 3, label: 'コーディング' },
                ]"
                :additional-btn="true"
                :additional-btn-alt="'カテゴリを追加する'"
            />
        </div>
        <div class="main-content__body">
            <StatePanel />
            <StatePanel />
            <StatePanel />
            <StatePanel />
        </div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
export default Vue.extend({});
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
