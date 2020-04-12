import Taro, { Component } from '@tarojs/taro'
// 获取页面胶囊的位置
function getCapsulePosition (){
    Taro.getSystemInfo({}).then(res =>{
        Taro.$navBarMarginTop = res.statusBarHeight || 0
        // console.log('输出系统打印的数据',res.statusBarHeight)
    })
};
module.exports = {
    getCapsulePosition
}