import React, { Component } from 'react';
import { Select } from 'antd';

require('./usingReminder.css');
class UsingReminder extends Component {
    constructor(props) {
        super(props);
        this.state = {
            key: 1
        }
    }
    handleChange(e) {
        console.log(e)
    }

    render() {
        return (
            <div>
                <div className='navTop'></div>
                <div className='nav'>
                    <span className='med_seven_five_grey floatLeft'>提醒管理 > 运行中的提醒</span>
                    <div className='floatLeft TabsContain med_seven_five_grey'>
                        <div className='pd_tabDiv pd_titleTab ur_titleTab'>
                            <span className={this.state.key == 1 ? 'pd_chooseItem pd_choosed pd_titlechoosed' : 'pd_chooseItem'} onClick={() => this.setState({
                                key: 1
                            })}>心率异常提醒</span>
                            <span className={this.state.key == 2 ? 'pd_chooseItem pd_choosed pd_titlechoosed' : 'pd_chooseItem'} onClick={() => this.setState({
                                key: 2
                            })}>血压异常提醒</span>
                            <span className={this.state.key == 3 ? 'pd_chooseItem pd_choosed pd_titlechoosed' : 'pd_chooseItem'} onClick={() => this.setState({
                                key: 3
                            })}>温度异常提醒</span>
                            <span className={this.state.key == 4 ? 'pd_chooseItem pd_choosed pd_titlechoosed' : 'pd_chooseItem'} onClick={() => this.setState({
                                key: 4
                            })}>服药提醒</span>
                        </div>
                    </div>
                </div>
                <div className="ur_main">
                    <div className='ur_reminderContain'>
                        <div className="ur_reminderItem">
                            <div className='ur_reminderItemTitle'>
                                <span className='med_sixHalf_five_Black'>高血压患者异常提醒</span>
                                <span className='med_six_five_blue ur_centerSpan'>详情</span>
                                <span className='med_six_five_blue'>停止并删除</span>
                                <div className='floatRight'>
                                    <span className='med_six_five_grey'>创建时间 2019年1月1日 10:41</span>
                                </div>

                            </div>
                            <span className='med_six_five_grey'>提醒对象：</span>
                            <span className='med_six_five_grey'>患者1</span>
                        </div>
                        <div className="ur_reminderItem">
                            <div className='ur_reminderItemTitle'>
                                <span className='med_sixHalf_five_Black'>高血压患者异常提醒</span>
                                <span className='med_six_five_blue ur_centerSpan'>详情</span>
                                <span className='med_six_five_blue'>停止并删除</span>
                            </div>
                            <span className='med_six_five_grey'>提醒对象：</span>
                            <span className='med_six_five_grey'>患者1</span>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
module.exports = UsingReminder;