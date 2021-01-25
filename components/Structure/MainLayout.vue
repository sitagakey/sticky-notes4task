<template>
    <div class="main-layout">
        <slot />
    </div>
</template>

<style lang="scss" scoped>
.main-layout {
    display: grid;
    grid-template-rows: auto 1fr auto;
    grid-template-columns: auto;
    @include media-min() {
        grid-template-rows: auto 1fr;
        grid-template-columns: 1fr auto;
    }

    > header {
        grid-row: 1/2;
        grid-column: 1/2;
    }
    > main {
        grid-row: 2/3;
        grid-column: 1/2;
    }
    > aside {
        grid-row: 3/4;
        grid-column: 1/2;
        @include media-min() {
            grid-row: 1/3;
            grid-column: 2/3;
        }
    }
}
</style>
