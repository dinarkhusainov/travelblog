import React, {useContext, useState} from "react";
import { useNavigate } from "react-router";
import {Row, Col, Form, Button} from "react-bootstrap";
import Ctx from "../Ctx";

function AddForm () {
    
    const [title, setTitle] = useState("");
    const [text, setText] = useState("");
    const [image, setImage] = useState("");
    const [tags, setTags] = useState(["travelblog23"]);
    

    const {api, PATH, setGoods} = useContext(Ctx);
    const navigate = useNavigate();
    const handler = (e) => {
        e.preventDefault();
        let body = {
            // price: price || 0,
            // wight: wight || "unknown",
            // stock: stock || 0,
            // discount: discount,
            title: title || "Название отсутствует",
            text: text || "Здесь скоро появится описание поста",
            tags:tags || ["travelblog23"],
            image: image || "https://www.chanchao.com.tw/images/default.jpg"
        }
        console.log(body);
        api.addPost(body)
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if (!data.error) {
                    setGoods(prev => [...prev, data]);
                    clear();
                    //navigate(`${PATH}catalog/${data._id}`);
                }
            })
        
    }
    const clear = (e) => {
        setTitle("");
        setText("");
        setImage("");
        setTags(["travelblog23"]);
    }
    return <>
        <h1>Создать пост</h1>
        <Form onSubmit={handler}>
            <Row>
                <Col xs={12} md={6}>
                    <Form.Group className="mb-3">
                        <Form.Label>Название поста</Form.Label>
                        <Form.Control
                            type="text"
                            value={title}
                            onChange={e => setTitle(e.target.value)}
                        />

                        <Form.Group className="mb-3">
                            {/* тут вопрос есть по тегу */}
                        <Form.Label>Добавить тег</Form.Label>
                        <Form.Control
                            value={tags}
                            onChange={e => setTags(e.target.value)}
                            />
                    </Form.Group>

                        <Form.Group className="mb-3">
                            <div className="form-preview mb-1" style={{
                                backgroundImage: image ?
                                    `url(${image})` :
                                    "url(https://www.chanchao.com.tw/images/default.jpg)"
                            }}/>
                            <Form.Label>Изображение поста</Form.Label>
                            <Form.Control
                                type="url"
                                value={image}
                                onChange={e => setImage(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Описание поста</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={4}
                                value={text}
                                onChange={e => setText(e.target.value)}
                                />
                        </Form.Group>
                        <Button variant={"warning"} type="submit">
                            Добавить
                        </Button>
                    
                    {/* <Form.Group className="mb-3">
                        <Form.Label>Цена</Form.Label>
                        <Form.Control
                        type="number"
                        value={price}
                        onChange={e => setPrice(e.target.value)}
                        step="10"
                        min={0}
                        />
                    </Form.Group> */}
                    {/* <Form.Group className="mb-3">
                        <Form.Label>Вес</Form.Label>
                        <Form.Control
                        type="text"
                        value={wight}
                        placeholder="100 г"
                        onChange={e => setWight(e.target.value)}
                        />
                        </Form.Group>
                        <Form.Group className="mb-3">
                        <Form.Label>Скидка</Form.Label>
                        <Form.Select
                        value={discount}
                        onChange={e => setDiscount(e.target.value)}
                        >
                        <option value={0}>Без скидки</option>
                        <option value={5}>5%</option>
                            <option value={10}>10%</option>
                            <option value={15}>15%</option>
                            <option value={20}>20%</option>
                            <option value={25}>25%</option>
                            </Form.Select>
                            </Form.Group>
                            <Form.Group className="mb-3">
                            <Form.Label>Количество</Form.Label>
                            <Form.Control
                            type="number"
                            value={stock}
                            onChange={e => setStock(e.target.value)}
                            min={0}
                            />
                        </Form.Group> */}
                        </Form.Group>
                                </Col>
                <Col xs={12} md={6}>
                </Col>
            </Row>
        </Form>
    </>
}

export default AddForm;
