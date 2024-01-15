import mongoose from 'mongoose';

const commentSchema = mongoose.Schema({
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
    commentContent: {
        type: String,
        required: true
    }
}, { timestamps: true });

export default mongoose.model('Comment', commentSchema);