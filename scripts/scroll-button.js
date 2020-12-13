document.addEventListener("DOMContentLoaded", function (event) {
  var scrollButton = document.getElementById("scroll-button");

  if (scrollButton) {
    scrollButton.addEventListener("click", () =>
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      })
    );
  }
});
