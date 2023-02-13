import React, {useState, useEffect} from "react";
// Router - маршрут
import {Routes, Route} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./style.css";
// import products from "./assets/data.json";

import Header from "./components/Header/header";
import Footer from "./components/Footer/footer";
import Modal from "./components/Modal";

import Home from "./pages/Home.jsx";
import Posts from "./pages/Posts.jsx";
import Profile from "./pages/Profile";
import Product from "./pages/Post";
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
    const [goods, setGoods] = useState([]);
    const [visibleGoods, setVisibleGoods] = useState(goods);
    const [favorites, setFavorites] = useState([]);
    const [basket, setBasket] = useState(localStorage.getItem("basket8") ? JSON.parse(localStorage.getItem("basket8")) : []);

    useEffect(() => {
        if (token) {
            api.getPosts()
                .then(res => res.json())
                .then(data => {
                    //setGoods(data.products);
                    console.log(data)
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
                    setVisibleGoods(data);
                    setGoods(data);
                    console.log ('api', setGoods)
                })
        }
    }, [api])

    useEffect(() => {
        setFavorites(goods.filter(el => {
            return el.likes && el.likes.includes(user._id);
        }))
    }, [goods])

    useEffect(() => {
        localStorage.setItem("basket8", JSON.stringify(basket));
    }, [basket]);
    return (
        <Ctx.Provider value={{
            user: user,
            token: token,
            api: api,
            modalActive: modalActive,
            goods: goods,
            visibleGoods: visibleGoods,
            favorites: favorites,
            setUser: setUser,
            setToken: setToken,
            setApi: setApi,
            setModalActive: setModalActive,
            setGoods: setGoods,
            setVisibleGoods: setVisibleGoods,
            setFavorites: setFavorites,
            PATH: PATH,
            basket,
            setBasket
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
