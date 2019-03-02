//管理员管理
import React, { Component } from 'react';
const Table = require('antd/lib/table');
const Tree = require('antd/lib/tree');
const Input = require('antd/lib/input');
const Button = require('antd/lib/button');

const Select = require('antd/lib/select');
const Option = Select.Option;
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

const TreeNode = Tree.TreeNode;
require('./adminManager.css');
const getAxios = require('../../utils/axiosInstance');
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
class AdminManager extends Component {
    constructor(props){
        super(props);
        this.state={
          showCover:false,
          type:3,//弹窗的类型 1 - 添加; 2 - 编辑; 3 - 删除 ; 4 - 患者授权； 5 - 功能授权 
          adminList:[],
          showAuthorizeCover:false,
          showPatientAuthorizeCover:true,
        }
    }
    componentDidMount(){
      this.getAdminList();
    }
    getAdminList(){
       //获取管理员列表
       getAxios('/api/v1/admin','get',{},(res)=>{
        console.log(res.data)
        this.setState({
            adminList:res.data
        })
    })
    }
    //添加管理员
    addAdmin(){
      const {username,name,password} = this.state;
      getAxios('/api/v1/admin','post',{
        username:username,
        truename:name,
        password:password,
        //下面3数据写死的需要修改
        role_id:1,
        phone:'13825241447',
        hospital_id:1,
      },(res)=>{
        console.log(res);    
        this.hideCover();
        this.getAdminList();  
      })
    }
    hideCover(){
      this.setState({
        showCover:false
      })
    }

