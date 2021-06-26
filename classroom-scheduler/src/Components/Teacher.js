import React, { Component } from 'react';
import { Link } from 'react-router-dom';
export default class Teacher extends Component {
    render() {


        return (
            <div >
                <Link to = "#" className = "teacher-link">
                
                    <div className="teacher">
                        <div className="teacher-name">
                            {this.props.teacherName}
                        </div>
                        <div className="lectures">
                            {this.props.lectures.map((lec , key) => {
                                return ( 
                                    <div key = {key}>
                                        {lec.batch} <span>{lec.date} {lec.from} - {lec.to}</span>
                                    </div>
                                );
                            })}
                            <br />
                        </div>
                    </div>
                
                </Link>
            </div>
        )
    }
}
