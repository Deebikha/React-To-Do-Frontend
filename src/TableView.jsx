
import { Grid, Button, MenuItem, Paper } from '@mui/material'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Container from '@mui/material/Container';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import Assign from './Assign';
dayjs.extend(utc);
export default function TableView({ currentRows, handleStatusMenuOpen, isOverdue, setStatusAnchorEl,
  handleStatusChange, handleEdit, handleDelete, setCurrentPage, totalPages, currentPage, StyledMenu,
  StyledTableCell, StyledTableRow, StatusAnchorEl, setList, displayedList }) {
  return (
    <Grid size={{ xs: 12 }} sx={{ mt: 4, display: 'flex', justifyContent: 'center' }}>
      <Container maxWidth="65%">
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell>Date</StyledTableCell>
                <StyledTableCell align="center">Task Name</StyledTableCell>
                <StyledTableCell align="center">Due Date</StyledTableCell>
                <StyledTableCell align="center">Time</StyledTableCell>
                <StyledTableCell align="center">Description</StyledTableCell>
                <StyledTableCell align="center">Status</StyledTableCell>
                <StyledTableCell align="center">Assigned To</StyledTableCell>
                <StyledTableCell align="center">Edit</StyledTableCell>
                <StyledTableCell align="center">Delete</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {Array.isArray(currentRows) && currentRows.map((row) => (
                <StyledTableRow key={row.id} sx={{
                  bgcolor: row.status === 'Expire' || isOverdue(row) ? 'rgba(255, 0, 0, 0.82) !important' : 'inherit',
                }}
                >
                  <StyledTableCell component="th" scope="row">{dayjs(row.date).local().format("DD-MM-YYYY")}</StyledTableCell>
                  <StyledTableCell align="center">{row.taskName}</StyledTableCell>
                  <StyledTableCell align="center">{dayjs(row.dueDate).local().format("DD-MM-YYYY")}</StyledTableCell>
                  <StyledTableCell align="center"> {row.time
                    ? dayjs(`2000-01-01 ${row.time}`).format("hh:mm A") : ""}</StyledTableCell>
                  <StyledTableCell align="center">{row.desc}</StyledTableCell>
                  <StyledTableCell align='center'>
                    <Grid size={{ xs: 'auto' }} >
                      <Button
                        variant="contained"
                        size="small"
                        onClick={(e) => handleStatusMenuOpen(e, row.id)}
                        endIcon={<KeyboardArrowDownIcon />}
                        style={{ align: "center" }}
                        disabled={row.status === 'Expire' || isOverdue(row)}

                      >
                        {isOverdue(row) ? 'Expire' : row.status}
                      </Button>

                      <StyledMenu
                        anchorEl={StatusAnchorEl}
                        open={Boolean(StatusAnchorEl)}
                        onClose={() => setStatusAnchorEl(null)}
                      >
                        <MenuItem onClick={() => handleStatusChange("Pending")}>Pending</MenuItem>
                        <MenuItem onClick={() => handleStatusChange("InProgress")}>InProgress</MenuItem>
                        <MenuItem onClick={() => handleStatusChange("Completed")}>Completed</MenuItem>
                        <MenuItem onClick={() => handleStatusChange("Expire")}>Expire</MenuItem>
                      </StyledMenu>
                    </Grid>
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    <Assign
                      isOverdue={isOverdue}
                      row={row}
                      displayedList={displayedList}
                      setList={setList}
                    /></StyledTableCell>
                  <StyledTableCell align="center">

                    <Button variant="contained" size="small" color="info" onClick={() => handleEdit(row)} disabled={row.status === 'Expire' || isOverdue(row)}>
                      Edit
                    </Button></StyledTableCell>
                  <StyledTableCell align="center">

                    <Button variant="contained" size="small" color="info" onClick={() => handleDelete(row.id)} >
                      Delete
                    </Button>

                  </StyledTableCell>
                </StyledTableRow>

              ))}
            </TableBody>
          </Table>
          <Stack spacing={2} style={{ alignItems: "center" }}>
            <Pagination
              count={totalPages}
              page={currentPage}
              onChange={(event, value) => setCurrentPage(value)}
              variant="outlined"
            />
          </Stack>
        </TableContainer>
      </Container>
    </Grid>
  );
}
