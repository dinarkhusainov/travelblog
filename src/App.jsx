import React, {useState, useEffect} from "react";
import {Routes, Route} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./style.css";

import Header from "./components/Header/header";
import Footer from "./components/Footer/footer";
import Modal from "./components/Modal";

import Home from "./pages/Home.jsx";
import Posts from "./pages/Posts.jsx";
import Profile from "./pages/Profile";
import AddPost from "./pages/AddPost";
import Favorites from "./pages/Favorites";

import {Api} from "./Api";
import Ctx from "./Ctx";
import Post from "./pages/Post";


const PATH = "/";

const App = () => {
    let usr = localStorage.getItem("user8");
    if (usr) {
        usr = JSON.parse(usr);
    }
    const [user, setUser] = useState(usr);
    const [token, setToken] = useState(localStorage.getItem("token8"));
    const [modalActive, setModalActive] = useState(false);
    const [api, setApi] = useState(new Api(token));
    const [posts, setPosts] = useState([]);
    const [visiblePosts, setVisiblePosts] = useState(posts);
    const [favorites, setFavorites] = useState([]);

    useEffect(() => {
        if (token) {
            api.getPosts()
                .then(res => res.json())
                .then(data => {
                    setPosts(data.filter(d => d.tags.includes("travelblog23")));
                })
        }
    }, []) 

    useEffect(() => {
        setApi(new Api(token));
        let usr = localStorage.getItem("user8");
        if (usr) {
            usr = JSON.parse(usr);
        }
        setUser(usr);
    }, [token])

    useEffect(() => {
        if (!user) {
            localStorage.removeItem("token8");
            setToken(null);
        }
    }, [user])

    useEffect(() => {
        if (token) {
            api.getPosts()
                .then(res => res.json())
                .then(data => {
                    setVisiblePosts(data.filter(d => d.tags.includes("travelblog23")));
                    setPosts(data.filter(d => d.tags.includes("travelblog23")));
                })
        }
    }, [api])

    useEffect(() => {
        setFavorites(posts.filter(el => {
            return el.likes && el.likes.includes(user._id);
        }))
    }, [posts])

    return (
        <Ctx.Provider value={{
            user: user,
            token: token,
            api: api,
            modalActive: modalActive,
            posts: posts,
            visiblePosts: visiblePosts,
            favorites: favorites,
            setUser: setUser,
            setToken: setToken,
            setApi: setApi,
            setModalActive: setModalActive,
            setPosts: setPosts,
            setVisiblePosts: setVisiblePosts,
            setFavorites: setFavorites,
            PATH: PATH,
        }}>
            <div className="wrapper">
                <Header/>
                <main className="py-4">
                    <Routes>
                        <Route path={PATH} element={<Home />}/>
                        <Route path={PATH + "posts"} element={<Posts />}/>
                        <Route path={PATH + "profile"} element={<Profile/>}/>
                        <Route path={PATH + "posts/:id"} element={<Post/>}/>
                        <Route path={PATH + "add"} element={<AddPost/>}/>
                        <Route path={PATH + "favorites"} element={<Favorites/>}/>
                    </Routes>
                    
                </main>
                <Footer/>
            </div>
            <Modal/>
        </Ctx.Provider>
    )
}
export default App;
