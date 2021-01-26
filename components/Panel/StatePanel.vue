<template>
    <div class="state-panel">
        <div class="state-panel__head">
            <div class="state-panel__head-detail">
                <p class="state-panel__label">未対応</p>
                <ul class="state-panel__btn">
                    <li><AdditionalBtn /></li>
                    <li><MenuBtn /></li>
                </ul>
            </div>
            <div class="state-panel__order">
                <Pulldown />
            </div>
        </div>
        <ul class="state-panel__body">
            <li><TaskPanel /></li>
            <li><TaskPanel /></li>
            <li><TaskPanel /></li>
        </ul>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
export default Vue.extend({});
</script>

<style lang="scss" scoped>
.state-panel {
    box-shadow: $shadow-sm;
    border-radius: 4px;

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
