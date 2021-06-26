let nav = 0;
// let clicked = null; 
const weekdays = ['Sunday' , 'Monday' , 'Tuesday' , 'Wednesday' , 'Thursday' , 'Friday' , 'Saturday']

function load(){
    const dt = new Date();

    const curDay = dt.getDate();
    const curMonth = dt.getMonth();
    const curYear = dt.getFullYear();

    if(nav != 0){
        dt.setMonth(dt.getMonth() + nav);
    }
    
    const day = dt.getDate();
    const month = dt.getMonth();
    const year = dt.getFullYear();

    const firstDayOfMonth = new Date(year , month , 1);
    const dateString = firstDayOfMonth.toLocaleDateString('en-us' , {
        weekday: 'long',
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
    });

    const daysInmonth = new Date(year , month + 1 , 0).getDate();
    const paddingDays = weekdays.indexOf(dateString.split(", ")[0]);

    document.querySelector(".display-month-year > p").innerText = `${dt.toLocaleDateString("en-us" , {month : 'long'})} ${year}`;

    clearCalender();

    let k = 0;
    for(let i = 1 ; i <= paddingDays + daysInmonth ; i++){
        if(k === 7){
            k = 0;
    }
    
        let weekday = document.getElementById(`${weekdays[k]}`);
        k++;
        if(i <= paddingDays){
            let emptyDate = document.createElement("div");
            emptyDate.classList.add("empty-date");
            weekday.appendChild(emptyDate);
        }
        else{
            let date = document.createElement("div");
            date.classList.add("date");
            if(day === (i-paddingDays) && curDay === day && curMonth === month && curYear === year){
                date.id = "today"
            }
            date.innerText = `${i - paddingDays}`;

            date.addEventListener("click" , () => {
                console.log(date.innerText , year , month);
            });

            weekday.appendChild(date);
        }
    }
}

load();

if(window.outerWidth < 660){
    hideUnHide();
    hideAllDivs();
}

function hideAllDivs(){
    for(let i = 0 ; i < weekdays.length ; i++){
        let name = document.getElementById(weekdays[i]);
        name.style.display = "none";
    }
}

function expandAllDivs(){
    for(let i = 0 ; i < weekdays.length ; i++){
        let name = document.getElementById(weekdays[i]);
        name.style.display = "block";
    }
}


function checkClick(){
    if(window.outerWidth > 660){
        for(let i = 0 ; i < weekdays.length ; i++){
            let name = document.getElementById(weekdays[i]);
            name.style.display = "block";
            name.removeEventListener("click" , () =>{weeknameClick(name)});
        }
    }
    else{
        hideAllDivs();
    }
}

function weeknameClick(weekContent){
    if(weekContent.style.display === "none"){
        weekContent.style.display = "block";
    }else{
        weekContent.style.display = "none";
    }
}

function hideUnHide(){
    let weekNames = document.querySelectorAll(".weekday-name");
    for(let i = 0 ; i < weekNames.length ; i++){
        let weekName = weekNames[i];
        
        let weekContent = document.querySelector("#" + weekName.innerHTML);
        
        
        weekName.addEventListener("click" ,()=>{       
            weeknameClick(weekContent);
        });
    }
    checkClick();
}
var media = window.matchMedia("(max-width: 660px)");
media.addEventListener("change" , hideUnHide);


let expand =  document.getElementById("expand");
expand.addEventListener("click" , function(){
    if(expand.innerText == "Expand"){
        expandAllDivs();
        expand.innerText = "Collapse";
    }
    else{
        hideAllDivs();
        expand.innerText = "Expand";
    }
});

function clearCalender() {
    for(let i = 0 ; i < weekdays.length ; i++){
        let name = document.getElementById(weekdays[i]);
        name.innerHTML = ``;
    }
}

function initNextPrev(){
    let next = document.getElementById("next");
    let prev = document.getElementById("prev");

    next.addEventListener("click" , () => {
        nav++;
        load();
    });

    prev.addEventListener("click" , () => {
        nav--;
        load();
    });
}

initNextPrev();