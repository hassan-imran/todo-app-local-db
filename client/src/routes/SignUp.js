import { Card, Container, InputGroup, Row } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import React, { useState } from 'react';
import ErrorFlag from '.././ErrorFlag';
import { useDispatch } from 'react-redux';
import { updateError } from '../store/error';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

function SignUpForm() {

    const [userName, setUserName] = useState('');
    const [pass, setPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');

    const dispatch = useDispatch();

    const navigate = useNavigate();


    const handleSubmit = (e) => {
        //Prevent the browser from implementing the default behavior of the event
        e.preventDefault();

        //Do not submit if either of the input fields are empty
        if (!userName || !pass || !firstName || !lastName) {
            dispatch(updateError({
                msg: 'One (or more) of the required fields (marked by *) are empty',
                color: 'danger',
            }));
            return;
        };


        axios.post('http://localhost:8000/api/action/newUser', {
            userName,
            firstName,
            lastName,
            pass,
        }).then((res) => {
            navigate('/login');
            dispatch(updateError({
                msg: 'Successfully added user, please login.',
                color: 'success',
            }));
            //Reset the input fields
            setUserName('');
            setPassword('');
            setFirstName('');
            setLastName('');
        }).catch((error) => {
            console.log(error);
            dispatch(updateError({
                msg: 'Username already exists',
                color: 'danger',
            }))
        })



        return;
    }

    return (
        <Form className='d-grid'>

            <InputGroup className="mb-3">
                <InputGroup.Text id="inputGroup-sizing-default">First Name *</InputGroup.Text>
                <Form.Control aria-label="Default" aria-describedby="inputGroup-sizing-default" onChange={e => setFirstName(e.target.value)} />
            </InputGroup>

            <InputGroup className="mb-3">
                <InputGroup.Text id="inputGroup-sizing-default">Last Name *</InputGroup.Text>
                <Form.Control aria-label="Default" aria-describedby="inputGroup-sizing-default" onChange={e => setLastName(e.target.value)} />
            </InputGroup>

            <InputGroup className="mb-3">
                <InputGroup.Text id="inputGroup-sizing-default">UserName *</InputGroup.Text>
                <Form.Control aria-label="Default" aria-describedby="inputGroup-sizing-default" onChange={e => setUserName(e.target.value)} />
            </InputGroup>

            <InputGroup className="mb-3">
                <InputGroup.Text id="inputGroup-sizing-default">Password *</InputGroup.Text>
                <Form.Control aria-label="Default" aria-describedby="inputGroup-sizing-default" type='password' onChange={e => setPassword(e.target.value)} />
            </InputGroup>

            <ErrorFlag />

            <Button variant="primary" onClick={handleSubmit} >
                Let's Go!
            </Button>

        </Form>
    )
}

function SignUp() {


    return (
        <>

            <Container>
                <Row>
                    <h2 className='display-3 mt-5'>Become a Member of the User Portal community in no time!</h2>
                </Row>
            </Container>

            <Form>

                <Container className='mt-5 mb-5'>
                    <Row xs={2}>

                        <Card className='p-4 shadow bg-body rounded'>
                            <SignUpForm isModal={false} />
                            <hr />

                            <p className='text-center'>Already an existing User Portal member?</p>

                            <Link to={"/login"} className="d-grid text-decoration-none">
                                <Button variant="secondary">
                                    Log in to your account
                                </Button>
                            </Link>
                        </Card>
                    </Row>
                </Container>

            </Form>

        </>
    )
}

export default SignUp;
export { SignUpForm };