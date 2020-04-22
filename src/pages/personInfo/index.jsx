import Taro, { Component } from "@tarojs/taro";
import { View, Picker, Text, Label } from "@tarojs/components";
import { AtForm, AtInput,AtButton } from "taro-ui";
import NavBar from 'taro-navigationbar'
import "./index.scss";

export default class PersonInfo extends Component {
  constructor() {
    super(...arguments);
    this.state = {
      genderSelector: ["男", "女"],
      genderSelectorSelected: ["男"],
      // 胶囊高度
    };
  }
  componentWillMount() {
    // console.log('看数据',this.state.navBarMarginTop)
  }

  componentDidMount() {}

  componentWillUnmount() {}

  componentDidShow() {}

  componentDidHide() {}

  config = {
    navigationBarTitleText: "gxvashgvxhahg",
    navigationStyle:'custom'
  };

  render() {
    return (
      <View>
        <NavBar title='个人信息' back></NavBar>
        <AtForm>
          <AtInput title='姓名' placeholder='姓名'></AtInput>
          <AtInput title='身份证' placeholder='身份证'></AtInput>
          {/* 性别 */}
          <View className='personal-taro-form'>
            <Label className='personal-taro-title'>性别</Label>
            <View className='personnal-taro-selector'>
              {" "}
              <Picker mode='selector' range={this.state.genderSelector}>
                <Text>当前选择:{this.state.genderSelectorSelected}</Text>
              </Picker>
            </View>
          </View>
          {/* 年龄 */}
          <AtInput title='年龄' placeholder='年龄'></AtInput>
          {/* 现居地 */}
          <AtInput title='现居地' placeholder='现居地'></AtInput>
          {/* 修改按钮 */}
          <AtButton className='bg-blue'>提交</AtButton>
        </AtForm>
      </View>
    );
  }
}
