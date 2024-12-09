import React from 'react';
import {useAppDispatch} from "../../app/configureStore";
import {useSelector} from "react-redux";
import {dismissAlert, selectAlerts} from "./index";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";

export default function AlertList() {
    const dispatch = useAppDispatch();
    const list = useSelector(selectAlerts);

    if (!list.length) {
        return null;
    }

    return (
        <div>
            {list.map(alert => (
                <Alert key={alert.id} severity={alert.severity ?? 'warning'}
                       onClose={() => dispatch(dismissAlert(alert.id))}>
                    {!!alert.context && <AlertTitle>{alert.context}</AlertTitle>}
                    {alert.message}
                </Alert>
            ))}
        </div>
    )
}

