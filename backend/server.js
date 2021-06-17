import dotenv from 'dotenv';
dotenv.config();
import express from'express';
import mongoose from 'mongoose';
import Students from './studentschema.js';
import College from './collegeschema.js';
import cors from 'cors';
import sendEmail from './mail.js';
import AppliedCollege from './appliedSchema.js';
import Pusher from 'pusher';

const app=express();
const port=process.env.PORT||5000;

const pusher = new Pusher({
    appId: "1220994",
    key: "9380f96f344ea8a3e0d7",
    secret: "6198a45c093c20513088",
    cluster: "ap2",
    useTLS: true
  });

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

const db=mongoose.connection;

db.once("open",()=>{
    console.log("db connected");

const msgCollection=db.collection('appliedcolleges');
const changeStream=msgCollection.watch();

changeStream.on("change",(change)=>{
    console.log("a change occured",change);

    if(change.operationType==="insert"){
        const messageDetails=change.fullDocument;
        pusher.trigger("messages","inserted",{
            college:messageDetails.college,
            department:messageDetails.department,
            gpa:messageDetails.gpa,
        });
    }else{
        console.log("error pusher");
    }

});
});


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


