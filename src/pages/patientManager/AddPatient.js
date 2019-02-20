import React, { Component } from 'react';
require('./addPatient.css');

const Radio = require('antd/lib/radio');
const Checkbox = require('antd/lib/checkbox');

const Upload = require('antd/lib/upload');
const Dragger = Upload.Dragger;
const CheckboxGroup = Checkbox.Group;
const options = [
    { label: '苹果', value: 'Apple' },
    { label: '梨', value: 'Pear' },
    { label: '橘', value: 'Orange' },
  ];
const props = {
    name: 'file',
    showUploadList: false,
    action: '/upload.do',
  };      
function onChange(checkedValues) {
    console.log('checked = ', checkedValues);
}
class AddPatient extends Component {
    constructor(props){
        super(props);
        this.state={

        }
    }
    render(){
        return(
            <div>
                <div className='nav'>                
                    <span className='med_seven_five_grey'>患者管理 > 添加患者</span>
                </div>               
                <div className='addPatientContain'>
                     {/* 头部操作 */}
                    <div className='containHandle clearfix'>
                        <span className='regu_seven_four_grey leftTitle'>录入新患者信息</span>
                        <div className='floatRight btnContain'>
                            <div className='cancelBtn floatLeft med_seven_five_grey'>取消</div>
                            <div className='confirmBtn floatLeft med_seven_five_white'>确认</div>
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
                                        <input placeholder='填写患者姓名' className='regu_sixHalf_four_grey nameInfo'></input>
                                    </div>
                                </div>
                                <div className='basicInfoItem clearfix'>
                                    <div className='floatLeft'>
                                        <div className='med_sixHalf_five_Black floatLeft infoLable'>选择性别：</div>
                                        <div className='magrRight'>
                                            <Radio.Group defaultValue="a" buttonStyle="solid" >
                                                <Radio.Button value="a">今日</Radio.Button>
                                                <Radio.Button value="b">本周</Radio.Button>
                                                <Radio.Button value="c">本月</Radio.Button>
                                            </Radio.Group>
                                        </div>
                                    </div>
                                    <div className='floatLeft'> 
                                        <div className='med_sixHalf_five_Black floatLeft infoLable'>证件号码</div>
                                        <div>
                                            <input placeholder='填写患者证件号码' className='cardInfo regu_sixHalf_four_grey'></input>
                                        </div>
                                    </div>
                                    
                                </div>
                                <div className='basicInfoItem clearfix'>
                                    <div className='floatLeft'>
                                        <div className='med_sixHalf_five_Black infoLable'>年龄：</div>
                                        <div className='magrRight'>
                                            <input placeholder='填写患者年龄' className='regu_sixHalf_four_grey ageInfo'></input>
                                        </div>
                                    </div>
                                    <div className='floatLeft'>
                                        <div className='med_sixHalf_five_Black infoLable'>社区</div>
                                        <div className='magrRight'>
                                            <input placeholder='填写患者所在社区' className='regu_sixHalf_four_grey socityInfo'></input>
                                        </div>
                                    </div>
                                    <div className='floatLeft'>
                                        <div className='med_sixHalf_five_Black infoLable'>联系方式：</div>
                                        <div>
                                            <input placeholder='填写患者联系方式' className='regu_sixHalf_four_grey ageInfo'></input>
                                        </div>
                                    </div>
                                   
                                </div>
                                <div className='basicInfoItem clearfix'>
                                    <div>
                                        <div className='med_sixHalf_five_Black infoLable' style={{marginBottom:'1rem'}}>病症分组：</div>
                                        <div>
                                            <CheckboxGroup options={options} defaultValue={['Pear']} onChange={onChange} /> 
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