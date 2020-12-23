function KickStartDashboard()
{
  $checkLogout = checkLogout();
  if($checkLogout==true)
  {

    $("#titleDatetime").val( FWGDate('today','string') );
    $("#DatetimeValue").val( FWGDate('today','timestamp') );
    $("#InputDatetimeStart").val(FWGDate(2,0));
    $("#InputDatetimeEnd").val(FWGDate(3,0)); 
    displayDashboard();
    setInterval("getDashboardStatus()", 30000);
    
    $('#btn-next-day').click(function(){
      NextDay();
    });

    $('#btn-prev-day').click(function(){
      PrevDay();
    });

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
      showSeatAA('AA','A',1,8,4);
      showSeatAB('AB','A',9,14,11);
      showSeatAC('AC','A',15,20,0);

      showSeatB('BA','B',1,20,5);

      showSeatC('CA','C',1,8,4);
      showSeatC('CB','C',9,22,15);
      showSeatC('CC','C',23,26,24);

      showSeatD('DA','D',1,20,5);
      showSeatD('DB','D',21,36,4);

      showSeatC('EA','E',1,24,5);
      showSeatC('EB','E',25,27,0);
    }
  }); 
}

function FWGDate(sw,subsw)
{
  // var d = new Date().toLocaleDateString();
  var dt = new Date();
  var time = dt.getHours() + ":" + dt.getMinutes();

  if(sw=='today')
  {
    if(subsw=='string')
    {
      var dayArr= ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
      dt.setDate(dt.getDate());
      var monthArr = ["January", "February","March", "April", "May", "June", "July", "August", "September", "October", "November","December"];
      var date = dayArr[dt.getDay()].toUpperCase() +", "+ dt.getDate() +" "+ monthArr[dt.getMonth()].toUpperCase() +" "+ dt.getFullYear();  
    }
    else if(subsw=='int')
    {
      var month = (dt.getMonth()+1);
      var date = dt.getFullYear() + "-" +month+ "-" + dt.getDate();
      // console.log(date);
    }
    else if(subsw=='timestamp')
    {
      // dt.setTime(dt.getTime() + 86400000 );

      var date = dt.setTime(dt.getTime() );

      // var month = (dt.getMonth());
      // var dateS = dt.getFullYear() + "-" +month+ "-" + dt.getDate();

      // var datum = Date.parse(dateS);
      // var date = datum/1000;
    }
    
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

function abc(UNIX_timestamp)
{
  

  var myDate = new Date( UNIX_timestamp *1000);
  var date = myDate.toLocaleString();



  var dayArr= ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
  var monthArr = ["January", "February","March", "April", "May", "June", "July", "August", "September", "October", "November","December"];
  // var date = dayArr[day] +", "+ day +" "+ monthArr[month] +" "+ year;


  return date;
}

function NextDay()
{
  // const today = new Date();
  // const tomorrow = new Date(today);
  // var aa = tomorrow.setDate(tomorrow.getDate() + 1);
  // aa = abc(aa);



  var aa = $("#DatetimeValue").val();
  var aa = parseInt(aa);
  var aaa = aa +  ( 1*24*60*60*1000);

  var re = abc(aaa);

// alert(re);
  // $("#titleDatetime").val( re );
  $("#DatetimeValue").val( aaa );

}

function PrevDay()
{
  const today = new Date();
  const tomorrow = new Date(today);
  var aa = tomorrow.setDate(tomorrow.getDate() - 1);
  // aa = abc(aa);
  $("#titleDatetime").val( aa ); 
}

function getDashboardStatus() {
  // $('#main-panel').load('dashboard.html');
  displayDashboard();
}


function showSeatAA(group,name,start,end,sub)
{
  var marginleft = "style='margin-top:1px; margin-left: 18px;'";
  var text = "<div class='row' "+marginleft+">";
  var i = start;
  var cut = sub;
  while (i <= end) {
    textname = name+i;
    text += "<div id='"+textname+"' class='SeatAvailableB' >"+
              textname+
            "</div>";

    if(i==cut && sub!=0)
    {
      text+="</div><div class='row' "+marginleft+">";
      cut=cut+sub;
    }
    i++;
  }
  idname = "#"+group;
  $(idname).html(text);

  var j = start;
  while (j <= end) {
    var textname = name+j;
    showBooking(textname);
    j++;
  }

}

function showSeatAB(group,name,start,end,sub)
{
  var marginleft = "style='margin-top:10px; margin-left: 40px;'";
  var text = "<div class='row' "+marginleft+">";
  var i = start;
  var cut = sub;
  while (i <= end) {
    textname = name+i;
    text += "<div id='"+textname+"' class='SeatAvailableB' >"+
              textname+
            "</div>";

    if(i==cut && sub!=0)
    {
      text+="</div><div class='row' style='margin-top:1px; margin-left: 40px;' >";
      cut=cut+sub;
    }
    i++;
  }
  idname = "#"+group;
  $(idname).html(text);

  var j = start;
  while (j <= end) {
    var textname = name+j;
    showBooking(textname);
    j++;
  }

}

function showSeatAC(group,name,start,end,sub)
{
  var marginleft = "style='margin-top: 2px; margin-left: -20px;'";
  var text = "<div class='row' "+marginleft+">";
  var i = start;
  var cut = sub;
  while (i <= end) {
    textname = name+i;
    text += "<div id='"+textname+"' class='SeatAvailableA' >"+
              textname+
            "</div>";
    i++;
  }
  idname = "#"+group;
  $(idname).html(text);

  var j = start;
  while (j <= end) {
    var textname = name+j;
    showBooking(textname);
    j++;
  }

}

function showSeatB(group,name,start,end,sub)
{
  var marginleft = "style='margin-top 1px; margin-left: 25px;'";
  var text = "<div class='row' "+marginleft+">";
  var i = start;
  var cut = sub;
  while (i <= end) {
    textname = name+i;
    text += "<div id='"+textname+"' class='SeatAvailableB' >"+
              textname+
            "</div>";

    if(i==cut && sub!=0)
    {
      text+="</div><div class='row' "+marginleft+">";
      cut=cut+sub;
    }
    i++;
  }
  idname = "#"+group;
  $(idname).html(text);

  var j = start;
  while (j <= end) {
    var textname = name+j;
    showBooking(textname);
    j++;
  }

}

function showSeatC(group,name,start,end,sub)
{
  var marginleft = "style='margin-top 1px; margin-left: 25px;'";
  var text = "<div class='row' "+marginleft+">";
  var i = start;
  var cut = sub;
  while (i <= end) {
    textname = name+i;
    text += "<div id='"+textname+"' class='SeatAvailableB' >"+
              textname+
            "</div>";

    if(i==cut && sub!=0)
    {
      text+="</div><div class='row' "+marginleft+">";
      cut=cut+sub;
    }
    i++;
  }
  idname = "#"+group;
  $(idname).html(text);

  var j = start;
  while (j <= end) {
    var textname = name+j;
    showBooking(textname);
    j++;
  }

}

function showSeatD(group,name,start,end,sub)
{
  var marginleft = "style='margin-top 1px; margin-left: 12px;'";
  var text = "<div class='row' "+marginleft+">";
  var i = start;
  var cut = i + sub - 1;
  while (i <= end) {
    textname = name+i;
    text += "<div id='"+textname+"' class='SeatAvailableB' >"+
              textname+
            "</div>";

    if(i==cut && sub!=0)
    {
      text+="</div><div class='row' "+marginleft+">";
      cut=cut+sub;
    }
    i++;
  }
  idname = "#"+group;
  $(idname).html(text);

  var j = start;
  while (j <= end) {
    var textname = name+j;
    showBooking(textname);
    j++;
  }

}

function showBooking(seat)
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
        // console.log(code);
        var booking_employee_id = msg.booking_employee_id;

        description +="<div>";

        description +=msg.first_name_en+" "+msg.last_name_en;
        if(msg.first_name_en==localStorage.getItem("firstname") && msg.last_name_en==localStorage.getItem("lastname"))
        {
          cancel_btn +="  <i id='cancleBooking' class='mdi mdi-close-box-outline text-danger mx-0'  onclick='cancelBooking()'>Cancel Booking</i>";
          cancel_btn +="<input type='hidden' id='booking_employee_id' value='"+booking_employee_id+"'>"
          cancel_btn +="<input type='hidden' id='booking_seat_id' value='"+seat+"'>"

        }
        else
        {
          cancel_btn +="";
        }
        description +="<br><b>At:</b> ";
        description +=msg.booking_employee_time_start+" - "+msg.booking_employee_time_end+cancel_btn;

        description +="</div>";

      }
      else if(code==404)
      {
        // console.log("showSeat "+code);
        title ="Seat: "+seat+"";
        description += BookingForm(seat);
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

function BookingForm(tmp_seat)
{
  var d = new Date();
  var Hour = d.getHours();
  var Hours = Hour + 1;

  var date = FWGDate('today','int');

  var r="";
  r +="<div id='booking-form' class='col' >";
  r +="<div id='booking-form0' class='row' >";
  r +="<div class='col-4'>";
  r +="<label>Date :</label>";
  r +="</div>";
  r +="<div class='col-8'>";
  r +="<input type='text' class='form-control form-control-sm docs-date' name='dateTimePicker' id='Inputdate' value='"+date+"' ></input>";
  r +="</div>";
  r +="</div>";

  r +="<div id='booking-form1' class='row mt-1' >";
  r +="<div class='col-4'>";
  r +="<label>Start :</label>";
  r +="</div>";
  r +="<div class='col-4'>";
  r +="<select class='form-select form-control-sm' id='InputHourStart' required=''>";
  var i=6;
  while(i<=23)
  {
    var ss = "";
    if(Hour==i)
    {
      var ss = "selected='selected'";
    }
    r +="<option "+ss+" value='"+i+"'>"+i+"</option>";
    i++; 
  }
  r +="</select>";
  r +="</div>";
  r +="<div class='col-4'>";
  r +="<select class='form-select form-control-sm' id='InputMinStart' required=''>";
  r +="<option value='0' selected='selected'>00</option>";
  r +="<option value='30'>30</option>";
  r +="</select>";
  r +="</div>";
  r +="</div>";
  r +="<div id='booking-form2' class='row mt-1 mb-1'>";
  r +="<div class='col-4'>";
  r +="<label>End :</label>";
  r +="</div>";
  r +="<div class='col-4'>";
  r +="<select class='form-select form-control-sm' id='InputHourEnd'>";
  var i=6;
  while(i<=23)
  {
    var ss = "";
    if(Hour==i)
    {
      var ss = "selected='selected'";
    }
    r +="<option "+ss+" value='"+i+"'>"+i+"</option>";
    i++;  
  }
  r +="</select>";
  r +="</div>";
  r +="<div class='col-4'>";
  r +="<select class='form-select form-control-sm' id='InputMinEnd'>";
  r +="<option value='0'>00</option>";
  r +="<option value='30' selected='selected'>30</option>";
  r +="</select>";
  r +="</div>";
  r +="</div>";
  r +="<div id='booking-form3' class='row'>";
  r +="<span id='btn-add-booking' class='form-control btn btn-warning' onclick='addBooking()'>Booking</span>";
  r +="<input type='hidden' id='seat_number' value='"+tmp_seat+"'>"
  r +="</div>";
  r +="<div id='booking-form4' class='row'>";
  r +="</div>";
  r +="</div>";
  r +="</div>";

  return r;
}

function addBooking()
{
  // document.getElementById("btn-add-booking").style.display = "none";

  var tmp_seat = $('#seat_number').val();
  var booking_zone_id = tmp_seat.substring(0, 1);
 
  var datestart = $("#Inputdate").val();
  var hourstart = $("#InputHourStart").val();
  var minstart = $("#InputMinStart").val();
  var hourend = $("#InputHourEnd").val();
  var minend = $("#InputMinEnd").val();
  var timestart = hourstart+":"+minstart;
  var timeend = hourend+":"+minend;  

  var request = $.ajax({
    method: "POST",url: "api/create.php",
    data: { 
      action : "add",
      user_id : localStorage.getItem("user_id"),
      booking_employee_date : datestart,
      booking_employee_time_start : timestart,
      booking_employee_time_end : timeend,
      booking_type_id : 1,
      booking_room_id : 0,
      booking_zone_id : booking_zone_id,
      booking_seat_id : tmp_seat
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
      console.log("Success: "+code);
      document.getElementById("booking-form0").innerHTML = "";
      document.getElementById("booking-form1").innerHTML = "<b class='text-center'>Booking Success</b>";
      document.getElementById("booking-form2").innerHTML = "";
      document.getElementById("btn-add-booking").style.display = "none";

      setTimeout(() => {
        location.reload();
      }, 3000);

      // setTimeout(() => {
        // var proceed = confirm("Are you sure you want to proceed?");
        // if (proceed) {
        //   //proceed
        // } else {
        //   //don't proceed
        // }
      // }, 2000);
      
    }
    else if(code==404)
    {
      alert('404');
    }
    else if(code==500)
    {
      alert('505');
    }
  });

}

function cancelBooking()
{
  var booking_employee_id = $('#booking_employee_id').val();
  var booking_seat_id = $('#booking_seat_id').val();
  var request = $.ajax({
    method: "POST",url: "api/delete.php",
    data: { action:"cancel" , booking_employee_id:booking_employee_id , booking_seat_id:booking_seat_id }
  });
  request.fail(function (jqXHR, textStatus) {
    //504
    $("#msgbox").html("Please Check Internet");
  });
  request.done(function(msg) {
    var code = msg.code;
    if(code==200)
    {
      var proceed = confirm("Cancel Confirm?");
      if(proceed) 
      {
        location.reload();
      }
    }
    else if(code==404)
    {
      console.log(msg);
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

// function showSeat(group,name,start,end,sub)
// {
//   var text = "<div class='row'>";
//   var i = start;
//   var cut = sub;
//   while (i <= end) {
//     textname = name+i;
//     text += "<div id='"+textname+"' class='SeatAvailable' >"+
//               textname+
//             "</div>";

//     if(i==cut && sub!=0)
//     {
//       text+="</div><div class='row'>";
//       cut=cut+sub;
//     }
//     i++;
//   }
//   idname = "#"+group;
//   $(idname).html(text);

//   var j = start;
//   while (j <= end) {
//     var textname = name+j;
//     showBooking(textname);
//     j++;
//   }

// }

// function getSeatDescription(seat)
// {
//   var request = $.ajax({
//     method: "POST",url: "api/read.php",
//     data: { action:"showseat", booking_seat_id:seat }
//   });
//   request.fail(function (jqXHR, textStatus) {
//     //504
//     $("#msgbox").html("Please Check Internet");
//   });
//   request.done(function(msg) {
//     // const driver = new Driver({ opacity: 0.4, showButtons: false, stageBackground: '#ffffff', allowClose: true });
//     // var textseat = "#"+seat;
//     // console.log(textseat);

//     var code = msg.code;
//     if(code==200)
//     {
//       // $("#msgbox").html(msg.first_name_en);
//       alert("y");

//           // driver.highlight({
//           //   element: textseat,
//           //     popover: {
//           //       title: 'y',
//           //       description: 'Booking: 19:30 - 20:00',
//           //       position: 'top',
//           //     }
//           // });
//     }
//     else if(code==404)
//     {
//       // driver.highlight({
//       //   element: textseat,
//       //     popover: {
//       //       title: 'n',
//       //       description: 'Booking: 19:30 - 20:00',
//       //       position: 'top',
//       //     }
//       // });
//     }
//   });
// }

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

// function callCreate()
// {
//   var request = $.ajax({
//     method: "POST",url: "api/create.php",
//     data: { 
//       action : "add",
//       user_id : localStorage.getItem("user_id"),
//       booking_employee_start : $("#InputDatetimeStart").val(),
//       booking_employee_end : $("#InputDatetimeEnd").val(),
//       booking_type_id : 1,
//       booking_room_id : 0,
//       booking_zone_id : $("#InputZone").val(),
//       booking_seat_id : $("#InputSeat").val()
//     }
//   });
//   request.fail(function (jqXHR, textStatus) {
//     //504
//     $("#msgbox").html("Please Check Internet");
//   });
//   request.done(function(msg) {
//     var code = msg.code;
//     if(code==200)
//     {
//       // $("#msgbox").html(msg);
//       alert(msg);
//     }
//     else
//     {
//       // $("#msgbox").html(msg);
//       alert(msg);
//     }
//   });      
// }