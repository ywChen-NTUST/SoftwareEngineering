function checkCreate(data) {
  var ss = SpreadsheetApp.openById(SheetID).getSheetByName("list");
  var range = ss.getRange(2,1,ss.getLastRow()-1, ss.getLastColumn());

  var rows = range.getValues();
  var rowLen = rows.length
  for(var i = 0 , j = rowLen , k =0 ; i<j ; i++){
    var dataRow = rows[i];
    if( dataRow[0] == data[0])
        // @ts-ignore
        if(Utilities.formatDate(dataRow[2], 'GMT+8' , 'HHmm') >= data[1] || Utilities.formatDate(dataRow[3], 'GMT+8' , 'HHmm') <= data[2])
            // @ts-ignore
          if(Utilities.formatDate(dataRow[4], 'GMT+8' , 'yyyy-M-dd') == data[3])
    {
      return false;
    }
  }
  return true;
}

function checkModify(data) {
  var ss = SpreadsheetApp.openById(SheetID).getSheetByName("list");
  var range = ss.getRange(2,1,ss.getLastRow()-1, ss.getLastColumn());

  var rows = range.getValues();
  var rowLen = rows.length
  for(var i = 0 , j = rowLen; i<j ; i++){
    var dataRow = rows[i];
    if( dataRow[6] != data[4]){
      if( dataRow[0] == data[0]){
        // @ts-ignore
        if(Utilities.formatDate(dataRow[2], 'GMT+8' , 'HHmm') >= data[1] || Utilities.formatDate(dataRow[3], 'GMT+8' , 'HHmm') <= data[2]){
            // @ts-ignore
          if(Utilities.formatDate(dataRow[4], 'GMT+8' , 'yyyy-M-dd') == data[3]){
      return false;
    }}}}}
  return true;
}