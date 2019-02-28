
import React from 'react'
import { Router, Route, Link ,browserHistory,IndexRoute,hashHistory} from 'react-router'
const ReactDOM = require('react-dom');

//公用组件（头部，菜单栏）
const Header = require('./component/Layout/Header/Header');
const Sider = require('./component/Layout/Menu/Menu'); 


//页面
const Login = require('./pages/login/Login');

const DataStatistics = require('./pages/dataStatistics/DataStatistics');
const DiseaseManager = require('./pages/diseaseManager/DiseaseManager');
// 随访管理
const FollowUpManager = require('./pages/followUpManager/FollowUpManager');
const FollowUpDetail = require('./pages/followUpManager/FollowUpDetail');
const EnterFollowUpInfo = require('./pages/followUpManager/EnterFollowUpInfo');
//患者管理
const PatientManager = require('./pages/patientManager/PatientManager');
const AddPatient = require('./pages/patientManager/AddPatient');
const PatientDetail = require('./pages/patientManager/PatientDetail');

//提醒管理
const ReminderManager = require('./pages/reminderManager/ReminderManager');
const AddReminder = require('./pages/reminderManager/AddReminder');
const UsingReminder = require('./pages/reminderManager/UsingReminder');

const AdminManager = require('./pages/adminManager/AdminManager');
const CommunityManager = require('./pages/communityManager/CommunityManager');

const style={
  sider:{height:'100%',margin:'1rem 1rem 0 3rem',background:'#fff',width:'10rem',overflow:'hidden',boxSizing:'border-box'},
  rightContain:{
    width:'81rem',
    //height:51rem; //47rem
    height:'47rem',
    // height:'100%',
    padding:'1rem 2rem 2rem 0',
    overflow:'scroll',
    boxSizing:'border-box'
  }
}
const App = React.createClass({
  render() {
    return (
      <div style={{height:'100%',backgroundColor:'#F0F1F2',overflow:'hidden',width:'100%'}} className='clearfix'>
        <Header></Header>
        <div style={{height:'100%',width:'100%',}} className='clearfix'>
          <div style={style.sider} className='floatLeft'>          
            <Sider></Sider>
          </div>      
          <div style={style.rightContain} className='floatLeft'>  
            <div style={{paddingTop:'2rem'}}>
               {this.props.children}   
            </div>
            
          </div>    
        </div>
      </div>
    )
  }
})
const Roots = React.createClass({
  render() {
    return (
            <div style={{height:'100%',width:'100%'}}>
               {this.props.children}   
            </div>
    )
  }
})

//不能用React.render
ReactDOM.render((
  <Router history={browserHistory} routes={
    <Route>
      <Route path="/" component={Roots}>       
        <IndexRoute component={Login}/>
        <Route path="login" component={Login} />
      </Route>
      <Route path="/" component={App}>   
        <Route path='login' component={Login}></Route>
        <Route path='dataStatistics' component={DataStatistics}/>
        <Route path='diseaseManager' component={DiseaseManager}/>
        {/* 随访管理 */}
        <Route path='followUpManager' component={FollowUpManager}/>      
        <Route path='followUpManager/followUpDetail' component={FollowUpDetail}/>      
        <Route path='followUpManager/enterFollowUpInfo' component={EnterFollowUpInfo}/>      
        {/* 患者管理 */}
        <Route path='patientManager' component={PatientManager}/>
        <Route path='patientManager/addPatient' component={AddPatient}/>
        <Route path='patientManager/PatientDetail' component={PatientDetail}/>
      {/* 提醒管理*/}
        <Route path='reminderManager' component={ReminderManager}/>
        <Route path='reminderManager/addReminder' component={AddReminder}/>
        <Route path='reminderManager/usingReminder' component={UsingReminder}/>

        <Route path='adminManager' component={AdminManager}/>
        <Route path='communityManager' component={CommunityManager}/>
      </Route>
    </Route>}>    
  </Router>
), document.getElementById('app'))