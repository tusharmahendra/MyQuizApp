var questionId = localStorage.getItem('questionId')
var question = localStorage.getItem('question')
var correctAnswer = localStorage.getItem('answer')

document.getElementById("question").value = question;

var xmlhttp = new XMLHttpRequest();
var url = `https://tusharquiz.herokuapp.com/${questionId}/options`;

xmlhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
        var myArr = JSON.parse(this.responseText);
        localStorage.setItem('options', this.responseText)
        myFunction(myArr);
    }
  };
  xmlhttp.open("GET",  url, true);
  xmlhttp.send();

  function showOption2(){
    document.getElementById("option3").style.display="none";
    document.getElementById("option4").style.display="none";
  }
  
  function showOption3() {
    showOption2();
    document.getElementById("option3").style.display="block";
    document.getElementById("option4").style.display="none";
  }
  
  function showOption4() {
    showOption3();
    document.getElementById("option4").style.display="block"
  }

function myFunction(arr) {
    var length = arr.length;
    if(length == 4) {
        document.getElementById("opt1").value = arr[0].optionValue;
        document.getElementById("opt2").value = arr[1].optionValue;
        document.getElementById("opt3").value = arr[2].optionValue;
        document.getElementById("opt4").value = arr[3].optionValue;
        showOption4()
    } else if(length ==3){
        document.getElementById("opt1").value = arr[0].optionValue;
        document.getElementById("opt2").value = arr[1].optionValue;
        document.getElementById("opt3").value = arr[2].optionValue;
        showOption3()
    } else {
        document.getElementById("opt1").value = arr[0].optionValue;
        document.getElementById("opt2").value = arr[1].optionValue;
        showOption2()
    }

    if(correctAnswer == arr[0].optionValue) {
        document.getElementById("checkOption1").checked = true;
    } else if(correctAnswer == arr[1].optionValue){
        document.getElementById("checkOption2").checked = true;
    } else if(correctAnswer == arr[2].optionValue){
        document.getElementById("checkOption3").checked = true;
    } else {
        document.getElementById("checkOption4").checked = true;
    }
}

function onSubmit(){
    var questionId = localStorage.getItem('questionId')
    var question = localStorage.getItem('question')
    var correctAnswer = localStorage.getItem('answer')
    var options = localStorage.getItem('options')
    var myOptions = JSON.parse(options);

    editQuestion(questionId, question, correctAnswer);
    editOptions(myOptions);
}

function editQuestion(id, ques, answer){
    var newQues = document.getElementById("question").value;

    let answerVal = document.getElementsByName('Answer');
    let answerNum = 0;
    var correctAnswer;
    for (let i = 0; i < answerVal.length; i++) {
        if (answerVal[i].checked) {
            // do whatever you want with the checked radio
            answerNum = answerVal[i].value;
            // only one radio can be logically checked, don't check the rest
            break;
        }
    }

    if(answerNum == "1"){
      correctAnswer = document.getElementById("opt1").value
    } else if(answerNum == "2"){
        correctAnswer = document.getElementById("opt2").value
    } else if(answerNum == "3"){
        correctAnswer = document.getElementById("opt3").value
    } else {
        correctAnswer = document.getElementById("opt4").value
    }

    if(newQues != ques || correctAnswer != answer){
        var xmlhttp = new XMLHttpRequest();
        var url = `https://tusharquiz.herokuapp.com/${id}`;
        console.log(newQues)
        console.log(correctAnswer)
        xmlhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                console.log('Successful')
            }
        };
        xmlhttp.open("PUT",  url, false);
        xmlhttp.setRequestHeader("Content-Type", "application/json");
        xmlhttp.send(JSON.stringify({"question": newQues,
        "correctAnswer": correctAnswer}));
    } 
}

function editOptions(options){
    var opt1 = document.getElementById("opt1").value;
    var opt2 = document.getElementById("opt2").value;
    var opt3 = document.getElementById("opt3").value;
    var opt4 = document.getElementById("opt4").value;
    var length = options.length;

    var newArr=[];

    if(length == 4){
        newArr.push({
            "optionsId": options[0].optionsId,
            "optionValue": opt1
        });
        newArr.push({
            "optionsId": options[1].optionsId,
            "optionValue": opt2
        });
        newArr.push({
            "optionsId": options[2].optionsId,
            "optionValue": opt3
        });
        newArr.push({
            "optionsId": options[3].optionsId,
            "optionValue": opt4
        });
    } else if (length == 3){
        newArr.push({
            "optionsId": options[0].optionsId,
            "optionValue": opt1
        });
        newArr.push({
            "optionsId": options[1].optionsId,
            "optionValue": opt2
        });
        newArr.push({
            "optionsId": options[2].optionsId,
            "optionValue": opt3
        });
    } else {
        newArr.push({
            "optionsId": options[0].optionsId,
            "optionValue": opt1
        });
        newArr.push({
            "optionsId": options[1].optionsId,
            "optionValue": opt2
        });
    }

       newArr.map(data =>{
        var xmlhttp = new XMLHttpRequest();
        var url = `https://tusharquiz.herokuapp.com/options/${data.optionsId}`;
        console.log(data.optionValue)
        xmlhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                console.log('Successful')
            }
        };
        xmlhttp.open("PUT",  url, false);
        xmlhttp.setRequestHeader("Content-Type", "application/json");
        xmlhttp.send(JSON.stringify({"optionValue": data.optionValue}));
       })
}