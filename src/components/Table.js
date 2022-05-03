import React, { useState }  from 'react';

const Button = (props) => (
  <button onClick={props.onClick}>
    {props.text}
  </button>
)

const Table = ({ className, columns, rows, format, rowsPerPage }) => {
  const [ page, setPage ] = useState(0)
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

  // console.log("Table, rows:", rows)
  return (
    <>
    <Button onClick={() => handleSetPage(page - 1)} text="Previous" />
    <h4>Showing Routes {`${startingRow + 1} - ${endingPage(startingRow + rowsPerPage)}`} of {rows.length}</h4>
    <Button onClick={() => handleSetPage(page + 1)} text="Next" />

    <table>
      <tbody>
        <tr>
          {columns.map(c => <td key={c.name}><strong>{c.name}</strong></td>)}
        </tr>
        {rows.slice(startingRow, startingRow + rowsPerPage).map((r) => <tr key={`${r.src}${r.dest}`}>
            <td>{format('airline', r.airline)}</td>
            <td>{format('src', r.src)}</td>
            <td>{format('dest', r.dest)}</td>
          </tr>)
        }
       </tbody>
    </table>
    </>
  )
}

export default Table