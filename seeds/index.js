const mongoose = require('mongoose')
const cities = require('./cities')
const { places, descriptors } = require('./seedHelpers')
const Campground = require('../models/campground')


mongoose.connect('mongodb://localhost:27017/yelp-camp', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
})

const sample = array => array[Math.floor(Math.random() * array.length)]


const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 300; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            //YOUR USER ID
            author: '63bff0c15d3a363c06c316b5',
            location: `${cities[random1000].city},${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda quia, tempora recusandae magni mollitia quis nihil praesentium, consectetur voluptate corporis doloribus vero aspernatur molestias alias ratione placeat earum ipsam illo!',
            price,
            geometry: {
                type: "Point",
                coordinates: [
                    cities[random1000].longitude,
                    cities[random1000].latitude
                ]
            },
            images: [{
                url: 'https://res.cloudinary.com/dnkjacirr/image/upload/v1673772097/YelpCamp/k0lachtjyi7klntobq3z.jpg',
                filename: 'YelpCamp/k0lachtjyi7klntobq3z',
            },
            {
                url: 'https://res.cloudinary.com/dnkjacirr/image/upload/v1673772100/YelpCamp/oglwourwzfruws6iahbj.jpg',
                filename: 'YelpCamp/oglwourwzfruws6iahbj',
            },
            {
                url: 'https://res.cloudinary.com/dnkjacirr/image/upload/v1673772102/YelpCamp/voq3warax4lwgkvapxgo.jpg',
                filename: 'YelpCamp/voq3warax4lwgkvapxgo',
            }]
        })
        await camp.save()
    }
}

seedDB().then(() => {
    mongoose.connection.close();
})