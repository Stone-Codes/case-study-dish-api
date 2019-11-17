import React from 'react'

import './TableHeader.css'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSort, faSortUp, faSortDown } from '@fortawesome/free-solid-svg-icons'

const TableHeader = ({displayName, sortName, sortedBy, handleSorting}) => {

  const onChangeSorting = () => {
    sortedBy === sortName ? handleSorting(`-${sortName}`) : handleSorting(sortName)
  }

  const selectSortIcon = () => {
    if(sortedBy.includes(sortName)) {
      if(sortedBy.startsWith('-')) return faSortDown
      else return faSortUp
    } else return faSort
  }


  return (
    <th onClick={onChangeSorting}>
      {displayName} 
      <FontAwesomeIcon icon={selectSortIcon()} />
    </th>
  )
}

export default TableHeader