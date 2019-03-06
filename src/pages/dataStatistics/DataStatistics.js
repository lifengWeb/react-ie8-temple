//数据统计
import React, { Component } from 'react';
// import { Breadcrumb,Radio,DatePicker } from 'antd'; import { Table } from 'antd';
const Breadcrumb = require('antd/lib/breadcrumb');
const Radio = require('antd/lib/radio');

const DatePicker = require('antd/lib/date-picker');
const RangePicker = DatePicker.RangePicker;

const Select = require('antd/lib/select');
const Option = Select.Option;
//表格数据
const Table = require('antd/lib/table')
const columns = [{
    title: '姓名',
    dataIndex: 'name',
    render(text) {
        return <a href="#">{text}</a>;
    },
},
{
    title: '社区',
    dataIndex: 'age1',
},
{
    title: '性别',
    dataIndex: 'age2',
},
{
    title: '年龄',
    dataIndex: 'age3',
}, {
    title: '证件号码',
    dataIndex: 'age4',
}, {
    title: '联系方式',
    dataIndex: 'age5',
}, {
    title: '分组',
    dataIndex: 'age6',
}, {
    title: '当前报警状态',
    dataIndex: 'address',
}];

const data = [];
for (let i = 0; i < 5; i++) {
    data.push({
        key: i,
        name: `李大嘴${i}`,
        age1: 32,
        age2: 32,
        age3: 32,
        age4: 32,
        age5: 32,
        age6: 32,
        address: `西湖区湖底公园${i}号`,
    });
}

//图标参数
const echarts = require('echarts');
require('echarts/chart/pie');
require('echarts/chart/line');
require('echarts/chart/bar');

//异常警报类型占比图表配置
const pieOption = {
    title: {
        text: '异常警报类型占比',
    },
    tooltip: {
        trigger: 'item',
        formatter: "{a} <br/>{b} : {c} ({d}%)"
    },
    legend: {
        orient: 'horizontal',
        x: 'right',
        //图例前面的icon从扇形改为矩形
        data: [{ name: "心率异常", icon: 'square' }, { name: "血压异常", icon: 'rect' }, { name: "温度异常", icon: 'rect' }]
    },
    color: ['#FFCC43', '#518BEB', '#03D3D8'],
    calculable: true,
    series: [
        {
            name: '访问来源',
            type: 'pie',
            radius: ['50%', '70%'],
            itemStyle: {
                normal: {
                    label: {
                        show: true
                    },
                    labelLine: {
                        show: true
                    }
                },
                emphasis: {
                    label: {
                        show: true,
                        position: 'center',
                        textStyle: {
                            fontSize: '30',
                            fontWeight: 'bold'
                        }
                    }
                }
            },
            data: [
                { value: 335, name: '心率异常' },
                { value: 310, name: '血压异常' },
                { value: 234, name: '温度异常' },
            ]
        }
    ]
};

