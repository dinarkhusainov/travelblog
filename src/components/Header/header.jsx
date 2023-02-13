import React, {useContext} from "react";
import {Link} from "react-router-dom";
import Search from "../Search/search";
import "./header.css";
import Ctx from "../../Ctx";
import {PlusCircle, HeartFill, DoorOpenFill} from "react-bootstrap-icons";

function Header ()  {
    const {user,  setModalActive, PATH} = useContext(Ctx);

    const logIn = (e) => {
        e.preventDefault();
        setModalActive(prev => !prev);
    }
  
    return <header>
        <Link className="logo" to={PATH}>TRAVEL BLOG</Link>
        <Search/>
        <nav className="menu">
            {user && <Link to={PATH + "add"}><PlusCircle style={{fontSize: "20px"}}/></Link>}
            {user && <Link to={PATH + "favorites"} className="badge-link">
                <HeartFill style={{fontSize: "20px"}}/>
            </Link>}
            {user && user.name && <Link to={PATH + "profile"}>{user.name}</Link>}
            { !user && <a href="" onClick={logIn} className="logo">Войти <DoorOpenFill/></a>}
        </nav>
    </header>
}
export default Header;