function insertScript() {
	chrome.tabs.query({active: true, currentWindow: true}, tabs => {
	chrome.scripting.executeScript({target: {tabId: tabs[0].id}, function: mainFunct})
	})
	window.close();
}
 
document.getElementById('buttonTwo').addEventListener('click', insertScript)
 
const times = [];
const dates = [];
const regsht = [];
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

function webScrapeWkSht() {
	for(let i = 2; i< (document.querySelectorAll('#grvFirstChoices > tbody > tr').length+1); i++) {
		regsht.push(document.querySelectorAll('#grvFirstChoices > tbody > tr:nth-child('+i+') > td:nth-child(4) > span')[0].textContent.trim());
	}
}


function mainFunct() {
	document.querySelector('[name="ctl00$Body$ctl15"]').click();
	webScrapeCN();
	webScrapeTime();
	webScrapeDate();
	webScrapeWkSht();
}
