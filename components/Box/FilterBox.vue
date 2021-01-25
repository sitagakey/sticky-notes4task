<template>
    <div class="filter-box">
        <p class="filter-box__label">{{ label }}</p>
        <ul class="filter-box__list"></ul>
    </div>
</template>

<script lang="ts">
import Vue, { PropOptions } from 'vue';

interface FilterBtnData {
    label: string;
    onChange: () => void;
}

export default Vue.extend({
    props: {
        label: {
            type: String,
            required: true,
        },
        filterBtnData: {
            type: Array,
            required: true,
        } as PropOptions<FilterBtnData[]>,
    },
});
</script>

<style lang="scss" scoped>
.filter-btn {
    border-radius: 5px;
    background-color: $c-gray;
    padding: $p-2xs;
}
</style>
