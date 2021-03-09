import { useMemo, useState } from "react";

const useSortableData = (items, config = null) => {
  const [sortConfig, setSortConfig] = useState(config);
  /* 
  sortConfig={
    key: heading,
    direction: desc, asc 
  }
  */
 
  const objHasAvg = obj => {
    return obj !== null && typeof obj === 'object' && 'avg' in obj;
  }

  const sortSalary = (aVal, bVal, isAscending) => {
    // when salary in b is -1, return a before b
    if (bVal === -1 || bVal === '-') {
      return -1;
    }
    // when salary in a is -1, return b before a
    if (aVal === -1 || aVal === '-') {
      return 1;
    }

    const aSalary = Number((aVal.toString()).replace(/[^0-9\.]+/g, ""));
    const bSalary = Number((bVal.toString()).replace(/[^0-9\.]+/g, ""));
    return isAscending ? aSalary - bSalary : bSalary - aSalary;
  }

  const sortedItems = useMemo(() => {
    let sortableItems = [...items];
    if (sortConfig !== null) {
      sortableItems.sort((a, b) => {
        // when minutes_played in b is null, return a before b
        if (b["minutes_played"] === null) {
          return -1;
        }
        // when minutes_played in a is null, return b before a
        if (a["minutes_played"] === null) {
          return 1;
        }
        const isAscending = sortConfig.direction === 'ascending';
        const aVal = a[sortConfig.key];
        const bVal = b[sortConfig.key];

        if (sortConfig.key === 'salary') {
          return sortSalary(aVal, bVal, isAscending);
        }

        if (objHasAvg(aVal) && objHasAvg(bVal)) {
          return isAscending ? aVal.avg - bVal.avg : bVal.avg - aVal.avg;
        }

        return isAscending ? aVal - bVal : bVal - aVal;
      });
    }
    return sortableItems;
  }, [items, sortConfig]);



  // on click handle sort
  const handleSort = key => {
    let direction = 'descending';
    if (
      sortConfig &&
      sortConfig.key === key &&
      sortConfig.direction === 'descending'
    ) {
      direction = 'ascending';
    }
    setSortConfig({ key, direction });
  }
  return { items: sortedItems, handleSort, sortConfig };
}

export default useSortableData;