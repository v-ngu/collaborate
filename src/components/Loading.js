import { styled } from 'styled-components';
import CircularProgress from '@mui/material/CircularProgress';

const Loading = () => {
  return (
    <CustomLoading />
  );
};

export default Loading;

const CustomLoading = styled(CircularProgress)`
  && {
    margin: auto;
    color: var(--primary-color);
  }
`;