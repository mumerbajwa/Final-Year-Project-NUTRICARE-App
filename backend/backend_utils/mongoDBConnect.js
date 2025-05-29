const mongoose = require('mongoose');

const connectToDatabase = async () => {
    try {
        await mongoose.connect('mongodb+srv://abdullahliaquat115:Lk84FEjSwGpFZ2ok@cluster0.spjdx.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('MongoDB connected');
    } catch (error) {
        console.error('MongoDB connection error:', error);
        process.exit(1); // Exit the application if the connection fails
    }
};

module.exports = connectToDatabase;
