//数据统计
import React,{Component} from 'react';
// import { Breadcrumb,Radio,DatePicker } from 'antd'; import { Table } from 'antd';
const Breadcrumb = require('antd/lib/breadcrumb');
const Radio = require('antd/lib/radio');

const DatePicker = require('antd/lib/date-picker');
const RangePicker = DatePicker.RangePicker;

const Select = require('antd/lib/select');
const Option = Select.Option;

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
  },{
    title: '证件号码',
    dataIndex: 'age4',
  },  {
    title: '联系方式',
    dataIndex: 'age5',
  }, {
    title: '分组',
    dataIndex: 'age6',
  },{
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


import echarts from 'echarts';
const pieOption = {
    tooltip: {
        trigger: 'item',
        formatter: "{a} <br/>{b}: {c} ({d}%)"
    },
    legend: {
        orient: 'vertical',
        x: 'left',
        data:['直接访问','邮件营销','联盟广告','视频广告','搜索引擎']
    },
    series: [
        {
            name:'访问来源',
            type:'pie',
            radius: ['50%', '70%'],
            avoidLabelOverlap: false,
            label: {
                normal: {
                    show: false,
                    position: 'center'
                },
                emphasis: {
                    show: true,
                    textStyle: {
                        fontSize: '30',
                        fontWeight: 'bold'
                    }
                }
            },
            labelLine: {
                normal: {
                    show: false
                }
            },
            data:[
                {value:335, name:'直接访问'},
                {value:310, name:'邮件营销'},
                {value:234, name:'联盟广告'},
                {value:135, name:'视频广告'},
                {value:1548, name:'搜索引擎'}
            ]
        }
    ]
};

require('./dataStatistics.css');
class DataStatistics extends Component{
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
    }
    render(){
        return(
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
                            <RangePicker format="yyyy/MM/dds" onChange={()=>this.onChange} />
                        </div>
                    </div>
                    <div  className='chooseDayItem clearfix'>
                        <span className='med_six_five_grey floatLeft'>选择社区:</span>                       
                        <div className='floatLeft dayRadio'> 
                        <Select showSearch
                            style={{ width: 200 }}
                            placeholder="请选择社区"
                            optionFilterProp="children"
                            notFoundContent="无法找到"
                            onChange={()=>this.handleChange}
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
                            {/* <div id='line'></div> */}
                        </div>
                    </div>
                    <div className='chartContainTwo'>
                        <div className='chartThree floatLeft'>
                            {/* <div id='pie'></div> */}
                        </div>
                        <div className='chartFour floatLeft'>
                            {/* <div id='line'></div> */}
                        </div>
                    </div>                   
                </div>
                {/**异常人员列表 */}
                <div className='personList'>
                    <div className='personListTitle'>
                        <span className='med_eight_five_grey'>监测异常人员列表</span>
                    </div>
                    <Table columns={columns} dataSource={data} pagination={false}/>
                </div>
            </div>
        )
    }
}
module.exports = DataStatistics;