
window.addEventListener('DOMContentLoaded', (event) => {
    // ===== Variables =====
    var intro1 = document.getElementById("intro1");
    var intro2 = document.getElementById("intro2");
    var intro3 = document.getElementById("intro3");

    var start = document.getElementById("buttonStart");

    var article1 = document.getElementById("cubisme");
    var article2 = document.getElementById("nymphisme");
    var article3 = document.getElementById("feminisme");
    var article4 = document.getElementById("artiste");
    var article5 = document.getElementById("lesBiches");

    // ===== Introduction animation =====
    // appear(intro1);
    // setTimeout(() => {
    //     disappear(intro1);
    //   }, 4000)
    // setTimeout(() => {
    //     appear(intro2);
    // }, 5600)
    // setTimeout(() => {
    //     disappear(intro2);
    // }, 8000)
    // setTimeout(() => {
    //     appear(intro3);
    // }, 9000)
    // setTimeout(() => {
    //     start.style.letterSpacing = "4px";
    // }, 9000)
});


// ===== FUNCTIONS =====

function appear(target) {
    target.style.opacity = 1;
}

function disappear(target) {
    target.style.opacity = 0;
    setTimeout(() => {
    target.style.display = "none";
    }, 1700)
}

function triggerArticle(article) {
    article.style.display = "block";
}
