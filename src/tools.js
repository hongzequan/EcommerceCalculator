// 工具函数用于快速读取和存储数据到 localStorage

// 存储数据
export function setLocalStorage(key, value) {
    // 检查value是否存在
    if (value !== null && value !== undefined) {
        // 将值转换为JSON字符串
        const stringValue = JSON.stringify(value);
        localStorage.setItem(key, stringValue);
    } else {
        console.warn(`Value for key '${key}' is null or undefined. Not storing in localStorage.`);
    }
}

//获取数据
export function getLocalStorage(key) {
    const value = localStorage.getItem(key);
    // 检查值是否存在
    if (value !== null) {
        try {
            // 尝试将JSON字符串转换回对象
            return JSON.parse(value);
        } catch (error) {
            // 如果解析失败，返回原始字符串
            return value;
        }
    } else {
        // 如果值不存在，返回null或默认值
        return null;
    }
}


// 删除数据
export function removeLocalStorage(key) {
    localStorage.removeItem(key);
}

// 清空所有数据
export function clearLocalStorage() {
    localStorage.clear();
}

//   // 示例使用
//   // 设置数据
//   setLocalStorage('name', '张三');
//   // 获取数据
//   const name = getLocalStorage('name');
//   console.log(name); // 输出：张三
//   // 删除数据
//   removeLocalStorage('name');
//   // 清空所有数据
//   clearLocalStorage();
