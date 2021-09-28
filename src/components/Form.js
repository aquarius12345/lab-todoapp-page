import React, { Component } from "react";
import './Form.css';
import { RiDeleteBin5Fill } from 'react-icons/ri';
import { RiUserFill } from 'react-icons/ri';
import { AiFillLock } from 'react-icons/ai';
import { FaEdit } from 'react-icons/fa';
import { IconContext } from 'react-icons';
import { Link } from 'react-router-dom';
import apiUtils from "../utils/api.utils";


//const URL = "http://localhost:5000/todos";

class Form extends Component {

    state = {
        title: "",
        list: []
    }

    componentDidMount() {
        this.getAll();
    }
    
    getAll = async () => { 
        
        try {
            const newData = await apiUtils.getUserTodos();
            console.log('this is newdata', newData);
            this.setState({
                list: newData.todos
            })
        } catch(error) {
            console.log(error);
        }
    };


    handleChange = (e) => {
      const { value } = e.target;
      this.setState ({
          ...this.state, title: value
      })
    }

    handleAdd = async (event) => {
        event.preventDefault();
        //console.log('added', this.state.title)
        // const title = this.state.title;
        // const { title } = this.state;
        //console.log('this is title', title);

        // axios.post(URL, { title })
        // .then(result => {
        //     console.log("Succesfully created", result);
        //     this.getAll();
        // })
        try {
            const { title } = this.state;
            //console.log(title) //--> e uma String
            await apiUtils.addTodos({title}); // {}--> importante! tem que mandar dentro de {}, pq precisa ser json.
            this.getAll();
        } catch(error) {
            console.log(error)
        }   
    };

    handleDelete = async (id) => {
        //console.log('id', id)
        try {
            await apiUtils.deleteTodo(id);
            this.getAll();   
        } catch(error) {
            console.log(error);
        }        
    };

    handleCheckbox = async (id, completed) => {
        // const change = !completed;
        // console.log('this is', change)

        // axios.put(`${URL}/${id}`, { completed: change })
        // .then(result => {
        //     console.log('Succesfully changed Checkbox', result)
        //     this.getAll()
        // })
        try {
            await apiUtils.checkbox(id, completed);
            this.getAll();
        } catch(error) {
            console.log(error);
        }
    };


    render() {
        return(
            <div>
                <IconContext.Provider value={{ color: 'white' }}>
                    <nav>
                        <Link to='/sign'><AiFillLock/>SIGNUP</Link>
                        <Link to='/login'><RiUserFill/>LOGIN</Link>
                    </nav>

                    <div className="container">
                        <h1>Todo App</h1> 
                        <div className="form">
                            <form>
                              <input type="text" value={this.state.title} placeholder="Add new todo" onChange={this.handleChange}/>
                              <button onClick={this.handleAdd}>+</button>
                            </form>
                            
                            <ul>
                                {this.state.list.map((el) =>
                                    <li key={el._id}>
                                        <input className="check" type="checkbox" onChange={() => this.handleCheckbox(el._id, el.completed)}/>
                                        <p className={el.completed ? "checked": ''}>{el.title}</p>
                                        
                                        <div>
                                            <FaEdit size={22} color='green'/>
                                            <RiDeleteBin5Fill size={25} id="delete-icon" color='red' onClick={() => this.handleDelete(el._id)} />
                                        </div>
                                    </li>    
                                )}
                            </ul>

                        </div>
                    </div>
                </IconContext.Provider>
            </div>
        )
    }
}

export default Form;