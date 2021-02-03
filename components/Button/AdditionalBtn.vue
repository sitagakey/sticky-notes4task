<template>
    <button class="additional-btn" @click="$emit('click')">
        <span class="additional-btn__alt">{{ alt }}</span>
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
.additional-btn {
    display: block;
    min-width: 30px;
    min-height: 30px;
    background-color: $c-primary;
    border-radius: 50%;
    overflow: hidden;
    position: relative;

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
