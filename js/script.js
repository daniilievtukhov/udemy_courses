window.addEventListener("DOMContentLoaded", () => {
  // TABS
  const tabs = document.querySelectorAll(".tabheader__item"), // переключатели табов
    tabsContent = document.querySelectorAll(".tabcontent"), // контент этих табов
    tabsParent = document.querySelector(".tabheader__items"); // родительский элемент, в котором все табы

  //ПЕРВАЯ ЗАДАЧА- скрываем все ненужные табы
  function hideTabContent() {
    tabsContent.forEach((item) => {
      item.classList.add("hide"); // скрываем весь контент табов, который на сайте
      item.classList.remove("show", "fade");
    });
    tabs.forEach((item) => {
      item.classList.remove("tabheader__item_active");
    });
  }

  // функция, которая показывает табы
  function showTabContent(i = 0) {
    tabsContent[i].classList.add("show", "fade");
    tabsContent[i].classList.remove("hide");
    tabs[i].classList.add("tabheader__item_active");
  }
  hideTabContent();
  showTabContent();

  //делегирование событий
  tabsParent.addEventListener("click", (event) => {
    const target = event.target; // элемент, на котором происходит события и через таргет получаем свойства
    if (target && target.classList.contains("tabheader__item")) {
      tabs.forEach((item, i) => {
        // item- каждый таб, который будем перебирать, i-номер элемента (всегда второй в аргументах)
        if (target == item) {
          //если в элемент, который мы кликнули будет совпадать с табом
          hideTabContent();
          showTabContent(i);
        }
      });
    }
  });

  //TIMER
  const deadline = "2020-02-12"; // дада окончания акции

  function getTimeRemaning(endtime) {
    // аргумент - дэдлайн
    const t = Date.parse(endtime) - Date.parse(new Date()), // конвертирует строку в дату и получим разницу этих дат в миллисекундах
      days = Math.floor(t / (1000 * 60 * 60 * 24)), // floor- для округления до целого числа (чтоб отбросить остаток)
      hours = Math.floor((t / (1000 * 60 * 60)) % 24),
      minutes = Math.floor((t / (1000 / 60)) % 60),
      seconds = Math.floor((t / 1000) % 60);
    if (t <= 0) {
      return {
        total: "00",
        days: "00",
        hours: "00",
        minutes: "00",
        seconds: "00",
      };
    } else {
      return {
        // возвращаем объект со всеми полученными данными
        total: t,
        days,
        hours,
        minutes,
        seconds,
      };
    }
  }

  function getZero(num) {
    if (num > 0 && num < 10) {
      return `0${num}`;
    } else {
      return num;
    }
  }
  function setClock(selector, endtime) {
    // уствнавливаем значения
    const timer = document.querySelector(selector), // получаем доступ к элементам
      days = timer.querySelector("#days"),
      hours = timer.querySelector("#hours"),
      minutes = timer.querySelector("#minutes"),
      seconds = timer.querySelector("#seconds"),
      timeInnterval = setInterval(updateClock, 1000); //передаем  интервальную функцию, которая будет обновлять таймер
    updateClock(); // setInterval обновит только через секунду, поэтому мы можем увидеть секунду старые значения. поэтому сразу вызываем функцию

    function updateClock() {
      // функция обновления времени
      const t = getTimeRemaning(endtime); // записываем в переменную объект первой функции

      days.innerHTML = getZero(t.days); // тут назначаем новые цифры таймера. getZero чтоб выводился 0
      hours.innerHTML = getZero(t.hours);
      minutes.innerHTML = getZero(t.minutes);
      seconds.innerHTML = getZero(t.seconds);

      if (t.total <= 0) {
        // если разница будет равна или меньше нуля
        clearInterval(timeInnterval); // останавливаем таймер
      }
    }
  }
  setClock(".timer", deadline); //вызываем функцию

  //МОДАЛЬНОЕ ОКНО
  const contact = document.querySelectorAll("[data-modal]"), // получаем достап к кнопке
    close = document.querySelector("[data-close]"), // получаем достап к кнопке закрытия в модальном окне
    modal = document.querySelector(".modal"); // получаем достап к модальному окну

  function openModal() {
    modal.style.display = "block"; // меняем диспле=эй на блоковый
    document.body.style.overflow = "hidden"; // запрещаем скролить страницу во время отображения модального окна
    clearInterval(modalTimerId); // если пользователь сам откроет окно, то через несколько секунд, оно же вызываться не будет
  }

  contact.forEach((btn) => {
    // циклом перебираем псевдомассив
    btn.addEventListener("click", openModal);
    // назначаем событие
  });

  function closeModal() {
    if (modal.style.display == "block") {
      // если модальное окно открыто
      // назначаем событие при клике, должно окно закрываться
      modal.style.display = "none";
      document.body.style.overflow = "";
    }
  }
  close.addEventListener("click", closeModal);

  modal.addEventListener("click", (event) => {
    if (event.target === modal) {
      closeModal();
    }
  });

  // делаем чтоб при нажатии на клавишу, закрывалось окно
  document.addEventListener("keydown", (e) => {
    if (e.code === "Escape" && modal.style.display == "block") {
      closeModal();
    }
  });

  // МОДАЛЬНОЕ ОКНО БУДЕТ ВЫЗВАНО ЧЕРЕЗ ПРОМЕЖУТОК ВРЕМЕНИ

  const modalTimerId = (openModal, 5000); // передаем функцию открытия окна через х сек. какой-то баг, если просто закоментить эту строку, вызыватья будет постоянно

  function showModalByScroll() {
    if (
      window.pageYOffset + document.documentElement.clientHeight >=
      document.documentElement.scrollHeight
    ) {
      openModal();
      window.removeEventListener("scroll", showModalByScroll);
    }
  }

  window.addEventListener("scroll", showModalByScroll);

  //MenuCards add
  class MenuCard {
    constructor(img, title, descr, price, parentSelector) {
      this.img = img;
      this.title = title;
      this.descr = descr;
      this.price = price;
      this.parentSelector = document.querySelector(parentSelector);
    }
    createMenu() {
      const div = document.createElement("div");
      div.innerHTML = `<div class="menu__item">
      <img src=${this.img} alt="vegy" />
      <h3 class="menu__item-subtitle">Меню "${this.title}"</h3>
      <div class="menu__item-descr">
        ${this.descr}
      </div>
      <div class="menu__item-divider"></div>
      <div class="menu__item-price">
        <div class="menu__item-cost">Цена:</div>
        <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
      </div>
    </div>`;
      this.parentSelector.append(div);
    }
  }
  new MenuCard(
    "img/tabs/vegy.jpg",
    "фитнес",
    "Меню 'Фитнес' - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!",
    229,
    ".menu .container"
  ).createMenu();

  new MenuCard(
    "img/tabs/elite.jpg",
    "Премиум",
    "В меню 'Премиум' мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!",
    550,
    ".menu .container"
  ).createMenu();

  new MenuCard(
    "img/tabs/post.jpg",
    "Постное",
    "Меню 'Постное' - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.",
    430,
    ".menu .container"
  ).createMenu();
});
