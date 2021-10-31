/**
 * 封装本地存储操作模块
 */


// 存储数据
const setItem = (key, value) => {
    if (typeof value === 'object') {
        value = JSON.stringify(value)
    }

    window.localStorage.setItem(key, value)
}


// 获取数据
const getItem = key => {
    var data = window.localStorage.getItem(key)

    try {
        return JSON.parse(data)
    } catch (err) {
        return data
    }
}


//删除数据
const removeItem = key => {
    window.localStorage.removeItem(key)
}

export { setItem, getItem, removeItem }