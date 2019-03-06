import { Radio } from 'antd';
import React, { Component } from 'react';
const RadioGroup = Radio.Group;
const App = React.createClass({
    getInitialState() {
        return {
            value: 1,
        };
    },
    onChange(e) {
        console.log('radio checked', e.target.value);
        this.setState({
            value: e.target.value,
        });
    },
    render() {
        return (
            <RadioGroup onChange={this.onChange} value={this.state.value}>
                <Radio key="a" value={1}>良好</Radio>
                <Radio key="b" value={2}>一般</Radio>
                <Radio key="c" value={3}>较差</Radio>
            </RadioGroup>
        );
    },
});
module.exports = App