//异常警报时间数据图表配置
const option = {
    title: {
        text: '异常警报时间数据',
    },
    legend: {
        data: [{ name: "心率异常", icon: "rectangle" }, { name: "血压异常", icon: 'rectangle' }, { name: "温度异常", icon: 'rectangle' }],
        // data:["心率异常","血压异常","温度异常"],
        x: 'right',
        orient: 'horizontal',
    },
    color: ['#FFCC43', '#518BEB', '#03D3D8'],
    calculable: true,
    xAxis: {
        type: 'category',
        //x轴字体颜色
        axisLine: {
            lineStyle: {
                color: '#fff'
            }
        },
        data: ['0', '2:00', '4:00', '6:00', '8:00', '10:00']
    },
    yAxis: {
        type: 'value',
        //y轴颜色
        axisLine: {
            lineStyle: {
                color: '#fff'
            }
        },
        //y轴设置为百分比
        axisLabel: {
            formatter: '{value}',
        },
        //坐标轴内线的样式
        splitLine: {
            lineStyle: {
                color: '#666',
                //type:'dashed'虚线
            }
        }
    },
    series: [{
        //折线上数字
        label: {
            normal: {
                show: true,
                position: 'top',
                formatter: '{c}%'
            }
        },
        // 折线颜色
        itemStyle: {
            normal: {
                color: '#FFCC43',
                lineStyle: {
                    color: '#FFCC43'
                }
            }
        },
        data: ['78.57', '50', '80', '93.33', '92.86', '100'],
        type: 'line',
        smooth: true,
        name: "心率异常",
        symbol: 'none',
    }, {
        //折线上数字
        label: {
            normal: {
                show: true,
                position: 'top',
                formatter: '{c}%'
            }
        },
        // 折线颜色
        itemStyle: {
            normal: {
                color: '#518BEB',
                lineStyle: {
                    color: '#518BEB'
                }
            }
        },
        data: ['74.57', '40', '70', '83.33', '62.86', '100'],
        type: 'line',
        smooth: true,
        name: "血压异常",
        symbol: 'none'
    }, {
        //折线上数字
        label: {
            normal: {
                show: true,
                position: 'top',
                formatter: '{c}%'
            }
        },
        // 折线颜色
        itemStyle: {
            normal: {
                color: '#03D3D8',
                lineStyle: {
                    color: '#03D3D8'
                }
            }
        },
        data: ['54.57', '20', '90', '23.33', '42.86', '10'],
        type: 'line',
        smooth: true,
        name: "温度异常",
        symbol: 'none'
    }]
};

//异常年龄分布图标配置
const barOption = {
    title: {
        text: '异常年龄分布',
    },
    legend: {
        data: [{ name: "心率异常", icon: "rectangle" }, { name: "血压异常", icon: 'rectangle' }, { name: "温度异常", icon: 'rectangle' }],
        x: 'right'
    },
    color: ['#FFCC43', '#518BEB', '#03D3D8'],
    calculable: true,
    xAxis: [
        {
            type: 'category',
            data: ['<40岁', '40-50岁', '50-60岁', '60-70岁', '>70岁']
        }
    ],
    yAxis: [
        {
            type: 'value'
        }
    ],
    series: [
        {
            name: '心率异常',
            type: 'bar',
            data: [2, 49, 70, 23, 25],
        },
        {
            name: '血压异常',
            type: 'bar',
            data: [2, 49, 70, 23, 25],
        },
        {
            name: '温度异常',
            type: 'bar',
            data: [2, 49, 70, 23, 25],
        }
    ]
};

//异常性别分布图标配置
const barOptionSex = {
    title: {
        text: '异常性别分布',
    },
    legend: {
        data: [{ name: "心率异常", icon: "rectangle" }, { name: "血压异常", icon: 'rectangle' }, { name: "温度异常", icon: 'rectangle' }],
        x: 'right'
    },
    calculable: true,
    color: ['#FFCC43', '#518BEB', '#03D3D8'],
    xAxis: [
        {
            type: 'value'
        }
    ],
    yAxis: [
        {
            type: 'category',
            data: ['男', '女']
        }
    ],
    series: [
        {
            name: '心率异常',
            type: 'bar',
            stack: '总量',
            itemStyle: { normal: { label: { show: true, position: 'insideRight' } } },
            data: [320, 302]
        },
        {
            name: '血压异常',
            type: 'bar',
            stack: '总量',
            itemStyle: { normal: { label: { show: true, position: 'insideRight' } } },
            data: [120, 132]
        },
        {
            name: '温度异常',
            type: 'bar',
            stack: '总量',
            itemStyle: { normal: { label: { show: true, position: 'insideRight' } } },
            data: [220, 182]
        }
    ]
};

