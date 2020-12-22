<?php

date_default_timezone_set("Asia/Bangkok");
header('Content-Type: application/json');

// Booking

if($_SERVER['REQUEST_METHOD'] === 'POST')
{
    $action = $_REQUEST["action"];
    if($action=='cancel')
    {
        $booking_employee_id = $_REQUEST["booking_employee_id"];

        $myArray = array(
            "code"=>200,
            "Message"=>"Delete $booking_employee_id"
        );
        echo json_encode($myArray);

        // $sql = "DELETE FROM booking_employee WHERE user_id='Alfreds Futterkiste'";
    }
}