import React from "react";
import BoxScoreTable from "../../GameStats/Components/Boxscore/BoxScoreTable";
import { getClassNameFor } from "../../Shared/Functions/gameStatsFunctions";
import useSortableData from "../../Shared/hooks/useSortableData";

const StatsTable = ({
  data,
  tableHeadings,
  tableHeadingsAbbr,
  includeYear,
  leftColHeading,
}) => {
  const dataDefault = Object.values(data).sort((a, b) => {
    if (leftColHeading === "Team" || leftColHeading === "Players") {
      return b["Points"]["avg"] - a["Points"]["avg"];
    } else if (leftColHeading === "MVP" || leftColHeading === "Champions") {
      return parseInt(b["year"]) - parseInt(a["year"]);
    }
  });

  // sort table data
  const { items, handleSort, sortConfig } = useSortableData(dataDefault);

  // Table data
  const tableRowData = items.map((detail, i) => {
    if (detail["salary"] && detail["salary"][0] === -1) {
      detail["salary"][0] = "-";
    }
    return (
      <div className="table-row" key={i}>
        {tableHeadings.map((attr) => {
          console.log(attr, detail[attr].avg);
          console.log(detail["name"]);
          return (
            <div
              key={attr}
              className={`${getClassNameFor(attr, sortConfig)} table-data`}
            >
              {detail[attr] && attr === "salary"
                ? detail[attr][0]
                : detail[attr].avg && detail[attr].std
                ? detail[attr].avg.toFixed(2)
                : ""}
            </div>
          );
        })}
      </div>
    );
  });

  return (
    <div>
      <BoxScoreTable
        leftColHeading={leftColHeading}
        data={items}
        tableRowData={tableRowData}
        headings={tableHeadingsAbbr}
        attr={tableHeadings}
        sortConfig={sortConfig}
        handleSort={handleSort}
        includeYear={includeYear}
      />
    </div>
  );
};

export default StatsTable;
