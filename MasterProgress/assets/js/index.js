
import { getDateString } from './utilities.js';

function displayCoursesTable(){
  
    $.ajax({
        url: "https://apex.oracle.com/pls/apex/edsworkspace/requiredcourses/",
        error: function() {
            alert("Error occured")
        }
    }).done(function(oData){
        let oAllCoursese = {};
        oAllCoursese.allcourses =  oData.items;
        sessionStorage.setItem("allCourses", JSON.stringify(oAllCoursese));
        // console.log(oAllCoursese)
        let sStartDate = "";
        let sStopDate = "";
        let sFinalGrade = "";
        $('#prime-table thead').append(`
            <tr>
            <th scope="col">Sequence</th>
                <th scope="col">Course Name</th>
                <th scope="col">Course Number</th>
                <th scope="col">Start Date</th>
                <th scope="col">Completion Date</th>
                <th scope="col">Final Grade</th>
                <th scope="col">Credits</th>
            </tr>`
        );
        for (let item of oData.items) {

            if(item.startdate){
                console.log(item.startdate)
                sStartDate = getDateString(new Date(item.startdate))
            }else{
                sStartDate = "";
            }
            if(item.completiondate){
                console.log(item.completiondate)
                sStopDate = getDateString(new Date(item.completiondate))
            }else{
                sStopDate = "";
            }
            if(item.finalgradeletter){
                sFinalGrade = item.finalgradeletter;
            }else{
                sFinalGrade = "";
            }
            
            $('#prime-table tbody')
            .append(
                `<tr id='${item.id}'>
                    <th scope="row" title="Sequence">${item.sequence}</th>
                    <td title="Course">${item.coursename}</td>
                    <td>${item.coursenumber}</td>
                    <td>${sStartDate}</td>
                    <td>${sStopDate}</td>
                    <td>${sFinalGrade}</td>
                    <td>${item.creditsearned}</td>
                </tr>`
            );
        }
        $('#prime-table').prepend(`<caption>Required Courses</caption>`);
        $("#loading").hide();
        // add event listener to all rows
        $('#prime-table tbody tr').on('click', function() {
            // get the record ID #
            let sItemId = this.cells[0].innerHTML;
            // Save data to sessionStorage
            sessionStorage.setItem('detailsID', sItemId);
            window.location.href = "assets/views/course-details.html";
        });
    });
}// end displayCoursesTable()

function setWeeklyAssignments(){
    let sURL = "https://apex.oracle.com/pls/apex/edsworkspace/weeklyassignments/";
    $.ajax({
        url: sURL,
        error: function() {
            alert("Error occured")
        }
    }).done(function(oData){
        let oWeeklyAssignments = {};
        oWeeklyAssignments.weeklyAssignments =  oData.items;
        sessionStorage.setItem("weeklyAssignments", JSON.stringify(oWeeklyAssignments));
        // console.log(oWeeklyAssignments)
    });
}

$( document ).ready(function() {
    displayCoursesTable();
    setWeeklyAssignments();
});