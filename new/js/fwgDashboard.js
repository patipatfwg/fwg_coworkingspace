function KickStartDashboard()
{
  $checkLogout = checkLogout();
  if($checkLogout==true)
  {
    $("#titleDatetime").val( FWGDate(1) );
    $("#InputDatetimeStart").val(FWGDate(2));
    $("#InputDatetimeEnd").val(FWGDate(3)); 
    displayDashboard();    
  }  
}

function displayDashboard()
{
  var request = $.ajax({
    method: "POST",url: "api/read.php",
    data: { action:"dashboard" }
  });
  request.fail(function (jqXHR, textStatus) {
    //504
    alert("Please Check Internet");
  });
  request.done(function(msg) {
    var code = msg.code;
    if(code==200)
    {
      showSeat('AA','A',1,8,4);
      showSeat('AB','A',9,14,11);
      showSeat('AC','A',15,20,0);

      showSeat('BA','B',1,20,5);

      showSeat('DA','D',1,10,5);
      showSeat('DB','D',11,20,15);
      showSeat('DC','D',24,28,4);
      showSeat('DD','D',29,36,4);

      showSeat('EA','E',1,24,5);
      showSeat('EB','E',25,27,0);

      // $("#msgbox").html(msg);
    }
  }); 
}

function FWGDate(sw)
{
  // var d = new Date().toLocaleDateString();
  var dt = new Date();
  var time = dt.getHours() + ":" + dt.getMinutes();

  if(sw==1)
  {
    var dayArr= ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
    dt.setDate(dt.getDate());
    var monthArr = ["January", "February","March", "April", "May", "June", "July", "August", "September", "October", "November","December"];
    var date = dayArr[dt.getDay()].toUpperCase() +", "+ dt.getDate() +" "+ monthArr[dt.getMonth()].toUpperCase() +" "+ dt.getFullYear();      
  }
  else if(sw==2)
  {
    var month = (dt.getMonth()+1);
    var date = dt.getFullYear()+"-"+month+"-"+dt.getDate()+" "+time;
  }
  else if(sw==3)
  {
    var duration = '30';
    var month = (dt.getMonth()+1);
    var time = dt.getTime() + (duration * 60 * 1000);

    var date = dt.getFullYear()+"-"+month+"-"+dt.getDate()+" "+time;
  }
  return date;
}

function showSeat(group,name,start,end,sub)
{
  var text = "";
  var i = start;
  var cut = sub;
  while (i <= end) {
    textname = name+i;
    text += "<div id='"+textname+"' class='SeatAvailable' onclick='checkBooking(#"+textname+")'>"+
              textname+
            "</div>";

    if(i==cut && sub!=0)
    {
      text+="||";
      cut=cut+sub;
    }
    i++;
  }
  idname = "#"+group;
  $(idname).html(text);

  var j = start;
  while (j <= end) {
    var textname = name+j;
    checkBooking(textname);
    j++;
  }

}

function checkBooking(seat)
{
  const driver = new Driver({ opacity: 0.4, showButtons: false, stageBackground: '#ffffff', allowClose: true });
  var seat_id = "#"+seat;
  $(seat_id).click(function(){
    //
    var request = $.ajax({
      method: "POST",url: "api/read.php",
      data: { action:"showseat", booking_seat_id:seat }
    });
    request.fail(function (jqXHR, textStatus) {
      //504
      $("#msgbox").html("Please Check Internet");
    });
    request.done(function(msg) {
      var title = "Seat: "+seat;
      var description = '';
      var cancel_btn = "";
      var code = msg.code;
      if(code==200)
      {
        console.log(code);
        description +=msg.first_name_en+" "+msg.last_name_en;
        description +="<br>"+msg.booking_employee_start+" - "+msg.booking_employee_end+cancel_btn;
        if(msg.first_name_en==localStorage.getItem("firstname") && msg.last_name_en==localStorage.getItem("lastname"))
        {
          console.log(seat_id);
          cancel_btn +="  <button id='cancleBooking' onclick='cancelBooking("+seat_id+")'>ยกเลิกการจอง</button>";
        }
        else
        {
          cancel_btn +="";
        }
      }
      else if(code==404)
      {
        console.log(code);
        title ="Seat: "+seat;
        description +="<input type='text' class='form-control form-control-md' placeholder='' id='InputDatetimeStart'>";
        description +="<input type='text' class='form-control form-control-md mt-1' placeholder='' id='InputDatetimeEnd'>";
        description +="<button type='button' class='form-control form-control-md btn btn-primary mt-1' id='Booking'>Booking</button>";
        $("#InputDatetimeStart").val(FWGDate(2));
        $("#InputDatetimeEnd").val(FWGDate(3));
      }

      driver.highlight({
        element: seat_id,
        popover: {
            title: title,
            description: description,
            position: 'top',
        } 
      }); 

    });
    //
  });
}


