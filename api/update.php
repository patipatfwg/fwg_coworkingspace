<?php

date_default_timezone_set("Asia/Bangkok");

include("configmdc.php");

if($_SERVER['REQUEST_METHOD'] === 'POST')
{
    $action = $_REQUEST["action"];
    if($action =='update')
    {
        // $sql_seat = "SELECT booking_zone_title,booking_seat_amount FROM booking_seat LEFT JOIN booking_zone ON booking_seat.booking_zone_id = booking_zone.booking_zone_id";
        $sql = "SELECT * FROM booking_employee WHERE DATE(booking_employee_end) = DATE(NOW()) AND TIME(booking_employee_end) < TIME(NOW()) AND booking_employee_status = 'checkin'";

    }
}