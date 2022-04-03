import { useState, useRef, useEffect, useContext } from "react";
import { PostContext } from "../../contexts/PostContext/PostContext";
import { UserContext } from "../../contexts/UserContext/UserContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import blogImage from "../../assets/blog-img.jpg";
import "./Create.css";

const Create = () => {
  const titleRef = useRef(null);
  const authorRef = useRef(null);
  const categoryRef = useRef(null);
  const textRef = useRef(null);

  const [image, setImage] = useState(null);
  const { isError, dispatch } = useContext(PostContext);
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  // Create post
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch({ type: "CREATE_POST" });
      const newPost = {
        title: titleRef.current.value,
        author: authorRef.current.value,
        category: categoryRef.current.value,
        text: textRef.current.value,
      };

      // If image selected
      if (image) {
        const newImage = new FormData();
        const filename = `${uuidv4()}${image.name}`;
        newImage.append("name", filename);
        newImage.append("file", image);
        newPost.image = filename;
        try {
          await axios.post("/api/upload", newImage);
        } catch (error) {
          console.error(error);
        }
      }

      const response = await axios.post("/api/posts", newPost, {
        headers: { Authorization: user.token },
      });

      // console.log(response);
      dispatch({ type: "CREATE_POST_SUCCESS", payload: response.data });
      // When post created, redirect to post
      navigate(`/posts/${response.data._id}`);
    } catch (error) {
      console.error(error);
      dispatch({ type: "CREATE_POST_ERROR" });
    }
  };

  // Focus title input upon initial render
  useEffect(() => {
    titleRef.current.focus();
  }, []);

  return (
    <section className="create-post">
      <form className="create-form" onSubmit={handleSubmit}>
        <img
          src={image ? URL.createObjectURL(image) : blogImage}
          alt="post"
          className="create-image-preview"
        />

        {/* Image */}
        <input
          type="file"
          name="image"
          className="create-image"
          onChange={(e) => setImage(e.target.files[0])}
        />

        {/* Title */}
        <input
          type="text"
          name="title"
          placeholder="Title"
          className="create-title"
          ref={titleRef}
          required
        />

        {/* Author */}
        <input
          type="text"
          name="author"
          placeholder="Author"
          className="create-author"
          ref={authorRef}
          required
        />

        {/* Category */}
        <select
          name="category"
          className="create-category"
          ref={categoryRef}
          required
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
          className="create-text"
          placeholder="Enter text"
          ref={textRef}
          required
        ></textarea>

        {/* Button */}
        <div className="create-btn">
          <button type="submit">Submit</button>
        </div>
        {isError && <p className="create-error">Unable to create post.</p>}
      </form>
    </section>
  );
};

export default Create;
