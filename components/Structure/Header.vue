<template>
    <header class="header">
        <div class="header__inr">
            <h1 class="header__label">
                <NuxtLink to="/">カダイの付箋</NuxtLink>
            </h1>
            <p class="header__desc">あなたの課題をカンタン管理！</p>
        </div>
    </header>
</template>

<style lang="scss" scoped>
.header {
    width: 100%;
    background: $c-primary;

    &__inr {
        height: 100%;
        padding: $p-sm $p-md;
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        margin-top: -#{$m-xs};
        margin-left: -#{$m-md};

        > * {
            margin-top: $m-xs;
            margin-left: $m-md;
        }
    }
    &__label {
        font-size: 2.4rem;
        letter-spacing: 0.08em;

        a {
            text-decoration: none;
        }
    }
    &__desc {
        display: flex;
        align-items: center;
        font-size: 1.4rem;

        &::before,
        &::after {
            content: '';
            display: block;
            width: 10px;
            height: 1px;
            background-color: $c-black-dark;
        }
        &::before {
            margin-right: $m-xs;
        }
        &::after {
            margin-left: $m-xs;
        }
    }
}
</style>
