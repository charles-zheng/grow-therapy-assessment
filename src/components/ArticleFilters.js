import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';

import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DesktopDatePicker from '@mui/lab/DesktopDatePicker';
import DateAdapter from '@mui/lab/AdapterMoment';
import moment from 'moment';

const ArticleFilters = ({
  date,
  onDateChange,
  limit,
  onLimitChange
}) => {
  return (
    <Box sx={{ m: 2 }}>
      <FormControl sx={{ m: 1, minWidth: 120 }}>
        <Select
          value={limit}
          onChange={({ target: { value } }) => onLimitChange(value)}
          displayEmpty
          inputProps={{ 'aria-label': 'Number of Results' }}
        >
          {[25, 50, 75, 100, 200].map(limit => (
            <MenuItem key={limit} value={limit}>{limit}</MenuItem>
          ))}
        </Select>
        <FormHelperText>Number of Results</FormHelperText>
      </FormControl>
      <FormControl sx={{ m: 1, minWidth: 120 }}>
        <LocalizationProvider dateAdapter={DateAdapter}>
          <DesktopDatePicker
            inputFormat="MM/DD/yyyy"
            value={date}
            maxDate={moment()}
            onChange={(value) => onDateChange(value)}
            renderInput={(params) => <TextField {...params} />}
          />
          <FormHelperText>Date</FormHelperText>
        </LocalizationProvider>
      </FormControl>
    </Box>
  );
};

export default ArticleFilters;
