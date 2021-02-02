<template>
    <div class="state-panel">
        <div class="state-panel__head">
            <div class="state-panel__head-detail">
                <p class="state-panel__label">{{ label }}</p>
                <ul class="state-panel__btn">
                    <li><AdditionalBtn /></li>
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
        <ul class="state-panel__body">
            <li v-for="task in taskList" :key="task.registerDate">
                <TaskPanel :task-data="task" />
            </li>
        </ul>
    </div>
</template>

<script lang="ts">
import Vue, { PropOptions } from 'vue';
import { mapMutations } from 'vuex';
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
    computed: {
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
    },
    methods: {
        ...mapMutations(['changeStatePanelSortType']),
    },
});
</script>

<style lang="scss" scoped>
.state-panel {
    box-shadow: $shadow-sm;
    border-radius: 4px;
    background: $c-white;

    &__head {
        padding: $p-sm $p-sm $p-lg $p-sm;
        border-bottom: 4px dashed $c-gray-light;
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
        padding: $p-lg $p-sm $p-sm $p-sm;

        > *:not(:first-child) {
            margin-top: $m-md;
        }
    }
}
</style>
