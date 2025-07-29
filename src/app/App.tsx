import {useEffect, useState} from 'react';
import AlertList from "../ducks/alerts/AlertList";
import Alert from "@mui/material/Alert";
import JobPostingsList from "../ducks/jobs/JobPostingsList";
import {loadJobs} from "../ducks/jobs";
import {useAppDispatch} from "./configureStore";
import Box from "@mui/material/Box";
import AlertTitle from "@mui/material/AlertTitle";
import styled from "@emotion/styled";


const JobOpeningsContainer = styled.div`
    #job-openings {
        font-family: Roboto, sans-serif;
        letter-spacing: 0.025em;
        line-height: 1.6;
        -webkit-font-smoothing: antialiased;
        -webkit-text-size-adjust: 100%;
        text-rendering: optimizeSpeed;

    }

    #job-openings h2 {
        font-size: 2.5rem;
        margin-bottom: 2rem;

    }

    #job-openings .job-openings--list a {
        font-weight: 500;

    }

    #job-openings .job-openings--list small {
        font-weight: 100;
        display: inline-block;
        margin-left: 1rem;

    }

    #job-openings .job-opening--title {
        margin-left: -1rem;
        font-size: 2.5rem;

    }

    #job-openings .job-opening section {
        padding-left: 1rem;
        margin-bottom: 2rem;

    }

    #job-openings .job-opening section h3 {
        font-size: 1.5rem;
        margin-left: -1rem;
        letter-spacing: 0.05em;

    }

    #job-openings .job-opening section h4 {
        font-size: 1rem;
        text-transform: uppercase;
        letter-spacing: 0.2em;

    }

    #job-openings .job-opening--description h4 {
        margin-top: 1rem;

    }


`

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
        <JobOpeningsContainer>
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
        </JobOpeningsContainer>
    )
}
