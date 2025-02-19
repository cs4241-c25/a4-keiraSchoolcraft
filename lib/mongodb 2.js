import mongoose from 'mongoose';

const clientPromise = mongoose.connect(process.env.MONGODB_URI).then(mongoose => mongoose.connection.getClient());

export default clientPromise;
