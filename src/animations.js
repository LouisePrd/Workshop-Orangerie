window.addEventListener("DOMContentLoaded", (event) => {
  // ===== Variables =====
  // Intro pages
  var intro1 = document.getElementById("intro1");
  var intro2 = document.getElementById("intro2");
  var intro3 = document.getElementById("intro3");

  // Buttons
  var start = document.getElementById("buttonStart");
  // var back = document.querySelector(".back");

  // Articles
    let article1 = document.getElementById("cubisme");
    let article2 = document.getElementById("nymphisme");
    let article3 = document.getElementById("feminisme");
    let article4 = document.getElementById("artiste");
    let article5 = document.getElementById("lesBiches");

  // Back buttons
    var back1 = document.getElementById("back1");
    var back2 = document.getElementById("back2");
    var back3 = document.getElementById("back3");
    var back4 = document.getElementById("back4");
    var back5 = document.getElementById("back5");

  // Discover buttons
    var discover1 = document.getElementById("discover1");
    var discover2 = document.getElementById("discover2");
    var discover3 = document.getElementById("discover3");
    var discover4 = document.getElementById("discover4");
    var discover5 = document.getElementById("discover5");

  back1.addEventListener("click", (event) => {
    article1.style.top = "120vh";
    setTimeout(() => {
      article1.style.display = "none";
    }, 1000);
  });

  back2.addEventListener("click", (event) => {
    article2.style.top = "120vh";
    setTimeout(() => {
      article2.style.display = "none";
    }, 1000);
  });

  back3.addEventListener("click", (event) => {
    article3.style.top = "120vh";
    setTimeout(() => {
      article3.style.display = "none";
    }, 1000);
  });

  back4.addEventListener("click", (event) => {
    article4.style.top = "120vh";
    setTimeout(() => {
      article4.style.display = "none";
    }, 1000);
  });

  back5.addEventListener("click", (event) => {
    article5.style.top = "120vh";
    setTimeout(() => {
      article5.style.display = "none";
    }, 1000);
  });

  // Discover triggers
  discover1.addEventListener("click", (event) => {
    article1.style.top = "-100vh";
    article1.style.height = "auto";
    article1.style.overflowY = "auto";
  });
  discover2.addEventListener("click", (event) => {
    article2.style.top = "-100vh";
    article2.style.height = "auto";
    article2.style.overflowY = "auto";
  });
  discover3.addEventListener("click", (event) => {
    article3.style.top = "-100vh";
    article3.style.height = "auto";
    article3.style.overflowY = "auto";
  });
  discover4.addEventListener("click", (event) => {
    article4.style.top = "-100vh";
    article4.style.height = "auto";
    article4.style.overflowY = "auto";
  });
  discover5.addEventListener("click", (event) => {
    article5.style.top = "-100vh";
    article5.style.height = "auto";
    article5.style.overflowY = "auto";
  });

  // ===== Introduction animation =====

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
