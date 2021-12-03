import styled from "styled-components";

export const RecentEventsItemWrapper = styled.div`
  display: flex;
  position: relative;
  height: 100%;
  .image-container {
    width: 30px;
    height: 30px;
    margin-right: 0.5rem;
    img {
      width: 30px;
      height: 30px;
    }
  }
  .active.team-container {
    border-bottom: 5px solid var(--main-blue);
  }
  .team-container {
    padding: 0.5rem 1rem;
    border-right: 1px solid silver;
    width: 200px;
  }
  .team {
    display: flex;
    font-size: 0.9rem;
    align-items: center;
    margin: 0.3rem auto;
  }
  .team-score {
    margin-left: auto;
  }
`;

export const RecentEventsListWrapper = styled.section`
box-shadow: var(--box-shadow-2);

.recent-events-wrapper {
  display: flex;
  max-width: 1440px;
  margin: 0 auto;
}

.slick-slider,
.date-select {
  height: 100px;
}

.carousel {
  width: calc(100% - 100px);
  border-right: 1px solid silver;
}
.date-select {
  width: 100px;
  min-width: 100px;
  position: relative;
  border-right: 1px solid silver;
  border-left: 1px solid silver;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  button {
    text-transform: uppercase;
    letter-spacing: 1px;
    color: var(--lighter-black);
    width: 100%;
    height: 100%;
  }
  .active-button {
    background-color: rgba(0, 0, 0, 0.15);
    font-weight: bold;
  }
}

.item-container {
  cursor: pointer;
  height: 100px;
  width: 200px;
}
.slick-prev:before,
.slick-next:before {
  color: black;
}
.slick-list:focus {
  outline: none;
}
`;