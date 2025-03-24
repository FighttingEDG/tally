// 一些处理数据的工具方法
// 处理时间为年月日格式
export function handleData(time) {
    const date = new Date(time);
    return `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日`;
}