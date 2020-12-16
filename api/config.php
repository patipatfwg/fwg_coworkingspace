<?php

    $servername = base64_decode("NTIuMTYzLjgyLjI0OToxMTc4");
    $username = base64_decode("cHJvbXB0YWRt");
    $password = base64_decode("Y2hlZSNNYWk1");
    $dbname = base64_decode("aHJzZXJ2aWNlcw==");

    // Create connection
    $mysqli = new mysqli($servername, $username, $password,$dbname);

    // Check connection
    if ($mysqli->connect_error) {
        die("Connection failed: " . $mysqli->connect_error."<hr>");
    }