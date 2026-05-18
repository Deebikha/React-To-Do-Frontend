import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { Grid,Typography,Box,TextField,Button } from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
export default function Input({setDate,settask,setdesc,setDueDate,disabledbtn,handleAdd,date
    ,task,desc,dueDate,time,settime}
) {
  return (
    <><Grid size={{ sm: 12 }} sx={{ textAlign: 'center' }}>
      </Grid><Grid size={{ xs: 6, sm: 2 }}>
              <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="en-gb">
                  <DatePicker
                      id="date"
                      label="Date"
                      value={date}
                      onChange={(newValue) => setDate(newValue)}


                      slotProps={{
                          textField: {
                              size: 'small',
                              fullWidth: true,
                              error: !date
                          },
                      }} />
                  {/* <p> {date ? date.format('DD-MM-YYYY') : ''}</p> */}
              </LocalizationProvider>
          </Grid><Grid size={{ xs: 6, sm: 2 }}>
              <Box
                  component="form"
                  sx={{ '& > :not(style)': { width: '25ch' } }}
                  noValidate
                  autoComplete="off"
              >
                  <TextField
                      id="task"
                      label="Task"
                      size='small'
                      value={task}
                      variant="outlined"
                      onChange={(e) => {
                          const nexttext = e.target.value;
                          const regex = /^[a-zA-Z0-9\s]*$/;
                          if (nexttext.match(regex)) {
                              settask(nexttext);
                          }
                      } }
                      error={!task} />
              </Box>
          </Grid><Grid size={{ xs: 6, sm: 2 }}>
              <Box
                  component="form"
                  sx={{ '& > :not(style)': { width: '25ch' } }}
                  noValidate
                  autoComplete="off"
              >
                  <TextField id="desc" label="Description" size='small' variant="outlined"
                      value={desc} onChange={(e) => setdesc(e.target.value)} />
              </Box>
          </Grid><Grid size={{ xs: 6, sm: 2 }}>
              <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="en-gb">

                  <DatePicker
                      id="dueDate"
                      label="Due Date"
                      value={dueDate}
                      date={date}
                      minDate={date}
                      onChange={(newValue) => setDueDate(newValue)}
                      slotProps={{
                          textField: {
                              size: 'small', fullWidth: true,
                              error: !dueDate || (dueDate && date && dueDate.isBefore(date, 'day'))
                          }
                      }} />

                  {/* <p> {date ? date.format('DD-MM-YYYY') : ''}</p> */}
              </LocalizationProvider>
          </Grid><Grid size={{ xs: 6, sm: 2 }}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <TimePicker
                      id="time"
                      label="Time"
                      value={time}
                      onChange={(newValue) => settime(newValue)}
                      slotProps={{
                          textField: {
                              size: 'small',
                              error: !time,
                              fullWidth: true,
                              sx: {
                                  '& .MuiInputBase-input': {
                                      padding: '6px 10px',
                                      height: '1.2rem',
                                  },
                                  '& .MuiInputLabel-root': {
                                      top: '-2px',
                                  }
                              },
                          },
                      }} />
              </LocalizationProvider>
          </Grid><Grid size={{ xs: 6, sm: 2 }}>
              <Button variant="contained" size="small" color="success" disabled={disabledbtn} onClick={handleAdd}>
                  Add
              </Button>
          </Grid></>
  );
}
