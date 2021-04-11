-- Create questions table
CREATE TABLE IF NOT EXISTS questions(
      questionId INT(6) NOT NULL PRIMARY KEY,
      question VARCHAR(255),
      correctAnswer VARCHAR(255)
    );

-- Create options table
CREATE TABLE IF NOT EXISTS options(
        optionsId INT(6) AUTO_INCREMENT PRIMARY KEY,
        questionId INT(6),
        optionValue VARCHAR(255)
      );

-- Insert into questions table
INSERT INTO questions (questionId, question, correctAnswer) VALUES (?,?,?);

-- Insert into options table with conditions
INSERT INTO options (questionId, optionValue) Values (${id}, ${req.body.opt1}), (${id}, ${req.body.opt2})

-- Select all the questions with options
SELECT questions.questionId, questions.question AS question, questions.correctAnswer AS correctAnswer, GROUP_CONCAT(options.optionValue SEPARATOR  ', ' ) AS options FROM options, questions where questions.questionId = options.questionId GROUP by questions.questionId;

-- Delete a particular question with all options
DELETE questions, options FROM questions INNER JOIN options ON questions.questionId = options.questionId WHERE questions.questionId = ${id};

-- Get all options of a particular question
SELECT optionsId, optionValue FROM options where questionId = ${id}

-- edit question with a particular questionId
UPDATE questions SET question = ?, correctAnswer = ? WHERE questionId = ${id}

-- edit options with a particular optionsId
UPDATE options SET optionValue = ? WHERE optionsId = ${id}