//病人管理
import React ,{Component} from 'react';
import { browserHistory } from 'react-router';
require('./patientManager.css');
const message = require('antd/lib/message');
const getAxios = require('../../utils/axiosInstance');
const Enum = require('../../utils/enum');


const Breadcrumb = require('antd/lib/breadcrumb');
const Radio = require('antd/lib/radio');

const DatePicker = require('antd/lib/date-picker');
const RangePicker = DatePicker.RangePicker;

const Select = require('antd/lib/select');
const Option = Select.Option;

const Table = require('antd/lib/table');

let children = [];
for (let i = 10; i < 36; i++) {
  children.push(<Option key={i.toString(36) + i}>{i.toString(36) + i}</Option>);
}

// function handleChange(value) {
//   console.log(`selected ${value}`);
// }

// 通过 rowSelection 对象表明需要行选择
let selectedRowsArr = [];
const rowSelection = {
  onChange(selectedRowKeys, selectedRows) {
    selectedRowsArr = selectedRows
  },
  onSelect(record, selected, selectedRows) {
    console.log(record, selected, selectedRows);
  },
  onSelectAll(selected, selectedRows, changeRows) {
    console.log(selected, selectedRows, changeRows);
  },
};

class PatientManager extends Component{
    constructor(props){
        super(props);
        this.state={
            showItem:-1, //显示哪个提醒服务弹窗
            showCover:false,//是否显示操作分组的弹窗
            showDelCover:false,
            patientList:[],
            pageNow:1,
            diseaseList:[],
            communityList:[],
            diseaseType:'',
            communityType:'',
            exceptionType:'',
            gender:'',
        }
    }
    componentDidMount(){
       this.getPatientList();
        //获取疾病分组
        getAxios('/api/v1/disease','get',{},(res)=>{
            res.data.map((item)=>{
                item.isSelect = false 
            })
            this.setState({
                diseaseList:res.data
            })
        })
        //获取社区分组
        getAxios('/api/v1/community','get',{},(res)=>{
            this.setState({
                communityList:res.data
            })
        })
    }
    //获取患者列表
    getPatientList(){
        let url = '';
        let {diseaseType,communityType,exceptionType,gender} = this.state;
        if(diseaseType){
            url = 'disease_id=' + diseaseType;
        }
        if(communityType){
            url?
                url += '&community_id=' + communityType:
                url = 'community_id=' + communityType            
        }
        if(exceptionType){
            url?
                url += '&'+exceptionType + '=1':
                url += exceptionType + '=1'
        }
        if(gender){
            url?
            url += '&gender='+gender:
            url += 'gender='+gender
        }
         getAxios(url?'/api/v1/patient?'+url:'/api/v1/patient','get',{},(res)=>{
            this.setState({
                patientList:res.data
            })
        })
    }
    //筛选患者列表时 选择病症分组
    handleChangeDisease(e){
        this.setState({
            diseaseType:e
        },()=>{
            this.getPatientList()
        })        
    }
    //筛选患者列表时 选择社区分组
    handleChangeCommunity(e){
        this.setState({
            communityType:e
        },()=>{
            this.getPatientList()
        })
    }
    //筛选患者列表时 选择异常
    handleChangeException(e){
        this.setState({
            exceptionType:e
        },()=>{
            this.getPatientList()
        })
    }
    //筛选患者列表时 选择性别
    handleChangeGender(e){
        this.setState({
            gender:e.target.value
        },()=>{
            this.getPatientList()
        })
    }

