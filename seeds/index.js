const mongoose = require('mongoose');
const Campground = require('../models/campground');
const { places, descriptors } = require('./seedHelpers');
const cities = require('./cities');

mongoose.connect('mongodb://localhost:27017/yelp-camp', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error"));
db.once("open", () => {
    console.log("Database Connected");
});

const sample = array => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
    await Campground.deleteMany({});
    for(let i=0; i<200; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 30) + 10;
        const camp = new Campground({
            author: '62b1c098650671b029b1a2e9',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Provident et quia expedita magnam soluta quidem. Placeat sequi harum omnis. Amet sequi a autem. Porro aperiam hic, iusto ducimus distinctio neque.',
            price,
            geometry: {
                type: "Point",
                coordinates: [cities[random1000].longitude, cities[random1000].latitude]
            },
            images: [
                {
                  url: 'https://res.cloudinary.com/dl6kousyu/image/upload/v1655981507/YelpCamp/leon-contreras-YndHL7gQIJE-unsplash_gj2cl1.jpg',
                  filename: 'YelpCamp/fzxoagangcv6ydevo1p5',
                },
                {
                  url: 'https://res.cloudinary.com/dl6kousyu/image/upload/v1655981512/YelpCamp/scott-goodwill-y8Ngwq34_Ak-unsplash_ydzujy.jpg',
                  filename: 'YelpCamp/dxqiy87qm2tlkuvy5z0y',
                }
              ]
        })
        await camp.save();
    }
}

seedDB()
    .then( () => {
        mongoose.connection.close();
    })