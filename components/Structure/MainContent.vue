<template>
    <div class="main-content">
        <div class="main-content__inr">
            <CheckBox label="未対応" />
            <CheckBox label="進行中" />
            <CheckBox label="完了" />
            <p>a</p>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.main-content {
    height: 100vh;
    overflow: auto;
    @include media-min() {
        height: auto;
    }

    &__inr {
        padding: $p-md;
    }
}
</style>
