import React, { Component } from 'react';

export default class CalenderDays extends Component {
    render() {
        return (
                    <div>
                        <div className = "weekday-name"> 
                            {this.props.weekday}
                        </div>
                        <div id = {this.props.weekday}></div>
                    </div>
        )
    }
}
