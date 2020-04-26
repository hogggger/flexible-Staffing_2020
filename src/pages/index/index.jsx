import Taro, { Component } from "@tarojs/taro";
import { View } from "@tarojs/components";
import { AtTabBar ,AtDivider} from "taro-ui";
import { hasMobile } from "../../util/util"
import "./index.scss";
import Home from "../home";
import My from "../my";

export default class Index extends Component {
  constructor() {
    super(...arguments); 
    this.state = {
      tabbarCurrent: 0,
      navTitleArray: ['任务大厅', '我的']
    };
  }

  componentWillMount() { }

  componentDidMount() { }

  componentWillUnmount() { }

  componentDidShow() { }

  componentDidHide() { }
  tabbarClick(value) {
    console.log('点击题跳转到我的',value)
    // 如果value为1,跳转到我的之前先判断缓存中mobile有没有值
    let has= hasMobile()
    if( has ){
      this.setState({
        tabbarCurrent: value,
      })
      Taro.setNavigationBarTitle({
        title: this.state.navTitleArray[value]
      })
    }else{
      // 没有手机号跳转到注册
      Taro.navigateTo({
        url:'../phoneNumLogin/index'
      })
    }
    console.log(this.state.tabbarCurrent)
  }
  config = {
    navigationBarTitleText: "任务大厅"
  };

  render() {
    const current = this.state.tabbarCurrent
    return (
      <View>
        {current == 0 ?
          <Home></Home>
          : <My></My>
        }
        {/* 底部tabar栏 */}
        {/* 避免遮挡 */}
        {/* {current == 0 ?
           <AtDivider content='没有更多了' fontColor='#2d8cf0' lineColor='#2d8cf0' />
           :<View></View>
        } */}
        <View className='padding-bottom-200'></View>
        <AtTabBar
          tabList={[{ title: "任务大厅",iconType:'home' }, { title: "我的" ,iconType:'user'}]}
          current={this.state.tabbarCurrent}
          onClick={this.tabbarClick.bind(this)}
          fixed
          fontSize='12'
        ></AtTabBar>
      </View>
    );
  }
}
