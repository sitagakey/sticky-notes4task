<template>
    <input class="datepicker" type="date" />
</template>

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
