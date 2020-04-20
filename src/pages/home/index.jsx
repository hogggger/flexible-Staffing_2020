import Taro, { Component } from "@tarojs/taro";
import { View, Text, Swiper, SwiperItem } from "@tarojs/components";
import { AtSearchBar } from "taro-ui";
import './index.scss'
import Skeleton from '../../components/skeleton'




export default class Home extends Component {
  constructor(){
    super(... arguments)
    this.state = {
      // orderID是一个临时数据
      orderID:123112312
    }
  }
  componentWillMount() { }

  componentDidMount() { }

  componentWillUnmount() { }

  componentDidShow() { }

  componentDidHide() { }
  // skeleton跳转数据
  navigatete(e){
    const orderID = this.state.orderID
    console.log('打印数据',e)
    Taro.navigateTo({
     url:'../../pages/order/index?orderID=' + orderID,

     success:function(res){
      //  通过eventChannel来发送数据
      res.eventChannel.emit('acceptDataFromOpenedPage',{data:'test'})
     } 
    })
  }

  render() {
    return (
      <View>
        {/* 搜索 */}
        <AtSearchBar
          className='margin-10'
          value={this.state.searchValue}
        ></AtSearchBar>
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
            <Skeleton buttonName='申请任务' tagName='市场营销'  onSkeletonNavigate={this.navigatete.bind(this)} orderID={this.state.orderID}></Skeleton>
          </View>
          <View className='padding-lrt-20'>
            <Skeleton buttonName='查看详情'></Skeleton>
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
