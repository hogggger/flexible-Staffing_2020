import Taro, { Component } from "@tarojs/taro";
import { View, Picker, Text, Label } from "@tarojs/components";
import api from "../../service/api"
import { AtForm, AtInput, AtButton } from "taro-ui";
import NavBar from 'taro-navigationbar'
import AreaPIcker from '../../components/areaPIcker'
import "./index.scss";

export default class PersonInfo extends Component {
  constructor() {
    super(...arguments);
    this.state = {
      politicSelector: ["无", "团员", "党员"],
      // 人员信息
      person: {},
      // 多列选择器,地区
      areaSelector:[['1','2','3','4'],['3','4']],
      // 显示地区选择器
      showAddressPicker:true
    };
  }
  componentWillMount() {
    // console.log('看数据',this.state.navBarMarginTop)
    this.getPeronInfo()
  }

  componentDidMount() {

  }

  componentWillUnmount() { }

  componentDidShow() { }

  componentDidHide() { }

  config = {
    navigationBarTitleText: "gxvashgvxhahg",
    navigationStyle: 'custom'
  };
  // 地址选择器选择的值
  HandleToggleShow(e){
    console.log("地址选择器返回的结果",e)
    this.setState({
      showAddressPicker:false
    })
  }
  // 点击加载地址选择器
  addressPicker(){
    this.setState({
      showAddressPicker:true
    })
  }
  // 先从缓存里面获取到个人信息以及字典
  getPeronInfo() {
    const personInfo = Taro.getStorageSync('identifyCarfInfo')
    this.setState({
      person: personInfo
    })
    api.get('http://192.168.20.105:99/app/pub/dict', { type_name: 'labor_edu_level' }).then(res => {
      console.log('拉取信息', res)
    })
    console.log('从缓存获取到个人信息', personInfo)
  }
  render() {
    return (
      <View>
        <NavBar title='个人信息' back></NavBar>
        <AtForm>
          <AtInput title='姓名' placeholder='姓名' value={this.state.person.realname} disabled></AtInput>
          <AtInput title='身份证' placeholder='身份证' value={this.state.person.number} disabled></AtInput>
          {/* 年龄 */}
          <AtInput title='年龄' placeholder='年龄' value={this.state.person.age} disabled></AtInput>
          {/* 性别  */}
          <AtInput title='性别' placeholder='性别' value={this.state.person.sex} editable={false}></AtInput>
          {/* 政治面貌 */}
          <View className='personal-taro-form'>
            <Label className='personal-taro-title'>政治面貌</Label>
            <View className='personnal-taro-selector'>
              {" "}
              <Picker mode='selector' range={this.state.politicSelector}>
                <Text>当前选择:{this.state.politicSelector[0]}</Text>
              </Picker>
            </View>
          </View>
          {/* 期望工作地区  多列选择器*/}
          <View className='personal-taro-form'>
            <Label className='personal-taro-title'>期望工作地区</Label>
            <View className='personnal-taro-selector'>
              {" "}
              <Picker mode='multiSelector' range={this.state.areaSelector}>
                <Text>当前选择:{this.state.areaSelector[0]}</Text>
              </Picker>
            </View>
          </View>
          {/* 现居地 */}
          <AtInput title='现居地' placeholder='现居地'></AtInput>
          {/* 修改按钮 */}
          {/* 地区选择器 */}
          
          {/* 地区选择器 */}
          <View >
            <View >123</View>
          {/* <AreaPIcker pickerShow onHandleToggleShow={this.HandleToggleShow().bind(this)}></AreaPIcker> */}
          </View>
          <AtButton className='bg-blue'>提交</AtButton>
        </AtForm>
      </View>
    );
  }
}
