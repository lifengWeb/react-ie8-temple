import React, { Component } from 'react';
require('../patientManager/addPatient.css');
require('./addReminder.css');
import { Slider ,Select,Table} from 'antd';
import { DatePicker } from 'antd';
import { TimePicker } from 'antd';
const Radio = require('antd/lib/radio');
const Checkbox = require('antd/lib/checkbox');

const Upload = require('antd/lib/upload');
const Dragger = Upload.Dragger;
const CheckboxGroup = Checkbox.Group;
const options = [
    { label: '苹果', value: 'Apple' },
    { label: '梨', value: 'Pear' },
    { label: '橘', value: 'Orange' },
  ];
const props = {
    name: 'file',
    showUploadList: false,
    action: '/upload.do',
  };      
function onChange(checkedValues) {
    console.log('checked = ', checkedValues);
}

function log(value) {
    console.log(value);
  }
  // 通过 rowSelection 对象表明需要行选择
const rowSelection = {
    onChange(selectedRowKeys, selectedRows) {
      console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
    },
    onSelect(record, selected, selectedRows) {
      console.log(record, selected, selectedRows);
    },
    onSelectAll(selected, selectedRows, changeRows) {
      console.log(selected, selectedRows, changeRows);
    },
  };
  const columns = [{
    title: '姓名',
    dataIndex: 'name',
    render: text => <a href="#">{text}</a>,
  }, {
    title: '社区',
    dataIndex: 'sex',
  }, {
    title: '证件号码',
    dataIndex: 'address',
  },{
      title: '年龄',
      dataIndex: 'age',
    }, {
      title: '病症分组',
      dataIndex: 'age1',
    }];
    const columnsCover = [{
      title: '姓名',
      dataIndex: 'name',
    }, {
      title: '社区',
      dataIndex: 'address',
    },{
        title: '证件号码',
        dataIndex: 'age',
      }, {
        title: '年龄',
        dataIndex: 'age1',
      }, {
        title: '病症分组',
        dataIndex: 'age2',
      }];
  const data = [{
    key: '1',
    name: '胡彦斌',
    sex:'男',
    age: 32,
    age1: 32,
    age2: 32,
    age3: 32,
    age4: 32,
    address: '西湖区湖底公园1号',
  }, {
    key: '2',
    name: '胡彦祖',
    age: 42,
    address: '西湖区湖底公园1号',
  }, {
    key: '3',
    name: '李大嘴',
    age: 32,
    address: '西湖区湖底公园1号',
  }];
class AddReminder extends Component {
    constructor(props){
        super(props);
        this.state={
            noticeType:'1',//哪种提醒通知类型 
            value: 1,//默认还是自定义
            exceptionType:1,//哪种触发类型
            showCover:true,
        }
    }
    changeNoticeType(e){
        console.log(e);
        this.setState({
            noticeType:e.target.value
        })
    }
    changeType(e){
        this.setState({
            exceptionType:e.target.value
        })
    }
    onChange(e) {
        console.log('radio checked', e.target.value);
        this.setState({
          value: e.target.value,
        });
      }
    
