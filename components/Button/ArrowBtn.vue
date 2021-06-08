<template>
    <button
        :class="stateClass"
        class="arrow-btn"
        :aria-label="alt"
        :disabled="disabled"
        @click="$emit('click')"
    ></button>
</template>

<script lang="ts">
import Vue, { PropOptions } from 'vue';

type State = 'left' | 'right' | 'top' | 'bottom' | '';

export default Vue.extend({
    props: {
        alt: {
            type: String,
            required: true,
        },
        state: {
            type: String,
            default: '',
        } as PropOptions<State>,
        disabled: {
            type: Boolean,
            default: false,
        },
    },
    computed: {
        stateClass() {
            return `is-${this.state}`;
        },
    },
});
</script>

<style lang="scss" scoped>
.arrow-btn {
    display: block;
    min-width: 30px;
    min-height: 30px;
    background-color: $c-white;
    border: 1px solid $c-gray;
    border-radius: 50%;
    overflow: hidden;
    position: relative;

    &:focus {
        outline: 0;
        border: 1px solid $c-secondary;
    }
    &::before {
        content: '';
        display: block;
        width: 40%;
        height: 40%;
        position: absolute;
        transform: rotate(45deg);
        background-image: linear-gradient(
            45deg,
            $c-black-dark 0%,
            $c-black-dark 30%,
            transparent 30%,
            transparent 70%,
            $c-black-dark 70%,
            $c-black-dark 100%
        );
        top: calc(50% - 20%);
        left: calc(50% - 20%);
    }
    // 左向き
    &.is-left {
        &::before {
            background-image: linear-gradient(
                45deg,
                $c-black-dark 0%,
                $c-black-dark 40%,
                transparent 40%,
                transparent 100%
            );
            top: calc(50% - 20%);
            left: calc(50% - 8%);
        }
        &[disabled] {
            &::before {
                background-image: linear-gradient(
                    45deg,
                    $c-gray-dark 0%,
                    $c-gray-dark 40%,
                    transparent 40%,
                    transparent 100%
                );
            }
        }
    }
    &.is-right {
        &::before {
            background-image: linear-gradient(
                45deg,
                transparent 0%,
                transparent 60%,
                $c-black-dark 60%,
                $c-black-dark 100%
            );
            top: calc(50% - 20%);
            left: calc(50% - 28%);
        }
        &[disabled] {
            &::before {
                background-image: linear-gradient(
                    45deg,
                    transparent 0%,
                    transparent 60%,
                    $c-gray-dark 60%,
                    $c-gray-dark 100%
                );
            }
        }
    }
    &.is-top {
        &::before {
            background-image: linear-gradient(
                135deg,
                $c-black-dark 0%,
                $c-black-dark 40%,
                transparent 40%,
                transparent 100%
            );
            top: calc(50% - 8%);
            left: calc(50% - 20%);
        }
    }
    &.is-bottom {
        &::before {
            background-image: linear-gradient(
                135deg,
                transparent 0%,
                transparent 60%,
                $c-black-dark 60%,
                $c-black-dark 100%
            );
            top: calc(50% - 32%);
            left: calc(50% - 20%);
        }
    }
}
</style>
