import Taro, { Component } from "@tarojs/taro";
import { View,Text } from "@tarojs/components";
import { AtTag,AtButton } from "taro-ui";
import './index.scss'




export default class Skeleton extends Component {
  componentWillMount() { }

  componentDidMount() { }

  componentWillUnmount() { }

  componentDidShow() { }

  componentDidHide() { }

  render() {
    return (
      <View  className='at-row at-row--wrap border-grey bg-white'>
        <View className='skeleton-value'><Text className='color-orange padding-right-10'>10000</Text>积分</View>
        <View className='title at-col at-col-4 padding-10 margin-left-10'>VIP企业客户体验-会议展览服务</View>
        <View className='tag at-col at-col-4 padding-10'>
            <AtTag name='tag1' size='small'  className='blue-tag margin-left-10'>tag1</AtTag>
            <AtTag name='tag2' size='small'  className='red-tag margin-left-10'>tag2</AtTag>
            <AtTag name='tag3' size='small'  className='olive-tag margin-left-10'>tag3</AtTag>
            <AtTag name='tag4' size='small'  className='orange-tag margin-left-10'>tag4</AtTag>

        </View>
        <View className='skeleton-apply'><AtButton size='small'  className='orange-tag'>申请任务</AtButton></View>
        <View className='summary at-col at-col-4 padding-10 '>
            <View className='company margin-10 font-size-14 color-grey'>企业:vip客户体验</View>
            <View className='group margin-10 font-size-14 color-grey'>小组:vip客户体验</View>
            <View className='deadline margin-10 font-size-14 color-grey'>截止时间2020-03-30</View>
        </View>
      </View>
    );
  }
}
