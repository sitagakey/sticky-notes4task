<template>
    <div class="checkbox-list">
        <ul class="checkbox-list__inr">
            <li
                v-for="item in checkboxDataArr"
                :key="item.id"
                class="checkbox-list__item"
            >
                <Checkbox :label="item.label" :checked="item.checked" />
            </li>
        </ul>
    </div>
</template>

<script lang="ts">
import Vue, { PropOptions } from 'vue';
import { CheckboxData } from '~/types/global';

export default Vue.extend({
    props: {
        checkboxDataArr: {
            type: Array,
            required: true,
        } as PropOptions<CheckboxData[]>,
    },
});
</script>

<style lang="scss" scoped>
.checkbox-list {
    &__inr {
        display: flex;
        flex-wrap: wrap;
        margin-top: -#{$m-xs};
        margin-left: -#{$m-sm};
    }
    &__item {
        margin-top: $m-xs;
        margin-left: $m-sm;
    }
}
</style>
