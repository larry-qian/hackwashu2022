class Course {
    constructor(name, times, dates) {
        this.name = name;
        this.times = times;
        this.dates = dates;
    }
}

function insertScript1() {
	chrome.tabs.query({active: true, currentWindow: true}, tabs => {
	chrome.scripting.executeScript({target: {tabId: tabs[0].id}, function: mainFunct})
	})
	window.close();
}

function insertScript2(){
	chrome.tabs.query({active: true, currentWindow: true}, tabs => {
	chrome.scripting.executeScript({target: {tabId: tabs[0].id}, function: console.log('Generate')})
	})
	window.close();
}

 
document.getElementById('buttonGather').addEventListener('click', insertScript1)
document.getElementById('buttonGenerate').addEventListener('click', insertScript2)

 
var timeslist = [];
var dateslist = [];
var regsht = [];
var numCourses = 0;
var numSections = 0;

function webScrapeCN() {
    document.querySelectorAll('.CrsOpen > table a')[1].textContent;
}

function webScrapeTime() {
	timeslist = [];
	numSections = 0;
	for(let i = 0; i < (document.querySelectorAll('.MainTableRow').length); i++) {
		if(!isNaN(document.querySelectorAll('.MainTableRow tbody tr td:nth-child(2)')[i*3].textContent)) {
			timeslist.push(document.querySelectorAll('.MainTableRow tbody tr td:nth-child(4)')[i*2].textContent);
			numSections++;
		}else{
			break;
		}
	}
}

function webScrapeDate() {
	dateslist = []
	for(let i = 0; i < (document.querySelectorAll('.MainTableRow').length); i++) {
		if(!isNaN(document.querySelectorAll('.MainTableRow tbody tr td:nth-child(2)')[i*3].textContent)) {
			dateslist.push(document.querySelectorAll('.MainTableRow tbody tr td:nth-child(3)')[i*2].textContent);
		}else { 
			break;
		}
	}
}

function webScrapeWkSht() {
	for(let i = 2; i< (document.querySelectorAll('#grvFirstChoices > tbody > tr').length+1); i++) {
		regsht.push(document.querySelectorAll('#grvFirstChoices > tbody > tr:nth-child('+i+') > td:nth-child(4) > span')[0].textContent.trim());
		numCourses++;
	}
	
}

// funciton getClasses() {
// 	console.log(webScrapeWkSht());
// }

function mainFunct() {
	document.querySelector('[name="ctl00$Body$ctl15"]').click();
	var searchBar = document.getElementById("Body_txtSearchKeyword");
	for(let j = 0; j < numCourses; j++){
		searchBar.value = searchBar.value + regsht[i];
		document.querySelector('[name="ctl00$Body$ctl15"]').click();
		var name = regsht[i];
		webScrapeTime();
		webScrapeDate();
		eval(name+ " = new Course(name, timeslist, dateslist");
	}
}
