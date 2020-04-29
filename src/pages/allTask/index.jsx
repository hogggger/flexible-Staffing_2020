import Taro, { Component } from "@tarojs/taro";
import { View, Text, Input, Button, Image } from "@tarojs/components";
import { AtButton, AtTabs, AtTabsPane } from "taro-ui";
import NavBar from 'taro-navigationbar'
import api from "../../service/api"
import Skeleton from '../../components/skeleton'

const util = require("../../util/util")
import "./index.scss";

export default class IdentifyCard extends Component {
    constructor() {
        super(...arguments);
        this.state = {
            // 当前激活是 0-3 confirm ,pended,active,finish
            current: 0,
            // 订单数组
            orderArray: []
        };
    }
    componentWillMount() {
        // 获取订单
        this.getOrderInfo()
    }

    componentDidMount() {
        setTimeout(() => { return console.log('订单数据', this.state.orderArray) }, 1000)
    }

    componentWillUnmount() { }

    componentDidShow() { }

    componentDidHide() { }

    config = {
        navigationBarTitleText: "gxvashgvxhahg",
        navigationStyle: 'custom'
    };
    handleClick(value) {
        this.setState({
            current: value
        })
    }
    // 指派订单
    getOrderInfo() {
        api.get('http://192.168.20.105:99/app/order/list', { page: 1, limit: 10, status: 'confirm' }).then(res => {
            console.log('订单', res.data.page.list)
            let list = res.data.page.list
            this.setState({
                orderArray: list
            })

        })
    }
    render() {
        let orderArray = this.state.orderArray
        const tabList = [{ title: '待确认' }, { title: '待开始' }, { title: '进行中' }, { title: '已完成' }]
        return (
            <View>
                <NavBar title='我的任务' back></NavBar>
                <AtTabs current={this.state.current} tabList={tabList} onClick={this.handleClick.bind(this)}>

                    <AtTabsPane className='padding-20' current={this.state.current}  >
                        {
                            orderArray.map((order)=>{
                                return <Skeleton  buttonName="确认任务" orderID={order.order_id} salary={order.m_plan}
                                starttime={order.start_time} deadline={order.end_time} orderContent={order.mission_content}
                                orderTitle={order.order_name}
                                ></Skeleton> 
                                // 工作进度
                            })
                        }
                    </AtTabsPane>

                    <AtTabsPane current={this.state.current} index={1}>
                        <View ><Skeleton></Skeleton></View>
                    </AtTabsPane>
                    <AtTabsPane current={this.state.current} index={2}>
                        <View > <Skeleton></Skeleton></View>
                    </AtTabsPane>
                    <AtTabsPane current={this.state.current} index={3}>
                        <View ><Skeleton></Skeleton> <Skeleton></Skeleton></View>
                    </AtTabsPane>
                </AtTabs>
            </View >
        );
    }
}