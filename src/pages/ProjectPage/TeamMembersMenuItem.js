import { styled } from "styled-components";
import { Link } from "react-router-dom";
import { useSocketContext } from "../../contexts/SocketContext";

const TeamMembersMenuItem = ({ teamMember, index, projectId }) => {
  const {
    _id: userId,
    firstName,
    lastName,
    isOwner,
    isAuthorized
  } = teamMember;

  const socket = useSocketContext();

  const handleClick = (event) => {
    event.preventDefault();
    if (isOwner) return;

    isAuthorized
      ? socket.emit("projects:remove-user", { projectId, userId, index })
      : socket.emit("projects:add-user", { projectId, userId, index })
  };

  return (
    <Wrapper>
      <span>{`${firstName} ${lastName}`}</span>
      <Link onClick={event => handleClick(event)}>
        {
          isOwner
            ? "Owner"
            : isAuthorized
              ? "Remove"
              : "Add"
        }
      </Link>
    </Wrapper>
  );
};

export default TeamMembersMenuItem;

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;