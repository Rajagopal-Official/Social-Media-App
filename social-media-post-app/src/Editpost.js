import { useContext, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import DataContext from "./Context/DataContext"
const Editpost = () => {
  const { posts, handleEdit, setEditTitle, editTitle, editBody, setEditBody }=useContext(DataContext)
  const { id } = useParams();
  const post = posts.find((post) => post.id.toString() === id);

  useEffect(() => {
    if (post) {
      setEditTitle(post.title);
      setEditBody(post.body);
    }
  }, [post,setEditTitle, setEditBody]);

  return (
    <main className="NewPost">
      {editTitle && (
        <>
          <h2>Edit Post</h2>
          <form action="Editing" className="newPostForm" onSubmit={(e) => e.preventDefault()}>
            <label htmlFor="postTitle">Title:</label>
            <input
              type="text"
              id="postTitle"
              required
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
            />
            <label htmlFor="postBody">Post:</label>
            <textarea
              id="postBody"
              required
              value={editBody}
              onChange={(e) => setEditBody(e.target.value)}
            />
            <button type="submit" onClick={() => handleEdit(post.id)}>
              Submit
            </button>
          </form>
        </>
      )}
      {!editTitle && (
        <>
          <h2>Post not Found</h2>
          <p>Well that's disappointing!!</p>
          <p>
            <Link to="/">Visit home to Explore more!!</Link>
          </p>
        </>
      )}
    </main>
  );
};

export default Editpost;
