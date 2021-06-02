import React from 'react';
import TeamTitle from '../GameSummary/TeamTitle';
import QuarterlyTable from '../GameSummary/QuarterlyTable';
import { StyledTitle } from "./MatchFacts-styles";

const MatchFactsTitle = ({ leads, ties, homeTeam, awayTeam }) => {

  // leads and ties data
  const quarterlyLeads = [leads.Quarterly.Q1, leads.Quarterly.Q2, leads.Quarterly.Q3, leads.Quarterly.Q4, leads.Quarterly.OT];
  const quarterlyTies = [ties.Quarterly.Q1, ties.Quarterly.Q2, ties.Quarterly.Q3, ties.Quarterly.Q4, ties.Quarterly.OT];
  const matchFactsTableData = [
    {
      title: "Lead Changes",
      quarterValues: quarterlyLeads,
      total: leads.Total
    },
    {
      title: "Ties",
      quarterValues: quarterlyTies,
      total: ties.Total
    },
  ];

  return (
    <StyledTitle>
      <div className='title away'>
        <TeamTitle
          name={awayTeam.Team}
          hide
          left
          customStyle
        />
      </div>
      <QuarterlyTable
        rowData={matchFactsTableData}
        blackText
      />
      <div className='title home'>
        <TeamTitle
          name={homeTeam.Team}
          hide
          customStyle
        />
      </div>
    </StyledTitle>
  );
}

export default MatchFactsTitle;