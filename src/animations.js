

window.addEventListener('DOMContentLoaded', (event) => {
    // Variables
    var intro1 = document.getElementById("intro1");
    var intro2 = document.getElementById("intro2");
    var intro3 = document.getElementById("intro3");
    var start = document.getElementById("buttonStart");

    appear(intro1);
    setTimeout(() => {
        disappear(intro1);
      }, 4000)
    setTimeout(() => {
        appear(intro2);
    }, 5600)
    setTimeout(() => {
        disappear(intro2);
    }, 8000)
    setTimeout(() => {
        appear(intro3);
    }, 9000)
    setTimeout(() => {
        start.style.letterSpacing = "4px";
    }, 9000)
});

function appear(target) {
    target.style.opacity = 1;
}

function disappear(target) {
    target.style.opacity = 0;
}