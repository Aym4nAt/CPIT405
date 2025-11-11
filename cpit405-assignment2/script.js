const jokeBox = document.getElementById('joke');
const jokeButton = document.getElementById('getJoke');

async function getJoke() {
  jokeBox.textContent = "Loading...";
  try {
    const response = await fetch('https://v2.jokeapi.dev/joke/Any');
    const data = await response.json();

    if (data.type === 'single') {
      jokeBox.textContent = data.joke;
    } else {
      jokeBox.textContent = `${data.setup} — ${data.delivery}`;
    }
  } catch (error) {
    jokeBox.textContent = "Failed to fetch a joke. Try again!";
  }
}

jokeButton.addEventListener('click', getJoke);
