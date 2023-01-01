import React from 'react';
import Alert from 'react-bootstrap/Alert';
import { useSelector, useDispatch } from "react-redux";
import { updateError } from './store/error';

function Error() {

    const errorMsg = useSelector((state) => state.error.status.msg);
    const flagColor = useSelector((state) => state.error.status.color);
    const dispatch = useDispatch();

    if (errorMsg) {
        setTimeout(
            () => {
                dispatch(updateError({}))
            }, 10000
        );
        return (
            <Alert className='' variant={flagColor} onClose={() => dispatch(updateError({}))} dismissible>
                <p>{errorMsg}</p>
            </Alert>
        );
    }
    return "";
}

export default Error;