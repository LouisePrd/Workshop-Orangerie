
window.addEventListener('DOMContentLoaded', (event) => {
    // ===== Variables =====
    // Intro pages
    var intro1 = document.getElementById("intro1");
    var intro2 = document.getElementById("intro2");
    var intro3 = document.getElementById("intro3");

    // Buttons
    var start = document.getElementById("buttonStart");
    var back = document.getElementById("back");

    // Articles
    let allArticles = document.getElementsByClassName("article");

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

    // ===== Articles animation =====
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
    setTimeout(() => {
    article.style.top = "0";
    }, 100);
}
