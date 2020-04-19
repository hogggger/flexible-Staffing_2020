import Taro, { Component } from "@tarojs/taro";
import { View, Text } from "@tarojs/components";
import { AtButton, AtList, AtListItem } from "taro-ui";
import NavBar from 'taro-navigationbar';
import "./index.scss";

export default class My extends Component {
  constructor() {
    super(...arguments);
    this.state = {
    };
  }
  componentWillMount() {
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

  render() {
    return (
      <View>
          <NavBar title='我的协议' back></NavBar>
          <View className='at-article__h1 text-center'>******合同</View>
          <View className='at-article__p'>合同正文内容合同正文内容合同正文内容合同正文内容合同正文内容合同正文内容合同正文内容合同正文内容
          合同正文内容合同正文内容合同正文内容合同正文内容
          合同正文内容合同正文内容合同正文内容
          合同正文内容</View>
          <View><AtButton className='bg-blue'>签写姓名</AtButton></View>
      </View>
    );
  }
}
