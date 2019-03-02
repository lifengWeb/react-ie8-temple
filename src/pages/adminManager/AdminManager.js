//管理员管理
import React, { Component } from 'react';
const Table = require('antd/lib/table');
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

                }
            </div>
        </div>
        )
    }
}
module.exports = AdminManager;