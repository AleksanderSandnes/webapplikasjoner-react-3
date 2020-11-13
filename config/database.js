import mongoose from 'mongoose';

const connectDatabase = async () => {
    let dbConnect;
    try {
        dbConnect = await mongoose.connect(process.env.DATABASE_LOCAL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
        });
    } catch (error) {
        console.log(error.message);
    }

    console.log('Koblet til mongodb ${dbConnect.conection.host}. Melding fra server/config/database.js')
};

export default connectDatabase;