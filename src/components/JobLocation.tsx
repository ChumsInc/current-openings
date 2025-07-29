interface JobLocationType {
    streetAddress: string,
    addressLocality: string,
    addressRegion: string,
    postalCode: string,
    addressCountry: string,
}

const Hurricane: JobLocationType = {
    streetAddress: '104 S. Main Street',
    addressLocality: 'Hurricane',
    addressRegion: 'UT',
    postalCode: '84737',
    addressCountry: 'US'
}

const SLC: JobLocationType = {
    streetAddress: '2424 South 2570 West',
    addressLocality: 'West Valley City',
    addressRegion: 'UT',
    postalCode: '84119',
    addressCountry: 'US'
}

const Ketchum: JobLocationType = {
    streetAddress: '210 East Sun Valley Road',
    addressLocality: 'Ketchum',
    addressRegion: 'ID',
    postalCode: '83340',
    addressCountry: 'US'
}

export const jobLocationLD = (name: string): JobLocationType => {
    switch (name) {
    case 'hurricane':
        return Hurricane;
    case 'ketchum':
        return Ketchum;
    case 'slc':
    default:
        return SLC;
    }
}

interface JobLocationProps {
    location: string,
    hideAddress?: boolean
}

export default function JobLocation({location, hideAddress = false}:JobLocationProps) {
    const {streetAddress, addressLocality, addressRegion, postalCode} = jobLocationLD(location);
    return (
        <>
            <div>
                <address>
                    {!hideAddress && <div>{streetAddress}</div>}
                    <div>
                        <span>{addressLocality}</span>,
                        {' '}
                        <span>{addressRegion}</span>
                        {' '}
                        <span>{postalCode}</span>
                    </div>
                </address>
            </div>
        </>
    )
}

