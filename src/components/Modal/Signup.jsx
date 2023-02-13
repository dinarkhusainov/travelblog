import React, {useState, useContext} from "react";
import Ctx from "../../Ctx";

export default ({change, close}) => {
    const [inp1, setInp1] = useState("");
    const [inp2, setInp2] = useState("");
    const [inp3, setInp3] = useState("");
    const [testPwd, setTestPwd] = useState(true);
    const {api, setToken, setUser} = useContext(Ctx);

    const checkPwd = (val, type = "main") => {
        type === "main" ? setInp2(val) : setInp3(val);
        if (val) {
            if (type === "main") {
                setTestPwd(val !== inp3);
            } else {
                setTestPwd(val !== inp2);
            }
        }
    }

    const sendForm = (e) => {
        e.preventDefault();
        const body = {
            email: inp1,
            password: inp2
        }
        console.log(body);
        api.signUp(body)
            .then(res => res.json())
            .then(data => {
                if (!data.err) {
                    api.signIn(body)
                        .then(res => res.json())
                        .then(data => {
                            localStorage.setItem("user8", JSON.stringify(data.data));
                            localStorage.setItem("token8", data.token);
                            setToken(data.token);
                            setUser(data.data);
                        })
                    setInp1("");
                    setInp2("");
                    setInp3("");
                    close(false);
                } else {
                    alert(data.message);
                    // Отобразить уведомление с ошибкой
                }
            })
    }

    return <form onSubmit={sendForm}>
        <input 
            type="email" 
            placeholder="Введите вашу почту" 
            value={inp1} 
            required
            onChange={(e) => {setInp1(e.target.value)}}
        />
        <input 
            type="password" 
            placeholder="Пароль" 
            value={inp2} 
            onChange={(e) => {checkPwd(e.target.value)}}
        />
        <input 
            type="password" 
            placeholder="Повторить пароль" 
            value={inp3} 
            onChange={(e) => {checkPwd(e.target.value, "check")}}
        />
        <button className="btn" type="submit" disabled={testPwd}>Зарегистрироваться</button>
        <button className="btn link" type="button" onClick={() => {change(prev => !prev)}}>Войти</button>
    </form>
}

