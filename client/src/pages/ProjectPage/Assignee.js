import { useRef } from "react";
import { styled } from "styled-components";
import { useProjectContext } from "../../contexts/ProjectContext";
import ProfileAvatar from "../../components/ProfileAvatar";

const Assignee = ({ taskObject }) => {
  const colorRef = useRef(["#EB6868", "#526DC6", "#AD67CC", "#5A9B7E"]);
  const { teamMembers } = useProjectContext();
  const { assignee: assigneeId } = taskObject;

  const index = teamMembers.findIndex((tm) => tm["_id"] === assigneeId);
  const assignee = { ...teamMembers[index] };
  const { firstName, lastName } = assignee;

  return (
    <Wrapper>
      {firstName && (
        <ProfileAvatar
          firstName={firstName}
          lastName={lastName}
          size="small"
          bgColor={colorRef.current[index]}
        />
      )}
    </Wrapper>
  );
};

export default Assignee;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  margin-top: var(--small-space);
`;
