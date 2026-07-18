window.addEventListener("load", () => {
  const title = document.querySelector(".overlay h1");

  if (title) {
    setInterval(() => {
      title.style.textShadow =
        `0 0 ${Math.random() * 30 + 10}px cyan,
         0 0 ${Math.random() * 50 + 20}px #00ffff`;
    }, 500);
  }

  // Show intro then redirect to main page (no intro scrolling)
  // Slower intro display time (ms)
  setTimeout(() => {
    window.location.href = "../CodeIgniteMain/index.html";
  }, 4500);

});

