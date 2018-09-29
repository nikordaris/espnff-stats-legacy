import React from "react";
import { graphql } from "react-apollo";
import gql from "graphql-tag";
import { Link } from "react-router-dom";

const SideBarContainer = ({ data: { loading, standings } }) => {
  if (loading) {
    return <span>loading...</span>;
  }
  return (
    <div>
      {standings.map(({ teamName, id }) => (
        <span key={id}>{teamName}</span>
      ))}
    </div>
  );
};

const query = gql`
  {
    standings {
      id
      teamName
      teamAbbrev
      divisionName
      wins
      losses
      streakLength
      streakType
      pointsFor
      pointsAgainst
      divisionStanding
      overallStanding
      owners {
        id
        firstName
        lastName
      }
    }
  }
`;

export default graphql(query)(SideBarContainer);
