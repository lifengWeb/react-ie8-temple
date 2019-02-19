//随访管理
import React ,{Component} from 'react';

const Breadcrumb = require('antd/lib/breadcrumb');
const Radio = require('antd/lib/radio');

const DatePicker = require('antd/lib/date-picker');
const RangePicker = DatePicker.RangePicker;

const Select = require('antd/lib/select');
const Option = Select.Option;

const Table = require('antd/lib/table');
const Pagination = require('antd/lib/pagination');

require('../patientManager/patientManager.css');
require('./followUpManager.css');
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

class FollowUpManager extends Component{
    constructor(props){
        super(props);
        this.state={
            showItem:-1, //显示哪个提醒服务弹窗
            showCover:false,//是否显示操作分组的弹窗
        }
    }
    onChange(value, dateString){
        console.log(value, dateString);
    }
    render(){
        const columns = [{
            title: '编号',
            dataIndex: 'name',
            render: text => <a href="#">{text}</a>,
          }, {
            title: '随访对象名称',
            dataIndex: 'sex',
          }, {
            title: '社区',
            dataIndex: 'address',
          },{
              title: '性别',
              dataIndex: 'age',
            }, {
              title: '年龄',
              dataIndex: 'age1',
            }, {
              title: '证件号码',
              dataIndex: 'age2',
            },{
              title: '随访项目',
              dataIndex: 'age3',
            }, {
              title: '随访时间',
              dataIndex: 'age4',
            }, {
              title: '操作',
              key: 'operation',
              render: () => (
                <span>
                  <a href="#">查看记录</a>                
                </span>
              ),
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
        return(
             <div>                
                <div className='nav'>                
                    <span className='med_seven_five_grey'>随访管理</span>
                </div>
                <div>
                {/* 筛选区域*/}
                <div className='dateChoose'>
                    <div className='chooseDayItem clearfix'>
                        <span className='med_six_five_grey floatLeft'>随访项目:</span>                       
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
                        <span className='med_six_five_grey floatLeft'>随访时间:</span>                       
                        <div className='floatLeft dayRadio'> 
                            <DatePicker onChange={this.onChange} />
                        </div>   
                        </div>              
                    </div>                   
                </div>
                </div>
                {/*列表数据 */}
                <div className='tabContain'>
                  {/*列表数据操作 */}
                    <div className='handleContain clearfix'>
                        <div className='regu_seven_four_grey groupHandle exportBtn floatLeft'>                            
                            导出
                        </div>
                        <div className='refreshBtn floatLeft'>
                            <img src={require('../../asset/img/refresh.png')} className='refreshIcon'></img>
                            <span className='regu_seven_four_grey'>刷新</span>
                        </div>
                        <div className='floatRight'> 
                            <div className='addBtn addBtnFollowUp floatLeft'>
                                <span className='med_seven_five_white'>添加一次随访</span>
                            </div>
                        </div>
                    </div>
                     {/*列表数据渲染 */}
                    <Table rowSelection={rowSelection} columns={columns} dataSource={data} pagination={false}/>   
                    <div style={{margin:'1rem auto',width:'23.5rem'}}>                    
                        <Pagination defaultCurrent={1} size="small" total={50} showSizeChanger showQuickJumper  />
                    </div>              
                </div>
            </div>
        )
    }
    componentDidMount(){
      
    }
}
module.exports = FollowUpManager;