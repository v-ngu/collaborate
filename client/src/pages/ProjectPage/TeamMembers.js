import { useState } from "react";
import { useProjectContext } from "../../contexts/ProjectContext";
import ProfileAvatar from "../../components/ProfileAvatar";
import AvatarGroup from "@mui/material/AvatarGroup";
import TeamMembersMenu from "./TeamMembersMenu";

const TeamMembers = () => {
  const { teamMembers } = useProjectContext();
  const [anchorEl, setAnchorEl] = useState(null);

  // rendering
  return (
    <>
      <AvatarGroup
        max={3}
        onClick={(event) => setAnchorEl(event.currentTarget)}
      >
        {teamMembers.map((teamMember, index) => {
          const colors = ["#EB6868", "#526DC6", "#AD67CC", "#5A9B7E"];
          const { _id, firstName, lastName, isOwner, isAuthorized } =
            teamMember;

          if (!isAuthorized && !isOwner) return null;

          return (
            <ProfileAvatar
              key={`PA${_id}`}
              firstName={firstName}
              lastName={lastName}
              size="small"
              bgColor={colors[index]}
            />
          );
        })}
      </AvatarGroup>
      <TeamMembersMenu anchorEl={anchorEl} setAnchorEl={setAnchorEl} />
    </>
  );
};

export default TeamMembers;
