import React, { Component } from 'react';

// import { Radio } from 'antd';
// const RadioGroup = Radio.Group;
import { DatePicker } from 'antd';

function onChange(value, dateString) {
    console.log(value, dateString);
}

require('./enterFollowUpInfo.css');
const Radio = require('../../component/antd/Radio');

class EnterFollowUpInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render() {
        return (
            <div>
                <div className='navTop'></div>
                <div className='nav'>
                    <span className='med_seven_five_grey'>随访管理 > 添加随访信息</span>
                </div>
                <div className='efu_Contain'>
                    <div className='containHandle clearfix'>
                        <span className='regu_seven_four_grey leftTitle'>录入新患者信息</span>
                        <div className='floatRight btnContain'>
                            <div className='cancelBtn floatLeft med_seven_five_grey'>取消</div>
                            <div className='confirmBtn floatLeft med_seven_five_white'>保存</div>
                        </div>
                    </div>
                    <div className='pd_followUpDetail floatLeft'>
                        <div className='pd_followUpDetailHeader borderBottom'>
                            <div className='pd_followUpDetailTitle blod_ten_five_Black'>高血压患者随访服务记录表</div>
                            <div className='med_six_five_grey pd_followUpDetailDoc'>
                                <span>随访人员：何医生  </span>
                                <span>随访日期：2019/01/01 12:14</span>
                            </div>
                        </div>
                        <div className='pd_patientInfo clearfix blod_sixHalf_five_black borderBottom'>
                            <div className='floatLeft pd_firstRow '>
                                <div className='pd_rowItem'>
                                    <span>患者姓名：</span>
                                    <span>许多</span>
                                </div>
                                <div className='pd_rowItem'>
                                    <span>证件号码:</span>
                                    <span>许多</span>
                                </div>
                                <div className='pd_rowItem'>
                                    <span>联系方式:</span>
                                    <span>许多</span>
                                </div>
                            </div>
                            <div className='floatLeft pd_secondRow'>
                                <div className='pd_rowItem'>
                                    <span>性别：</span>
                                    <span>许多</span>
                                </div>
                                <div className='pd_rowItem'>
                                    <span>社区:</span>
                                    <span>许多</span>
                                </div>
                                <div className='pd_rowItem'>
                                    <span>地址:</span>
                                    <span>许多</span>
                                </div>
                            </div>
                            <div className='floatLeft'>
                                <div className='pd_rowItem'>
                                    <span>年龄：</span>
                                    <span>许多</span>
                                </div>
                                <div className='pd_rowItem'>
                                    <span>病症分组：</span>
                                    <span>许多</span>
                                </div>
                            </div>

                        </div>
                        <div className='blod_sixHalf_five_black pd_followUpTableContain'>
                            <div className='blod_sixHalf_five_black'>
                                <span className='efu_blueMark'></span>
                                <span> 症状</span>
                            </div>
                            <textarea className='efu_textarea med_sixHalf_five_grey' placeholder='点击填写症状'>

                            </textarea>
                            <div className='blod_sixHalf_five_black'>
                                <span className='efu_blueMark'></span>
                                <span> 体征</span>
                            </div>
                            <div>
                                <div className='efu_inputCotain'>
                                    <span className='med_sixHalf_five_Black'> 体重: </span>
                                    <input className="efu_input"></input>
                                    <span className="efu_unitTwo med_sixHalf_five_grey">kg</span>
                                    <span className='med_sixHalf_five_Black'> 血压: </span>
                                    <input className="efu_input med_sixHalf_five_grey" placeholder="收缩压"></input>
                                    <span className="efu_unit med_sixHalf_five_grey">mmHg</span>
                                    <span> / </span>
                                    <input className="efu_input"></input>
                                    <span className="efu_unit med_sixHalf_five_grey">mmHg</span>
                                </div>
                                <div className='efu_checkBoxCotain'>
                                    <span className='med_sixHalf_five_Black'>心里调整：</span>
                                    <Radio></Radio>
                                </div>
                            </div>
                            <div className='blod_sixHalf_five_black'>
                                <span className='efu_blueMark'></span>
                                <span> 大类型</span>
                            </div>
                            <div className='efu_inputCotain'>
                                <span className='med_sixHalf_five_Black'> 项目名: </span>
                                <span className='med_sixHalf_five_grey efu_dayMargin'>每日</span>
                                <input className="efu_input med_sixHalf_five_grey" placeholder='提示信息'></input>
                                <span className="efu_unit med_sixHalf_five_grey">次</span>
                            </div>
                            <div className='efu_boederView borderBottom'>
                            </div>
                            <div>
                                <span className=''>下次随访日期：</span>
                                <DatePicker onChange={onChange} />
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        )
    }
}
module.exports = EnterFollowUpInfo;