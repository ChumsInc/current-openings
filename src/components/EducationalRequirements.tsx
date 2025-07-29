const description = (value:string) => {
    switch (value) {
    case 'no requirements': return 'No Requirements';
    case 'high school': return 'High School Diploma or GED';
    case 'associates degree': return 'Associates Degree';
    case 'bachelor degree': return 'Bachelor Degree';
    case 'professional certificate':  return 'Professional Certificate';
    case 'postgraduate degree': return 'Postgraduate Degree';
    default:
        return value;
    }
}

export default function EducationalRequirements({value}:{ value: string }) {
    return (
        <span>{description(value)}</span>
    )
}
