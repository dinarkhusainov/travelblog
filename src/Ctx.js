import React from "react";

export default React.createContext({
    user: {},
    token: "",
    api: {},
    setUser: () => {},
    setToken: () => {},
    setApi: () => {},
    modalActive: false,
    setModalActive: () => {},
    goods: [],
    setGoods: () => {},
    visibleGoods: [],
    setVisibleGoods: () => {},
    favorites: [],
    setFavorites: () => {},
    basket: [],
    setBasket: () => {}
});