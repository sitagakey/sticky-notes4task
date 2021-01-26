<template>
    <div class="pulldown">
        <select id="pulldown__todo" class="pulldown__content" title="並び替え">
            <option value="deadline-desc">期限日降順</option>
            <option value="deadline-asc">期限日昇順</option>
        </select>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
export default Vue.extend({});
</script>

<style lang="scss" scoped>
.pulldown {
    display: block;
    position: relative;

    &__content {
        display: block;
        width: 100%;
        font-size: 1.6rem;
        appearance: none;
        background: transparent;
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
