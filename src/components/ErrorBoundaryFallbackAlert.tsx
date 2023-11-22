import React from 'react';
import {FallbackProps} from "react-error-boundary";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";

export default function ErrorBoundaryFallbackAlert({error, resetErrorBoundary}: FallbackProps) {
    return (
        <Alert severity="error" onClose={resetErrorBoundary}>
            <AlertTitle>Something went wrong!</AlertTitle>
            {error.message}
        </Alert>
    )
}
