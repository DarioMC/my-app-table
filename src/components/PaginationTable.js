import React, { useMemo } from 'react'
import { useTable, useGlobalFilter, useSortBy, usePagination} from 'react-table'
import MOCK_DATA from './MOCK_DATA.json'
import { COLUMNS } from './columns'
import './table.css'
import { GlobalFilter } from './GlobalFilter'


export const PaginationTable = () => {
    const columns = useMemo(() => COLUMNS, [])
    const data = useMemo(() => MOCK_DATA, [])

    const { getTableProps,
            getTableBodyProps,
            headerGroups,
            page,
            nextPage,
            previousPage,
            canNextPage,
            canPreviousPage,
            prepareRow,
            pageOptions,
            state,
            setGlobalFilter,
        } = useTable({
            columns,
            data,
        },
        useGlobalFilter, useSortBy, usePagination)

        const { globalFilter, pageIndex } = state

    return (
        <>
        <div><br></br></div>
        <GlobalFilter filter= {globalFilter} setFilter= {setGlobalFilter} />
        <div><br></br></div>
        <table {...getTableProps()}>
            <thead>
                {headerGroups.map((headerGroup) => (
                <tr {...headerGroup.getHeaderGroupProps}>
                    {headerGroup.headers.map((column) => (
                        <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                            {column.render('Header')}
                              <span>
                                  {column.isSorted ? (column.isSortedDesc ? ' ⬇️' : ' ⬆️') : ' ↕️'}
                              </span>
                            </th>
                    ))}
                </tr> 
                ))}
            </thead>
            <tbody {...getTableBodyProps()}>
                {page.map((row) => {
                        prepareRow(row)
                        return (
                            <tr {...row.getRowProps()}>
                                {row.cells.map((cell) => {
                                    return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                                })}
                            </tr>
                        )
                    })}
            </tbody>
        </table>
        <div><br></br></div>
        <div>
            <span>
                Page{' '}
                <strong>
                    {pageIndex + 1} of {pageOptions.length}
                </strong>{' '}
            </span>
            <button onClick={() => previousPage()} disabled={!canPreviousPage}>Previous</button>
            <button onClick={() => nextPage()} disabled={!canNextPage}>Next</button>
        </div>
        </>
    )
}

