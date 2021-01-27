function getUserAccount() {
  var account = Session.getEffectiveUser().getEmail();
  Logger.log(account);
  return account;
}
function getUserKey() {
  var key = Session.getTemporaryActiveUserKey();
  Logger.log(key);
  return key;
}
