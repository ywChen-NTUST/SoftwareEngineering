function doGet(e) {
  Logger.log( Utilities.jsonStringify(e) );
  if (!e || !e.parameter.page) {
    // When no specific page requested, return "home page"
    return HtmlService.createTemplateFromFile('index').evaluate().setTitle('VRRA');
  }
  // else, use page parameter to pick an html file from the script
  return HtmlService.createTemplateFromFile(e.parameter['page']).evaluate().setTitle('VRRA');
  
}

function getScriptUrl() {
 var url = ScriptApp.getService().getUrl();
 return url;
}


// Place Example VRRADB Google Sheet ID Here!
var SheetID = "1lKe_sA49vMN3YdHAawCDnB2FsJ9FZ7e9xGL1t7tR_Hs";