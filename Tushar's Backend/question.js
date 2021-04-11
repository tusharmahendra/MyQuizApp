var con = require('./db');

exports.postQues = (req, res) => {
   const createQuestionQuery = `
    CREATE TABLE IF NOT EXISTS questions(
      questionId INT(6) NOT NULL PRIMARY KEY,
      question VARCHAR(255),
      correctAnswer VARCHAR(255)
    )`;

      con.query(createQuestionQuery, (err, result) => {
        if (err) throw err;
        console.log('Table 1 created');
      });
  
      const createOptionsQuery = `CREATE TABLE IF NOT EXISTS options(
        optionsId INT(6) AUTO_INCREMENT PRIMARY KEY,
        questionId INT(6),
        optionValue VARCHAR(255)
      )`;
  
      con.query(createOptionsQuery, (err, result) => {
        if (err) throw err;
        console.log('Table 2 created');
      });
    
  
  let answer = {}
  let id = Math.floor(100000 + Math.random() * 900000);
  let question = req.body.question;
  let correctAnswer = req.body.correctAnswer;
  let insertQuestionQuery = `INSERT INTO questions (questionId, question, correctAnswer) VALUES (?,?,?)`;

  con.query(insertQuestionQuery,[id, question, correctAnswer], (err, result) => {
    if (err) {
    res.status(500).json({error: err.code})
    }else {
      console.log(result)
      answer.question = result;
    }
  });

  if ((req.body.opt3=="") && (req.body.opt4=="")){
    var insertOptionsQuery = `INSERT INTO options (questionId, optionValue) Values (${id}, ${req.body.opt1}), (${id}, ${req.body.opt2})`  
  }else if(req.body.opt4==""){
    var insertOptionsQuery = `INSERT INTO options (questionId, optionValue) Values (${id}, ${req.body.opt1}), (${id}, ${req.body.opt2}),  (${id}, '${req.body.opt3}')`
  }else{
    var insertOptionsQuery = `INSERT INTO options (questionId, optionValue) Values (${id}, ${req.body.opt1}), (${id}, ${req.body.opt2}), (${id}, '${req.body.opt3}'),(${id}, '${req.body.opt4}')`;
} 

  con.query(insertOptionsQuery, (err, result) => {
    if (err) res.status(500).json({error: err.code})
    else {
      console.log(result)
      answer.options = result;
       res.json(answer)
    }
    ;
  });
}

exports.getQues = (req, res) => {
  let questionsQuery = `SELECT questions.questionId, questions.question AS question, questions.correctAnswer AS correctAnswer, GROUP_CONCAT(options.optionValue SEPARATOR  ', ' ) AS options FROM options, questions where questions.questionId = options.questionId GROUP by questions.questionId`;

  con.query(questionsQuery, (err, result) =>{
    if(err) res.status(500).json({error: err.code})
    else{
      result.forEach(elm => {
        elmOptions = elm.options.split(", ");
        elm.options = elmOptions;
    });
    res.json(result);
    }
  })
}


exports.deleteQues = (req,res) =>{
  let id = req.params.id;

  let Query = `DELETE questions, options FROM questions INNER JOIN options ON questions.questionId = options.questionId WHERE questions.questionId = ${id}`;

  con.query(Query, (err, result) =>{
    if(err) res.status(500).json({error: err})
    else{
          res.json({message: "Question Deleted Successfully"})
        }
  })
}

exports.getOpt = (req, res) =>{
  let id = req.params.id;

  let optionsQuery = `SELECT optionsId, optionValue FROM options where questionId = ${id}`
  con.query(optionsQuery, (err, result) =>{
    if(err) res.status(500).json({error: err.code})
    else{
    res.json(result);
    }
  })

}

exports.editQues = (req, res) =>{
  let id = req.params.id;
  let question = req.body.question;
  let answer = req.body.correctAnswer
  let editQuestion = `UPDATE questions SET question = ?, correctAnswer = ? WHERE questionId = ${id}`

   con.query(editQuestion,[question, answer], (err, result) =>{
    if(err) res.status(500).json({error: err.code})
    else {
      res.json(result)
    }
})
}

exports.editOpt = (req, res) =>{
  let id= req.params.id
  let option = req.body.optionValue;
    let editOptions = `UPDATE options SET optionValue = ? WHERE optionsId = ${id}`

    con.query(editOptions,[option], (err, result) =>{
      if(err) res.status(500).json({error: err.code})
      else {
        res.json(result)
      }
  })
}