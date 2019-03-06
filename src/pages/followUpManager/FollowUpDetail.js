import React, { Component } from 'react';
require('./followUpDetail.css');
class FollowUpDetail extends Component {
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
                    <span className='med_seven_five_grey'>随访管理 > 查看记录</span>
                </div>
                <div className='fud_Contain'>
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
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
module.exports = FollowUpDetail;