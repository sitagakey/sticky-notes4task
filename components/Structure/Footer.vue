<template>
    <footer class="footer">
        <div class="footer__inr">
            <p class="footer__label">カダイの付箋とは？</p>
            <div class="footer__text-group">
                <p>
                    課題を簡単に管理できるWebアプリケーションです。<br />
                    だれでも無料でお使いいただけます😃<br />
                </p>
            </div>
            <p class="footer__label">諸注意</p>
            <div class="footer__text-group">
                <p>
                    入力されたデータはお使いのWebブラウザに保存されるため、外部に公開されることはありません。<br />
                    ですが、インターネットサービスである以上、安全のため機密情報などは入力しないことをオススメいたします。
                </p>
            </div>
            <p class="footer__label">リンク集</p>
            <ul class="footer__list">
                <li class="footer__list-item">
                    <a href="https://github.com/hikiroom/sticky-notes4task">
                        GitHub
                    </a>
                </li>
                <li class="footer__list-item">
                    <a href="https://twitter.com/hikiroom">
                        お問い合わせ（Twitter）
                    </a>
                </li>
            </ul>
            <p class="footer__copy"><small>©️ 2021 ひきこもり</small></p>
        </div>
    </footer>
</template>

<style lang="scss" scoped>
.footer {
    background: $c-gray-light;
    margin-top: $m-lg;
    color: $c-gray-dark;
    font-size: 1.4rem;

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
    &__list,
    &__text-group {
        margin-top: $m-xs;
    }
    &__list-item {
        & + & {
            margin-top: $m-xs;
        }
        > a {
            color: $c-gray-dark;
        }
    }
    &__copy {
        margin-top: $m-lg;
        text-align: center;
    }
}
</style>
