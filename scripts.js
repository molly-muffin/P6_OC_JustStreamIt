const mainEntryUrl = "http://localhost:8000/api/v1/titles/";
let movie_image_url = "";
let movie_datas = [];
let movie_datas_html = [];
let movies_instances = [];


function createFilm(filmId) {
    let film = document.getElementById("myFilm");
    let span = document.getElementsByClassName("close")[0];
    film.style.display = "block";

    fetch(mainEntryUrl + filmId)
      .then(function(res) {
        if (res.ok) {
            return res.json();
        }
    })
      .then(function(data) {

        //Ouvre la fenêtre filme et copie les informations du film à l'intérieur.
    let film_img_el = document.getElementsByClassName("film_img")[0];
    film_img_el.innerHTML = "<p><img src='" +  data.image_url + "'></p>";
    let film_info_el = document.getElementsByClassName("film_infos");

    let title_li = document.createElement("li");
    title_li.innerHTML = "<em>Titre : </em>" + data.title;
    film_info_el[0].appendChild(title_li);

    let genres_li = document.createElement("li");
    genres_li.innerHTML = "<em>Genre(s) : </em>" + data.genres;
    film_info_el[0].appendChild(genres_li);

    let year_li = document.createElement("li");
    year_li.innerHTML = "<em>Date de sortie : </em>" + data.published;
    film_info_el[0].appendChild(year_li);

    let imdb_score_li = document.createElement("li");
    imdb_score_li.innerHTML = "<em>Score IMBD : </em>" + data.imdb_score;
    film_info_el[0].appendChild(imdb_score_li);

    let directors_li = document.createElement("li");
    directors_li.innerHTML = "<em>Réalisateur(s) : </em>" + data.directors;
    film_info_el[0].appendChild(directors_li);

    let actors_li = document.createElement("li");
    actors_li.innerHTML = "<em>Acteurs : </em>" + data.actors;
    film_info_el[0].appendChild(actors_li);

    let duration_li = document.createElement("li");
    duration_li.innerHTML = "<em>Durée : </em>" + data.duration + " minutes.";
    film_info_el[0].appendChild(duration_li);

    let country_li = document.createElement("li");
    country_li.innerHTML = "<em>Pays d'origine : </em>" + data.country_li;
    film_info_el[0].appendChild(country_li);

    let box_office_results = document.createElement("li");
    box_office_results.innerHTML = "<em>Box-office : </em>" + data.worldwide_gross_income;
    film_info_el[0].appendChild(box_office_results);

    let description_li = document.createElement("li");
    description_li.innerHTML = "<em>Résumé : </em>" + data.description;
    film_info_el[0].appendChild(description_li);

    // Ferme la fenêtre quand l'utilisateur clique sur "X", et efface les données.
    span.onclick = function() {
    film.style.display = "none";
    let film_img = document.getElementsByClassName("film_img")[0];
    film_img.innerHTML = "";
    let film_data = document.getElementsByClassName("film_infos")[0];
    film_data.innerHTML = "";
    }

      // Ferme la fenêtre quand l'utilisateur clique en dehors de la fenêtre, et efface les données.
    window.onclick = function(event) {
    if (event.target == film) {
      film.style.display = "none";
      let film_img = document.getElementsByClassName("film_img")[0];
      film_img.innerHTML = "";
      let film_data = document.getElementsByClassName("film_infos")[0];
      film_data.innerHTML = "";  
        }
      }
  })
    .catch(function(error) {
      console.error('Error:', error);
  });
};


// Création de la fenêtre "meilleur film"
function showPreviewBestMovie(url) {
  fetch(url)
      .then(function(res) {
          if (res.ok) {
              return res.json();
          }
      })
      .then(function(data) {
      let best_movie_img = document.getElementById("best_movie_image");

      best_movie_img.innerHTML = "<p><img src='" +  data.image_url + "' ></p>";
      best_movie_img.setAttribute("data-id", data.id);

      let best_movie_infos = document.getElementById("best_movie_infos");
      let best_movie_title = document.createElement("h1");
      let best_movie_description = document.createElement("p");

      best_movie_title.innerText = data.title;
      best_movie_infos.appendChild(best_movie_title);

      best_movie_description.innerText = data.description;
      best_movie_infos.appendChild(best_movie_description);

      let btn = document.getElementsByClassName("button_infos_film");
      btn[0].addEventListener("click", function () {
      createFilm(best_movie_img.dataset.id);
    })
      })
      .catch(function(error) {
        console.error('Error:', error);
    })
  };
  

