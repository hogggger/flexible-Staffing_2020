import Taro, { Component, Events } from "@tarojs/taro";
import { View, Text, Input, Button, Image } from "@tarojs/components";
import { AtButton, AtTextarea, AtImagePicker } from "taro-ui";
import { labor_edit } from "../../config/base"
import api from "../../service/api"
import NavBar from "taro-navigationbar"

const util = require("../../util/util")
import "./index.scss";

export default class IdentifyCard extends Component {
    constructor() {
        super(...arguments);
        this.state = {
            // 凭证描述
            descContent: '',
            files: [{
                url: 'https://storage.360buyimg.com/mtd/home/111543234387022.jpg',
              },
              {
                url: 'https://storage.360buyimg.com/mtd/home/111543234387022.jpg',
              },
              {
                url: 'https://storage.360buyimg.com/mtd/home/111543234387022.jpg',
              }],
              showAddBtn:true
        };
    }
    componentWillMount() {

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
          files
        })
        console.log('files',files)
        if(files.length>=4){
            this.setState({
                showAddBtn:false
            })
        }
      }
      onFail (mes) {
        console.log(mes)
      }
      onImageClick (index, file) {
        console.log(index, file)
      }
    render() {

        return (
            <View>
                <NavBar title='上传凭证' back></NavBar>
                <View className='padding-20 at-article__p'>上传您的工作凭证</View>
                {/* 身份证上传 */}
                <View className='box-shadow-blue width-400 padding-top-40'>
                    <AtImagePicker
                        count={4}
                        length={2}  
                        showAddBtn={this.state.showAddBtn}                   
                        files={this.state.files}
                        onChange={this.onChange.bind(this)}
                        onFail={this.onFail.bind(this)}
                        onImageClick={this.onImageClick.bind(this)}
                    />
                    <View className='padding-10'>
                        <AtTextarea
                            value={this.state.descContent}
                            onChange={this.ChangeDescContent.bind(this)}
                            maxLength={200}
                            placeholder='描述'
                        />
                    </View>
                </View>
                <AtButton className='bg-blue submit_button' >提交凭证</AtButton>
            </View>
        );
    }
}