    render(){
        const {exceptionType,value} = this.state;        
        const showBloodCustom = (exceptionType == 2 && value == 2)? true :false;//显示自定义血压
        const showBlooddefault = (exceptionType == 2 && value == 2)? true :false;//显示默认血压
        const showdefaultHeart = (exceptionType == 1 && value == 1)? true :false;//显示默认心率
        const showCustomtHeart =  (exceptionType == 1 && value == 2)? true :false;//显示自定义心率
        const exceptionTypeStr = exceptionType==1?'心率':(exceptionType==2?'血压':'温度');
        return(
            <div>
                <div className='navTop'></div>
                <div className='nav'>                
                    <span className='med_seven_five_grey'>提醒管理 > 配置新提醒</span>
                </div>               
                <div className='ar_Contain'>
                     {/* 头部操作 */}
                    <div className='ar_ContainTitle clearfix'>
                        <span className='regu_seven_four_grey leftTitle'>配置消息提醒内容</span>
                        <div className='floatRight '>
                            <div className='ar_cancelBtn floatLeft med_seven_five_grey'>取消</div>
                            <div className='ar_confirmBtn floatLeft med_seven_five_white'>确认</div>
                        </div>
                    </div>
                    <div className="ar_leftRule floatLeft regu_sixHalf_four_grey">
                        <div>
                            <div className='blueTitleMark floatLeft'></div>
                            <span className='reg_ten_four_Black'>提醒规则</span>
                        </div>         
                        <div className='med_sixHalf_five_Black ar_reminderType'>提醒类型:</div>         
                        <Radio.Group defaultValue="1" buttonStyle="solid" onChange={(e)=>this.changeNoticeType(e)}>
                            <Radio.Button value="1">手环检测异常</Radio.Button>
                            <Radio.Button value="2">服药通知</Radio.Button>
                            <Radio.Button value="3">随访通知</Radio.Button>
                        </Radio.Group>
                        <div className='med_sixHalf_five_Black ar_reminderType'>自定义规则名称</div>
                        <input type="text" className='ar_Input regu_sixHalf_four_grey' placeholder='填写规则名称'/>     
                        <hr/>         
                       {this.state.noticeType == 1?
                        <div>
                            <div className='ar_exceptionType blod_sixHalf_five_black'>异常触发类型</div>    
                            <Radio.Group value={this.state.exceptionType} onChange={(e)=>this.changeType(e)}>
                                <Radio value={1}>心率异常</Radio>
                                <Radio value={2}>血压异常</Radio>
                                <Radio value={3}>手腕温度异常</Radio>
                            </Radio.Group>    
                        <div className='ar_setHeartTiltle blod_sixHalf_five_black'>设置正常<span>{exceptionTypeStr}</span>范围<span>(当手环测量读数不在正常范围将触发提醒)</span></div>
                            <Radio.Group value={this.state.value} onChange={(e)=>this.onChange(e)}>
                                <Radio value={1}>默认正常范围</Radio>
                                <Radio value={2}>自定义正常范围</Radio>
                            </Radio.Group>   
                            {/*默认心率*/}
                            <div className={showdefaultHeart?'ar_defaultHeart med_sixHalf_five_Black':'hide'}>
                                默认正常心率范围：60～100次/分
                            </div>
                              {/*自定义心率*/}
                            <div className={showCustomtHeart?'ar_customHeart ar_customHeartSilder':'hide'}>
                              <div>选择范围(单位bpm)：</div>
                              <div className='clearfix ar_customHeartItem '>
                                 <div className='floatLeft' style={{width:'90%'}}><Slider range step={10} defaultValue={[20, 50]} onChange={log} /></div>
                              </div>                            
                          </div>
                             {/*自定义血压*/}
                            <div className={showBloodCustom?'ar_customHeart':'hide'}>
                                <div>选择范围(单位mmHg)：</div>
                                <div className='clearfix ar_customHeartItem'>
                                    <div className='floatLeft'>收缩压：</div><div className='floatLeft' style={{width:'80%'}}><Slider range step={10} defaultValue={[20, 50]} onChange={log} /></div>
                                </div>
                                <div className='clearfix'>
                                <div className='floatLeft'>舒张压：</div><div className='floatLeft' style={{width:'80%'}}><Slider range step={10} defaultValue={[20, 50]} onChange={log} /></div>
                                </div>
                            </div>
                            
                            <div className='blod_sixHalf_five_black ar_setHeartTiltle'>提醒内容：</div>
                            <textarea className='ar_textArea' placeholder='填写提醒触发后发送给患者的内容'></textarea>
                        </div>  :""}
                        {this.state.noticeType == 2?
                            <div>                       
                                <div className='ar_exceptionType blod_sixHalf_five_black'>设置发送时间</div>    
                                <div className='ar_exceptionType blod_sixHalf_five_black'>
                                    <span>选择日期：</span>
                                    <DatePicker></DatePicker>
                                    <span className='ar_centerMarSpan'> 的 </span>
                                    <TimePicker></TimePicker>
                                    <span className='ar_centerMarSpan'>发送提醒</span>
                                </div>   
                                <div className='blod_sixHalf_five_black ar_setHeartTiltle'>提醒内容：</div>
                                <textarea className='ar_textArea ar_followUpTtextArea' placeholder='填写提醒触发后发送给患者的内容'></textarea>
                            </div>  :""}
                        {this.state.noticeType == 3?
                            <div>                              
                                <div className='blod_sixHalf_five_black ar_setHeartTiltle'>提醒内容：</div>
                                <textarea className='ar_textArea ar_followUpTtextArea' placeholder='填写提醒触发后发送给患者的内容'></textarea>
                            </div>  :""}
                    </div>
                    <div className="ar_rightPatient floatLeft">
                        <div className='ar_patientChoosedTit'>
                            <span className='med_seven_five_grey'>已选患者</span>
                            <span className='ar_addBtn floatRight' style={{color:'#fff'}} onClick={()=>this.setState({showCover:true})}>+</span>
                        </div>
                        <hr/>
                        <div className='med_six_five_Black ar_patientItem clearfix'>
                            <span className='floatLeft'>habi</span>
                            <span className='floatRight'><a>删除</a></span>
                        </div>
                        <div className='med_six_five_Black ar_patientItem clearfix'>
                            <span className='floatLeft'>habi</span>
                            <span className='floatRight'><a>删除</a></span>
                        </div>
                        <div className='ar_clearPatient med_six_five_grey clearfix'>
                            <div className='floatRight'>                                
                                <img src={require('../../asset/img/delete2.png')} className='ar_clearImg'></img>
                                <span>清空列表</span>
                            </div>
                        </div>
                    </div>
                    {
                        this.state.showCover?
                        <div className='coverView' onClick={()=>this.setState({
                            showCover:false
                        })}>
                                <div className='groupCover ar_cover' onClick={(e)=>{
                                    e.stopPropagation()
                                }}>
                                    <div className='coverTitle'>                                    
                                        <span className='bold_elev_bold_grey '>选择患者 已选<span>3</span>人</span>
                                        <img src={require('../../asset/img/delete.png')} className='groupCover_delIcon floatRight'></img>
                                    </div>
                                    <div className='chooseDayItem clearfix ar_coverHeader'>                                   
                                    <span className='med_six_five_grey floatLeft'>病症分组:</span>                       
                                    <div className='floatLeft dayRadio'> 
                                    <Select showSearch
                                        style={{ width: 200 }}
                                        placeholder="请选择社区"
                                        optionFilterProp="children"
                                        notFoundContent="无法找到"
                                        onChange={()=>this.handleChange}
                                    >
                                        <Option value="jack">杰克</Option>
                                        <Option value="lucy">露西</Option>
                                        <Option value="tom">汤姆</Option>
                                    </Select>
                                    </div>   
                                        <span className='med_six_five_grey floatLeft'>选择社区:</span>                       
                                        <div className='floatLeft dayRadio'> 
                                        <Select showSearch
                                            style={{ width: 200 }}
                                            placeholder="请选择社区"
                                            optionFilterProp="children"
                                            notFoundContent="无法找到"
                                            onChange={()=>this.handleChange}
                                        >
                                            <Option value="jack">杰克</Option>
                                            <Option value="lucy">露西</Option>
                                            <Option value="tom">汤姆</Option>
                                        </Select>
                                        </div>   
                                        <span>
                                            <input />
                                        </span>
                                        <div className='ar_freshDiv clearfix'>
                                            <div className='refreshBtn floatRight'>
                                                <img src={require('../../asset/img/refresh.png')} className='refreshIcon'></img>
                                                <span className='regu_seven_four_grey'>刷新</span>
                                            </div>
                                        </div>                                        
                                    </div>
                                    <Table rowSelection={rowSelection} columns={columns} dataSource={data} pagination={false}/>  
                                    <div className='groupHandleBtm'>
                                        <div className='floatRight'>
                                                <div className='cancelBtn med_eight_five_grey floatLeft'>取消</div>
                                                <div className='confirmBtn med_eight_five_white floatRight'>完成</div>
                                        </div>
                                    </div>
                                </div>
                            
                        </div>:''
                    }
                    
                </div>

            </div>
        )
    }
}
module.exports = AddReminder;