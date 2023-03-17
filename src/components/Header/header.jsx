import React, {useContext} from "react";
import {Link} from "react-router-dom";
import Search from "../Search/search";
import "./header.css";
import Ctx from "../../Ctx";
import {PlusCircleFill, DoorOpenFill, BookmarkHeartFill} from "react-bootstrap-icons";

function Header ()  {
    const {user, favorites,  setModalActive, PATH} = useContext(Ctx);

    const logIn = (e) => {
        e.preventDefault();
        setModalActive(prev => !prev);
    }
  
    return <header>
        <Link className="logo" to={PATH + "travelblog"}>TRAVEL BLOG</Link>
        <Search/>
        <nav className="menu">
           
            {user && <Link to={PATH + "favorites"} className="badge-link">
                {favorites.length>0 && <span>{favorites.length}</span>}
                <BookmarkHeartFill style={{fontSize: "20px"}}/>
            </Link>}
            {user && user.name && <Link to={PATH + "profile"}>{user.name}</Link>}
            { !user && <a href="" onClick={logIn} className="logo">Войти <DoorOpenFill/></a>}
        </nav>
    </header>
}
export default Header;