<template>
    <div>
        <Header />
        <MainContent />
        <Footer />
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { openDb, dbUpgradeProcess } from '~/assets/ts/indexedDb';

export default Vue.extend({
    mounted() {
        openDb(dbUpgradeProcess).then((db) => {
            this.$store.dispatch('injectDbDataToStore', db);
        });
    },
});
</script>
