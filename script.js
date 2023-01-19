"use strict";

let numberOfFilms;

function start() {
  numberOfFilms = +prompt("Сколько фильмов вы уже посмотрели?", "");

  while (numberOfFilms == "" || numberOfFilms == null || isNaN(numberOfFilms)) {
    numberOfFilms = +prompt("Сколько фильмов вы уже посмотрели?", "");
  }
}
start();
const personalMovieDB = {
  count: numberOfFilms,
  movies: {},
  actors: {},
  genres: [],
  privat: false,
};

function rememberMyFilms() {
  for (let i = 0; i < 2; i++) {
    const first = prompt("Один из последних просмотренных фильмов?", ""),
      second = prompt("На сколько оцените его?", "");
    personalMovieDB.movies[first] = [second];
    if (
      first === null ||
      second === null ||
      first.length > 50 ||
      second.length > 50 ||
      first == "" ||
      second == ""
    ) {
      i--; //вернуться на цикл назад гениально!!!!!!!!!!!!!! на 1 итирацию нахзад
    }
  }
}
rememberMyFilms();

function detectPersonalLevel() {
  if (personalMovieDB.count < 10) {
    alert("Просмотрено довольно мало фильмов");
  } else if (personalMovieDB.count >= 10 && personalMovieDB.count < 30) {
    alert("Вы классический зритель");
  } else if (personalMovieDB.count >= 30) {
    alert("Вы киноман");
  } else {
    alert("Произошла ошибка");
  }
}
detectPersonalLevel();

function showMyDB() {
  if (!personalMovieDB.privat) {
    console.log(personalMovieDB);
  }
}
showMyDB();
function writeYourGenres() {
  for (let i = 1; i < 4; i++) {
    personalMovieDB.genres[i - 1] = prompt(`Ваш любимый жанр под номером ${i}`);
  }
}
writeYourGenres();
