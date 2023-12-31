/* eslint-disable react-hooks/exhaustive-deps */
import Comment from './Comment';


const CommentsList = ({ postUserId, comment, setCommentUpdate }) => {


    return (


        comment.map((post) => {
            return <Comment key={post._id} setCommentUpdate={setCommentUpdate} postUserId={postUserId} userId={post.userId} commentId={post._id} profileName={post.profileName} postContent={post.postContent} upVote={'up vote'} downVote={'down vote'} timeStamp={new Date(post.createdAt).toLocaleString('en-GB', { hour: 'numeric', minute: 'numeric', second: 'numeric', year: 'numeric', month: 'numeric', day: 'numeric' })} />
        }).reverse()
    );
};


export default CommentsList;