<template>
    <transition-group
        tag="ul"
        class="toast-list"
        name="toast-list"
        mode="in-out"
    >
        <li
            v-for="listItem in listItemArr"
            :key="listItem.id"
            :class="`is-${listItem.state}`"
            class="toast-list__item"
        >
            <p class="toast-list__label">{{ listItem.label }}</p>
            <button
                class="toast-list__close-btn"
                type="button"
                @click="$emit('close', listItem.id)"
            >
                閉じる
            </button>
        </li>
    </transition-group>
</template>

<script lang="ts">
import Vue, { PropOptions } from 'vue';
import { Toast } from '~/types/global';

export default Vue.extend({
    props: {
        listItemArr: {
            type: Array,
            required: true,
        } as PropOptions<Toast[]>,
    },
});
</script>

<style lang="scss" scoped>
.toast-list {
    display: flex;
    align-items: flex-end;
    flex-direction: column;
    position: fixed;
    top: 0;
    right: 0;
    padding: $p-sm;

    &__item {
        display: inline-flex;
        align-items: center;
        background-color: $c-gray-light;
        border-radius: 4px;
        box-shadow: $shadow-md;
        font-size: 1.4rem;
        color: $c-gray-dark;

        &:not(:first-child) {
            margin-top: $m-sm;
        }
    }
    &__label {
        padding: $p-xs $p-sm;
        flex-grow: 1;
    }
    &__close-btn {
        padding: $p-xs $p-sm;
        border-left: 1px solid $c-gray;
        color: $c-gray-dark;
        font-size: 1.4rem;
        white-space: nowrap;
    }
    &-enter-active,
    &-leave-active,
    &-move {
        transition: 0.3s;
    }
    &-enter,
    &-leave-to {
        opacity: 0;
        transform: translateX(30px);
    }
}
</style>
