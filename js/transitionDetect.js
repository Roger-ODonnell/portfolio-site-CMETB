console.log("Started script");
const transition = document.getElementsByClassName("enquire");

transition.addEventListener("transitionend", () => {
  console.log("Transition ended");
});