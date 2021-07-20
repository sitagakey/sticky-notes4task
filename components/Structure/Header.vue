<template>
    <header class="header">
        <div class="header__top">
            <h1 v-if="h1" class="header__label">
                <NuxtLink to="/">
                    <span class="header__label-main">カダイの付箋</span>
                    <span class="header__label-sub">
                        あなたの課題をカンタン管理！
                    </span>
                </NuxtLink>
            </h1>
            <p v-else class="header__label">
                <NuxtLink to="/">
                    <span class="header__label-main">カダイの付箋</span>
                    <span class="header__label-sub">
                        あなたの課題をカンタン管理！
                    </span>
                </NuxtLink>
            </p>
        </div>
        <nav class="header__bottom">
            <ul class="header__list">
                <li class="header__list-item">
                    <NuxtLink to="/about">このアプリについて</NuxtLink>
                </li>
                <li class="header__list-item">
                    <a href="https://github.com/hikiroom/sticky-notes4task">
                        GitHub
                    </a>
                </li>
                <li class="header__list-item">
                    <a href="https://twitter.com/hikiroom">
                        お問い合わせ（Twitter）
                    </a>
                </li>
            </ul>
        </nav>
    </header>
</template>

<script lang="ts">
import Vue, { PropOptions } from 'vue';
export default Vue.extend({
    props: {
        h1: {
            type: Boolean,
            default: true,
        } as PropOptions<boolean>,
    },
});
</script>

<style lang="scss" scoped>
.header {
    width: 100%;
    background: $c-primary;

    &__top {
        height: 100%;
        padding: $p-sm $p-md;
    }
    &__label {
        display: inline-flex;

        a {
            display: inline-flex;
            flex-direction: column;
            align-items: center;
            text-decoration: none;
        }
    }
    &__label-main {
        font-weight: bold;
        font-size: 2.1rem;
        letter-spacing: 0.08em;
    }
    &__label-sub {
        display: flex;
        align-items: center;
        font-size: 1rem;
        font-weight: normal;

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
    &__bottom {
        height: 100%;
        padding: $p-xs $p-md;
        background: $c-gray-light;
    }
    &__list {
        height: 100%;
        font-size: 1.2rem;
        display: flex;
        flex-wrap: wrap;
        margin-top: -#{$m-xs};
        margin-left: -#{$m-md};

        > * {
            margin-top: $m-xs;
            margin-left: $m-md;
        }
    }
    &__list-item {
        white-space: nowrap;

        &:not(:first-child) {
            margin-left: $m-md;
        }
        a {
            color: $c-gray-dark;

            &.nuxt-link-exact-active {
                text-decoration: underline;
            }
        }
    }
}
</style>
