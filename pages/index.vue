<template>
    <div>
        <Header />
        <MainContent />
        <Footer />
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapState } from 'vuex';
import { openDb, dbUpgradeProcess } from '~/assets/ts/indexedDb';

export default Vue.extend({
    computed: {
        ...mapState(['bc']),
    },
    mounted() {
        if ('BroadcastChannel' in window && !this.bc) {
            this.$store.commit(
                'setBc',
                new BroadcastChannel('sticky-notes4task')
            );
            this.waitForMessageFromBc();
        }

        this.sendForMessageToBc(
            '別のタブでも「カダイの付箋」が開かれています。\n正常な処理を行うためにはどちらかのタブを閉じる必要があります。'
        );

        this.$nextTick(() => {
            this.$nuxt.$loading.start();

            openDb(dbUpgradeProcess).then((db) => {
                this.$store.dispatch('injectDbDataToStore', db);
                this.$nuxt.$loading.finish();
            });
        });
    },
    methods: {
        /**
         * BoradcastChannel経由のメッセージがくるのを待機する
         */
        waitForMessageFromBc() {
            if (!this.bc) {
                throw new Error('BroadcastChannel is not set.');
            }

            this.bc.onmessage = (message: MessageEvent) => {
                alert(message.data);
            };
        },
        /**
         * BoradcastChannel経由でメッセージを送る
         */
        sendForMessageToBc(message: string) {
            if (!this.bc) {
                throw new Error('BroadcastChannel is not set.');
            }

            this.bc.postMessage(message);
        },
    },
});
</script>
