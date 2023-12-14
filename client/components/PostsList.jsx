import Post from './Post';

const PostsList = () => {

    const data = [{
        profileImg: "https://cdn-icons-png.flaticon.com/512/3899/3899618.png",
        profileName: "Profile Name",
        postContent: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Cumque quia impedit, voluptas distinctio fuga soluta doloremque non tenetur debitis illo ex molestias aliquid, in cum culpa repudiandae blanditiis dignissimos neque? Maiores libero ratione quia porro inventore repudiandae sint culpa similique!",
        upVote: "Up Vote",
        downVote: "Down Vote",
        comment: "Comment",
        timeStamp: "18:44 11/12/2023",
        id: 1
    },
    {
        profileImg: "https://cdn-icons-png.flaticon.com/512/3899/3899618.png",
        profileName: "Profile Name",
        postContent: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequuntur sunt quibusdam nam illo eveniet aliquid? Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequuntur sunt quibusdam nam illo eveniet aliquid? Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequuntur sunt quibusdam nam illo eveniet aliquid?",
        upVote: "Up Vote",
        downVote: "Down Vote",
        comment: "Comment",
        timeStamp: "18:44 11/12/2023",
        id: 2
    },
    {
        profileImg: "https://cdn-icons-png.flaticon.com/512/3899/3899618.png",
        profileName: "Profile Name",
        postContent: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Iste placeat fugit quos necessitatibus suscipit quibusdam in repudiandae quaerat modi, corporis ex praesentium alias velit repellat labore provident cumque eligendi quis exercitationem optio? Consequuntur quae nostrum amet ullam dolorem? Doloremque, numquam?",
        upVote: "Up Vote",
        downVote: "Down Vote",
        comment: "Comment",
        timeStamp: "18:44 11/12/2023",
        id: 3
    }];


    return (

        data.map((post) => {
            return <Post key={post.id} profileImg={post.profileImg} profileName={post.profileName} postContent={post.postContent} upVote={post.upVote} downVote={post.downVote} comment={post.comment} timeStamp={post.timeStamp} />
        })
    );
};

export default PostsList;