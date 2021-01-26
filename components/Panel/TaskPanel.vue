<template>
    <div class="task-panel">
        <div class="task-panel__head">
            <p class="task-panel__label">英語の教科書3ページ</p>
            <p class="task-panel__desc">英語の教科書を毎日やる</p>
            <!-- <ul class="task-panel__btn">
                <li><MenuBtn /></li>
            </ul> -->
        </div>
        <div class="task-panel__body">
            <div class="task-panel__detail">
                <dl class="task-panel__detail-inr">
                    <div class="task-panel__detail-item">
                        <dt class="task-panel__detail-label">登録日</dt>
                        <dd class="task-panel__detail-desc">2021/01/01</dd>
                    </div>
                    <div class="task-panel__detail-item">
                        <dt class="task-panel__detail-label">開始日</dt>
                        <dd class="task-panel__detail-desc">2021/01/01</dd>
                    </div>
                    <div class="task-panel__detail-item">
                        <dt class="task-panel__detail-label">期限日</dt>
                        <dd class="task-panel__detail-desc">2021/01/01</dd>
                    </div>
                    <div class="task-panel__detail-item">
                        <dt class="task-panel__detail-label">カテゴリー</dt>
                        <dd class="task-panel__detail-desc">未分類</dd>
                    </div>
                </dl>
            </div>
        </div>
        <div class="task-panel__foot">
            <div class="task-panel__controller">
                <ul class="task-panel__controller-inr">
                    <li class="task-panel__controller-item">
                        <ArrowBtn />
                    </li>
                    <li class="task-panel__controller-item">
                        <ArrowBtn />
                    </li>
                    <li class="task-panel__controller-item">
                        <ArrowBtn />
                    </li>
                    <li class="task-panel__controller-item">
                        <ArrowBtn />
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
export default Vue.extend({});
</script>

<style lang="scss" scoped>
.task-panel {
    border-radius: 4px;
    border: 1px solid $c-gray;

    &__head {
        // display: flex;
        // justify-content: space-between;
        // align-items: center;
        padding: $p-sm;
    }
    &__label {
        font-size: 1.8rem;
        font-weight: bold;
    }
    &__desc {
        margin-top: $m-xs;
        font-size: 1.4rem;
        color: $c-gray-dark;
    }
    &__order {
        margin-top: $m-md;
    }
    &__btn {
        display: flex;

        > *:not(:first-child) {
            margin-left: $m-xs;
        }
    }
    &__body {
        padding: 0 $p-sm;
        font-size: 1.4rem;
    }
    &__detail {
        padding: $p-sm 0;
        border-top: 1px solid $c-gray-light;
    }
    &__detail-inr {
        display: flex;
        flex-wrap: wrap;
        color: $c-gray-dark;
        margin-top: -#{$m-sm};
        margin-left: -#{$m-md};
    }
    &__detail-item {
        font-size: 1.2rem;
        margin-top: $m-sm;
        margin-left: $m-md;
    }
    &__detail-label {
        display: flex;
        align-items: center;
        white-space: nowrap;

        &::before {
            content: '';
            display: block;
            width: 8px;
            height: 8px;
            background-color: $c-gray-dark;
            border-radius: 2px;
            margin-right: $m-2xs;
        }
    }
    &__detail-desc {
        margin-top: $m-2xs;
    }
    &__foot {
        padding: 0 $p-sm;
        font-size: 1.4rem;
    }
    &__controller {
        padding: $p-sm 0;
        border-top: 1px solid $c-gray-light;
    }
    &__controller-inr {
        display: flex;
        justify-content: flex-end;
        flex-wrap: wrap;
        color: $c-gray-dark;
        margin-top: -#{$m-sm};
        margin-left: -#{$m-xs};
    }
    &__controller-item {
        font-size: 1.2rem;
        margin-top: $m-sm;
        margin-left: $m-xs;
    }
}
</style>
