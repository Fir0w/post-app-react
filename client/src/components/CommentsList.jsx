import Comment from './Comment';


const CommentsList = ({ postUserId, comment, setCommentUpdate }) => {


    return (


        comment.map((comment) => {
            return <Comment key={comment._id}
                setCommentUpdate={setCommentUpdate}
                postUserId={postUserId}
                userId={comment.userId}
                commentId={comment._id}
                profileName={comment.profileName}
                commentContent={comment.commentContent}
                timeStamp={new Date(comment.createdAt).toLocaleString('en-GB', { hour: 'numeric', minute: 'numeric', second: 'numeric', year: 'numeric', month: 'numeric', day: 'numeric' })} />
        }).reverse()
    );
};


export default CommentsList;