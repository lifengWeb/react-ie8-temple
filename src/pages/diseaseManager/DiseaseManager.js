//疾病管理
import React, { Component } from 'react';
const Table = require('antd/lib/table');
require('./diseaseManager.css');
const message = require('antd/lib/message');
const getAxios = require('../../utils/axiosInstance');
// 通过 rowSelection 对象表明需要行选择
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
class DiseaseManager extends Component {
    constructor(props){
        super(props);
        this.state={
            showCover:false,
            type:3,//弹窗的类型 1 添加 2 编辑 3 删除
            diseaseList:[]
        }
    }
    componentDidMount(){
      this.getDiseaseList();
    }
    //获取疾病列表
    getDiseaseList(){
      getAxios('/api/v1/disease','get',{},(res)=>{
        console.log(res);
          this.setState({
            diseaseList:res.data
          })
          
      })
    }
    //编辑病症
    editDisease(id){
      let name = document.getElementById('DiseaseName').value;
      if(!name){
        message.error('请输入分组名称')
      }else{
        getAxios('/api/v1/disease/'+id,'put',{name:name},(res)=>{
            console.log(res)
            message.success('重命名成功')
            this.getDiseaseList();
            this.hideCover();
        })
      }
    }
    //添加病症
    addDisease(){
      let name = document.getElementById('DiseaseName').value;
      if(!name){
          message.error('请输入分组名称')
      }else{
          getAxios('/api/v1/disease','post',{name:name},(res)=>{
            message.success('添加成功')
            this.getDiseaseList();
            this.hideCover();
        })
      }
    }
    //删除病症
    delDisease(id){
        getAxios('/api/v1/disease/'+id,'delete',{},(res)=>{
          message.success('删除成功')
          this.getDiseaseList();
          this.hideCover();
      })
    }
    //删除部分病症
    delSomeDisease(){
      if(selectedRowsArr.length>0){
        selectedRowsArr.map((item)=>{
          this.delDisease(item.id)
        })
        selectedRowsArr = [];
      }else{
        message.error('您还未选择病症分组')
      }
    }
    hideCover(){
      this.setState({
        showCover:false
      })
    }
    
    render(){
        const columns = [{
            title: '编号',
            dataIndex: 'id'           
          }, {
            title: '病症分组名称',
            dataIndex: 'disease_name',
          }, {
            title: '上一次编辑时间',
            dataIndex: 'address',
          },{
              title: '操作',
              key: 'operation',
              render: (item) => (
                <span>
                  <a 
                  className='marginSpan'
                  onClick={()=>this.setState({
                    showCover:true,
                    type:2,
                    id:item.id
                  })}>重命名</a>
                  <a onClick={()=>this.setState({
                    showCover:true,
                    type:3,
                    id:item.id
                  })}>删除</a>
                </span>
              ),
            }];
          const data = this.state.diseaseList;
        return(
            <div>  
                <div className='navTop'></div>              
                <div className='nav'>                
                    <span className='med_seven_five_grey'>病症管理</span>
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
                          id:'some',
                        })}>
                            <img src={require('../../asset/img/delete2.png')}></img>
                        </div>
                        <div className='addBtn floatLeft' onClick={()=>{
                          this.setState({
                            showCover:true,
                            type:1,
                          })
                        }}>
                            <span className='med_seven_five_white'>添加</span>
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
                                    <span className='bold_elev_bold_grey '>{this.state.type==1?'添加新分组':'重命名分组'}</span>
                                    <img 
                                    src={require('../../asset/img/delete.png')} 
                                    className='groupCover_delIcon floatRight'
                                    onClick={()=>this.hideCover()}/>
                                </div>
                                <div>                                   
                                    <input 
                                      id='DiseaseName'
                                      className='groupSelect med_sixHalf_five_grey' 
                                      placeholder={this.state.type==1?'输入分组名称':'输入新名称'}/>
                                </div>
                                <div className='groupHandleBtm'>
                                    <div className='floatRight'>
                                            <div className='cancelBtn med_eight_five_grey floatLeft' onClick={()=>this.hideCover()}>取消</div>
                                            <div className='confirmBtn med_eight_five_white floatRight' 
                                            onClick={()=>{
                                              this.state.type == 1?this.addDisease():this.editDisease(this.state.id);
                                            }}>
                                              确认
                                            </div>
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
                                  <span className='dm_deleteTips med_sixHalf_five_grey'>执行删除后仅删除分组名，不会删除分组内的患者</span>
                              </div>
                              <div className='groupHandleBtm'>
                                  <div className='floatRight'>
                                          <div className='cancelBtn med_eight_five_grey floatLeft' onClick={()=>this.hideCover()}>取消</div>
                                          <div 
                                            className='confirmBtn med_eight_five_white floatRight' 
                                            onClick={()=>{
                                              this.state.id=='some'?this.delSomeDisease():this.delDisease(this.state.id)
                                            }}>
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
module.exports = DiseaseManager;