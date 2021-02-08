<template>
    <transition name="config-box">
        <div v-if="isOpen" class="config-box">
            <div class="config-box__inr">
                <div class="config-box__head">
                    <p class="config-box__label">{{ label }}</p>
                    <CloseBtn
                        :alt="`${label}を閉じる`"
                        @click="$emit('close')"
                    />
                </div>
                <div class="config-box__body">
                    <div
                        v-if="taskAddConfig || taskEditConfig"
                        class="config-box__sec"
                    >
                        <div class="config-box__sec-item">
                            <label
                                class="config-box__sec-label"
                                for="config-box__task-label"
                            >
                                課題名<em><span>※</span>必須</em>
                            </label>
                            <TextInput
                                id="config-box__task-label"
                                v-model="task.label"
                            />
                        </div>
                        <div class="config-box__sec-item">
                            <label
                                class="config-box__sec-label"
                                for="config-box__task-detailt"
                            >
                                課題情報
                            </label>
                            <TextInput
                                id="config-box__task-detailt"
                                v-model="task.description"
                            />
                            <Checkbox
                                v-model="task.existDescription"
                                label="課題情報を表示する"
                            />
                        </div>
                        <div class="config-box__sec-item">
                            <label
                                class="config-box__sec-label"
                                for="config-box__register-date"
                            >
                                登録日
                            </label>
                            <p id="config-box__register-date">
                                {{ registerDate }}
                            </p>
                            <Checkbox
                                v-model="task.existRegisterDate"
                                label="登録日を表示する"
                            />
                        </div>
                        <div class="config-box__sec-item">
                            <label
                                class="config-box__sec-label"
                                for="config-box__start-date"
                            >
                                開始日
                            </label>
                            <Datepicker
                                id="config-box__start-date"
                                v-model="task.startDate"
                            />
                            <Checkbox
                                v-model="task.existStartDate"
                                label="開始日を表示する"
                            />
                        </div>
                        <div class="config-box__sec-item">
                            <label
                                class="config-box__sec-label"
                                for="config-box__expiration-date"
                            >
                                期限日
                            </label>
                            <Datepicker
                                id="config-box__expiration-date"
                                v-model="task.expirationDate"
                            />
                            <Checkbox
                                v-model="task.existExpirationDate"
                                label="期限日を表示する"
                            />
                        </div>
                        <div class="config-box__sec-item">
                            <label
                                class="config-box__sec-label"
                                for="config-box__category"
                            >
                                カテゴリー
                            </label>
                            <Pulldown
                                id="config-box__category"
                                :selected="String(task.categoryId)"
                                :options="taskEditConfigPulldownOptions"
                                @change="setTaskCategory"
                            />
                            <Checkbox
                                v-model="task.existCategory"
                                label="カテゴリーを表示する"
                            />
                        </div>
                        <div class="config-box__sec-item">
                            <label class="config-box__sec-label">
                                コントローラー
                            </label>
                            <Checkbox
                                v-model="task.existController"
                                label="コントローラーを表示する"
                            />
                        </div>
                    </div>
                    <div v-if="taskAddConfig" class="config-box__sec">
                        <div class="config-box__sec-item is-center">
                            <PrimaryBtn
                                :disabled="task.label === ''"
                                label="課題を追加する"
                                @click="addTaskProcessing"
                            />
                        </div>
                    </div>
                    <div v-if="taskEditConfig" class="config-box__sec">
                        <div class="config-box__sec-item">
                            <label class="config-box__sec-label">
                                課題の削除
                            </label>
                            <DengerBtn label="この課題を削除する" />
                        </div>
                    </div>
                    <div v-if="taskEditConfig" class="config-box__sec">
                        <div class="config-box__sec-item is-center">
                            <PrimaryBtn label="設定を反映する" />
                        </div>
                    </div>
                    <div v-if="categoryConfig" class="config-box__sec">
                        <div class="config-box__sec-item">
                            <label class="config-box__sec-label">
                                カテゴリの追加
                            </label>
                            <TextInput
                                v-model="addCategoryLabel"
                                placeholder="カテゴリ名を入力してください"
                            />
                            <PrimaryBtn
                                label="このカテゴリを追加する"
                                :disabled="addCategoryLabel === ''"
                                @click="addCategoryProcessing"
                            />
                        </div>
                    </div>
                    <div v-if="categoryConfig" class="config-box__sec">
                        <div class="config-box__sec-item">
                            <label class="config-box__sec-label">
                                カテゴリの削除
                            </label>
                            <Pulldown
                                :options="categoryConfigPulldownOptions"
                                title="カテゴリ"
                                @change="chnageDeleteCategoryId"
                            />
                            <DengerBtn
                                label="このカテゴリを削除する"
                                :disabled="
                                    categoryConfigPulldownOptions.length === 0
                                "
                                @click="deleteCategoryProcessing"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </transition>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapState, mapGetters, mapMutations } from 'vuex';
