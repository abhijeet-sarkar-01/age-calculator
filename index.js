let btn = document.querySelector(".arrow")
let err = document.querySelectorAll(".error")
let day = document.querySelector(".day-value")
let month = document.querySelector(".month-value")
let year = document.querySelector(".year-value")
const d = new Date()
let currentYear = d.getFullYear()
let currentMonth = d.getMonth()
let currentDay = d.getDate()

let yearResult = document.querySelector(".year-result")
let monthResult = document.querySelector(".month-result")
let dayResult = document.querySelector(".day-result")


function display(){
  let fullYears = 0, fullMonths = 0, fullDays = 0

  fullYears = currentYear - year.value

  if (currentMonth+1 < month.value){
    fullYears--
    currentMonth += 12
    fullMonths = currentMonth - month.value + 1
    currentMonth -= 12
  }else{
    fullMonths = currentMonth - month.value + 1
  }

  if (currentDay < day.value){

    fullMonths--

    if (currentMonth == 0 || currentMonth == 1 || currentMonth == 3 || currentMonth == 5 || currentMonth == 7 || currentMonth == 8 || currentMonth == 10){
      currentDay = currentDay + 31
    }

    else if (currentMonth == 4 || currentMonth == 6 || currentMonth == 9 || currentMonth == 11){
      currentDay += 30;
    }

    else if (currentMonth == 2){
      if (leapYear(currentYear)){
        currentDay += 29
      }else{
        currentDay += 28
      }
    }

    fullDays = currentDay - day.value
  }
  else{
    fullDays = currentDay - day.value
  }

  console.log(fullYears + " years " + fullMonths + " months " + fullDays + " days")
  
  yearResult.textContent = fullYears
  monthResult.textContent = fullMonths
  dayResult.textContent = fullDays

}

function leapYear(year)
{
  return ((year % 4 == 0) && (year % 100 != 0)) || (year % 400 == 0);
}

function addAllError(){
  for(const e of err){
      e.classList.remove("show-error");
    }
}

function removeAllError(){
  for(const e of err){
      e.classList.add("show-error");
    }
}

function addDayError(){
  err[0].textContent = "Required Field"
  err[0].classList.remove("show-error");
}

function removeDayError(){
  err[0].classList.add("show-error");
}

function addMonthError(){
  err[1].textContent = "Required Field"
  err[1].classList.remove("show-error");
}

function removeMonthError(){
  err[1].classList.add("show-error");
}

function addYearError(){
  err[2].textContent = "Required Field"
  err[2].classList.remove("show-error");
}

function removeYearError(){
  err[2].classList.add("show-error");
}

function noTimeTravel(){
  err[2].textContent = "No time travel please!"
  err[2].classList.remove("show-error")
}

function validDay(){
  err[0].textContent = "Must be a valid date"
  err[0].classList.remove("show-error")
}

function validMonth(){
  err[1].textContent = "Must be a valid month"
  err[1].classList.remove("show-error")
}

function leapFebValidity(){
  err[0].textContent = "Must be a valid date"
  err[0].classList.remove("show-error")
}

function handleClick(){
  
  if (day.value===""){
    addDayError()
  }else{
    removeDayError()
  }

  if (month.value === ""){
    addMonthError()
  }else{
    removeMonthError()
  }

  if(year.value === ""){
    addYearError()
  }else{
    removeYearError()
  }
  
  if(day.value !== "" && month.value !== "" && year.value !== ""){
    removeAllError()
  }

  // Future year validity
  if (year.value > currentYear){
    noTimeTravel()
  }

  if ((day.value < 1 || day.value > 31) && day.value !== ""){
    validDay()
  }

  if ((month.value < 1 || month.value > 12) && month.value!==""){
    validMonth()
  }

  // Leap year feb 29 days
  if (month.value == 2 && day.value > 28){
    if (leapYear(year.value) == false){
      validDay()
    }
  }

  //30 days - 4, 6, 9, 11

  if (((month.value==4) || (month.value==6) || (month.value==9) || (month.value==11)) && day.value>30){
    validDay()
  }

  display()

}

btn.addEventListener("click", handleClick)
