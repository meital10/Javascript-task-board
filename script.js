var row = document.getElementById('notes');
var inputTask = document.getElementById('textArea');
var inputDateTime = document.getElementById('dateTime');
var i = 0;

// loop to find the true and arase the note
var tasksJson = JSON.parse(window.localStorage.getItem('tasks'));
if (tasksJson) {
    for (var i1 = 0; i1 < tasksJson.length; i1++) {
        if (tasksJson[i1].done) {
            tasksJson.splice(i1, 1);
            i1--;
        }
        window.localStorage.setItem('tasks', JSON.stringify(tasksJson));
    }
}

var btn = document.getElementById('addnote');
btn.addEventListener('click', function (event) {
    var taskData = {
        task: inputTask.value,
        date: inputDateTime.value,
        done: false,
    };

    row.appendChild(createNote(taskData, i));
    i++;

    // 1.getItem
    var taskDataJson = window.localStorage.getItem('tasks');
    // // 2. JSON parse
    var tasks = [];
    if (tasksJson) {
        tasks = JSON.parse(tasksJson);
    };
    // // 3.arr.push(object)
    tasks.push(taskData);
    // // 4.JSON.stringify(arr).from string to javascript object 
    tasksJson = JSON.stringify(tasks);
    // // 5. setItem

    window.localStorage.setItem('tasks', tasksJson);


    inputTask.value = '';
    inputDateTime.value = '';
});

// restore the content of the local storage
var tasksJson = window.localStorage.getItem('tasks');

if (tasksJson) {
    var tasks = JSON.parse(tasksJson);
    for (var i = 0; i < tasks.length; i++) {
        var note = tasks[i];
        createNote(note, i);
        row.appendChild(createNote(note, i));
    }
};
function createNote(note, id) {

    var divNote = document.createElement('div');
    divNote.className = "col-md-3 note";
    divNote.id = "note" + id;

    var textNote = document.createElement('textarea');
    textNote.className = "textNote";
    textNote.innerText = note.task;
    divNote.appendChild(textNote);

    var noteDateTime = document.createElement('div');
    noteDateTime.className = "dateNote";
    noteDateTime.innerText = note.date;
    divNote.appendChild(noteDateTime);

    var xIcon = document.createElement('span');
    xIcon.className = "glyphicon glyphicon-remove c1";
    divNote.appendChild(xIcon);
    xIcon.id = 'x' + id;

    // function to remove xIcon
    xIcon.addEventListener('click', function (event) {

        var x = xIcon.id.slice(1);
        var tasks = JSON.parse(window.localStorage.getItem('tasks'));
        tasks[x].done = true;
        window.localStorage.setItem('tasks', JSON.stringify(tasks));
        divNote.style.display = 'none';


    });

    return divNote;
}






