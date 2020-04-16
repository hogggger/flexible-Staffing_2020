import Taro, { Component } from "@tarojs/taro";
import { View, Text,Image, Button } from "@tarojs/components";
import { AtIcon } from "taro-ui";
import PropTypes from 'prop-types'
import './index.scss'




export default class OrderCard extends Component {
    static propTypes ={
        guideImage:PropTypes.string

    }
    static defaultProps = {
        guideImage:''
    }
    constructor(props){
        super(props)
        this.state= {
            showImage:'',
            uploaded:false
        }
    }
    componentWillMount() { }

    componentDidMount() { }

    componentWillUnmount() { }

    componentDidShow() { }

    // 点击触发图片选择事件 uploaded为假,出现引导界面,可以选择图片上传
    chooseFile (){
        if(!this.state.uploaded){
            Taro.chooseImage().then(res =>{
                console.log('打印数据',res.tempFilePaths[0])
                this.setState({
                    showImage:res.tempFilePaths[0],
                    uploaded:true
                })
    
            })
        }
    }
    // 重置showImage,关闭展示板
    deleteImage(){
        this.setState({
            showImage:'',
            uploaded:false
        })
    }

    render() {
        return (
            <View  onClick={this.chooseFile.bind(this)}>
                { !this.state.uploaded ?
                <Image src={this.props.guideImage} ></Image>
               : <View><Image src={this.state.showImage}></Image><Text class='at-icon at-icon-close-circle closeButton' onClick={this.deleteImage.bind(this)}></Text></View>
                }
            </View>
        );
    }
}
