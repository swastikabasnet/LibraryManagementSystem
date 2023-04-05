const popup = document.getElementById("popup");
const signupBtn = document.querySelector(".signup-btn");
const closeBtn = document.querySelector(".close-btn");

signupBtn.addEventListener("click", function() {
  popup.style.display = "flex";
});

closeBtn.addEventListener("click", function() {
  popup.style.display = "none";
});

window.addEventListener("click", function(e) {
  if (e.target === popup) {
    popup.style.display = "none";
  }
});