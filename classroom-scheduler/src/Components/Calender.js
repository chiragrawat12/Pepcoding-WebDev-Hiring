import React, { Component } from 'react';
import './Components.css';
import CalenderDays from './CalenderDays';

export default class Calender extends Component {
    componentDidMount(){
            const script = document.createElement("script");
            script.src = "Script.js";
            script.async = true;
            document.body.appendChild(script);
    }
    render() {
        let weekdays = ['Sunday' , 'Monday' , 'Tuesday' , 'Wednesday' , 'Thursday' , 'Friday' , 'Saturday']
        return (
            <>  
                <div id = "weekdays">  
                    {weekdays.map((day , key)=>{
                        return <CalenderDays 
                            weekday = {day}
                            key = {key}
                        />;
                    }) }
                </div>
            </>
        )
    }
}
