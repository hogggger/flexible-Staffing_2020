import Taro, { Component, Events } from "@tarojs/taro";
import { View, Text, Image, Button } from "@tarojs/components";
import  api  from "../../service/api"
import { AtIcon } from "taro-ui";
import PropTypes from 'prop-types'
import './index.scss'




export default class OrderCard extends Component {
    static propTypes = {
        guideImage: PropTypes.string,
        side: PropTypes.string

    }
    static defaultProps = {
        guideImage: '',
        side: ''

    }
    constructor(props) {
        super(props)
        this.state = {
            showImage: '',
            uploaded: false,
        }
    }
    componentWillMount() { }

    componentDidMount() {

    }

    componentWillUnmount() { }

    componentDidShow() { }


    // 点击触发图片选择事件 uploaded为假,出现引导界面,可以选择图片上传
    chooseFile() {
        if (!this.state.uploaded) {
            // 实例化事件池
            let token = Taro.getStorageSync("token");
            let form_token = Taro.getStorageSync("form_token")
            let side = this.props.side
            Taro.chooseImage().then(res => {
                console.log('打印数据', res.tempFilePaths[0])
                if (res.tempFilePaths[0]) {
                    Taro.uploadFile({
                        url: 'http://192.168.20.105:99/app/labor/identify/idCardVerify',
                        header: {
                            'content-type': 'multipart/form-data',
                            'Authorization': token
                        },
                        name: 'idcard',
                        filePath: res.tempFilePaths[0],
                        formData: {
                            'side': side,
                            'form_token': form_token
                        },
                        success: value => {
                            let data = JSON.parse(value.data)
                            if (side == 'front') {
                                if (value.statusCode == 200 && data.code == 0) {
                                    //判断上传结果,成功则展示上传图片,失败应该弹窗告知客户重新上传
                                    this.setState({
                                        showImage: res.tempFilePaths[0],
                                        uploaded: true,
                                        
                                    })
                                    //调用事件池,触发一个事件,将身份验证信息传回页面
                                    // Taro.eventCenter.trigger('identifyCarfInfo','true')
                                    // 将用户数据存入到缓存中去
                                    Taro.setStorageSync('identifyCarfInfo', data.info)
                                    Taro.eventCenter.trigger('statusFront','true')
                                } else {
                                    // 失败,展示弹窗,让客户重新上传
                                    console.log('上传数据失败,请上传身份证正面')
                                    Taro.eventCenter.trigger('statusFront','false')
                                }
                            }else if(side == 'back'){
                                console.log('背面上传信息',value)
                                if (value.statusCode == 200 && data.code == 0){
                                    this.setState({
                                        showImage: res.tempFilePaths[0],
                                        uploaded: true,
                                    })
                                    Taro.eventCenter.trigger('statusBack','true')
                                }else{
                                    console.log("上传失败,请上传身份证反面")
                                    Taro.eventCenter.trigger('statusBack','false')
                                }
                            }

                        }
                    })
                }

            })
        }
    }
    // 重置showImage,关闭展示板
    deleteImage() {
        this.setState({
            showImage: '',
            uploaded: false
        })
        if(this.props.side == 'front'){
            Taro.removeStorageSync('identifyCarfInfo')
            // 删除的是正面照,触发侦听
            Taro.eventCenter.trigger('statusFront','false')
        }else if(this.props.side == 'back'){
            //  删除的是背面的照,触发侦听
            Taro.eventCenter.trigger('statusBack','false')
        }
    }

    render() {
        return (
            <View onClick={this.chooseFile.bind(this)}>
                {!this.state.uploaded ?
                    <Image src={this.props.guideImage} ></Image>
                    : <View><Image src={this.state.showImage}></Image><Text class='at-icon at-icon-close-circle closeButton' onClick={this.deleteImage.bind(this)}></Text></View>
                }
            </View>
        );
    }
}
