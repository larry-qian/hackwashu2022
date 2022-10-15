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
 document.querySelector('[name="ctl00$Body$ctl15"]').click();
 
//  var searchBar = document.getElementByName("ctl00$Body$ctl15");
 
//  searchBar.value = searchBar.value + selection;
 
//  document.getElementById("searchform2").submit();
}
const times = [];
const dates = [];

function webScrapeCN() {
    document.querySelectorAll('.CrsOpen > table a')[1].textContent;
}

function webScrapeTime() {
	for(let i = 0; i < (document.querySelectorAll('.MainTableRow').length); i++) {
		if(!isNaN(document.querySelectorAll('.MainTableRow tbody tr td:nth-child(2)')[i*3].textContent)) {
			times.push(document.querySelectorAll('.MainTableRow tbody tr td:nth-child(4)')[i*2].textContent);
		}else{
			break;
		}
	}
}

function webScrapeDate() {
	for(let i = 0; i < (document.querySelectorAll('.MainTableRow').length); i++) {
		if(!isNaN(document.querySelectorAll('.MainTableRow tbody tr td:nth-child(2)')[i*3].textContent)) {
			dates.push(document.querySelectorAll('.MainTableRow tbody tr td:nth-child(3)')[i*2].textContent);
		}else { 
			break;
		}
	}
}
