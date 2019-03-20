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
    var urlTag = document.createElement("p");
    var postContent = document.createTextNode(item.content);
    var urlContent = document.createTextNode(item.url);
    var copyButton = document.createElement("button");
    var copyText = document.createTextNode("Copy");

    // insert data into elements
    postContainer.setAttribute("id", item._id);
    postContainer.setAttribute("data-content", item.content);
    postContainer.setAttribute("class", "item-container");
    postContainer.setAttribute("data-url", item.url);
    postDiv.setAttribute("class", "item");
    postTag.setAttribute("class", "item-text");
    urlTag.setAttribute("class", "item-url");
    postTag.appendChild(postContent);
    urlTag.appendChild(urlContent);
    copyButton.appendChild(copyText);
    copyButton.setAttribute("class", "btn-primary copy-button");
    copyButton.setAttribute("onclick", "copyData(this)");
    postDiv.appendChild(postTag);
    postDiv.appendChild(urlTag);
    postDiv.appendChild(urlTag);
    postDiv.appendChild(copyButton);
    postContainer.appendChild(postDiv);
    // insert into dom

    // filter posts and append to correct section
    app.appendChild(postContainer);
  });
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
}
