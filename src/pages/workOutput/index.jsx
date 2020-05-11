import Taro, { Component, Events } from "@tarojs/taro";
import { View, Text, Input, Button, Image } from "@tarojs/components";
import { AtButton, AtTextarea, AtImagePicker,AtToast } from "taro-ui";
import { labor_edit } from "../../config/base"
import api from "../../service/api"
import NavBar from "taro-navigationbar"

const util = require("../../util/util")
import "./index.scss";

export default class WorkOutput extends Component {
    constructor() {
        super(...arguments);
        this.state = {
            // 凭证描述
            descContent: '',
            files: [],
            showAddBtn:true,
            // 轻提示
            toastMessage:'',
            toastStatus:'',
            showToast:false,
            // orderId订单号
            orderId:''
        };
    }
    componentWillMount() {
       this.setState({
        orderId:this.$router.params.orderId
       })
    }

    componentDidMount() {
    }

    componentWillUnmount() { }

    componentDidShow() { }

    componentDidHide() { }
    // 上传凭证页面应该接受一个订单号
    config = {
        navigationBarTitleText: "gxvashgvxhahg",
        navigationStyle: 'custom'
    };
    // 
    ChangeDescContent(value) {
        this.setState({
            descContent: value
        })
    }
    onChange (files) {
        this.setState({
          files:files
        })
        console.log('files',files)
        if(files.length>=1){
            this.setState({
                showAddBtn:false
            })
        }else{
            this.setState({
                showAddBtn:true
            })
        }
      }
      onFail (mes) {
        console.log(mes)
      }
      onImageClick (index, file) {
        console.log(index, file)
      }
    //   提交按钮
      submit(){
        // 确定图片上传,补充内容填写
        let orderId = this.state.orderId
        let file = this.state.files
        let descContent = this.state.descContent
        let fileurl = file[0].url
        if(file.length == 0){
            // console.log('文件长度为0')
            this.setState({
                showToast:true,
                toastStatus:'error',
                toastMessage:'请上传图片凭证'
            })
        }else if(descContent.length == 0){
            this.setState({
                showToast:true,
                toastStatus:'error',
                toastMessage:'请填写说明'
            })
        }else{
            this.setState({
                showToast:true,
                toastStatus:'loading',
                toastMessage:'提交中...'
            })
            console.log('图片文件',fileurl)
            // 上传图片接口
            this.uploadStuff(fileurl,orderId)
        }
      }
    //   toast自动关闭
    closeToast(){
        this.setState({
            showToast:false
        })
    }
    // 上传图片和其他相关细细  上传凭证 未完工
    uploadStuff(imgUrl,orderId){
        let token = Taro.getStorageSync("token");
        Taro.uploadFile({
        //   url: base+contract_sign,
          header: {
            'content-type': 'multipart/form-data',
            'Authorization': token
          },
          name: 'sign',
          filePath: imgUrl,
          formData: {
            // 填入参数
            'contractId':orderId
          },
          success: value => {
            console.log('value',value)
            // 成功则跳回原来的页面
            Taro.navigateBack({
              delta:1,
            })
          }
      })
      }
    render() {
        let showToast = this.state.showToast
        return (
            <View>
                <NavBar title='上传凭证' back></NavBar>
                <AtToast isOpened={showToast} duration={1000}  onClose={this.closeToast.bind(this)} text={this.state.toastMessage} status={this.state.toastStatus}></AtToast>
                <View className='padding-20 at-article__p'>上传您的工作凭证</View>
                {/* 身份证上传 */}
                <View className='box-shadow-blue width-400 padding-top-40'>
                    <View className='imagePicker'>
                    <AtImagePicker
                        count={1}
                        length={1}  
                        showAddBtn={this.state.showAddBtn}                   
                        files={this.state.files}
                        onChange={this.onChange.bind(this)}
                        onFail={this.onFail.bind(this)}
                        onImageClick={this.onImageClick.bind(this)}
                    />
                    </View>
                    <View className='padding-10 margin-top-50'>
                        <AtTextarea
                            value={this.state.descContent}
                            onChange={this.ChangeDescContent.bind(this)}
                            maxLength={200}
                            placeholder='描述'
                        />
                    </View>
                </View>
                <AtButton className='bg-blue submit_button' onClick={this.submit.bind(this)} >提交凭证</AtButton>
            </View>
        );
    }
}