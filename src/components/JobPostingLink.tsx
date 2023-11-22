import React from "react";
import {JobPosting} from "../types";
import JobLocation from "./JobLocation";
import Link from "@mui/material/Link";

const JobPostingLink = ({id, title, jobLocation, datePosted, validThrough}:JobPosting) => {
    const href = `#job-posting--${id}`;
    return (
        <li key={id}>
            <Link href={href}>
                {title}
                <small>Posted: {new Date(datePosted).toLocaleDateString()}</small>
                {validThrough && <small>Valid Through: {new Date(validThrough).toLocaleDateString()}</small>}
            </Link>
            <JobLocation location={jobLocation} hideAddress={true}/>
        </li>
    )
}

export default JobPostingLink;
