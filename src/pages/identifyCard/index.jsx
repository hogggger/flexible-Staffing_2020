import Taro, { Component,Events } from "@tarojs/taro";
import { View, Text, Input, Button, Image } from "@tarojs/components";
import { AtButton } from "taro-ui";
import api  from "../../service/api"
import NavBar from "taro-navigationbar"
import UploadImage from '../../components/uploadImage'

const util = require("../../util/util")
import "./index.scss";

export default class IdentifyCard extends Component {
    constructor() {
        super(...arguments);
        this.state = {
            img: {
                id2: require('../../../images/id1.jpg'),
                id1: require('../../../images/id2.jpg')
            },
            statusFront:false,
            statusBack:false
        };
    }
    componentWillMount() {
        Taro.eventCenter.on('statusFront',(arg)=>{
            this.setState({
                statusFront:arg
            })
        })
        Taro.eventCenter.on('statusBack',(arg)=>{
            this.setState({
                statusBack:arg
            })
        })

    }

    componentDidMount() { 
    // 获取图片上传的token
       this.getFormDataParams()
    }

    componentWillUnmount() { }

    componentDidShow() { }

    componentDidHide() { }

    config = {
        navigationBarTitleText: "gxvashgvxhahg",
        navigationStyle: 'custom'
    };
    //跳转
    navigateTo(){
        console.log('statusBack',this.state.statusBack)
        console.log('statusFront',this.state.statusFront)
        let statusFront = this.state.statusFront
        let statusBack = this.state.statusBack
        if( statusBack == 'true' && statusFront =='true'){
            Taro.navigateTo({
                url:'../personInfo/index'
            })
            console.log('跳转')
        }
    } 

    // 获取表单初始化参数
    getFormDataParams(){
      api.get('http://192.168.20.105:99/app/labor/edit').then(res=>{
        //   console.log('res',res)
          if(res.data.code == 0){
              Taro.setStorageSync('form_token',res.data.param.form_token)
          }
      })
    }
    render() {

        return (
            <View>
                <NavBar title='身份认证' back></NavBar>
                <View>完成认证需要合适你的身份信息,请拍摄你本人的身份证</View>
                {/* 身份证上传 */}
                <View className='box-shadow-blue width-400 padding-top-40'>
                    {/* 引导上传框 */}
                    <View className='margin-top-50 text-center'>
                        <UploadImage guideImage={this.state.img.id1} side='front'></UploadImage>
                    </View>
                    <View className='margin-top-50 text-center'>
                        <UploadImage guideImage={this.state.img.id2} side='back'></UploadImage>
                    </View>

                    <AtButton className='bg-blue margin-top-50' onClick={this.navigateTo.bind(this)}>提交</AtButton>
                </View>
            </View>
        );
    }
}