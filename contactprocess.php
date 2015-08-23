<?php

$err = false;
$errors = array();
$errormessages = array();
$return = array();


//validate name
$name = $_POST['name'];
if (empty($_POST['name'])) {
    $errors['name'] = true;
    $errormessages['name'] = "Nem adott meg nevet";
    $err = true;
} else {
    /*if (!preg_match("/^[a-zA-Z ]*$/", $name)) {
        $errors['name'] = true;
        $errormessages['name'] = "Csak betuk es szokozok megengedettek";
    } else */{
        $errors['nameinput'] = false;
    }
}
//validate email
$email = $_POST['email'];
if (empty($_POST['email'])) {
    $errors['email'] = true;
    $errormessages['email'] = "Nem adott meg email cimet";
    $err = true;
} else {
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $errors['email'] = true;
        $errormessages['email'] = "Nem megfelelo az email formatuma";
        $err = true;
    } else {
        $errors['emailinput'] = false;
    }
}
//validate message
$message = $_POST['message'];
if (empty($message)) {
    $errors['message'] = true;
    $errormessages['message'] = "Kerjuk irja meg, hogy milyen kerdese tamadt felenk";
    $err = true;
} else {
    $errors['message'] = false;
}


//send email and check if sent
if(!$err) {
    $success = true;/*mail("guzmics01@gmail.com", "Koll-Art Teszt email", $message,
        'From: webmaster@example.com' . "\r\n" .
        'Reply-To: webmaster@example.com' . "\r\n" .
        'X-Mailer: PHP/' . phpversion());*/
    if(!$success){
        $errors['sentmail'] = true;
        $errormessages['sentmail'] = "Sajnos nem sikerult elkuldenunk az emailt";
    }else{
        $errors['sentmail'] = false;
    }
}

// return a response ===========================================================

$return['errors'] = $errors;
$return['errormessages'] = $errormessages;

echo json_encode($return);

/**
 * Created by PhpStorm.
 * User: Gumacs
 * Date: 2015-08-21
 * Time: 12:54 AM
 */
