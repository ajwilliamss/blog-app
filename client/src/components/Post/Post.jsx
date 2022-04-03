import { useState, useEffect, useContext } from "react";
import { UserContext } from "../../contexts/UserContext/UserContext";
import { Link, useParams, useNavigate } from "react-router-dom";
import { FaEdit, FaTrash } from "react-icons/fa";
import axios from "axios";
import Edit from "../Edit/Edit";
import blogImage from "../../assets/blog-img.jpg";
import "./Post.css";

const IMAGE_PATH = process.env.REACT_APP_IMAGE_PATH;

const Post = () => {
  const [post, setPost] = useState({});
  const [editMode, setEditMode] = useState(false);

  const { postId } = useParams();
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  // Destructure post object
  const { author, title, text, category, createdAt, updatedAt, image } = post;

  // Get post
  const getPost = async () => {
    try {
      const response = await axios.get(`/api/posts/${postId}`);

      // console.log(response);
      setPost(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  // Delete post
  const handleDelete = async () => {
    try {
      // If token exists
      if (user.token) {
        const response = await axios.delete(`/api/posts/${postId}`, {
          headers: { Authorization: user.token },
        });

        // console.log(response);
        // If delete successful, redirect home
        navigate("/");
      }
    } catch (error) {
      console.error(error);
    }
  };

  // Invoke getPost
  useEffect(() => {
    getPost();
  }, [editMode]);

  if (editMode) {
    return <Edit post={post} setEditMode={setEditMode} postId={postId} />;
  }

  return (
    <div className="single-post">
      <img
        src={image ? `${IMAGE_PATH}${image}` : blogImage}
        alt={title}
        className="single-post-img"
      />
      <h2 className="single-post-title">
        {title}
        {user
          ? post.user === user._id && (
              <div className="single-post-btns">
                <FaEdit
                  size="2rem"
                  style={{ marginLeft: "0.5rem", color: "teal" }}
                  className="single-post-icon"
                  onClick={() => setEditMode(true)}
                />
                <FaTrash
                  size="2rem"
                  style={{ marginLeft: "0.5rem", color: "tomato" }}
                  className="single-post-icon"
                  onClick={() => handleDelete()}
                />
              </div>
            )
          : null}
      </h2>
      <div className="single-post-info">
        <span>
          Author:{" "}
          <Link to={`/?author=${author}`} className="single-post-item">
            {author}
          </Link>
        </span>
        <span>
          Category:{" "}
          <span className="single-post-item">
            <Link to={`/?category=${category}`}>{category}</Link>
          </span>
        </span>
        <span>
          Created:{" "}
          <span className="single-post-item">
            {new Date(createdAt).toDateString()}
          </span>
        </span>
        <span>
          Updated:{" "}
          <span className="single-post-item">
            {new Date(updatedAt).toDateString()}
          </span>
        </span>
      </div>
      <p className="single-post-desc">{text}</p>
    </div>
  );
};

export default Post;
