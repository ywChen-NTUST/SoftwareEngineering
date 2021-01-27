
function deleteReserv(id,room) {
  sendDeleteConfirmationMail(Session.getActiveUser().getEmail(),room);
  sendDeleteConfirmationMailForAll(id,room);
  deleteEvents(id);
  deleteEventInSheet(id);
}