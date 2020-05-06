import Taro, { Component } from "@tarojs/taro";
import { View, Text, Swiper, SwiperItem } from "@tarojs/components";
import { AtSearchBar,AtNoticebar } from "taro-ui";
import {order_pub} from "../../config/base"
import {hasMobile,hasID} from "../../util/util" 
import './index.scss'
import Skeleton from '../../components/skeleton'
import api from "../../service/api";




export default class Home extends Component {
  constructor(){
    super(... arguments)
    this.state = {
      // orderID是一个临时数据
      orderID:123112312,
      // 是否要显示手机/身份证未注册的通知
      showPhoneNotice:false,
      showIdNotice:false
    }
  }
  componentWillMount() { 
    this.getPubOrder()
    this.checkPhoneAndId()
  }

  componentDidMount() { }

  componentWillUnmount() { }

  componentDidShow() { }

  componentDidHide() { }
  // 获取推荐订单
  getPubOrder(){
    api.get(order_pub,{page:1,limit:10}).then(res=>{
      console.log('获取推荐订单',res)
    })
  }
  // 侦听skeleton的点击事件并接收一个订单号跳转数据
  navigatete(e){
    const orderID = this.state.orderID
    console.log('打印数据',e)
    // Taro.navigateTo({
    //  url:'../../pages/order/index?orderID=' + orderID,

    //  success:function(res){
    //   //  通过eventChannel来发送数据
    //   res.eventChannel.emit('acceptDataFromOpenedPage',{data:'test'})
    //  } 
    // })
  }
  // jumpToDetails
  jumpToDetails(arg1,arg2){
    console.log('跳转到详情页',arg1,arg2)

  }
  // 手机是否注册,身份证是否注册
  checkPhoneAndId(){
    let hasPhoneNumber = hasMobile()
    let hasIdNumber = hasID()
    console.log('是否完善个人信息',hasIdNumber)
    this.setState({
      showPhoneNotice:hasPhoneNumber,
      showIdNotice:hasIdNumber
    })
  }
  render() {
    let showPhoneNotice = this.state.showPhoneNotice
    let showIdNotice = this.state.showIdNotice
    return (
      <View>
        {!showPhoneNotice?<AtNoticebar close icon='volume-plus'>请绑定手机号码</AtNoticebar>:''}
        {!showIdNotice?<AtNoticebar close icon='volume-plus'>请完善个人信息</AtNoticebar>:''}
        {/* 搜索 */}
        {/* <AtSearchBar
          className='margin-10'
          value={this.state.searchValue}
        ></AtSearchBar> */}
        {/* 搜索 */}
        {/* 图片轮播 */}
        <Swiper
          className='swiper'
          indicatorDots
          autoplay
          circular
          displayMultipleItems
          indicatorColor='#969696'
          indicatorActiveColor='#fff'
        >
          <SwiperItem>
            <View className='height-300 background-swiper1'></View>
          </SwiperItem>
          <SwiperItem>
            <View className='height-300 background-swiper2'></View>
          </SwiperItem>
          <SwiperItem>
            <View className='height-300 background-swiper3'></View>
          </SwiperItem>
        </Swiper>
        {/* 订单卡片 */}
        <View className='bg-grey padding-bottom-20'>
          <View className='padding-lrt-20'>
            <Skeleton buttonName='查看详情' tagName='市场营销'  onSkeletonNavigate={this.navigatete.bind(this)} orderID={this.state.orderID}
            ></Skeleton>
          </View>
          <View className='padding-lrt-20'>
            <Skeleton buttonName='查看详情' tagName='市场营销'></Skeleton>
          </View>
          <View className='padding-lrt-20'>
            <Skeleton></Skeleton>
          </View>
        </View>
        {/* 分隔 */}
        </View>
    );
  }
}
