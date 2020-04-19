import Taro, { Component } from "@tarojs/taro";
import { View, Text, Input, Button, Image } from "@tarojs/components";
import { AtButton, AtTabs, AtTabsPane } from "taro-ui";
import NavBar from 'taro-navigationbar'
import Skeleton from '../../components/skeleton'

const util = require("../../util/util")
import "./index.scss";

export default class IdentifyCard extends Component {
    constructor() {
        super(...arguments);
        this.state = {
            current: 0,
        };
    }
    componentWillMount() {
    }

    componentDidMount() { }

    componentWillUnmount() { }

    componentDidShow() { }

    componentDidHide() { }

    config = {
        navigationBarTitleText: "gxvashgvxhahg",
        navigationStyle: 'custom'
    };
    handleClick (value) {
        this.setState({
          current: value
        })
      }
    render() {
        const tabList = [{ title: '待确认' }, { title: '待开始' }, { title: '进行中' }, { title: '已完成' }]
        return (
            <View>
                <NavBar title='我的任务' back></NavBar>
                <AtTabs current={this.state.current} tabList={tabList} onClick={this.handleClick.bind(this)}>
                    <AtTabsPane current={this.state.current} index={0} >
                        <View  ><Skeleton></Skeleton></View>
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
            </View>
        );
    }
}