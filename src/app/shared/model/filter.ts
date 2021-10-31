export class Filter {
    value: string ;
    name: { name: string; value: string }[] ;
}
export const filters: ({ name: string; value: string })[] = [
    {
        name: 'Last 5 minutes',
        value: '5m'

    },
    {
        name: 'Last 15 minutes',
        value: '15m'

    },
    {
        name: 'Last 30 minutes',
        value: '30m'

    },
    {
        name: 'Last 1 hour',
        value: '1h'

    },
    {
        name: ' Last 3 hours',
        value: '3h'

    }
];
