"use strict";

const personalMovieDB = {
  count: 0,
  movies: {},
  actors: {},
  genres: [],
  privat: false,
  start: function () {
    personalMovieDB.count = +prompt(
      "Сколько фильмов вы уже посмотрели?",
      ""
    ).trim();

    while (
      personalMovieDB.count == "" ||
      personalMovieDB.count == null ||
      isNaN(personalMovieDB.count)
    ) {
      personalMovieDB.count = +prompt("Сколько фильмов вы уже посмотрели?", "");
    }
  },
  rememberMyFilms: function () {
    for (let i = 0; i < 2; i++) {
      const first = prompt(
          "Один из последних просмотренных фильмов?",
          ""
        ).trim(),
        second = prompt("На сколько оцените его?", "").trim();
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
  },
  detectPersonalLevel: function () {
    if (personalMovieDB.count < 10) {
      alert("Просмотрено довольно мало фильмов");
    } else if (personalMovieDB.count >= 10 && personalMovieDB.count < 30) {
      alert("Вы классический зритель");
    } else if (personalMovieDB.count >= 30) {
      alert("Вы киноман");
    } else {
      alert("Произошла ошибка");
    }
  },
  showMyDB: function () {
    if (!personalMovieDB.privat) {
      console.log(personalMovieDB.privat);
    }
  },
  writeYourGenres: function () {
    for (let i = 1; i < 4; i++) {
      personalMovieDB.genres[i - 1] = prompt(
        `Ваш любимый жанр под номером ${i}`
      );
      if (
        personalMovieDB.genres[i - 1] == "" ||
        personalMovieDB.genres[i - 1] == null
      ) {
        console.log("Вы ввели неправильные данные");
        i--;
      }
    }
    personalMovieDB.genres.forEach((item, i) => {
      console.log(`Любимый жанр #${i + 1} - это ${item}`);
    });
  },
  toggleVisibleMyDB: function () {
    !personalMovieDB.privat
      ? (personalMovieDB.privat = true)
      : (personalMovieDB.privat = false);
  },
};
