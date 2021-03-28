import { format} from 'date-fns'



export const COLUMNS = [
    {
        Header: 'Timestamp',
        accessor: 'timestamp',
        CellDate: ({ value }) => { return format(new Date(value), 'dd/MM/yyyy')}
    },
    {
        Header: 'ip_src_addr',
        accessor: 'ipSourceAddr'
    },
    {
        Header: 'Country',
        accessor: 'countryName'
    },
    {
        Header: 'Domain',
        accessor: 'domain'
    },
    {
        Header: 'ISP',
        accessor: 'isp'
    },
    {
        Header: 'Risk',
        accessor: 'abuseConfidence'
    },
]
