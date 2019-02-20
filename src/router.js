
import React from 'react'
import { Router, Route, Link ,browserHistory,IndexRoute,hashHistory} from 'react-router'
const ReactDOM = require('react-dom');

//公用组件（头部，菜单栏）
const Header = require('./component/Layout/Header/Header');
const Sider = require('./component/Layout/Menu/Menu'); 

//页面
const DataStatistics = require('./pages/dataStatistics/DataStatistics');
const DiseaseManager = require('./pages/diseaseManager/DiseaseManager');
const FollowUpManager = require('./pages/followUpManager/FollowUpManager');

const PatientManager = require('./pages/patientManager/PatientManager');
const AddPatient = require('./pages/patientManager/AddPatient');
const PatientDetail = require('./pages/patientManager/PatientDetail');


const ReminderManager = require('./pages/reminderManager/ReminderManager');
const AdminManager = require('./pages/adminManager/AdminManager');
const CommunityManager = require('./pages/communityManager/CommunityManager');

const style={
  sider:{height:'100%',margin:'1rem 1rem 0 3rem',background:'#fff',width:'10rem',overflow:'hidden'},
  rightContain:{
    width:'81rem',
    height:'100%',
    padding:'1rem 2rem 2rem 0',
    overflow:'scroll',
  }
}
const App = React.createClass({
  render() {
    return (
      <div style={{height:'100%',backgroundColor:'#F0F1F2',overflow:'hidden',width:'100%'}} className='clearfix'>
        <Header></Header>
        <div style={{height:'100%',width:'100%'}} className='clearfix'>
          <div style={style.sider} className='floatLeft'>          
            <Sider></Sider>
          </div>      
          <div style={style.rightContain} className='floatLeft'>  
            {this.props.children}   
          </div>    
        </div>
      </div>
    )
  }
})

//不能用React.render
ReactDOM.render((
  <Router history={browserHistory} routes={
    <Route path="/" component={App}>
      <IndexRoute component={DataStatistics}/>
      <Route path='dataStatistics' component={DataStatistics}/>
      <Route path='diseaseManager' component={DiseaseManager}/>
      <Route path='followUpManager' component={FollowUpManager}/>
      {/* 患者管理 */}
      <Route path='patientManager' component={PatientManager}/>
      <Route path='patientManager/addPatient' component={AddPatient}/>
      <Route path='patientManager/PatientDetail' component={PatientDetail}/>

      <Route path='reminderManager' component={ReminderManager}/>
      <Route path='adminManager' component={AdminManager}/>
      <Route path='communityManager' component={CommunityManager}/>
    </Route>
  }>    
  </Router>
), document.getElementById('app'))