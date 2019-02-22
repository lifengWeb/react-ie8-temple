import React, { Component } from 'react';
require('../patientManager/addPatient.css');
require('./addReminder.css');
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
class AddReminder extends Component {
    constructor(props){
        super(props);
        this.state={

        }
    }
    render(){
        return(
            <div>
                <div className='navTop'></div>
                <div className='nav'>                
                    <span className='med_seven_five_grey'>提醒管理 > 配置新提醒</span>
                </div>               
                <div className='ar_Contain'>
                     {/* 头部操作 */}
                    <div className='ar_ContainTitle clearfix'>
                        <span className='regu_seven_four_grey leftTitle'>配置消息提醒内容</span>
                        <div className='floatRight '>
                            <div className='ar_cancelBtn floatLeft med_seven_five_grey'>取消</div>
                            <div className='ar_confirmBtn floatLeft med_seven_five_white'>确认</div>
                        </div>
                    </div>
                    <div className="ar_leftRule floatLeft">
                        <div>
                            <div className='blueTitleMark floatLeft'></div>
                            <span className='reg_ten_four_Black'>基本信息</span>
                        </div>
                        <div>                        
                            <Radio.Group defaultValue="a" buttonStyle="solid" >
                                <Radio.Button value="a">手环检测异常</Radio.Button>
                                <Radio.Button value="b">服药通知</Radio.Button>
                                <Radio.Button value="c">随访通知</Radio.Button>
                            </Radio.Group>
                        </div>
                    </div>
                    <div className="ar_rightPatient floatLeft">
                    </div>
                    
                </div>

            </div>
        )
    }
}
module.exports = AddReminder;