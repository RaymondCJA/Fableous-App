/* Now, the student list is just a static list, does not connect to the database due to 
** the limit of time. That a basic implement of static data, once it is connect to the 
** database, we can implement that in similar way 
*/
function loadStudents() {
    // manage students feature
    let students = [
        {name:"a", id:1, attendence:"y", team:"team 1", dietary:"a", extra:"none"},
        {name:"b", id:2, attendence:"y", team:"team 1", dietary:"a", extra:"none"},
        {name:"c", id:3, attendence:"y", team:"team 2", dietary:"a", extra:"none"},
        {name:"d", id:4, attendence:"y", team:"team 2", dietary:"a", extra:"none"},
        {name:"e", id:5, attendence:"y", team:"team 3", dietary:"a", extra:"none"},
        {name:"f", id:6, attendence:"y", team:"team 3", dietary:"a", extra:"none"},
        {name:"g", id:7, attendence:"y", team:"team 4", dietary:"a", extra:"none"}
    ];
    
    let studentList = $("#students-list");
    
    for(let i = 0; i < students.length; i++) {
        let student = students[i];
        studentList.append(
            "<tr>" + 
            "<td>" + student.name + "</td>" +
            "<td>" + student.id + "</td>" +
            "<td>" + student.attendence + "</td>" +
            "<td>" + student.team + "</td>" +
            "<td>" + student.dietary + "</td>" +
            "<td>" + student.extra + "</td>" +
            "<td>" + "<button class='student-detail-button' style='background-color:white; border:1px solid gray; color:gray'>Detail</button>" + "</td>" +
            "</tr>"
        )
    }
}

// Show the add student window
function addWindow() {
    $("#add-student-window").css({
        "display": "flex",
        "visibility": "visible",
        "flex-direction": "column",
        "justify-content": "space-evenly" 
    });
}

// Close the add window
function closeAddWindow() {
    $("#add-student-window").css("visibility", "hidden");
    $("#add-window-name").val("");
    $("#add-window-id").val("");
    $("#add-window-att").val("");
    $("#add-window-team").val("");
    $("#add-window-diet").val("");
    $("#add-window-extra").val("");
}

// add student
function addStudent(name, id, attendence, team, dietary, extra) {
    let studentList = $("#students-list");
    studentList.append(
        "<tr>" + 
        "<td>" + name + "</td>" +
        "<td>" + id + "</td>" +
        "<td>" + attendence + "</td>" +
        "<td>" + team + "</td>" +
        "<td>" + dietary + "</td>" +
        "<td>" + extra + "</td>" +
        "<td>" + "<button>Detail</button>" + "</td>" +
        "</tr>"
    )
}

$("#add-student-button").click(addWindow);
$("#ensure-add").click(function() {
    let name = $("#add-window-name").val();
    let id = $("#add-window-id").val();
    let att = $("#add-window-att").val();
    let team = $("#add-window-team").val();
    let diet = $("#add-window-diet").val();
    let extra = $("#add-window-extra").val();
    addStudent(name, id, att, team, diet, extra);
    closeAddWindow();
});
$("#cancel-add").click(closeAddWindow);