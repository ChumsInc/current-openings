import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import {visuallyHidden} from '@mui/utils';

interface JobDateProps {
    date: string|Date|null,
    schemaTag: 'datePosted'|'validThrough'|'jobStartDate',
}

export default function JobDate({date, schemaTag}:JobDateProps) {
    if (!date || !new Date(date).getTime()) {
        return (
            <Alert severity="warning" title="Warning:">Invalid date for field '{schemaTag}'</Alert>
        )
    }
    return (
        <>
            <Box sx={visuallyHidden} property="datePosted" className="visually-hidden">{new Date(date).toISOString()}</Box>
            <Box>{new Date(date).toLocaleDateString()}</Box>
        </>
    )
}
