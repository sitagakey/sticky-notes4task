<template>
    <button class="menu-btn" @click="$emit('click')">
        <span class="menu-btn__alt">{{ alt }}</span>
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
.menu-btn {
    display: block;
    min-width: 30px;
    min-height: 30px;
    background-color: $c-gray;
    border-radius: 50%;
    overflow: hidden;
    position: relative;

    &::before,
    &::after {
        content: '';
        display: block;
        width: 3px;
        height: 3px;
        border-radius: 50%;
        background: $c-black-dark;
        position: absolute;
        top: calc(50% - 1.5px);
        left: calc(50% - 1.5px);
    }
    &::before {
        transform: translateX(6px);
    }
    &::after {
        transform: translateX(-6px);
    }
    &__alt {
        display: block;
        width: 3px;
        height: 3px;
        border-radius: 50%;
        background: $c-black-dark;
        position: absolute;
        top: calc(50% - 1.5px);
        left: calc(50% - 1.5px);
        white-space: nowrap;
        overflow: hidden;
    }
}
</style>
