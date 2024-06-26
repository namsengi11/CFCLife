function getCurrentDate() {
  const cDate = new Date();
  return [cDate.getFullYear(), cDate.getMonth(), cDate.getDate()];
}

// Initial day, month, year
var [currentYear, currentMonth, currentDate] = getCurrentDate();
var [initialYear, initialMonth, initialDate] = getCurrentDate();


function partyToString(obj) {
  return (
    obj["origin_name"] + " → " + obj["destination_name"] + " @ " + String(obj["time"]).slice(0,5) + " (" + String(obj["rider"].length) + "/4)"
  );
}

function createDateString(year, month, date) {
  if (month < 10) {
    month = "0" + String(month)
  } else {
    month = String(month)
  }

  if (date < 10) {
    date = "0" + String(date)
  } else {
    date = String(date)
  }

  return String(year) + "-" + month + "-" + date
}

function updateCalendar() {
  const calendarBody = document
    // .getElementById("calendar")
    .getElementsByTagName("tbody")[0];

  const currentDate = new Date(currentYear, currentMonth, 1);
  //Date(year, month, day)
  //day before Next month -> last day in month
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  //day before this month -> last day in prev month
  const daysInPrvMonth = new Date(currentYear, currentMonth, 0).getDate();
  // Clear previous content
  calendarBody.innerHTML = "";

  let p_DayCounter = 0; // daycount of prev month
  let dayCounter = 1; // daycount of current month
  let n_DayCounter = 1; //daycount for next month

  

  for (let i = 0; i < 6; i++) {
    const dayRow = document.createElement("tr");

    for (let j = 0; j < 7; j++) {
      const dayCell = document.createElement("td");
      dayCell.classList.add("day_cell_mobile");
      const n_dayCell = document.createElement("td");
      n_dayCell.classList.add("n_day_cell");
      const p_dayCell = document.createElement("td");
      p_dayCell.classList.add("p_day_cell");
      const dateButton = document.createElement("button")
      dateButton.classList.add("date_button")
      dateButton.classList.add("shadow-none")
      const partyListCell = document.getElementById("partyList")
      const partyListTitle = document.getElementById("partyListTitle")

      dateButton.onclick = () => {
        partyListCell.innerHTML = ''
        var dayInDateString = createDateString(currentYear, currentMonth+1, dateButton.textContent);
        partyListTitle.textContent = dayInDateString;
        if (groupedData.get(dayInDateString)) {
          groupedData.get(dayInDateString).forEach(element => {
            const partyCell = document.createElement("div");
            partyCell.classList.add("partyCell");
            const partyLink = document.createElement("a")
            partyLink.textContent = partyToString(element)
            partyLink.href = "/taxiparty/" + element['id'];
            partyCell.appendChild(partyLink)
            partyListCell.appendChild(partyCell)
          });
        }
      };

      if (i === 0 && j < currentDate.getDay()) {
        // Add empty cells for previous month's days
        p_DayCounter = daysInPrvMonth - currentDate.getDay() + j + 1;
        p_dayCell.textContent = p_DayCounter;
        dayRow.appendChild(p_dayCell);

      } else if (dayCounter <= daysInMonth) {
        // Add cells for the current month's days
        dateButton.textContent = dayCounter;
        dayCell.appendChild(dateButton);
        dayRow.appendChild(dayCell);
        dayCounter++;

      } else {
        n_dayCell.textContent = n_DayCounter
        dayRow.appendChild(n_dayCell);
        n_DayCounter++;
      }
    }
    calendarBody.appendChild(dayRow);

    if (dayCounter > daysInMonth) {
      break;
    }
  }

  // Update the displayed month and year
  document.getElementById("currentMonthYear").textContent =
    new Intl.DateTimeFormat("en-EN", {
      year: "numeric",
      month: "long",
    }).format(currentDate);
    
  }

// Function to navigate to the previous month
function prevMonth() {
  currentMonth--;
  if (currentMonth < 1) {
    currentMonth = 11;
    currentYear--;
  }
  get_monthinfo(currentYear, currentMonth + 1, updateCalendar);
}

// Function to navigate to the next month
function nextMonth() {
  currentMonth++;
  if (currentMonth > 11) {
    currentMonth = 0;
    currentYear++;
  }
  get_monthinfo(currentYear, currentMonth + 1, updateCalendar);
}


//Function to show current month
function goBacktoToday(){
  currentYear = initialYear;
  currentMonth = initialMonth;
  get_monthinfo(currentYear, currentMonth + 1, updateCalendar);
}