/* Задания на урок:

4) Список фильмов на странице сформировать на основании данных из этого JS файла.
Отсортировать их по алфавиту 

5) Добавить нумерацию выведенных фильмов */

"use strict";

const movieDB = {
  movies: [
    "Логан",
    "Лига справедливости",
    "Ла-ла лэнд",
    "Одержимость",
    "Скотт Пилигрим против...",
  ],
};
for (let i = 0; i < movieDB.movies.length; i++) {
  console.log(movieDB.movies[i]);
}
//1) Удалить все рекламные блоки со страницы (правая часть сайта)
const adv = document.querySelectorAll(".promo__adv img");
adv.forEach((item) => {
  item.remove();
});

//2) Изменить жанр фильма, поменять "комедия" на "драма"
const promoBg = document.querySelector(".promo__bg");
const promoGenre = promoBg.getElementsByClassName("promo__genre")[0];
promoGenre.textContent = "Драма";

//3) Изменить задний фон постера с фильмом на изображение "bg.jpg". Оно лежит в папке img. Реализовать только при помощи JS
promoBg.style.backgroundImage = "url('img/bg.jpg')";

//4) Список фильмов на странице сформировать на основании данных из этого JS файла. Отсортировать их по алфавиту
const movieList = document.querySelector(".promo__interactive-list");
movieList.innerHTML = "";

let arrFilms = movieDB.movies.sort();

arrFilms.forEach((film, i) => {
  movieList.innerHTML += `<li class="promo__interactive-item">${i + 1} ${film}
                            <div class="delete"></div>
                                </li>`;
});
