import React from "react";
import {JobPosting} from "../ducks/jobs";
import JobLocation from "./JobLocation";

const JobPostingLink:React.FC<JobPosting> = ({id, title, jobLocation, datePosted, validThrough}) => {
    const href = `#job-posting--${id}`;
    return (
        <li key={id}>
            <a href={href}>
                {title}
                <small>Posted: {new Date(datePosted).toLocaleDateString()}</small>
                {validThrough && <small>Valid Through: {new Date(validThrough).toLocaleDateString()}</small>}
            </a>
            <JobLocation location={jobLocation} hideAddress={true}/>
        </li>
    )
}

export default JobPostingLink;
