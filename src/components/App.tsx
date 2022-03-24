import React, {useEffect} from 'react';
import AlertList from "chums-ducks/dist/ducks/alerts/AlertList";
import Alert from "chums-ducks/dist/ducks/alerts/Alert";
import JobPostingsList from "../ducks/jobs/JobPostingsList";
import {useDispatch} from "react-redux";
import {loadJobPostings} from "../ducks/jobs";
import './job-openings.css';
import {parse as parseQuery} from "query-string";

const App: React.FC = () => {
    const dispatch = useDispatch();
    const query = parseQuery(location.search);

    const id = Number(query.id);
    const preview = !!query.preview;

    useEffect(() => {
        if (id) {
            dispatch(loadJobPostings(id, preview));
        } else {
            dispatch(loadJobPostings());
        }
    }, [])

    return (
        <div>
            <AlertList/>
            {preview && (
                <Alert color="warning" title='Job Posting Preview'>
                    This is just a preview and could possibly have errors or is not a live posting.
                </Alert>
            )}
            <JobPostingsList preview={preview}/>
        </div>
    )
}

export default App;
