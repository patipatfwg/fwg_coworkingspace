<?php

date_default_timezone_set("Asia/Bangkok");

// Login 
// Dashboard
// Booking

if($_SERVER['REQUEST_METHOD'] === 'POST')
{
    $action = $_REQUEST["action"];
    if($action=='login')
    {
        include("config.php");
        $username = $_REQUEST["username"];
        $password = $_REQUEST["password"];
        $sql = "SELECT first_name_en,last_name_en,user_id FROM user LEFT JOIN employee ON user.id = employee.user_id WHERE user.activate = 1 AND user.id = '$username' AND user.password = '$password'";
        $result = $mysqli->query($sql);
        $count = mysqli_num_rows($result);
        if($count>0)
        {
            $row = $result->fetch_array();
            $code = 200;
            $first_name_en = $row["first_name_en"];
            $last_name_en = $row["last_name_en"];
            $user_id = $row["user_id"];
            $myArray = array(
                "code"=>$code,
                "firstname"=>$first_name_en,
                "lastname"=>$last_name_en,
                "user_id"=>$user_id
            );
            $mysqli->close();
        }
        else
        {
            $code = 404;
            $msg = "User or Password is incorrect";
            $myArray = array(
                "code"=>$code,
                "Message"=>$msg
            );
        }
        echo json_encode($myArray);       
    }
    else if($action=='dashboard')
    {
        $code = 200;
        


        $msg = "Hi";
        $myArray = array(
            "code"=>$code,
            "Message"=>$msg
        );
        echo json_encode($myArray);
    }
    else if($action=='booking')
    {
        $code = 200;
        $type = "seat";
        $zoneList = getZone();
        $dashboard = getDashboard();
        $myArray = array(
            "code"=>$code,
            "type"=>$type,
            "zone"=>$zoneList,
            "dashboard"=>$dashboard
        );
        echo json_encode($myArray);
    }
}

function getZone()
{
    include("configmdc.php");
    $sql_seat = "SELECT booking_zone_title,booking_seat_amount FROM booking_seat LEFT JOIN booking_zone ON booking_seat.booking_zone_id = booking_zone.booking_zone_id";
    $result_seat = $mysqli->query($sql_seat);
    $count_seat = mysqli_num_rows($result_seat);
    $zoneList = [];
    if($count_seat>0)
    {
        while($rowSeat = $result_seat->fetch_array())
        {
            $booking_zone_title = $rowSeat["booking_zone_title"];
            $booking_seat_amount = $rowSeat["booking_seat_amount"];
            $zoneList[] = array(
                $booking_zone_title => intval($booking_seat_amount)
            );
        }
    }
    $mysqli->close(); 
    return $zoneList;
}

function getDashboard()
{
    include("configmdc.php");

    $dashboard = [];

    return $dashboard;
}

?>