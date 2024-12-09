import React, {useEffect, useState} from 'react';
import AlertList from "../ducks/alerts/AlertList";
import Alert from "@mui/material/Alert";
import JobPostingsList from "../ducks/jobs/JobPostingsList";
import {loadJobs} from "../ducks/jobs";
import '../components/job-openings.css';
import {useAppDispatch} from "./configureStore";
import Box from "@mui/material/Box";
import AlertTitle from "@mui/material/AlertTitle";

export default function App() {
    const dispatch = useAppDispatch();
    const [preview, setPreview] = useState<boolean>(false);

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const id = params.get('id');
        const preview = params.get('preview') === '1';
        setPreview(preview);
        if (id) {
            dispatch(loadJobs({id, preview}));
        } else {
            dispatch(loadJobs());
        }
    }, [window.location.search])

    return (
        <Box sx={{letterSpacing: '0.025em', lineHeight: '1.6'}}>
            <AlertList/>
            {preview && (
                <Alert severity="info" >
                    <AlertTitle>Job Posting Preview</AlertTitle>
                    This is just a preview and could possibly have errors or is not a live posting.
                </Alert>
            )}
            <JobPostingsList preview={preview}/>
        </Box>
    )
}
