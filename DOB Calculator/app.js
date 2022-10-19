

//displaying errors when element is on focus

window.onmousemove = ()=>{for (let i = 0; i < $('.error').length; i++){validity(i)}}
window.onkeyup = ()=>{for (let i = 0; i < $('.error').length; i++){validity(i)}}

function validity(i) {
    //check if empty and if values meet the expected
    var sex = [`male`,`female`]
    var error_messages=[`male <b>or</b> female`,`0 < <b>Date</b> < 31`,`0 < <b>Month</b> < 12`, `1752 < <b>Year </b>< 2100`];    
    if (! sex.includes($('input')[0].value) ) { 
        g=false;errors(0,"red",error_messages[0]) ;                        
    } else{g=true;errors(0,"green","")}
    if (($('input')[1].value >31) || ($('input')[1].value <1)){
        d=false; errors(1,"red",error_messages[1])                              
    } else{d=true;errors(1,"green","")}
    if (($('input')[2].value >12) || ($('input')[2].value <1)){
        m=false;errors(2,"red",error_messages[2])                                
    } else{m=true;errors(2,"green","")}
    if (($('input')[3].value >2100) || ($('input')[3].value <1752)){
        y=false;errors(3,"red",error_messages[3])                
    } else{y=true;errors(3,"green","")} 
    if (g==true && d==true && m==true && y==true ) {
        document.getElementById("submit").disabled = false;
        document.getElementById("submit").style.cursor = "pointer"
    }else{
        document.getElementById("submit").disabled = true;
        document.getElementById("submit").style.cursor = "no-drop"
    }
    $('input')[i].onblur =()=>{$('.error')[i].style.opacity = 0;}
    $('input')[i].onfocus=()=>{$('.error')[i].style.opacity = 1;} 
    }   

    //animating errors displayd
    var errors=(i,color,error,submitable)=>{
        $('input')[i].style.border=`1px solid ${color}`
        $('.error')[i].innerHTML = error;        
        $('.error')[i].style.color = color;
        
    }
    
//main function to calculate age
function start(){ 
    sideScroll('right');
    //variable declararion
    var date =parseInt($("#date").val());
    var month=parseInt($("#month").val());
    var centuary = parseInt( $("#year").val().slice(0, 2));
    var year = parseInt($("#year").val().slice(2, 4));
    gender = $('#gender').val().toLowerCase();    
    //calculating
    const months = ["January","February","March","April","May","June","July","August","September","October","November","December"]
    var MM = (months[month-1]);
    var name, sup = document.getElementById("sup");
    const days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];  
    const male_names = ["Kwasi","Kwadwo","Kwabena","Kwaku","Yaw","Kofi","Kwame"]    
    const female_names = ["Akosua","Adwoa","Abenaa","Akua","Yaa","Afua","Ama"]  
    /*Truncuting to eliminate decimal points*/count =Math.trunc((Math.trunc(Math.trunc(centuary/4) - 2*centuary-1) + Math.trunc(5 * year/4) + Math.trunc(26*(month+1)/10))+date) % 7
    /*if statement*/    
    /*i noticed an error when count was a negative value...thus to avoid this
    the error comes from inaccuracy in the formula and cant be ignored
    it would lead to the wrong prediction(definately) which i have assumed
    to check value of count each and every time,type
    console.log(count);
    */
    if (count <0 ) {
        gender == "male" ? name = male_names[Math.abs(count)] : name = female_names[Math.abs(count)] 
        weekday = days[Math.abs(count)]         
    }else{
        gender == "male" ? name = male_names[count] : name = female_names[count] 
        weekday = days[count]
    }
             
    //console.log(name);  //sideScroll('right')
    var results = ["",name,gender,weekday,date,MM,centuary,year]   
    switch (date) {                    
        case 1,11,21,31:sup.innerHTML = "st";break
        case 2,12,22:sup.innerHTML = "nd";break; 
        case 3,13,23:sup.innerHTML = "rd";break; 
        default:sup.innerHTML = "th";break;
    }for (let i = 1; i <= $('.result').length; i++) {
        ($('.result')[i]).innerHTML = results[i];  
    }}
//scrolling effect
var wrapper = document.getElementById('container');
function sideScroll(direction,distance,step){
scrollAmount = 0;
distance = 820;
step =82;
var slideTimer = setInterval(function(){
    direction == 'left'? wrapper.scrollLeft -= step:wrapper.scrollLeft += step;
    scrollAmount += step;
    if(scrollAmount >= distance){
        window.clearInterval(slideTimer);
    }
    }, 20);
}