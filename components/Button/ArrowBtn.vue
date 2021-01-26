<template>
    <button class="arrow-btn">
        <span class="arrow-btn__alt">{{ alt }}</span>
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
        border: 1px solid $c-secondary;
    }
    // @TODO クラスで出しわけできる様にする
    // &::before {
    //     content: '';
    //     display: block;
    //     width: 40%;
    //     height: 40%;
    //     background-image: linear-gradient(
    //             45deg,
    //             #000 0%,
    //             #000 20%,
    //             transparent 20%,
    //             transparent 80%,
    //             #000 80%,
    //             #000 100%
    //         ),
    //         linear-gradient(
    //             135deg,
    //             #000 0%,
    //             #000 20%,
    //             transparent 20%,
    //             transparent 80%,
    //             #000 80%,
    //             #000 100%
    //         );
    //     position: absolute;
    //     top: calc(50% - 20%);
    //     left: calc(50% - 20%);
    //     transform: rotate(45deg);
    // }
    // 左
    // &::before {
    //     content: '';
    //     display: block;
    //     width: 40%;
    //     height: 40%;
    //     background-image: linear-gradient(
    //         45deg,
    //         #000 0%,
    //         #000 40%,
    //         transparent 40%,
    //         transparent 100%
    //     );
    //     position: absolute;
    //     top: calc(50% - 20%);
    //     left: calc(50% - 8%);
    //     transform: rotate(45deg);
    // }
    // 右
    // &::before {
    //     content: '';
    //     display: block;
    //     width: 40%;
    //     height: 40%;
    //     background-image: linear-gradient(
    //         45deg,
    //         transparent 0%,
    //         transparent 60%,
    //         #000 60%,
    //         #000 100%
    //     );
    //     position: absolute;
    //     top: calc(50% - 20%);
    //     left: calc(50% - 28%);
    //     transform: rotate(45deg);
    // }
    // 上
    &::before {
        content: '';
        display: block;
        width: 40%;
        height: 40%;
        background-image: linear-gradient(
            135deg,
            #000 0%,
            #000 40%,
            transparent 40%,
            transparent 100%
        );
        position: absolute;
        top: calc(50% - 8%);
        left: calc(50% - 20%);
        transform: rotate(45deg);
    }
    // 下
    &::before {
        content: '';
        display: block;
        width: 40%;
        height: 40%;
        background-image: linear-gradient(
            135deg,
            transparent 0%,
            transparent 60%,
            #000 60%,
            #000 100%
        );
        position: absolute;
        top: calc(50% - 32%);
        left: calc(50% - 20%);
        transform: rotate(45deg);
    }
    &__alt {
        display: block;
        width: 1px;
        height: 1px;
        white-space: nowrap;
        overflow: hidden;
        position: absolute;
        top: -1px;
        left: -1px;
    }
}
</style>
