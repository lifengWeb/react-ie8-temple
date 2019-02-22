//社区管理
import React, { Component } from 'react';
const Table = require('antd/lib/table');
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
class CommunityManager extends Component {
    constructor(props){
        super(props);
        this.state={

        }
    }
    
    render(){
        const columns = [{
            title: '编号',
            dataIndex: 'name',
            render: text => <a href="#">{text}</a>,
          }, {
            title: '社区名称',
            dataIndex: 'sex',
          }, {
            title: '上一次编辑时间',
            dataIndex: 'address',
          },{
              title: '操作',
              key: 'operation',
              render: () => (
                <span>
                  <a href="#">重命名</a>
                  <a href="#">删除</a>
                  {/* <span className="ant-divider"></span> */}
                </span>
              ),
            }];
          const data = [{
            name: '胡彦斌',
            sex:'男',
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
                            browserHistory.push('/patientManager/addPatient')
                        }}>
                            <span className='med_seven_five_white'>添加</span>
                        </div>
                    </div>
                </div>
                {/* 列表数据渲染 */}
                <Table rowSelection={rowSelection} columns={columns} dataSource={data} pagination={false}/>              
                 {/* 分组操作弹窗部分 */}
                 {
                    this.state.showCover?
                    <div className='coverView' onClick={()=>this.setState({
                        showCover:false
                    })}>
                            <div className='groupCover dm_cover' onClick={(e)=>{
                                e.stopPropagation()
                            }}>
                                <div className='coverTitle'>                                    
                                    <span className='bold_elev_bold_grey '>添加新分组</span>
                                    <img src={require('../../asset/img/delete.png')} className='groupCover_delIcon floatRight'></img>
                                </div>
                                <div>                                   
                                    <input className='groupSelect med_sixHalf_five_grey' placeholder='输入新名称'/>
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
module.exports = CommunityManager;