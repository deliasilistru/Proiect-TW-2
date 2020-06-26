var myVar = setInterval(setColor, 3000);
 
function setColor() {
  var x = document.getElementsByClassName("container");
  var i;
for (i = 0; i < x.length; i++) {
  x[i].style.backgroundColor = x[i].style.backgroundColor == "rgb(230, 230, 230)" ? "white" : "rgb(230, 230, 230)" ;
}

}

 
function stopColor() {
  clearInterval(myVar);
}


setTimeout(function(){ alert("Cinematography is a writing with images in mouvement and with sounds."); }, 5000);