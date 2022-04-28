import React, { useState }  from 'react';

const Button = (props) => (
  <button onClick={props.onClick}>
    {props.text}
  </button>
)

const Table = ({ className, columns, rows, format, rowsPerPage }) => {
  const [ page, setPage ] = useState(0)
  // let rowsPerPage = 25
  console.log('Table', rowsPerPage)
  let startingRow = rowsPerPage * page

  const handleSetPage = (newPageNum) => {
    if (newPageNum < 0) {
      setPage(0)
    } else if (newPageNum * rowsPerPage + 1 > rows.length) {
      setPage(newPageNum - 1)
    } else {
      setPage(newPageNum)
    }
  }

  const endingPage = (givenRow) => {
    return givenRow > rows.length ? rows.length : givenRow
  }

  return (
    <>
    <Button onClick={() => handleSetPage(page - 1)} text="Previous" />
    <h4>Showing Routes {`${startingRow + 1} - ${endingPage(startingRow + rowsPerPage)}`} of {rows.length}</h4>
    <Button onClick={() => handleSetPage(page + 1)} text="Next" />

    <table>
      <tr>
        {columns.map(c => <td><strong>{c.name}</strong></td>)}
      </tr>
      {rows.slice(startingRow, startingRow + rowsPerPage).map((r, idx) => <tr>
          {/* <td>{idx} </td> */}
          <td>{format('airline', r.airline)}</td>
          <td>{format('src', r.src)}</td>
          <td>{format('dest', r.src)}</td>
        </tr>)
       }
    </table>
    </>
  )
}

export default Table