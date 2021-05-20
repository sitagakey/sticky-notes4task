<template>
    <button
        :aria-label="label"
        class="done-btn"
        type="button"
        :disabled="disabled"
        @click="$emit('click')"
    ></button>
</template>

<script lang="ts">
import Vue from 'vue';
export default Vue.extend({
    props: {
        label: {
            type: String,
            required: true,
        },
        disabled: {
            type: Boolean,
            default: false,
        },
    },
});
</script>

<style lang="scss" scoped>
.done-btn {
    display: flex;
    justify-content: center;
    align-items: center;
    min-width: 30px;
    min-height: 30px;
    background-color: $c-secondary-dark;
    border-radius: 50%;
    overflow: hidden;
    position: relative;

    &::before {
        content: '';
        display: block;
        width: 8px;
        height: 12px;
        border-bottom: 2px solid $c-white;
        border-right: 2px solid $c-white;
        transform: translateY(-1px) rotate(45deg);
    }
}
</style>
