import React, { Component } from 'react';
const style = require('./patientDetail.css');
import { Tabs } from 'antd';
const TabPane = Tabs.TabPane;
const Pagination = require('antd/lib/pagination');
function callback(key) {
  console.log(key);
}

 
class PatientDetail extends Component {
    constructor(props){
        super(props);
        this.state={
            showCover:false,
            key:2
        }
    }
    changeTab(key){
        console.log(key);
        this.setState({key:key})
    }
    
    render(){
        return(
            <div className='patientDetail'>                
                <div className='nav clearfix'>                
                    <span className='med_seven_five_grey'>患者管理 > 详情</span>
                    <div className='floatRight TabsContain med_seven_five_grey'>
                        <Tabs defaultActiveKey="1" onChange={(e)=>this.changeTab(e)} size="small">
                            <TabPane tab="患者信息" key="1">
                            </TabPane>
                            <TabPane tab="随访信息" key="2">
                            </TabPane>
                            <TabPane tab="提醒" key="3">
                            </TabPane>
                        </Tabs>
                    </div>
                </div>
                {/* 患者信息页面 */}
                {/* <div className='patientInfoContain'>
                    
                </div> */}
                {/* 随访信息页面 */}
               { this.state.key==2? <div className='pd_followUpContain clearfix'>
                    <div className='pd_followShotMsg floatLeft'>
                        <div className='pd_followShotMsgItem pd_choosed'>
                            <div className='blod_eight_five_black'>2019年1月1日</div>
                            <div className='med_sixHalf_five_grey pd_itemCenterMargin'>高血压随访记录表</div>
                            <div className='med_sixHalf_five_grey'>随访人员：<span>和医生</span></div>
                        </div>
                        <div className='pd_followShotMsgItem'>
                            <div className='blod_eight_five_black'>2019年1月1日</div>
                            <div className='med_sixHalf_five_grey pd_itemCenterMargin'>高血压随访记录表</div>
                            <div className='med_sixHalf_five_grey'>随访人员：<span>和医生</span></div>
                        </div>                      
                    </div>
                    <div className='pd_followUpDetail floatLeft'>
                        <div className='pd_followUpDetailHeader borderBottom'>
                            <div className='pd_followUpDetailTitle blod_ten_five_Black'>高血压患者随访服务记录表</div>
                            <div className='med_six_five_grey pd_followUpDetailDoc'>
                                <span>随访人员：何医生  </span>
                                <span>随访日期：2019/01/01 12:14</span>
                            </div>
                        </div>
                        <div className='pd_patientInfo clearfix blod_sixHalf_five_black borderBottom'>
                            <div className='floatLeft pd_firstRow '>
                                <div className='pd_rowItem'>
                                    <span>患者姓名：</span>
                                    <span>许多</span>
                                </div>
                                <div className='pd_rowItem'>
                                    <span>证件号码:</span>
                                    <span>许多</span>
                                </div>
                                <div className='pd_rowItem'>
                                    <span>联系方式:</span>
                                    <span>许多</span>
                                </div>
                            </div>
                            <div className='floatLeft pd_secondRow'>
                                <div className='pd_rowItem'>
                                    <span>性别：</span>
                                    <span>许多</span>
                                </div>
                                <div className='pd_rowItem'>
                                    <span>社区:</span>
                                    <span>许多</span>
                                </div>
                                <div className='pd_rowItem'>
                                    <span>地址:</span>
                                    <span>许多</span>
                                </div>
                            </div>
                            <div className='floatLeft'>
                                <div className='pd_rowItem'>
                                    <span>年龄：</span>
                                    <span>许多</span>
                                </div>
                                <div className='pd_rowItem'>
                                    <span>病症分组：</span>
                                    <span>许多</span>
                                </div>                               
                            </div>

                        </div>
                        <div className='blod_sixHalf_five_black pd_followUpTableContain'>
                            内容
                        </div>
                        
                    </div>
                </div>:''}
                {/* 提醒Tab页面 */}
               {this.state.key==3? <div>
                    <div className='tipUsingContain'>
                        <div className='tipsTitle'>
                            <div className='blueTitleMark floatLeft'></div>
                            <span className='reg_ten_four_Black'>使用中的提醒规则</span>                           
                        </div>
                        <div className='tipsItem'>
                            <div className='med_sixHalf_five_Black'>
                                    服药提醒：高血压患者服药提醒
                                <div className='floatRight'>
                                    <a>详情</a>
                                    <a>删除提醒规则</a>
                                </div>
                            </div>
                            <div className='med_six_five_grey'>事实上事实上事实上</div>
                        </div>
                        <div className='tipsItem'>
                            <div className='med_sixHalf_five_Black'>
                                服药提醒：高血压患者服药提醒
                                <div className='floatRight'>
                                    <a onClick={()=>{
                                        this.setState({
                                            showCover:true,                                            
                                        })
                                    }}>详情</a>
                                    <a>删除提醒规则</a>
                                </div>
                            </div>
                            <div className='med_six_five_grey'>事实上事实上事实上</div>
                        </div>
                    </div>
                    <div className='historyTipsContain'>
                        <div className='tipsTitle'>
                            <div className='blueTitleMark floatLeft'></div>
                            <span className='reg_ten_four_Black'>历史提醒记录(12)</span>                           
                        </div>
                        <div className='tipsItem'>
                            <div className='med_sixHalf_five_Black'>服药提醒：高血压患者服药提醒
                                <div className='floatRight med_six_five_grey'>
                                    <span>提醒日期2019/01/02</span>
                                </div></div>
                            <div className='med_six_five_grey'>事实上事实上事实上</div>
                        </div>
                        <div className='tipsItem'>
                            <div className='med_sixHalf_five_Black'>服药提醒：高血压患者服药提醒</div>
                            <div className='med_six_five_grey'>事实上事实上事实上</div>
                        </div>

                        <div className='floatRight'>                    
                            <Pagination defaultCurrent={1} size="small" total={50} showSizeChanger showQuickJumper  />
                        </div>    
                    </div>

                    {/* 操作弹窗 */}
                    <div className={this.state.showCover?'coverView':'hide'} onClick={()=>this.setState({
                            showCover:false
                        })}>    
                                {/* 删除弹窗 */}
                                <div className='groupCover delCover hide' onClick={(e)=>{
                                    e.stopPropagation()
                                }}>
                                    <div className='coverTitle'>                                    
                                        <span className='bold_elev_bold_grey '>规则详情</span>
                                        <img src={require('../../asset/img/delete.png')} className='groupCover_delIcon floatRight'></img>
                                    </div>
                                    <div className='med_sixHalf_five_DarkBlack margLeftDouble'>
                                       确认要删除此项提醒吗，删除后无法恢复
                                    </div>
                                    <div className='groupHandleBtm'>
                                        <div className='floatRight'>
                                                <div className='cancelBtn med_eight_five_grey floatLeft'>取消</div>
                                                <div className='confirmBtn med_eight_five_white floatRight'>删除</div>
                                        </div>
                                    </div>
                                </div>    
                                {/* 异常提醒 */}
                                <div className='groupCover delCover hide' onClick={(e)=>{
                                    e.stopPropagation()
                                }}>
                                    <div className='coverTitle'>                                    
                                        <span className='bold_elev_bold_grey '>规则详情</span>
                                        <img src={require('../../asset/img/delete.png')} className='groupCover_delIcon floatRight'></img>
                                    </div>
                                    <div className='med_sixHalf_five_DarkBlack margLeftDouble'>
                                        <div className='pd_coverLabelDiv'>
                                            <span className='pd_coverLabel med_sixHalf_five_grey'>类型</span>
                                            <span>心率异常提醒</span>
                                        </div>
                                        <div  className='pd_coverLabelDiv'>
                                            <span className='pd_coverLabel med_sixHalf_five_grey'>规则</span>
                                            <span>测量心率大于<span>160bpm</span>或小于<span>10bpm</span>时发送提醒</span>
                                        </div>
                                        <div  className='pd_coverLabelDiv'>
                                            <span className='pd_coverLabel med_sixHalf_five_grey'>提醒内容</span>
                                            <span>注意您现在的心率异常，正常人类的心率约在150-60之间，请注意您的身体健康。如身体不适请及时入院治疗</span>
                                        </div>
                                    </div>                                   
                                </div>      
                                {/* 服药提醒 */}
                                <div className='groupCover pd_detailCover' onClick={(e)=>{
                                    e.stopPropagation()
                                }}>
                                    <div className='coverTitle'>                                    
                                        <span className='bold_elev_bold_grey '>规则详情</span>
                                        <img src={require('../../asset/img/delete.png')} className='groupCover_delIcon floatRight'></img>
                                    </div>
                                    <div className='med_sixHalf_five_DarkBlack margLeftDouble'>
                                        <div className='pd_coverLabelDiv'>
                                            <span className='pd_coverLabel med_sixHalf_five_grey'>类型</span>
                                            <span>服药异常提醒</span>
                                        </div>
                                        <div  className='pd_coverLabelDiv clearfix'>
                                            <span className='pd_coverLabel med_sixHalf_five_grey floatLeft'>发送时间</span>
                                            <div className='pd_sendTime floatLeft med_six_five_grey'>
                                            2019年11月1日 18：24
                                            </div>
                                        </div>
                                        <div  className='pd_coverLabelDiv'>
                                            <span className='pd_coverLabel med_sixHalf_five_grey'>提醒内容</span>
                                            <span>注意您现在的心率异常，正常人类的心率约在150-60之间，请注意您的身体健康。如身体不适请及时入院治疗</span>
                                        </div>
                                    </div>                                   
                                </div>                           
                        </div>:''
                    </div>                
                :''}
            </div>
        )
    }
}
module.exports = PatientDetail;