import React from "react";
import {useSelector} from "react-redux";
import {selectList, selectLoaded, selectLoading} from "./index";
import Alert from "@mui/material/Alert";
import JobPostingRender from "../../components/JobPostingRender";
import JobPostingLink from "../../components/JobPostingLink";
import {JobPosting} from "../../types";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import LinearProgress from "@mui/material/LinearProgress";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import AlertTitle from "@mui/material/AlertTitle";


const isLivePosting = ({enabled, datePosted, validThrough}: JobPosting): boolean => {
    const now = new Date();
    return enabled && !!datePosted && (!validThrough || new Date(validThrough) > now);
}

interface JobPostingsListProps {
    preview?: boolean
}

export default function JobPostingsList({preview = false}:JobPostingsListProps) {
    const loading = useSelector(selectLoading);
    const loaded = useSelector(selectLoaded);
    const list = useSelector(selectList);

    return (
        <Box>
            {loading && (
                <div aria-busy="true">
                    <Typography variant="h1" component="h1">Loading current career openings</Typography>
                    <LinearProgress variant="indeterminate" />
                </div>
            )}
            {loaded && !loading && list.length === 0 && (
                <Box aria-live="polite" sx={{py:3}}>
                    <Card variant="elevation">
                        <CardContent>
                            <Typography variant="h4" component="h2" sx={{mb: '3rem'}}>
                                Current Career Openings
                            </Typography>
                            <Typography variant="body2">
                                There are currently no positions listed at the moment. Please check back frequently and feel
                                free to email your up-to-date resume and cover letter to:{' '}
                                <a href="mailto:jobs@chums.com">jobs@chums.com</a>.
                            </Typography>
                        </CardContent>
                    </Card>
                </Box>
            )}
            {loaded && (
                <div aria-live="polite">
                    {!!list.length && <Typography variant="h2" component="h1">Current Career Openings</Typography>}
                    {!!list.length && (
                        <ul className="job-openings--list">
                            {list.map(posting => (
                                <JobPostingLink key={posting.id} {...posting} />
                            ))}
                        </ul>
                    )}
                    <Divider sx={{my: 3}} />
                    {list.map(posting => (
                        <div key={posting.id}>
                            {preview && isLivePosting(posting) && (
                                <Alert severity="info">
                                    <AlertTitle>Heads Up!</AlertTitle>
                                    This posting is live.
                                </Alert>
                            )}
                            {preview && !isLivePosting(posting) && (
                                <Alert severity="warning">
                                    <AlertTitle>Heads Up!</AlertTitle>
                                    This posting is NOT live.
                                </Alert>
                            )}
                            <JobPostingRender key={posting.id} posting={posting}/>
                        </div>
                    ))}
                </div>
            )}
            <Card variant="outlined">
                <CardContent>
                    <Typography variant="h4" component="h2" sx={{my: 3}}>Our commitment to Veterans and Military Spouses</Typography>
                    <Typography variant="body2">
                        At Chums we pledge our commitment to actively hire veterans of the U.S. Armed Forces and Military
                        Spouses.
                        We value and recognize the leadership, training, character and discipline that our veterans and
                        members of the National Guard and Reserve bring to our company and the American workforce.
                    </Typography>
                </CardContent>
            </Card>
        </Box>
    )
}
