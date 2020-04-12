import Taro, { Component } from "@tarojs/taro";
import { View } from "@tarojs/components";
import { AtTabBar ,AtDivider} from "taro-ui";
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
  tabbarClick(value) {
    this.setState({
      tabbarCurrent: value,
    })
    Taro.setNavigationBarTitle({
      title: this.state.navTitleArray[value]
    })
    console.log(this.state.tabbarCurrent)
  }
  componentWillMount() { }

  componentDidMount() { }

  componentWillUnmount() { }

  componentDidShow() { }

  componentDidHide() { }

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
