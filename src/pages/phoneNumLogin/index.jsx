import Taro, { Component } from "@tarojs/taro";
import { View, Text, Input, Button } from "@tarojs/components";
import { AtButton, AtInput, AtModal, AtModalHeader, AtModalContent, AtModalAction } from "taro-ui";
import NavBar from 'taro-navigationbar'
import api from '../../service/api'
const util = require("../../util/util")
import "./index.scss";

export default class PersonNumLogin extends Component {
    constructor() {
        super(...arguments);
        this.state = {
            // 手机号码
            phoneNumber: '',
            //显示modal
            showModal: false,
            // 发送按钮禁止中
            disableing: false,
            // 验证码页面,true显示,默认隐藏
            countDown: 60,
            // 弹窗提示
            tips:'检测到您的手机号码不合法,请点击确定后修改',
            //验证码
            verifyCode:null,
            // button_loading
            send_loading:false
        };
    }
    componentWillMount() {
        // console.log('看数据',this.state.navBarMarginTop)
    }

    componentDidMount() { }

    componentWillUnmount() { }

    componentDidShow() { }

    componentDidHide() { }
    phoneNumberLogin(){}

    config = {
        navigationBarTitleText: "gxvashgvxhahg",
        navigationStyle: 'custom'
    };
    // 发送手机号和短信验证码
    sendVerifyCode(){
        console.log('验证码',this.state.verifyCode)
        let code = this.state.verifyCode
        let phone = this.state.phoneNumber
        if(code && phone){
            api.post('http://192.168.20.105:99/app/register',{mobile:phone,verifyCode:code},'application/x-www-form-urlencoded').then(res=>{
                console.log('注册结果是',res)
            })
        }
        // 设置button为loading
    }
        // 获取短信验证码
    getCodeApi(phoneNumber){
        console.log('发送手机号获取验证码')
        api.post('http://192.168.20.105:99/app/register/sms',{mobile:phoneNumber},'application/x-www-form-urlencoded')
    }
    // 手机账号登录状态
    // phoneNumberLogin(){
    //     api.post('http://192.168.20.105:99/app/register',{mobile:'18163741211'},'application/x-www-form-urlencoded')
    // }
    // 保存录入的手机号码
    changePhoneNumber(e) {
        this.setState({
            phoneNumber: e
        })
    }
    // 保存验证码
    changeVerifycode(code){
        this.setState({
            verifyCode:code
        })
    }
    // 点击确定隐藏modal
    hideModal() {
        this.setState({
            showModal: false
        })
    }
    // 倒计时 计时器
    countDownTimer (){
        let countDown = this.state.countDown
        let timer = setInterval(() => {
            this.setState({
                countDown:(countDown --)            
            })
            if ( countDown === -1){
                clearInterval(timer)
                this.setState({
                    disableing:false,
                    countDown:60,
                })
            }
        }, 900);
    }
    // 倒计时计时器
    getCode() {
        let phoneNumber = this.state.phoneNumber
        if (phoneNumber && util.isTelPhone(phoneNumber)) {
            this.getCodeApi(phoneNumber)
            this.setState({
                disableing: true,
                tips:'验证码已经发送,请检查信息',
                showModal: true
            })
            this.countDownTimer()

        } else {
            this.setState({
                tips:'检测到您的手机号码不合法,请点击确定后修改',
                showModal: true
            })
        }
    }

    render() {

        return (
            <View>
                <NavBar title='手机号码登录' back></NavBar>
                {
                    // 输入手机号码进行验证 
                    !this.state.verificationByCode &&
                    <View className='padding-top-50'>
                        <AtInput border={true} required={true} placeholder='手机号码' name='phoneNumber' value={this.state.phoneNumber} title='手机号码' onChange={this.changePhoneNumber.bind(this)}>
                            <View className='margin-right-10 width-200'>
                                { !this.state.disableing ?
                                    <AtButton size='small' type='primary' onClick={this.getCode.bind(this)} >发送验证码</AtButton>
                                    : <AtButton disabled circle size='small' type='primary' >{this.state.countDown}秒</AtButton>
                                }
                            </View>
                        </AtInput>
                        <AtInput border={true} required={true} placeholder='验证码' name='number' title='验证码' value={this.state.verifyCode} onChange={this.changeVerifycode.bind(this)}></AtInput>
                        <View className='margin-top-140 width-300'>
                            <AtButton className='bg-blue' loading={this.state.send_loading} onClick={this.sendVerifyCode.bind(this)}>提交验证并登录</AtButton>
                        </View>
                        {/* modal */}
                        {this.state.showModal &&
                            <View>
                                <AtModal isOpened>
                                    <AtModalHeader>提示</AtModalHeader>
                                    <AtModalContent>
                                        {this.state.tips}
                                        </AtModalContent>
                                    <AtModalAction> <Button onClick={this.hideModal.bind(this)}>确定</Button> </AtModalAction>
                                </AtModal>
                            </View>
                        }
                    </View>
                }

            </View>
        );
    }
}