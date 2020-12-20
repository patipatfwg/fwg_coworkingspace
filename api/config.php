<?php

    $servername_db = base64_decode("NTIuMTYzLjgyLjI0OToxMTc4");
    $username_db = base64_decode("cHJvbXB0YWRt");
    $password_db = base64_decode("Y2hlZSNNYWk1");
    $dbname_db = base64_decode("aHJzZXJ2aWNlcw==");

    // Create connection
    $mysqli = new mysqli($servername_db, $username_db, $password_db,$dbname_db);

    // Check connection
    if ($mysqli->connect_error) {
        die("Connection failed: " . $mysqli->connect_error."<hr>");
    }
    else
    {
        // echo "connect<br>";
    }