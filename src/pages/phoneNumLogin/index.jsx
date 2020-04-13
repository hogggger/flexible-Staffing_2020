import Taro, { Component, showModal } from "@tarojs/taro";
import { View, Text, Input, Button } from "@tarojs/components";
import { AtNavBar, AtButton, AtInput, AtModal, AtModalHeader, AtModalContent, AtModalAction } from "taro-ui";
import { PhoneVerification } from "../../components/phoneVerification"
const util = require("../../util/util")
import "./index.scss";

export default class PersonNumLogin extends Component {
    constructor() {
        super(...arguments);
        this.state = {
            navBarMarginTop: Taro.$navBarMarginTop + 'px',
            // 手机号码
            phoneNumber: '',
            //显示modal
            showModal: false,
            // 验证码页面,true显示,默认隐藏
            verificationByCode:false
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
    sendCode() {
        // console.log('e',this.state.phoneNumber)
        // 先校验手机号码合法性
        const isTel = util.isTelPhone(this.state.phoneNumber)
        if (isTel) {
            this.setState({
                verificationByCode:true
            })
        } else {
            this.setState({
                showModal: true
            })
        }

    }
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

    render() {
        const style = 'margin-top' + ':' + this.state.navBarMarginTop
        return (
            <View>
                <AtNavBar title='手机号登录' customStyle={style}></AtNavBar>
                <View className='padding-top-140'></View> 
                {
                    // 输入手机号码进行验证
                    !this.state.verificationByCode &&
                    <View className='padding-top-50'>
                        <AtInput border={true} required={true} placeholder='手机号码' name='phoneNumber' value={this.state.phoneNumber} title='手机号码' onChange={this.changePhoneNumber.bind(this)}></AtInput>
                        <View>{this.state.phoneNumber}</View>
                        <View className='margin-top-140 width-300'>
                            <AtButton className='bg-blue' onClick={this.sendCode.bind(this)}>发送验证码</AtButton>
                        </View>
                        {/* modal */}
                        {this.state.showModal &&
                            <View>
                                <AtModal isOpened>
                                    <AtModalHeader>提示</AtModalHeader>
                                    <AtModalContent>
                                        检测到您的手机号码不合法,请点击确定后修改
                                            </AtModalContent>
                                    <AtModalAction> <Button onClick={this.hideModal.bind(this)}>确定</Button> </AtModalAction>
                                </AtModal>
                            </View>
                        }
                    </View>
                }
                {/* 输入验证码进行登录 */}
                { this.state.verificationByCode && <PhoneVerification phoneNumber={this.state.phoneNumber}></PhoneVerification>}

            </View>
        );
    }
}
