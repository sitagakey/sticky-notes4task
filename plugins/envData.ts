import { Plugin } from '@nuxt/types';

const envData: Plugin = ({ env }, inject) => {
    inject('version', env.version);
};

export default envData;
