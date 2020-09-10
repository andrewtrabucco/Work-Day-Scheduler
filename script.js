// Setting Array for hours of workday
// Waits for return of numerical value from pullNumberArray function
let hours = {
  "8 AM": "",
  "9 AM": "",
  "10 AM": "",
  "11 AM": "",
  "12 PM": "",
  "1 PM": "",
  "2 PM": "",
  "3 PM": "",
  "4 PM": "",
  "5 PM": "",
};

// Waits until HTML is loaded then proceeds
// Looks to see if anything has been saved in local storage already
// If it has items stored previously, they are parsed and updated to the screen
$(document).ready(function(){
  if(!localStorage.getItem('hours')) {
    updateTodos(hours);
  } else {
    updateTodos(JSON.parse(localStorage.getItem('hours')));
  }
})

// Sets the current Day, Calender Date, and current time in the header
$('#date-today h6').text(moment().format('dddd') + ", " + moment().format('MMMM Do YYYY, h:mm:ss a'));

// Sets a for loop to count through hours
// Changes the classes dynamically based on current, future and past hours
let counter = 1;
for(const property in hours) {
  let entry = "#text-entry" + counter;
  $(entry).text(hours[property]);
  let timeCount = "#time" + counter;
  let currentHour = moment().hour();
  let timeArray = $(timeCount).text();
  let timeValue = pullNumberArray(timeArray);  
  if(timeValue < currentHour) {
    $(entry).addClass("past-hour");
  } else if (timeValue > currentHour) {
    $(entry).addClass("future-hour");
  } else {
    $(entry).addClass("present-hour");
  }
  counter ++;
}

// Sets event listener to button and when clicked adds the text in the calendar row to localstorage
$("button").click(function() {
  value = $(this).siblings("textarea").val();
  hourString = $(this).siblings("div").text();
  
  saveSchedule(hourString, value);
});

// Function to set the text string of the hour object to a numerical value
function pullNumberArray(hourString) {
  switch(hourString) {
    case "8 AM": return 8;
    case "9 AM": return 9;
    case "10 AM": return 10;
    case "11 AM": return 11;
    case "12 PM": return 12;
    case "1 PM": return 13;
    case "2 PM": return 14;
    case "3 PM": return 15;
    case "4 PM": return 16;
    case "5 PM": return 17;
  }
}

// Function to set current hour
function correctDatabase() {
  result = localStorage.getItem('hours')
  return (result ? result : hours);
};

// Function to set save areat for items
function initializeLocalStorage() {
  localStorage.setItem('hours', JSON.stringify(hours));
};

// Function to save items to local storage
function saveToLocalStorage(dayObj) {
  localStorage.setItem('hours', JSON.stringify(dayObj));
};

// Looks to see if there are locally stored values otherwise runs function initializeLocalStorage
// Sets variable for workhours which is then parsed into a value to save to local storage
function saveSchedule(hourString, val) {
  if(!localStorage.getItem('hours')) {
    initializeLocalStorage();
  };

  let workHours = JSON.parse(localStorage.getItem('hours'));
  workHours[hourString] = val

  saveToLocalStorage(workHours);
};

// Restores locally saved items back into the calendar row
function updateTodos(dayObject) {
  $(".calendar-row").each(function(index) {
    let res = $(this).children("div");
    $(this).children("textarea").text(dayObject[res.text()]);
  })
}
