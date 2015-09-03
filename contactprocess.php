<?php
//TODO az üzenetek adatbázisba mentése

function test_input($data) {
    $data = trim($data);
    $data = stripslashes($data);
    $data = htmlspecialchars($data);
    return $data;
}

$isformvalid = true;
$isvalid = array();
$faildata = array();
$return = array();


//validate name
$name = test_input($_POST['name']);
if (empty($name)) {
    $isvalid['name'] = false;
    $faildata['name'] = "Nem adott meg nevet!";
    $isformvalid = false;
} else {
    if (!preg_match("/^[\\p{L&}\\s ]*$/u", $name)) {
        $isvalid['name'] = false;
        $faildata['name'] = "Csak betűk és szóközök lehetnek!";
        $isformvalid = false;
    } else {
        $isvalid['name'] = true;
    }
}
//validate email
$email = test_input($_POST['email']);
if (empty($email)) {
    $isvalid['email'] = false;
    $faildata['email'] = "Nem adott meg emailcímet!";
    $isformvalid = false;
} else {
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $isvalid['email'] = false;
        $faildata['email'] = "Nem megfelelő az email formátuma!";
        $isformvalid = false;
    } else {
        $isvalid['email'] = true;
    }
}
//validate message
$message = test_input($_POST['message']);
if (empty($message)) {
    $isvalid['message'] = false;
    $faildata['message'] = "Kérjük röviden vázolja fel kérdését!";
    $isformvalid = false;
} else {
    $isvalid['message'] = true;
}


//send email and check if sent
if($isformvalid) {
    $success = true;/*mail("gguzmics01@gmail.com", "Koll-Art Teszt email", $message,
        'From: no-reply@koll-art.hu' . "\r\n" .
        'X-Mailer: PHP/' . phpversion());*///még emailt át kell írni de mükődik
    if(!$success){
        $isvalid['sentmail'] = false;
        $faildata['sentmail'] = "Sajnos nem sikerült elküldenünk az üzenetet, próbálja meg később!";
    }else{
        $isvalid['sentmail'] = true;
    }
}

// return a response ===========================================================

$return['isformvalid'] = $isformvalid;
$return['isvalid'] = $isvalid;
$return['faildata'] = $faildata;

echo json_encode($return);

/**
 * Created by PhpStorm.
 * User: Gumacs
 * Date: 2015-08-21
 * Time: 12:54 AM
 */
