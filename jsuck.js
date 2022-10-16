const regsht = ["Logic and Discrete Mathematics", "Data Structures and Algorithms", "First-Level Modern Japanese II", "Introduction to Microeconomics", "Matrix Algebra", "Elementary to Intermediate Statistics and Data Analysis"];

//create array of "course" objects
let courses = [
    {
        "name": regsht[0],
        "times": ["10:00A-11:20A", "2:30P-3:50P"],
        "dates": ["M-W----", "M-W----"],
        "noSections": 2,
        "prtimes": [],
        "prdates": []
    },
    {
        "name": regsht[1],
        "times": ["1:00P-2:20P", "2:30P-3:50P"],
        "dates": ["M------", "M------"],
        "noSections": 2,
        "prtimes": [],
        "prdates": []
    },
    {
        "name": regsht[2],
        "times": ["9:00A-9:50A", "10:00A-10:50A", "2:00P-2:50P", "3:00P-3:50P"],
        "dates": ["MTWRF--", "MTWRF--", "MTWRF--", "MTWRF--"],
        "noSections": 4,
        "prtimes": [],
        "prdates": []
    },
    {
        "name": regsht[3],
        "times": ["11:30A-12:50P", "10:00A-11:20A"],
        "dates": ["-T-R---", "-T-R---"],
        "noSections": 2,
        "prtimes": [],
        "prdates": []
    },
    {
        "name": regsht[4],
        "times": ["9:00A-9:50A", "11:00A-11:50A", "12:00P-12:50P", "3:00P-3:50P"],
        "dates": ["M-W-F--", "M-W-F--", "M-W-F--", "M-W-F--"],
        "noSections": 4,
        "prtimes": [],
        "prdates": []
    },
    {
        "name": regsht[5],
        "times": ["9:00A-9:50A", "10:00A-10:50A"],
        "dates": ["M-W-F--", "M-W-F--"],
        "noSections": 2,
        "prtimes": [],
        "prdates": []
    }
]

//create array-list of textual schedule
let schedule = [
    {
        "name": '',
        "time": '',
        "dates": ''
    }
]

//create 2D-array timetable of schedule
var timetable = [5];
for (let i = 0; i < 5; i++) {
    timetable[i] = new Array(144);
    for (let j = 0; j < 144; j++) {
        timetable[i][j] = 0;
    }
}

for (let j = 0; j < courses.length; j++) {
    for (let i = 0; i < courses[j].noSections; i++) {
        courses[j].prdates[i] = [false, false, false, false, false, false, false];
    }
}

var temp = [144];
for (let i = 0; i < 144; i++) {
    temp[i] = false;
}

var hour1, min1, hour2, min2, start, end, digit;

//for each section
for (let k = 0; k < courses.length; k++)
{
    for (let i = 0; i < courses[k].noSections; i++) {
        //change lesson time from string to a 144-element boolean array
        for (let j = 0; j < courses[k].times[i].length; j++) {
            if (courses[k].times[i][j] == ':') {
                hour1 = parseInt(courses[k].times[i].substring(0, j));
                digit = j;
            }
            if (courses[k].times[i][j] == '-') {
                min1 = parseInt(courses[k].times[i].substring(digit, j));
                digit = j;
            }
            if (courses[k].times[i][j] == ':') {
                hour2 = parseInt(courses[k].times[i].substring(digit, j));
                digit = j;
                min2 = parseInt(courses[k].times[i].substring(digit, courses[k].times[i].length));
            }
    
        }
        //initially an array of 144 false booleans
        courses[k].prtimes[i] = temp;
        //update array to show class time slots with true values
        start = hour1 * 6 + min1 / 10;
        end = hour2 * 6 + min2 / 10;
        for (let j = start; j < end; j++) {
            courses[k].prtimes[i][j] = true;
        }
        //use boolean array to show dates with classes
        for (let j = 0; j < 7; j++) {
            if (courses[k].dates[i][j] != '-') {
                courses[k].prdates[i][j] = true;
            }
        }
    }
}

/*The following has not been tested. JAVASSSS SUCKSSSS ASSSSS!!! 
The following code is used to update the array
let courses = {
    "name": regsht[1],
    "times": Japanese.times,
    "dates": Japanese.dates,
    "noSections": noSections
    }
    
    courses.push(Calculus III)

//a createSchedule function that takes the courses[] array and number of Courses and input, return boolean/timetable, and 
function createSchedule(courses, numCourses) {
    //a temporary object variable used to update schedule
    var tempclass;
    if (numCourses == 0) {
        return schedule;
    }
    else
        //turn noCourses into a index that tracks number of courses left to add, tempnum is used to store the total number of Courses
        var tempnum = numCourses;
    {
        //for each section of the first course in the array
        for (let i = 0; i < courses[0].noSections; i++) {
            //prepare course section object to add to text schedule
            tempclass = {
                "name": regsht[tempnum - numCourses],
                "time": courses[tempnum - numCourses].times[i],
                "dates": courses[tempnum - numCourses].dates[i]
            }
            //for each day of the week
            for (let j = 0; j < 7; j++) {
                //if there is class
                if (courses[0].prdates[j]) {
                    //for each time slot in the day
                    for (let k = 0; k < 144; k++) {
                        //if there is conflict with existing schedule, return false
                        if ((timetable[j][k] == true) && (courses[0].prtimes[k] == true)) {
                            return false
                        }
                    }
                    //otherwise, update timetable to show that time slot is taken
                    timetable[j] = courses[0].prtimes[i];
                }
            }
            //check to see if that agrees with some section for all other courses
            check = createSchedule(subarray(1, courses), numCourses - 1);
            //if it does
            if (check) {
                //add it to the text schedule
                schedule.unshift(tempclass);
                return check;
            }
        }
        //otherwise, take class off the board
        for (let j = 0; j < 7; j++) {
            timetable[j] = temp;
        }
    }
}
*/
