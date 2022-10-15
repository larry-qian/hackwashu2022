// This function inserts our autoSearch function into the page's code
function insertScript() {
 // This selects the focused tab for the operation and passes the autoSearch function
 chrome.tabs.query({active: true, currentWindow: true}, tabs => {
 chrome.scripting.executeScript({target: {tabId: tabs[0].id}, function: autoSearch})
 })
 
 // This closes the extension pop-up to select the website search bar
 window.close();
}
 
// This is an event listener that detects clicks on our "Start Random Search" button
document.getElementById('buttonTwo').addEventListener('click', insertScript)
 
// This function selects a random topic from an array and 
function autoSearch() {
 document.getElementById("ctl00$Body$ctl15").click();
 
//  var searchBar = document.getElementByName("ctl00$Body$ctl15");
 
//  searchBar.value = searchBar.value + selection;
 
//  document.getElementById("searchform2").submit();
}
