import mongoose from 'mongoose';

const postSchema = mongoose.Schema({
    profileName: {
        type: String,
        required: true
    },
    postContent: {
        type: String,
        required: true
    }
}, { timestamps: true });

export default mongoose.model('Post', postSchema);