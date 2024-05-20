let genres = [];
let movies = {};
let watchlistedMovies = [];
let clickCount = 0;
let categoryClickCount = 0;

window.onload = function () {
  loadMovies();
  loadGenres();
};

function AddWatchList(movie){
  watchlistedMovies.push(movie);
  alert(movie.Title);
}

function count(arr, element) {
  let count = 0;
  arr.forEach((item) => {
    if (item === element) {
      count++;
    }
  });
  return count;
}

function loadGenres() {
  const fileUrl = "jsons/genres.json";
  fetch(fileUrl)
    .then((response) => {
      if (!response.ok) {
        throw new Error("HTTP Error: " + response.status);
      }

      return response.json();
    })
    .then((data) => {
      for (let i = 0; i < 39; i++) {
        const element = data[i];
        if (count(genres, element) == 0) {
          let content = `
          <p onclick="categoryClicked(id)" id = "${element}">${element}</p>
          `;
          let section = document.getElementById("aside");
          section.innerHTML += content;
          genres.push(element);
        }
      }
    })
    .catch((error) => {
      alert(error);
    });
}

function loadMovies() {

  if (clickCount == 0) {
    let section = document.getElementById("main");
    section.innerHTML ="";
  
    const fileUrl = "jsons/Film.JSON";
    fetch(fileUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error("HTTP Error: " + response.status);
        }

        return response.json();
      })
      .then((data) => {
        for (let i = 0; i < 50; i++) {
          const element = data[i].Poster;
          let content = `
        <div class="card">
        <img src=${element} >
        <div class="descriptions">
            <h1>${data[i].Title}</h1>
            <p>
              ${data[i].Plot}
            </p>
            <button class = "watchlist" onclick = "AddWatchList(${data[i]})">
              <i class="fa-solid fa-plus"></i>
            </button>
        </div>
    </div>
      `;
          section.innerHTML += content;
        }
      })
      .catch((error) => {
        alert(error);
      });
      clickCount++;
      categoryClickCount = 0;

  }
}

function SendRequest(method, url, body = null) {
  return fetch(url).then((r) => {
    return r.json();
  });
}



function SearchMovie() {
  let movieTitle = document.getElementById("search").value;
  let section = document.getElementById("main");
  section.innerHTML ="";
  let url = `http://www.omdbapi.com/?apikey=ddee1dae&s=${movieTitle}&plot=full`;
  SendRequest("GET", url)
    .then((data) => {
      if (data.Search) {
        data.Search.forEach((movie) => {
          let content = `
          <div onclick ="clickkkkk()" class="card">
          <img src=${movie.Poster} >
          <div class="descriptions">
              <h1>${movie.Title}</h1>
              <p>
                ${movie.Plot}
              </p>
              <button class = "watchlist" onclick = "AddWatchList(${movie})">
                <i class="fa-solid fa-plus"></i>
              </button>
          </div>
      </div>
        `;
          
          section.innerHTML += content;
        });
      }
    })
    .catch((e) => console.log(e));
}




function categoryClicked(id) {
  if(categoryClickCount==0){
    const category = document.getElementById(id).innerHTML;
    let section = document.getElementById("main");
    section.innerHTML ="";
  
    const fileUrl = "jsons/Film.JSON";
    fetch(fileUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error("HTTP Error: " + response.status);
        }
  
        return response.json();
      })
      .then((data) => {
        for (let i = 0; i < 50; i++) {
          const genres = data[i].Genre;
          if (genres.includes(category)) {
            const element = data[i].Poster;
            let content = `
              <div class="card">
              <img src=${element} >
              <div class="descriptions">
                  <h1>${data[i].Title}</h1>
                  <p>
                    ${data[i].Plot}
                  </p>
                  <button class = "watchlist" onclick = "AddWatchList(${data[i]})">
                   <i class="fa-solid fa-plus"></i>
                </button>
              </div>
          </div>
            `;
  
            section.innerHTML += content;
          }
        };
      })
      .catch((error) => {
        alert(error);
      });
      clickCount = 0;
  }
}

