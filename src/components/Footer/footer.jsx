import React from "react";
import "./footer.css";

export default () => {
    const year = new Date().getFullYear();
    return <footer>
        <span className="footer__copy">©{year}</span>&nbsp;
        <span className="footer__text">«Безделье — не отдых.» Ф. Купер </span>
    </footer>
}
