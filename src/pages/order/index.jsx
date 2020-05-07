import Taro, { Component } from "@tarojs/taro";
import { View, Text } from "@tarojs/components";
import { AtButton, AtList, AtListItem } from "taro-ui";
import {order_detail} from "../../config/base"
import api from "../../service/api"

import NavBar from 'taro-navigationbar';
import OrderCard from "../../components/orderCard";
import "./index.scss";

export default class My extends Component {
  constructor() {
    super(...arguments);
    this.state = {
      taskRequirementsTitle:['性别','年龄','证书','专业技能'],
      // 获取到数据之后解构成一个字符串数组
      taskRequirementsContent:['男','24-40','不限','财会分析能力'],
      // 工作时间
      startTime:'',
      endTime:'',
      // 订单名称
      missionName:'',
      // 订单报价
      missionPay:'',
      // 任务内容
      missionContent:'',
      // 任务技能
      missionSkill:'',
      missionCert:'',
      // icon地址
    };
  }
  componentWillMount() {
    // 根据接受的第二个参数作出变化confirm,pended,active,finish
    // 来调整不同的按钮
    console.log('这个是什么',this.$router.params)
    this.getOrderDetails(this.$router.params.id)

   }

  componentDidMount() {
    // console.log('emit',this.$scope.getOpenerEventChannel()) 
    // const eventChannel =this.$scope.getOpenerEventChannel()
    // console.log('emit',this.$mp.page.getOpenerEventChannel())
    // eventChannel.on('acceptDataFromOpenedPage', function(data) {
    //   console.log('data',data)
    // })
   }

  componentWillUnmount() { }

  componentDidShow() { }

  componentDidHide() { }

  config = {
    navigationBarTitleText: "gxvashgvxhahg",
    navigationStyle: "custom"
  };
  //通过订单编号获取到细节
  getOrderDetails(id){
    api.get(order_detail,{orderId:id}).then(res=>{
      console.log("订单细节",res.data.detail)
      let detail = res.data.detail
      let sex = res.data.detail.req_sex == '0'? '男':'女'
      let ageRange = res.data.detail.req_age_min +'-' +res.data.detail.req_age_max
      let skill = res.data.detail.req_skill
      let cert =res.data.detail.req_cert
      this.setState({
      // 工作时间
      startTime:detail.start_time,
      endTime:detail.end_time,
      workingTime:detail.start_time+detail.end_time,
      // 订单名称
      missionName:detail.mission_name,
      // 订单报价
      missionPay:detail.m_pay+'/单',
      // 任务内容
      missionContent:detail.mission_content,
      // 任务技能
      taskRequirementsContent:[sex,ageRange,cert,skill]
      })
    })
  }
  render() {
    return (
      <View>
        <NavBar title='订单详情' back></NavBar>
        <AtList>
          {/* order-title */}
          <AtListItem
            title={this.state.missionName}
            thumb='http://img12.360buyimg.com/jdphoto/s72x72_jfs/t10660/330/203667368/1672/801735d7/59c85643N31e68303.png'
          ></AtListItem>
          <AtListItem
            title='报价'
            extraText={this.state.missionPay}
            thumb='http://img10.360buyimg.com/jdphoto/s72x72_jfs/t5872/209/5240187906/2872/8fa98cd/595c3b2aN4155b931.png'
          ></AtListItem>
          <AtListItem
            title='工作时间'
            note={this.state.workingTime}
            thumb='http://img10.360buyimg.com/jdphoto/s72x72_jfs/t5872/209/5240187906/2872/8fa98cd/595c3b2aN4155b931.png'
          ></AtListItem>
          {/* <AtListItem
            title='工作地址'
            extraText='湖南省长沙市北辰三角洲'
            arrow='right'
          ></AtListItem> */}
        </AtList>
        <OrderCard
          title='任务描述'
          isTaskDesc={true}
          desc={this.state.missionContent}
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
