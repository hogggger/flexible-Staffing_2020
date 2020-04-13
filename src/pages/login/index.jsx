import Taro,{Component}  from '@tarojs/taro'
import {View,Text} from '@tarojs/components'
import {AtButton,AtNavBar} from 'taro-ui'
import './index.scss'


export default class Login extends Component {
    constructor() {
      super(...arguments);
      this.state = {
        // 胶囊高度
        navBarMarginTop:Taro.$navBarMarginTop +'px'
      };
    }
    
    componentWillMount() {
      // console.log('看数据',this.state.navBarMarginTop)
    }
    
  
    componentDidMount() {}
  
    componentWillUnmount() {}
  
    componentDidShow() {}
  
    componentDidHide() {}

    config = {
      navigationBarTitleText: "gxvashgvxhahg",
      navigationStyle:'custom'
    };
    getPhoneNumber(e){
        console.log('e',e)
    }
    render() {
      const style = 'padding-top'+ ':'+this.state.navBarMarginTop +';'+'background:#0081ff;'
      return (
        <View>
            <AtNavBar customStyle={style}   leftText='首页' title='登录'></AtNavBar>
            <View className='login-header order-transparent text-center'>
                <View className='login-tip font-size-18 color-white'>请选择您的登录方式,建议使用微信快速登录</View>
            </View>
            {/* 两种登录方式 */}
            <View className='margin-top-50 login-button' ><AtButton className='bg-blue' openType='getPhoneNumber' onGetPhoneNumber={this.getPhoneNumber}>微信快速授权/登录</AtButton></View>
            <View className='margin-top-10 login-button'><AtButton>输入手机号登录</AtButton></View>
        </View>
      );
    }
  }
  