const mongoose = require("mongoose")



require("node:dns/promises").setServers(["1.1.1.1", "8.8.8.8"]);


async function connectToDB() {

    try {
        await mongoose.connect(process.env.MONGO_URI)

        console.log("Connected to Database")
    }
    catch (err) {
        console.log(err)
    }
}

module.exports = connectToDB