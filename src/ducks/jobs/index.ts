import {RootState} from "../../app/configureStore";
import {createAsyncThunk, createReducer} from "@reduxjs/toolkit";
import {JobPosting} from "../../types";
import {fetchJobs, LoadJobsProps} from "./api";

export interface JobsState {
    list: JobPosting[];
    loading: boolean;
    loaded: boolean;
}

export const initialState: JobsState = {
    list: [],
    loading: false,
    loaded: false,
}


export const fetchJobsURL = (id?: number, preview?: boolean) => {
    return `https://intranet.chums.com/api/timeclock/job-postings/active/${encodeURIComponent(String(id || ''))}`
        + (preview ? '?preview=1' : '');
}

export const selectList = (state: RootState) => state.jobs.list;
export const selectLoading = (state: RootState) => state.jobs.loading;
export const selectLoaded = (state: RootState) => state.jobs.loaded;

export const loadJobs = createAsyncThunk<JobPosting[], LoadJobsProps | undefined>(
    'jobs/load',
    async (arg) => {
        return await fetchJobs(arg);
    },
    {
        condition: (arg, {getState}) => {
            const state = getState() as RootState;
            return !selectLoading(state);
        }
    }
)
const jobsReducer = createReducer(initialState, builder => {
    builder
        .addCase(loadJobs.pending, (state) => {
            state.loading = true;
        })
        .addCase(loadJobs.fulfilled, (state, action) => {
            state.loading = false;
            state.loaded = true;
            state.list = action.payload.sort((a, b) => a.id - b.id);
        })
        .addCase(loadJobs.rejected, (state) => {
            state.loading = false;
        });
});

export default jobsReducer;
