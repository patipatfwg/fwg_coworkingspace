<?php

date_default_timezone_set("Asia/Bangkok");
header('Content-Type: application/json');

// Login 
// Dashboard
// Booking
// ShowSeat

if($_SERVER['REQUEST_METHOD'] === 'POST')
{
    $action = $_REQUEST["action"];
    if($action=='login')
    {
        $username = $_REQUEST["username"];
        $password = $_REQUEST["password"];

        include("config.php");
        $sqlWHERE = " WHERE user.activate = 1 AND user.id = '$username' AND user.password = '$password'";
        $sql = "SELECT employee.id,user_id,first_name_en,last_name_en FROM user LEFT JOIN employee ON user.id = employee.user_id".$sqlWHERE;
        $result = $mysqli->query($sql);
        $count = mysqli_num_rows($result);
        if($count>0)
        {
            $row = $result->fetch_array();
            $msg = "OK";
            $code = 200;
            $employee_id = $row["id"];
            $user_id = $row["user_id"];
            $first_name_en = $row["first_name_en"];
            $last_name_en = $row["last_name_en"];

            $FLAG_CLONE = 1;
            if($FLAG_CLONE==1)
            {
                include("configmdc.php");
                $sql = "SELECT * FROM employee WHERE employee_id='$employee_id'";
                $result = $mysqli->query($sql);
                $count = mysqli_num_rows($result);
                if($count>0)
                {
                    $row = $result->fetch_array();
                    $user_id_mdc = $row["user_id"];
                    if($user_id_mdc=="")
                    {
                        $sqlB = "UPDATE employee SET user_id='$user_id'  WHERE employee_id='$employee_id'";
                        $resultB = $mysqli->query($sqlB);
                        $msg = $sqlB;
                    }
                }
                else if($count==0)
                {
                    $sqlB = "INSERT INTO employee (employee_id,user_id,first_name_en,last_name_en) VALUES ('$employee_id','$user_id','$first_name_en','$last_name_en')";
                    $resultB = $mysqli->query($sqlB);
                    $msg = $sqlB;
                }
            }

            $myArray = array(
                "code"=>$code,
                "message"=>$msg,
                "firstname"=>$first_name_en,
                "lastname"=>$last_name_en,
                "user_id"=>$user_id,
                "employee_id"=>$employee_id
            );
            $mysqli->close();
        }
        else
        {
            $code = 404;
            $msg = "User or Password is incorrect";
            $myArray = array(
                "code"=>$code,
                "message"=>$msg
            );
        }     
    }
    else if($action=='dashboard')
    {
        $code = 200;
        $msg = "Hi";
        $myArray = array(
            "code"=>$code,
            "Message"=>$msg
        );
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
    }
    else if($action=='showseat')
    {
        $seat = $_REQUEST["booking_seat_id"];
        $booking_employee_date = $_REQUEST["booking_employee_date"];

        include("configmdc.php");
        // $sql = "SELECT * FROM booking_employee LEFT JOIN employee ON booking_employee.user_id = employee.user_id WHERE DATE(booking_employee.booking_employee_end) = CURDATE()";
        date_default_timezone_set("Asia/Bangkok");
        // $getdate = date("Y-m-d");
        $sqlDATE = " AND booking_employee.booking_employee_date = '$booking_employee_date'";
        $sqlSeat = " booking_employee.booking_seat_id = '$seat'";
        $sqlOrder = " ORDER BY booking_employee.booking_employee_time_start ASC";
        $sql = "SELECT * FROM booking_employee LEFT JOIN employee ON booking_employee.user_id = employee.user_id WHERE ".$sqlSeat.$sqlDATE.$sqlOrder;
        // echo $sql;
        $result = $mysqli->query($sql);
        $count = mysqli_num_rows($result);
        if($count>0)
        {
            $code = 200;

            if($count==1)
            {
                $row = $result->fetch_array();
                $booking_employee_id = $row["booking_employee_id"];
                $first_name_en = $row["first_name_en"];
                $last_name_en = $row["last_name_en"];
                $booking_employee_time_start = $row["booking_employee_time_start"];
                $booking_employee_time_end = $row["booking_employee_time_end"]; 

                $myArray = array(
                    "code"=>$code,
                    "message"=>"OK",
                    "type"=>"A",
                    "first_name_en"=>$first_name_en,
                    "last_name_en"=>$last_name_en,
                    "booking_employee_time_start"=>$booking_employee_time_start,
                    "booking_employee_time_end"=>$booking_employee_time_end,
                    "booking_employee_id"=>$booking_employee_id
                );
            }
            else
            {
                while($row = $result->fetch_array(MYSQLI_ASSOC))
                {
                    $booking_employee_id = $row["booking_employee_id"];
                    $first_name_en = $row["first_name_en"];
                    $last_name_en = $row["last_name_en"];
                    $booking_employee_time_start = $row["booking_employee_time_start"];
                    $booking_employee_time_end = $row["booking_employee_time_end"];

                    $list[] = array(
                        "booking_employee_id"=>$booking_employee_id,
                        "booking_employee_time_start"=>$booking_employee_time_start,
                        "booking_employee_time_end"=>$booking_employee_time_end,
                        "first_name_en"=>$first_name_en,
                        "last_name_en"=>$last_name_en
                    );
                }

                $myArray = array(
                    "code"=>$code,
                    "message"=>"OK",
                    "type"=>"B",
                    "booking_employee_date"=>$booking_employee_date,
                    "list"=>$list
                );                

            }


        }
        else
        {
            $code = 404;
            $myArray = array(
                "code"=>$code,
                "message"=>"Seat Available"
            ); 
        }

    }
    else if($action=='showseatCSS')
    {
        include("configmdc.php");
        $booking_seat_id = $_REQUEST["booking_seat_id"];
        $booking_employee_date = $_REQUEST["booking_employee_date"];

        $sql = "SELECT booking_seat_id FROM booking_employee WHERE booking_employee.booking_seat_id = '$booking_seat_id' AND booking_employee.booking_employee_date = '$booking_employee_date'";
        $result = $mysqli->query($sql);
        $count = mysqli_num_rows($result);
        if($count>0)
        {
            $sqlTime = " AND booking_employee_time_start = '06:00' AND booking_employee_time_end = '23:00'";
            $sql = $sql.$sqlTime;
            $result = $mysqli->query($sql);
            $count = mysqli_num_rows($result);
            if($count>0)
            {
                $css = "SeatAvailableFull";
            }
            else
            {
                $css = "SeatAvailableHalf";
            }
        }
        else
        {
            $css = "SeatAvailable";
        }

        $code = 200;
        $myArray = array(
            "code"=>$code,
            "message"=>"OK",
            "css"=>$css
        ); 
    }

    echo json_encode($myArray); 
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