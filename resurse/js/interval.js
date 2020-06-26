var idleTime = 0;
var div=document.querySelector(".afk");

var idleInterval = setInterval(timerIncrement, 60000); 

    document.onmousemove = function (e) {
        idleTime = 0;
        var div=document.querySelector(".afk");
        div.classList.remove("viz");

    };
    document.onkeydown = function (e) {
        idleTime = 0;
        var div=document.querySelector(".afk");
        div.classList.remove("viz");
    };

function timerIncrement() {
    idleTime = idleTime + 1;
    if (idleTime >= 5) {
        {
          var div=document.querySelector(".afk");
          var timp=document.querySelector(".time");
          timp.innerHTML = idleTime;
          div.classList.add("viz");
          console.log(timp.classList);
          console.log("Ma fut in sus");
        }
    }
}