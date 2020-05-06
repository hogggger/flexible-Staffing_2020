import Taro, { Component } from "@tarojs/taro";
import { View, Text ,Image} from "@tarojs/components";
import { AtButton, AtList, AtListItem } from "taro-ui";
import api from "../../service/api";
import {agreement_confirm } from "../../config/base";
import NavBar from 'taro-navigationbar';
import "./index.scss";

export default class My extends Component {
  constructor() {
    super(...arguments);
    this.state = {
      // 合同名称
      contractTitle:'测试用合同',
      // 合同图片地址
      contractContent:['https://img-blog.csdnimg.cn/20190323161159133.png','https://img-blog.csdnimg.cn/20190323161221635.png','https://img-blog.csdnimg.cn/20190323161242873.png'],
      // 合同ID
      orderId:''
    };
  }
  componentWillMount() {
    this.getOrderId()
   }

  componentDidMount() {

   }

  componentWillUnmount() { }

  componentDidShow() { }

  componentDidHide() { }

  config = {
    navigationBarTitleText: "gxvashgvxhahg",
    navigationStyle: "custom"
  };
  getOrderId(){
    let id =this.$router.params.orderId
    console.log('id',id)
    this.setState({
      orderId:id
    })
    // 获取 agreement_confirm 当前的协议,携带参数{orderid:id}
    api.get(agreement_confirm,{orderId:id}).then(res=>{
      console.log('签订合同',res)
    })
  }
  // 去签名,携带订单ID/或者是合同id
  toSign(){
    console.log('去签订合同')
    let orderId = this.state.orderId
    Taro.navigateTo({
      url:`../../pages/sign/index?orderid=${orderId}`
    })
  }

  render() {
    let imgs = this.state.contractContent
    return (
      <View>
          <NavBar title='我的协议' back></NavBar>
    <View className='at-article__h1 text-center'>{this.state.contractTitle}</View>
          <View className='at-article__p'>
            { imgs.map((url)=>{
              return <View key={url}><Image style='width: 100%;' mode='widthFix' src={url}></Image></View>
            })}
          </View>
          <View><AtButton className='bg-blue' onClick={this.toSign.bind(this)}>签写姓名</AtButton></View>
      </View>
    );
  }
}
