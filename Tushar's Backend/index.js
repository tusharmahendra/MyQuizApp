const cors = require('cors');
const express = require('express');
const app = express();

const { getQues, postQues, deleteQues, getOpt, editQues, editOpt} = require("./question")

app.use(express.json());
app.use(cors());
app.get("/questions", getQues);
app.post("/question", postQues);
app.get("/:id/options", getOpt)
app.put("/:id", editQues);
app.put("/options/:id", editOpt);
app.delete("/:id", deleteQues);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));