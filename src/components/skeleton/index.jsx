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
    // 调用方的点击按钮事件侦听
    onSkeletonNavigate:null,
    // 调用方传入订单号
    orderID:null,
    // 传入订单状态,用于通知订单详情页面组件的显示 normal,confirm,pended,active,finish
    orderStatus:'normal',
    // 调用方传入标签号
    // tagName:'',
    // 调用方传入薪酬
    salary:'',
    // 截止日期
    deadline:'',
    // 开始日期
    starttime:'',
    // 订单内容
    orderContent:'',
    // 订单标题
    orderTitle:''
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
  // 点击卡片跳转到详情页
  jumpToDetail(){
    console.log('跳转到',this.props.orderID,'状态',this.props.orderstatus)
  }
  render() {
    return (
      <View  className='at-row at-row--wrap border-grey bg-white border-radius-10' orderID={this.props.orderID} onClick={this.jumpToDetail.bind(this)}>
        <View className='skeleton-tag'>
          {/* <Text className='color-orange padding-right-10'>10000</Text>积分 */}
    {/* <AtTag name='tag1' size='small'  className='blue-tag margin-left-10'>{this.props.tagName}</AtTag> */}
          </View>
        <View className='title at-col at-col-4 padding-10 margin-left-10'>{this.props.orderTitle}
        </View>
        {/* <View className='tag at-col at-col-4 padding-10'>
            <AtTag name='tag1' size='small'  className='blue-tag margin-left-10'>tag1</AtTag>
        </View> */}
        <View className='salary padding-10 margin-left-10 color-red'><Text className=' padding-right-10'>{this.props.salary}</Text>/单 </View>
        <View className='summary at-col at-col-4 padding-10'>
            <View className='content  font-size-14 color-black'>{this.props.orderContent}
            </View>
      <View className='starttime  font-size-14 color-grey'>任务时间:{this.props.starttime}--{this.props.deadline}</View>
            {/* <View className='deadline  font-size-14 color-grey'>截止时间2020-03-30</View> */}
            <View className='skeleton-apply text-center'>
              <View className='button_style'><AtButton size='small'  className='bg-blue-light width-400' taroKeys={this.props.orderID} onClick={this.skeletonNavigate.bind(this)}>{this.props.buttonName}</AtButton></View>
              </View>
        </View>
      </View>
    );
  }
}
