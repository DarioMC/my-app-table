import React, { useState, useMemo , useEffect  } from 'react'
import { useTable, useGlobalFilter, useSortBy, usePagination} from 'react-table'
import 'bootstrap/dist/css/bootstrap.min.css'; 
import axios from 'axios';
//import MOCK_DATA from './MOCK_DATA.json'
import MOCK_DATA from './jsondata.json'
import { COLUMNS } from './columns'
import './table.css'
import { GlobalFilter } from './GlobalFilter'


export const MainTable = () => {

    const urlApi = "https://localhost:44331/api/parser";
    const [data, setData]=useState([]);


    const requestGet=async()=>{
        await axios.get(urlApi)
        .then(response=>{
          setData(response.data);
        }).catch(error=>{
          console.log(error);
        })
      }

    useEffect(() => {
        requestGet();
      }, [])

    
    const columns = useMemo(() => COLUMNS, [])
    //const data = useMemo(() => MOCK_DATA, [])

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
            gotoPage,
            pageCount,
            setPageSize,
            state,
            setGlobalFilter,
        } = useTable({
            columns,
            data,
        },
        useGlobalFilter, useSortBy, usePagination)

        const { globalFilter, pageIndex, pageSize } = state

    
        var result = data.reduce( (acc, o) => (acc[o.SourceIP] = (acc[o.SourceIP] || 0)+1, acc), {} );

        console.log(result);

    return (
        <>
        <hr></hr>
        <h1>Events Log Table</h1>
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
            <span>
                | Go to page: {' '}
                <input  type='number' defaultValue={pageIndex +1} 
                onChange={e => {
                    const pageNumber = e.target.value ? Number(e.target.value) -1 : 0
                    gotoPage(pageNumber)
                }} 
                style={{width: '50px'}} />
            </span>
            <select value={pageSize} onChange={e => setPageSize(Number(e.target.value))}>
                {
                    [10, 25].map(pageSize => (
                        <option key={pageSize} value={pageSize}>
                            Show {pageSize}
                        </option>
                    ))
                }

            </select>
            <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>{'<<'}</button>
            <button onClick={() => previousPage()} disabled={!canPreviousPage}>Previous</button>
            <button onClick={() => nextPage()} disabled={!canNextPage}>Next</button>
            <button onClick={() => gotoPage(pageCount - 1)} disabled={!canPreviousPage}>{'>>'}</button>
        </div>
        </>
    )
}

