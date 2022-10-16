class Course {
    constructor(name, times, dates, noSections, prtimes, prdates) {
        this.name = name;
        this.times = times;
        this.dates = dates;
        this.noSections = noSections;
        this.prtimes = prtimes;
        this.prdates = prdates;
    }
}

schedule[
    {
        "name": '',
        "time": '',
        "dates": ''
    }
]


function insertScript1() {
  chrome.tabs.query({
    active: true,
    currentWindow: true
  }, tabs => {
    chrome.scripting.executeScript({
      target: {
        tabId: tabs[0].id
      },
      function: getClasses
    })
  })
  window.close();
}

function insertScript2() {
  chrome.tabs.query({
    active: true,
    currentWindow: true
  }, tabs => {
    chrome.scripting.executeScript({
      target: {
        tabId: tabs[0].id
      },
      function: mainFunct
    })
  })
  window.close();
}


document.getElementById('buttonGather').addEventListener('click', insertScript1)
document.getElementById('buttonGenerate').addEventListener('click', insertScript2)

function webScrapeCN() {
  document.querySelectorAll('.CrsOpen > table a')[1].textContent;
}




function getClasses() {
  var regsht = [];
  var numCourses = 0;
  for (let i = 2; i < (document.querySelectorAll('#grvFirstChoices > tbody > tr').length + 1); i++) {
    regsht.push(document.querySelectorAll('#grvFirstChoices > tbody > tr:nth-child(' + i + ') > td:nth-child(4) > span')[0].textContent.trim());
    numCourses++;
    localStorage.setItem('' + (i - 2), '' + regsht[i - 2]);
    console.log(regsht[i - 2])
  }
  localStorage.setItem('numCourses', numCourses);
}

var timetable = [5];
for (let i = 0; i < 5; i++) {
    timetable[i] = new Array(144);
    for(let j = 0; j < 144; j++)
    {
        timetable[i][j] = 0;
    }
}

function mainFunct() {
  var timesList = [];
  var datesList = [];
  var numSections = 0;
  function webScrapeTime() {
    for (let i = 0; i < (document.querySelectorAll('.MainTableRow').length); i++) {
      if (!isNaN(document.querySelectorAll('.MainTableRow tbody tr td:nth-child(2)')[i * 3].textContent)) {
        timesList.push(document.querySelectorAll('.MainTableRow tbody tr td:nth-child(4)')[i * 2].textContent);
        numSections++;
      } else {
        break;
      }
    }
  }
  function webScrapeDate() {
    for (let i = 0; i < (document.querySelectorAll('.MainTableRow').length); i++) {
      if (!isNaN(document.querySelectorAll('.MainTableRow tbody tr td:nth-child(2)')[i * 3].textContent)) {
        datesList.push(document.querySelectorAll('.MainTableRow tbody tr td:nth-child(3)')[i * 2].textContent);
      } else {
        break;
      }
    }
  }
  var searchBar = document.getElementById("Body_txtSearchKeyword");
  for (let i = 0; i < localStorage.getItem('numCourses'); i++) {
    searchBar.value = localStorage.getItem(''+i)
    document.querySelector('[name="ctl00$Body$ctl15"]').click();
    var name = localStorage.getItem(''+i);
    timesList.length = 0;
    datesList.length = 0;
    webScrapeTime();
    webScrapeDate();
    for(let j = 0; j < timesList.length; j++){
      localStorage.setItem(name + '0' + j, timesList[j]+datesList[j])
    }
  }
}
