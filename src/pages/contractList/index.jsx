import Taro, { Component } from "@tarojs/taro";
import { View } from "@tarojs/components";
import { AtTabBar } from "taro-ui";
import NavBar from 'taro-navigationbar'
import { NoData } from "../../components/noData/index"
import "./index.scss";

export default class Index extends Component {
  constructor() {
    super(...arguments);
    this.state = {

    };
  }

  componentWillMount() { }

  componentDidMount() { }

  componentWillUnmount() { }

  componentDidShow() { }

  componentDidHide() { }
  config = {
    navigationBarTitleText: "gxvashgvxhahg",
    navigationStyle: 'custom'
};
  render() {

    return (
      <View>
          <NavBar title='合同列表' back ></NavBar>
          <View className='bg-gray'><NoData ></NoData></View>
      </View>
    );
  }
}
