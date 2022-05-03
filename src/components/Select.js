import React from 'react'

const Select = ({ title, currValue, allOptions, disabledOptions, onSelect }) => {
  const getUniqueKey = (option) => {
    if (option.id) return option.id
    return option.code
  }

  return (
    <label>
      Select {title}:
      <select value={currValue} onChange={onSelect}>
        <option value={'all'}>All</option>
        {
          allOptions.map(o => <option key={getUniqueKey(o)} value={o.name}>
            {o.name}
          </option>
          )
        }
      </select>
    </label>
  )
}

export default Select