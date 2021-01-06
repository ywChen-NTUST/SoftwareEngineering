$(function(){
    Retrieve();
});

function Retrieve() {
    var dataArray =[];
    var URL = 'https://script.google.com/macros/s/AKfycbw_YAfxvFbi7TIGBJyX6PLggRfYkyhB8JKzb_P13JUE8yhdqK3wM_cyQQ/exec';
    $.ajax({
        url: URL,
        type:'POST',
        dataType:"json",
        error: function (xhr) {
            alert('發生錯誤!請重新再試');
        },
        success: function (Jdata) {
            var Info = Jdata.data;
            // data len
            var Length = Number(Info.length);

            if(Length > 0){
                for (i = 0; Info.length > i; i++){
                    RoomNumber = Info[i].RoomNumber;
                    HostName = Info[i].HostName;
                    FromTime = Info[i].FromTime;
                    ToTime = Info[i].ToTime;
                    MeetingDate = Info[i].MeetingDate;

                    print();
                };
            }else{
                $("#table-data").append('No data');
            }
            // print
            function print(){
              $("#table-data").append(
                  '<tr>' +
                    '<td class="w-15">' + RoomNumber + '</td>' +
                    '<td class="w-15">' + HostName + '</td>' +
                    '<td class="w-15">' + FromTime + '</td>' +
                    '<td class="w-15">' + ToTime + '</td>' +
                    '<td class="w-15">' + MeetingDate + '</td>' +
                  '</tr>'
              );
            };
            // search
            $("#search").click(function(){
                select();
            });
            
            // search
            function select(value){
                $('tbody tr').each(function(){
                    var found = 'false';
                    $(this).each(function(){
                        if($(this).text().toLowerCase().indexOf(value.toLowerCase()) >= 0){
                            found = 'true';
                        }
                    });
                    if(found == 'true')
                    {
                        $(this).show();
                    }
                    else
                    {
                        $(this).hide();
                    }
                });
            };
        }
    });
};