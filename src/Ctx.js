import React from "react";

export default React.createContext({
    user: {},
    token: "",
    api: {},
    message: {},
    users: [],
    basket: [],
    favorites: [],
    modalActive: false,
    posts: [],
    visiblePosts: [],
    setModalActive: () => {},
    setPosts: () => {},
    setVisiblePosts: () => {},
    setFavorites: () => {},
    setMessage: () => {},
    setBasket: () => {},
    setUsers: () => {},
    setUser: () => {},
    setToken: () => {},
    setApi: () => {},
});