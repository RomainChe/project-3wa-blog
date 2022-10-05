import Post from "../post/Post";
import '../../App.css';

export default function Posts({ posts }) {
  return (
    // get all the post
    <div className="posts">
      {posts.map((p) => (
        <Post post={p} />
      ))}
    </div>
  );
}
