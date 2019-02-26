import React, { Component } from 'react';
const style = require('./patientDetail.css');
import { Tabs ,Table} from 'antd';
const TabPane = Tabs.TabPane;
const Upload = require('antd/lib/upload');
const Dragger = Upload.Dragger;
const Pagination = require('antd/lib/pagination');
const Radio = require('antd/lib/radio');
const DatePicker = require('antd/lib/date-picker');
const RangePicker = DatePicker.RangePicker;
function callback(key) {
  console.log(key);
}
const props = {
    name: 'file',
    showUploadList: false,
    action: '/upload.do',
  };  
const columns = [{
    title: '监测项',
    dataIndex: 'name',
  }, {
    title: '监测详细信息',
    dataIndex: 'age',
  }, {
    title: '最近一次测量时间',
    dataIndex: 'address',
  }, {
    title: '当前状态',
    dataIndex: 'address1',
  }, {
    title: '操作',
    dataIndex: 'address2',
  }];
  
  const data = [{
    key: '血压',
    name: '胡彦斌',
    age: 32,
    address: '西湖区湖底公园1号',
  }, {
    key: '心率',
    name: '胡彦祖',
    age: 42,
    address: '西湖区湖底公园1号',
  }, {
    key: '手腕温度',
    name: '李大嘴',
    age: 32,
    address: '西湖区湖底公园1号',
  }];


 
class PatientDetail extends Component {
    constructor(props){
        super(props);
        this.state={
            showCover:false,
            key:1,
            bloodStatus:1,//异常类别状态 1 全部状态 2 未处理
        }
    }
    changeTab(key){
        console.log(key);
        this.setState({key:key})
    }
    