    //复制分组时 选择病症分组
    chooseDiseasegroup(id){
        const diseaseList = this.state.diseaseList;
        diseaseList.map((item)=>{
            if(item.id == id){
                item.isSelect = !item.isSelect;
            }
        })
        this.setState({
            diseaseList
        })
    }
    hideCover(){
        this.setState({
            showCover:false,
            showDelCover:false
        })
    }
    //删除某个患者
    delPatient(id){
        getAxios('/api/v1/patient/'+id,'delete',{},(res)=>{
            message.success('删除成功');
            this.getPatientList();
            this.hideCover();
        })
    }
    delSomePatient(){
        if(selectedRowsArr.length>0){
            selectedRowsArr.map((item)=>{
                this.delPatient(item.id);            
            })
        }else{
            message.error('您还未选中患者')
        }
    }
    render(){
        const columns = [{
            title: '姓名',
            dataIndex: 'name',
            width: 150,
            render: text => <a>{text}</a>,
          }, {
            title: '性别',
            width: 50,
            dataIndex: 'gender',
            render:  gender => <span>{Enum.getSex(gender)}</span>,
          }, {
            title: '社区',
            width: 150,
            dataIndex: 'community',
            render:  community => <span>{community&&community.name}</span>,
          },{
              title: '年龄',
              width: 50,
              dataIndex: 'age',
            }, {
              title: '证件号码',
              dataIndex: 'idcard_number',
              width: 150,
            }, {
              title: '联系方式',
              dataIndex: 'phone',
              width: 150,
            },{
              title: '分组',
              dataIndex: 'disease',
              width: 150,
              render:  disease => <span>{disease&&disease.map((item)=>{
                  return(
                      <span key={item.id}>{item.name+ ' '}</span>
                  )
              })}</span>,
            }, {
              title: '当前警报状态',
              dataIndex: 'age4',
              width: 150,
            }, {
              title: '已设置提醒',
              dataIndex: 'age5',
              width:100,
              render: (text,record) => {
                  const {showItem} = this.state;
                return(
                    <div style={{position:'relative'}}
                            onMouseLeave={(e)=>{
                                this.setState({showItem:-1})
                            }}
                            onMouseOver={(e)=>{
                                this.setState({showItem:record.id})
                            }} className='patiManagerTips'>
                            <span
                                style={showItem==record.id?{color:'#03D3D8'}:{}}
                            >
                                {text}
                                <img className='tipsIcon'src={showItem==record.id?require('../../asset/img/icon2.png'):require('../../asset/img/icon.png')}></img>
                            
                            </span>
                            {
                                    showItem==record.id?
                                    <div className='tipsContain'>
                                        <div className='tipsTitle clearfix'>
                                            <span className='med_six_five_grey floatLeft'>已设提醒服务 2条</span>
                                            <span className='med_six_five_blue floatRight'>详情</span>
                                        </div>
                                        <div>
                                            <div className='tipsItem'>
                                                <div className='tipsMark floatLeft'></div>
                                                <span className='med_sixHalf_five_Black floatLeft'>中老年高血压预警Title</span>
                                                <br/>
                                                <div className='med_six_five_grey tipsType'>类型： 异常提醒</div>
                                            </div>
                                            <div className='tipsItem'>
                                                <div className='tipsMark floatLeft'></div>
                                                <span className='med_sixHalf_five_Black floatLeft'>中老年高血压预警Title</span>
                                                <br/>
                                                <div className='med_six_five_grey tipsType'>类型： 服药提醒</div>
                                            </div>
                                        </div>
                                    </div>
                                    :''
                            } 
                    </div>
                )
                
              },
            },{
              title: '操作',
              key: 'operation',
              render: (item) => (
                <span>
                  <span 
                  className='marginSpan'
                  onClick={
                    ()=>this.props.history.push({pathname:"patientManager/PatientDetail",state:{id:item.id}})
                  }> <a>详情</a></span>  
                  <a className='marginSpan' onClick={()=>{
                    this.props.history.push({pathname:'/patientManager/addPatient',state:{type:'edit',id:item.id}})
                  }}>编辑</a>
                  <a className='marginSpan' onClick={()=>this.setState({
                      showDelCover:true,
                      id:item.id
                  })}>删除</a>
                  {/* <span className="ant-divider"></span> */}
                </span>
              ),
            }];
          const data = this.state.patientList;
        return(
             <div>         
                <div className='navTop'></div>           
                <div className='nav'>                
                    <span className='med_seven_five_grey'>患者管理</span>
                </div>
                <div>
                {/* 筛选区域*/}
                <div className='dateChoose'>
                    <div className='chooseDayItem clearfix'>
                        <span className='med_six_five_grey floatLeft'>选择分组:</span>                       
                        <div className='floatLeft dayRadio'> 
                            <Select showSearch
                                style={{ width: 200 }}
                                placeholder="全部分组"
                                optionFilterProp="children"
                                notFoundContent="无法找到"
                                onChange={(e)=>this.handleChangeDisease(e)}
                            >
                            <Option value='' key='0'>全部分组</Option>
                            {
                                this.state.diseaseList.map((item)=>{
                                    return( <Option value={item.id+''} key={item.id}>{item.disease_name}</Option>)
                                })
                            }
                            </Select>
                        </div>
                        <div className='floatLeft'>
                            <span className='med_six_five_grey floatLeft'>选择性别:</span>
                            <div className='floatLeft dayRadio'>
                                <Radio.Group defaultValue="" buttonStyle="solid" onChange={(e)=>{
                                    this.handleChangeGender(e)
                                }}>
                                    <Radio.Button value="">全部</Radio.Button>
                                    <Radio.Button value="1">男</Radio.Button>
                                    <Radio.Button value="0">女</Radio.Button>
                                </Radio.Group>
                            </div>
                        </div>
                    </div>
                    <div  className='chooseDayItem clearfix'>
                        <span className='med_six_five_grey floatLeft'>选择社区:</span>                       
                        <div className='floatLeft dayRadio'> 
                        <Select showSearch
                            style={{ width: 200 }}
                            placeholder="请选择社区"
                            optionFilterProp="children"
                            notFoundContent="无法找到"
                            onChange={(e)=>this.handleChangeCommunity(e)}
                        >
                        <Option value='' key='0'>全部社区</Option>
                        {
                            this.state.communityList.map((item)=>{
                                return( <Option value={item.id+''} key={item.id}>{item.community_name}</Option>)
                            })
                        }
                        </Select>
                        </div>        
                        <div className='floatLeft'>
                        <span className='med_six_five_grey floatLeft'>当前警报:</span>                       
                        <div className='floatLeft dayRadio'> 
                            <Select showSearch
                                style={{ width: 200 }}
                                placeholder="全部"
                                optionFilterProp="children"
                                notFoundContent="无法找到"
                                onChange={(e)=>this.handleChangeException(e)}
                            >
                                <Option value='' key='0'>全部异常</Option>
                                <Option value="temperature_abnormal">温度异常</Option>
                                <Option value="blood_pressure_abnormal">血压异常</Option>
                                <Option value="heart_rate_abnormal">心率异常</Option>
                            </Select>
                        </div>   
                        </div>              
                    </div>                   
                </div>
                </div>
                
                {/*列表数据 */}
                <div className='tabContain'>
                    {/* 列表上面操作部分 */}
                    <div className='handleContain clearfix'>
                        <div className='regu_seven_four_grey groupHandle floatLeft'>                            
                            <span  onClick={()=>this.setState({
                                type:1,
                                showCover:true
                            })}>复制到分组</span>
                            <span className="ant-divider"></span> 
                            <span onClick={()=>this.setState({
                                type:2,
                                showCover:true
                            })}>移动到分组</span>
                        </div>
                        <div className='refreshBtn floatLeft'>
                            <img src={require('../../asset/img/refresh.png')} className='refreshIcon'></img>
                            <span className='regu_seven_four_grey'>刷新</span>
                        </div>
                        <div className='floatRight'> 
                            <div className='delBtn floatLeft' onClick={()=>this.setState({
                                showDelCover:true,
                                id:'some'
                            })}>
                                <img src={require('../../asset/img/delete2.png')}></img>
                            </div>
                            <div className='addBtn floatLeft' onClick={()=>{
                                this.props.history.push({pathname:'/patientManager/addPatient',state:{type:'add'}})
                            }}>
                                <span className='med_seven_five_white'>添加</span>
                            </div>
                        </div>
                    </div>
                    {/* 列表数据渲染 */}
                    <div className='pd_patientList'>
                        <Table 
                            rowSelection={rowSelection} 
                            columns={columns}
                            dataSource={data} 
                            pagination={false} 
                            useFixedHeader={true} 
                            rowKey={record => record.id}/>
                    </div>
                   
                    {/* 分组操作弹窗部分 */}
                    {
                        this.state.showCover?
                        <div className='coverView' onClick={()=>this.hideCover()}>
                                <div className='groupCover' onClick={(e)=>{
                                    e.stopPropagation()
                                }}>
                                    <div className='coverTitle'>                                    
                                        <span className='bold_elev_bold_grey'>{this.state.type==2?'移动到分组':'复制到分组'}</span>
                                        <img 
                                            onClick={()=>this.hideCover()}
                                            src={require('../../asset/img/delete.png')} 
                                            className='groupCover_delIcon floatRight'/>
                                    </div>
                                    <div className='pm_groupDisease'>
                                        {this.state.diseaseList.map((item)=>{
                                            return(
                                                <div 
                                                    onClick={()=>this.chooseDiseasegroup(item.id)}
                                                    className='groupSelect med_sixHalf_five_grey' 
                                                    style={item.isSelect?{background:'#DEE1E2'}:{}}>
                                                    {item.disease_name}
                                                    <img src={require('../../asset/img/xuanzhong.png')} className={item.isSelect?'choosedImg floatRight':'hide'}/>
                                                </div>
                                            )
                                        })}   
                                    </div>
                                    <div className='groupHandleBtm'>
                                        <div className='floatRight'>
                                                <div className='cancelBtn med_eight_five_grey floatLeft' onClick={()=>this.hideCover()}>取消</div>
                                                <div className='confirmBtn med_eight_five_white floatRight'>确认</div>
                                        </div>
                                    </div>
                                </div>
                            
                        </div>:''
                    }
                    {/* 删除弹窗*/}
                    {
                        this.state.showDelCover?
                        <div className='coverView' onClick={()=>this.hideCover()}>
                            <div className='groupCover dm_cover' onClick={(e)=>{
                                e.stopPropagation()
                            }}>
                                <div className='coverTitle'>                                    
                                    <span className='bold_elev_bold_grey '>确认删除</span>
                                    <img 
                                    src={require('../../asset/img/delete.png')} 
                                    className='groupCover_delIcon floatRight' 
                                    onClick={()=>this.hideCover()}/>
                                </div>
                                <div>                                   
                                    <span className='dm_deleteTips med_sixHalf_five_grey'>确认要删除患者吗？</span>
                                </div>
                                <div className='groupHandleBtm'>
                                    <div className='floatRight'>
                                            <div className='cancelBtn med_eight_five_grey floatLeft' onClick={()=>this.hideCover()}>取消</div>
                                            <div className='confirmBtn med_eight_five_white floatRight' 
                                            onClick={()=>{this.state.id=='some'?this.delSomePatient():this.delPatient(this.state.id)}}>
                                            确认
                                            </div>
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
module.exports = PatientManager;