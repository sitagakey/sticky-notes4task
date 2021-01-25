<template>
    <header class="header">
        <div class="header__inr">
            <h1 class="header__label">カダイの付箋</h1>
        </div>
    </header>
</template>

<style lang="scss" scoped>
.header {
    width: 100%;
    background: $c-primary;

    &__label {
        font-size: 2.4rem;
    }
    &__inr {
        height: 100%;
        padding: $p-sm $p-md;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
}
</style>
