<template>
    <div class="config-box" tabindex="-1" @keydown.esc="$emit('close')">
        <div class="config-box__inr">
            <div class="config-box__head">
                <p class="config-box__label">{{ label }}</p>
                <CloseBtn :alt="`${label}を閉じる`" @click="$emit('close')" />
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
                            @change="resetFocusableElements"
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
                            for="config-box__state"
                        >
                            状態
                        </label>
                        <Pulldown
                            id="config-box__state"
                            :selected="String(task.stateId)"
                            :options="statePanelPulldownData"
                            @input="setTaskState"
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
                            @input="setTaskCategory"
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
                            :disabled="isTouchscreen"
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
                        <DengerBtn
                            label="この課題を削除する"
                            @click="deleteTaskProcessing"
                        />
                    </div>
                </div>
                <div v-if="taskEditConfig" class="config-box__sec">
                    <div class="config-box__sec-item is-center">
                        <PrimaryBtn
                            label="設定を反映する"
                            @click="setTaskConfigProcessing"
                        />
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
                            @input="setDeleteCategoryId"
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
</template>

<script lang="ts">
import Vue from 'vue';
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex';
import { PulldownOption, Category, Task } from '~/types/global';
import { formatDate, LockAt } from '~/assets/ts/utils';
import { CATEGORY_ID } from '~/assets/ts/variables';

interface DataType {
    addCategoryLabel: string;
    deleteCategoryId: number;
    task: Task;
    lockAt: LockAt | null;
}

export default Vue.extend({
    props: {
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
        taskId: {
            type: Number,
            required: true,
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
                categoryId: CATEGORY_ID.UNCATEGORIZED,
                existCategory: false,
                stateId: 0,
                existController: false,
            },
            lockAt: null,
        };
    },
    computed: {
        ...mapState('task', ['taskList']),
        ...mapState('category', ['categoryList']),
        ...mapState('configBox', ['configBox']),
        ...mapGetters('task', ['taskUniqueId', 'getTaskOfShallowCopy']),
        ...mapGetters('category', [
            'deletableCategoryList',
            'categoryUniqueId',
            'searchForExistingCategoriesByLabel',
        ]),
        ...mapGetters('statePanel', ['statePanelPulldownData']),
        /** 登録日 */
        registerDate(): string {
            return this.task.registerDate.replace(/-/g, '/');
        },
        /** 課題編集時のカテゴリ編集プルダウンの内容 */
        taskEditConfigPulldownOptions(): PulldownOption[] {
            return this.categoryList.map((category: Category) => {
                return {
                    label: category.label,
                    value: String(category.id),
                };
            });
        },
        /** カテゴリ編集時のカテゴリ編集プルダウンの内容 */
        categoryConfigPulldownOptions(): PulldownOption[] {
            return this.deletableCategoryList.map((category: Category) => {
                return {
                    label: category.label,
                    value: String(category.id),
                };
            });
        },
        /** タッチスクリーン判定 */
        isTouchscreen(): boolean {
            const canHover = matchMedia('(any-hover: hover)');

            return !canHover.matches;
        },
    },
    watch: {
        categoryConfigPulldownOptions() {
            this.$nextTick(() => {
                this.lockAt?.resetFocusableElements();

                if (this.categoryConfigPulldownOptions.length === 0) {
                    this.lockAt?.lastElement.focus();
                }
            });
        },
    },
    created() {
        // 課題の編集をする場合は課題情報をthis.taskに注入する
        if (this.taskEditConfig) {
            this.task = this.getTaskOfShallowCopy(this.taskId);
        }
        // タッチスクリーンの場合は強制的にコントローラーオプションにチェックを入れる
        if (this.isTouchscreen) {
            this.task.existController = true;
        }
    },
    mounted() {
        this.$nextTick(() => {
            (this.$el as HTMLElement).focus();
            this.lockAt = new LockAt(this.$el as HTMLElement);
        });
    },
    methods: {
        ...mapActions([
            'addTask',
            'putTask',
            'deleteTask',
            'replaceAndDeleteCategoryOfTask',
        ]),
        ...mapActions(['addCategory']),
        ...mapMutations('toast', ['addToast']),
        ...mapMutations('configBox', ['closeConfigBox']),
        /** 削除するカテゴリーIDを設定する */
        setDeleteCategoryId(id: string) {
            this.deleteCategoryId = Number(id);
        },
        /** カテゴリーを追加するときの処理 */
        addCategoryProcessing() {
            if (
                !this.searchForExistingCategoriesByLabel(this.addCategoryLabel)
            ) {
                const category: Category = {
                    id: this.categoryUniqueId,
                    label: this.addCategoryLabel,
                    isActive: true,
                };
                this.addCategory(category);
                this.addToast(
                    `「${this.addCategoryLabel}」カテゴリを追加しました`
                );
                this.addCategoryLabel = '';
            } else {
                alert('同じ名前のカテゴリが既に存在しています。');
            }
        },
        /** カテゴリーを削除するときの処理 */
        deleteCategoryProcessing() {
            const idx = this.categoryList.findIndex((category: Category) => {
                return category.id === this.deleteCategoryId;
            });
            const targetLabel = this.categoryList[idx].label;
            const confirmMessage = `「${targetLabel}」カテゴリを本当に削除しますか？`;

            if (confirm(confirmMessage)) {
                this.replaceAndDeleteCategoryOfTask({
                    fromId: this.deleteCategoryId,
                    toId: CATEGORY_ID.UNCATEGORIZED,
                });
                this.addToast(`「${targetLabel}」カテゴリを削除しました`);
            }
        },
        /** 課題の状態IDを設定する */
        setTaskState(id: string) {
            this.task.stateId = Number(id);
        },
        /** 課題のカテゴリーIDを設定する */
        setTaskCategory(id: string) {
            this.task.categoryId = Number(id);
        },
        /** 課題の追加をするときの処理 */
        addTaskProcessing() {
            if (this.task.label !== '') {
                this.task.id = this.taskUniqueId;
                this.addTask({ ...this.task });
                this.addToast(`課題「${this.task.label}」を追加しました`);
                this.closeConfigBox();
                this.initData();
            }
        },
        /** 課題の削除をするときの処理 */
        deleteTaskProcessing() {
            const confirmMessage = `課題「${this.task.label}」を本当に削除しますか？`;

            if (confirm(confirmMessage)) {
                this.addToast(`課題「${this.task.label}」を削除しました`);
                this.deleteTask(this.task.id);
                this.closeConfigBox();
                this.initData();
            }
        },
        /** 課題の編集を反映するときの処理 */
        setTaskConfigProcessing() {
            this.putTask({ ...this.task });
            this.addToast(`課題「${this.task.label}」の修正を反映しました`);
            this.closeConfigBox();
            this.initData();
        },
        /** フォーカスループの対象を再設定する */
        resetFocusableElements() {
            this.lockAt?.resetFocusableElements();
        },
        /** データの初期化 */
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
    z-index: index($z-index, configBox);

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
}
</style>
