<template>
    <div>
        <Header :h1="false" />
        <AboutMainContent />
        <Footer />
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
export default Vue.extend({
    head: {
        title: 'このアプリについて | カダイの付箋',
    },
    mounted() {
        this.$nextTick(() => {
            this.$nuxt.$loading.finish();
        });
    },
});
</script>
