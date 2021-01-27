<template>
    <footer class="footer">
        <nav class="footer__inr">
            <p class="footer__label">カダイの付箋について</p>
            <ul class="footer__list">
                <li class="footer__list-item">アプリ概要</li>
            </ul>
            <p class="footer__label">データの操作</p>
            <ul class="footer__list">
                <li class="footer__list-item">インポート</li>
                <li class="footer__list-item">エクスポート</li>
                <li class="footer__list-item">すべてのデータを削除する</li>
            </ul>
            <p class="footer__label">リンク集</p>
            <ul class="footer__list">
                <li class="footer__list-item">GitHub</li>
                <li class="footer__list-item">作者のTwitter</li>
            </ul>
        </nav>
    </footer>
</template>

<style lang="scss" scoped>
.footer {
    background: $c-gray-light;
    margin-top: $m-lg;

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
