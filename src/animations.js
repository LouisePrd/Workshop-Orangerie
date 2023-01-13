window.addEventListener("DOMContentLoaded", (event) => {
  // ===== Variables =====
  // Intro pages
  var intro1 = document.getElementById("intro1");
  var intro2 = document.getElementById("intro2");
  var intro3 = document.getElementById("intro3");

  // Buttons
  var start = document.getElementById("buttonStart");
  var back = document.getElementById("back");

  // Articles
  let article1 = document.getElementById("cubisme");
  let article2 = document.getElementById("nymphisme");
  let article3 = document.getElementById("feminisme");
  let article4 = document.getElementById("artiste");
  let article5 = document.getElementById("lesBiches");

  back.addEventListener("click", (event) => {
    article1.style.top = "120vh";
    article2.style.top = "120vh";
    article3.style.top = "120vh";
    article4.style.top = "120vh";
    article5.style.top = "120vh";

    setTimeout(() => {
      article1.style.display = "none";
      article2.style.display = "none";
      article3.style.display = "none";
      article4.style.display = "none";
      article5.style.display = "none";
    }, 2000);
  });

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
  }, 1700);
}

function triggerArticle(article) {
  article.style.display = "block";
  setTimeout(() => {
    article.style.top = "0";
  }, 100);
}
