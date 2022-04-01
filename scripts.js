/////////////////
/// VARIABLES ///
/////////////////

const mainEntryUrl = "http://localhost:8000/api/v1/titles/";


/////////////////
/// FONCTIONS ///
/////////////////

// Création de la fenêtre pour les infos d'un film
function createMovie(MovieId) {
  let movie = document.getElementById("myMovie");
  let span = document.getElementsByClassName("close")[0];
  movie.style.display = "inline-table";
  fetch(mainEntryUrl + MovieId)
    .then(function(res) {
      if (res.ok) {
        return res.json();
      }
  })
    // Ouvre la fenêtre d'un film et affiche les informations du film à l'intérieur
    .then(function(data) {
  // Image du film
  let movie_img = document.getElementsByClassName("movie_img")[0];
  movie_img.innerHTML = "<p><img src='" +  data.image_url + "'></p>";
  let movie_info_el = document.getElementsByClassName("movie_infos");
  // Titre du film
  let title_li = document.createElement("li");
  title_li.innerHTML = "<em>Titre : </em>" + data.title;
  movie_info_el[0].appendChild(title_li);
  // Genre(s) du film
  let genres_li = document.createElement("li");
  genres_li.innerHTML = "<em>Genre(s) : </em>" + data.genres;
  movie_info_el[0].appendChild(genres_li);
  // Année de sortie du film
  let year_li = document.createElement("li");
  year_li.innerHTML = "<em>Année de sortie : </em>" + data.year;
  movie_info_el[0].appendChild(year_li);
  // Score IMBD du film
  let imdb_score_li = document.createElement("li");
  imdb_score_li.innerHTML = "<em>Score IMBD : </em>" + data.imdb_score + " étoiles";
  movie_info_el[0].appendChild(imdb_score_li);
  // Réalisateur(s) du film
  let directors_li = document.createElement("li");
  directors_li.innerHTML = "<em>Réalisateur(s) : </em>" + data.directors;
  movie_info_el[0].appendChild(directors_li);
  // Acteurs du film
  let actors_li = document.createElement("li");
  actors_li.innerHTML = "<em>Acteurs : </em>" + data.actors;
  movie_info_el[0].appendChild(actors_li);
  // Durée du film
  let duration_li = document.createElement("li");
  duration_li.innerHTML = "<em>Durée : </em>" + data.duration + " minutes";
  movie_info_el[0].appendChild(duration_li);
  // Résumé du film
  let description_li = document.createElement("li");
  description_li.innerHTML = "<em>Résumé : </em>" + data.description;
  movie_info_el[0].appendChild(description_li);
  
  // Ferme la fenêtre quand l'utilisateur clique sur "X", et efface les données.
  span.onclick = function() {
  movie.style.display = "none";
  let movie_img = document.getElementsByClassName("movie_img")[0];
  movie_img.innerHTML = "";
  let movie_data = document.getElementsByClassName("movie_infos")[0];
  movie_data.innerHTML = "";
  }

  // Ferme la fenêtre quand l'utilisateur clique en dehors de la fenêtre, et efface les données.
  window.onclick = function(event) {
  if (event.target == movie) {
    movie.style.display = "none";
    let movie_img = document.getElementsByClassName("movie_img")[0];
    movie_img.innerHTML = "";
    let movie_data = document.getElementsByClassName("movie_infos")[0];
    movie_data.innerHTML = "";  
      }
    }
  })

  // Afficher l'erreur
  .catch(function(error) {
    console.error('Error:', error);
  })
}


// Création de la fenêtre "meilleur film"
function showPreviewBestMovie(url) {
  fetch(url)
    .then(function(res) {
        if (res.ok) {
            return res.json();
        }
    })
    .then(function(data) {
    // Afficher l'image du film avec le meilleur score IBMD
    let best_movie_img = document.getElementById("best_movie_image");
    best_movie_img.innerHTML = "<p><img src='" +  data.image_url + "' ></p>";
    best_movie_img.setAttribute("data-id", data.id);
    best_movie_img.setAttribute("class", "imgPreview");
    best_movie_img.addEventListener("click", function() {
      createMovie(best_movie_img.dataset.id);
    })
    // Afficher le titre du film avec le meilleur score IBMD
    let best_movie_title = document.createElement("h1");
    // Afficher la description du film avec le meilleur score IBMD
    let best_movie_description = document.createElement("p");
    best_movie_title.innerText = data.title;
    best_movie_infos.appendChild(best_movie_title);
    best_movie_description.innerText = data.description;
    best_movie_infos.appendChild(best_movie_description);
    // Afficher le bouton permettant d'afficher les infos du meilleur film
    let btn = document.getElementsByClassName("button_infos_movie");
    btn[0].addEventListener("click", function () {
      createMovie(best_movie_img.dataset.id);
  })
    })
    // Afficher l'erreur
    .catch(function(error) {
      console.error('Error:', error);
  })
}


