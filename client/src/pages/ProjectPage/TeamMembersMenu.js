import { useRef, useEffect } from "react";
import { styled } from "styled-components";
import { useProjectContext } from "../../contexts/ProjectContext";
import { useSocketContext } from "../../contexts/SocketContext";
import PopupMenu from "../../components/PopupMenu";
import PopupItem from "../../components/PopupItem";
import TeamMembersMenuItem from "./TeamMembersMenuItem";

const TeamMembersMenu = ({ anchorEl, setAnchorEl }) => {
  const {
    project: { _id: projectId },
    teamMembers,
    setTeamMembers
  } = useProjectContext();

  const socket = useSocketContext();

  const teamRef = useRef();
  teamRef.current = teamMembers;

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

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <PopupMenu anchorEl={anchorEl} handleClose={handleClose}>
      <Title>Team members</Title>
      {
        teamMembers.map((teamMember, index) => {
          return (
            <CustomPopupItem
              key={`TM${index}`}
              children={
                <TeamMembersMenuItem
                  teamMember={teamMember}
                  index={index}
                  projectId={projectId}
                />
              }
            />
          )
        })
      }
    </PopupMenu>
  );
};

export default TeamMembersMenu;

const Title = styled.p`
  padding: var(--standard-space);
  padding-bottom: 0px;
  font-weight: bold;
`;

const CustomPopupItem = styled(PopupItem)`
  &:hover {
    background-color: transparent;
    cursor: default;
  }
`