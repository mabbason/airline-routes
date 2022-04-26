import React from 'react';

const Table = ({ className, columns, rows, format }) => {
  return (
    <table>
      <tr>
        {columns.map(c => <td>{c.name}</td>)}
      </tr>
      {rows.map(r => <tr>
          <td>{format('airline', r.airline)}</td>
          <td>{format('src', r.src)}</td>
          <td>{format('dest', r.src)}</td>
        </tr>)
       }
    </table>
  )
}

export default Table