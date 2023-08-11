import { styled } from 'styled-components';
import CircularProgress from '@mui/material/CircularProgress';

const LoadingCircle = () => {
  return (
    <CustomLoading />
  );
};

export default LoadingCircle;

const CustomLoading = styled(CircularProgress)`
  && {
    margin: auto;
    color: var(--main-yellow);
  }
`;