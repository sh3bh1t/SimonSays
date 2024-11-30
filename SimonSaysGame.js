let userseq=[];
let gameseq=[];

let btns=["red","green","yellow","orange"];

let h2=document.querySelector("h2");

let started=false;
let level=0;

//begining the game with 'any key to press'
document.addEventListener("keypress",function(){
    if(started==false){
        console.log("game started");
        started= true;
        levelup();
    }
});

//function to flash the buttons
function btnflash(btn){
    btn.classList.add("flash");
    setTimeout(function(){
        btn.classList.remove("flash");
    },250);
}

// function to level up the game with new sequence generation at each step
function levelup(){
    userseq=[];
    level++;
    h2.innerText=`level ${level}`;

    //choosing random button to flash for sequence generation
    let randomidx=Math.floor(Math.random() * 4);
    let randomcolor=btns[randomidx];
    let randbtn=document.querySelector(`.${randomcolor}`);
    gameseq.push(randomcolor);
    btnflash(randbtn);
}

function checkans(idx){
    if(userseq[idx]==gameseq[idx]){
        if(userseq.length==gameseq.length){
            console.log("correct ans for this level , now its time to level this shit up");
            setTimeout(levelup,1000);
        }
    }
    else{
        h2.innerText=`WRONG ANSWER MF!! TRY AGAIN BY PRESSING ANY KEY`;
        let body=document.querySelector("body");
        body.style.backgroundColor="red";
        setTimeout(function(){
            body.style.backgroundColor="white";
        },300);
        reset();
    }
}

function btnpress(){
    let btn=this;
    btnflash(btn);

    let usercolor=btn.getAttribute("id");
    userseq.push(usercolor);

    checkans(userseq.length-1);
}

let allbtns=document.querySelectorAll(".box");
for(btn of allbtns){
    btn.addEventListener("click",btnpress);
}

function reset(){
    userseq=[];
    gameseq=[];
    level=0;
    started=false;
}