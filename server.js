const PORT = process.env.PORT || 5000

const axios = require('axios')

const apiCalls = require('./utils/apiCalls')
const dbCalls = require('./utils/dbCalls')

// Initialise express
const express = require('express');
const app = express()

// Use body-parser to enable requests to come in the body
var bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.post('/translate', (req, res) => {
    let data = {
        target: req.body.target,
        source: req.body.source,
        input: req.body.input, 
    }

    dbCalls.findInDB(data).then((value) => {
        if(value.rowCount == 0) {
            apiCalls.getDataFromAPI(data)
            .then((val) => {
                data.result = val.outputs[0].output
                dbCalls.saveDataToDB(data)
                res.send(data);
            }).catch((error) => {
                res.send(error);
            });
        }
        else if(value.rowCount > 0) {
            res.send(value)
        }
    }).catch((err) => {
        console.log(err);
    })
})

app.listen(PORT, () => console.log(`Listening on ${ PORT }`));