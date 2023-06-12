import express from 'express';
import mongoose from 'mongoose';
import VisitedPOI from './model/VisitedPOI.js'
const url = 'mongodb+srv://vidGav:Civilwar47@cluster0.naklajy.mongodb.net?retryWrites=true&w=majority'

const app = express();
app.use(express.json());

async function connect () {
  try {
      await mongoose.connect(url);
      console.log('connected to mongoDB')
  } catch (err) {
      console.log(err)
  }
}
connect()

app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', 'http://localhost:5173');
    res.header('Access-Control-Allow-Headers',"GET, PUT, POST, DELETE, PATCH",
      'Origin, X-Requested-With, Content-Type, Accept',
    );
    next();
  });

  app.get('/', (req, res)=>{
    res.send('Hello World!')
  })

  app.get('/visited', async (req, res) => {
    try {
      const visitedPOIs = await VisitedPOI.find()
      res.send(visitedPOIs)
    } catch (error) {
      console.log(error)
    }
  })

  app.post('/visited', (req, res) => {

    const xid = req.body.xid
    const image = req.body.image
    const name = req.body.name
    const city = req.body.city
    const countryCode = req.body.countryCode
    const kinds = req.body.kinds
    const rating = req.body.rating
    const listType = req.body.listType

    const visitedPOI = new VisitedPOI ({
        xid,
        image,
        name,
        city,
        countryCode,
        kinds,
        rating,
        listType
    }).save().then(visitedPOI => res.json(visitedPOI)).catch((err) => {
      res.sendStatus(500)
      console.log(err)})
  })

  app.patch('/visited/:id', async (req, res) => {
    const id = req.params.id
    const updates = req.body
    const toUpdate = await VisitedPOI.findByIdAndUpdate(id, updates)
    console.log(updates)
    console.log(toUpdate)
    
    res.send('updated')
  })

  app.delete('/visited/:id', async (req, res) => {
    console.log(req.params.id)
    const id = req.params.id;
    const toDelete = await VisitedPOI.findOneAndDelete({xid: id})
    
    res.send(toDelete)
  })


app.listen(3000, () => console.log('Server started on port 3000'));

