// 唯一导出文件，组合所有的导出
import base_config from "./base_config.js";
import appConfig from "./app_config.js";

// 合并所有配置
const config = {
    ...base_config,
    ...appConfig
}
// 统一导出
export default config;