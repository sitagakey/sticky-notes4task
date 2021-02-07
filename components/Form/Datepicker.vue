<template>
    <input
        class="datepicker"
        type="date"
        :value="inputDateValue"
        @input="$emit('input', $event.target.value)"
    />
</template>

<script lang="ts">
import Vue, { PropOptions } from 'vue';
import { formatDate } from '~/assets/ts/utils.ts';

type InputDateValue = Date | '';

export default Vue.extend({
    props: {
        value: {
            type: [Date, String],
            required: true,
        } as PropOptions<InputDateValue>,
    },
    computed: {
        inputDateValue(): string {
            if (typeof this.value === 'string') {
                return '';
            }

            return formatDate(this.value, 'yyyy-MM-dd');
        },
    },
});
</script>

<style lang="scss" scoped>
.datepicker {
    width: 100%;
    display: block;
    position: relative;
    padding: $p-xs;
    border: 1px solid $c-gray;
    border-radius: 4px;
    max-height: 35px;
    font-size: 1.6rem;
    background-color: $c-white;

    &:focus {
        outline: 0;
        border: 1px solid $c-secondary;
    }
}
</style>
