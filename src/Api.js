class Api {
    constructor(token) {
        this.path = "https://api.react-learning.ru";
        this.group = "group-8";
        this.token = token;
    }
    signUp(body) { // регистрация
        body.group = this.group;
        return fetch(`${this.path}/signup`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body)
        });
    }
    signIn(body) { // авторизация
        return fetch(`${this.path}/signin`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body)
        });
    }
   
    updUser(body, img = false) {
        return fetch(`${this.path}/v2/${this.group}/users/me${img ? "/avatar" : ""}`, {
            method: "PATCH",
            headers: {
                "authorization": `Bearer ${this.token}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body)
        })
    }

    getPosts() {
        return fetch(`${this.path}/posts`, {
            headers: {
                "authorization": `Bearer ${this.token}`
            }
        })
    }
    getPost(id) {
        return fetch(`${this.path}/posts/${id}`, {
            headers: {
                "authorization" : `Bearer ${this.token}`
            }
        })
    }
    deletePost(id) {
        return fetch(`${this.path}/posts/${id}`, {
            method: "delete",
            headers: {
                "authorization" : `Bearer ${this.token}`
            }
        })
    }
    addPost(body) {
        return fetch(`${this.path}/posts`, {
            method: "post",
            headers: {
                "Content-Type": "application/json",
                "authorization" : `Bearer ${this.token}`
            },
            body: JSON.stringify(body)
        })
    }
    updatePost(id, body) {
        return fetch(`${this.path}/posts/${id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "authorization" : `Bearer ${this.token}`
            },
            body: JSON.stringify(body)
        })
    }
    getComments() {
        return fetch(`${this.path}/posts/comments/`, {
            headers: {
                "authorization" : `Bearer ${this.token}`
            }
        })
    }
    getCommentsByPost(id) {
        return fetch(`${this.path}/posts/comments/${id}`, {
            headers: {
                "authorization" : `Bearer ${this.token}`
            }
        })
    }
    addComment(id, body) {
        return fetch(`${this.path}/posts/comments/${id}`, {
            method: "post",
            headers: {
                "Content-Type": "application/json",
                "authorization" : `Bearer ${this.token}`
            },
            body: JSON.stringify(body)
        })
    }
    deleteComment(id, comment) {
        return fetch(`${this.path}/posts/comments/${id}/${comment}`, {
            method: "delete",
            headers: {
                "authorization" : `Bearer ${this.token}`
            }
        })
    }
    setLikePost(id, like) {
        return fetch(`${this.path}/posts/likes/${id}`, {
            method: like ? "delete" : "put",
            headers: {
                "authorization" : `Bearer ${this.token}`
            }
        })
    }
}

export {Api};