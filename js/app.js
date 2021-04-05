let pageSlider = new Swiper('.page', {
	//Свои классы
	wrapperClass: "page__wrapper",
	slideClass: "page__screen",

	//Вертикальный слайдер
	direction: 'vertical',

	//Количество слайдов для показа
	slidesPerView: 'auto',

	//Включаем параллакс
	parallax: true,

	// Управление клавиатурой
	keyboard: {
		// Включить\выключить
		enabled: true,
		// Включить\выключить
		// только когда слайдер
		// в пределах вьюпорта
		onlyInViewport: true,
		// Включить\выключить
		// управление клавишами
		// pageUp, pageDown
		pageUpDown: true,
	},

	// Управление колесом мыши
	mousewheel: {
		// Чувствительность колеса мыши
		sensitivity: 1,
		// Класс объекта на котором
		// будет срабатывать прокрутка мышью.
		//eventsTarget: ".screen"
	},

	// Отключение функционала
	// если слайдов меньше чем нужно
	watchOverflow: true,

	// Скорость
	speed: 800,

	// Обновить свайпер
	// при изменении элементов слайдера
	observer: true,

	// Обновить свайпер
	// при изменении родительских
	// элементов слайдера
	observeParents: true,

	// Обновить свайпер
	// при изменении дочерних
	// элементов слайда
	observeSlideChildren: true,

	pagination: {
		el: '.page__pagination',
		type: 'bullets',
		clickable: true,
		bulletClass: "page__bullet",
		bulletActiveClass: "page__bullet_active",
	},

	scrollbar: {
		el: '.page__scroll',
		dragClass: "page__drag-scroll",
		// Возможность перетаскивать скролл
		draggable: true,
	},

	init: false,

	on: {
		init: function() {
			menuSlider();
			setScrollType();
			headerHide();
			headerSmall();
			wrapper.classList.add('_loaded');
		},
		slideChange: function() {
			menuSliderRemove();
			headerHide();
			headerSmall();
			menuLinks[pageSlider.realIndex].classList.add('_active');
			
		},
		resize: function() {
			setScrollType();
		},
	},

});

let wrapper = document.querySelector('.wrapper');

let menuLinks = document.querySelectorAll('.menu__link');

let headerBody = document.querySelector('.header');

function menuSlider() {
  if (menuLinks.length > 0) {
    menuLinks[pageSlider.realIndex].classList.add('_active');
    for (let i = 0; i < menuLinks.length; i++) {
      let menuLink = menuLinks[i];
      menuLink.addEventListener("click", function (e) {
        menuSliderRemove();
        pageSlider.slideTo(i, 800);
        menuLink.classList.add('_active');
        e.preventDefault();
      });
    }
  }
}

function menuSliderRemove() {
  let menuLinkActive = document.querySelector('.menu__link._active');
  if (menuLinkActive) {
    menuLinkActive.classList.remove('_active');
  }
}

function setScrollType() {
  if(wrapper.classList.contains('_free')) {
    wrapper.classList.remove('_free');
    pageSlider.params.freeMode = false;
  }

  for (let i = 0; i < pageSlider.slides.length; i++) {
    let pageSlide = pageSlider.slides[i];
    let pageSlideContent = pageSlide.querySelector('.screen__content');

    if (pageSlideContent) {
      let pageSlideContentHeight = pageSlideContent.offsetHeight;
      if (pageSlideContentHeight > window.innerHeight) {
        wrapper.classList.add('_free');
        pageSlider.params.freeMode = true;
        break;
      }
    }
  }
}

function headerHide() {
  if (pageSlider.realIndex == 1) {
    headerBody.classList.add('_hide');
  } else {
    headerBody.classList.remove('_hide');
  }
}

function headerSmall() {
  if (pageSlider.realIndex > 1) {
    headerBody.classList.add('_small');
  } else {
    headerBody.classList.remove('_small');
  }
}

pageSlider.init();

let unlock = true;

let iconMenu = document.querySelector(".header__burger");
if (iconMenu != null) {
	let delay = 500;
	let menuBody = document.querySelector(".header__menu");
	iconMenu.addEventListener("click", function (e) {
		if (unlock) {
			body_lock(delay);
			iconMenu.classList.toggle("_active");
			menuBody.classList.toggle("_active");
		}
	});
};

if (menuLinks.length > 0) {
	for (let i = 0; i < menuLinks.length; i++) {
		let delay = 500;
		let menuLink = menuLinks[i];
		let menuBody = document.querySelector(".header__menu");
		menuLink.addEventListener("click", function (e) {
			if (menuBody.classList.contains("_active")) {
				body_lock_remove(delay);
				iconMenu.classList.remove("_active");
				menuBody.classList.remove("_active");
			}
		});
	}
}


//BodyLock
function body_lock(delay) {
	let body = document.querySelector("body");
	if (body.classList.contains('_lock')) {
		body_lock_remove(delay);
	} else {
		body_lock_add(delay);
	}
}
function body_lock_remove(delay) {
	let body = document.querySelector("body");
	if (unlock) {
		let lock_padding = document.querySelectorAll("._lp");
		setTimeout(() => {
			for (let index = 0; index < lock_padding.length; index++) {
				const el = lock_padding[index];
				el.style.paddingRight = '0px';
			}
			body.style.paddingRight = '0px';
			body.classList.remove("_lock");
		}, delay);

		unlock = false;
		setTimeout(function () {
			unlock = true;
		}, delay);
	}
}
function body_lock_add(delay) {
	let body = document.querySelector("body");
	if (unlock) {
		let lock_padding = document.querySelectorAll("._lp");
		for (let index = 0; index < lock_padding.length; index++) {
			const el = lock_padding[index];
			el.style.paddingRight = window.innerWidth - document.querySelector('.wrapper').offsetWidth + 'px';
		}
		body.style.paddingRight = window.innerWidth - document.querySelector('.wrapper').offsetWidth + 'px';
		body.classList.add("_lock");

		unlock = false;
		setTimeout(function () {
			unlock = true;
		}, delay);
	}
}