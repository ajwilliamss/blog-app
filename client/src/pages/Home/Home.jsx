import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import Hero from "../../components/Hero/Hero";
import Posts from "../../components/Posts/Posts";
import Sidebar from "../../components/Sidebar/Sidebar";
import "./Home.css";

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [numPosts, setNumPosts] = useState(4);

  const location = useLocation();
  const { search } = location;

  // Get posts
  const getPosts = async () => {
    try {
      const response = await axios.get(`/api/posts/${search}`);
      // console.log(response);
      setPosts(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  // Invoke getPosts
  useEffect(() => {
    getPosts();
  }, [search]);

  return (
    <section className="home">
      <Hero />
      <div className="home-wrapper">
        <Posts posts={posts} numPosts={numPosts} />
        <Sidebar />
      </div>
      <div className="load-more-btn">
        {posts.length > 4 && (
          <button
            type="button"
            onClick={() => setNumPosts((prevNumPosts) => prevNumPosts + 2)}
          >
            Load More
          </button>
        )}
      </div>
    </section>
  );
};

export default Home;
