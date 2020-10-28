function removeClass(sourse, target) {

  const em = document.querySelector(sourse);
  const el = document.querySelector(target);

  em.addEventListener('click', function () {
    el.classList.remove('active');
  });
}

export {removeClass};

