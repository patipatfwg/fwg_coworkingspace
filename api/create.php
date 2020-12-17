<?php

date_default_timezone_set("Asia/Bangkok");

include("configmdc.php");

if($_SERVER['REQUEST_METHOD'] === 'POST')
{
    $action = $_REQUEST["action"];
    if($action =='create')
    {
        $employee_id = $_REQUEST["user_id"];
        $booking_employee_start = $_REQUEST['booking_employee_start'];
        $booking_employee_end = $_REQUEST['booking_employee_end'];
        $booking_type_id = 1;
        if($booking_type_id==2)
        {
            $booking_room_id = $_REQUEST['booking_room_id'];
            $booking_zone_id = 0;
            $booking_seat_id = 0;
        }
        else if($booking_type_id==1)
        {
            $booking_room_id = 0;
            $booking_zone_id = $_REQUEST['booking_zone_id'];
            $booking_seat_id = $_REQUEST['booking_seat_id'];
        }
        $booking_employee_status = "checkin";
        $sql = "INSERT INTO booking_employee (employee_id,booking_employee_start,booking_employee_end,booking_type_id,booking_room_id,booking_zone_id,booking_seat_id,booking_employee_status,created_at,updated_at) VALUES ( '$employee_id','$booking_employee_start','$booking_employee_end','$booking_type_id',$booking_room_id,'$booking_zone_id','$booking_seat_id','$booking_employee_status', now(),now())";
        $result = $mysqli->query($sql);
        if( $result )
        {
            $myArray = ["Message"=>"Saved"];
            echo json_encode($myArray);
        }
    }
}