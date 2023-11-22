import {JobPosting} from "../../types";

export const fetchJobsURL = (id?: number, preview?: boolean) => {
    return `https://intranet.chums.com/api/timeclock/job-postings/active/${encodeURIComponent(String(id || ''))}`
        + (preview ? '?preview=1' : '');
}

export interface LoadJobsProps {
    id?: number|string|null;
    preview?: boolean;
}
export async function fetchJobs(arg:LoadJobsProps|undefined):Promise<JobPosting[]> {
    try {
        const params = new URLSearchParams();
        if (arg?.preview) {
            params.set('preview', '1');
        }
        const url = `https://intranet.chums.com/api/timeclock/job-postings/active/:id`
                .replace(':id', arg?.id ? encodeURIComponent(arg.id) : '')
                + `?${params.toString()}`;
        const res = await fetch(url);
        if (!res.ok) {
            return Promise.reject(new Error(`Status: ${res.status}; ${res.statusText}`));
        }
        const json = await res.json();
        if (json?.error) {
            return Promise.reject(new Error(json.error));
        }
        return json?.postings ?? [];
    } catch(err:unknown) {
        if (err instanceof Error) {
            console.debug("fetchJobs()", err.message);
            return Promise.reject(err);
        }
        console.debug("fetchJobs()", err);
        return Promise.reject(new Error('Error in fetchJobs()'));
    }
}
