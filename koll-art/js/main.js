/**
 * Created by gguzmics01 on 2015.07.07..
 */

function adjust_textarea(h) {
    h.style.height = "20px";
    h.style.height = (h.scrollHeight) + "px";
}

//function checkVisible(elm, eval) {
//    eval = eval || "visible";
//    var vpH = $(window).height(), // Viewport Height
//        st = $(window).scrollTop(), // Scroll Top
//        y = $(elm).offset().top,
//        elementHeight = $(elm).height();
//    //alert(y)
//    if (eval == "visible") return ((y < (vpH + st)) && (y > (st - elementHeight)));
//    if (eval == "above") return ((y < (vpH + st)));
//}

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
//$(window).load(function () {
//    //beincludeolas
//    $("#header").load("header.html");
//    $("#footer").load("footer.html");
//});


//TODO átírni ezt az egész szennyett itt lentebb, mert ez használhatatlan
//csak akkor kerdezz errol a formedvenyrol, ha eleg reszeg vagy
function contactajaxsuccess(data) {
    if (!$("#mobilbox").hasClass("glyphicon-ok")) {
        $("#mobilbox").addClass("glyphicon-ok");
        $("#mobildiv").addClass("has-success");
    }
    if (!data.isformvalid) {
        setinput(data.isvalid.name, 'name', data.faildata.name);
        setinput(data.isvalid.email, 'email', data.faildata.email);
        setinput(data.isvalid.message, 'text', data.faildata.message);

    } else {
        setinput(true, 'name', "");
        setinput(true, 'email', "");
        setinput(true, 'text', "");
        if (!data.isvalid.sentmail) {
            if ($('#textalert').hasClass("hidden"))
                $('#textalert').removeClass("hidden");
            $('#textalert').removeClass("disappear");
            $('#textalert').addClass("appear");
            $('#textalert').text(data.faildata.sentmail);
        } else {
            $('#textalert').removeClass("appear");
            $('#textalert').addClass("disappear");
            $('.contactform').addClass('slideout');
            $('.thankyou').removeClass("hidden");
            $('.thankyou').addClass('slidein');
        }
    }
}

function setinput(isvalid, input, faildata){
    if(!isvalid){
        if ($('#'+ input +'box').hasClass("glyphicon-ok")) {
            $('#'+ input +'box').removeClass("glyphicon-ok");
            $('#'+ input +'div').removeClass("has-success");
        }
        $('#'+ input +'box').addClass("glyphicon-remove");
        $('#'+ input +'div').addClass("has-error");
        if ($('.'+ input +'alert').hasClass("hidden"))
            $('.'+ input +'alert').removeClass("hidden");
        $('.'+ input +'alert').removeClass("disappear");
        $('.'+ input +'alert').addClass("appear");
        $('.'+ input +'alert').text(faildata);
    }else{
        if ($('#'+ input +'box').hasClass("glyphicon-remove")) {
            $('#'+ input +'box').removeClass("glyphicon-remove");
            $('#'+ input +'div').removeClass("has-error");
        }
        $('#'+ input +'box').addClass("glyphicon-ok");
        $('#'+ input +'div').addClass("has-success");
        $('.'+ input +'alert').removeClass("appear");
        $('.'+ input +'alert').addClass("disappear");
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





