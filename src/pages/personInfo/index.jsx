import Taro, { Component } from "@tarojs/taro";
import { View, Picker, Text, Label, Input } from "@tarojs/components";
import { AtForm, AtInput, AtButton } from "taro-ui";
import NavBar from 'taro-navigationbar'
import api from "../../service/api"
// 引入地区选择器组件
import { AreaPicker } from "../../components/areaPicker"

// import AreaPIcker from '../../components/areaPicker/index1'
import "./index.scss";

export default class PersonInfo extends Component {
  constructor() {
    super(...arguments);
    this.state = {
      // 人员信息
      person: {},
      // 多列选择器,地区
      // 显示期望地区选择器
      pickerShow: false,
      // areaInfoContent调用组件的 返回值 返回代码
      areaInfoContent: '',
      areaInfoCode: [],
      // 组件传回的公共数据能否使用
      pickerStatus: false,
      // 选择器 政治面貌.民族,教育程度,客户业务类型,客户所属行业,客户来源
      politicSelector: ["无", "团员", "党员"],
      politicSelectorChecked: '',
      nationSelector:['汉族','白族','朝鲜族'],
      nationSelectorChecked:'',
      eduSelector:['小学','高中','大学'],
      eduSelectorChecked:'',
      cus_firmSelector:['类型1','类型2'],
      cus_firmSelectorChecked:'',
      cus_industrySelector:['互联网行业','建筑行业'],
      cus_industrySelectorChecked:'',
      cus_sourceSelector:['熟人推荐','广告'],
      cus_sourceSelectorChecked:''




    };
  }
  componentWillMount() {
    // console.log('看数据',this.state.navBarMarginTop)
    this.getPeronInfo()
    this.hidePicker()
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
  // showPicker用来隐藏地图选择器,并且接收选择结果
  hidePicker() {
    Taro.eventCenter.on('hidePicker', (arg1, arg2, arg3) => {
      console.log('接收到点击参数', arg1, arg2, arg3)
      this.setState({
        pickerShow: false,
      })
      if (arg3 == 'ex') {
        this.setState({
          areaInfoContent: arg1,
          areaInfoCode: arg2
        })
      } else if (arg3 == 'now') {
        this.setState({
          nowAreaInfoContent: arg1,
          nowAreaInfoCode: arg2
        })
      }
      // 2020 接收返回的参数,判断是不是点击了隐藏,哪个输入调用的
      // if(arg1 != 'hide'){
      //   this.setState({
      //     areaInfoContent:arg1
      //   })
      // }
      // if(arg2 != 'hide'){
      //   this.setState({
      //     areaInfoCode:arg2
      //   })
      // }
      // console.log('pickerShow',this.state.pickerShow)
    })
  }
  // 点击事件,显示选择器
  showAddressPicker() {
    // console.log('pickerShow',this.state.pickerShow)
    this.setState({
      pickerShow: true
    })
  }
  showAddressPickerEX() {
    this.setState({
      pickerShow: true
    })
  }
  showAddressPickerNOW() {
    this.setState({
      nowPickerShow: true
    })
  }
  // 提交个人信息
  onSubmit(event) {
    console.log('提交个人信息', event)
    let form_token = Taro.getStorageSync("form_token")
    let data = {
      'labor.realname': 'wangdong',
      'labor.paper_number': '430121199301147739',
      'labor.age': 27,
      'labor.sex': 1,
      'labor.area_id': 1,
      'labor.politics': '团员',
      'labor.nation': '汉',
      'labor.edu_level': '大学',
      'form_token': form_token
    }
    api.post('http://192.168.20.105:99/app/labor/edit', data, 'application/x-www-form-urlencoded').then(res => {
      console.log('提交之后的返回值', res)
      api.get('http://192.168.20.105:99/app/labor/info').then(value => {
        console.log("刷新的值", value)
      })
    })
  }
  // 选择器的onChange函数
  onSelector(arg,e) {
    // console.log('输出控制点击函数的值',e,arg)
    const key = arg
    this.setState({
      [key]: e.detail.value
    })
  }
  // nationSelector(e){
  //   this.setState({
  //     nationSelectorChecked: e.detail.value
  //   })
  // }
  // ******************

  render() {
    return (
      <View>
        <NavBar title='个人信息' back></NavBar>
        <AtForm onSubmit={this.onSubmit.bind(this)}>
          {/* 缓存中自动获取的信息 */}
          <AtInput name='labor.realname' title='姓名' placeholder='姓名' value={this.state.person.realname} disabled></AtInput>
          <AtInput name='labor.paper_numebr' title='身份证' placeholder='身份证' value={this.state.person.number} disabled></AtInput>
          <AtInput title='年龄' placeholder='年龄' value={this.state.person.age} disabled></AtInput>
          <AtInput title='性别' placeholder='性别' value={this.state.person.sex} editable={false}></AtInput>
          <View className='height-150 ' onClick={this.showAddressPickerEX.bind(this)}>期望工作地点
          <Input value={this.state.areaInfoContent} placeholder='请选择工作地点'></Input>
            <Input value={this.state.areaInfoCode}></Input>
          </View>
          {/* 地区选择器 */}
          <AreaPicker pickerShow={this.state.pickerShow} place='ex' />
          {/* <AreaPicker pickerShow={this.state.nowPickerShow}  place='now' /> */}
          {/* <AreaPicker pickerShow={this.state.pickerShow}  /> */}
          {/* 政治面貌.民族,教育程度,客户业务类型,客户所属行业,客户来源 */}
          <View class='selector-border margin-10'><Text className='selector-title'>政治面貌</Text>
            <View className='selector-content'>
              <Picker mode='selector' range={this.state.politicSelector} onChange={this.onSelector.bind(this,'politicSelectorChecked')}>
                <View className='picker'>
                  当前选择：{this.state.politicSelector[this.state.politicSelectorChecked]}
                </View>
              </Picker>
            </View>
          </View>
          <View class='selector-border margin-10'><Text className='selector-title'>民族</Text>
            <View className='selector-content'>
              <Picker mode='selector' range={this.state.nationSelector} onChange={this.onSelector.bind(this,'nationSelectorChecked')}>
                <View className='picker'>
                  当前选择：{this.state.nationSelector[this.state.nationSelectorChecked]}
                </View>
              </Picker>
            </View>
          </View>
          <View class='selector-border margin-10'><Text className='selector-title'>教育程度</Text>
            <View className='selector-content'>
              <Picker mode='selector' range={this.state.eduSelector} onChange={this.onSelector.bind(this,'eduSelectorChecked')}>
                <View className='picker'>
                  当前选择：{this.state.eduSelector[this.state.eduSelectorChecked]}
                </View>
              </Picker>
            </View>
          </View>
          <View class='selector-border margin-10'><Text className='selector-title'>客户业务类型</Text>
            <View className='selector-content'>
              <Picker mode='selector' range={this.state.cus_firmSelector} onChange={this.onSelector.bind(this,'cus_firmSelectorChecked')}>
                <View className='picker'>
                  当前选择：{this.state.cus_firmSelector[this.state.cus_firmSelectorChecked]}
                </View>
              </Picker>
            </View>
          </View>
          <View class='selector-border margin-10'><Text className='selector-title'>客户所属行业</Text>
            <View className='selector-content'>
              <Picker mode='selector' range={this.state.cus_industrySelector} onChange={this.onSelector.bind(this,'cus_industrySelectorChecked')}>
                <View className='picker'>
                  当前选择：{this.state.cus_industrySelector[this.state.cus_industrySelectorChecked]}
                </View>
              </Picker>
            </View>
          </View>
          <View class='selector-border margin-10'><Text className='selector-title'>客户来源</Text>
            <View className='selector-content'>
              <Picker mode='selector' range={this.state.cus_sourceSelector} onChange={this.onSelector.bind(this,'cus_sourceSelectorChecked')}>
                <View className='picker'>
                  当前选择：{this.state.cus_sourceSelector[this.state.cus_sourceSelectorChecked]}
                </View>
              </Picker>
            </View>
          </View>
          <AtButton className='bg-blue margin-top-90' formType='submit'>提交</AtButton>
        </AtForm>
      </View>
    );
  }
}
