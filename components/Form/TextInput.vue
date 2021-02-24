<template>
    <input
        class="text-input"
        type="text"
        :placeholder="placeholder"
        :value="value"
        @input="$emit('input', $event.target.value)"
        @change="$emit('change', $event.target.value)"
    />
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
    props: {
        value: {
            type: String,
            default: '',
        },
        placeholder: {
            type: String,
            default: '',
        },
    },
});
</script>

<style lang="scss" scoped>
.text-input {
    width: 100%;
    display: block;
    position: relative;
    padding: $p-xs;
    border: 1px solid $c-gray;
    border-radius: 4px;
    max-height: 35px;
    font-size: 1.6rem;
    background: $c-white;

    &:focus {
        outline: 0;
        border: 1px solid $c-secondary;
    }
}
</style>
