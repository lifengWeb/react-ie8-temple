import React, { Component } from 'react';
require('./addPatient.css');
const message = require('antd/lib/message');
const getAxios = require('../../utils/axiosInstance');
const Radio = require('antd/lib/radio');
const Checkbox = require('antd/lib/checkbox');

const Upload = require('antd/lib/upload');
const Dragger = Upload.Dragger;
const CheckboxGroup = Checkbox.Group;

const Select = require('antd/lib/select');
const Option = Select.Option;
const props = {
    name: 'file',
    showUploadList: false,
    action: '/upload.do',
  };    
const DatePicker = require('antd/lib/date-picker');
class AddPatient extends Component {
    constructor(props){
        super(props);
        this.state={
            diseaseList:[],
            diseaseArrCheck:[],
            sex:0,
            communityList:[],
            community:'',//社区id
            birthday:'',
            saving:false,
            patientInfo:{},
            id:'',
        }
    }
    componentDidMount(){
        const {type,id} = this.props.location.state;
        this.setState({
            type,
            id
        })
        if(id){
            //患者详情
            const {communityList} = this.state
            getAxios('/api/v1/patient/'+id,'get',{},(res)=>{
                console.log(res);
                const patientInfo = res.data;
                let diseaseArrCheck = []
                patientInfo.disease&&patientInfo.disease.map((item)=>{
                    console.log(item)
                    diseaseArrCheck.push(item.id)
                })
                console.log(diseaseArrCheck)
                this.setState({
                    patientInfo:res.data,
                    community:patientInfo.community&&patientInfo.community.id,
                    diseaseArrCheck:diseaseArrCheck,
                    birthday:patientInfo.birthday
                })
                console.log(communityList)
                
            })
           
        }
         //获取疾病分组
         getAxios('/api/v1/disease','get',{},(res)=>{
            res.data.map((item)=>{
                item.label = item.disease_name;
                item.value = item.id;
            })
            this.setState({
                diseaseList:res.data
            })
        })
          //获取社区分组
          getAxios('/api/v1/community','get',{},(res)=>{
            this.setState({
                communityList:res.data
            })
        })
       
    }
    //选择病症分组
    onChangeDisease(e){
        console.log(e);
        this.setState({
            diseaseArrCheck:e
        })
    }
    //选择社区
    handleChange(e){
        console.log(e)
        this.setState({
            community:e
        })
    }
    //选择生日
    onChangeBirthday(e){
        let  d = new Date(e);
        let year = d.getFullYear();
        let month = d.getMonth() + 1 > 9 ? (d.getMonth() + 1) : '0'+ (d.getMonth() + 1)
        let day = d.getDate() > 9 ? d.getDate() : '0' + d.getDate();
        this.setState({
            birthday:year+ '-' + month + '-' + day
        })
    }
    //添加患者
    addPatient(){
        let name = document.getElementById('name').value;
        // let age = document.getElementById('age').value;
        let phone = document.getElementById('phone').value;
        let cardNum = document.getElementById('cardNum').value;//证件号码
        let community =  this.state.community;//社区id
        let diseaseArrCheck = this.state.diseaseArrCheck;//病症分组
        let sex = this.state.sex;
        let birthday = this.state.birthday;
        if(!name){
            message.error('请输入患者姓名')
        }else if(!cardNum||cardNum.length<18){
            message.error('请输入至少18位的身份证号码')
        }else if(!community){
            message.error('请选择社区')
        }else if(!birthday){
            message.error('请选择生日')
        }else if(!phone||!(/^1[3|4|5|8][0-9]\d{8}$/.test(phone))){
            message.error('请填写正确的手机号码')
        }else if(diseaseArrCheck.length==0){
            message.error('请选择病症分组')
        }else{
            this.setState({
                saving:true
            })
            let data = {
                name:name,
                gender:sex,
                phone:phone,
                idcard_number:cardNum,
                community_id:community,
                birthday:birthday,
                disease_ids:diseaseArrCheck
            }
            console.log(data);
            if(this.state.type == 'add'){
                getAxios('/api/v1/patient','post',data,(res)=>{
                    console.log(res)
                    this.setState({
                        saving:false
                    })
                    message.success('添加成功')
                },()=>{
                    this.setState({
                        saving:false
                    })
                    message.success('添加失败')
                })
            }else{
                const id = this.state.id
                getAxios('/api/v1/patient/'+id,'patch',data,(res)=>{
                    this.setState({
                        saving:false
                    })
                    message.success('编辑成功')
                },()=>{
                    this.setState({
                        saving:false
                    })
                    message.success('编辑失败')
                })
            }
        }
        
    }
    render(){
        const {type,patientInfo,name} = this.state
        return(
            <div>
                <div className='navTop'></div>
                <div className='nav'>                
                    <span className='med_seven_five_grey'>患者管理 > {type == 'add'?'添加患者':'编辑患者'}</span>
                </div>               
                <div className='addPatientContain'>
                     {/* 头部操作 */}
                    <div className='containHandle clearfix'>
                        <span className='regu_seven_four_grey leftTitle'>{type == 'add'?'录入新患者信息':'编辑患者信息'}</span>
                        <div className='floatRight btnContain'>
                            <div className='cancelBtn floatLeft med_seven_five_grey'>取消</div>
                            <div className='confirmBtn floatLeft med_seven_five_white' onClick={()=>{
                                this.state.saving == false?this.addPatient():null}}>{this.state.saving==false?'保存':'保存中'}</div>
                        </div>
                    </div>
                    {/* 基本信息 */}
                    <div className='patientInfoContain clearfix'>
                        {/* 左边信息部分 */}
                        <div className='basicInfoContain floatLeft'>
                            <div className='basicInfo'>
                                <div className='basicInfoTitle'>
                                    <div className='blueTitleMark floatLeft'></div>
                                    <span className='reg_ten_four_Black'>基本信息</span>
                                </div>
                                <div className='basicInfoItem'>
                                    <div className='med_sixHalf_five_Black infoLable'>患者姓名:</div>
                                    <div>
                                        {
                                            type == 'add'?
                                            <input placeholder='填写患者姓名' className='regu_sixHalf_four_grey nameInfo' id='name'/>:
                                            <input placeholder='填写患者姓名' className='regu_sixHalf_four_grey nameInfo' id='name'
                                             value={patientInfo.name} 
                                             onChange={(e)=> {
                                                patientInfo.name = e.target.value;
                                                this.setState({
                                                     patientInfo
                                                })
                                            }}/>
                                        }
                                    </div>
                                </div>
                                <div className='basicInfoItem clearfix'>
                                    <div className='floatLeft'>
                                        <div className='med_sixHalf_five_Black floatLeft infoLable'>选择性别：</div>
                                        <div className='magrRight'>
                                            <Radio.Group defaultValue="0" buttonStyle="solid" onChange={(e)=>this.setState({
                                                sex:e.target.value
                                            })}>
                                                <Radio.Button value="2">其他</Radio.Button>
                                                <Radio.Button value="1">男</Radio.Button>
                                                <Radio.Button value="0">女</Radio.Button>                                              
                                            </Radio.Group>
                                        </div>
                                    </div>
                                    <div className='floatLeft'> 
                                        <div className='med_sixHalf_five_Black floatLeft infoLable'>证件号码</div>
                                        <div>
                                        {
                                            type == 'add'?
                                            <input placeholder='填写患者证件号码' className='cardInfo regu_sixHalf_four_grey' id='cardNum'/>:
                                            <input placeholder='填写患者证件号码' 
                                            className='cardInfo regu_sixHalf_four_grey'
                                            id='cardNum' 
                                            value={patientInfo.idcard_number} 
                                            onChange={(e)=> {
                                               patientInfo.idcard_number = e.target.value;
                                               this.setState({
                                                    patientInfo
                                               })
                                           }}/>
                                        }
                                        </div>
                                    </div>
                                    
                                </div>
                                <div className='basicInfoItem clearfix'>
                                    <div className='floatLeft'>
                                        <div className='med_sixHalf_five_Black infoLable'>联系方式：</div>
                                        <div className='magrRight'>
                                            {
                                                type == 'add'?
                                                <input placeholder='填写患者联系方式' className='regu_sixHalf_four_grey ageInfo' id='phone'/>:
                                                <input placeholder='填写患者联系方式' className='regu_sixHalf_four_grey ageInfo' id='phone'
                                                value={patientInfo.phone} 
                                                onChange={(e)=> {
                                                    patientInfo.phone = e.target.value;
                                                    this.setState({
                                                         patientInfo
                                                    })
                                                }}/>
                                            }
                                        </div>
                                    </div>
                                    <div className='floatLeft'>
                                        <div className='med_sixHalf_five_Black infoLable'>生日：</div>
                                        <div className='magrRight'>
                                            <DatePicker onChange={(e)=>this.onChangeBirthday(e)} value={this.state.birthday}/>
                                        </div>
                                    </div>
                                    <div className='floatLeft'>
                                        <div className='med_sixHalf_five_Black infoLable'>社区</div>
                                        <div className='magrRight'>
                                            {/*<input placeholder='填写患者所在社区' className='regu_sixHalf_four_grey socityInfo' id='community'></input>*/}
                                                <Select showSearch
                                                    style={{ width: 200 }}
                                                    placeholder="请选择社区"
                                                    optionFilterProp="children"
                                                    notFoundContent="无法找到"
                                                    value={this.state.community-0}
                                                    onChange={(e)=>this.handleChange(e)}
                                                >
                                                {
                                                    this.state.communityList.map((item)=>{
                                                        return( <Option value={item.id} key={item.id}>{item.community_name}</Option>)
                                                    })
                                                }
                                                </Select>
                                        </div>
                                    </div>
                                   
                                   
                                </div>
                                <div className='basicInfoItem clearfix'>
                                    <div>
                                        <div className='med_sixHalf_five_Black infoLable' style={{marginBottom:'1rem'}}>病症分组：</div>
                                        <div>
                                            <CheckboxGroup options={this.state.diseaseList} onChange={(e)=>this.onChangeDisease(e)} value={this.state.diseaseArrCheck}/> 
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* 手环信息 */}
                            <div className='devInfo'>
                                <div className='basicInfoTitle'>
                                    <div className='blueTitleMark floatLeft'></div>
                                    <span className='reg_ten_four_Black'>配置手环(请将手环对准扫描仪。。。)</span>
                                </div>
                                <div className='bindDev med_sixHalf_five_grey'>
                                    点击添加手环
                                </div>
                            </div>
                            <div className='configInfo'>
                                <div className='basicInfoTitle'>
                                    <div className='blueTitleMark floatLeft'></div>
                                    <span className='reg_ten_four_Black'>备注信息</span>
                                </div>
                                <div className='med_sixHalf_five_grey'>
                                    <textarea className='extralArea'  placeholder="填写备注信息">                                 
                                    </textarea>
                                </div>
                            </div>
                        </div>
                        {/* 右边上传部分 */}
                        <div className='uploadContain floatRight'>
                            <div className='med_seven_five_Black'>
                                上传附件
                            </div>
                            <div className='upaloadArea'>
                                <Dragger {...props}>
                                    <img src={require('../../asset/img/uploadIcon.png')} className='uploadIcon'></img>
                                    <div className='uploadMargin'><span className='med_seven_five_Black '>点击上传附件</span></div>
                                    <span className='regu_six_four_grey'>附件格式支持.jpg .pdf word excel</span>
                                </Dragger>
                            </div>
                            <div className='fileItem clearfix'>
                                <span className='med_six_five_Black floatLeft'>患者病历.pdf</span>
                                <span className='med_six_five_Black floatRight' style={{color:'#0295D2'}}>删除</span>
                            </div>
                            <div className='fileItem clearfix'>
                                <span className='med_six_five_Black floatLeft'>患者病历.pdf</span>
                                <span className='med_six_five_Black floatRight' style={{color:'rgba(134,138,144,1)'}}>上传中(65%)</span>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        )
    }
}
module.exports = AddPatient;