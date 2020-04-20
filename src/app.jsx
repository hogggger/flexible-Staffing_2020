import Taro, { Component } from '@tarojs/taro'
import 'taro-ui/dist/style/index.scss' 
import Index from './pages/index'
const util = require('./util/util')

import './app.scss'

// 如果需要在 h5 环境中开启 React Devtools
// 取消以下注释：
// if (process.env.NODE_ENV !== 'production' && process.env.TARO_ENV === 'h5')  {
//   require('nerv-devtools')
// }

class App extends Component {

  componentDidMount () {
    util.getCapsulePosition()
  }

  componentDidShow () {}

  componentDidHide () {}

  componentDidCatchError () {}

  config = {
    pages: [
      // 组件不可在此注册
      'pages/index/index',
      'pages/allTask/index',
      'pages/sign/index',
      'pages/contract/index',
      'pages/order/index',
      'pages/identifyCard/index',
      'pages/personInfo/index',
      'pages/login/index',
      'pages/phoneNumLogin/index'
      
      
      
      
      
      

    ],
    window: {
      backgroundTextStyle: 'light',
      navigationBarBackgroundColor: '#fff',
      navigationBarTitleText: 'WeChat',
      navigationBarTextStyle: 'black',
      navigationStyle:'default'
    }
  }

  // 在 App 类中的 render() 函数没有实际作用
  // 请勿修改此函数
  render () {
    return (
      <Index />
    )
  }
}

Taro.render(<App />, document.getElementById('app'))
