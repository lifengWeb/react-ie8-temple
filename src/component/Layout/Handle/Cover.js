import React, { Component } from 'react';
class Sign extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }
    componentDidMount() {
        const { showCover } = this.props;

    }

    render() {
        return (
            <div>
                {
                    this.state.showCover ?
                        <div className='coverView' onClick={() => this.setState({
                            showCover: false
                        })}>
                            <div className='groupCover dm_cover' onClick={(e) => {
                                e.stopPropagation()
                            }}>
                                <div className='coverTitle'>
                                    <span className='bold_elev_bold_grey '>添加新分组</span>
                                    <img src={require('../../asset/img/delete.png')} className='groupCover_delIcon floatRight'></img>
                                </div>
                                <div>
                                    <input className='groupSelect med_sixHalf_five_grey' placeholder='输入新名称' />
                                </div>
                                <div className='groupHandleBtm'>
                                    <div className='floatRight'>
                                        <div className='cancelBtn med_eight_five_grey floatLeft'>取消</div>
                                        <div className='confirmBtn med_eight_five_white floatRight'>确认</div>
                                    </div>
                                </div>
                            </div>

                        </div> : ''
                }
            </div>
        )
    }
}
module.exports = Sign;
