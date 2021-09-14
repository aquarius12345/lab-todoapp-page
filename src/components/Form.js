import React, { Component } from "react";
import './Form.css';
import axios from 'axios';
import { RiDeleteBin5Fill } from 'react-icons/ri';
import { IconContext } from 'react-icons';


const URL = "http://localhost:5000/todos";

class Form extends Component {

    state = {
        title: "",
        list: []
    }

    componentDidMount() {
        this.getAll();
    }
    
    getAll = () => {
        axios.get(URL)
        .then(result => {
            //console.log('this is getAll result', result);
            this.setState ({
                list: result.data
            })
        });   
    };

    handleChange = (e) => {
      const { value } = e.target;
      this.setState ({
          ...this.state, title: value
      })
    }

    handleAdd = () => {
        //console.log('added', this.state.title)
        // const title = this.state.title;
        const { title } = this.state;
        console.log('this is title', title);

        axios.post(URL, { title })
        .then(result => {
            console.log("Succesfully created", result);
            this.getAll();
        })
    }

    handleDelete = (id) => {
        axios.delete(`${URL}/${id}`)
        .then(result => {
            console.log('Succesfully deleted', result)
            this.getAll()
        })        
    }

    handleCheckbox = (id, completed) => {
        const change = !completed;
        console.log('this is', change)

        axios.put(`${URL}/${id}`, { completed: change })
        .then(result => {
            console.log('Succesfully changed Checkbox', result)
            this.getAll()
        })
    }


    render() {
        return(
            <div>
                <IconContext.Provider value={{ color: 'white' }}>
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
                                        {/* <button id="btn" onClick={() => this.handleDelete(el._id)}>x</button> */}
                                        <RiDeleteBin5Fill size={20} id="btn" onClick={() => this.handleDelete(el._id)} />
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