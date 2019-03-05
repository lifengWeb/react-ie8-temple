//随访管理
import React ,{Component} from 'react';
import { browserHistory } from 'react-router';
const getAxios = require('../../utils/axiosInstance');
const Breadcrumb = require('antd/lib/breadcrumb');
const Radio = require('antd/lib/radio');

const DatePicker = require('antd/lib/date-picker');
const RangePicker = DatePicker.RangePicker;

const Select = require('antd/lib/select');
const Option = Select.Option;

const Table = require('antd/lib/table');
const Pagination = require('antd/lib/pagination');

import { Menu, Dropdown } from 'antd';

const menu = (
  <Menu>
    <Menu.Item key="0">
      高血压患者随访服务记录表
    </Menu.Item>
    <Menu.Divider />
    <Menu.Item key="1">2型糖尿病患者随访服务记录表</Menu.Item>
  </Menu>
);




//弹窗搜索框
import { Input,Button} from 'antd';
import classNames from 'classnames';
const InputGroup = Input.Group;
const SearchInput = React.createClass({
  getInitialState() {
    return {
      value: '',
      focus: false,
    };
  },
  handleInputChange(e) {
    this.setState({
      value: e.target.value,
    });
  },
  handleFocusBlur(e) {
    this.setState({
      focus: e.target === document.activeElement,
    });
  },
  handleSearch() {
    if (this.props.onSearch) {
      this.props.onSearch(this.state.value);
    }
  },
  render() {
    const { style, size, placeholder } = this.props;
    const btnCls = classNames({
      'ant-search-btn': true,
      'ant-search-btn-noempty': !!this.state.value.trim(),
    });
    const searchCls = classNames({
      'ant-search-input': true,
      'ant-search-input-focus': this.state.focus,
    });
    return (
      <div className="ant-search-input-wrapper" style={style}>
        <InputGroup className={searchCls}>
          <Input placeholder={placeholder} value={this.state.value} onChange={this.handleInputChange}
            onFocus={this.handleFocusBlur} onBlur={this.handleFocusBlur} onPressEnter={this.handleSearch}
          />
          <div className="ant-input-group-wrap">
            <Button icon="search" className={btnCls} size={size} onClick={this.handleSearch} />
          </div>
        </InputGroup>
      </div>
    );
  },
});

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
    componentDidMount(){
      getAxios('/api/v1/followup','get',{},(res)=>{
        console.log(res)
      })
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
                <span onClick={()=> browserHistory.push('/followUpManager/followUpDetail')}>
                  <a>查看记录</a>                
                </span>
              ),
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
        return(
             <div>         
                <div className='navTop'></div>       
                <div className='nav'>                
                    <span className='med_seven_five_grey'>随访管理</span>
                    <Dropdown overlay={menu} trigger={['click']}>
                    <span className="ant-dropdown-link floatRight">
                      查看我的随访表单
                      <img src={require('../../asset/img/close.png')} className='dropDownIcon'/>
                    </span>
                  </Dropdown>
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
                            <div className='addBtn addBtnFollowUp floatLeft' onClick={()=>this.setState({
                              showOneStep:true,
                              showCover:true,
                            })}>
                                <span className='med_seven_five_white'>添加一次随访</span>
                            </div>
                        </div>
                    </div>
                    {/* 添加随访弹窗 */}
                    {
                      this.state.showCover?
                    <div className='coverView' onClick={()=>this.setState({
                            showCover:false
                        })}>
                        {/* 第一步操作弹窗 */}
                                <div className={this.state.showOneStep?'groupCover':'hide'} onClick={(e)=>{
                                    e.stopPropagation();
                                }}>
                                    <div className='coverTitle clearfix' style={{verticalAlign:"middle"}}>    
                                        <span className='fup_raduisGrey'>1</span>                                
                                        <span className='bold_elev_bold_grey'>选择要使用的随访表单</span>
                                        <span className='gerycolor'> － </span>
                                        <span className='bold_elev_bold_grey gerycolor'>2</span>
                                        <span className='bold_elev_bold_grey gerycolor'> 选择要随访的对象</span>
                                        <img src={require('../../asset/img/delete.png')} className='groupCover_delIcon floatRight'></img>
                                    </div>
                                    <div>
                                        <div className='groupSelect med_sixHalf_five_DarkBlack' style={{background:'#DEE1E2'}}>
                                            低血压
                                            <img src={require('../../asset/img/xuanzhong.png')} className='choosedImg floatRight'></img>
                                        </div>
                                        <div className='groupSelect med_sixHalf_five_DarkBlack'>
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
                                                <div className='cancelBtn med_eight_five_grey floatLeft' onClick={()=>this.setState({
                                                  showOneStep:false,
                                                  showCover:false
                                                })}>取消</div>
                                                <div className='confirmBtn med_eight_five_white floatRight' onClick={()=>this.setState({
                                                  showOneStep:false,
                                                  showTwoStep:true,
                                                })}>确认</div>
                                        </div>
                                    </div>
                                </div>
                                {/* 第二步操作弹窗 */}
                                <div className={this.state.showTwoStep?'groupCover fup_choosePatientCover':'hide'} onClick={(e)=>{
                                    e.stopPropagation()
                                }}>
                                    <div className='coverTitle clearfix' style={{verticalAlign:"middle"}}>    
                                        <span className='fup_raduisGrey'>1</span>                                
                                        <span className='bold_elev_bold_grey'>选择要使用的随访表单</span>
                                        <span > － </span>
                                        <span className='bold_elev_bold_grey'>2</span>
                                        <span className='bold_elev_bold_grey'> 选择要随访的对象</span>
                                        <img src={require('../../asset/img/delete.png')} className='groupCover_delIcon floatRight'></img>
                                    </div>
                                    <div className='chooseDayItem clearfix'>
                                        <span className='med_six_five_grey floatLeft'>病症分组:</span>
                                        <div className='floatLeft dayRadio'> 
                                          <Select showSearch
                                              style={{ width: 200 }}
                                              placeholder="请选择病症分组"
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
                                        <div className='floatRight'>
                                          <SearchInput placeholder="搜索"
                                            onSearch={value => console.log(value)} style={{ width: 200 }}
                                          />
                                        </div>
                                    </div>
                                    <div>
                                     <Table rowSelection={rowSelection} columns={columnsCover} dataSource={data} pagination={false}/> 
                                    </div>
                                    <div className='groupHandleBtm'>
                                        <div className='floatRight'>
                                                <div className='cancelBtn med_eight_five_grey floatLeft'onClick={()=>this.setState({
                                                  showOneStep:true,
                                                  showTwoStep:false,
                                                })}>上一步</div>
                                                <div className='confirmBtn med_eight_five_white floatRight'
                                                onClick={()=>{this.setState({
                                                  showOneStep:false,
                                                  showTwoStep:false,
                                                  showCover:false
                                                });
                                                browserHistory.push('/followUpManager/enterFollowUpInfo')
                                                // window.location.href = '/followUpManager/enterFollowUpInfo';
                                                }}>开始填写</div>
                                        </div>
                                    </div>
                                </div>                            
                        </div>:''
                        
                    }
                     {/*列表数据渲染 */}
                    <Table rowSelection={rowSelection} columns={columns} dataSource={data} pagination={false}/>   
                    <div style={{margin:'1rem auto',width:'23.5rem'}}>                    
                        <Pagination defaultCurrent={1} size="small" total={50} showSizeChanger showQuickJumper  />
                    </div>              
                </div>
            </div>
        )
    }
}
module.exports = FollowUpManager;