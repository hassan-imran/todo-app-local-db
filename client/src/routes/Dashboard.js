import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Table, Card, Container, Row } from 'react-bootstrap';
import { updateAuth } from "../store/auth";
import axios from 'axios';


function Dashboard() {
    const auth = useSelector((state) => state.auth.value);
    const dispatch = useDispatch();
    const [task, setTask] = useState('');


    const deleteTaskHandler = (task) => {
        axios.post('http://localhost:8000/api/action/deleteTask', {
            userName: auth.userName,
            task,
        }).then((res) => {
            dispatch(updateAuth(res.data));
        }).catch((error) => {
            console.log(error)
        })
    }

    const addTaskHandler = (task) => {
        axios.post('http://localhost:8000/api/action/newTask', {
            userName: auth.userName,
            task,
        }).then((res) => {
            dispatch(updateAuth(res.data));
            setTask("");
        }).catch((error) => {
            console.log(error)
        })
    }

    return (
        <>
            <Container>
                <Row className="mb-4">
                    <h4 className='display-6 mt-5'>Welcome <span className="fw-bold">{auth.firstName} {auth.lastName}</span>!</h4>
                </Row>

                <Card className='p-4 shadow bg-body rounded'>
                    <h5 className='display-5 mb-3'>Todo list</h5>


                    <input type='text' value={task} onChange={e => setTask(e.target.value)} />

                    <Button variant="primary" className="mt-3 mb-3" onClick={() => addTaskHandler(task)}>
                        Add a New Task
                    </Button>



                    <Table striped bordered hover>
                        <thead>
                            <tr className="text-center">
                                <th>Task</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody className="text-center">
                            {
                                // A map function to return the rows of the table
                                auth.todo.map((task, key) => (
                                    <tr key={key}>
                                        <td>
                                            {task}
                                        </td>
                                        <td>
                                            <Button variant="danger" id={key} onClick={
                                                () => deleteTaskHandler(task)
                                            }>
                                                Delete Task
                                            </Button>
                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </Table>
                </Card>

            </Container>
        </>
    )
}

export default Dashboard;