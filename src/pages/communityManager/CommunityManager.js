//社区管理
import React, { Component } from 'react';
const Table = require('antd/lib/table');
const message = require('antd/lib/message');
// 通过 rowSelection 对象表明需要行选择
const getAxios = require('../../utils/axiosInstance');
//表格选中的
let selectedRowsArr = [];
const rowSelection = {
    onChange(selectedRowKeys, selectedRows) {
      console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
      selectedRowsArr = selectedRows;
    },
    onSelect(record, selected, selectedRows) {
      console.log(record, selected, selectedRows);
    },
    onSelectAll(selected, selectedRows, changeRows) {
      console.log(selected, selectedRows, changeRows);
    },
  };
class CommunityManager extends Component {
    constructor(props){
        super(props);
        this.state={
          showCover:false,
          type:3,//弹窗的类型 1 - 添加; 2 - 编辑; 3 - 删除;
          communityList:[],
          id:'',//社区id
          selectedRows:[],//选中的社区
        }
    }
    componentDidMount(){
       this.getCommunityList();
    }
     //获取社区列表
    getCommunityList(){
      getAxios('/api/v1/community','get',{},(res)=>{
          this.setState({
            community:res.data
          })
         
      })
    }
    //添加社区
    addCommunity(){
        let name = document.getElementById('communityName').value;
        if(!name){
            message.error('请输入名称')
        }else{
            getAxios('/api/v1/community','post',{name:name},(res)=>{
                this.setState({
                  showCover:false
                })
                message.success('添加成功')   
                this.getCommunityList();       
          })
        }
    }
    //编辑社区
    editCommunity(){
      let name = document.getElementById('communityName').value;
      const {id} = this.state;
      if(!name){
        message.error('请输入名称')
      }else{
        getAxios('/api/v1/community/'+id,'patch',{name:name},(res)=>{        
            this.setState({
              showCover:false
            })
            message.success('重命名成功')       
            this.getCommunityList(); 
        })
      }
    }
    //删除某个社区
    delCommunity(id){
      // const {id} = this.state;
      getAxios('/api/v1/community/'+id,'delete',{},(res)=>{        
          this.setState({
            showCover:false
          })
          message.success('删除成功')       
          this.getCommunityList(); 
      })
    }
    //删除某些社区
    delSomeCommunity(){      
      if(selectedRowsArr.length>0){
        selectedRowsArr.map((item)=>{
          this.delCommunity(item.id)
        })
        selectedRowsArr = [];
      }else{
        message.error('您还未选择社区')
      }
    }
    hideCover(){
      this.setState({
        showCover:false
      })
    }
    onChange(selectedRowKeys, selectedRows){
      console.log(selectedRows);
    }
   
    render(){
        const columns = [{
            title: '编号',
            dataIndex: 'id'
          }, {
            title: '社区名称',
            dataIndex: 'community_name',
          }, {
            title: '上一次编辑时间',
            dataIndex: 'address',
          },{
              title: '操作',
              key: 'operation',
              render: (text) => (
                <span>
                  <a className='marginSpan' onClick={()=>this.setState({
                    showCover:true,
                    type:2,
                    id:text.id
                  })}>重命名</a>
                  <a className='marginSpan' onClick={()=>this.setState({
                    showCover:true,
                    type:3,
                    id:text.id
                  })}>删除</a>
                </span>
              ),
            }];
          const data = this.state.community;
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
                        <div className='delBtn floatLeft' onClick={()=>this.setState({
                          showCover:true,
                          type:3,
                          id:'some'
                        })}>
                            <img src={require('../../asset/img/delete2.png')}></img>
                        </div>
                        <div className='addBtn floatLeft'>
                            <span className='med_seven_five_white' onClick={()=>this.setState({
                              showCover:true,
                              type:1
                            })}>添加</span>
                        </div>
                    </div>
                </div>
                {/* 列表数据渲染 */}
                <Table
                  rowSelection={rowSelection}
                  columns={columns}
                  dataSource={data} 
                  pagination={false} 
                  useFixedHeader={true}
                  rowKey={record => record.id}/>              
                 {/* 分组操作弹窗部分 */}
                 {
                  this.state.showCover?
                  <div className='coverView' onClick={()=>this.hideCover()}>
                          {this.state.type!=3?                              
                            <div className='groupCover dm_cover' onClick={(e)=>{
                              e.stopPropagation()
                          }}>
                              <div className='coverTitle'>                                    
                                  <span className='bold_elev_bold_grey '>
                                    {this.state.type==1?'添加新社区':'重命名社区'}
                                  </span>
                                  <img 
                                    src={require('../../asset/img/delete.png')} 
                                    className='groupCover_delIcon floatRight'
                                    onClick={()=>this.hideCover()}/>
                              </div>
                              <div>                                   
                                  <input 
                                    className='groupSelect med_sixHalf_five_grey' 
                                    placeholder={this.state.type==1?'输入社区名称':'输入新名称'} 
                                    id='communityName'/>
                              </div>
                              <div className='groupHandleBtm'>
                                  <div className='floatRight'>
                                          <div className='cancelBtn med_eight_five_grey floatLeft' onClick={()=>this.hideCover()}>取消</div>
                                          <div className='confirmBtn med_eight_five_white floatRight' 
                                            onClick={()=>{
                                             this.state.type==1?this.addCommunity():this.editCommunity();
                                          }}>确认</div>
                                  </div>
                              </div>
                          </div>: <div className='groupCover dm_cover' onClick={(e)=>{
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
                                <span className='dm_deleteTips med_sixHalf_five_grey'>确认要删除社区吗？</span>
                            </div>
                            <div className='groupHandleBtm'>
                                <div className='floatRight'>
                                        <div className='cancelBtn med_eight_five_grey floatLeft' onClick={()=>this.hideCover()}>取消</div>
                                        <div className='confirmBtn med_eight_five_white floatRight' 
                                          onClick={()=>{this.state.id=='some'?this.delSomeCommunity():this.delCommunity(this.state.id)}}>
                                          确认
                                        </div>
                                </div>
                            </div>
                        </div>}
                      
                  </div>:''
              }
            </div>
        </div>
        )
    }
}
module.exports = CommunityManager;