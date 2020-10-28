(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var _fun = require('./fun');

var _common = require('./common');

(0, _fun.fun)();
(0, _common.removeClass)('.js-close', '.overlay');

},{"./common":2,"./fun":3}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
function removeClass(sourse, target) {

  var em = document.querySelector(sourse);
  var el = document.querySelector(target);

  em.addEventListener('click', function () {
    el.classList.remove('active');
  });
}

exports.removeClass = removeClass;

},{}],3:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
function fun() {
  var site = document.querySelectorAll('.js-site');
  var fan = document.querySelector('.js-fan');
  var value = document.querySelector('.js-value');
  var save = document.querySelector('.js-save');
  var info = document.querySelector('.js-info');
  var unsubscribe = document.querySelector('.js-unsubscribe');
  var overlay = document.querySelector('.overlay');
  var difference = document.querySelector('.js-diff');

  var count = 0;
  var total = site.length;
  var diff = 0;

  function bar() {
    fan.style.width = count * 100 / total + '%';
    value.innerHTML = (count * 100 / total).toFixed() + '%';
  }

  function readFile(file, callback) {
    var rawFile = new XMLHttpRequest();
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
    var data = JSON.parse(text);
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
      var data = JSON.parse(text);
      site.forEach(function (dataItem, index) {
        if (dataItem.classList.contains('active')) {
          data.forEach(function (item, i) {
            if (i === index) {
              item.subscribed = true;
            }
          });
        } else {
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
      var data = JSON.parse(text);
      data.forEach(function (item) {
        item.subscribed = false;
      });
      // eslint-disable-next-line no-console
      console.log(data);
    });
  });
}

exports.fun = fun;

},{}]},{},[1])


//# sourceMappingURL=maps/app.js.map
