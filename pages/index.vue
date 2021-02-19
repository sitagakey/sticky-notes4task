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
        this.$nextTick(() => {
            const startTime = performance.now();
            this.$nuxt.$loading.start();

            openDb(dbUpgradeProcess).then((db) => {
                const endTime = performance.now();

                this.$store.dispatch('injectDbDataToStore', db);

                if (endTime - startTime < 400) {
                    setTimeout(() => {
                        this.$nuxt.$loading.finish();
                    }, 400);
                } else {
                    this.$nuxt.$loading.finish();
                }
            });
        });
    },
});
</script>
