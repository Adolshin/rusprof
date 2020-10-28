function fun() {
  const site = document.querySelectorAll('.js-site');
  const fan = document.querySelector('.js-fan');
  const value = document.querySelector('.js-value');
  const save = document.querySelector('.js-save');
  const info = document.querySelector('.js-info');
  const unsubscribe = document.querySelector('.js-unsubscribe');
  const overlay = document.querySelector('.overlay');
  const difference = document.querySelector('.js-diff');


  let count = 0;
  let total = site.length;
  let diff = 0;

  function bar() {
    fan.style.width = count * 100 / total + '%';
    value.innerHTML = (count * 100 / total).toFixed() + '%';
  }

  function readFile(file, callback) {
    const rawFile = new XMLHttpRequest();
    rawFile.overrideMimeType('application/json');
    rawFile.open('GET', file, true);
    rawFile.onreadystatechange = function () {
      if (rawFile.readyState === 4 && rawFile.status == '200') {
        callback(rawFile.responseText);
      }
    };
    rawFile.send(null);
  }


  readFile('./assets/js/subscribe.json', function (text) {
    let data = JSON.parse(text);
    // eslint-disable-next-line no-console
    // console.log(data);
    data.forEach(function (dataItem, index) {
      site.forEach(function (item, i) {
        if (i === index) {
          item.children[1].children.item(0).innerHTML = dataItem.site;
          if (dataItem.subscribed) {
            item.classList.add('active');
            count++;
            bar();
          }
        }
      });
    });
  });


  site.forEach(function (item) {
    item.addEventListener('click', function () {
      if (item.classList.contains('active')) {
        count--;
        diff--;
      } else {
        count++;
        diff++;
      }
      bar();
      item.classList.toggle('active');
    });
  });

  save.addEventListener('click', function () {
    overlay.classList.add('active');
    difference.innerHTML = (diff * 100 / total).toFixed() + '%';
    if (diff < 0) {
      difference.classList.add('modal__value_negative');
      info.innerHTML = 'fun lost :(';
    } else if (difference.classList.contains('modal__value_negative')) {
      difference.classList.remove('modal__value_negative');
      info.innerHTML = 'more fun added';
    }
    diff = 0;
    readFile('./assets/js/subscribe.json', function (text) {
      let data = JSON.parse(text);
      site.forEach(function (dataItem, index) {
        if (dataItem.classList.contains('active')) {
          data.forEach(function (item, i) {
            if (i === index) {
              item.subscribed = true;
            }
          });
        }else{
          data.forEach(function (item, i) {
            if (i === index) {
              item.subscribed = false;
            }
          });
        }
      });
      // eslint-disable-next-line no-console
      console.log(data);
    });
  });

  unsubscribe.addEventListener('click', function () {
    site.forEach(function (item) {
      if (item.classList.contains('active')) {
        item.classList.remove('active');
        diff--;
      }
    });
    overlay.classList.add('active');
    // console.log(diff);
    difference.innerHTML = (diff * 100 / total).toFixed() + '%';
    difference.classList.add('modal__value_negative');
    info.innerHTML = 'fun lost :(';
    diff = 0;
    count = 0;
    bar();
    readFile('./assets/js/subscribe.json', function (text) {
      let data = JSON.parse(text);
      data.forEach(function (item) {
        item.subscribed = false;
      });
      // eslint-disable-next-line no-console
      console.log(data);
    });
  });
}

export {fun};