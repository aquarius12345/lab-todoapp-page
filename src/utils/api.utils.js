import axios from 'axios';


class Api {
    constructor() {
        this.api = axios.create({
            baseURL: 'http://localhost:5000'
        });

        this.api.interceptors.request.use(
            (config) => {
                const token = localStorage.getItem('token');
                if(token) {
                    config.headers = {
                        Authorization: `Bearer ${token}`
                    }
                }
                return config
            },
            (error) => console.log(error)
        )
    }

    login = async (payload) => {
        try {
            const { data } = await this.api.post('/auth/login', payload);
            //console.log('this is data', data)
            const { token } = data;
            localStorage.setItem('token', token)
        } catch(error) {
            throw new Error(error);
        }
    }

    signup = async (payload) => {
        try{
            await this.api.post('/auth/signup', payload)
        } catch(error) {
            throw new Error(error);
        }
    }

    getTodos = async() => {
        try {
            const { data } = await this.api.get('/todos')
            //console.log('this is getTodos data', data)
            return data;
        } catch(error) {
            throw new Error(error);
        }
    }

    getUserTodos = async() => {
        try {
            const { data } = await this.api.get('/todos-by-user')
            console.log('user data', data)
            return data;
        } catch(error) {
            throw new Error(error);
        }
    };

    editTodos = async(id) => {
        try {
            await this.api.put(`/todos/${id}`)
        } catch(error) {
            throw new Error(error);
        }
    };

    addTodos = async(title) => {
        try {
            await this.api.post('/todos', title);
        } catch(error) {
            throw new Error(error);
        }
    };

    deleteTodo = async(id) => {
        try {
            await this.api.delete(`/todos/${id}`)
        } catch(error) {
            throw new Error(error);
        }
    };

    checkbox = async(id, completed) => {
        const change = !completed;
        try {
            await this.api.put(`todos/${id}`, { completed: change })
        } catch(error) {
            throw new Error(error);
        }
    }

}

export default new Api();