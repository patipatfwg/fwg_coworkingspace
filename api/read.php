<?php

include("config.php");

if($_SERVER['REQUEST_METHOD'] === 'POST')
{
    $action = $_REQUEST["action"];
    if($action=='login')
    {
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
            $result->close();
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
        $mysqli->close();        
    }
    else if($action=='create')
    {
        $sql = "SELECT first_name_en,last_name_en FROM user LEFT JOIN employee ON user.id = employee.user_id WHERE user.activate = 1 AND user.id = '$username' AND user.password = '$password'";
        $result = $mysqli->query($sql);
        $count = mysqli_num_rows($result);

        if($count>0)
        {
            $row = $result->fetch_array();
            $code = 200;
            $myArray = array(
                "code"=>$code,
                "type"=>"seat",
                "zone"=>""
            );
            $result->close();
        }

        echo json_encode($myArray);
        $mysqli->close(); 
    }
}
?>