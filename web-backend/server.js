var express = require('express');
var morgan = require('morgan')
var cors = require('cors')

var {initDb,addIndex} = require("./db/init")

var {
    userRouter,
    draftRouter,
    postRouter
} = require('./routes/index');
const e = require('express');


var corsOptions = {
    origin: '*',
    optionsSuccessStatus: 200
}

const port = 8080


var app = express();


app.use(express.json());



app.use(cors(corsOptions))

app.use(morgan(':method :url :status :res[content-length] - :response-time ms'));
app.use("/user", userRouter)
app.use("/draft", draftRouter)
app.use("/post", postRouter)
app.use("/", function (req, res) {
    res.json({
        "lol": "lol"
    })
})


initDb(function (err) {
    addIndex()
    app.listen(port, function (err) {
        if (err) {
           
            throw err; //
        }
        
        console.log(`Example app listening at http://localhost:${port}`)
    });
});

