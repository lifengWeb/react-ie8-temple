const Menu = require('antd/lib/menu');
// import {Menu} from 'antd'; antd不能使用该种方式引入组件
import {Link} from 'react-router';
import React from 'react';

require('./menu.css');
const choosedBack = {background:'linear-gradient(90deg,rgba(3,211,216,1),rgba(2,169,210,1))'};//选中背景颜色

const menuArr = [
  {name:'数据统计',key:'dataStatistics',url:'',img:require('../../../asset/img/siderbar01.png'),choosedImg:require('../../../asset/img/siderbar02.png')},
  {name:'患者管理',key:'patientManager',url:'',img:require('../../../asset/img/guanli.png'),choosedImg:require('../../../asset/img/guanli02.png')},
  {name:'随访管理',key:'followUpManager',url:'',img:require('../../../asset/img/suifang.png'),choosedImg:require('../../../asset/img/suifang02.png')},
  {name:'提醒管理',key:'reminderManager',url:'',img:require('../../../asset/img/tixing.png'),choosedImg:require('../../../asset/img/tixing02.png')},
  {name:'病症管理',key:'diseaseManager',url:'',img:require('../../../asset/img/jibing.png'),choosedImg:require('../../../asset/img/jibing02.png')},
  {name:'社区管理',key:'communityManager',url:'',img:require('../../../asset/img/community.png'),choosedImg:require('../../../asset/img/community02.png')},
  {name:'管理员管理',key:'adminManager',url:'',img:require('../../../asset/img/cengji.png'),choosedImg:require('../../../asset/img/cengji02.png')},

]
const Sider = React.createClass({
  getInitialState() {
    return {
      current:'dataStatistics'
    };
  },
  handleClick(e) {
    this.setState({
      current: e.key,
    });
  },
  componentDidMount(){
    const href = window.location.href;
    let key = href.split('/')[3];
    if(key){
      this.setState({
        current:key
      })
    }    
  },
  render() {
    const {current} = this.state;   
    return (
      <div style={{height:'100%'}}>      
        <Menu
          onClick={this.handleClick}
          style={{ width: '10rem' }}
          defaultOpenKeys={['dataStatistics']}
          selectedKeys={[this.state.current]}
          mode="vertical"
        >        
       {menuArr.map((item,index)=>{
         return(
          <Menu.Item key={item.key} style={current==item.key?choosedBack:{}} className='menuItem'>   
          <Link to={'/'+item.key}>     
            <img src={current!==item.key?item.img:item.choosedImg} className='menuIcon'/>         
            <span style={current==item.key?{color:'#fff'}:{}}>{item.name}</span>    
          </Link>   
        </Menu.Item>
         )
        })}
        </Menu>
      </div>
    );
  },
});
module.exports = Sider