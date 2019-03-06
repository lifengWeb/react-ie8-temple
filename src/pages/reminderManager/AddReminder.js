import React, { Component } from 'react';
import { Slider, Select, Table, message } from 'antd';
import { DatePicker } from 'antd';
const RangePicker = DatePicker.RangePicker;
import { TimePicker } from 'antd';
require('../patientManager/addPatient.css');
require('./addReminder.css');
const getAxios = require('../../utils/axiosInstance');
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
function log(value) {
    console.log(value);
}

class AddReminder extends Component {
    constructor(props) {
        super(props);
        this.state = {
            noticeType: '1',//哪种提醒通知类型  1->手环检测异常 2->吃药 3->随访
            custOrDefvalue: 1,//1 -> 默认 2 ->自定义
            exceptionType: 3,//哪种触发类型 1=>温度 2=>血压 3=>心率 
            showCover: false,
            diseaseList: [],
            diseaseType: '',
            communityList: [],
            communityType: '',
            patientList: [],
            selectedRowKeys: [],
            choosePatientList: [],//选中的患者列表
            choosePatientIdList: [],//列表第一列的选中状态
            defMin: 60,//默认心率最小值
            defMax: 100,//默认心率最大值
            defTempMin: 36,
            defTempMax: 38,
            defsystolic_min: 90,//收缩压
            defsystolic_max: 140,
            defdiastolic_max: 90,
            defdiastolic_min: 60,
            heartMax: 100,
            heartMin: 60,
            tempMax: 38,
            tempMin: 36,
            systolic_min: 90,//收缩压
            systolic_max: 140,
            diastolic_max: 90,//舒张压
            diastolic_min: 60,
        }
    }
    componentDidMount() {
        //获取疾病分组
        getAxios('/api/v1/disease', 'get', {}, (res) => {
            res.data.map((item) => {
                item.isSelect = false
            })
            this.setState({
                diseaseList: res.data
            })
        })
        //获取社区分组
        getAxios('/api/v1/community', 'get', {}, (res) => {
            this.setState({
                communityList: res.data
            })
        })
        this.getPatientList();
    }
    //获取患者列表
    getPatientList() {
        let url = '';
        let { diseaseType, communityType, exceptionType, gender } = this.state;
        if (diseaseType) {
            url = 'disease_id=' + diseaseType;
        }
        if (communityType) {
            url ?
                url += '&community_id=' + communityType :
                url = 'community_id=' + communityType
        }
        getAxios(url ? '/api/v1/patient?' + url : '/api/v1/patient', 'get', {}, (res) => {
            this.setState({
                patientList: res.data
            })
        })
    }
    //筛选患者列表时 选择病症分组
    handleChangeDisease(e) {
        this.setState({
            diseaseType: e
        }, () => {
            this.getPatientList()
        })
    }
    //筛选患者列表时 选择社区分组
    handleChangeCommunity(e) {
        this.setState({
            communityType: e
        }, () => {
            this.getPatientList()
        })
    }
    //选择提醒类型
    changeNoticeType(e) {
        this.setState({
            noticeType: e.target.value
        })
    }
    //选择异常类型
    changeType(e) {
        this.setState({
            exceptionType: e.target.value
        })
    }
    //默认范围还是自定义范围
    onChangeCustomOrDefault(e) {
        this.setState({
            custOrDefvalue: e.target.value,
        });
    }
    //隐藏弹窗
    hideCanceChoose() {
        this.setState({
            showCover: false
        })
    }
    //取消 回退选中的患者列表
    resetChoosedPatient() {
        const { choosePatientList, choosePatientIdList } = this.state;
        this.setState({
            selectedRows: choosePatientList,
            selectedRowKeys: choosePatientIdList,
            showCover: false
        })
    }
    //完成 存储选中患者列表
    setChoosedPatient() {
        const { selectedRowKeys, selectedRows } = this.state;
        this.setState({
            choosePatientList: selectedRows,
            choosePatientIdList: selectedRowKeys,
            showCover: false
        })
    }
    //删除 去除选中患者
    deleteChoosedPatient(id) {
        const { choosePatientList, choosePatientIdList } = this.state;
        choosePatientList.map((item, index) => {
            if (item.id == id) {
                choosePatientList.splice(index, 1);
                choosePatientIdList.splice(index, 1)
            }
        })
        this.setState({
            choosePatientIdList,
            choosePatientList,
            selectedRows: choosePatientList,
            selectedRowKeys: choosePatientIdList
        })
    }
    //添加提醒
    addReminder() {
        const {
            defMax, defMin, noticeType, exceptionType,
            choosePatientList, custOrDefvalue,
            defTempMax, defTempMin, heartMax, heartMin, tempMax, tempMin,
            defdiastolic_max, defdiastolic_min, defsystolic_max, defsystolic_min,
            diastolic_max, diastolic_min, systolic_max, systolic_min
        } = this.state;
        let name = document.getElementById('rule_name').value;
        let content = document.getElementById('content').value;
        let type;
        if (noticeType == 1) {//手环检测异常
            type = exceptionType
        } else if (noticeType == 2) {
            type = 4
        }
        let patient_ids = [];
        choosePatientList.map((item, index) => {
            patient_ids.push(item.id);
        })
        if (patient_ids.length == 0) {
            message.error('请选择患者');
        } else if (!content) {
            message.error('请填写提醒内容');
        } else {
            let data = {
                name,
                type,
                patient_ids,
                content
            }
            if (type == 3) {
                data.max = custOrDefvalue == 1 ? defMax : heartMax;
                data.min = custOrDefvalue == 1 ? defMin : heartMin;
            } else if (type == 1) {
                data.max = custOrDefvalue == 1 ? defTempMax : tempMax;
                data.min = custOrDefvalue == 1 ? defTempMin : tempMin;

            } else if (type == 2) {
                data.diastolic_min = custOrDefvalue == 1 ? defdiastolic_min : diastolic_min;
                data.diastolic_max = custOrDefvalue == 1 ? defdiastolic_max : diastolic_max;
                data.systolic_max = custOrDefvalue == 1 ? defsystolic_max : systolic_max;
                data.systolic_min = custOrDefvalue == 1 ? defsystolic_min : systolic_min;
            }
            getAxios('/api/v1/rule', 'post', data, (res) => {
                message.success('配置成功')
            })
        }

    }
    //自定义心率范围
    setHeartRange(e) {
        this.setState({
            heartMax: e[1],
            heartMin: e[0]
        })
    }
    //自定义温度
    setTempRange(e) {
        this.setState({
            tempMax: e[1],
            tempMin: e[0]
        })
    }
    // 自定义血压
    setDiastolic(e) {
        this.setState({
            diastolic_max: e[1],
            diastolic_min: e[0]
        })
    }
    setSystolic(e) {
        this.setState({
            systolic_max: e[1],
            systolic_min: e[0]
        })
    }

