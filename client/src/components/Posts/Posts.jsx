import { Link } from "react-router-dom";
import blogImage from "../../assets/blog-img.jpg";
import "./Posts.css";

const IMAGE_PATH = process.env.REACT_APP_IMAGE_PATH;

const Posts = ({ posts, numPosts }) => {
  const slicedPosts = posts.slice(0, numPosts);

  return (
    <div className="posts">
      {slicedPosts.map((post) => {
        // Destructure each post object
        const { _id, title, text, category, createdAt, image } = post;

        return (
          <div className="post" key={_id}>
            <Link to={`/posts/${_id}`}>
              <img
                src={image ? `${IMAGE_PATH}${image}` : blogImage}
                alt={title}
                className="post-img"
              />
            </Link>
            <div className="post-info">
              <h4 className="post-title">
                <Link to={`/posts/${_id}`}>{title}</Link>
              </h4>
              <div className="post-category">
                <span className="category">{category}</span>
              </div>
              <span className="post-date">
                {new Date(createdAt).toDateString()}
              </span>
            </div>
            <p className="post-desc">{text}</p>
          </div>
        );
      })}
    </div>
  );
};

export default Posts;
