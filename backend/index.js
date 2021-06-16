const express = require('express');
const connection = require('./conf')
const app = express();
const cors = require('cors')
const port = 5000;

// global middleware
app.use(express.urlencoded({extended:false}));
app.use(express.json());

// Allow cors policies
app.use(cors())


connection.connect((err)=>{
  if(err) {
    console.error(`Error trying to reach the DB. Error: ${err.stack}`)
    return;
  }
  console.log('We did it! Connection to the DB is created!')
})


app.get('/', (req, res) => {
  res.send('hey from the server!')
})


app.get('/students', (req, res) => {

  connection.query('SELECT * FROM student', (err, results) => {
    if(err) {
      res.status(500).send('Server error, could not fetch students')
    }
    else {
      res.json(results)
    }
  })
})


app.post('/students', (req, res) => {

  let student = {
    user: req.body.user
  }

  connection.query('INSERT INTO student SET ?', student, (err) => {
    if(err) {
      res.status(500).send('Server error, could not post that student')
    }
    else {
      res.sendStatus(201)
    }
  })

})



app.listen(port, (err) => {
  if(err) throw new Error('Something did not work :/ ...')
  console.log(`Server is running great on port: ${port}`)
})
