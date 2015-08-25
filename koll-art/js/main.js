/**
 * Created by gguzmics01 on 2015.07.07..
 */

function adjust_textarea(h) {
    h.style.height = "20px";
    h.style.height = (h.scrollHeight) + "px";
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

/*function calcPos(winHeight, scroll, adjuster, inertia) {
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
 }*/

//betöltő függvény minden page-re
$(window).load(function () {
    //beincludeolas
    $("#header").load("header.html");
    $("#footer").load("footer.html");
});

var reftomb;
var loaded = false;

function reference() {
    if (!loaded) {
        reftomb = [$('#ref1'), $('#ref2'), $('#ref3'), $('#ref4'), $('#ref5'), $('#ref6')];
        loaded = true;
    }
    addZoomIn(reftomb);
}

//TODO átírni ezt az egész szennyett itt lentebb, mert ez használhatatlan
//csak akkor kerdezz errol a formedvenyrol, ha eleg reszeg vagy
function contactajaxsuccess(data) {
    if (data.errors.name) {
        if ($("#namebox").hasClass("glyphicon-ok")) {
            $("#namebox").removeClass("glyphicon-ok");
            $("#namediv").removeClass("has-success");
        }
        $("#namebox").addClass("glyphicon-remove");
        $("#namediv").addClass("has-error");
        if($('#namealert').hasClass("hidden"))
            $('#namealert').removeClass("hidden");
        $('#namealert').removeClass("disappear");
        $('#namealert').addClass("appear");
        $('#namealert').text(data.errormessages.name);
    } else {
        if ($("#namebox").hasClass("glyphicon-remove")) {
            $("#namebox").removeClass("glyphicon-remove");
            $("#namediv").removeClass("has-error");
        }
        $("#namebox").addClass("glyphicon-ok");
        $("#namediv").addClass("has-success");
        $('#namealert').removeClass("appear");
        $('#namealert').addClass("disappear");

    }
    if (data.errors.email) {
        if ($("#emailbox").hasClass("glyphicon-ok")) {
            $("#emailbox").removeClass("glyphicon-ok");
            $("#emaildiv").removeClass("has-success");
        }
        $("#emailbox").addClass("glyphicon-remove");
        $("#emaildiv").addClass("has-error");
        if($('#emailalert').hasClass("hidden"))
            $('#emailalert').removeClass("hidden");
        $('#emailalert').removeClass("disappear");
        $('#emailalert').addClass("appear");
        $('#emailalert').text(data.errormessages.email);
    } else {
        if ($("#emailbox").hasClass("glyphicon-remove")) {
            $("#emailbox").removeClass("glyphicon-remove");
            $("#emaildiv").removeClass("has-error");
        }
        $("#emailbox").addClass("glyphicon-ok");
        $("#emaildiv").addClass("has-success");
        $('#emailalert').removeClass("appear");
        $('#emailalert').addClass("disappear");
    }
    if (data.errors.message) {
        if ($("#textbox").hasClass("glyphicon-ok")) {
            $("#textbox").removeClass("glyphicon-ok");
            $("#textdiv").removeClass("has-success");
        }
        $("#textbox").addClass("glyphicon-remove");
        $("#textdiv").addClass("has-error");
        if($('#textalert').hasClass("hidden"))
            $('#textalert').removeClass("hidden");
        $('#textalert').removeClass("disappear");
        $('#textalert').addClass("appear");
        $('#textalert').text(data.errormessages.message);
    } else {
        if ($("#textbox").hasClass("glyphicon-remove")) {
            $("#textbox").removeClass("glyphicon-remove");
            $("#textdiv").removeClass("has-error");
        }
        $("#textbox").addClass("glyphicon-ok");
        $("#textdiv").addClass("has-success");
        $('#textalert').removeClass("appear");
        $('#textalert').addClass("disappear");
    }
    if (!$("#mobilbox").hasClass("glyphicon-ok")) {
        $("#mobilbox").addClass("glyphicon-ok");
        $("#mobildiv").addClass("has-success");
    }

}

function contact(event) {
    event.preventDefault();
    var formData = {
        "name": $('input[name=name]').val(),
        "email": $('input[name=email]').val(),
        "tel": $('input[name=tel]').val(),
        "message": $('textarea[name=message]').val()
    };

    $.ajax({
        type: 'POST',
        url: 'contactprocess.php',
        dataType: 'json',
        data: formData,
        //contentType: 'application/json; charset=utf-8',
        success: function (data/*, textStatus, jqXHR */) {
            contactajaxsuccess(data);
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log(jqXHR);
            console.log("Details: " + textStatus + "\nError:" + errorThrown);
        }
    });
}





