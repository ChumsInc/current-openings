import React from "react";
import {useSelector} from "react-redux";
import {JobPosting, selectList, selectLoaded, selectLoading} from "./index";
import {Alert} from "chums-ducks";
import JobPostingRender from "../../components/JobPostingRender";
import JobPostingLink from "../../components/JobPostingLink";

const isLivePosting = ({enabled, datePosted, validThrough}:JobPosting):boolean => {
    const now = new Date();
    return enabled && !!datePosted && (!validThrough || new Date(validThrough) > now);
}

interface JobPostingsListProps {
    preview?: boolean
}
const JobPostingsList: React.FC<JobPostingsListProps> = ({preview = false}) => {
    const loading = useSelector(selectLoading);
    const loaded = useSelector(selectLoaded);
    const list = useSelector(selectList);

    return (
        <div className="job-openings">
            {loading && (
                <div aria-busy="true">
                    <h2>Loading current career openings</h2>
                    <div className="progress mb-5">
                        <div className="progress-bar bg-primary progress-bar-striped progress-bar-animated"
                             style={{width: '100%'}} />
                    </div>
                </div>
            )}
            {loaded && !loading && list.length === 0 && (
                <div aria-live="polite">
                <Alert color="secondary">
                <h2 className="alert-heading">Current Career Openings</h2>
                <p>
                There are currently no positions listed at the moment. Please check back frequently and feel
                free to email your up-to-date resume and cover letter to:{' '}
                <a href="mailto:jobs@chums.com">jobs@chums.com</a>.
                </p>
                </Alert>
                </div>
                )}
            {loaded && (
                <div aria-live="polite">
                    {!!list.length && <h2>Current Career Openings</h2>}
                    {!!list.length && (
                        <ul className="job-openings--list">
                            {list.map(posting => (
                                <JobPostingLink key={posting.id} {...posting} />
                            ))}
                        </ul>
                    )}
                    {list.map(posting => (
                        <div key={posting.id}>
                            {preview && isLivePosting(posting) && (
                                <Alert color="info" title="Heads up!">This posting is live.</Alert>
                            )}
                            {preview && !isLivePosting(posting) && (
                                <Alert color="danger" title="Heads up!">This posting is NOT live.</Alert>
                            )}
                            <JobPostingRender key={posting.id} posting={posting}/>
                        </div>
                    ))}
                </div>
            )}
            <Alert color="light" className="mt-3">
                <h3>Our commitment to Veterans and Military Spouses</h3>
                At Chums we pledge our commitment to actively hire veterans of the U.S. Armed Forces and Military
                Spouses.
                We value and recognize the leadership, training, character and discipline that our veterans and
                members of the National Guard and Reserve bring to our company and the American workforce.
            </Alert>

        </div>
    )
}

export default JobPostingsList;
