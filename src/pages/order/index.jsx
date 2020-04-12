import Taro, { Component } from "@tarojs/taro";
import { View, Text } from "@tarojs/components";
import { AtButton, AtNavBar, AtList, AtListItem } from "taro-ui";
import OrderCard from "../../components/orderCard";
import "./index.scss";

export default class My extends Component {
  constructor() {
    super(...arguments);
    this.state = {
      // 胶囊高度
      navBarMarginTop: Taro.$navBarMarginTop + "px",
      taskRequirementsTitle:['性别','年龄','学历','专业技能'],
      // 获取到数据之后解构成一个字符串数组
      taskRequirementsContent:['男','24-40','不限','财会分析能力']
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
    const style = "margin-top" + ":" + this.state.navBarMarginTop;
    return (
      <View>
        <AtNavBar
          color='#000'
          title='订单详情'
          fixed
          leftText='返回'
          className=''
          customStyle={style}
        ></AtNavBar>
        {/* 这个padding是为了弥补之前导航栏的高度塌陷 */}
        <View className='padding-top-140'></View>
        <AtList>
          {/* order-title */}
          <AtListItem
            title='渠道拓展'
            thumb='http://img12.360buyimg.com/jdphoto/s72x72_jfs/t10660/330/203667368/1672/801735d7/59c85643N31e68303.png'
          ></AtListItem>
          <AtListItem
            title='报价'
            extraText='2000元/单'
            thumb='http://img10.360buyimg.com/jdphoto/s72x72_jfs/t5872/209/5240187906/2872/8fa98cd/595c3b2aN4155b931.png'
          ></AtListItem>
          <AtListItem
            title='工作时间'
            note='2020.01.01--2020.04.30 9:00'
            thumb='http://img10.360buyimg.com/jdphoto/s72x72_jfs/t5872/209/5240187906/2872/8fa98cd/595c3b2aN4155b931.png'
          ></AtListItem>
          <AtListItem
            title='工作地址'
            extraText='湖南省长沙市北辰三角洲'
            arrow='right'
          ></AtListItem>
        </AtList>
        <OrderCard
          title='任务描述'
          isTaskDesc={true}
          desc='有良好的信息搜集管理分析能力'
          thumb='http://img12.360buyimg.com/jdphoto/s72x72_jfs/t10660/330/203667368/1672/801735d7/59c85643N31e68303.png'
        >
        </OrderCard>
        <OrderCard
          title='任职要求'
          isTaskReq={true}
          requirementsTitle={this.state.taskRequirementsTitle}
          requirementsContent={this.state.taskRequirementsContent}
          thumb='http://img12.360buyimg.com/jdphoto/s72x72_jfs/t10660/330/203667368/1672/801735d7/59c85643N31e68303.png'
        >
        </OrderCard>
        <View className='at-row fixed-bottom'>
          <View className='at-col '><AtButton className='bg-blue'>立即接单</AtButton></View>
          <View className='at-col '><AtButton >分享</AtButton></View>
        </View>
      </View>
    );
  }
}
