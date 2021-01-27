<template>
    <div class="config-box">
        <div class="config-box__inr">
            <div class="config-box__head">
                <p class="config-box__label">設定</p>
            </div>
            <div class="config-box__body">
                <div class="config-box__sec">
                    <p>@TODO コンテンツを作り込む</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import Vue, { PropOptions } from 'vue';

interface FilterItemData {
    id: number;
    label: string;
    isChecked: boolean;
    onChange: () => void;
}

export default Vue.extend({
    props: {
        label: {
            type: String,
            required: true,
        },
        filterItemData: {
            type: Array,
            required: true,
        } as PropOptions<FilterItemData[]>,
        additionalBtn: {
            type: Boolean,
            default: false,
        },
        additionalBtnAlt: {
            type: String,
            default: '追加',
        },
    },
});
</script>

<style lang="scss" scoped>
.config-box {
    display: flex;
    justify-content: center;
    align-items: center;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba($c-black-dark, 0.2);

    &__inr {
        box-shadow: $shadow-dark-md;
        width: 100%;
        height: 70%;
        max-width: 700px;
        border-radius: 4px;
        background: $c-white;
    }
    &__head {
        border-top-left-radius: 4px;
        border-top-right-radius: 4px;
        background-color: $c-primary;
        padding: $p-md;
    }
    &__body {
        border-bottom-left-radius: 4px;
        border-bottom-right-radius: 4px;
        background-color: $c-white;
        padding: $p-md;
    }
    &__sec {
        padding-bottom: $p-xl;
        &:not(:first-child) {
            padding-top: $p-xl;
            border-top: 1px solid $c-gray;
        }
    }
}
</style>