// Création d'une image preview pour le caroussel.
function showPreview(endUrl, indice, containerId) {
fetch(mainEntryUrl + endUrl)
  .then(function(res) {
    if (res.ok) {
        return res.json();
    }
  })
  .then(function(data) {   
    let caroussel_content = document.getElementsByClassName(containerId)[0];
    let film_img = document.createElement("li");
    
    film_img.innerHTML = "<p><img src='" +  data.results[indice].image_url + "'></p>";
    film_img.setAttribute("data-id", data.results[indice].id);
    film_img.setAttribute("class", "imgPreview");
    caroussel_content.appendChild(film_img);
    
    film_img.addEventListener("click", function() {
      createFilm(film_img.dataset.id)
    })
  })
  .then(() => {
      let carrousel = document.getElementsByClassName(containerId)[0].childNodes;
        carrousel.forEach(function (currentValue, currentIndex) {
      currentValue.setAttribute("data-carousselPlace", currentIndex)

      if (currentIndex < 4) {
        currentValue.style.display = "block"
      } else {
        currentValue.style.display = "none"
      }
    })
    
  })
  .catch(function(error) {
      console.log(error);
    }); 
}


function createCarousselSection(endUrl1, endUrl2, containerId) {

    // Création des sections d'images
    for (let movie = 0; movie < 5; movie++) {
      showPreview(endUrl1, movie, containerId)
    }
  
    for (let movie = 0; movie < 2; movie++) { 
      showPreview(endUrl2, movie, containerId)
    }
}

// Gérer les flèche droite /gauche
var arrow_right = document.getElementsByClassName('right')
var arrow_left = document.getElementsByClassName('left')

for(var i=0; i < arrow_right.length; i++){
  arrow_right[i].addEventListener('click', function() {
    turn_right(this)
  })
  arrow_left[i].addEventListener('click', function() {
    turn_left(this)
  })
}


function turn_right(arrow_right){
    let divParent = arrow_right.parentElement
  let divCarrousel = divParent.getElementsByTagName('div')[0]
  let figures = divParent.getElementsByClassName('imgPreview')
  for(var i = 0; i < figures.length; i++){
    figures[i].dataset['carousselplace'] = (figures[i].dataset['carousselplace'] + 6 ) % 7
  }
  refreshCarrousel(divCarrousel)
}


function turn_left(arrow_left){
    let divParent = arrow_left.parentElement
  let divCarrousel = divParent.getElementsByTagName('div')[0]
  let figures = divParent.getElementsByClassName('imgPreview')
  for(var i = 0; i < figures.length; i++){
    figures[i].dataset['carousselplace'] = (figures[i].dataset['carousselplace'] + 1) % 7
  }
  refreshCarrousel(divCarrousel)
}


function refreshCarrousel(carrousel){
  figures = carrousel.getElementsByClassName('imgPreview')
  for(var i = 0; i < figures.length; i++){
    if(figures[i].dataset['carousselplace'] < 4){
      figures[i].style.display = "block"
    } else {
      figures[i].style.display = "none"
    }
  }
}

function main() {

    // Bloc meilleur film.
    fetch (mainEntryUrl + "?sort_by=-imdb_score")
    .then(function(res) {
      if (res.ok) {
          return res.json();
      }
    })
    .then(function(data) {
      let bestMovieUrl = data.results[0].url
      showPreviewBestMovie(bestMovieUrl);
    });

  // 1er caroussel (meilleurs films)
  createCarousselSection("?sort_by=-imdb_score&page_size=7 ", "?sort_by=-imdb_score&page=2", "images_BM")

  // 2d caroussel (meilleurs films d'action)
  createCarousselSection("?genre_contains=action&sort_by=-imdb_score", "?genre_contains=action&sort_by=-imdb_score&page=2", "images_A")
  
  // 3eme caroussel (meilleurs films thriller)
  createCarousselSection("?genre_contains=thriller&sort_by=-imdb_score", "?genre_contains=comedy&sort_by=-imdb_score&page=2", "images_C")

  // 4eme caroussel (meilleurs films pour enfants)
  createCarousselSection("?genre_contains=horror&sort_by=-imdb_score", "?genre_contains=animation&sort_by=-imdb_score&page=2", "images_BB")

  // 5eme caroussel (meilleurs films d'horreur)
  createCarousselSection("?genre_contains=horror&sort_by=-imdb_score", "?genre_contains=horro&sort_by=-imdb_score&page=2", "images_H")
}


main()
