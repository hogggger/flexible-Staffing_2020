import Taro, { Component } from "@tarojs/taro";
import { View, OpenData } from "@tarojs/components";
import { AtAvatar, AtList, AtListItem, AtButton } from "taro-ui";
import "./index.scss";

export default class My extends Component {
  constructor() {
    super(...arguments);
    this.state = {};
  }
  componentWillMount() { }

  componentDidMount() { }

  componentWillUnmount() { }

  componentDidShow() { }

  componentDidHide() { }
  // 获取个人信息
  getUserInfo(res){
    console.log(res)
  }
  // 跳转到具体页面
  navigateTo(name,e){
    console.log('eeeeee',name)
    let url = null
    switch(name){
      case 'task':{
         url= '../../pages/allTask/index';
        break;
      }
      default:
         url = null;
    }
    if(url){
      Taro.navigateTo({
        url:url,
      })
    }
  }

  render() {
    return (
      <View>
        {/* 头像部分 */}
        <View className='border-transparent personal-header text-center'>
          {/* <AtAvatar
            className='header-icon'
            image="http://storage.360buyimg.com/mtd/home/32443566_635798770100444_2113947400891531264_n1533825816008.jpg"
            size='large'
            circle
          ></AtAvatar> */}
          {/* 调用开放 */}
          <View className='width-height-400  header-icon circle'> <OpenData  type='userAvatarUrl'/></View>
          <View className='font-size-18 color-lightgrey'><OpenData  type='userNickName'/></View>
          {/* <View className='font-size-14 color-lightgrey margin-top-10'>181****1211</View> */}
        </View>
        {/* 个人数值 */}
        <View className='at-row at-row--wrap margin-tb-20'>
          <View className='at-col at-col-4 text-center'>余额(元)</View>
          <View className='at-col at-col-4 text-center'>积分</View>
          <View className='at-col at-col-4 text-center'>红包(个)</View>
          <View className='at-col at-col-4 text-center color-orange'>100</View>
          <View className='at-col at-col-4 text-center color-orange'>2000</View>
          <View className='at-col at-col-4 text-center color-orange'>0</View>
        </View>
        {/* 列表 */}
        <View>
          <AtList>
            <AtListItem
              title='个人资料'
              extraText='详细信息'
              arrow='right'
              iconInfo={{ size: 25, color: "#78A4FA", value: "calendar" }}
            />
            {/* <AtListItem
              title='银行卡'
              extraText='详细信息'
              arrow='right'
              iconInfo={{ size: 25, color: "#82C272", value: "folder" }}
            /> */}
            <AtListItem
              title='我的任务'
              extraText='详细信息'
              arrow='right'
              iconInfo={{ size: 25, color: "#FF4949", value: "bookmark" }}
              onClick={this.navigateTo.bind(this,'task')}
            />
            <AtListItem
              title='我的协议'
              extraText='详细信息'
              arrow='right'
              iconInfo={{ size: 25, color: "#82C272", value: "folder" }}
            />
            {/* <View data-way='123'  onClick={this.navigateTo.bind(this)}>123</View> */}
            <AtListItem
              title='我的身份证'
              extraText='去认证'
              arrow='right'
              iconInfo={{ size: 25, color: "#D87B7B", value: "money" }}
            />
          </AtList>
        </View>
        <View className=' width-200 margin-top-50'><AtButton className='blue-solid-tag'>退出登录</AtButton></View>
        {/* <AtButton openType='getUserInfo' onGetUserInfo={this.getUserInfo}>huo</AtButton> */}
      </View>
    );
  }
}
