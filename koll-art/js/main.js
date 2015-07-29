/**
 * Created by gguzmics01 on 2015.07.07..
 */

//----------------------------------Segédfüggvények amiket az alsó függvények hívnak meg--------------------------------

/*
function validateEmail(email) {
 var regex = "/^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i";
    return re.test(email);
 }*/

var success = true;

function onbtnclick() {
    //alert($("#message").val());
    var name = $("#name").val();
    var email = $("#email").val();
    var text = $("#message").val();


    if (name == "") {
        $("#namebox").attr("class", "glyphicon glyphicon-remove form-control-feedback");
        $("#namediv").attr("class", "form-group has-error has-feedback");
        success = false;
    } else {
        $("#namebox").attr("class", "glyphicon glyphicon-ok form-control-feedback");
        $("#namediv").attr("class", "form-group has-success has-feedback");
    }
    if (email == "") {
        $("#emailbox").attr("class", "glyphicon glyphicon-remove form-control-feedback");
        $("#emaildiv").attr("class", "form-group has-error has-feedback");
        success = false
    } else {
        $("#emailbox").attr("class", "glyphicon glyphicon-ok form-control-feedback");
        $("#emaildiv").attr("class", "form-group has-success has-feedback");
    }
    if (text == "" || text == "Ide írd az üzeneted...") {
        $("#textbox").attr("class", "glyphicon glyphicon-remove form-control-feedback");
        $("#textdiv").attr("class", "form-group has-error has-feedback");
        success = false;
    } else {
        $("#textbox").attr("class", "glyphicon glyphicon-ok form-control-feedback");
        $("#textdiv").attr("class", "form-group has-success has-feedback");
    }

    $('form').on('submit', function () {
        return success;
        alert(success);
    });
}

function checkVisible(elm, eval) {
    eval = eval || "visible";
    var vpH = $(window).height(), // Viewport Height
        st = $(window).scrollTop(), // Scroll Top
        y = $(elm).offset().top,
        elementHeight = $(elm).height();
    //alert(y)
    if (eval == "visible") return ((y < (vpH + st)) && (y > (st - elementHeight)));
    if (eval == "above") return ((y < (vpH + st)));
}

function addZoomIn(reftomb) {
    for (var i = 0; i < reftomb.length; i++) {
        if (checkVisible(reftomb[i])) {
            reftomb[i].css("webkitAnimationName", "zoomIn");
            reftomb[i].css("webkitAnimationDuration", "1s");
            reftomb[i].css("webkitanimationFillMode", "forwards");
            //TODO többi böngészőre is....

            reftomb[i].css("animationName", "zoomIn");
            reftomb[i].css("animationDuration", "1s");
            reftomb[i].css("animationFillMode", "forwards");
        }
    }
}

function calcPos(winHeight, scroll, adjuster, inertia) {
    return "50% " + (-((winHeight + scroll) - adjuster) * inertia) + "px";
}

function moveBackground() {
    var elem1 = $('.webimage1');
    var elem2 = $('.webimage2');
    var elem3 = $('.webimage3');
    var scroll = $(window).scrollTop();
    var winHeight = $(window).height();

    if (checkVisible(elem1)) {
        elem1.css({'backgroundPosition': calcPos(winHeight, scroll, winHeight, 0.05)});
    }
    if (checkVisible(elem2)) {
        //Tipp: itt azért kell osztani a 300-at 0.15-tel, hogy a calcPos függvényben történő szorzás ellenére is
        //300px-vel tolja el a képet
        elem2.css({'backgroundPosition': calcPos(winHeight, scroll, winHeight + 300 / 0.5, 0.5) + ", " + calcPos(winHeight, scroll, winHeight, 0.05)});
    }
    if (checkVisible(elem3)) {
        elem3.css({'backgroundPosition': calcPos(winHeight, scroll, winHeight, 0.1)});
    }
}

//-----------------------------------------HTML oldalakhoz tartozó függvények-------------------------------------------

//esetleg külön js fileokba átrakni a külön oldalakhoz tartozó js kódokat... <<<< DONE
//Tipp: összefogni pagenként egy függvénybe a pagehez tartozó függvényeket és meghívni az adott oldalon egy-egy
//script tag között így: $(document).ready(function(){ aktualisHTMLfgv(); })

//külön js filokba szednia különböző htmlekhez tartozó js kódokat, mert így hibát dob....
//^^^^^^ megcsinálatam, de ehhez be kellett rakni konkrét script részeket a htmlbe^^^^^^
//Megjegyzés: szerintem így viszont sokkal átláthatóbb lett az egész
/*
 $(document).ready(function () {});
 $(window).scroll(function () {});
 $(window).bind("onresize", function(){});
 */

//betöltő függvény minden page-re
$(window).load(function () {
    //beincludeolas
    $("#header").load("header.html");
    $("#footer").load("footer.html");
});

var loaded = false;
var reftomb;

function index() {
    //carousel diavetiteshez
    var slideqty = $('#featured .item').length;
    for (var i = 0; i < slideqty; i++) {
        var insertText = '<li data-target="#featured" data-slide-to="' + i + '"></li>';
        $('#featured ol').append(insertText);
    }
    $('.carousel').carousel({
        interval: "7000",
        pause: "false",
    });
}

function reference() {
    if (!loaded) {
        reftomb = [$('#ref1'), $('#ref2'), $('#ref3'), $('#ref4'), $('#ref5'), $('#ref6')];
        loaded = true;
    }
    addZoomIn(reftomb);
}

function web() {
    //moveBackground();
}

