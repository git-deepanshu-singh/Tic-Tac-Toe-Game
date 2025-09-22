let boxes = document.querySelectorAll(".box");
let reset_btn = document.querySelector("#reset-btn");
let new_btn = document.querySelector("#new-btn");
let msg_container = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");
let btnAudio = new Audio("/Audio_file/ting.mp3");
let winningAudio = new Audio("/Audio_file/winning-218995.mp3");
let newGameAudio = new Audio("/Audio_file/new_game.mp3");


reset_btn.addEventListener('click',()=>{
    enable_btn();
    msg_container.classList.add("hide");
});

new_btn.addEventListener('click',()=>{
    newGameAudio.play();
    enable_btn();
    msg_container.classList.add("hide");
    document.querySelector("#new-btn").classList.add("hide-new-btn");
    turn0 = true;
    reset_btn.disabled = false;
});



const enable_btn = ()=>{
    for(let box of boxes){
        box.disabled = false;
        box.innerText = "";
    }
}
const disabled_btn = ()=>{
    for(let box of boxes){
        box.disabled = true;
    }
}
const showWinner = (winner)=>{
    msg.innerText = `Congratulations, Winner is ${winner} 🎉`;
    winningAudio.play();
    msg_container.classList.remove("hide");
    setTimeout(()=>{
        document.querySelector("#new-btn").classList.remove("hide-new-btn");
    },2500)
    disabled_btn ();
    reset_btn.disabled = true;
}

let turn0 = true;

const winPatterns = [
    [0,1,2],
    [0,3,6],
    [0,4,8],
    [1,4,7],
    [2,5,8],
    [2,4,6],
    [3,4,5],
    [6,7,8]
];
boxes.forEach((box)=>{
    box.addEventListener('click',()=>{
        if(turn0){
            box.innerText = "O";
            turn0 = false;
        }
        else{
            box.innerText = "X";
            turn0 = true;
        }
        btnAudio.play();
        box.disabled = true;
        checkWinner();
    })
    
});
const checkWinner = ()=>{
    for(let pattern of winPatterns){
        let pos1val = boxes[pattern[0]].innerText;
        let pos2val = boxes[pattern[1]].innerText;
        let pos3val = boxes[pattern[2]].innerText;
        if(pos1val !="" && pos2val !="" && pos3val !=""){
            if(pos1val === pos2val && pos2val === pos3val){
                showWinner(pos1val); 
            }
        }
    }
};