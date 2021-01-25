<template>
    <aside class="main-menu">
        <nav class="main-menu__inr">
            <p class="main-menu__label">カダイの付箋について</p>
            <ul class="main-menu__list">
                <li class="main-menu__list-item">アプリ概要</li>
            </ul>
            <p class="main-menu__label">データの操作</p>
            <ul class="main-menu__list">
                <li class="main-menu__list-item">インポート</li>
                <li class="main-menu__list-item">エクスポート</li>
                <li class="main-menu__list-item">すべてのデータを削除する</li>
            </ul>
            <p class="main-menu__label">リンク集</p>
            <ul class="main-menu__list">
                <li class="main-menu__list-item">GitHub</li>
                <li class="main-menu__list-item">作者のTwitter</li>
            </ul>
        </nav>
    </aside>
</template>

<style lang="scss" scoped>
.main-menu {
    background: $c-gray-light;
    @include media-min() {
        width: 300px;
        height: 100vh;
        @supports (-webkit-touch-callout: none) {
            height: -webkit-fill-available;
        }
    }

    &__inr {
        display: flex;
        flex-direction: column;
        height: 100%;
        margin: 0 auto;
        padding: $p-md;
    }
    &__label {
        font-weight: bold;

        &:not(:first-of-type) {
            margin-top: $m-lg;
        }
    }
    &__list {
        margin-top: $m-xs;
    }
    &__list-item {
        & + & {
            margin-top: $m-xs;
        }
    }
    &.is-hidden {
        right: 0;
        opacity: 0;
        visibility: hidden;
    }
}
</style>