import { PulldownOption, Category, Task } from '~/types/global';
import { formatDate } from '~/assets/ts/utils';

interface DataType {
    addCategoryLabel: string;
    deleteCategoryId: number;
    task: Task;
}

export default Vue.extend({
    props: {
        isOpen: {
            type: Boolean,
            required: true,
        },
        label: {
            type: String,
            required: true,
        },
        categoryConfig: {
            type: Boolean,
            required: true,
        },
        taskAddConfig: {
            type: Boolean,
            required: true,
        },
        taskEditConfig: {
            type: Boolean,
            required: true,
        },
        relatedTaskId: {
            type: Number,
            default: 0,
        },
    },
    data(): DataType {
        return {
            addCategoryLabel: '',
            deleteCategoryId: 0,
            task: {
                id: 0,
                label: '',
                description: '',
                existDescription: false,
                registerDate: formatDate(new Date(), 'yyyy-MM-dd'),
                existRegisterDate: false,
                startDate: '',
                existStartDate: false,
                expirationDate: '',
                existExpirationDate: false,
                categoryId: 0,
                existCategory: false,
                stateId: 0,
                existController: false,
            },
        };
    },
    computed: {
        ...mapState(['configBox', 'categoryList']),
        ...mapGetters(['deletableCategoryList', 'taskUniqueId']),
        registerDate(): string {
            return this.task.registerDate.replace(/-/g, '/');
        },
        taskEditConfigPulldownOptions(): PulldownOption[] {
            return this.categoryList.map((category: Category) => {
                return {
                    label: category.label,
                    value: String(category.id),
                };
            });
        },
        categoryConfigPulldownOptions(): PulldownOption[] {
            return this.deletableCategoryList.map((category: Category) => {
                return {
                    label: category.label,
                    value: String(category.id),
                };
            });
        },
    },
    created() {
        if (this.taskEditConfig) {
            // @TODO 設定編集機能追加
        }
    },
    methods: {
        ...mapMutations([
            'deleteCategory',
            'addCategory',
            'addToast',
            'addTask',
            'closeConfigBox',
        ]),
        chnageDeleteCategoryId(id: string) {
            this.deleteCategoryId = Number(id);
        },
        existCategory(categoryList: Category[], label: string) {
            const existLabel = categoryList.some(
                (category: Category) => category.label === label
            );

            return existLabel;
        },
        addCategoryProcessing() {
            if (!this.existCategory(this.categoryList, this.addCategoryLabel)) {
                this.addCategory(this.addCategoryLabel);
                this.addToast(
                    `「${this.addCategoryLabel}」カテゴリを追加しました`
                );
                this.addCategoryLabel = '';
            } else {
                alert('同じ名前のカテゴリが既に存在しています。');
            }
        },
        deleteCategoryProcessing() {
            const idx = this.categoryList.findIndex((category: Category) => {
                return category.id === this.deleteCategoryId;
            });
            const targetLabel = this.categoryList[idx].label;
            const confirmMessage = `「${targetLabel}」カテゴリを本当に削除しますか？`;

            if (confirm(confirmMessage)) {
                this.deleteCategory(this.deleteCategoryId);
                this.addToast(`「${targetLabel}」カテゴリを削除しました`);
            }
        },
        setTaskCategory(id: string) {
            this.task.categoryId = Number(id);
        },
        addTaskProcessing() {
            if (this.task.label !== '') {
                this.task.id = this.taskUniqueId;
                this.task.stateId = this.configBox.stateId;
                this.addTask({ ...this.task });
                this.addToast(`課題「${this.task.label}」を追加しました`);
                this.closeConfigBox();
                this.initData();
            }
        },
        initData() {
            this.addCategoryLabel = '';
            this.deleteCategoryId = 0;
            this.task = {
                id: 0,
                label: '',
                description: '',
                existDescription: false,
                registerDate: formatDate(new Date(), 'yyyy-MM-dd'),
                existRegisterDate: false,
                startDate: '',
                existStartDate: false,
                expirationDate: '',
                existExpirationDate: false,
                categoryId: 0,
                existCategory: false,
                stateId: 0,
                existController: false,
            };
        },
    },
});
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
        box-shadow: $shadow-sm;
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
        background-color: $c-white;
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
    &-enter-active,
    &-leave-active {
        transition: 0.1s;
    }
    &-enter,
    &-leave-to {
        opacity: 0;
    }
}
</style>
