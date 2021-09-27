import { react } from '@babel/types';
import axios from 'axios';
import { divide } from 'lodash';
import React from 'react';
import ReactDOM from 'react-dom';
import { Table, Button, Modal, ModalHeader, ModalBody, ModalFooter, FormGroup, Label, Input } from 'reactstrap';

class Home extends React.Component {

    constructor() {
        super()
        this.state = {
            tasks: [],
            newTaskModal:false,
            editTaskModal: false,
            newTaskData: {
                name: "",
                description: ""
            },
            editTaskData: {
                id:"",
                name: "",
                description: ""
            },
        }
    }

    loadTasks() {
        axios.get('/api/tasks').then((response) => {
            this.setState({
                tasks: response.data
            })
        })
    }

    componentWillMount() {
        this.loadTasks()
    }

    toggleNewTaskModal() {
        this.setState({
            newTaskModal: !this.state.newTaskModal
        })
    }

    toggleEditTaskModal() {
        this.setState({
            editTaskModal: !this.state.editTaskModal
        })
    }

    addTasks() {
        axios.post('/api/tasks', this.state.newTaskData).then((response) => {
            let {tasks} = this.state;
            this.loadTasks();

            this.setState({tasks, newTaskModal: false, newTaskData: {
                name: "",
                description: ""
            }});
        });
    }

    editTask(id, name, description) {
        this.setState({
            editTaskData: {id, name, description},
            editTaskModal: !this.state.editTaskModal
        })
    }

    updateTask() {
        let { id, name, description } = this.state.editTaskData
        // console.log(this.state.editTaskData)
        axios.put("/api/tasks/" + id, {
            name,
            description
        }).then((response) => {
            this.loadTasks();

            this.setState({ editTaskModal: false, editTaskData:{
                name:"",
                description:""    
            }
            })
        })
    }

    deleteTask(id) {
        axios.delete('/api/tasks/'+id).then((response) => {
            this.loadTasks()
        })
    }

    render() {
        let tasks = this.state.tasks.map((task) => {
            return(
                <tr key={task.id}>
                    <td>{task.id}</td>
                    <td>{task.name}</td>
                    <td>{task.description}</td>
                    <td>
                        <Button color="success" size="sm" className="mr-2"
                            onClick={this.editTask.bind(this, task.id, task.name, task.description)}
                        >Edit</Button>
                        <Button color="danger" size="sm" className="mr-2"
                            onClick={this.deleteTask.bind(this, task.id)}
                        >Delete</Button>
                    </td>
                </tr>
            )
        })
        return(
            <div className="App container">
                <Button color="danger" onClick={this.toggleNewTaskModal.bind(this)}>Add Task</Button>
                <Modal isOpen={this.state.newTaskModal} toggle={this.toggleNewTaskModal.bind(this)}>
                    <ModalHeader toggle={this.toggleNewTaskModal.bind(this)}>Add a New Task</ModalHeader>
                    <ModalBody>
                        <FormGroup>
                            <Label for="name">Name</Label>
                            <Input id="name"
                                    value={this.state.newTaskData.name}
                                    onChange={(e) => {
                                        let {newTaskData} = this.state
                                        newTaskData.name = e.target.value
                                        this.setState({ newTaskData })
                                    }}
                            ></Input>
                        </FormGroup>
                        <FormGroup>
                            <Label for="description">Description</Label>
                            <Input id="description"
                                    value={this.state.newTaskData.description}
                                    onChange={(e) => {
                                        let {newTaskData} = this.state
                                        newTaskData.description = e.target.value
                                        this.setState({ newTaskData })
                                    }}
                            ></Input>
                        </FormGroup>
                    </ModalBody>
                    <ModalFooter>
                    <Button color="primary" onClick={this.addTasks.bind(this)}>Add Task</Button>{' '}
                    <Button color="secondary" onClick={this.toggleNewTaskModal.bind(this)}>Cancel</Button>
                    </ModalFooter>
                </Modal>

                <Modal isOpen={this.state.editTaskModal} toggle={this.toggleEditTaskModal.bind(this)}>
                    <ModalHeader toggle={this.toggleEditTaskModal.bind(this)}>Edit Task</ModalHeader>
                    <ModalBody>
                        <FormGroup>
                            <Label for="name">Name</Label>
                            <Input id="name"
                                    value={this.state.editTaskData.name}
                                    onChange={(e) => {
                                        let {editTaskData} = this.state
                                        editTaskData.name = e.target.value
                                        this.setState({ editTaskData })
                                    }}
                            ></Input>
                        </FormGroup>
                        <FormGroup>
                            <Label for="description">Description</Label>
                            <Input id="description"
                                    value={this.state.editTaskData.description}
                                    onChange={(e) => {
                                        let {editTaskData} = this.state
                                        editTaskData.description = e.target.value
                                        this.setState({ editTaskData })
                                    }}
                            ></Input>
                        </FormGroup>
                    </ModalBody>
                    <ModalFooter>
                    <Button color="primary" onClick={this.updateTask.bind(this)}>Save</Button>{' '}
                    <Button color="secondary" onClick={this.toggleEditTaskModal.bind(this)}>Cancel</Button>
                    </ModalFooter>
                </Modal>
                <Table>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Description</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tasks}
                    </tbody>
                </Table>
            </div>
        )
    }
}

export default Home;

if(document.getElementById('home')) {
    ReactDOM.render(<Home/>, document.getElementById('home'));
}