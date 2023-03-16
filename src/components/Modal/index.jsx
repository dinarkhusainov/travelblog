import React, {useState, useContext} from "react";
import "./style.css";
import Ctx from "../../Ctx";
import {XCircle, XOctagon} from "react-bootstrap-icons";
import Signup from "./Signup";
import Login from "./Login";

export default () => {
    const [auth, setAuth] = useState(true);
    const {modalActive, setModalActive} = useContext(Ctx);
    // isActive => modalActive
    // setState => setModalActive
    let style = {
        display: modalActive && "flex",
        // display: isActive ? "flex": "none"
    }
    return <div className="modal-container" style={style}>
        <div className="modal">
            <XCircle className="modal-close" onClick={() => setModalActive(false)}/>
            <h2>{auth ? "Войти" : "Зарегистрироваться"}</h2>
            {auth 
                ? 
                <Login change={setAuth} close={setModalActive}/> 
                : 
                <Signup change={setAuth} close={setModalActive}/>
            }
        </div>
    </div>
}