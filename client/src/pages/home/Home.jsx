import { useEffect, useState } from "react";
import Header from "../../components/header/Header";
import Posts from "../../components/posts/Posts";
import Categories from "../../components/category/Categories";
import Footer from "../../components/footer/Footer";
import '../../App.css';
import axios from "axios";
import { useLocation } from "react-router";

export default function Home() {
  const [posts, setPosts] = useState([]);
  const { search } = useLocation();

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await axios.get("/posts" + search); //fetch data from api
      setPosts(res.data); //set data post from the res.data response 
    };
    fetchPosts();
  }, [search]);
  return (
    <>
      <Header />
      <div className="home">
        <Posts posts={posts} />
        <Categories />
      </div>
      <Footer />
    </>
  );
}
