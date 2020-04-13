import Taro, { Component } from "@tarojs/taro";
import { View, Text, Swiper, SwiperItem } from "@tarojs/components";
import { AtSearchBar, AtTabBar } from "taro-ui";
import './index.scss'
import Skeleton from '../../components/skeleton'




export default class My extends Component {
  componentWillMount() { }

  componentDidMount() { }

  componentWillUnmount() { }

  componentDidShow() { }

  componentDidHide() { }

  render() {
    return (
      <View>
        {/* 搜索 */}
        <AtSearchBar
          className="margin-10"
          value={this.state.searchValue}
        ></AtSearchBar>
        {/* 搜索 */}
        {/* 图片轮播 */}
        <Swiper
          className="swiper"
          indicatorDots
          autoplay
          circular
          displayMultipleItems
        >
          <SwiperItem>
            <View className="demo-text-1 blue-tag height-150">图片轮播1</View>
          </SwiperItem>
          <SwiperItem>
            <View className="demo-text-2 red-tag height-150">图片轮播2</View>
          </SwiperItem>
          <SwiperItem>
            <View className="demo-text-3 orange-tag height-150">图片轮播3</View>
          </SwiperItem>
        </Swiper>
        {/* 订单卡片 */}
        <View className="bg-grey padding-bottom-20">
          <View className="padding-lrt-20">
            <Skeleton></Skeleton>
          </View>
          <View className="padding-lrt-20">
            <Skeleton></Skeleton>
          </View>
          <View className="padding-lrt-20">
            <Skeleton></Skeleton>
          </View>
        </View>
        {/* 分隔 */}
        {/* 底部tabar栏 */}
        <AtTabBar
          tabList={[{ title: "任务大厅" }, { title: "我的" }]}
        ></AtTabBar>
        </View>
    );
  }
}
