<template>
    <div class="task-panel">
        <div class="task-panel__head">
            <div class="task-panel__head-group">
                <p class="task-panel__label">{{ taskData.label }}</p>
                <ul class="task-panel__btn">
                    <li>
                        <ArrowBtn
                            :alt="`${taskData.label}の状態をドラッグ&ドロップで変更する`"
                        />
                    </li>
                    <li>
                        <MenuBtn
                            :alt="`${taskData.label}の内容を編集する`"
                            @click="
                                openTaskEditConfig({
                                    taskId: taskData.id,
                                    taskLabel: taskData.label,
                                })
                            "
                        />
                    </li>
                </ul>
            </div>
            <p v-if="taskData.existDescription" class="task-panel__desc">
                {{ taskData.description }}
            </p>
        </div>
        <div v-if="existBody" class="task-panel__body">
            <div class="task-panel__detail">
                <dl class="task-panel__detail-inr">
                    <div
                        v-if="taskData.existRegisterDate"
                        class="task-panel__detail-item"
                    >
                        <dt class="task-panel__detail-label">登録日</dt>
                        <dd class="task-panel__detail-desc">
                            {{ registerDate }}
                        </dd>
                    </div>
                    <div
                        v-if="startDate !== '' && taskData.existStartDate"
                        class="task-panel__detail-item"
                    >
                        <dt class="task-panel__detail-label">開始日</dt>
                        <dd class="task-panel__detail-desc">
                            {{ startDate }}
                        </dd>
                    </div>
                    <div
                        v-if="
                            expirationDate !== '' &&
                            taskData.existExpirationDate
                        "
                        class="task-panel__detail-item"
                    >
                        <dt class="task-panel__detail-label">期限日</dt>
                        <dd
                            :class="{ 'is-dead-line': isDeadLine }"
                            class="task-panel__detail-desc"
                        >
                            {{ expirationDate }}
                        </dd>
                    </div>
                    <div
                        v-if="taskData.existCategory"
                        class="task-panel__detail-item"
                    >
                        <dt class="task-panel__detail-label">カテゴリー</dt>
                        <dd class="task-panel__detail-desc">
                            {{ categoryLabelList[`id${taskData.categoryId}`] }}
                        </dd>
                    </div>
                </dl>
            </div>
        </div>
        <div v-if="existFoot" class="task-panel__foot">
            <div class="task-panel__controller">
                <ul class="task-panel__controller-inr">
                    <li class="task-panel__controller-item">
                        <ArrowBtn state="left" />
                    </li>
                    <li class="task-panel__controller-item">
                        <ArrowBtn state="right" />
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import Vue, { PropOptions } from 'vue';
import { mapGetters, mapMutations } from 'vuex';
import { Task } from '~/types/global';

export default Vue.extend({
    props: {
        taskData: {
            type: Object,
            required: true,
        } as PropOptions<Task>,
    },
    computed: {
        ...mapGetters(['categoryLabelList']),
        existBody() {
            const {
                existRegisterDate,
                existStartDate,
                existExpirationDate,
                existCategory,
            } = this.taskData;

            return (
                existRegisterDate ||
                existStartDate ||
                existExpirationDate ||
                existCategory
            );
        },
        existFoot() {
            const { existCategory } = this.taskData;

            return existCategory;
        },
        registerDate(): string {
            return this.taskData.registerDate.replace(/-/g, '/');
        },
        startDate(): string {
            return this.taskData.startDate.replace(/-/g, '/');
        },
        expirationDate(): string {
            return this.taskData.expirationDate.replace(/-/g, '/');
        },
        isDeadLine(): boolean {
            const expiration = new Date(this.taskData.expirationDate);
            const today = new Date();

            return today >= expiration;
        },
    },
    methods: {
        ...mapMutations(['openTaskEditConfig']),
    },
});
</script>

<style lang="scss" scoped>
.task-panel {
    border-radius: 4px;
    border: 1px solid $c-gray;

    &__head {
        padding: $p-sm;
    }
    &__head-group {
        display: flex;
        justify-content: space-between;
    }
    &__label {
        font-size: 1.8rem;
        font-weight: bold;
    }
    &__desc {
        margin-top: $m-xs;
        font-size: 1.4rem;
        color: $c-gray-dark;
    }
    &__order {
        margin-top: $m-md;
    }
    &__btn {
        display: flex;
        margin-left: $m-xs;

        > *:not(:first-child) {
            margin-left: $m-xs;
        }
    }
    &__body {
        padding: 0 $p-sm;
        font-size: 1.4rem;
    }
    &__detail {
        padding: $p-sm 0;
        border-top: 1px solid $c-gray-light;
    }
    &__detail-inr {
        display: flex;
        flex-wrap: wrap;
        color: $c-gray-dark;
        margin-top: -#{$m-sm};
        margin-left: -#{$m-md};
    }
    &__detail-item {
        font-size: 1.2rem;
        margin-top: $m-sm;
        margin-left: $m-md;
    }
    &__detail-label {
        display: flex;
        align-items: center;
        white-space: nowrap;

        &::before {
            content: '';
            display: block;
            width: 8px;
            height: 8px;
            background-color: $c-gray-dark;
            border-radius: 2px;
            margin-right: $m-2xs;
        }
    }
    &__detail-desc {
        margin-top: $m-2xs;

        &.is-dead-line {
            color: $c-pink;
            font-weight: bold;
        }
    }
    &__foot {
        padding: 0 $p-sm;
        font-size: 1.4rem;
    }
    &__controller {
        padding: $p-sm 0;
        border-top: 1px solid $c-gray-light;
    }
    &__controller-inr {
        display: flex;
        justify-content: flex-end;
        flex-wrap: wrap;
        color: $c-gray-dark;
        margin-top: -#{$m-sm};
        margin-left: -#{$m-xs};
    }
    &__controller-item {
        font-size: 1.2rem;
        margin-top: $m-sm;
        margin-left: $m-xs;
    }
}
</style>
