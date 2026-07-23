const output = document.getElementById("output");
let messageQueue = [];
let isTyping = false;


const bootMessages = [

"Booting Matrix OS...",
"Loading Kernel...",
"retina scan: 34%.........67%......98%...99%... OK",
"Tracing IP....Location Kenya.....Mombasa...",
"Connecting to you...",
"WELCOME, Operator .",
"Press Hack to continue......",

];


function printMessage(text){

    messageQueue.push(text);

    if(!isTyping){

        processQueue();

    }

}

function processQueue(){

    if(messageQueue.length === 0){

        isTyping = false;

        return;

    }

    isTyping = true;

    const text = messageQueue.shift();

    const line = document.createElement("div");

    output.appendChild(line);

    let i = 0;

    const typing = setInterval(function(){

        line.innerHTML =
            "> " +
            text.substring(0,i) +
            '<span class="cursor">█</span>';

        output.scrollTop = output.scrollHeight;

        i++;

        if(i > text.length){

            clearInterval(typing);

            line.innerHTML = "> " + text;

            setTimeout(processQueue,200);

        }

    },40);

}

function runProgress(task){

    let progress = 0;

    const line = document.createElement("div");

    output.appendChild(line);

    function update(){

        const total = 10;

        const filled = Math.floor(progress / 10);

        const empty = total - filled;

        const bar =
            "[" +
            "■".repeat(filled) +
            "□".repeat(empty) +
            "]";

        line.innerHTML =
            "> " +
            task +
            " " +
            bar +
            " " +
            progress + "%";

        output.scrollTop = output.scrollHeight;

        progress += 10;

        if(progress <= 100){

            setTimeout(update,120);

        }else{

            printMessage(task + " Complete.");

        }

    }

    update();

}




document.getElementById("startBtn").onclick=function(){

    for(let i = 0; i < bootMessages.length; i++){

        printMessage(bootMessages[i]);

    }

}


document.getElementById("hackBtn").onclick=function(){

    const tasks = [

        "Scanning Network...",
        "Decrypting Passwords...",
        "Downloading Secrets...",
        "Bypassing Firewall...",
        "Collecting Cookies..."

    ];

    const randomTask =
        tasks[Math.floor(Math.random()*tasks.length)];

    runProgress(randomTask);

}


document.getElementById("clearBtn").onclick=function(){

    output.innerHTML="";

}
/* ==========================
   MATRIX RAIN ANIMATION
========================== */

const canvas = document.getElementById("matrix");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const letters =
"ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*()*&^%アイウエオカキクケコサシスセソ";

const chars = letters.split("");

const fontSize = 16;

const columns = Math.floor(canvas.width / fontSize);

const drops = [];

for(let i = 0; i < columns; i++){

    drops[i] = 1;

}

function drawMatrix(){

    ctx.fillStyle = "rgba(0,0,0,0.05)";
    ctx.fillRect(0,0,canvas.width,canvas.height);

    ctx.fillStyle = "#00ff55";
    ctx.font = fontSize + "px monospace";

    for(let i = 0; i < drops.length; i++){

        const text = chars[Math.floor(Math.random()*chars.length)];

        ctx.fillText(text,i*fontSize,drops[i]*fontSize);

        if(drops[i]*fontSize > canvas.height && Math.random() > 0.975){

            drops[i] = 0;

        }

        drops[i]++;

    }

}

setInterval(drawMatrix,33);

window.addEventListener("resize",function(){

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

});
