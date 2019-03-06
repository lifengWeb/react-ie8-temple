import React, { Component } from 'react';
require('./header.css');
// const logo = require('../../../asset/img/logo.png');
//本地图片引用
import logo from '../../../asset/img/logo.png';
import alarm from '../../../asset/img/alarm.png';
import editIcon from '../../../asset/img/profile_edit.png';
import loginoutIcon from '../../../asset/img/logout.png';


class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            msgShow: false,//手环检测的提示信息
            showMsg: false,//患者的留言信息
        }
    }

    render() {
        return (
            <div className='header'>
                <img src={logo} className='logoImg' />
                <div className='headerRight floatRight'>
                    <div className='headerImgItem floatLeft'>
                        <img className='headeImg' src={require('../../../asset/img/one.jpg')} />
                        <span>administrator</span>
                    </div>
                    <div className='headerRightItem floatLeft' onClick={() => {
                        const { showMsg } = this.state;
                        this.setState({
                            showMsg: !showMsg
                        })
                    }}>
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
                {/*检测到手环提醒 */}
                {
                    this.state.msgShow ?
                        <div className='connectTips'>
                            <div className='tipsTitle clearfix'>
                                <span className='med_seven_five_Black floatLeft'>扫描到手环</span>
                                <img src={require('../../../asset/img/closeIcon.png')} className='closeIcon floatRight' onClick={() => {
                                    this.setState({ msgShow: false })
                                }}></img>
                            </div>
                            <span className='med_sixHalf_five_grey'>
                                手环属于 王先生(手环ID156642626) 是否立即查看患者详情
                        </span>
                            <div className='med_seven_five_white goDetailBtn'>
                                查看详情
                        </div>
                        </div> : ''
                }
                {/* 留言信息 */}
                {
                    this.state.showMsg ?
                        <div className='header_msgContain'>
                            <div className="leftShortMsg floatLeft med_six_five_grey">
                                <div className='headerMsgTitle'>
                                    <img src={require('../../../asset/img/close.png')} alt="" className='msg_dropDownImg' />
                                    <span className='med_seven_five_grey'>留言列表</span>
                                </div>
                                <div className="msg_shortMsgItem msg_shortMsgItemChoosed">
                                    <div className='clearfix'>
                                        <span className='blue floatLeft'>患者姓名 </span>
                                        <span className='msgMark floatLeft'></span>
                                        <img src={require('../../../asset/img/closeIcon.png')} className='msgItemCloseImg floatRight' />
                                    </div>

                                    <div className='msg_centerMargin'>1月1日 10:24</div>
                                    <span>您好我想咨询一下</span>
                                    <img src={require('../../../asset/img/dropDown02.png')} className='msg_rightArrowIcon' />
                                </div>
                                <div className="msg_shortMsgItem">
                                    <span className='blue'>患者姓名</span>
                                    <img src={require('../../../asset/img/closeIcon.png')} className='msgItemCloseImg floatRight' />
                                    <div className='msg_centerMargin'>1月1日 10:24</div>
                                    <span>您好我想咨询一下</span>
                                    <img src={require('../../../asset/img/dropDown02.png')} className='msg_rightArrowIcon' />
                                </div>
                            </div>
                            <div className='rightDetailContain floatLeft'>
                                <div className="rightDetailMsg med_six_five_grey">
                                    <div className='rightDetailMsgTitle'>
                                        患者姓名
                                </div>
                                    <div className='msg_time'>
                                        1月1日 12:10
                                </div>
                                    <div className='clearfix'>
                                        <div className='leftmsg med_seven_five_Black floatLeft'>
                                            有什么可
                                    </div>
                                    </div>
                                    <div className='clearfix'>
                                        <div className='leftmsg med_seven_five_Black floatLeft'>
                                            有什么可有什么可有什么可有什么可有什么可有什么可有什么可
                                    </div>
                                    </div>

                                    <div className='clearfix'>
                                        <div className='leftmsg rightmsg med_seven_five_Black floatRight'>
                                            有什么可以帮
                                    </div>
                                    </div>
                                    <div className='msg_time'>
                                        1月1日 12:18
                                </div>
                                    <div className='clearfix'>
                                        <div className='leftmsg rightmsg med_seven_five_Black floatRight'>
                                            有什么可以帮有什么可以帮 有什么可以帮 有什么可以帮 有什么可以帮 有什么可以帮
                                    </div>
                                    </div>
                                </div>
                                <div className='sendMsgContain'>
                                    <textarea className='sendMsg med_seven_five_grey' placeholder='输入文字'>
                                    </textarea>
                                    <span className='sendBtn med_eight_five_grey'>发送</span>
                                </div>
                            </div>
                        </div>
                        : ''
                }
            </div>
        )
    }
}
module.exports = Header;