function createEvents(title, date, startTime, endTime) {
  var startDate = new Date(date + " " + startTime + " +8");
  var endDate = new Date(date + " " + endTime + " +8");
  var response = CalendarApp.getDefaultCalendar().createEvent(title,startDate,endDate, {sendInvites: true});
  Logger.log(response.getId());
  response.addEmailReminder(60);
  return response.getId();
}
function modifyEventsInterface(id, title, date, startTime, endTime) {
  var startDate = new Date(date + " " + startTime + " +8");
  var endDate = new Date(date + " " + endTime + " +8");
  modifyEvents(id, title, startDate, endDate);
  return id;
}
function modifyEvents(id, title, startDate, endDate) {
  var response = CalendarApp.getDefaultCalendar().getEventById(id);

  Logger.log(response.getTitle());
  Logger.log(response.getStartTime());
  Logger.log(response.getEndTime());

  response.setTitle(title);
  response.setTime(startDate, endDate);
}

function deleteEvents(id) {
  var response = CalendarApp.getDefaultCalendar().getEventById(id)
  response.deleteEvent();
}

function addGuests(id, guestEmail) {
  var response = CalendarApp.getDefaultCalendar().getEventById(id);
  response.addGuest(guestEmail);
  sendAddGuestEmail(guestEmail, id)
}

function removeGuests(id, guestEmail) {
  var response = CalendarApp.getDefaultCalendar().getEventById(id);
  response.removeGuest(guestEmail);
  sendRemoveGuestEmail(guestEmail, id);
}

function listGuests(id) {
  var guestList = CalendarApp.getDefaultCalendar().getEventById(id).getGuestList();
  return guestList;
}
function guestEmails(id) {
  guests = listGuests(id);

  var emails = [];
  for(var g=0; g<guests.length; g++)
  {
    emails.push(guests[g].getEmail());
  }
  console.log(emails);
  return emails;
}

function sendCreateConfirmationMail(receiver, room) {
  MailApp.sendEmail(receiver, "You have created a reservation on VRRA", "You have successfully created a reservation on room " + room);
}

function sendAddGuestEmail(receiver, id){
  var time = new Date(CalendarApp.getDefaultCalendar().getEventById(id).getStartTime());
  var timeStr = Utilities.formatDate(time, "GMT+8","yyyy-MM-dd' 'HH:mm:ss' '");
  MailApp.sendEmail(receiver, CalendarApp.getDefaultCalendar().getEventById(id).getTitle() , "You have been invited to the meeting and starting at " + timeStr + ". Please check at google calendar for more information");
}

function sendModifyConfirmationMail(receiver, room) {
  MailApp.sendEmail(receiver, "You have modified a reservation on VRRA", "You have successfully modified a reservation on room " + room);
}

function sendDeleteConfirmationMail(receiver, room) {
  MailApp.sendEmail(receiver, "You have successful cancelled a reservation on VRRA", "You have successfully cancelled a reservation on room " + room);
}

function sendDeleteConfirmationMailForAll(id,room){
    var mail = guestEmails(id);
    var mailLen = mail.length;
    for(var i=0;i<mailLen;i++)
      sendRemoveGuestEmail(mail[i],id);
}

function sendRemoveGuestEmail(receiver, id){
  var time = new Date(CalendarApp.getDefaultCalendar().getEventById(id).getStartTime());
  var timeStr = Utilities.formatDate(time, "GMT+8","yyyy-MM-dd' 'HH:mm:ss' '");
  MailApp.sendEmail(receiver, CalendarApp.getDefaultCalendar().getEventById(id).getTitle() + " that has been cancelled" , "The meeting starting at " + timeStr + ". Has been cancelled. For more information. please contact host for more information");
}

function deleteEventInSheet(id) {
  var ss = SpreadsheetApp.openById(SheetID).getSheetByName("list");
  Logger.log(ss.getName());
  var rows = ss.getRange(2,1,ss.getLastRow()-1, ss.getLastColumn()).getValues();

  var rowLen = rows.length
  for(var i=0;i<rowLen;i++)
  {
    var dataRow = rows[i];
    if(dataRow[6] == id){
      ss.deleteRow(i+2);

    }
  }
  return id;
}