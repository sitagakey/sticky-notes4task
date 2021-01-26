<template>
    <div class="main-content">
        <div class="main-content__head">
            <FilterBox
                :label="'状態'"
                :filter-item-data="[
                    { id: 1, label: '未対応' },
                    { id: 2, label: '進行中' },
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
        </div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
export default Vue.extend({});
</script>

<style lang="scss" scoped>
.main-content {
    min-height: 100vh;
    @include media-min() {
        min-height: auto;
    }

    &__head {
        padding: $p-md;
    }
    &__body {
        overflow: auto;
        padding: $p-md;
    }
}
</style>
