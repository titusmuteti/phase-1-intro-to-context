// Your code here
function createEmployeeRecord(ary){
    let record
    return record = { 
        firstName: ary[0],
        familyName: ary[1],
        title: ary[2],
        payPerHour: ary[3],
        timeInEvents: [], 
        timeOutEvents: []
    }
}

function createEmployeeRecords(arys) {
    return arys.map(createEmployeeRecord)
}

function createObj(getType, dateStamp) {
    return {type: getType, date: dateStamp.slice(0,10), hour: parseInt(dateStamp.slice(-4))}
}
function createTimeInEvent(object, dateStamp){
    object.timeInEvents.push(createObj('TimeIn', dateStamp))
    return object
}
function createTimeOutEvent(object, dateStamp){
    object.timeOutEvents.push(createObj('TimeOut', dateStamp))
    return object
}
function hoursWorkedOnDate(object, formDate) {
    const timeIn = object.timeInEvents.find((e) => e.date === formDate).hour
    const timeOut = object.timeOutEvents.find((e) => e.date === formDate).hour
    return (timeOut - timeIn)/100
} 
function wagesEarnedOnDate (object, formDate) {
    const wage = object.payPerHour
    const hoursWorked = hoursWorkedOnDate(object, formDate)
    return wage*hoursWorked
}
function allWagesFor(object){
    const totalWages = object.timeInEvents.map((day)=> {
        return wagesEarnedOnDate(object, day.date)
    })
    return totalWages.reduce((accumulator, cv)=> accumulator+cv)
}
function calculatePayroll(records) {
    const totalPay = (records.map((employee)=>{
        return allWagesFor(employee)
    }))
    return totalPay.reduce((accumulator, cv)=> accumulator+cv)
}
