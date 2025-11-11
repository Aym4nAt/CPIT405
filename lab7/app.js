// ====== Config ======
const ACCESS_KEY = "hZpMu6kB-JqFLgMif65h4v8N76nCecLntBcI2dIwTmA";
const BASE_URL = "https://api.unsplash.com/search/photos";

// ====== DOM ======
const qInput = document.getElementById("queryInput");
const grid = document.getElementById("grid");
const statusEl = document.getElementById("status");

const btnXHR   = document.getElementById("btn-xhr");
const btnFetch = document.getElementById("btn-fetch");
const btnAsync = document.getElementById("btn-async");

// ====== Helpers ======
function setStatus(msg) { statusEl.textContent = msg || ""; }

function renderImages(photos) {
  grid.innerHTML = "";
  if (!photos || photos.length === 0) {
    grid.innerHTML = "<p>No results.</p>";
    return;
  }
  photos.forEach(p => {
    const url = p.urls && (p.urls.small || p.urls.regular);
    const alt = p.alt_description || "Unsplash Photo";
    const author = p.user && p.user.name ? p.user.name : "Unknown";

    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `
      <img src="${url}" alt="${alt}" loading="lazy"/>
      <div class="caption">${author}</div>
    `;
    grid.appendChild(card);
  });
}

function buildUrl(query) {
  const u = new URL(BASE_URL);
  u.searchParams.set("query", query);
  u.searchParams.set("per_page", "9");
  return u.toString();
}

// ====== 1) XHR ======
function searchWithXHR(query) {
  setStatus("Loading (XHR)...");
  const url = buildUrl(query);
  const xhr = new XMLHttpRequest();
  xhr.open("GET", url, true);
  xhr.setRequestHeader("Authorization", `Client-ID ${ACCESS_KEY}`);
  xhr.onload = function () {
    try {
      if (xhr.status >= 200 && xhr.status < 300) {
        const data = JSON.parse(xhr.responseText);
        renderImages(data.results);
        setStatus("");
      } else {
        setStatus(`XHR error: ${xhr.status} ${xhr.statusText}`);
      }
    } catch (e) {
      setStatus("XHR parse error.");
      console.error(e);
    }
  };
  xhr.onerror = function () {
    setStatus("Network error (XHR).");
  };
  xhr.send();
}

// ====== 2) Fetch + Promises ======
function searchWithFetch(query) {
  setStatus("Loading (fetch + promises)...");
  const url = buildUrl(query);
  fetch(url, { headers: { Authorization: `Client-ID ${ACCESS_KEY}` } })
    .then(res => {
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      return res.json();
    })
    .then(json => {
      renderImages(json.results);
      setStatus("");
    })
    .catch(err => {
      console.error(err);
      setStatus(`Fetch error: ${err.message}`);
    });
}

// ====== 3) Fetch + Async/Await ======
async function searchWithAsync(query) {
  try {
    setStatus("Loading (async/await)...");
    const url = buildUrl(query);
    const res = await fetch(url, { headers: { Authorization: `Client-ID ${ACCESS_KEY}` } });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const json = await res.json();
    renderImages(json.results);
    setStatus("");
  } catch (err) {
    console.error(err);
    setStatus(`Async error: ${err.message}`);
  }
}

// ====== Events ======
btnXHR.addEventListener("click", () => searchWithXHR(qInput.value.trim() || "Makkah"));
btnFetch.addEventListener("click", () => searchWithFetch(qInput.value.trim() || "Makkah"));
btnAsync.addEventListener("click", () => searchWithAsync(qInput.value.trim() || "Makkah"));

// Enter to search with async/await by default
qInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") searchWithAsync(qInput.value.trim() || "Makkah");
});
