
import { getDateString } from './utilities.js';

function displayWeeklyAssignments(sID, oWeekAssign){
    // console.log(oWeekAssign)
    // let sURL = "https://apex.oracle.com/pls/apex/edsworkspace/weeklyassignments/";
    let sDueDate = "";
    let sFinalGrade = "";
    // console.log(oWeekAssign.weeklyAssignments)
    $('#assign-table thead')
    .append(`
        <tr>
            <th scope="col">Week</th>
            <th scope="col">Type</th>
            <th scope="col">Name</th>
            <th scope="col">Due Date</th>
            <th scope="col">Complete</th>
            <th scope="col">Final Grade</th>
        </tr>`
    );
    for (let item of oWeekAssign.weeklyAssignments) {
        if(item.course === sID){
            if(item.turnindate){
                console.log(item.startdate)
                sDueDate = getDateString(new Date(item.turnindate))
            }else{
                sDueDate = "";
            }
            if(item.grade){
                sFinalGrade = item.grade;
            }else{
                sFinalGrade = "";
            }
            $('#assign-table tbody')
            .append(
                `<tr id='${item.id}'>
                    <th scope="row" title="Sequence">${item.week}</th>
                    <td title="Course">${item.assignmenttype}</td>
                    <td>${item.assignmentname}</td>
                    <td>${sDueDate}</td>
                    <td>${item.isturnedin}</td>
                    <td>${sFinalGrade}</td>
                </tr>`
            );
        }// end if(item.course === sID)

    }// end for in
    $("#loading").hide();
}// end displayWeeklyAssignments()

function displayCouseDetails(sID, oCourses, oWeekAssign){
    // get the specific course by ID from Array of courses
    let oCourse = oCourses.allcourses.filter(function(aArray) {
        return aArray.id == sID;
    }); 
    let courseID = oCourse[0].id
    let sStartDate = "";
    let sStopDate = "";
    if(oCourse[0].startdate){
        console.log(oCourse[0].startdate)
        sStartDate = getDateString(new Date(oCourse[0].startdate))
    }else{
        sStartDate = "";
    }
    if(oCourse[0].completiondate){
        console.log(oCourse[0].completiondate)
        sStopDate = getDateString(new Date(oCourse[0].completiondate))
    }else{
        sStopDate = "";
    }
    $('#main-area')
    .append(`
        <div class="card text-white bg-dark mb-3" style="max-width: 55rem;">
            <div class="card-header">Course Details</div>
                <div class="card-body">
                    <h2 class="card-title" style="font-size: 12pt;">${oCourse[0].coursename } [ ${oCourse[0].coursenumber} ]</h5>
                    <p class="card-text">Details List</p>
                    <ul class="list-group list-group-flush">
                        <li class="list-group-item">Start Date: ${sStartDate}</li>
                        <li class="list-group-item">Stop Date: ${sStopDate}</li>
                        <li class="list-group-item">Class Number: ${oCourse[0].classnumber}</li>
                        <li class="list-group-item">Section Number: ${oCourse[0].sectionnumber}</li>
                        <li class="list-group-item">final grade letter: ${oCourse[0].finalgradeletter}</li>
                        <li class="list-group-item">final grade number: ${oCourse[0].finalgradenumber}</li>
                        <li class="list-group-item">credits earned: ${oCourse[0].creditsearned}</li>
                        <li class="list-group-item">Professor: ${oCourse[0].professorname}</li>
                    </ul>
                    <a class="btn btn-secondary" 
                    href='https://apex.oracle.com/pls/apex/edsworkspace/r/mymasterprogress/' 
                    style='margin-top: 15px;'> ADD DATA</a>
                </div>
        </div>`
    );
    displayWeeklyAssignments(courseID, oWeekAssign);
} // end displayCouseDetails(sURL)


$( document ).ready(function() {
    let detailsID = sessionStorage.getItem('detailsID');
    //let sDetailsURL = " https://apex.oracle.com/pls/apex/edsworkspace/requiredcourses/" + detailsID;
    let allCoursesJSON = sessionStorage.getItem("allCourses");
    // Parse the JSON string back to JS object
    let oAllCourses = JSON.parse(allCoursesJSON);
    let weeklyJSON = sessionStorage.getItem("weeklyAssignments");
    // Parse the JSON string back to JS object
    let oWeeklyAssignments = JSON.parse(weeklyJSON);
    // call function
    displayCouseDetails(detailsID, oAllCourses, oWeeklyAssignments);
});