import React, {useContext, useState} from "react";
import { useNavigate } from "react-router";
import {Row, Col, Form, Button} from "react-bootstrap";
import Ctx from "../Ctx";

function AddPost () {
    
    const [title, setTitle] = useState("");
    const [text, setText] = useState("");
    const [image, setImage] = useState("");
    const [tags, setTags] = useState("");
    

    const {api, PATH, setPosts} = useContext(Ctx);
    const navigate = useNavigate();
    const handler = (e) => {
        e.preventDefault();
        let body = {
            title: title || "Название отсутствует",
            text: text || "Здесь скоро появится описание поста",
            tags: [tags, "travelblog23"] || ["travelblog23"],
            image: image || "https://www.chanchao.com.tw/images/default.jpg"
        }
        console.log(body);
        api.addPost(body)
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if (!data.error) {
                    setPosts(prev => [...prev, data]);
                    clear();
                    navigate(`${PATH}posts/${data._id}`);
                }
            })
        
    }
    const clear = (e) => {
        setTitle("");
        setText("");
        setImage("");
        setTags("");
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
                        <Form.Label>Добавьте теги через запятую</Form.Label>
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
                    </Form.Group>
                </Col>
                <Col xs={12} md={6}></Col>
            </Row>
        </Form>
    </>
}

export default AddPost;
