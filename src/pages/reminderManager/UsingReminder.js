import React, { Component } from 'react';
import { Select} from 'antd';

require('./usingReminder.css');
class UsingReminder extends Component {
    constructor(props){
        super(props);
        this.state={

        }
    }
    handleChange(e){
        console.log(e)
    }
    
    render(){
        return(
            <div>         
                <div className='navTop'></div>       
                <div className='nav'>                
                    <span className='med_seven_five_grey'>提醒管理 > 运行中的提醒</span>
                </div>
                <div className="ur_main">
                    <div className='rm_chooseTme'>
                        <span className='med_six_five_grey'>提醒时间：</span>
                        <Select showSearch
                            style={{ width: 200 }}
                            placeholder="请选择提醒类型"
                            optionFilterProp="children"
                            notFoundContent="无法找到"
                            onChange={()=>this.handleChange}
                        >
                            <Option value="jack">杰克</Option>
                            <Option value="lucy">露西</Option>
                            <Option value="tom">汤姆</Option>
                        </Select>
                    </div>
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