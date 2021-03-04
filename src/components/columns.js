import { format} from 'date-fns'

export const COLUMNS = [
    {
        Header: 'Id',
        Footer: 'Id',
        accessor: 'id'
    },
    {
        Header: 'First_name',
        Footer: 'First_name',
        accessor: 'first_name'
    },
    {
        Header: 'Last_name',
        Footer: 'Last_name',
        accessor: 'last_name'
    },
    {
        Header: 'Email',
        Footer: 'Email',
        accessor: 'email'
    },
    {
        Header: 'Date_of_birth',
        Footer: 'ate_of_birth',
        accessor: 'date_of_birth',
        CellDate: ({ value }) => { return format(new Date(value), 'dd/MM/yyyy')}  

    },
    {
        Header: 'Ip_address',
        Footer: 'Ip_address',
        accessor: 'ip_address'
    }
]