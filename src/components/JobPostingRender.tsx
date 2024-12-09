import React from "react";
import {EmploymentTypes, JobPosting} from "../types";
import {default as JobLocation, jobLocationLD} from "./JobLocation";
import JobDate from "./JobDate";
import EducationalRequirements from "./EducationalRequirements";
import {ErrorBoundary} from "react-error-boundary";
// import './job-openings.css'
import Alert from "@mui/material/Alert";
import ErrorBoundaryFallbackAlert from "./ErrorBoundaryFallbackAlert";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import AlertTitle from "@mui/material/AlertTitle";

interface JobPostingProps {
    posting: JobPosting
}

export default function JobPostingRender({posting}: JobPostingProps) {
    const {
        id,
        title,
        jobLocation,
        datePosted,
        employmentType,
        description,
        validThrough,
        educationalRequirements,
        experienceRequirements,
        experienceInPlaceOfEducation,
        emailRecipient,
        filename,
        applicationInstructions,
        timestamp
    } = posting;

    const ldJSON: any = {
        "@context": 'https://schema.org/',
        '@type': 'JobPosting',
        hiringOrganization: {
            "@type": 'Organization',
            name: 'Chums, Inc',
            sameAs: 'https://chums.com',
            logo: "https://intranet.chums.com/images/chums-logo-badge-400px.png",
        },
        title,
        specialCommitments: 'VeteranCommit, MilitarySpouseCommit',
        description,
        datePosted,
        validThrough,
        jobLocation: {
            '@type': 'Place',
            address: {
                '@type': 'PostalAddress',
                ...jobLocationLD(jobLocation),
            }
        },
        employmentType,
        educationalRequirements,
        experienceInPlaceOfEducation,
    }

    if (!!experienceRequirements) {
        ldJSON.experienceRequirements = {
            "@type": "OccupationalExperienceRequirements",
            monthsOfExperience: experienceRequirements,
        }
    }

    return (
        <ErrorBoundary FallbackComponent={ErrorBoundaryFallbackAlert}>
            <Paper elevation={3} sx={{p: 3, mb: 3}}>
                <script type="application/ld+json" dangerouslySetInnerHTML={{__html: JSON.stringify(ldJSON)}}/>
                <section className="job-opening" id={'job-posting--' + id}>
                    <Typography variant="h3" component="h2" className="job-opening--title">{title}</Typography>
                    <section>
                        <Typography variant="h4" component="h3">Location</Typography>
                        <JobLocation location={jobLocation}/>
                    </section>
                    <section>
                        <Typography variant="h4" component="h3">Date Posted</Typography>
                        <div>
                            <JobDate date={datePosted} schemaTag='datePosted'/>
                        </div>
                    </section>
                    <section>
                        <Typography variant="h4" component="h3">Employment Type</Typography>
                        <div>
                            {EmploymentTypes[employmentType]}
                        </div>
                    </section>
                    <section className="job-opening--description">
                        <Typography variant="h4" component="h3">Description</Typography>
                        <div dangerouslySetInnerHTML={{__html: description}}/>
                    </section>
                    <section>
                        <Typography variant="h4" component="h3">Education and Experience Requirements</Typography>
                        <ul>
                            <li>Education: <strong><EducationalRequirements
                                value={educationalRequirements || 'No Requirements'}/></strong></li>
                            {!!experienceRequirements && (
                                <li>Experience: <strong>{experienceRequirements} Months</strong></li>)}
                            {experienceInPlaceOfEducation && (
                                <li>Allow Experience in place of education:{' '}<strong>Yes</strong></li>)}
                        </ul>
                    </section>
                    <section>
                        <Typography variant="h4" component="h3">How to Apply</Typography>
                        {!filename && (
                            <Alert severity="warning">
                                <AlertTitle>Warning</AlertTitle>
                                The job description has not been uploaded.
                            </Alert>
                        )}
                        <ul>
                            {!!filename && (
                                <li>
                                    <Link href={`https://intranet.chums.com/pdf/jobs/${filename}`}
                                          target="_blank" rel="noopener">
                                        Download Job Description
                                    </Link>
                                </li>
                            )}
                            {!!applicationInstructions && (
                                <li>
                                    {applicationInstructions}
                                </li>
                            )}
                            <li>
                                <Link
                                    href={`mailto:${emailRecipient || 'jobs@chums.com'}?subject=${encodeURIComponent(title)}`}
                                    target="_blank" rel="noopener">
                                    Email your resume to {emailRecipient || 'jobs@chums.com'}
                                </Link>
                            </li>
                        </ul>
                    </section>
                    <small>Last Updated: {new Date(timestamp).toLocaleString()}</small>
                </section>
            </Paper>
        </ErrorBoundary>
    )
}
