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
                </ul>
            </div>
            <div class="state-panel__order">
                <Pulldown
                    :options="pulldownOptions"
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
import { mapState, mapMutations, mapGetters } from 'vuex';
import { Task, PulldownOption } from '~/types/global';

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
        ...mapState(['dragoverTaskFlag', 'draggingTaskId']),
        ...mapGetters(['getTaskOfShallowCopy']),
        pulldownOptions(): PulldownOption[] {
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
    },
    methods: {
        ...mapMutations([
            'changeStatePanelSortType',
            'openTaskAddConfig',
            'setDragoverTaskFlag',
            'setDraggingTaskId',
            'setTask',
        ]),
        compareDateStr(dateStrA: string, dateStrB: string) {
            const dateStrAWrap =
                dateStrA === '' ? new Date('1970-1-1') : new Date(dateStrA);
            const dateStrBWrap =
                dateStrB === '' ? new Date('1970-1-1') : new Date(dateStrB);

            if (new Date(dateStrAWrap) > new Date(dateStrBWrap)) {
                return 1;
            }
            if (new Date(dateStrAWrap) < new Date(dateStrBWrap)) {
                return -1;
            }

            return 0;
        },
        dragenterProcessing() {
            this.isDragEnter = true;
            this.setDragoverTaskFlag(true);
        },
        dragleaveProcessing() {
            this.isDragEnter = false;
            this.setDragoverTaskFlag(false);
        },
        dropProcessing() {
            const task = this.getTaskOfShallowCopy(this.draggingTaskId);
            task.stateId = this.stateId;
            this.isDragEnter = false;
            this.setTask(task);
            this.setDragoverTaskFlag(false);
            this.setDraggingTaskId(0);
        },
    },
});
</script>

<style lang="scss" scoped>
.state-panel {
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
