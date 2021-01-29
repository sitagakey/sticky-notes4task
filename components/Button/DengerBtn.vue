<template>
    <button class="denger-btn">
        {{ label }}
    </button>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
    props: {
        label: {
            type: String,
            required: true,
        },
    },
});
</script>

<style lang="scss" scoped>
.denger-btn {
    display: block;
    background-color: $c-pink;
    border-radius: 4px;
    font-size: 1.4rem;
    color: $c-white;
    padding: $p-xs $p-md;
    min-height: 40px;
}
</style>
