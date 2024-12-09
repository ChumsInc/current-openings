import React from "react";
import {JobPosting} from "../types";
import JobLocation from "./JobLocation";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";

export default function JobPostingLink({id, title, jobLocation, datePosted, validThrough}:JobPosting) {
    const href = `#job-posting--${id}`;
    return (
        <li key={id}>
            <Link href={href}>
                {title}
                <Typography variant="body2" component="span" sx={{mx: 3}}>Posted: {new Date(datePosted).toLocaleDateString()}</Typography>
                {validThrough && <Typography variant="body2" component="span" sx={{mx: 3}}>Valid Through: {new Date(validThrough).toLocaleDateString()}</Typography>}
            </Link>
            <JobLocation location={jobLocation} hideAddress={true}/>
        </li>
    )
}

