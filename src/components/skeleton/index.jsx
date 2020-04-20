import Taro, { Component } from "@tarojs/taro";
import { View,Text } from "@tarojs/components";
import { AtTag,AtButton } from "taro-ui";
import PropTypes from 'prop-types'
import './index.scss'

// ****************************
// 接口说明
// buttonName 右下角按钮
// skeletonNavigate 按钮点击事件
// ****************************
export default class Skeleton extends Component {
  static propTypes ={
    buttonName:PropTypes.string,
    skeletonNavigate:PropTypes.func,
    orderID:PropTypes.number
  }
  static defaultProps ={
    buttonName:'申请任务',
    onSkeletonNavigate:null,
    // 临时数据
    orderID:null,
    tagName:''
  }
  constructor(props){
    super(props)
    this.state= {
    }
}
  componentWillMount() { 
    // 加载之前,使用orderID 来请求数据
    // 打印一下获取数据
    console.log('skeleton组件:orderID',this.props.orderID)
  }

  componentDidMount() { }

  componentWillUnmount() { }

  componentDidShow() { }

  componentDidHide() { }
  skeletonNavigate(){
    // console.log('eee',this.props.orderID)
    const orderID = this.props.orderID
    // 向调用本组件的页面传值,点击事件有调用方定义
    this.props.onSkeletonNavigate(orderID)
  }
  render() {
    return (
      <View  className='at-row at-row--wrap border-grey bg-white' orderID={this.props.orderID}>
        <View className='skeleton-value'>
          {/* <Text className='color-orange padding-right-10'>10000</Text>积分 */}
    <AtTag name='tag1' size='small'  className='blue-tag margin-left-10'>{this.props.tagName}</AtTag>
          </View>
        <View className='title at-col at-col-4 padding-10 margin-left-10'>VIP企业客户体验-会议展览服务</View>
        {/* <View className='tag at-col at-col-4 padding-10'>
            <AtTag name='tag1' size='small'  className='blue-tag margin-left-10'>tag1</AtTag>
            <AtTag name='tag2' size='small'  className='red-tag margin-left-10'>tag2</AtTag>
            <AtTag name='tag3' size='small'  className='olive-tag margin-left-10'>tag3</AtTag>
            <AtTag name='tag4' size='small'  className='orange-tag margin-left-10'>tag4</AtTag>
        </View> */}
        <View className='title padding-10 margin-left-10'><Text className='color-orange padding-right-10'>10000</Text>积分 </View>
      <View className='skeleton-apply'><AtButton size='small'  className='blue-solid-tag' taroKeys={this.props.orderID} onClick={this.skeletonNavigate.bind(this)}>{this.props.buttonName}</AtButton></View>
        <View className='summary at-col at-col-4 padding-10 '>
            <View className='company margin-10 font-size-14 color-grey'>企业:vip客户体验</View>
            <View className='group margin-10 font-size-14 color-grey'>小组:vip客户体验</View>
            <View className='deadline margin-10 font-size-14 color-grey'>截止时间2020-03-30</View>
        </View>
      </View>
    );
  }
}
