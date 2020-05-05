import Taro, { Component } from "@tarojs/taro";
import { View, Text, Input, Button, Image } from "@tarojs/components";
import { AtButton, AtTabs, AtTabsPane } from "taro-ui";
// import { AreaPicker } from "../../components/areaPicker/index"
import NavBar from 'taro-navigationbar'
import {NoData } from "../../components/noData/index"
import {Loading } from "../../components/loading/index"
import api from "../../service/api"
import {order_list} from "../../config/base"
import Skeleton from '../../components/skeleton'

const util = require("../../util/util")
import "./index.scss";

export default class AllTask extends Component {
    constructor() {
        super(...arguments);
        this.state = {
            // 当前激活是 0-3 confirm ,pended,active,finish
            current: 0,
            // 订单数组
            orderArray: [],
            // 展示无数据组件,
            showNoData:false,
            // 显示加载状态
            showLoading:true
        };
    }
    componentWillMount() {
        // 获取订单
        this.getOrderInfo('confirm')
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
    handleClick(value) {
        this.setState({
            current: value,
            showLoading:true
        })
        // console.log('点击的table',value)
        // 点击的值不同,请求的name不同
        let statusName=['confirm','pended','active','finish']
        this.getOrderInfo(statusName[value])
    }
    // 指派订单
    getOrderInfo(statusName) {
        api.get(order_list, { page: 1, limit: 10, status:statusName}).then(res => {
            console.log('订单', res.data.page.list)
            let length = res.data.page.list.length
            let list = res.data.page.list
            if (length != 0){
                // 如果获取到的数组长度不为零,有数据,不展示[noData]组件
                this.setState({
                    orderArray: list,
                    showNoData:false,
                    showLoading:false
                })
            }else{
                this.setState({
                    showNoData:true,
                    showLoading:false
                })
            }
        })
    }
    
    // HandleToggleShow
    toggleAddressPicker(e) {
        console.log('e', e)
    }
    // onSkeletonNavigate 待确认
    confirmTheTask(){
        console.log('接任务')
    }
    render() {
        let showNoData = this.state.showNoData
        let orderArray = this.state.orderArray
        let showLoading = this.state.showLoading
        const tabList = [{ title: '待确认' }, { title: '待开始' }, { title: '进行中' }, { title: '已完成' }]
        return (
            <View>
                {/* <NavBar title='我的任务' back></NavBar> */}
                <AtTabs current={this.state.current} tabList={tabList} onClick={this.handleClick.bind(this)}>

                    <AtTabsPane className='padding-20' current={this.state.current}  >
                        {/*加载框 */}
                        <Loading showLoading={showLoading} />
                        {showNoData ?
                            <NoData></NoData>
                           :orderArray.map((order) => {
                                return <Skeleton buttonName='确认任务' key={order.order_id} orderID={order.order_id} salary={order.m_plan}
                                    starttime={order.start_time} deadline={order.end_time} orderContent={order.mission_content}
                                    orderTitle={order.order_name} onSkeletonNavigate={this.confirmTheTask()} orderstatus='confirm'
                                ></Skeleton>
                            })
                        }

                    </AtTabsPane>

                    <AtTabsPane current={this.state.current} index={1}>
                    <Loading showLoading={showLoading} />
                    { showNoData ?
                            <NoData></NoData>
                           : orderArray.map((order) => {
                                return <Skeleton buttonName='确认任务' key={order.order_id} orderID={order.order_id} salary={order.m_plan}
                                    starttime={order.start_time} deadline={order.end_time} orderContent={order.mission_content}
                                    orderTitle={order.order_name}
                                ></Skeleton>
                            })
                        }
                    </AtTabsPane>
                    <AtTabsPane current={this.state.current} index={2}>
                    <Loading showLoading={showLoading} />
                    {showNoData ?
                            <NoData></NoData>
                           :orderArray.map((order) => {
                                return <Skeleton buttonName='确认任务' key={order.order_id} orderID={order.order_id} salary={order.m_plan}
                                    starttime={order.start_time} deadline={order.end_time} orderContent={order.mission_content}
                                    orderTitle={order.order_name}
                                ></Skeleton>
                                // 测试地址选择器

                            })
                        }
                    </AtTabsPane>
                    <AtTabsPane current={this.state.current} index={3}>
                    <Loading showLoading={showLoading} />
                    {showNoData ?
                            <NoData></NoData>
                           :orderArray.map((order) => {
                                return <Skeleton buttonName='确认任务' key={order.order_id} orderID={order.order_id} salary={order.m_plan}
                                    starttime={order.start_time} deadline={order.end_time} orderContent={order.mission_content}
                                    orderTitle={order.order_name}
                                ></Skeleton>

                            })
                        }
                    </AtTabsPane>
                </AtTabs>
            </View >
        );
    }
}