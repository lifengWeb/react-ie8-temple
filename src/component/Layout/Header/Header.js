import React, { Component } from 'react';
require('./header.css');
// const logo = require('../../../asset/img/logo.png');
//本地图片引用
import logo from '../../../asset/img/logo.png';
import alarm from '../../../asset/img/alarm.png';
import editIcon from '../../../asset/img/profile_edit.png';
import loginoutIcon from '../../../asset/img/logout.png';


class Header extends Component {
    
    render() {
        return (
            <div className='header'>
                <img src={logo} className='logoImg' />
                <div className='headerRight floatRight'>
                    <div className='headerImgItem floatLeft'>
                        <img className='headeImg' src={require('../../../asset/img/one.jpg')} />
                        <span>administrator</span>
                    </div>
                    <div className='headerRightItem floatLeft'>
                        <img className='msgIcon' src={alarm} />
                        <span>留言消息 <span className='newtips'>new</span></span>
                    </div>
                    <div className='headerRightItem floatLeft'>
                        <img className='updateInfoIcon' src={editIcon} />
                        <span>修改个人信息</span>
                    </div>
                    <div className='headerRightItem floatLeft'>
                        <img className='loginOutIcon' src={loginoutIcon} />
                        <span>退出登录</span>
                    </div>
                </div>
                <div className='connectTips'>
                    <div className='tipsTitle clearfix'>
                        <span className='med_seven_five_Black floatLeft'>扫描到手环</span>
                        <img src={require('../../../asset/img/closeIcon.png')} className='closeIcon floatRight'></img>
                    </div>
                    <span className='med_sixHalf_five_grey'>
                        手环属于 王先生(手环ID156642626) 是否立即查看患者详情
                    </span>
                    <div className='med_seven_five_white goDetailBtn'>
                        查看详情
                    </div>

                </div>
            </div>
        )
    }
}
module.exports = Header;