<template>
    <button class="primary-btn" :disabled="disabled" @click="$emit('click')">
        {{ label }}
    </button>
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
.primary-btn {
    display: block;
    background-color: $c-secondary-dark;
    border-radius: 4px;
    font-size: 1.4rem;
    color: $c-white;
    padding: $p-xs $p-md;
    min-height: 40px;
}
</style>
