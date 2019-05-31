//typewritter
var TxtRotate = function(el, toRotate, period) {
  this.toRotate = toRotate;
  this.el = el;
  this.loopNum = 0;
  this.period = parseInt(period, 10) || 2000;
  this.txt = '';
  this.tick();
  this.isDeleting = false;
};

TxtRotate.prototype.tick = function() {
  var i = this.loopNum % this.toRotate.length;
  var fullTxt = this.toRotate[i];

  if (this.isDeleting) {
    this.txt = fullTxt.substring(0, this.txt.length - 1);
  } else {
    this.txt = fullTxt.substring(0, this.txt.length + 1);
  }

  this.el.innerHTML = '<span class="wrap">'+this.txt+'</span>';

  var that = this;
  var delta = 300 - Math.random() * 100;

  if (this.isDeleting) { delta /= 2; }

  if (!this.isDeleting && this.txt === fullTxt) {
    delta = this.period;
    this.isDeleting = true;
  } else if (this.isDeleting && this.txt === '') {
    this.isDeleting = false;
    this.loopNum++;
    delta = 500;
  }

  setTimeout(function() {
    that.tick();
  }, delta);
};

window.onload = function() {
  var elements = document.getElementsByClassName('txt-rotate');
  for (var i=0; i<elements.length; i++) {
    var toRotate = elements[i].getAttribute('data-rotate');
    var period = elements[i].getAttribute('data-period');
    if (toRotate) {
      new TxtRotate(elements[i], JSON.parse(toRotate), period);
    }
  }
  // INJECT CSS
  var css = document.createElement("style");
  css.type = "text/css";
  css.innerHTML = ".txt-rotate > .wrap { border-right: 0.08em solid #666 }";
  document.body.appendChild(css);
};




//Iphone fixed position
let startProductBarPos = -1

window.onscroll = function () {
  let bar = document.getElementById( 'sticky' );

  if ( startProductBarPos < 0 ) startProductBarPos = findPosY( bar );

  if ( pageYOffset > startProductBarPos ) {
    bar.style.position = 'fixed';
    bar.style.top = 0;
  } else {
    bar.style.position = 'relative';
  }
};

function findPosY( obj ) {
  let curtop = 0;

  if ( typeof ( obj.offsetParent ) != 'undefined' && obj.offsetParent ) {
    
    while ( obj.offsetParent ) {
      curtop += obj.offsetTop;
      obj = obj.offsetParent;
    }

    curtop += obj.offsetTop;

  } else if ( obj.y )
      curtop += obj.y;

  return curtop;
}