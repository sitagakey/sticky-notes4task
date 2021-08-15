<template>
    <div class="state-panel">
        <div class="state-panel__head">
            <div class="state-panel__head-detail">
                <p class="state-panel__label">{{ label }}</p>
                <ul class="state-panel__btn">
                    <li>
                        <AdditionalBtn
                            alt="課題を追加する"
                            @click="openTaskAddConfig(stateId)"
                        />
                    </li>
                    <li v-if="showDoneBtn">
                        <DoneBtn
                            label="登録されているタスクを全て削除する"
                            :disabled="disabledDoneBtn"
                            @click="deleteTaskProcessing"
                        />
                    </li>
                </ul>
            </div>
            <div class="state-panel__order">
                <Pulldown
                    :options="sortTypeListForPulldown"
                    :selected="sortType"
                    title="課題の並び順"
                    @input="
                        changeStatePanelSortType({
                            id: stateId,
                            sortType: $event,
                        })
                    "
                />
            </div>
        </div>
        <div
            :class="{ 'is-drag-enter': isDragEnter }"
            class="state-panel__body"
            @dragenter.prevent="dragenterProcessing"
            @dragleave="dragleaveProcessing"
            @dragover.prevent
            @drop="dropProcessing"
        >
            <transition-group
                v-if="sortedTaskList.length > 0"
                tag="ul"
                class="state-panel__body-inr"
                name="state-panel__body-inr"
            >
                <li v-for="task in sortedTaskList" :key="task.id">
                    <TaskPanel :task-data="task" />
                </li>
            </transition-group>
        </div>
    </div>
</template>

<script lang="ts">
import Vue, { PropOptions } from 'vue';
import { mapState, mapMutations, mapGetters, mapActions } from 'vuex';
import party from 'party-js';
import { Task, PulldownOption } from '~/types/global';
import { STATE_ID } from '~/assets/ts/variables';

