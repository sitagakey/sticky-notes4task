<template>
    <div class="filter-box">
        <div class="filter-box__head">
            <p class="filter-box__label">{{ label }}</p>
            <MenuBtn v-if="menuBtn" :alt="menuBtnAlt" />
        </div>
        <div class="filter-box__body">
            <CheckboxList :checkbox-data-arr="checkboxDataArr" />
        </div>
    </div>
</template>

<script lang="ts">
import Vue, { PropOptions } from 'vue';
import { CheckboxData, MenuBtn } from '~/types/global';

export default Vue.extend({
    props: {
        label: {
            type: String,
            required: true,
        },
        checkboxDataArr: {
            type: Array,
            required: true,
        } as PropOptions<CheckboxData[]>,
        menuBtn: {
            type: Object || null,
            default: null,
        } as PropOptions<MenuBtn[] | null>,
    },
});
</script>

<style lang="scss" scoped>
.filter-box {
    & + & {
        margin-top: $m-md;
    }
    &__head {
        display: flex;
        align-items: center;

        > *:not(:first-child) {
            margin-left: $m-sm;
        }
    }
    &__label {
        font-size: 1.6rem;
        font-weight: bold;
    }
    &__body {
        margin-top: $m-md;
    }
}
</style>
