const likeBtn = document.getElementById("likeBtn");
const dislikeBtn = document.getElementById("dislikeBtn");
const likeCount = document.getElementById("likeCount");
const dislikeCount = document.getElementById("dislikeCount");
const commentInput = document.getElementById("commentInput");
const submitBtn = document.getElementById("submitBtn");
const clearBtn = document.getElementById("clearBtn");
const commentsDisplay = document.getElementById("commentsDisplay");
const resetBtn = document.getElementById("resetBtn");

function getCookie(name) {
  const value = "; " + document.cookie;
  const parts = value.split("; " + name + "=");
  if (parts.length === 2) return parts.pop().split(";").shift();
}

function setCookie(name, value, days = 7) {
  const date = new Date();
  date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
  document.cookie = `${name}=${value}; expires=${date.toUTCString()}; path=/`;
}

function deleteCookie(name) {
  document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/`;
}
window.onload = function () {
  const savedLike = getCookie("likeCount");
  const savedDislike = getCookie("dislikeCount");
  const savedChoice = getCookie("choice");
  const savedComment = getCookie("comment");

  if (savedLike) likeCount.textContent = savedLike;
  if (savedDislike) dislikeCount.textContent = savedDislike;
  if (savedChoice === "like") likeBtn.disabled = true;
  if (savedChoice === "dislike") dislikeBtn.disabled = true;
  if (savedComment) commentsDisplay.innerHTML = `<p class="comment">${savedComment}</p>`;
};
likeBtn.onclick = function () {
  if (!getCookie("choice")) {
    let count = parseInt(likeCount.textContent);
    likeCount.textContent = count + 1;
    setCookie("likeCount", likeCount.textContent);
    setCookie("choice", "like");
    likeBtn.disabled = true;
  } else {
    alert("You already voted!");
  }
};

dislikeBtn.onclick = function () {
  if (!getCookie("choice")) {
    let count = parseInt(dislikeCount.textContent);
    dislikeCount.textContent = count + 1;
    setCookie("dislikeCount", dislikeCount.textContent);
    setCookie("choice", "dislike");
    dislikeBtn.disabled = true;
  } else {
    alert("You already voted!");
  }
};

submitBtn.onclick = function () {
  const comment = commentInput.value.trim();
  if (comment === "") return alert("Please write something!");
  if (!getCookie("comment")) {
    commentsDisplay.innerHTML = `<p class="comment">${comment}</p>`;
    setCookie("comment", comment);
    commentInput.value = "";
  } else {
    alert("You already submitted a comment!");
  }
};

clearBtn.onclick = function () {
  commentInput.value = "";
};

resetBtn.onclick = function () {
  deleteCookie("likeCount");
  deleteCookie("dislikeCount");
  deleteCookie("choice");
  deleteCookie("comment");
  likeCount.textContent = "0";
  dislikeCount.textContent = "0";
  commentsDisplay.innerHTML = "";
  likeBtn.disabled = false;
  dislikeBtn.disabled = false;
  alert("All data has been reset!");
};