// Fonction asynchrone qui recherche l'url des images de films en fonction de leur position dans l'API et de leur genre 
async function getTopGenreFromPositionImgURL(position, genre) {
  var page;
  if (position < 5) {
    page = "";
  } else {
    page = "&page=" + Math.ceil(position / 5);
    position = (position % 5);
  }
  if (genre != "top") {
    genre = "&genre_contains=" + genre;
  } else{ genre = ""; }
  let response = await fetch(mainEntryUrl + "?sort_by=-imdb_score" + genre + "" + page);
  let data = await response.json();
  var movie_img_url = data.results[position].image_url;
  return movie_img_url;
  }


// Fonction asynchrone qui recherche l'id des films en fonction de leur position dans l'API et de leur genre 
async function getTopGenreFromPositionMovieId(position, genre) {
  var page;
  if (position < 5) {
    page = "";
  } else {
    page = "&page=" + Math.ceil(position / 5);
    position = (position % 5);
  }
  if (genre != "top") {
    genre = "&genre_contains=" + genre;
  } else{ genre = ""; }
  let response = await fetch(mainEntryUrl + "?sort_by=-imdb_score" + genre + "" + page);
  let data = await response.json();
  var movie_id = data.results[position].id;
  return movie_id;
  }


// Fonction asynchrone qui permet de faire bouger le caroussel
async function moveCarousel(genre, index) {
  let carouselParent = document.getElementsByClassName("parent_" + genre)[0];
  for (var i = 1; i < 5; i++){
    var card = carouselParent.children[0].children[parseInt(i)];
    var new_id = parseInt(card.id) + parseInt(index);
    if(new_id == -1){
      new_id = 10;
    } else if(new_id == 11){
      new_id = 0;
    }
    card.id = new_id;
    card.src = await getTopGenreFromPositionImgURL(parseInt(new_id), genre);
  }
}


// Fonction asynchrone qui permet de créer un caroussel
async function createCarousel(genre) {
  let carouselParent = document.getElementsByClassName("parent_" + genre)[0];
  let carouselDiv = document.createElement("div");
  carouselDiv.setAttribute("class", "carousel");
  carouselDiv.setAttribute("name", "carousel_" + genre);

  // Création du bouton de gauche
  let btn_left = document.createElement("button");
  btn_left.setAttribute("class","nav_button");
  btn_left.setAttribute("name","btn_left");
  btn_left.addEventListener('click', function() {
    moveCarousel(genre, 1);
  })
  let btn_img = document.createElement("img");
  btn_img.setAttribute("class","nav_button_img");
  btn_img.setAttribute("src", "img/left_btn.png");
  btn_left.appendChild(btn_img);
  carouselDiv.appendChild(btn_left);

  // Création d'une carte contenant chaque image pour en afficher 4
  for (var i = 0; i < 4; i++){
    let card = document.createElement("img");
    card.setAttribute("class","card");
    card.setAttribute("id",i);
    card.setAttribute("class", "imgPreview");
    card.setAttribute("src", await getTopGenreFromPositionImgURL(i, genre));
    card.setAttribute("data-id", await getTopGenreFromPositionMovieId(i, genre));
    carouselDiv.appendChild(card);
    card.addEventListener('click', function() {
      createMovie(card.dataset.id);
    })
  }

  // Création du bouton de droite
  let btn_right = document.createElement("button");
  btn_right.setAttribute("class","nav_button");
  btn_right.setAttribute("name","btn_right");
  btn_right.addEventListener('click', function() {
    moveCarousel(genre, -1);
  })
  let btn_img2 = document.createElement("img");
  btn_img2.setAttribute("class","nav_button_img");
  btn_img2.setAttribute("src", "img/right_btn.png");
  btn_right.appendChild(btn_img2);
  carouselDiv.appendChild(btn_right);
  carouselParent.appendChild(carouselDiv);
}


////////////
/// MAIN ///
////////////

function main() {
  // Bloc meilleur film
  fetch (mainEntryUrl + "?sort_by=-imdb_score")
  .then(function(res) {
    if (res.ok) {
        return res.json();
    }
  })
  .then(function(data) {
    let bestMovieUrl = data.results[0].url;
    showPreviewBestMovie(bestMovieUrl);
  })
  // Création du 1er caroussel (meilleurs films toutes catégories confondues)
  createCarousel("top");
  // Création du 2ème caroussel (meilleurs films d'action)
  createCarousel("action");
  // Création du 3ème caroussel (meilleurs films comique)
  createCarousel("comedy");
  // Création du 4ème caroussel (meilleurs films pour enfant)
  createCarousel("family");
  // Création du 5ème caroussel (meilleurs films d'horreur)
  createCarousel("horror");
}
main()