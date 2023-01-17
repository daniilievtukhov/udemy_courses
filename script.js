"use strict";

const numberOfFilms = +prompt("Сколько фильмов вы уже посмотрели?", "");
const personalMovieDB = {
  count: numberOfFilms,
  movies: {},
  actors: {},
  genres: [],
  privat: false,
};

//2 variant
let i = 0;
while (i < 2) {
  const first = prompt("Один из последних просмотренных фильмов?", ""),
    second = prompt("На сколько оцените его?", "");
  personalMovieDB.movies[first] = [second];
  i++;
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

// for (let i = 0; i < 2; i++) {
//   const first = prompt("Один из последних просмотренных фильмов?", ""),
//     second = prompt("На сколько оцените его?", "");
//   personalMovieDB.movies[first] = [second];
//   if (
//     first === null ||
//     second === null ||
//     first.length > 50 ||
//     second.length > 50 ||
//     first == "" ||
//     second == ""
//   ) {
//     i--;
//   }
// }

if (personalMovieDB.count < 10) {
  alert("Просмотрено довольно мало фильмов");
} else if (personalMovieDB.numberOfFilms >= 10 && personalMovieDB.count <= 30) {
  alert("Вы классический зритель");
} else if (personalMovieDB.count > 30) {
  alert("Вы киноман");
} else {
  alert("Произошла ошибка");
}
// const first = prompt("Один из последних просмотренных фильмов?", ""),
//   second = prompt("На сколько оцените его?", ""),
//   third = prompt("Один из последних просмотренных фильмов?", ""),
//   fourth = prompt("На сколько оцените его?", "");

console.log(personalMovieDB);
