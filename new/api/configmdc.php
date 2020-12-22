<?php

    $servername = base64_decode("ZnJlZXdpbGxtZGMubG9naW50by5tZTo1Njg2MA==");
    $username = base64_decode("ZndnYm9va2luZw==");
    $password = base64_decode("ZndnQDEyMzQ=");
    $dbname = base64_decode("ZndnX2Nvd29ya2luZ3NwYWNl");

    // Create connection
    $mysqli = new mysqli($servername, $username, $password,$dbname);

    // Check connection
    if ($mysqli->connect_error) {
        die("Connection failed: " . $mysqli->connect_error."<hr>");
    }