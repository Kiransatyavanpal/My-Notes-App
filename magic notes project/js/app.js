console.log("hello world");
shownotes();
showDate();
showTime();

let j = 0;



//If user adds a note, add it to the localstorage 
let addBtn = document.getElementById('addBtn');
addBtn.addEventListener("click", function (e) {

    let addTxt = document.getElementById("addTxt");
    let addTitle = document.getElementById("addTitle");
    let notes = localStorage.getItem("notes");
    let date = new Date();
    saal = date.getFullYear();
    mahina = date.getMonth();
    din = date.getDate();
    wakt = date.getHours();
    min = date.getMinutes();
    
    //console.log(notes);
    if (notes == null) {
        notesObj = [];
    }
    else {
        notesObj = JSON.parse(notes);
    }
    var myObj = {
        title: addTitle.value,
        text: addTxt.value,
        newWakt : wakt,
        newMin : min,
        newSaal : saal,
        newMahina: mahina + 1,
        newDin : din
        
    }
    notesObj.push(myObj);
    localStorage.setItem("notes", JSON.stringify(notesObj));
    addTxt.value = "";
    addTitle.value = "";
    shownotes();
    


    //console.log(noteObj);

});
// Function to show elements from Localstorage
function shownotes() {
    let notes = localStorage.getItem("notes");
    //console.log(notes);
    if (notes == null) {
        notesObj = [];
        
    }
    else {
        notesObj = JSON.parse(notes);
    }
    let html = "";
    notesObj.forEach(function (element, index,) {
        html += `
    <div class="noteCard my-2 mx-2" id="newid" style="width:15rem;">
                <div class=" card-body">
      
      <h6 class="DATE"> ${element.newSaal}-${element.newMahina}-${element.newDin} </h6>
      <h6 class="TIME"> ${element.newWakt}:${element.newMin} </h6>
      <h3 class="card-title "> ${element.title}   </h3>
      <p class="card-text">${element.text}</p>
      <button id="${index}" onclick="deleteNote(this.id)" class="btn btn-secondary">Delete note</button>
    </div>
  </div>
        `;

    });
    let notesElm = document.getElementById('notes');
    if (notesObj.length != 0) {
        notesElm.innerHTML = html;

    }
    else {
        notesElm.innerHTML = `Nothing to show! Use "Add a Note" section above to add notes.`;
    }

}


// Function to delete a note
function deleteNote(index) {
    //console.log('I am deleting',index);
    let notes = localStorage.getItem("notes");

    if (notes == null) {
        notesObj = [];
    }
    else {
        notesObj = JSON.parse(notes);
    }
    notesObj.splice(index, 1);

    localStorage.setItem("notes", JSON.stringify(notesObj));
    shownotes();
}

let search = document.getElementById('searchTxt');
search.addEventListener("input", function () {
   let inputVal = search.value.toLowerCase();
    // console.log('Input event fired!', inputVal);
    let noteCards = document.getElementsByClassName('noteCard');
    Array.from(noteCards).forEach(function (element) {
        let cardTxt = element.getElementsByTagName("p")[0].innerText;
        if (cardTxt.includes(inputVal)) {
            element.style.display = "block";
        }
        else {
            element.style.display = "none";
        }
        // console.log(cardTxt);
    })
})
setInterval(showTime, 1000);
function showTime() {
    let time = new Date();
    let hour = time.getHours();
    let min = time.getMinutes();
    let sec = time.getSeconds();

    am_pm = "AM";
    if (hour > 12) {
        hour -= 12;
        am_pm = "PM";
    }
    if (hour == 0) {
        hr = 12;
        am_pm = "AM";
    }
    hour = hour < 10 ? "0" + hour : hour;
    min = min < 10 ? "0" + min : min;
    sec = sec < 10 ? "0" + sec : sec;

    let currentTime = hour + ":"
        + min + ":" + sec + " " + am_pm;

    document.getElementById("clock")
        .innerHTML = currentTime;
    //console.log(currentDate);


}

function showDate() {
    let today = new Date();
    let year = today.getFullYear();
    let month = today.getMonth();
    let date = today.getDate();
    newMonth = month + 1;
    newMonth = newMonth < 10 ? "0" + newMonth : newMonth;
    date = date < 10 ? "0" + date : date;
    let currentDate = year + "-" + newMonth + "-" + date;

    document.getElementById("date")
        .innerHTML = currentDate;

}
function oldestfirst(){
    
let el = new Array;
let element = new Array ; 
let noOfNotes = document.getElementsByClassName("noteCard").length;
let dismiss = document.getElementById("dismiss");
for (let index = 0; index < noOfNotes; index++) {
  
 el[index]= document.getElementsByClassName("noteCard")[index].outerHTML;

//console.log(el[index])
element[index] = document.getElementsByClassName("noteCard")[index].outerHTML;
}
if(  j % 2 == 0){
    for(let index=0; index <noOfNotes; index++){
        document.getElementsByClassName("noteCard")[index].outerHTML =el[noOfNotes - index - 1];
    }
    dismiss.innerHTML=  `<div class="alert alert-success alert-dismissible fade show" role="alert">
    <strong>Notes Sorted</strong> You should check in on some of those fields below.
    <button type="button" class="close" data-dismiss="alert" aria-label="Close">
      <span aria-hidden="true">&times;</span>
    </button>
  </div>`;
}
else {
    console.log("Aleardy in that format");
    dismiss.innerHTML = `<div class="alert alert-warning alert-dismissible fade show" role="alert">
    <strong>Notes already in that order</strong> Check your selected options <strong>Please Reload!!</strong>
    <button type="button" class="close" data-dismiss="alert" aria-label="Close">
      <span aria-hidden="true">&times;</span>
    </button>
  </div>`;
}
j++;
}
function newestFirst(){
    
    let el = new Array;
    let element = new Array ; 
    let noOfNotes = document.getElementsByClassName("noteCard").length;
    let dismiss = document.getElementById("dismiss");
    for (let index = 0; index < noOfNotes; index++) {
      
     el[index]= document.getElementsByClassName("noteCard")[index].outerHTML;
    
    //console.log(el[index])
    element[index] = document.getElementsByClassName("noteCard")[index].outerHTML;
    }
    if(  j % 2 != 0){
        for(let index=0; index <noOfNotes; index++){
            document.getElementsByClassName("noteCard")[index].outerHTML =el[noOfNotes - index - 1];
        }
        dismiss.innerHTML=  `<div class="alert alert-success alert-dismissible fade show" role="alert">
        <strong>Notes Sorted</strong> You should check in on some of those fields below.
        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>`;
    }
    else {
        console.log("Aleardy in that format");
        dismiss.innerHTML = `<div class="alert alert-warning alert-dismissible fade show" role="alert">
        <strong>Notes already in that order</strong> Check your selected options <strong>Please Reload!!</strong>
        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>`;
    }
    j++;
    }

//console.log(el.indexOf[0]);



