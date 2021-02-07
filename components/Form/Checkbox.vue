<template>
    <label class="checkbox">
        <input
            class="checkbox__input"
            type="checkbox"
            :checked="value"
            @input="$emit('input', $event.target.checked)"
        />
        <span class="checkbox__label">{{ label }}</span>
    </label>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
    props: {
        label: {
            type: String,
            default: null,
        },
        value: {
            type: Boolean,
            default: false,
        },
    },
});
</script>

<style lang="scss" scoped>
.checkbox {
    $icon-size: 20;

    display: block;
    padding: 0 0 0 calc(#{$icon-size}px + #{$p-xs});
    position: relative;

    &__input {
        position: absolute;
        left: 0;
        top: 0;
        opacity: 0;

        &:focus + .checkbox__label::before {
            border: 1px solid $c-secondary;
        }
        &:checked + .checkbox__label::after {
            content: '';
            display: block;
            height: 10px;
            width: 6px;
            position: absolute;
            left: 7px;
            top: calc(50% - 6px);
            border-right: 2px solid $c-secondary;
            border-bottom: 2px solid $c-secondary;
            transform: rotate(45deg);
        }
    }
    &__label {
        &::before {
            content: '';
            display: block;
            height: #{$icon-size}px;
            width: #{$icon-size}px;
            background: $c-white;
            position: absolute;
            left: 0;
            top: calc(50% - #{$icon-size / 2}px);
            border: 1px solid $c-gray;
            border-radius: 4px;
        }
    }
}
</style>
