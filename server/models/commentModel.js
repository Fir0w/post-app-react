import mongoose from 'mongoose';

const postSchema = mongoose.Schema({
    postId: {
        type: String,
        required: true
    },
    userId: {
        type: String,
        required: true
    },
    profileName: {
        type: String,
        required: true
    },
    postContent: {
        type: String,
        required: true
    }
}, { timestamps: true });

export default mongoose.model('Comment', postSchema);