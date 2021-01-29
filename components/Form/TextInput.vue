<template>
    <input class="text-input" type="text" />
</template>

<style lang="scss" scoped>
.text-input {
    width: 100%;
    display: block;
    position: relative;
    padding: $p-xs;
    border: 1px solid $c-gray;
    border-radius: 4px;
    max-height: 35px;
    font-size: 1.6rem;

    &:focus {
        outline: 0;
        border: 1px solid $c-secondary;
    }
}
</style>
