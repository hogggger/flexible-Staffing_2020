import Taro, { Component } from "@tarojs/taro";
import { View, Text, Input, Button, Image } from "@tarojs/components";
import { AtButton } from "taro-ui";
import NavBar from 'taro-navigationbar'
import UploadImage from '../../components/uploadImage'

const util = require("../../util/util")
import "./index.scss";

export default class IdentifyCard extends Component {
    constructor() {
        super(...arguments);
        this.state = {
            img: {
                id1: require('../../../images/id1.jpg'),
                id2: require('../../../images/id2.jpg')
            }
        };
    }
    componentWillMount() {
    }

    componentDidMount() { }

    componentWillUnmount() { }

    componentDidShow() { }

    componentDidHide() { }

    config = {
        navigationBarTitleText: "gxvashgvxhahg",
        navigationStyle: 'custom'
    };

    render() {

        return (
            <View>
                <NavBar title='身份认证' back></NavBar>
                <View>完成认证需要合适你的身份信息,请拍摄你本人的身份证</View>
                {/* 身份证上传 */}
                <View className='box-shadow-blue width-400 padding-top-40'>
                    {/* 引导上传框 */}
                    <View className='margin-top-50 text-center'>
                        <UploadImage guideImage={this.state.img.id1}></UploadImage>
                    </View>
                    <View className='margin-top-50 text-center'>
                        <UploadImage guideImage={this.state.img.id2}></UploadImage>
                    </View>

                    <AtButton className='bg-blue margin-top-50'>提交</AtButton>
                </View>
            </View>
        );
    }
}