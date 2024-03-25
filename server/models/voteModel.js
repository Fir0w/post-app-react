import mongoose from 'mongoose';


const voteSchema = mongoose.Schema({
    postId: {
        type: String,
        required: true
    },
    userId: {
        type: Array,
        required: true
    },
    votesCount: {
        type: Number,
        default: 0,
    }
}, { timestamps: true });


export default mongoose.model('Vote', voteSchema);