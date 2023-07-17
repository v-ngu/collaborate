import { useEffect, useRef } from "react";
import { styled } from "styled-components";
import { useSocketContext } from "../../contexts/SocketContext";
import { useProjectContext } from "../../contexts/ProjectContext";

const TeamMembers = ({ projectId }) => {
  const { teamMembers, setTeamMembers } = useProjectContext();

  const socket = useSocketContext();

  const teamRef = useRef();
  teamRef.current = teamMembers;

  // utils
  const handleClick = (event, index, userId, isOwner, isAuthorized) => {
    event.preventDefault();
    if (isOwner) return;

    isAuthorized
      ? socket.emit("projects:remove-user", { projectId, userId, index })
      : socket.emit("projects:add-user", { projectId, userId, index })
  };

  // update authorized users on project
  useEffect(() => {
    if (!socket) return;

    const handleUser = ({ index }) => {
      const newState = [...teamRef.current];
      newState[index].isAuthorized = !newState[index].isAuthorized
      setTeamMembers(newState);
    };

    // listners
    socket.on("projects:user-added", handleUser);
    socket.on("projects:user-removed", handleUser);

    return () => {
      socket.off("projects:user-added");
      socket.off("projects:user-removed");
    }
  }, [socket, setTeamMembers])

  // rendering
  return (
    <>
      {
        teamMembers.map((teamMember, index) => {
          const {
            _id: userId,
            firstName,
            lastName,
            isOwner,
            isAuthorized
          } = teamMember;

          return (
            <Wrapper key={`TM${userId}`}>
              <p>{firstName} {lastName}</p>
              <button
                onClick={event => {
                  handleClick(event, index, userId, isOwner, isAuthorized)
                }}
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