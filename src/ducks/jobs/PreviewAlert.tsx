import AlertTitle from "@mui/material/AlertTitle";
import Alert from "@mui/material/Alert";

export default function PreviewAlert({isLive}: { isLive: boolean }) {
    return (
        <Alert severity={isLive ? "info" : 'warning'} sx={{mb: 3}}>
            <AlertTitle>Heads Up!</AlertTitle>
            This posting is {!isLive && ('NOT')} live.
        </Alert>
    )
}
