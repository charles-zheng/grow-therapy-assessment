import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import CircularProgress from '@mui/material/CircularProgress';

const LoadingWrapper = ({ children, loadingStatus }) => {
  if (loadingStatus === 'uninitialized') {
    return null;
  }

  if (loadingStatus === 'pending') {
    return (
      <Box sx={{ m: 2 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (loadingStatus === 'succeeded') {
    return children;
  }

  if (loadingStatus === 'failed') {
    return (
      <Alert severity="error">
        Something went wrong. Please try again later!
      </Alert>
    );
  }
};

export default LoadingWrapper;
