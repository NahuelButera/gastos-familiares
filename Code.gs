// ── Google Apps Script Backend ──
// Acepta requests desde GitHub Pages con CORS

function doGet(e) {
  const action = e && e.parameter && e.parameter.action;
  
  let result;
  if (action === "get" || !action) {
    result = getData();
  }
  
  return ContentService
    .createTextOutput(JSON.stringify(result))
    .setMimeType(ContentService.MimeType.JSON);
}

function doPost(e) {
  let data;
  try {
    data = JSON.parse(e.postData.contents);
  } catch(err) {
    data = null;
  }
  
  let result = { ok: false };
  if (data) {
    result = saveData(data);
  }
  
  return ContentService
    .createTextOutput(JSON.stringify(result))
    .setMimeType(ContentService.MimeType.JSON);
}

function getData() {
  const files = DriveApp.getFilesByName("GastosFamiliares");
  let ss;
  if (files.hasNext()) {
    ss = SpreadsheetApp.open(files.next());
  } else {
    ss = SpreadsheetApp.create("GastosFamiliares");
  }
  PropertiesService.getScriptProperties().setProperty("SS_ID", ss.getId());
  let sheet = ss.getSheetByName("datos");
  if (!sheet) sheet = ss.insertSheet("datos");
  const val = sheet.getRange("A1").getValue();
  if (!val) return { expenses: [], incomes: [], shopping: [] };
  try { return JSON.parse(val); } catch { return { expenses: [], incomes: [], shopping: [] }; }
}

function saveData(data) {
  const id = PropertiesService.getScriptProperties().getProperty("SS_ID");
  const ss = id ? SpreadsheetApp.openById(id) : SpreadsheetApp.create("GastosFamiliares");
  let sheet = ss.getSheetByName("datos");
  if (!sheet) sheet = ss.insertSheet("datos");
  sheet.getRange("A1").setValue(JSON.stringify(data));
  return { ok: true };
}
