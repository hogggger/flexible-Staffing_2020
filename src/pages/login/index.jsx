import Taro, { Component } from "@tarojs/taro";
import { View, Picker, Text, Label } from "@tarojs/components";
import { AtForm, AtInput, AtButton } from "taro-ui";
import NavBar from 'taro-navigationbar'
import "./index.scss";

export default class PersonInfo extends Component {
    constructor() {
        super(...arguments);
        this.state = {
        };
    }

    componentWillMount() {
        // console.log('看数据',this.state.navBarMarginTop)
        console.log('打印登录信息')
        this.dologin()
 
    }

    componentDidMount() { }

    componentWillUnmount() { }
    dologin = ()=>{
        Taro.login({
            success(res){
                console.log('res',res.code)
                Taro.request({
                    url:'http://m8mhir.natappfree.cc/fsp/app/login?',
                    data:{code:res.code},
                    header:{ 'content-type':'application/x-www-form-urlencoded'},
                    method:"POST"
                }).then((res1)=>{
                    console.log(res1)
                })
            }
        })
    }
    componentDidShow() { }

    componentDidHide() { }

    config = {
        navigationBarTitleText: "gxvashgvxhahg",
        navigationStyle: 'custom'
    };
    getPhoneNumber(e){
        console.log('e',e.detail)
    }
  

    render() {
        return (
            <View>
                <NavBar title='登录' back background='#0081ff' color='#fff' iconTheme='white'></NavBar>
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
