import React, { Component } from 'react';
import Teacher from './Teacher';
import { useEffect , useState} from 'react';
import * as Axios from 'axios';

export default function Teachers() {

    let [search , setSearch] = useState("");
    let [lectures , setLectures] = useState([]);
    let [teachersData , setTeachersData] = useState([]);
    
    useEffect(() => {

        let close = document.querySelector(".close");
        let popup = document.querySelector(".addTeacherPopup");

        close.addEventListener("click" , () => {
            if(popup.style.display === "block"){
                popup.style.display = "none";
            }
        } );

        let addTeacher = document.querySelector(".addTeacherBtn");
        addTeacher.addEventListener("click" , () => {
            if(popup.style.display === "none"){
                popup.style.display = "block";
            }
        });
        
        let addBtn = document.querySelector(".add");
        

        let addbtnListener = () => {
            let lecture = document.querySelector("#lecture");
            let date = document.querySelector("#date");
            let from = document.querySelector("#from");
            let to = document.querySelector("#to");
            
            let teacher_lectures = document.querySelector(".teacher-lectures");

            
            if(lecture.value !== "" && date.value !== "" && from.value !== "" && to.value !== ""){
                let div = document.createElement("div");
                let span = document.createElement("span");

                div.className = "lec-list";
                span.innerText = `${date.value} ${from.value} - ${to.value}`;
                div.innerText = `${lecture.value.trim()} `;
                div.appendChild(span);
                div.style.cursor = "pointer";

                lectures.push(
                    {
                        batch: lecture.value,
                        date : date.value,
                        from : from.value,
                        to : to.value
                    }
                );

                setLectures([...lectures]);

                


                div.ondblclick = () => {
                    let divcomp = div.innerHTML.split("<span>");
                    let spanComp = divcomp[1].split("</span>")[0].split(" ");
                    console.log(spanComp);
                    lecture.value = divcomp[0];
                    date.value = spanComp[0];
                    from.value = spanComp[1];
                    to.value = spanComp[3];
                    div.remove()
                };

                teacher_lectures.appendChild(div);

                addTeacherData.lecture = "";
                addTeacherData.date = "";
                addTeacherData.from = "";
                addTeacherData.to = "";

                setAddTeacherData(addTeacherData);

                lecture.value = "";
                date.value = "";
                from.value = "";
                to.value = "";
            }
            
        } 
        addBtn.addEventListener("click" ,  addbtnListener);
        
        return () => {
            addBtn.removeEventListener("click" , addbtnListener)
        };

    });

        const doneBtnFunc = (e) => {
            
            e.preventDefault();


            let name = document.querySelector("#name");

            Axios.post("http://localhost:3001/addTeacher" , {name : name.value , lectures}).then((response) => {
                console.log(response.data);
            });




            if(name.value === ""){

                return;
            }
            let lectures_list = document.querySelector(".teacher-lectures");
            lectures_list.innerHTML = "";
            
            
            teachersData.push(
                {
                    name : name.value,
                    lectures : lectures
                }
                );
                
                
                setTeachersData([...teachersData]);
                
                
                name.value = "";
                setAddTeacherData({
                    name : "",
                    lecture : "" ,
                    date : "",
                    from : "",
                    to : ""
                });
                let empty = [];
                setLectures([...empty]);
        }

                const handleSearchInput = (e) => {
                    setSearch(e.target.value);
                }

                const handleInputs = (e) => {
                    let name = e.target.name;
                    let value = e.target.value;

                    setAddTeacherData({...addTeacherData , [name] : value});
                }

                let [addTeacherData , setAddTeacherData] = useState({
                    name : "",
                    lecture : "" ,
                    date : "",
                    from : "",
                    to : ""
                });

                
                return (
                        <>
                            <div className="search">
                                    <input type="text" autoComplete = "off" name="search" id="search-input" placeholder = "Search..." onChange = {handleSearchInput}/>
                                    <button className = "addTeacherBtn">Add Teacher</button>
                            </div>   
            
            {/*-------------------------------------- Add Teacher ------------------------------------------------------------*/}
                            <div className="addTeacherPopup" style = {{display : "none"}}> 
                                <div className="overlay"></div>
                                <form method="POST">
                                    <div className="close">close</div>
                                    <div id = "h2">Add Teacher</div>
                                    <input type="text" id = "name" autoComplete = "off"  name = "name" placeholder = "Enter Name" value = {addTeacherData.name} onChange ={handleInputs}  required/> <br />
                                    <div className="teacher-lectures">
                                    </div>
                                    <input type="text" autoComplete = "off" name = "lecture" id="lecture" value = {addTeacherData.lecture} placeholder = "Add Lecture" onChange ={handleInputs} /> <br />
                                    <input type="date" value = {addTeacherData.date} name="date" id="date" onChange ={handleInputs} /> <input type="time" value = {addTeacherData.from} name="from" id="from" onChange ={handleInputs} /> - <input type="time" value = {addTeacherData.to} name="to" id="to" onChange ={handleInputs} /> <button className="add" onClick = {(e) => {e.preventDefault()}}>Add</button> <br />
                                    <input type="submit" value="Done" className="done" onClick = {doneBtnFunc} />
                                </form>
                            </div>
            {/* ------------------------------------------------------------------------------- */}
            
                            <div className = "teachers">
                                {   
                                    teachersData.filter((val) => {
                                        if(search === ""){
                                            return val;
                                        }
                                        else if(val.name.toLowerCase().includes(search.toLowerCase())){
                                            return val;
                                        }
                                    }).map((oneTeacher , key)=> {
                                        return (<Teacher
                                            key = {key}
                                            teacherName = {oneTeacher.name}
                                            lectures = {oneTeacher.lectures}
                                        />);
                                    })
                                }
                            </div>
                            
                        </>
                    )
}


