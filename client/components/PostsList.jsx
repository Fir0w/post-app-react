import Post from './Post';


const PostsList = ({ setPostFormContent, postContent }) => {

    return (


        postContent.map((post) => {
            return <Post key={post._id} setPostFormContent={setPostFormContent} userId={post.userId} postId={post._id} profileName={post.profileName} postContent={post.postContent} upVote={'up vote'} downVote={'down vote'} comment={`${post.commentsCount} comments`} timeStamp={new Date(post.createdAt).toLocaleString('en-GB', { hour: 'numeric', minute: 'numeric', second: 'numeric', year: 'numeric', month: 'numeric', day: 'numeric' })} />
        }).reverse()
    );
};


export default PostsList;