    onSelect(info) {
      console.log('selected', info);
    }
    onCheck(info) {
      console.log('onCheck', info);
    }
    render(){
        const columns = [{
            title: '编号',
            dataIndex: 'id',
            render: text => <a href="#">{text}</a>,
          }, {
            title: '头像',
            dataIndex: 'sex',
          }, {
            title: '社区',
            dataIndex: 'hospital[name]',
          }, {
            title: '添加时间',
            dataIndex: 'created_at',
          }, {
            title: '类型',
            dataIndex: 'role_id',
            render: role_id => <text>{role_id==3?'医生':(role_id==2?'医院':'超级管理员')}</text>,
          },{
              title: '操作',
              key: 'operation',
              render: () => (
                <span>
                  <a href="#" className='marginSpan'>编辑</a>
                  <a href="#" className='marginSpan'>患者授权</a>
                  <a href="#" className='marginSpan'>功能授权</a>
                  <a href="#" className='marginSpan'>删除</a>
                  {/* <span className="ant-divider"></span> */}
                </span>
              ),
            }];
          const data = this.state.adminList;
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
            const dataCover = [{
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
                    <span className='med_seven_five_grey'>社区管理</span>
                </div>
            
            {/*列表数据 */}
            <div className='tabContain'>
                {/* 列表上面操作部分 */}
                <div className='handleContain clearfix'>
                    <div className='refreshBtn floatLeft'>
                        <img src={require('../../asset/img/refresh.png')} className='refreshIcon'></img>
                        <span className='regu_seven_four_grey'>刷新</span>
                    </div>
                    <div className='floatRight'> 
                        <div className='delBtn floatLeft'>
                            <img src={require('../../asset/img/delete2.png')}></img>
                        </div>
                        <div className='addBtn floatLeft' onClick={()=>{
                            // browserHistory.push('/patientManager/addPatient')
                            // this.props.history.push('/patientManager/addPatient')
                            this.setState({
                              showCover:true
                            })
                        }}>
                            <span className='med_seven_five_white'>添加</span>
                        </div>
                    </div>
                </div>
                {/* 列表数据渲染 */}
                <Table rowSelection={rowSelection} columns={columns} dataSource={data} pagination={false}/>              
                  {/* 操作弹窗部分 */}
                  {
                    this.state.showCover?
                    <div className='coverView' onClick={()=>this.setState({
                        showCover:false
                    })}>
                            <div className='groupCover am_adminCover' onClick={(e)=>{
                                e.stopPropagation()
                            }}>
                                <div className='coverTitle'>                                    
                                    <span className='bold_elev_bold_grey '>编辑管理员</span>
                                    <img src={require('../../asset/img/delete.png')} className='groupCover_delIcon floatRight'></img>
                                </div>
                                <div className='am_adminCoverContain'>   
                                    <div className='am_headImg'></div>
                                    <input 
                                      className='am_inputItem med_sixHalf_five_grey' 
                                      placeholder='输入姓名'
                                      value={this.state.name}
                                      onChange={(e)=>{
                                        this.setState({
                                          name:e.target.value
                                        })
                                      }}/>
                                    <input 
                                      className='am_inputItem med_sixHalf_five_grey'
                                      placeholder='输入账户名'                                      
                                      value={this.state.username}
                                      onChange={(e)=>{
                                        this.setState({
                                          username:e.target.value
                                        })
                                      }}/>
                                    <input 
                                      className='am_inputItem med_sixHalf_five_grey'
                                      placeholder='输入密码'
                                      type='psassword'
                                      value={this.state.password}
                                      onChange={(e)=>{
                                        this.setState({
                                          password:e.target.value
                                        })
                                      }}
                                    />
                                    <select placeholder='请选择社区' className='am_inputItem med_sixHalf_five_grey'>
                                      <option>社区一</option>
                                      <option>社区2</option>
                                      <option>社区3</option>
                                    </select>
                                </div>
                                <div className='groupHandleBtm'>
                                    <div className='floatRight'>
                                            <div className='cancelBtn med_eight_five_grey floatLeft' onClick={()=>this.hideCover()}>取消</div>
                                            <div className='confirmBtn med_eight_five_white floatRight' onClick={()=>this.addAdmin()}>确认</div>
                                    </div>
                                </div>
                            </div>
                        
                    </div>:''
                }
                {/*患者授权弹窗*/}
                {
                  this.state.showPatientAuthorizeCover?
                    <div className='coverView' onClick={()=>this.setState({
                      showPatientAuthorizeCover:false
                    })}>
                    <div className={'groupCover fup_choosePatientCover'} onClick={(e)=>{
                      e.stopPropagation()
                  }}>
                      <div className='coverTitle clearfix' style={{verticalAlign:"middle"}}>                       
                          <span className='bold_elev_bold_grey'>患者已选 <span>3人</span></span>
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
                       <Table rowSelection={rowSelection} columns={columnsCover} dataSource={dataCover} pagination={false}/> 
                      </div>
                      <div className='groupHandleBtm'>
                          <div className='floatRight'>
                                  <div className='cancelBtn med_eight_five_grey floatLeft'>上一步</div>
                                  <div className='confirmBtn med_eight_five_white floatRight'
                                 >确认</div>
                          </div>
                      </div>
                      </div>
                    </div>:''

                }
                  {/*功能授权弹窗*/}
                  {
                    this.state.showAuthorizeCover?
                    <div className='coverView' onClick={()=>this.setState({
                      showAuthorizeCover:false
                    })}>
                    <div className='am_authorizeCover'>
                      <div className='coverTitle'>                                    
                          <span className='bold_elev_bold_grey '>功能授权</span>
                          <img src={require('../../asset/img/delete.png')} className='groupCover_delIcon floatRight'></img>
                      </div>
                      <Tree className="authorizeTree" showLine checkable
                        onSelect={this.onSelect} onCheck={this.onCheck}
                      >
                        <TreeNode title="全部权限" key="all">
                          <TreeNode title="数据统计" key="dataStatistics" >   
                            <TreeNode title="患者管理1" key="patientManager0" >                         
                            </TreeNode>
                            <TreeNode title="患者管理2" key="patientManager1" >                         
                            </TreeNode>         
                          </TreeNode>
                          <TreeNode title="患者管理" key="patientManager" >                         
                          </TreeNode>
                          <TreeNode title="随访管理" key="followUpManager" >                         
                          </TreeNode>
                          <TreeNode title="病症管理" key="diseaseManager" >                         
                          </TreeNode>
                          <TreeNode title="提醒管理" key="reminderManager" >                         
                          </TreeNode>
                          <TreeNode title="社区管理" key="communityManager" >                         
                          </TreeNode>
                          <TreeNode title="管理员管理" key="adminManager">
                            {/*<TreeNode title={<span style={{ color: '#08c' }}>sss</span>} key="0-0-1-0" />*/}
                          </TreeNode>
                        </TreeNode>
                      </Tree>
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
module.exports = AdminManager;