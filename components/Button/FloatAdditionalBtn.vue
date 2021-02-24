<template>
    <button class="float-additional-btn" @click="$emit('click')">
        <span class="float-additional-btn__alt">{{ alt }}</span>
    </button>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
    props: {
        alt: {
            type: String,
            required: true,
        },
    },
});
</script>

<style lang="scss" scoped>
.float-additional-btn {
    display: block;
    min-width: 60px;
    min-height: 60px;
    background-color: $c-primary;
    border-radius: 50%;
    overflow: hidden;
    position: relative;
    box-shadow: $shadow-md;
    position: fixed;
    z-index: index($z-index, floatAdditionalBtn);
    bottom: 20px;
    right: 20px;
    @include media-min() {
        bottom: 40px;
        right: 40px;
    }

    &::before,
    &::after {
        content: '';
        display: block;
        width: 40%;
        height: 2px;
        background: $c-black-dark;
        border-radius: 1px;
        position: absolute;
        top: calc(50% - 1px);
        left: calc(50% - 20%);
    }
    &::after {
        transform: rotate(90deg);
    }
    &__alt {
        display: block;
        width: 1px;
        height: 1px;
        opacity: 0;
        white-space: nowrap;
        overflow: hidden;
        position: absolute;
        left: -1px;
        top: -1px;
    }
}
</style>
