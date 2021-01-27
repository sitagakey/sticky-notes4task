<template>
    <div class="filter-box">
        <div class="filter-box__head">
            <p class="filter-box__label">{{ label }}</p>
            <MenuBtn v-if="additionalBtn" :alt="additionalBtnAlt" />
        </div>
        <div class="filter-box__body">
            <CheckboxList :checkbox-data-arr="filterItemData" />
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
.filter-box {
    & + & {
        margin-top: $m-md;
    }
    &__head {
        display: flex;
        // justify-content: space-between;
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
