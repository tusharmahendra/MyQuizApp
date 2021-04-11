var xmlhttp = new XMLHttpRequest();
var url = "https://tusharquiz.herokuapp.com/questions";
let correct = 0;
let totalscore = 0;

function textAreaAdjust() {
  
  let x = document.getElementsByTagName("TEXTAREA");
  let i;
  for (i = 0; i < x.length; i++) {
    x[i].style.height = "1px";
    x[i].style.height = (1 + x[i].scrollHeight) + "px";
    x[i].style.color= "red";
  }
}

xmlhttp.onreadystatechange = function () {
  if (this.readyState == 4 && this.status == 200) {
    console.log(this.responseText)
    var myArr = JSON.parse(this.responseText);
    myFunction(myArr);
  }
};
xmlhttp.open("GET", url, true);
xmlhttp.send();



function radioDisable(radioNum){
  let rad = document.getElementById(`q${radioNum}radio`);
  for (let i = 0; i < rad.length; i++) {
          rad[i].disabled = true;
  }
}

function radioEvent(quesNum, answer, correctAnswer) {
  let rad = document.getElementById(`q${quesNum}radio`);
  let prev = null;
  
  for (let i = 0; i < rad.length; i++) {
      rad[i].addEventListener('change', function () {
          (prev) ? console.log(`Previous Val: ${prev.value}`) : null;
          if (this !== prev) {
              prev = this;
          }

          radioDisable(quesNum);

          let myAlert = document.getElementById('alertHolder-' + quesNum)
          if (this.value == answer) {
              myAlert.innerHTML = `
              <br>
              <div class="alert alert-success alert-dismissible" role="alert">
                  <strong>Correct Answer!</strong>
              </div>`;
              correct++;
              scoreCard();
          } else {
              myAlert.innerHTML = `
              <br>
              <div class="alert alert-danger alert-dismissible" role="alert">
                  <strong>Wrong Answer!</strong> The correct answer is ${correctAnswer}.
              </div>`;
          }
      });
  }
}

function myFunction(quesData) {
  let holder = document.getElementById("demo");
  let quesData_parsed = [];
  if(quesData == null) {
    holder.innerHTML = 
    `
    <div class="col-12 alert alert-danger" role="alert">
      <strong>Please Add Some Questions!</strong>
    </div>
    `;
  }
  else {
    for (let i = 0; i < quesData.length; i++){
        quesData_parsed.push(quesData[i])
    }
  } 
  if (quesData_parsed.length == 0 || quesData_parsed==undefined || quesData_parsed==null) {
    holder.innerHTML = 
    `
    <div class="col-12 alert alert-danger" role="alert">
      <strong>Please Add Some Questions!</strong>
     </div>
     `;
    } else{
        for (let i = 0; i < quesData_parsed.length; i++) {    
          if(quesData_parsed[i].options.length ==2){
            totalScore = quesData_parsed.length;
            holder.insertAdjacentHTML('beforeend', `
            <div class="question">
                <h4 class="number">
                    Question ${i + 1}
                </h4>
                <div>
                    <textarea id="textarea${i}"  readonly class="form-control" placeholder="No question" name="Question-textarea-${i}">${quesData_parsed[i].question}</textarea>
                </div>
                <div>
                    <br>
                    <form name="ques${i}form" id="q${i}radio">
                        <input type="radio" name="ques${i}" value="1" />   ${quesData_parsed[i].options[0]} <br />
                        <input type="radio" name="ques${i}" value="2" />   ${quesData_parsed[i].options[1]} <br />
                    </form>
                </div>
                <div id="alertHolder-${i}">

                </div>
            </div>
            <br>
            `);

            let optionKey;

            if(quesData_parsed[i].correctAnswer == quesData_parsed[i].options[0])
            {
              optionKey = "1"
            } else {
              optionKey = "2"
            }
            radioEvent(i, optionKey, quesData_parsed[i].correctAnswer);
          }else if(quesData_parsed[i].options.length == 3){
            totalScore = quesData_parsed.length;
            holder.insertAdjacentHTML('beforeend', `
            <div class="question">
                <h4 class="number">
                    Question ${i + 1}
                </h4>
                <div>
                    <textarea id="textarea${i}"  readonly class="form-control" placeholder="No question" name="Question-textarea-${i}">${quesData_parsed[i].question}</textarea>
                </div>
                <div>
                    <br>
                    <form name="ques${i}form" id="q${i}radio">
                        <input type="radio" name="ques${i}" value="1" />   ${quesData_parsed[i].options[0]} <br />
                        <input type="radio" name="ques${i}" value="2" />   ${quesData_parsed[i].options[1]} <br />
                        <input type="radio" name="ques${i}" value="3" />   ${quesData_parsed[i].options[2]} <br />
                    </form>
                </div>
                <div id="alertHolder-${i}">

                </div>
            </div>
            <br>
            `);

            let optionKey;

            if(quesData_parsed[i].correctAnswer == quesData_parsed[i].options[0])
            {
              optionKey = "1"
            } else if(quesData_parsed[i].correctAnswer == quesData_parsed[i].options[1]) {
              optionKey = "2"
            } else {
              optionKey = "3"
            }

            radioEvent(i, optionKey, quesData_parsed[i].correctAnswer);
          }else{
            totalScore = quesData_parsed.length;
            holder.insertAdjacentHTML('beforeend', `
            <div class="question">
                <h4 class="number">
                    Question ${i + 1}
                </h4>
                <div>
                    <textarea id="textarea${i}"  readonly class="form-control" placeholder="No question" name="Question-textarea-${i}">${quesData_parsed[i].question}</textarea>
                </div>
                <div>
                    <br>
                    <form name="ques${i}form" id="q${i}radio">
                        <input type="radio" name="ques${i}" value="1" />   ${quesData_parsed[i].options[0]} <br />
                        <input type="radio" name="ques${i}" value="2" />   ${quesData_parsed[i].options[1]} <br />
                        <input type="radio" name="ques${i}" value="3" />   ${quesData_parsed[i].options[2]} <br />
                        <input type="radio" name="ques${i}" value="4" />   ${quesData_parsed[i].options[3]} <br />
                    </form>
                </div>
                <div id="alertHolder-${i}">

                </div>
            </div>
            <br>
            `);
            let optionKey;

            if(quesData_parsed[i].correctAnswer == quesData_parsed[i].options[0])
            {
              optionKey = "1"
            } else if(quesData_parsed[i].correctAnswer == quesData_parsed[i].options[1]) {
              optionKey = "2"
            } else if(quesData_parsed[i].correctAnswer == quesData_parsed[i].options[2]){
              optionKey = "3"   
            } else {
              optionsKey = "4"
            }
            radioEvent(i, optionKey, quesData_parsed[i].correctAnswer);
          }
        }
        textAreaAdjust();
      }
    scoreCard();
};

function scoreCard(){
  let resultholder = document.getElementById("result_holder");
  resultholder.innerHTML = `<strong>SCORE: ${correct}/${totalScore}</strong>`
}