require('./dataStatistics.css');
class DataStatistics extends Component {
    onChange(value, dateString) {
        console.log('From: ', value[0], ', to: ', value[1]);
        console.log('From: ', dateString[0], ', to: ', dateString[1]);
    }
    handleChange(value) {
        console.log(`selected ${value}`);
    }
    componentDidMount() {
        let myPieChart = echarts.init(document.getElementById('pie'));
        myPieChart.setOption(pieOption);
        let myLineChart = echarts.init(document.getElementById('line'));
        myLineChart.setOption(option);
        let myBarChart = echarts.init(document.getElementById('bar'));
        myBarChart.setOption(barOption);
        let myBarChartSex = echarts.init(document.getElementById('barSex'));
        myBarChartSex.setOption(barOptionSex);
    }
    render() {
        return (
            <div>
                <div className='navTop'></div>
                <div className='nav'>
                    <span className='med_seven_five_grey'>统计图表</span>
                </div>
                {/*数据统计 */}
                <div className='dataContain clearfix'>
                    <div className='peopleCount'>
                        <div className='marginBtm clearfix'>
                            <span className='regu_seven_four_grey floatLeft'>
                                监测人数
                            </span>
                            <span className='regu_seven_four_grey floatRight'>
                                更新时间：01/02 10:15
                            </span>
                        </div>
                        <span className='taho_fifteen_bold_black'>
                            3364
                        </span>
                    </div>
                    <div className='abnormalData'>
                        <div className='abnormalDataItem'>
                            <div className='marginBtm clearfix'>
                                <span className='regu_seven_four_grey floatLeft'>未处理心率异常警报</span>
                            </div>
                            <div className='taho_fifteen_bold_black'>
                                244
                            </div>
                            <div className='regu_six_four_grey floatRight'><a>前去处理>></a></div>
                        </div>
                        <div className='abnormalDataItem'>
                            <div className='marginBtm clearfix'>
                                <span className='regu_seven_four_grey floatLeft'>未处理血压异常警报</span>
                            </div>
                            <div className='taho_fifteen_bold_black'>
                                11
                            </div>
                            <div className='regu_six_four_grey floatRight'><a>前去处理>></a></div>
                        </div>
                        <div className='abnormalDataItem'>
                            <div className='marginBtm clearfix'>
                                <span className='regu_seven_four_grey floatLeft'>未处理温度异常警报</span>
                            </div>
                            <div className='taho_fifteen_bold_black'>
                                30
                            </div>
                            <div className='regu_six_four_grey floatRight'><a>前去处理>></a></div>
                        </div>
                    </div>
                </div>
                {/*选择日期 */}
                <div className='dateChoose'>
                    <div className='chooseDayItem clearfix'>
                        <span className='med_six_five_grey floatLeft'>选择时间:</span>
                        <div className='floatLeft dayRadio'>
                            <Radio.Group defaultValue="a" buttonStyle="solid" >
                                <Radio.Button value="a">今日</Radio.Button>
                                <Radio.Button value="b">本周</Radio.Button>
                                <Radio.Button value="c">本月</Radio.Button>
                            </Radio.Group>
                        </div>
                        <div className='floatLeft'>
                            <RangePicker format="yyyy/MM/dd" onChange={() => this.onChange} />
                        </div>
                    </div>
                    <div className='chooseDayItem clearfix'>
                        <span className='med_six_five_grey floatLeft'>选择社区:</span>
                        <div className='floatLeft dayRadio'>
                            <Select showSearch
                                style={{ width: 200 }}
                                placeholder="请选择社区"
                                optionFilterProp="children"
                                notFoundContent="无法找到"
                                onChange={() => this.handleChange}
                            >
                                <Option value="jack">杰克</Option>
                                <Option value="lucy">露西</Option>
                                <Option value="tom">汤姆</Option>
                            </Select>
                        </div>
                    </div>
                </div>
                {/*图表开始 */}
                <div className='chartContain'>
                    <div className='chartContainOne'>
                        <div className='chartOne floatLeft'>
                            <div id='pie' className='chartOne'></div>
                        </div>
                        <div className='chartTwo floatLeft'>
                            <div id='line' className='chartTwo'></div>
                        </div>
                    </div>
                    <div className='chartContainTwo'>
                        <div className='chartThree floatLeft'>
                            <div id='bar' className='chartThree'></div>
                        </div>
                        <div className='chartFour floatLeft'>
                            <div id='barSex' className='chartFour'></div>
                        </div>
                    </div>
                </div>
                {/**异常人员列表 */}
                <div className='personList'>
                    <div className='personListTitle'>
                        <span className='med_eight_five_grey'>监测异常人员列表</span>
                    </div>
                    <Table columns={columns} dataSource={data} pagination={false} />
                </div>
            </div>
        )
    }
}
module.exports = DataStatistics;