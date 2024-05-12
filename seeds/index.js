const mongoose = require('mongoose');
const Campground = require('../models/campground');
const cities = require('./cities');
const {places, descriptors} = require('./seedHelpers')

mongoose.connect('mongodb://localhost:27017/yelp-camp');
const db = mongoose.connection;
db.on("error", console.error.bind(console,"connection error:"));
db.once("open",()=>{
    console.log("Database connected");
})

const sample = array => array[Math.floor(Math.random()*array.length)];
const price = Math.floor(Math.random()*20)+10;

const seedDb = async()=>{
    await Campground.deleteMany({});
    for(let i=0;i<1000;i++){
        const random1000 = Math.floor(Math.random()*1000);
        const camp = new Campground({
            author: '6636fc0edf1460f335da44ae',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam dolores vero perferendis laudantium, consequuntur voluptatibus nulla architecto, sit soluta esse iure sed labore ipsam a cum nihil atque molestiae deserunt!',
            price,
            geometry:{
              type:"Point",
              coordinates:
              [
                cities[random1000].longitude,
                cities[random1000].latitude
              ]
            },


            images: [
                {
                  url: 'https://res.cloudinary.com/dfvwb9euk/image/upload/v1715391115/YelpCamp/cyqyj8pte540ogxgeqzc.jpg',
                  filename: 'YelpCamp/cyqyj8pte540ogxgeqzc'
                },
                {
                  url: 'https://res.cloudinary.com/dfvwb9euk/image/upload/v1715391255/YelpCamp/fu5upk7gq2yrvar4bifs.jpg',
                  filename: 'YelpCamp/fu5upk7gq2yrvar4bifs'
                },
                {
                  url: 'https://res.cloudinary.com/dfvwb9euk/image/upload/v1715391258/YelpCamp/pnx1kghauumrabgse3jr.jpg',
                  filename: 'YelpCamp/pnx1kghauumrabgse3jr'
                }
              ],
        });
        await camp.save();
    }
}

seedDb().then(()=>{
    mongoose.connection.close();
});