function callCreate(booking_employee_start,booking_employee_end)
{
  var request = $.ajax({
    method: "POST",url: "api/create.php",
    data: { 
      action : "add",
      user_id : localStorage.getItem("user_id"),
      booking_employee_start : $("#InputDatetimeStart").val(),
      booking_employee_end : $("#InputDatetimeEnd").val(),
      booking_type_id : 1,
      booking_room_id : 0,
      booking_zone_id : $("#InputZone").val(),
      booking_seat_id : $("#InputSeat").val()
    }
  });
  request.fail(function (jqXHR, textStatus) {
    //504
    $("#msgbox").html("Please Check Internet");
  });
  request.done(function(msg) {
    var code = msg.code;
    if(code==200)
    {
      // $("#msgbox").html(msg);
      alert(msg);
    }
    else
    {
      // $("#msgbox").html(msg);
      alert(msg);
    }
  });      
}

function getSeatDescription(seat)
{
  var request = $.ajax({
    method: "POST",url: "api/read.php",
    data: { action:"showseat", booking_seat_id:seat }
  });
  request.fail(function (jqXHR, textStatus) {
    //504
    $("#msgbox").html("Please Check Internet");
  });
  request.done(function(msg) {
    // const driver = new Driver({ opacity: 0.4, showButtons: false, stageBackground: '#ffffff', allowClose: true });
    // var textseat = "#"+seat;
    // console.log(textseat);

    var code = msg.code;
    if(code==200)
    {
      // $("#msgbox").html(msg.first_name_en);
      alert("y");

          // driver.highlight({
          //   element: textseat,
          //     popover: {
          //       title: 'y',
          //       description: 'Booking: 19:30 - 20:00',
          //       position: 'top',
          //     }
          // });
    }
    else if(code==404)
    {
      // driver.highlight({
      //   element: textseat,
      //     popover: {
      //       title: 'n',
      //       description: 'Booking: 19:30 - 20:00',
      //       position: 'top',
      //     }
      // });
    }
  });
}

function checkLogout()
{
  var dt = new Date();
  var time = dt.getHours();
  var login_at = localStorage.getItem("login_at")+1;
  if(time>login_at)
  {
    localStorage.clear();
    window.location.assign("login.html");
    exit(0);
  }
  else
  {
    return true;
  }
}

function addBooking()
{

}

function cancelBooking(seat_id)
{
  var request = $.ajax({
    method: "POST",url: "api/update.php",
    data: { action:"cancel" , seat_id:seat_id }
  });
  request.fail(function (jqXHR, textStatus) {
    //504
    $("#msgbox").html("Please Check Internet");
  });
  request.done(function(msg) {
    var code = msg.code;
    if(code==200)
    {

    }
    else if(code==404)
    {

    }
  });
}

// function Popover(seat)
// {
//   var res = seat.substring(1);
//   const driver = new Driver({ opacity: 0.4, showButtons: false, stageBackground: '#ffffff', allowClose: true });
//   driver.highlight({
//     element: seat,
//       popover: {
//         title: 'Seat: '+res+'<br> Patipat Chanrungruang',
//         description: 'Booking: 19:30 - 20:00',
//         position: 'top',
//       }
//   });
// }

// function Rectangle()
// {
//     var elem = document.getElementById('draw-group');
//     var two = new Two({ width: 50, height: 50 }).appendTo(elem);

//     // var circle = two.makeCircle(-70, 0, 50);
//     var rect = two.makeRectangle(70, 0, 100, 100);
//     // circle.fill = '#FF8000';
//     // circle.stroke = 'orangered';
//     rect.fill = 'rgba(0, 200, 255, 0.75)';
//     rect.stroke = '#1C75BC';

//     // Groups can take an array of shapes and/or groups.
//     var group = two.makeGroup(rect);

//     // And have translation, rotation, scale like all shapes.
//     group.translation.set(two.width / 2, two.height / 2);
//     group.rotation = Math.PI;
//     group.scale = 0.75;

//     // You can also set the same properties a shape have.
//     group.linewidth = 7;

//     two.update();
// }