    render(){
        return(
            <div className='patientDetail'>        
                <div className='navTop'></div>           
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
                {
                    this.state.key==1?
                    <div className='patientInfoContain'>
                        {/*左边详细信息*/}
                        <div className='pd_LeftContain floatLeft'>
                            <div className="pd_title blod_ten_five_Black">患者详细信息</div>
                            <div className='floatRight med_six_five_grey pd_lastTime'>上一次编辑于：2019/01/01 </div>
                            <div className='pd_basicInfo'>
                                <span className='pd_blueTitleMark'></span>
                                <span className='regu_six_four_grey'>基本信息</span>
                                <div className='pd_userInfoItem clearfix'>
                                    <div className='pd_userInfoItemColumn floatLeft'>
                                        <span className='blod_sixHalf_five_black'>患者姓名: </span>
                                        <span className='med_sixHalf_five_Black'>徐达</span>
                                    </div>
                                    <div className='pd_userInfoItemColumnSec floatLeft'>
                                        <span className='blod_sixHalf_five_black'>性别: </span>
                                        <span className='med_sixHalf_five_Black'>男</span>
                                    </div>
                                    <div className='floatLeft'>
                                        <span className='blod_sixHalf_five_black'>年龄: </span>
                                        <span className='med_sixHalf_five_Black'>19</span>
                                    </div>                                    
                                </div>
                                <div className='pd_userInfoItem clearfix'>
                                    <div className='pd_userInfoItemColumn floatLeft'>
                                        <span className='blod_sixHalf_five_black'>证件号码: </span>
                                        <span className='med_sixHalf_five_Black'>254264115488454475</span>
                                    </div>
                                    <div className='pd_userInfoItemColumnSec floatLeft'>
                                        <span className='blod_sixHalf_five_black'>社区: </span>
                                        <span className='med_sixHalf_five_Black'>天河东路的日子</span>
                                    </div>
                                    <div className='floatLeft'>
                                        <span className='blod_sixHalf_five_black'>联系方式: </span>
                                        <span className='med_sixHalf_five_Black'>15932151478</span>
                                    </div>                                    
                                </div>
                                <div className='pd_userInfoItem'>
                                    <span className='blod_sixHalf_five_black'>病症分组: </span>
                                    <span className='med_sixHalf_five_Black pd_diseaseType'>高血压</span>                                              
                                    <span className='med_sixHalf_five_Black pd_diseaseType'>糖尿病</span>                                              
                                    <span className='med_sixHalf_five_Black pd_diseaseType'>心脏病</span>                                              
                                </div>
                            </div>
                            <div>
                                <span className='pd_blueTitleMark'></span>
                                <span className='regu_six_four_grey'>基本信息 </span>
                                <span className='regu_six_four_Black'>当前已绑定手环（fdyhgfs) </span>
                                <span className='regu_six_four_Black blue'> 解除绑定</span>
                                <div className='floatRight'>
                                    <img src={require('../../asset/img/refresh.png')} className='refreshIcon'></img>
                                    <span className='regu_seven_four_grey'>刷新</span>
                                </div>
                                <div className='pd_tableContain'>
                                    <Table columns={columns} dataSource={data} pagination={false} />
                                </div>
                                <div className='pd_exceptionContain'>
                                    <div className='pd_dashDiv'></div>
                                    <div className='pd_exceptionTitle regu_seven_four_Black'>异常统计信息</div>
                                    <div className='pd_timeChoose'>
                                        <Radio.Group defaultValue="1" buttonStyle="solid" onChange={(e)=>this.changeNoticeType(e)}>
                                            <Radio.Button value="1">全部</Radio.Button>
                                            <Radio.Button value="2">本周</Radio.Button>
                                            <Radio.Button value="3">本月</Radio.Button>
                                        </Radio.Group>
                                        <span className='pd_rangeSpan'>
                                            <RangePicker format="yyyy/MM/dds" />
                                        </span>     
                                    </div>
                                    <div className='pd_infoItem'>
                                        <div className='pd_leftTable floatLeft'>
                                            <div className='pd_leftTableHeader'>
                                                <div className='regu_sixHalf_four_grey'>血压异常统计</div>
                                                <div className='bold_seventeen_bold_blue'>142</div>
                                                <div className='regu_sixHalf_four_grey'>总预警次数</div>
                                            </div>

                                        </div>
                                        <div className='pd_rightTable floatLeft'>
                                            <div className='pd_rightTableTitle regu_sixHalf_four_grey clearfix'>
                                                <span>详细异常列表</span>
                                                <div className='floatRight pd_tabDiv'>
                                                    <span className={this.state.bloodStatus==1?'pd_chooseItem pd_choosed':'pd_chooseItem' } onClick={()=>this.setState({
                                                        bloodStatus: 1
                                                    })}>全部状态</span>
                                                    <span className={this.state.bloodStatus==2?'pd_chooseItem pd_choosed':'pd_chooseItem' } onClick={()=>this.setState({
                                                        bloodStatus: 2
                                                    })}>仅未处理</span>
                                                </div>                                            
                                            </div>
                                            <div className='pd_tableItem'>
                                                <div className='pd_tableItemContain taho_sixHalf_four_grey clearfix'>
                                                    <span>2019/01/01 10:40</span>
                                                    <span className='blue pd_centerMarg'>125/95 mmHg</span>
                                                    <span className='floatRight'>已处理1</span>
                                                </div>
                                            </div>
                                            <div className='pd_tableItem'>
                                                <div className='pd_tableItemContain taho_sixHalf_four_grey clearfix'>
                                                    <span>2019/01/01 10:40</span>
                                                    <span className='blue pd_centerMarg'>125/95 mmHg</span>
                                                    <span className='floatRight'>已处理</span>
                                                </div>
                                            </div>
                                            <div className='pd_tableItem'>
                                                <div className='pd_tableItemContain taho_sixHalf_four_grey clearfix'>
                                                    <span>2019/01/01 10:40</span>
                                                    <span className='blue pd_centerMarg'>125/95 mmHg</span>
                                                    <span className='floatRight'>已处理</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                
                            </div>
                        </div>
                        {/*右边备注信息*/}
                        <div className='pd_rightCotain floatLeft'>
                            <div className='pd_remarkInfo'>
                                <div className='regu_seven_four_Black pd_remarkInfoTitle'>备注信息</div>
                                <div className='regu_sixHalf_four_grey'>
                                    备注信息内容
                                </div>
                            </div>
                            <div className='pd_upload'>
                                <div className='med_seven_five_Black'>
                                    附件信息
                                </div>
                                <div className='upaloadArea'>
                                    <Dragger {...props}>
                                        <img src={require('../../asset/img/uploadIcon.png')} className='uploadIcon'></img>
                                        <div className='uploadMargin'><span className='med_seven_five_Black '>点击上传附件</span></div>
                                        <span className='regu_six_four_grey'>附件格式支持.jpg .pdf word excel</span>
                                    </Dragger>
                                </div>
                                <div className='fileItem clearfix'>
                                    <span className='med_six_five_Black floatLeft'>患者病历.pdf</span>
                                    <span className='med_six_five_Black floatRight' style={{color:'#0295D2'}}>删除</span>
                                </div>
                                <div className='fileItem clearfix'>
                                    <span className='med_six_five_Black floatLeft'>患者病历.pdf</span>
                                    <span className='med_six_five_Black floatRight' style={{color:'rgba(134,138,144,1)'}}>上传中(65%)</span>
                                </div>
                                <div className='pd_uploadBottom regu_six_four_grey'>
                                    <span className='floatLeft'>共 <span>20M</span>容量</span>
                                    <span className='floatRight'>剩余<span>19M</span>/已使用<span>1M</span></span>
                                </div>
                            </div>
                        </div>
                    </div>:'' 
                }
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