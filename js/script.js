"use strict";
/* Задания на урок:

1) Реализовать функционал, что после заполнения формы и нажатия кнопки "Подтвердить" - 
новый фильм добавляется в список. Страница не должна перезагружаться.
Новый фильм должен добавляться в movieDB.movies.
Для получения доступа к значению input - обращаемся к нему как input.value;
P.S. Здесь есть несколько вариантов решения задачи, принимается любой, но рабочий.

2) Если название фильма больше, чем 21 символ - обрезать его и добавить три точки

3) При клике на мусорную корзину - элемент будет удаляться из списка (сложно)

4) Если в форме стоит галочка "Сделать любимым" - в консоль вывести сообщение: 
"Добавляем любимый фильм"

5) Фильмы должны быть отсортированы по алфавиту */
document.addEventListener("DOMContentLoaded", () => {
  const movieDB = {
    movies: [
      "Логан",
      "Лига справедливости",
      "Ла-ла лэнд",
      "Одержимость",
      "Скотт Пилигрим против...",
    ],
  };

  const adv = document.querySelectorAll(".promo__adv img"),
    promoBg = document.querySelector(".promo__bg"),
    promoGenre = promoBg.getElementsByClassName("promo__genre")[0],
    movieList = document.querySelector(".promo__interactive-list"),
    addForm = document.querySelector("form.add"),
    addInput = document.querySelector(".adding__input"),
    checkbox = document.querySelector('[type="checkbox"]');

  addForm.addEventListener("submit", (e) => {
    e.preventDefault();
    let newFilm = addInput.value; // получаем из инпута именно то, что ввел пользователь
    const favorite = checkbox.checked; // получаем, отмеменна галочка или нет
    if (newFilm) {
      if (newFilm.length > 21) {
        newFilm = `${newFilm.substring(0, 22)}...`;
      }
      if (favorite) {
        //Если в форме стоит галочка "Сделать любимым" - в консоль вывести сообщение:"Добавляем любимый фильм"
        console.log("Добавляем любимый фильм");
      }
      movieDB.movies.push(newFilm); //пушим полученный фильм в наш массив
      sortArr(movieDB.movies); // вызываем функцию сортировки, прописанную ниже

      createMovieList(movieDB.movies, movieList); //функция, которая добавляет в хтмл
      e.target.reset(); //очищаем форму, чтоб  данные со строки исчезли
    }
  });

  const deleteAdv = (advertisment) => {
    //уделаения картинок рекламы
    advertisment.forEach((item) => {
      item.remove();
    });
  };

  const makeChanges = () => {
    //поменяли жанр фильма
    promoGenre.textContent = "Драма";

    //поменяли постер фильма
    promoBg.style.backgroundImage = "url('img/bg.jpg')";
  };

  const sortArr = (arr) => {
    arr.sort();
  };

  function createMovieList(films, parent) {
    sortArr(films);
    parent.innerHTML = "";
    //этим циклом записали в хтмл список массива, основанный на объекте movieDB
    films.forEach((film, i) => {
      parent.innerHTML += `<li class="promo__interactive-item">${i + 1} ${film}
                            <div class="delete"></div>
                                </li>`;
    });

    document.querySelectorAll(".delete").forEach((btn, i) => {
      btn.addEventListener("click", () => {
        btn.parentElement.remove();
        movieDB.movies.splice(i, 1);
        createMovieList(films, parent);
      });
    });
  }
  deleteAdv(adv);
  makeChanges();

  createMovieList(movieDB.movies, movieList);
});
