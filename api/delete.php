<?php

date_default_timezone_set("Asia/Bangkok");
header('Content-Type: application/json');

// Cancel

if($_SERVER['REQUEST_METHOD'] === 'POST')
{
    $action = $_REQUEST["action"];
    if($action=='cancel')
    {
        include("configmdc.php");
        $booking_employee_id = $_REQUEST["booking_employee_id"];
        $booking_seat_id = $_REQUEST["booking_seat_id"];

        $sql = "DELETE FROM booking_employee WHERE booking_employee_id = '$booking_employee_id' AND booking_seat_id = '$booking_seat_id'";
        if ($mysqli->query($sql) === TRUE)
        {
            $myArray = array(
                "code"=>200,
                "Message"=>"Delete $booking_seat_id Success"
            );
            echo json_encode($myArray);
        }
    }
}