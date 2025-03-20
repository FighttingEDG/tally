// 唯一导出文件，组合所有的导出
import base_config from "./base_config.js";
import test_config,{test_method} from "./test_config.js";

// 合并所有配置
const config = {
    ...base_config,
    ...test_config,
    test_method
}
// 统一导出
export default config;