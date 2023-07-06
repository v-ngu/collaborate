import { useRef } from "react";
import { styled } from "styled-components";

const TeamMembers = ({ teamMembers, setTeamMembers }) => {

  const handleClick = (event, index, isOwner) => {
    event.preventDefault();
    // socket to update project with authorized user
    if (isOwner) return;

    const newState = [...teamMembers];
    newState[index].isAuthorized = !newState[index].isAuthorized
    setTeamMembers(newState);
  };
  
  return (
    <>
      {
        teamMembers.map((teamMember, index) => {
          const { _id, firstName, lastName, isOwner, isAuthorized } = teamMember;

          return (
            <Wrapper key={`TM${_id}`}>
              <p>{firstName} {lastName}</p>
              <button
                onClick={event => handleClick(event, index, isOwner)}
              >
                {
                  isOwner
                    ? "Owner"
                    : isAuthorized
                      ? "Remove"
                      : "Add"
                }
              </button>
            </Wrapper>
          )
        })
      }
    </>
  );
};

export default TeamMembers;

const Wrapper = styled.div`
  display: flex;
`;