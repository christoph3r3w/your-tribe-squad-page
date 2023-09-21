var TxtType = function(el, toRotate, period) {
    this.toRotate = toRotate;
    this.el = el;
    this.loopNum = 0;
    this.period = parseInt(period, 10) || 2000;
    this.txt = '';
    this.tick();
    this.isDeleting = false;
};

TxtType.prototype.tick = function() {
    /* Bepaalt welk stukje tekst wordt weergegeven op basis van this.loopnum. De waarde van isDeleting vertelt of het wordt toegevoegd of verwijderd. Delta geeft willekeurige tijdsvertraging voor het volgende stukje */ 
    var i = this.loopNum % this.toRotate.length;
    var fullTxt = this.toRotate[i];

    if (this.isDeleting) { 
    this.txt = fullTxt.substring(0, this.txt.length - 1);
    } else {
    this.txt = fullTxt.substring(0, this.txt.length + 1);
    }

    this.el.innerHTML = '<span class="wrap">'+this.txt+'</span>';

    var that = this;
    var delta = 180 - Math.random() * 100;

    if (this.isDeleting) { delta /= 2; }

    if (!this.isDeleting && this.txt === fullTxt) {
    delta = this.period;
    this.isDeleting = true;
    } else if (this.isDeleting && this.txt === '') {
    this.isDeleting = false;
    this.loopNum++;
    delta = 600;
    }

    setTimeout(function() {
    that.tick();
    }, delta);
};

window.onload = function() {
    /* Werkt wanneer de pagina volledig is geladen. Zoekt naar elementen met class "typewrite" en geeft het "txtype" object. Gebruikt de data en tekst uit de attributen van de html */
    var elements = document.getElementsByClassName('typewrite');
    for (var i=0; i<elements.length; i++) {
        var toRotate = elements[i].getAttribute('data-type');
        var period = elements[i].getAttribute('data-period');
        if (toRotate) {
          new TxtType(elements[i], JSON.parse(toRotate), period);
        }
    }

    var css = document.createElement("style");
    /* Dynamische css. Zorgt voor de cursor. */
    css.type = "text/css";
    css.innerHTML = ".typewrite > .wrap { border-right: 0.06em solid var(--pink)}";
    document.body.appendChild(css);
};