export default Vue.extend({
    props: {
        stateId: {
            type: Number,
            required: true,
        },
        label: {
            type: String,
            required: true,
        },
        sortType: {
            type: String,
            required: true,
        },
        taskList: {
            type: Array,
            required: true,
        } as PropOptions<Task[]>,
    },
    data() {
        return {
            isDragEnter: false,
        };
    },
    computed: {
        ...mapState('task', ['dragoverTaskFlag', 'draggingTaskId']),
        ...mapGetters('task', ['getTaskOfShallowCopy']),
        /** プルダウンに表示するソートタイプ */
        sortTypeListForPulldown(): PulldownOption[] {
            return [
                {
                    label: '登録日（昇順）',
                    value: 'registerAsc',
                },
                {
                    label: '登録日（降順）',
                    value: 'registerDesc',
                },
                {
                    label: '開始日（昇順）',
                    value: 'startDateAsc',
                },
                {
                    label: '開始日（降順）',
                    value: 'startDateDesc',
                },
                {
                    label: '期限日（昇順）',
                    value: 'expirationAsc',
                },
                {
                    label: '期限日（降順）',
                    value: 'expirationDesc',
                },
            ];
        },
        /**
         * sortTypeに対応したソートをタスク一覧に施し、その後ソート済みのタスク一覧を返す
         */
        sortedTaskList(): Task[] {
            const cloneTaskList: Task[] = JSON.parse(
                JSON.stringify(this.taskList)
            );

            switch (this.sortType) {
                case 'registerAsc':
                    return cloneTaskList.sort((a, b) => {
                        return this.compareDateStr(
                            a.registerDate,
                            b.registerDate
                        );
                    });
                case 'registerDesc':
                    return cloneTaskList.sort((a, b) => {
                        return this.compareDateStr(
                            b.registerDate,
                            a.registerDate
                        );
                    });
                case 'startDateAsc':
                    return cloneTaskList.sort((a, b) => {
                        return this.compareDateStr(a.startDate, b.startDate);
                    });
                case 'startDateDesc':
                    return cloneTaskList.sort((a, b) => {
                        return this.compareDateStr(b.startDate, a.startDate);
                    });
                case 'expirationAsc':
                    return cloneTaskList.sort((a, b) => {
                        return this.compareDateStr(
                            a.expirationDate,
                            b.expirationDate
                        );
                    });
                case 'expirationDesc':
                    return cloneTaskList.sort((a, b) => {
                        return this.compareDateStr(
                            b.expirationDate,
                            a.expirationDate
                        );
                    });
            }

            throw new Error('this sortType does not exist.');
        },
        /**
         * 完了ボタンを表示するかどうか
         */
        showDoneBtn(): boolean {
            const idToShow = [STATE_ID.DONE];

            return idToShow.includes(this.stateId);
        },
        disabledDoneBtn(): boolean {
            return this.sortedTaskList.length === 0;
        },
    },
    methods: {
        ...mapActions([
            'moveTaskToAnyStep',
            'changeStatePanelSortType',
            'deleteTask',
        ]),
        ...mapMutations('configBox', ['openTaskAddConfig']),
        ...mapMutations('task', ['setDragoverTaskFlag', 'setDraggingTaskId']),
        ...mapMutations('toast', ['addToast']),
        /**
         * 2つの文字列の日付情報を比較する
         * A（第一引数）が大きい場合は「1」、B（第二引数）が大きい場合は「-1」、同じであれば「0」を返す */
        compareDateStr(dateStrA: string, dateStrB: string) {
            const dateStrAWrap =
                dateStrA === '' ? new Date('2990-1-1') : new Date(dateStrA);
            const dateStrBWrap =
                dateStrB === '' ? new Date('2990-1-1') : new Date(dateStrB);

            if (new Date(dateStrAWrap) > new Date(dateStrBWrap)) {
                return 1;
            }
            if (new Date(dateStrAWrap) < new Date(dateStrBWrap)) {
                return -1;
            }

            return 0;
        },
        /** taskPanelがdragenterしたときの処理 */
        dragenterProcessing() {
            this.isDragEnter = true;
            this.setDragoverTaskFlag(true);
        },
        /** taskPanelがdragleaveしたときの処理 */
        dragleaveProcessing() {
            this.isDragEnter = false;
            this.setDragoverTaskFlag(false);
        },
        /** taskPanelがdropしたときの処理 */
        dropProcessing() {
            this.isDragEnter = false;
            this.moveTaskToAnyStep({
                id: this.draggingTaskId,
                stateId: this.stateId,
            });
            this.setDragoverTaskFlag(false);
            this.setDraggingTaskId(0);
        },
        /** 課題の削除をするときの処理 */
        deleteTaskProcessing() {
            const confirmMessage = `このパネルに登録されている課題を全て削除しますか？`;

            if (confirm(confirmMessage)) {
                const taskListLen = this.sortedTaskList.length;
                for (const task of this.sortedTaskList) {
                    this.addToast(`課題「${task.label}」を削除しました`);
                    this.deleteTask(task.id);
                }

                // 上記の処理と同じタイミングで実行すると紙吹雪がうまく動作しないため、実行を適当にずらす
                setTimeout(() => {
                    this.congratulations(taskListLen);
                }, 100);
            }
        },
        /** おめでたいエフェクトを表示する */
        congratulations(amount: number) {
            const header: HTMLElement | null = document.querySelector(
                '.header'
            );
            if (header) {
                party.confetti(header, {
                    count: amount * 20,
                    spread: 100,
                });
            }
        },
    },
});
</script>

<style lang="scss" scoped>
.state-panel {
    display: flex;
    flex-direction: column;
    box-shadow: $shadow-sm;
    border-radius: 4px;
    background: $c-white;

    &__head {
        padding: $p-lg $p-sm;
        border-bottom: 4px solid $c-gray-light;
    }
    &__label {
        font-size: 2rem;
        font-weight: bold;
    }
    &__head-detail {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    &__order {
        margin-top: $m-md;
    }
    &__btn {
        display: flex;

        > *:not(:first-child) {
            margin-left: $m-xs;
        }
    }
    &__body {
        padding: $p-lg $p-sm;
        border-bottom-left-radius: 4px;
        border-bottom-right-radius: 4px;
        flex-basis: 100%;

        &.is-drag-enter {
            opacity: 0.2;

            * {
                pointer-events: none;
            }
        }
        &:empty {
            padding: $p-lg $p-sm;

            &:before {
                content: '課題がありません';
                display: block;
            }
        }
    }
    &__body-inr {
        > *:not(:first-child) {
            margin-top: $m-md;
        }
        &-enter-active,
        &-leave-active {
            transition: 0.3s;
        }
        &-move {
            transition: 0.3s;
        }
        &-enter,
        &-leave-to {
            opacity: 0;
        }
    }
}
</style>
