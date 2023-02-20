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
    constructor(src, alt, title, descr, price, parentSelector, ...classes) {
      this.src = src;
      this.alt = alt;
      this.title = title;
      this.descr = descr;
      this.price = price;
      this.classes = classes;
      this.parent = document.querySelector(parentSelector);
      this.transfer = 27;
      this.changeToUAH();
    }
    changeToUAH() {
      this.price = this.price * this.transfer;
    }
    createMenu() {
      const element = document.createElement("div");

      if (this.classes.length === 0) {
        this.classes = "menu__item";
        element.classList.add(this.classes);
      } else {
        this.classes.forEach((className) => element.classList.add(className));
      }

      element.innerHTML = `
          <img src=${this.src} alt=${this.alt}>
          <h3 class="menu__item-subtitle">${this.title}</h3>
          <div class="menu__item-descr">${this.descr}</div>
          <div class="menu__item-divider"></div>
          <div class="menu__item-price">
              <div class="menu__item-cost">Цена:</div>
              <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
          </div>
      `;
      this.parent.append(element);
    }
  }

  const getResource = async (url) => {
    //нету никаких данных, потому что мы их получаем
    const res = await fetch(url);
    // если fetch столкнется с ошибкой в http-запросе, то он не выкенет reject. Поэтому, проверяем по условию
    if (!res.ok) {
      // если выдает неполадку (не ок)
      throw new Error(`Could not fetch ${url}, status:${res.status}`);
    }
    return await res.json(); // тоже промис, он будет возвращен не сразу. поэтому так же пишем await
  };

  getResource("http://localhost:3000/menu").then((data) => {
    data.forEach(({ img, altimg, title, descr, price }) => {
      new MenuCard(
        img,
        altimg,
        title,
        descr,
        price,
        ".menu .container"
      ).createMenu();
    });
  });

  // Forms (отправка формы на сервер)

  const forms = document.querySelectorAll("form"); // получаем доступ ко всем формам

  const messages = {
    // создаем фразы
    load: "Загрузка",
    success: "Спасибо! Скоро мы с вами свяжемся",
    failure: " Что-то пошло не так...",
  };

  forms.forEach((item) => {
    // берем все формы и под каждую из них подвязываем функцию postData
    bindPostData(item);
  });

  const postData = async (url, data) => {
    //настройка запроса  аргумент ссылки и данных, которые будут поститься.async- даем понять, что будет асинхронный код внутри функции
    const res = await fetch(url, {
      //в результат передаем fetch, который возвращает промис. Посылает запрос на сервер
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: data,
    });

    return await res.json(); // тоже промис, он будет возвращен не сразу. поэтому так же пишем await
  };

  //когда запускаем функцию, начинает идти запрос, но из за того что тут стоит await, то необходимо дождаться результат этого запроса

  function bindPostData(form) {
    // создвем функцию поста формы с аргументом, чтоб легче было делать события
    form.addEventListener("submit", (e) => {
      // e-для того, чтоб мы отменили стандартное поведение браузера(после отправки перезагружать)
      e.preventDefault();

      let statusMessage = document.createElement("div"); //создаем див
      statusMessage.classList.add("status"); // делаем ей класс
      statusMessage.textContent = messages.load; // добавляем текст
      form.append(statusMessage); //делаем так чтоб в браузере это сообщение было видно  сразу после отправки формы

      const formData = new FormData(form); // специальный объект, который создает объект из того, что заполнил пользователь

      //превращаем в json
      const object = {};
      formData.forEach(function (value, key) {
        object[key] = value;
      });

      postData("http://localhost:3000/requests", JSON.stringify(object))
        // .then((data) => data.text()) // превращаем json в обычный текст
        .then((data) => {
          console.log(data); // data- данные из промиса
          statusMessage.textContent = messages.success; // какое сообщение выводить
          form.reset(); //сбрасываем форму. будет удалено все что ввели
          statusMessage.remove();
        })
        .catch(() => {
          // блок, который будет срабатывать на случай возникновения ошибки
          statusMessage.textContent = messages.failure;
        })
        .finally(() => {
          //блок, который будет срабатывать в любом случае
          form.reset(); // форма будет очищаться
        });
    });
  }

  // Fetch API (объеденение знаний про промисы и сервера)
  // fetch(
  //   "https://jsonplaceholder.typicode.com/posts" /* меняем вместо todos/1 на posts */,
  //   {
  //     //и объект
  //     method: "POST", // прописываем какой метод запроса
  //     body: JSON.stringify({ name: "Alex" }), // будем отправлять данные и например будет объект с свойством name
  //     headers: { //заголовок, который будет определять, какой контент мы отправляем
  //       "Content-type": "application/json",
  //     },
  //   }
  // ) //туда, куда посылаем запрос
  //   .then((response) => response.json()) // fetch работает с промисами  получаем ответ в json виде и трансформируем в нормальный объект и response.json() возвращает промис
  //   .then((json) => console.log(json)); // если все успешно прошло, то берем этот сконвертированный объект и используем его в консоли
});
