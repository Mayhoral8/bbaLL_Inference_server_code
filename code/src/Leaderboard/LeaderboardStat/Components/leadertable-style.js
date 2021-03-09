import styled from "styled-components";

export const LeaderTableDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

export const Table = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
 font-size: 1rem;
  > div {
    width: 100%;
  }
`;

export const TableHead = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0.5rem 0;
  > div {
    color: var(--grey);
    font-weight: bold;
  }
`;

export const TableBody = styled.div``;

export const TableRow = styled.div`
  display: flex;
  justify-content: space-between;
  border-top: 1px solid rgba(153, 166, 182, 0.15);
  padding: 0.9vh 0vw;
  line-height: 1.5;
`;

export const TableBoxLeft = styled.div`
  order: 0;
  width: 15%;
  color: var(--red);
  font-weight: var(--fw-bold);
`;

export const TableBoxMiddle = styled.div`
  order: 1;
  width: 60%;
  a {
    text-decoration: none;
    color: var(--penblue);
    &:hover {
      text-decoration: underline;
    }
  }
`;

export const TableBoxRight = styled.div`
  order: 2;
  width: 20%;
  color: var(--penblue);
`;

export const ExpandButton = styled.button`
  background: silver;
  margin-top: 1rem;
  padding: 0.5rem 2rem;
`