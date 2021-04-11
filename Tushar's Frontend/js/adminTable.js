var xmlhttp = new XMLHttpRequest();
var url = "https://tusharquiz.herokuapp.com/questions";

start();
function start(){

xmlhttp.onreadystatechange = function () {
  if (this.readyState == 4 && this.status == 200) {
    var myArr = JSON.parse(this.responseText);
    myFunction(myArr);
  }
};
xmlhttp.open("GET",  url, true);
xmlhttp.send();
}
function myFunction(arr) {
  var out = "";

  var i;
  for (i = 0; i < arr.length; i++) {    
    out += `
    <tr>
      <th scope="row">${i+1}</th>
        <td>${arr[i].question}</td>
        <td>${arr[i].correctAnswer}</td>
        <td>
        <a class="btn border-shadow update" id="updateBtn" data-id="${arr[i].questionId}" onclick="checkEdit('${arr[i].questionId}', '${arr[i].question}', '${arr[i].correctAnswer}')" href="./editQuestion.html">
          <span class="text-gradient"><i class="fas fa-pencil-alt"></i></span>
        </a>
        <a class="btn border-shadow delete"  id="deleteBtn" data-id="${arr[i].questionId}" onclick="checkDelete(${arr[i].questionId})">
          <span class="text-gradient"><i class="fas fa-trash-alt"></i></span>
        </a>
        </td>
    </tr>
    `
    
  }
  document.getElementById("myTable").innerHTML = out;
}

function checkDelete(questionId){
  var txt;
  var check = confirm("Are you sure you want to delete this question???");
  if(check==false){
    txt=alert("Question Not Deleted");
  }else{
    deleteQuestion(questionId);
  }
}

function deleteQuestion(questionId) {
    var deleteURL = `https://tusharquiz.herokuapp.com/${questionId}`;
    var xhr = new XMLHttpRequest();
    xhr.open("DELETE", deleteURL, false);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send();
    window.location.reload();
}

function checkEdit(id, ques, answer) {
  localStorage.setItem("questionId", id),
  localStorage.setItem("question", ques),
  localStorage.setItem("answer", answer)
}

