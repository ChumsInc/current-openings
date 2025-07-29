import type {AlertColor} from '@mui/material/Alert'

export declare type ValidEmploymentType =
    'FULL_TIME'
    | 'PART_TIME'
    | 'CONTRACTOR'
    | 'TEMPORARY'
    | 'INTERN'
    | 'VOLUNTEER'
    | 'PER_DIEM'
    | 'OTHER';

export type EmploymentTypeMap = { [employmentType in ValidEmploymentType]: string }

export const EmploymentTypes: EmploymentTypeMap = {
    FULL_TIME: 'Full Time',
    PART_TIME: 'Part Time',
    CONTRACTOR: 'Contractor',
    TEMPORARY: 'Temporary',
    INTERN: 'Intern',
    VOLUNTEER: 'Volunteer',
    PER_DIEM: 'Per Diem',
    OTHER: 'Other',
}

export interface BaseSalary {
    value?: number,
    minValue?: number,
    maxValue?: number,
    unitText: string,
}

export interface JobPosting {
    id: number,
    title: string,
    enabled: boolean,
    description: string,
    datePosted: string,
    jobLocation: string,
    validThrough: string | null,
    baseSalary?: BaseSalary | null,
    employmentType: ValidEmploymentType,
    educationalRequirements: string,
    experienceRequirements: number
    experienceInPlaceOfEducation: boolean,
    emailRecipient?: string,
    applicationInstructions?: string,
    filename: string,
    timestamp: string,
    changed?: boolean,
}

export interface ErrorAlert {
    id: number;
    context: string;
    message: string;
    count: number;
    severity?: AlertColor;
}
