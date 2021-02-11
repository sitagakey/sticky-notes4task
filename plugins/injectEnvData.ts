import { Plugin } from '@nuxt/types';

export default (({ env }, inject) => {
    inject('version', env.version);
}) as Plugin;
