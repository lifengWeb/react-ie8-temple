//提醒管理
import React, { Component } from 'react';
require('./reminderManager.css');
const DatePicker = require('antd/lib/date-picker');
function onChange(value,dateString){
    console.log(value,dateString)
}
class ReminderManager extends Component {
    constructor(props){
        super(props);
        this.state={
            showCover:false
        }
    }
    
    render(){
        return(
            <div>                
                <div className='navTop'></div>
                <div className='nav'>                
                    <span className='med_seven_five_grey'>提醒管理</span>
                    <span className='floatRight' onClick={()=>this.props.history.push('/reminderManager/usingReminder')}>运行中的提醒规则 >> </span>
                </div>
                <div className='rm_Contain'>
                    <div className='rm_chooseTme'>
                        <span className='med_six_five_grey'>提醒时间：</span>
                        <DatePicker onChange={onChange} />
                    </div>
                    {/* 列表上面操作部分 */}
                    <div className='handleContain clearfix'>
                        <div className='regu_seven_four_grey groupHandle floatLeft' onClick={()=>this.setState({
                            showCover:true
                        })}>                            
                            <span>全部展开</span>
                            <span className="ant-divider"></span> 
                            <span>全部折叠</span>
                        </div>
                        <div className='refreshBtn floatLeft regu_seven_four_grey'>
                            <img src={require('../../asset/img/refresh.png')} className='refreshIcon'></img>
                            刷新
                        </div>
                        <div className='floatRight'> 
                            <div className='addBtn floatLeft rm_addBtn' onClick={()=>{
                                this.props.history.push('/reminderManager/addReminder')
                            }}>
                                <span className='med_seven_five_white'>配置新提醒</span>
                            </div>
                        </div>
                    </div>
                    <div className='rm_reminList'>
                            <div className="rm_reminListTitle borderBottom">
                                <img src={require('../../asset/img/dropDown.png')} className='rm_dropImg'></img>
                                <span className='med_seven_five_Black'>2019年1月2日 星期一 提醒列表</span>
                                <span className='floatRight med_seven_five_grey'>数量 <span> 7984</span></span>
                            </div>
                            <div className="rm_reminListItem med_seven_five_grey borderBottom">
                                <span>时间 <span>10:45</span></span>
                                <span className="med_sixHalf_five_Black">高血压患者异常提醒</span>
                                <a onClick={()=>this.setState({
                                    showCover:true
                                })}>详情</a>
                                <div className='rm_reminPatient'>提醒对象：<span>患者1</span></div>
                            </div>
                            <div className="rm_reminListItem med_seven_five_grey borderBottom">
                                <span>时间 <span>10:45</span></span>
                                <span className="med_sixHalf_five_Black">高血压患者异常提醒</span>
                                <a>详情</a>
                                <div className='rm_reminPatient'>提醒对象：<span>患者1</span></div>
                            </div>
                            <div className="rm_reminListItem med_seven_five_grey borderBottom">
                                <span>时间 <span>10:45</span></span>
                                <span className="med_sixHalf_five_Black">高血压患者异常提醒</span>
                                <a>详情</a>
                                <div className='rm_reminPatient'>提醒对象：<span>患者1</span></div>
                            </div>
                            <div className="rm_reminListItem med_seven_five_grey borderBottom">
                                <span>时间 <span>10:45</span></span>
                                <span className="med_sixHalf_five_Black">高血压患者异常提醒</span>
                                <a>详情</a>
                                <div className='rm_reminPatient'>提醒对象：<span>患者1</span></div>
                            </div>
                            <div className="rm_reminListItem med_seven_five_grey borderBottom">
                                <span>时间 <span>10:45</span></span>
                                <span className="med_sixHalf_five_Black">高血压患者异常提醒</span>
                                <a>详情</a>
                                <div className='rm_reminPatient'>提醒对象：<span>患者1</span></div>
                            </div>
                    </div>

                    <div className='rm_reminList'>
                    <div className="rm_reminListTitle borderBottom">
                        <img src={require('../../asset/img/dropDown02.png')} className='rm_dropImg'></img>
                        <span className='med_seven_five_Black'>2019年1月2日 星期一 提醒列表</span>
                        <span className='floatRight med_seven_five_grey'>数量 <span> 7984</span></span>
                    </div>
                    <div className="rm_reminListItem med_seven_five_grey borderBottom">
                        <span>时间 <span>10:45</span></span>
                        <span className="med_sixHalf_five_Black">高血压患者异常提醒</span>
                        <a>详情</a>
                        <div className='rm_reminPatient'>提醒对象：<span>患者1</span></div>
                    </div>
                    <div className="rm_reminListItem med_seven_five_grey borderBottom">
                        <span>时间 <span>10:45</span></span>
                        <span className="med_sixHalf_five_Black">高血压患者异常提醒</span>
                        <a>详情</a>
                        <div className='rm_reminPatient'>提醒对象：<span>患者1</span></div>
                    </div>
                    <div className="rm_reminListItem med_seven_five_grey borderBottom">
                        <span>时间 <span>10:45</span></span>
                        <span className="med_sixHalf_five_Black">高血压患者异常提醒</span>
                        <a>详情</a>
                        <div className='rm_reminPatient'>提醒对象：<span>患者1</span></div>
                    </div>
                    <div className="rm_reminListItem med_seven_five_grey borderBottom">
                        <span>时间 <span>10:45</span></span>
                        <span className="med_sixHalf_five_Black">高血压患者异常提醒</span>
                        <a>详情</a>
                        <div className='rm_reminPatient'>提醒对象：<span>患者1</span></div>
                    </div>
                    <div className="rm_reminListItem med_seven_five_grey borderBottom">
                        <span>时间 <span>10:45</span></span>
                        <span className="med_sixHalf_five_Black">高血压患者异常提醒</span>
                        <a>详情</a>
                        <div className='rm_reminPatient'>提醒对象：<span>患者1</span></div>
                    </div>
                    </div>                    
                </div>
                {/*详情弹窗*/}
                {
                    this.state.showCover?
                    <div className='coverView' onClick={()=>this.setState({
                        showCover:false
                    })}>
                            <div className='groupCover rm_reminDetailCover' onClick={(e)=>{
                                e.stopPropagation()
                            }}>
                                <div className='coverTitle'>                                    
                                    <span className='bold_elev_bold_grey '>提醒详情</span>
                                    <img src={require('../../asset/img/delete.png')} className='groupCover_delIcon floatRight'></img>
                                </div>
                                <div className='rm_reminDetailContain clearfix'>                                   
                                    <div className='rm_LeftLabel med_sixHalf_five_grey floatLeft'>                                    
                                        <div className='marginBtm'>标题</div>
                                        <div className='marginBtm'>发送时间</div>
                                        <div className='marginBtm'>类型</div>
                                        <div className='marginBtm'>触发规则</div>
                                        <div className='marginBtm'>提醒内容</div>
                                        <div className='marginBtm'>提醒对象</div>
                                    </div>
                                    <div className='rm_RightLabel med_sixHalf_five_Black floatLeft'>                                    
                                        <div className='marginBtm'>高血压异常提醒</div>
                                        <div className='marginBtm'>2019年01月02日 10:45</div>
                                        <div className='marginBtm'>心率异常提醒</div>
                                        <div className='marginBtm'>测量心率大于<a>160bpm</a>或小于<a>10bpm</a>时发送提醒</div>
                                        <div className='marginHalfBtm'>注意您现在的心率异常，正常人类的心率约在150-60之间，请注意您的身体健康。如身体不适请及时入院治疗</div>
                                        <div className='marginBtm rm_rightLabelPatient med_sixHalf_five_grey'>
                                            <span className='med_sixHalf_five_Black'>患者1( <span>心率:169bpm</span>)</span>
                                            <span className="floatRight ">提醒警报已处理</span>
                                        </div>
                                    </div>
                                </div>
                                <div className='groupHandleBtm'>
                                    <div className='floatRight'>
                                            <div className='confirmBtn med_eight_five_white floatRight'>确认</div>
                                    </div>
                                </div>
                            </div>
                        
                    </div>:''
                }
            </div>
        )
    }
}
module.exports = ReminderManager;