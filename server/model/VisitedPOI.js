import mongoose from 'mongoose';
const {Schema, model} = mongoose

const VisitedPOISchema = new Schema ({
    xid: { type: String,
    unique: true
    },
    image: String,
    name: String,
    city: String,
    countryCode: String,
    kinds: String,
    rating: Number,
    listType: String  
})



const VisitedPOI = model('visitedPOI', VisitedPOISchema);

export default VisitedPOI