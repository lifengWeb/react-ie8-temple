//病人管理
import React ,{Component} from 'react';
import { browserHistory } from 'react-router';
require('./patientManager.css');
const getAxios = require('../../utils/axiosInstance');


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

function handleChange(value) {
  console.log(`selected ${value}`);
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

class PatientManager extends Component{
    constructor(props){
        super(props);
        this.state={
            showItem:-1, //显示哪个提醒服务弹窗
            showCover:false,//是否显示操作分组的弹窗
            patientList:[],
            pageNow:1
        }
    }
    componentDidMount(){
        //获取患者列表
        getAxios('/api/v1/patient','get',{},(res)=>{
            console.log(res.data)
            this.setState({
                patientList:res.data
            })
        })
    }
    render(){
        const columns = [{
            title: '姓名',
            dataIndex: 'name',
            width: 150,
            render: text => <a href="#">{text}</a>,
          }, {
            title: '性别',
            width: 150,
            dataIndex: 'gender',
          }, {
            title: '社区',
            width: 150,
            dataIndex: 'community_name',
          },{
              title: '年龄',
              width: 150,
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
              dataIndex: 'disease_name',
              width: 150,
            }, {
              title: '当前警报状态',
              dataIndex: 'age4',
              width: 150,
            }, {
              title: '已设置提醒',
              dataIndex: 'age5',
              width: 150,
              render: (text,record) => {
                  console.log(record);
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
              render: () => (
                <span>
                  <span 
                  className='marginSpan'
                  onClick={
                    ()=>this.props.history.push("patientManager/PatientDetail")
                  }> <a>详情</a></span>  
                  <a href="#" className='marginSpan'>编辑</a>
                  <a href="#" className='marginSpan'>删除</a>
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
                                onChange={()=>this.handleChange}
                            >
                                <Option value="jack">杰克</Option>
                                <Option value="lucy">露西</Option>
                                <Option value="tom">汤姆</Option>
                            </Select>
                        </div>
                        <div className='floatLeft'>
                            <span className='med_six_five_grey floatLeft'>选择性别:</span>
                            <div className='floatLeft dayRadio'>
                                <Radio.Group defaultValue="a" buttonStyle="solid" >
                                    <Radio.Button value="a">全部</Radio.Button>
                                    <Radio.Button value="b">男</Radio.Button>
                                    <Radio.Button value="c">女</Radio.Button>
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
                            onChange={()=>this.handleChange}
                        >
                            <Option value="jack">杰克</Option>
                            <Option value="lucy">露西</Option>
                            <Option value="tom">汤姆</Option>
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
                                onChange={()=>this.handleChange}
                            >
                                <Option value="jack">杰克</Option>
                                <Option value="lucy">露西</Option>
                                <Option value="tom">汤姆</Option>
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
                        <div className='regu_seven_four_grey groupHandle floatLeft' onClick={()=>this.setState({
                            showCover:true
                        })}>                            
                            <span>复制到分组</span>
                            <span className="ant-divider"></span> 
                            <span>移动到分组</span>
                        </div>
                        <div className='refreshBtn floatLeft'>
                            <img src={require('../../asset/img/refresh.png')} className='refreshIcon'></img>
                            <span className='regu_seven_four_grey'>刷新</span>
                        </div>
                        <div className='floatRight'> 
                            <div className='delBtn floatLeft'>
                                <img src={require('../../asset/img/delete2.png')}></img>
                            </div>
                            <div className='addBtn floatLeft' onClick={()=>{
                                browserHistory.push('/patientManager/addPatient')
                            }}>
                                <span className='med_seven_five_white'>添加</span>
                            </div>
                        </div>
                    </div>
                    {/* 列表数据渲染 */}
                    <div className='pd_patientList'>
                        <Table rowSelection={rowSelection} columns={columns} dataSource={data} pagination={false} useFixedHeader={true} />
                    </div>
                   
                    {/* 分组操作弹窗部分 */}
                    {
                        this.state.showCover?
                        <div className='coverView' onClick={()=>this.setState({
                            showCover:false
                        })}>
                                <div className='groupCover' onClick={(e)=>{
                                    e.stopPropagation()
                                }}>
                                    <div className='coverTitle'>                                    
                                        <span className='bold_elev_bold_grey '>复制到分组</span>
                                        <img src={require('../../asset/img/delete.png')} className='groupCover_delIcon floatRight'></img>
                                    </div>
                                    <div>
                                        <div className='groupSelect med_sixHalf_five_grey' style={{background:'#DEE1E2'}}>
                                            低血压
                                            <img src={require('../../asset/img/xuanzhong.png')} className='choosedImg floatRight'></img>
                                        </div>
                                        <div className='groupSelect med_sixHalf_five_grey'>
                                            高血压
                                            <img src={require('../../asset/img/xuanzhong.png')} className='choosedImg floatRight'></img>
                                        </div>
                                        <div className='groupSelect med_sixHalf_five_grey'>
                                            低血糖
                                            <img src={require('../../asset/img/xuanzhong.png')} className='choosedImg floatRight'></img>
                                        </div>
                                    </div>
                                    <div className='groupHandleBtm'>
                                        <div className='floatRight'>
                                                <div className='cancelBtn med_eight_five_grey floatLeft'>取消</div>
                                                <div className='confirmBtn med_eight_five_white floatRight'>确认</div>
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