import { format} from 'date-fns'

export const COLUMNS = [
    {
        Header: 'Host_name',
        accessor: 'host_name'
    },
    {
        Header: 'Domain_name',
        accessor: 'domain_name'
    },
    {
        Header: 'Rule_mitre_tactic',
        accessor: 'rule_mitre_tactic'
    },
    {
        Header: 'Rule_mitre_technique',
        accessor: 'rule_mitre_technique'
    },
    {
        Header: 'Timestamp',
        accessor: 'timestamp',
        CellDate: ({ value }) => { return format(new Date(value), 'dd/MM/yyyy')}  

    },
    {
        Header: 'Ip_address',
        accessor: 'ip_address'
    }
]