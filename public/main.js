/*
  Checks for elements in list
*/

function toggleFlexClass(el) {
  // check for hide in class list
  if (el.classList.contains("flex")) {
    el.classList.remove("flex");
    return
  }
  el.classList.add("flex");
}

function toggleHideClass(el) {
  // check for hide in class list
  if (el.classList.contains("hide")) {
    el.classList.remove("hide");
    return
  }
  el.classList.add("hide");
}



/*
  Grabs text from parent div.
*/
function copyData(btn) {
  var content = btn.parentNode.dataset.content;
  var url = btn.parentNode.dataset.url;
  var post = content + "\n\n" + url;

  navigator.clipboard.writeText(post).then(function() {
    alert("Copied to clipbaord!");
  }, function() { alert("Unable to copy to clipboard! :/"); });
}
/*
  Function handles creation and insertion of tweets
*/
function insertFeatures(app, obj) {
  obj.forEach(function(item) {
    // Create elements
    var postContainer = document.createElement("div");
    var postDiv = document.createElement("div");
    var postTag = document.createElement("p");
    var urlLink = document.createElement("a");
    var urlTag = document.createElement("div");
    var postContent = document.createTextNode(item.content);
    var urlContent = document.createTextNode(item.url);
    var copyButton = document.createElement("button");
    var copyText = document.createTextNode("Copy");
    var indicatorContainer = document.createElement("div");
    var indicator = document.createElement("div");

    // insert data into elements
    indicatorContainer.setAttribute("class","indicator-container");
    indicator.setAttribute("class","indicator");
    indicatorContainer.appendChild(indicator);
    postDiv.appendChild(indicatorContainer);
    postDiv.setAttribute("id", item._id);
    postDiv.setAttribute("data-content", item.content);
    postContainer.setAttribute("class", "item-container");
    postDiv.setAttribute("data-url", item.url);
    postDiv.setAttribute("class", "item");
    postTag.setAttribute("class", "item-text");
    urlTag.setAttribute("class", "item-url");
    urlLink.setAttribute("href", item.url);
    urlTag.appendChild(urlLink);
    postTag.appendChild(postContent);
    urlLink.appendChild(urlContent);
    copyButton.appendChild(copyText);
    copyButton.setAttribute("class", "btn-primary copy-button");
    copyButton.setAttribute("onclick", "copyData(this)");
    postDiv.appendChild(postTag);
    postDiv.appendChild(urlTag);
    postDiv.appendChild(urlTag);
    postDiv.appendChild(copyButton);
    postContainer.appendChild(postDiv);
    // insert into dom

    // filter posts and color correct
    if (item.site == "medium") {
      indicator.style.background = "#1AA77D";
    }
    else if (item.site == "playbook") {
      indicator.style.background = "#222222";
    }
    else {
      indicator.style.background = "#931C20";
    }
    app.appendChild(postContainer);
  });
}

/*****************************************************
******************************************************
DATABASE INTERACTIONS
******************************************************
*****************************************************/

function insertTweet() {
  const http = new XMLHttpRequest()
  const method = "POST"
  const url = "/post"

  // get tweet information

  http.open(method, url, true);

  // set json header
  xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

  http.onreadystatechange = function() {

  }

  http.send();
}

/*
Loads data and commences action of inserting divs upon successful load
*/

function loadData() {
  const http = new XMLHttpRequest()
  const method = "GET"
  const url = "/posts"

  http.open(method, url, true);
  http.onreadystatechange = function() {
    if (http.readyState === 4 && http.status === 200) {
      var obj = JSON.parse(http.responseText);
      // if positive load data on dom otherwise report to console and visual error;
      if (obj.message === undefined) {
        // insert data into dom
        var appDom = document.getElementById("action-section");
        insertFeatures(appDom, obj);
      } else {
        console.log(obj);
      }
    }
  }
  http.send()
}

window.onload = function() {
  loadData();

  // Create event listeners for compose lightbox
  var composeWindow = document.getElementById("compose");
  var composeLink = document.getElementById("compose-enter");
  var composePad = document.getElementById("compose-exit-pad");
  var modalElements = [composePad, composeLink];
  modalElements.forEach(function (el) {
    el.addEventListener("click", function() {
        toggleHideClass(composeWindow);
        toggleFlexClass(composeWindow);
    });
  });

}
