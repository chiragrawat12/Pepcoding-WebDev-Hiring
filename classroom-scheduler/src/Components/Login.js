import React from 'react';
import { useState , useEffect} from 'react';
import * as Axios from 'axios';

export default function Login() {
    
    let [message , setMessage] = useState("");
    const [user , setUser] = useState({
        username : "",
        password : ""
    });

    useEffect(()=>{
        Axios.get("http://localhost:3001/login").then((response) => {
            console.log(response.data);
            // if(response.data.loggedIn == true){
            // }
        });
    },[]);

    let name , value;
    const handleInputs = (e) => {
        name = e.target.name;
        value = e.target.value;

        setUser({...user , [name] : value});
    }


    Axios.default.withCredentials = true;

    const postUserData = (e) => {
        e.preventDefault()
        const username = user.username;
        const password = user.password;

        if(username!== "" && password !== ""){
            Axios.post("http://localhost:3001/login" , {
                username,
                password
            }).then((response) => {
                if(response.data.message !== undefined){
                    setMessage(response.data.message);
                }else{
                    setMessage("");
                }
                
            });
        }
        else{
            if(username=== "" && password === ""){
                alert("username and password field can't be empty!");
            }
            else if(username=== ""){
                alert("username field can't be empty!");
            }
            else if(password === ""){
                alert("password field can't be empty!");
            }
        }
    }
    
    return (
        <div>
            <div className="login">
                <legend>Login</legend>
                <form method = "POST" >
                    <div className="message">{message}</div>
                    <input type="text" name = "username" placeholder = "Enter Username"  autoComplete = "off" value = {user.username} required onChange  = {handleInputs}/>
                    <br />
                    <input type="password" name = "password" placeholder = "Enter password" value = {user.password} autoComplete = "off" required onChange = {handleInputs}/>
                    <br />
                    <input type="submit" value="Login" onClick = {postUserData} />
                </form>
            </div>
        </div>
    )
}
