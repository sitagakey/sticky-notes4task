<template>
    <main class="main-content">
        <article class="main-content__body">
            <section>
                <h1>このアプリについて</h1>
                <p>
                    カダイの付箋は「誰もが、手軽に」をコンセプトに作られた、登録不要な上に完全無料で使える課題管理（タスク管理）アプリです😃<br />
                    いわゆるカンバンボード形式で課題を管理していけるのが特徴です。
                </p>
                <section>
                    <h2>入力されたデータについて</h2>
                    <p>
                        入力されたデータはお使いのWebブラウザに保存されるため、外部に保存や公開されることはありません。
                    </p>
                </section>
                <section>
                    <h2>各種機能</h2>
                    <img src="~/assets/image/about.png" alt="" />
                    <ol>
                        <li>
                            状態（各チェックボックスから、それらに対応する状態パネルの表示、非表示を切り替えられる）
                        </li>
                        <li>
                            カテゴリ（各チェックボックスから、それらに対応する状態パネルの表示、非表示を切り替えられる）
                            <ol>
                                <li>
                                    編集ボタン（カテゴリの追加や削除をするためのカテゴリ編集ウィンドウを開く）
                                </li>
                            </ol>
                        </li>
                        <li>
                            状態パネル（課題パネルを設置するためのパネル）
                            <ol>
                                <li>
                                    ソートプルダウン（課題パネルの並び順番を切り替える）
                                </li>
                                <li>
                                    課題パネル（自身の課題詳細が書かれたパネル、ドラッグ&ドロップで状態パネル間を移動できます）
                                    <ol>
                                        <li>
                                            課題編集ボタン（課題パネルの内容を編集するための課題編集ウィンドウを開く）
                                        </li>
                                    </ol>
                                </li>
                            </ol>
                        </li>
                        <li>
                            すべての課題を削除するボタン（完了状態パネルに表示されているすべての課題パネルを一括で削除します）
                        </li>
                        <li>
                            課題追加ボタン（課題パネルの追加をするための課題追加ウィンドウを開く）
                        </li>
                    </ol>
                    <section>
                        <h3>課題追加および課題編集ウィンドウ</h3>
                        <p>
                            各ウィンドウでは課題パネルの情報を設定できます。<br />
                            項目の下にチェックボックスがある場合、それにチェックを入れると画面に当該項目が表示されます。
                        </p>
                        <section>
                            <h4>課題名（必須）</h4>
                            <p>課題パネルに表示される課題名の設定できます。</p>
                        </section>
                        <section>
                            <h4>課題情報</h4>
                            <p>課題の補足情報を設定できます。</p>
                        </section>
                        <section>
                            <h4>登録日</h4>
                            <p>
                                課題を登録した日が設定されます。<br />
                                この項目は自動で設定されるため変更はできません。
                            </p>
                        </section>
                        <section>
                            <h4>開始日</h4>
                            <p>課題の開始日を設定できます。</p>
                        </section>
                        <section>
                            <h4>期限日</h4>
                            <p>
                                課題の期限日を設定できます。<br />
                                この期限日を超えた場合、表示されている当該課題パネルの色が赤く変わります。
                            </p>
                        </section>
                        <section>
                            <h4>状態</h4>
                            <p>
                                課題パネルをどの状態パネルに設置するか設定できます。
                            </p>
                        </section>
                        <section>
                            <h4>カテゴリー</h4>
                            <p>
                                課題パネルをどのカテゴリーにするか設定できます。
                            </p>
                        </section>
                        <section>
                            <h4>コントローラー</h4>
                            <p>
                                課題パネルの状態を変更するためのコントローラーです。<br />
                                キーボード操作を必要とする場合などに有効な機能で、スマートフォンなどの一部ブラウザではこの機能が自動で有効化されます。
                            </p>
                        </section>
                    </section>
                </section>
                <section>
                    <h2>動作環境</h2>
                    <p>
                        このアプリは下記の環境で動作確認をしています。<br />
                        下記以外の環境では動作の補償ができかねます。
                    </p>
                    <ul>
                        <li>macOS Google Chrome 最新版</li>
                        <li>macOS Safari 最新版</li>
                        <li>iOS Safari</li>
                    </ul>
                </section>
            </section>
        </article>
    </main>
</template>

<style lang="scss" scoped>
.main-content {
    &__body {
        padding: $p-md;

        img {
            display: block;
            width: 100%;
            max-width: 600px;
            margin: 0 auto;
        }
        section {
            &:not(:first-child) {
                margin-top: $m-lg;
            }
        }
        h1 {
            font-size: 2.4rem;
        }
        h2 {
            font-size: 2rem;
            border-bottom: 1px solid $c-gray;
        }
        h3 {
            font-size: 1.8rem;
        }
        h4 {
            font-size: 1.6rem;
        }
        ol {
            font-size: 1.4rem;
            list-style: decimal inside;

            ol {
                padding-left: $p-md;
            }
        }
        ul {
            font-size: 1.4rem;
            list-style: inside;
        }
        :is(h1, h2, h3, h4) {
            padding-bottom: $p-xs;

            & ~ * {
                margin-top: $m-sm;
            }
        }
    }
}
</style>
