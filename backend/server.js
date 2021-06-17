import dotenv from 'dotenv';
dotenv.config();
import express from'express';
import mongoose from 'mongoose';
import Students from './studentschema.js';
import College from './collegeschema.js';
import cors from 'cors';
import sendEmail from './mail.js';
import AppliedCollege from './appliedSchema.js';


const app=express();
const port=process.env.PORT||5000;

app.use(express.json());
app.use(cors());

mongoose.connect(process.env.MONGO_URL,{
    useNewUrlParser:true,
    useFindAndModify:true,
    useUnifiedTopology:true,
}).then(()=>{
    console.log('mongodb connected');
}).catch((error)=>{
    console.log(error);
})


app.get('/hi',(req,res)=>{
    res.status(200).send("hi");
})

app.get('/students/college',(req,res)=>{
    Students.find((err,data)=>{
        if(err){
            res.status(500).send(err);
        }else{
            res.status(200).send(data);
        }
    })
})

/*app.get('/',(req, res, next) => {
    const filters = req.query;
    const filteredUsers = Students.filter(user => {
      let isValid = true;
      for (let key in filters) {
        console.log(key, user[key], filters[key]);
        isValid = isValid && user[key] == filters[key];
      }
      return isValid;
    });
    res.send(filteredUsers);
  }
)*/

app.get('/students/college/:query', cors(), function(req, res) {
    var query = req.params.query;

    Students.find({
        'college': query
    }, function(err, result) {
        if (err) throw err;
        if (result) {
            res.json(result)
        } else {
            res.send(JSON.stringify({
                error : 'Error'
            }))
        }
    })
})
app.post('/post/student',(req,res)=>{
    const dbMessage=req.body;
    Students.create(dbMessage,(err,data)=>{
       if(err){
           res.status(500).send(err);
       }else{
           res.status(201).send(data);
       }
   })
})

app.get('/get/college',(req,res)=>{
    College.find((err,data)=>{
        if(err){
            res.status(500).send(err);
        }else{
            res.status(200).send(data);
        }
    })
})
app.post('/post/college',(req,res)=>{
    const dbMessage=req.body;
    College.create(dbMessage,(err,data)=>{
       if(err){
           res.status(500).send(err);
       }else{
           res.status(201).send(data);
       }
   })
})

app.post("/api/sendMail", (req, res) => {

    console.log(req.body)
    sendEmail(req.body.mail, req.body.college, "Appliedforuniversity")
    const dbMessage=req.body;
    console.log(dbMessage);
   AppliedCollege.create(dbMessage,(err,data)=>{
       if(err){
           res.status(500).send(err);
       }else{
           res.status(201).send(data);
       }
   })
})
app.get('/api/college',(req,res)=>{
    AppliedCollege.find((err,data)=>{
        if(err){
            res.status(500).send(err);
        }else{
            res.status(200).send(data);
        }
    })
})
{/*app.post('/api/college',(req,res)=>{
    const dbMessage=req.body;
    console.log(dbMessage);
   AppliedCollege.create(dbMessage,(err,data)=>{
       if(err){
           res.status(500).send(err);
       }else{
           res.status(201).send(data);
       }
   })
})*/}



app.listen(port,(()=>{
    console.log(`port is running on ${port}`)
}))


