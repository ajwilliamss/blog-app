import { useState, useContext } from "react";
import { UserContext } from "../../contexts/UserContext/UserContext";
import axios from "axios";
import blogImage from "../../assets/blog-img.jpg";
import "./Edit.css";

const IMAGE_PATH = process.env.REACT_APP_IMAGE_PATH;

const Edit = ({ post, setEditMode, postId }) => {
  const { title, author, category, text, image } = post;

  const [postData, setPostData] = useState({
    title,
    author,
    category,
    text,
  });

  const { user } = useContext(UserContext);

  // Add input to postData state
  const handleChange = (e) => {
    setPostData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  // Update post
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // If token exists
      if (user.token) {
        const editedPost = {
          title: postData.title,
          author: postData.author,
          category: postData.category,
          text: postData.text,
        };

        const response = await axios.put(`/api/posts/${postId}`, editedPost, {
          headers: { Authorization: user.token },
        });

        // console.log(response.data);
        setEditMode(false);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="single-post">
      <form className="edit-form" onSubmit={handleSubmit}>
        <img
          src={image ? `${IMAGE_PATH}${image}` : blogImage}
          alt={title}
          className="edit-image-preview"
        />

        {/* Title */}
        <input
          type="text"
          name="title"
          className="edit-title"
          required
          value={postData.title}
          onChange={handleChange}
        />

        {/* Author */}
        <input
          type="text"
          name="author"
          className="edit-author"
          required
          value={postData.author}
          onChange={handleChange}
        />

        {/* Category */}
        <select
          name="category"
          className="edit-category"
          required
          value={postData.category}
          onChange={handleChange}
        >
          <option value="">Select category</option>
          <option value="Technology">Technology</option>
          <option value="Fitness">Fitness</option>
          <option value="News">News</option>
          <option value="Code">Code</option>
          <option value="Travel">Travel</option>
          <option value="Food">Food</option>
        </select>

        {/* Text */}
        <textarea
          name="text"
          className="edit-text"
          value={postData.text}
          onChange={handleChange}
        ></textarea>

        {/* Buttons */}
        <div className="edit-btns">
          <button
            type="button"
            className="edit-btn"
            onClick={() => setEditMode(false)}
            style={{ background: "tomato" }}
          >
            Cancel
          </button>
          <button type="submit" className="edit-btn">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default Edit;
