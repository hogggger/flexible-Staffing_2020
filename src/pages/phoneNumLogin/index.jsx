import Taro, { Component } from "@tarojs/taro";
import { View, Text, Input, Button } from "@tarojs/components";
import { AtButton, AtInput, AtModal, AtModalHeader, AtModalContent, AtModalAction } from "taro-ui";
import NavBar from 'taro-navigationbar'
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
            tips:'检测到您的手机号码不合法,请点击确定后修改'
        };
    }
    componentWillMount() {
        // console.log('看数据',this.state.navBarMarginTop)
    }

    componentDidMount() { }

    componentWillUnmount() { }

    componentDidShow() { }

    componentDidHide() { }

    config = {
        navigationBarTitleText: "gxvashgvxhahg",
        navigationStyle: 'custom'
    };
    // 保存录入的手机号码
    changePhoneNumber(e) {
        this.setState({
            phoneNumber: e
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
    sendCode() {
        let phoneNumber = this.state.phoneNumber
        if (phoneNumber && util.isTelPhone(phoneNumber)) {
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
                                    <AtButton size='small' type='primary' onClick={this.sendCode.bind(this)} >发送验证码</AtButton>
                                    : <AtButton disabled circle size='small' type='primary' >{this.state.countDown}秒</AtButton>
                                }
                            </View>
                        </AtInput>
                        <AtInput border={true} required={true} placeholder='验证码' name='number' title='验证码' ></AtInput>
                        <View className='margin-top-140 width-300'>
                            <AtButton className='bg-blue' onClick={this.sendCode.bind(this)}>提交验证并登录</AtButton>
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