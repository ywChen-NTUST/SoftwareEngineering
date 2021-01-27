function getAllRRA(){
  var ss = SpreadsheetApp.openById(SheetID).getSheetByName("list");
  Logger.log(ss.getName());
  var range = ss.getRange(2,1,ss.getLastRow()-1, ss.getLastColumn());
  var showData = [];

  var isHaveDataOrNot = false;
  var rows = range.getValues();
  var rowLen = rows.length
  for(var i = 0 , j = rowLen , k =0 ; i<j ; i++){
  var dataRow = rows[i];
  var status = dataRow[5];
  var record = [];
  if(status == false){
    record[0] = dataRow[0];
    record[1] = dataRow[1];
    // @ts-ignore
    record[2] = Utilities.formatDate(dataRow[2], 'GMT+8' , 'HH:mm');
    // @ts-ignore
    record[3] = Utilities.formatDate(dataRow[3], 'GMT+8' , 'HH:mm');
    // @ts-ignore
    record[4] = Utilities.formatDate(dataRow[4], 'GMT+8' , 'yyyy-MM-dd');
    showData.push(record);
    k++;
    }
  }
  Logger.log(showData);
  return showData;
}

function getHostRRA(){
 var ss = SpreadsheetApp.openById(SheetID).getSheetByName("list");
  Logger.log(ss.getName());
  var range = ss.getRange(2,1,ss.getLastRow()-1, ss.getLastColumn());
  var showData = [];

  var email = Session.getActiveUser().getEmail()
  var rows = range.getValues();
  var rowLen = rows.length
  for(var i = 0 , j = rowLen , k =0 ; i<j ; i++){
    var dataRow = rows[i];
    var status = dataRow[5];
    var record = [];
    if(dataRow[7] == email)
    {
    record[0] = dataRow[0];
    record[1] = dataRow[1];
    // @ts-ignore
    record[2] = Utilities.formatDate(dataRow[2], 'GMT+8' , 'HH:mm');
    // @ts-ignore
    record[3] = Utilities.formatDate(dataRow[3], 'GMT+8' , 'HH:mm');
    // @ts-ignore
    record[4] = Utilities.formatDate(dataRow[4], 'GMT+8' , 'yyyy-MM-dd');
    record[5] = dataRow[6];
    showData.push(record);
    k++;
    }
  }
  Logger.log(showData);
  return showData;
}

function writeHostRRA(room, host, ft, tt, dt, id, email){
  var ss = SpreadsheetApp.openById(SheetID).getSheetByName("list");
  Logger.log(ss.getName());
  var lastRow = ss.getLastRow();

  ss.getRange(lastRow + 1, 1).setValue(room);
  ss.getRange(lastRow + 1, 2).setValue(host);
  ss.getRange(lastRow + 1, 3).setValue(ft);
  ss.getRange(lastRow + 1, 4).setValue(tt);
  ss.getRange(lastRow + 1, 5).setValue(dt);
  ss.getRange(lastRow + 1, 7).setValue(id);
  ss.getRange(lastRow + 1, 8).setValue(email);
}

function updateHostRRA(roomNum, hostName, fromTime, toTime, date, id, email){
  deleteEventInSheet(id);
  writeHostRRA(roomNum, hostName, fromTime, toTime, date, id, email);
  return id;
}
