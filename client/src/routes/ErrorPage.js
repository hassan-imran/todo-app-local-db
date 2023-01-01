import { Container } from 'react-bootstrap';

import React from 'react';

function ErrorPage() {


    return (
        <>
            <Container className='text-center'>
                <h1 className='display-1'>
                    404
                </h1>

                <h4 className='display-4'>
                    Page not found!
                </h4>
            </Container>
        </>
    )
}

export default ErrorPage;