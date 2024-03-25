import mongoose from 'mongoose';


const postSchema = mongoose.Schema({
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
    },
    commentsCount: {
        type: Number,
        default: 0,
    }
}, { timestamps: true });


export default mongoose.model('Post', postSchema);