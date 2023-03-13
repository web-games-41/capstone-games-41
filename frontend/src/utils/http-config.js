

export const httpConfig = axios.create();

httpConfig.interceptors.response.use(function ({data, headers}))