    render() {
        const that = this;
        const { exceptionType, custOrDefvalue, patientList, selectedRowKeys } = this.state;
        const showBloodCustom = (exceptionType == 2 && custOrDefvalue == 2) ? true : false;//显示自定义血压
        const showCustomtHeart = (exceptionType == 3 && custOrDefvalue == 2) ? true : false;//显示自定义心率
        const showCustomtTemp = (exceptionType == 1 && custOrDefvalue == 2) ? true : false;//显示自定义温度
        const showBlooddefault = (exceptionType == 2 && custOrDefvalue == 1) ? true : false;//显示默认血压
        const showdefaultHeart = (exceptionType == 3 && custOrDefvalue == 1) ? true : false;//显示默认心率
        const showdefaultTemp = (exceptionType == 1 && custOrDefvalue == 1) ? true : false;//显示自定义温度
        const exceptionTypeStr = exceptionType == 1 ? '心率' : (exceptionType == 2 ? '血压' : '温度');
        //选择患者弹窗列表rowSelection配置       
        const rowSelection = {
            onChange(selectedRowKeys, selectedRows) {
                // console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
                that.setState({
                    selectedRowKeys,
                    selectedRows
                })
            },
            selectedRowKeys: that.state.selectedRowKeys
        };
        //选择患者数据配置  
        const columns = [{
            title: '姓名',
            dataIndex: 'name',
            width: 150,
            render: text => <a>{text}</a>,
        }, {
            title: '社区',
            width: 150,
            dataIndex: 'community',
            render: community => <span>{community && community.name}</span>,
        }, {
            title: '证件号码',
            dataIndex: 'idcard_number',
            width: 150,
        }, {
            title: '年龄',
            width: 50,
            dataIndex: 'age',
        }, {
            title: '分组',
            dataIndex: 'disease',
            width: 150,
            render: disease => <span>{disease && disease.map((item) => {
                return (
                    <span key={item.id}>{item.name + ' '}</span>
                )
            })}</span>,
        }];

        return (
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
                            <div className='ar_confirmBtn floatLeft med_seven_five_white' onClick={() => this.addReminder()}>确认</div>
                        </div>
                    </div>
                    {/* 异常规则配置 */}
                    <div className="ar_leftRule floatLeft regu_sixHalf_four_grey">
                        <div>
                            <div className='blueTitleMark floatLeft'></div>
                            <span className='reg_ten_four_Black'>提醒规则</span>
                        </div>
                        <div className='med_sixHalf_five_Black ar_reminderType'>提醒类型:</div>
                        <Radio.Group defaultValue="1" buttonStyle="solid" onChange={(e) => this.changeNoticeType(e)}>
                            <Radio.Button value="1">手环检测异常</Radio.Button>
                            <Radio.Button value="2">服药通知</Radio.Button>
                            <Radio.Button value="3">随访通知</Radio.Button>
                        </Radio.Group>
                        <div className='med_sixHalf_five_Black ar_reminderType'>自定义规则名称</div>
                        <input type="text" className='ar_Input regu_sixHalf_four_grey' placeholder='填写规则名称' id='rule_name' />
                        <hr />
                        {/*手环检测异常 */}
                        {
                            this.state.noticeType == 1 ?
                                <div>
                                    {/*异常类型tab*/}
                                    <div className='ar_exceptionType blod_sixHalf_five_black'>异常触发类型</div>
                                    <Radio.Group value={this.state.exceptionType} onChange={(e) => this.changeType(e)}>
                                        <Radio value={3}>心率异常</Radio>
                                        <Radio value={2}>血压异常</Radio>
                                        <Radio value={1}>手腕温度异常</Radio>
                                    </Radio.Group>
                                    {/*取值范围tab*/}
                                    <div className='ar_setHeartTiltle blod_sixHalf_five_black'>
                                        设置正常
                                        <span>{exceptionTypeStr}</span>
                                        范围
                                        <span>(当手环测量读数不在正常范围将触发提醒)</span>
                                    </div>
                                    <Radio.Group value={this.state.custOrDefvalue} onChange={(e) => this.onChangeCustomOrDefault(e)}>
                                        <Radio value={1}>默认正常范围</Radio>
                                        <Radio value={2}>自定义正常范围</Radio>
                                    </Radio.Group>
                                    {/*默认心率*/}
                                    <div className={showdefaultHeart ? 'ar_defaultHeart med_sixHalf_five_Black' : 'hide'}>
                                        默认正常心率范围：60～100次/分
                                    </div>
                                    {/*默认温度*/}
                                    <div className={showdefaultTemp ? 'ar_defaultHeart med_sixHalf_five_Black' : 'hide'}>
                                        默认手腕温度范围：36～38 ℃
                                    </div>
                                    {/*默认血压*/}
                                    <div className={showBlooddefault ? 'ar_defaultHeart med_sixHalf_five_Black' : 'hide'}>
                                        默认血压范围：收缩压：90~140mmHg 舒张压 60~90mmHg
                                    </div>
                                    {/*自定义心率*/}
                                    <div className={showCustomtHeart ? 'ar_customHeart ar_customHeartSilder' : 'hide'}>
                                        <div>选择范围(单位bpm)：</div>
                                        <div className='clearfix ar_customHeartItem '>
                                            <div className='floatLeft' style={{ width: '90%' }}>
                                                <Slider range step={1}
                                                    defaultValue={[this.state.defMin, this.state.defMax]}
                                                    max={220} onChange={(e) => this.setHeartRange(e)} />
                                            </div>
                                        </div>
                                    </div>
                                    {/*自定义温度*/}
                                    <div className={showCustomtTemp ? 'ar_customHeart ar_customHeartSilder' : 'hide'}>
                                        <div>选择范围(单位 ℃)：</div>
                                        <div className='clearfix ar_customHeartItem '>
                                            <div className='floatLeft' style={{ width: '90%' }}>
                                                <Slider range step={1}
                                                    defaultValue={[this.state.defTempMin, this.state.defTempMax]}
                                                    max={100} onChange={(e) => this.setTempRange(e)} />
                                            </div>
                                        </div>
                                    </div>
                                    {/*自定义血压*/}
                                    <div className={showBloodCustom ? 'ar_customHeart' : 'hide'}>
                                        <div>选择范围(单位mmHg)：</div>
                                        <div className='clearfix ar_customHeartItem'>
                                            <div className='floatLeft'>收缩压：</div>
                                            <div className='floatLeft' style={{ width: '80%' }}>
                                                <Slider range step={10} defaultValue={[90, 140]}
                                                    max={200} onChange={(e) => this.setDiastolic(e)} />
                                            </div>
                                        </div>
                                        <div className='clearfix'>
                                            <div className='floatLeft'>舒张压：</div>
                                            <div className='floatLeft' style={{ width: '80%' }}>
                                                <Slider range step={10} defaultValue={[60, 90]}
                                                    onChange={(e) => this.setSystolic(e)} max={200} />
                                            </div>
                                        </div>
                                    </div>
                                    {/*提醒内容*/}
                                    <div className='blod_sixHalf_five_black ar_setHeartTiltle'>提醒内容：</div>
                                    <textarea className='ar_textArea' placeholder='填写提醒触发后发送给患者的内容' id='content'></textarea>
                                </div>
                                : ""
                        }
                        {/*服药通知 */}
                        {
                            this.state.noticeType == 2 ?
                                <div>
                                    <div className='ar_exceptionType blod_sixHalf_five_black'>设置发送时间</div>
                                    <div className='ar_exceptionType blod_sixHalf_five_black'>
                                        <span>选择日期：</span>
                                        <RangePicker></RangePicker>
                                        <span className='ar_centerMarSpan'> 的 </span>
                                        <TimePicker></TimePicker>
                                        <span className='ar_centerMarSpan'>发送提醒</span>
                                    </div>
                                    <div className='blod_sixHalf_five_black ar_setHeartTiltle'>提醒内容：</div>
                                    <textarea className='ar_textArea ar_followUpTtextArea' placeholder='填写提醒触发后发送给患者的内容'></textarea>
                                </div>
                                : ""
                        }
                        {/*随访通知 */}
                        {
                            this.state.noticeType == 3 ?
                                <div>
                                    <div className='blod_sixHalf_five_black ar_setHeartTiltle'>提醒内容：</div>
                                    <textarea className='ar_textArea ar_followUpTtextArea' placeholder='填写提醒触发后发送给患者的内容'></textarea>
                                </div>
                                : ""
                        }
                    </div>
                    {/*已选中患者列表 */}
                    <div className="ar_rightPatient floatLeft">
                        <div className='ar_patientChoosedTit'>
                            <span className='med_seven_five_grey'>已选患者</span>
                            <span className='ar_addBtn floatRight' style={{ color: '#fff' }} onClick={() => this.setState({ showCover: true })}>+</span>
                        </div>
                        <hr />
                        {
                            this.state.choosePatientList.map((item, index) => {
                                return (
                                    <div className='med_six_five_Black ar_patientItem clearfix' key={index}>
                                        <span className='floatLeft'>{item.name}</span>
                                        <span className='floatRight'><a onClick={() => this.deleteChoosedPatient(item.id)}>删除</a></span>
                                    </div>
                                )
                            })
                        }

                        <div className='ar_clearPatient med_six_five_grey clearfix'>
                            <div className='floatRight'>
                                <img src={require('../../asset/img/delete2.png')} className='ar_clearImg'></img>
                                <span>清空列表</span>
                            </div>
                        </div>
                    </div>
                    {/*患者选择弹窗 */}
                    {
                        this.state.showCover ?
                            <div className='coverView'
                                onClick={() => this.setState({ showCover: false })}>
                                <div className='groupCover ar_cover'
                                    onClick={(e) => { e.stopPropagation() }}>

                                    <div className='coverTitle'>
                                        <span className='bold_elev_bold_grey '>选择患者 已选<span>{selectedRowKeys.length}</span>人</span>
                                        <img src={require('../../asset/img/delete.png')} className='groupCover_delIcon floatRight'></img>
                                    </div>

                                    <div className='chooseDayItem clearfix ar_coverHeader'>
                                        <span className='med_six_five_grey floatLeft'>病症分组:</span>
                                        <div className='floatLeft dayRadio'>
                                            <Select showSearch
                                                style={{ width: 200 }}
                                                placeholder="请选择社区"
                                                optionFilterProp="children"
                                                notFoundContent="无法找到"
                                                onChange={(e) => this.handleChangeDisease(e)}
                                            >
                                                <Option value='' key='0'>全部分组</Option>
                                                {
                                                    this.state.diseaseList.map((item) => {
                                                        return (<Option value={item.id + ''} key={item.id}>{item.disease_name}</Option>)
                                                    })
                                                }
                                            </Select>
                                        </div>
                                        <span className='med_six_five_grey floatLeft'>选择社区:</span>
                                        <div className='floatLeft dayRadio'>
                                            <Select showSearch
                                                style={{ width: 200 }}
                                                placeholder="请选择社区"
                                                optionFilterProp="children"
                                                notFoundContent="无法找到"
                                                onChange={(e) => this.handleChangeCommunity(e)}
                                            >
                                                <Option value='' key='0'>全部社区</Option>
                                                {
                                                    this.state.communityList.map((item) => {
                                                        return (<Option value={item.id + ''} key={item.id}>{item.community_name}</Option>)
                                                    })
                                                }
                                            </Select>
                                        </div>
                                        <div className='ar_freshDiv clearfix'>
                                            <div className='refreshBtn floatRight'>
                                                <img src={require('../../asset/img/refresh.png')} className='refreshIcon'></img>
                                                <span className='regu_seven_four_grey'>刷新</span>
                                            </div>
                                        </div>
                                    </div>
                                    <Table
                                        rowSelection={rowSelection}
                                        columns={columns}
                                        dataSource={patientList}
                                        pagination={false}
                                        useFixedHeader={true}
                                        onChange={(e) => {
                                            console.log(e)
                                        }} />
                                    <div className='groupHandleBtm'>
                                        <div className='floatRight'>
                                            <div className='cancelBtn med_eight_five_grey floatLeft'
                                                onClick={() => this.resetChoosedPatient()}>
                                                取消
                                                    </div>
                                            <div className='confirmBtn med_eight_five_white floatRight'
                                                onClick={() => this.setChoosedPatient()}>
                                                完成
                                                    </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            : ''
                    }

                </div>

            </div>
        )
    }
}

module.exports = AddReminder;