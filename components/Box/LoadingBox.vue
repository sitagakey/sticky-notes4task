<template>
    <div v-if="isLoading" class="loading-box">
        <p class="loading-box__icon">データの読み込み中</p>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
    data() {
        return {
            isLoading: false,
        };
    },
    methods: {
        start() {
            this.isLoading = true;
        },
        finish() {
            this.isLoading = false;
        },
    },
});
</script>

<style lang="scss" scoped>
.loading-box {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    background: rgba($c-white, 0.8);
    position: fixed;
    top: 0;
    left: 0;
    z-index: 100;

    &__icon {
        display: flex;
        align-items: center;
        flex-direction: column;

        &::before {
            content: '';
            display: block;
            width: 40px;
            height: 40px;
            background-color: $c-primary;
            position: relative;
            overflow: hidden;
            animation: loading 1s linear 0s infinite;
            margin-bottom: $m-md;

            @keyframes loading {
                0% {
                    transform: translateX(0) rotate(0);
                }
                100% {
                    transform: translateX(0) rotate(90deg);
                }
            }
        }
    }
}
</style>
