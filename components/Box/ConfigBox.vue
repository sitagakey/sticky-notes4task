<template>
    <div class="config-box">
        <div class="config-box__inr">
            <div class="config-box__head">
                <p class="config-box__label">タイトルが入ります</p>
                <CloseBtn />
            </div>
            <div class="config-box__body">
                <div class="config-box__sec">
                    <div class="config-box__sec-item">
                        <p class="config-box__sec-label">
                            課題名<em><span>※</span>必須</em>
                        </p>
                        <TextInput />
                        <Checkbox label="課題名を表示する" />
                    </div>
                    <div class="config-box__sec-item">
                        <p class="config-box__sec-label">課題情報</p>
                        <TextInput />
                        <Checkbox label="課題情報を表示する" />
                    </div>
                    <div class="config-box__sec-item">
                        <p class="config-box__sec-label">登録日</p>
                        <p>2021/01/29</p>
                        <Checkbox label="登録日表示する" />
                    </div>
                    <div class="config-box__sec-item">
                        <p class="config-box__sec-label">開始日</p>
                        <Datepicker />
                        <Checkbox label="開始日を表示する" />
                    </div>
                    <div class="config-box__sec-item">
                        <p class="config-box__sec-label">期限日</p>
                        <Datepicker />
                        <Checkbox label="期限日を表示する" />
                    </div>
                    <div class="config-box__sec-item">
                        <p class="config-box__sec-label">カテゴリー</p>
                        <Pulldown />
                        <Checkbox label="カテゴリーを表示する" />
                    </div>
                    <div class="config-box__sec-item">
                        <p class="config-box__sec-label">コントローラー</p>
                        <Checkbox label="コントローラーを表示する" />
                    </div>
                </div>
                <div class="config-box__sec">
                    <div class="config-box__sec-item">
                        <p class="config-box__sec-label">課題の追加</p>
                        <TextInput />
                        <PrimaryBtn label="このカテゴリを追加する" />
                    </div>
                </div>
                <div class="config-box__sec">
                    <div class="config-box__sec-item">
                        <p class="config-box__sec-label">課題の削除</p>
                        <Pulldown />
                        <DengerBtn label="この課題を削除する" />
                    </div>
                </div>
                <div class="config-box__sec">
                    <div class="config-box__sec-item is-center">
                        <PrimaryBtn label="設定を反映する" />
                    </div>
                </div>
                <div class="config-box__sec">
                    <div class="config-box__sec-item is-center">
                        <PrimaryBtn label="課題を追加する" />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({});
</script>

<style lang="scss" scoped>
.config-box {
    display: flex;
    justify-content: center;
    align-items: center;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba($c-black-dark, 0.2);
    padding: $p-sm;

    &__inr {
        display: grid;
        grid-template-rows: auto 1fr;
        grid-template-columns: 1fr;
        box-shadow: $shadow-dark-md;
        width: 100%;
        max-height: 86%;
        max-width: 700px;
        border-radius: 4px;
        background: $c-white;
    }
    &__head {
        grid-row: 1/2;
        grid-column: 1/2;
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-top-left-radius: 4px;
        border-top-right-radius: 4px;
        // background-color: $c-primary;
        padding: $p-sm $p-md;
        border-bottom: 1px solid $c-gray;

        > *:not(:first-child) {
            margin-left: $m-md;
        }
    }
    &__body {
        grid-row: 2/3;
        grid-column: 1/2;
        border-bottom-left-radius: 4px;
        border-bottom-right-radius: 4px;
        background-color: $c-white;
        padding: $p-md;
        overflow: auto;
    }
    &__sec {
        padding-bottom: $p-xl;
        font-size: 1.4rem;

        &:not(:first-child) {
            padding-top: $p-xl;
            border-top: 1px solid $c-gray;
        }
    }
    &__sec-item {
        &:not(:first-child) {
            margin-top: $m-md;
        }
        > *:not(:first-child) {
            margin-top: $m-sm;
        }
        &.is-center {
            display: flex;
            justify-content: center;
        }
    }
    &__sec-label {
        font-weight: bold;
        font-size: 1.6rem;

        em {
            font-size: 1.4rem;
            color: $c-pink;
            font-style: normal;

            span {
                margin-left: $m-2xs;
            }
        }
    }
}
</style>
