<?php

date_default_timezone_set("Asia/Bangkok");
header('Content-Type: application/json');

include("configmdc.php");

if($_SERVER['REQUEST_METHOD'] === 'POST')
{
    $action = $_REQUEST["action"];
    if($action =='add')
    {
        $user_id = $_REQUEST["user_id"];
        $booking_employee_date = $_REQUEST['booking_employee_date'];
        $booking_employee_time_start = $_REQUEST['booking_employee_time_start'];
        $booking_employee_time_end = $_REQUEST['booking_employee_time_end'];
        $booking_type_id = $_REQUEST['booking_type_id'];
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

        $FLAG_CHECK = 1; 
        if($FLAG_CHECK==1)
        {
            date_default_timezone_set("Asia/Bangkok");
            $gettime = date("H:i");
            $getdate = date("Y-m-d");
            // $sqlbe1 = " AND CAST(booking_employee_time_start as time) >= '$booking_employee_time_start' OR  CAST(booking_employee_time_start as time) < '$booking_employee_time_end'";
            $sql_booking_employee_date = " AND booking_employee_date =  '$booking_employee_date'";
            $sql_booking_employee_time_start = " AND booking_employee_time_start =  '$booking_employee_time_start'";
            $sql_booking_employee_time_end = " AND booking_employee_time_end =  '$booking_employee_time_end'";
            $sql = "SELECT * FROM booking_employee WHERE booking_seat_id = '$booking_seat_id'".$sql_booking_employee_date.$sql_booking_employee_time_start.$sql_booking_employee_time_end; 

            // echo $sql;
            $result = $mysqli->query($sql);
            $count = $result->num_rows;
            $FLAG_CHECK = $count;
 
        }

        if($FLAG_CHECK==0)
        {
            $sql = "INSERT INTO booking_employee (user_id,booking_employee_date,booking_employee_time_start,booking_employee_time_end,booking_type_id,booking_room_id,booking_zone_id,booking_seat_id,booking_employee_status,created_at,updated_at) VALUES ( '$user_id','$booking_employee_date','$booking_employee_time_start','$booking_employee_time_end','$booking_type_id',$booking_room_id,'$booking_zone_id','$booking_seat_id','$booking_employee_status', NOW(),NOW() )";
            $result = $mysqli->query($sql);
            if( $result )
            {
                $code = 200;
                $msg = "Booking Success";
                $mysqli->close();
            }
            else
            {
                $code = 404;
                $msg = "Booking Fail";
            }            
        }
        else if($FLAG_CHECK==1)
        {
            $code = 500;
            $msg = "Seat $booking_seat_id Date and Time Sold";
        }

        $myArray = array(
            "code"=>$code,
            "Message"=>$msg
        );        
        echo json_encode($myArray);
    }
}