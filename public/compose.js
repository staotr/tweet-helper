
function toggleHideClass(el) {
  // check for hid in class list
  if (el.classList.hide) {
    console.log(el);
  }
}

window.onload = function() {
  var composeWindow = document.getElementById("compose");
  toggleHideClass(composeWindow);
}
