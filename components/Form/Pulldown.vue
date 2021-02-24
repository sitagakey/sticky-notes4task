<template>
    <div class="pulldown">
        <select
            :id="id"
            ref="pulldownContent"
            class="pulldown__content"
            :title="title"
            @input="$emit('input', $event.target.value)"
        >
            <option
                v-for="option in options"
                :key="option.value"
                :value="option.value"
                :selected="option.value === selected"
            >
                {{ option.label }}
            </option>
        </select>
    </div>
</template>

<script lang="ts">
import Vue, { PropOptions } from 'vue';
import { PulldownOption } from '~/types/global';

export default Vue.extend({
    props: {
        id: {
            type: String,
            default: '',
        },
        options: {
            type: Array,
            required: true,
        } as PropOptions<PulldownOption[]>,
        selected: {
            type: String,
            default: '',
        },
        title: {
            type: String,
            default: '',
        },
    },
    updated() {
        const value = (this.$refs.pulldownContent as HTMLSelectElement).value;

        this.$emit('input', value);
    },
    mounted() {
        if (this.selected === '') {
            this.$nextTick(() => {
                const value = (this.$refs.pulldownContent as HTMLSelectElement)
                    .value;

                this.$emit('input', value);
            });
        }
    },
});
</script>

<style lang="scss" scoped>
.pulldown {
    display: block;
    position: relative;
    background: $c-white;

    &__content {
        display: block;
        width: 100%;
        font-size: 1.6rem;
        appearance: none;
        background: $c-white;
        border: 1px solid $c-gray;
        border-radius: 4px;
        padding: $p-xs calc(#{$p-xs} + #{$p-xs} + 12px) $p-xs $p-xs;

        &:focus {
            outline: 0;
            border: 1px solid $c-secondary;
        }
    }
    &::after {
        content: '';
        display: block;
        border-left: 6px solid transparent;
        border-right: 6px solid transparent;
        border-top: 6px solid $c-secondary;
        position: absolute;
        right: 10px;
        top: calc(50% - 3px);
    }
}
</style>
