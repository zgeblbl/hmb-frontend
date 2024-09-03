import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';

const columns = [
  { id: 'date', label: 'Date', minWidth: 100 },
  { id: 'title', label: 'Title', minWidth: 200 },
  { id: 'description', label: 'Description', minWidth: 400 },
];

function createAnnouncement(date, title, description) {
  return { date, title, description };
}

const announcements = [
  createAnnouncement('2023-01-01', 'New Year Holiday', 'Office will be closed on January 1st.'),
  createAnnouncement('2023-02-14', 'Valentine\'s Day', 'Special event in the main lobby.'),
  createAnnouncement('2023-03-23', 'Budget Review', 'Annual budget review meeting in conference room B.'),
  // Daha fazla duyuru ekleyebilirsin
];

export default function AnnouncementTable() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(3); // Sayfa başına satır sayısını 3'e ayarladık

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <Typography variant="h6" component="div" sx={{ padding: 2, textAlign: 'center' }}>
        Announcements
      </Typography>
      <TableContainer sx={{ maxHeight: 300 }}>
        <Table stickyHeader aria-label="announcement table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth, fontWeight: 'bold', backgroundColor: '#f5f5f5' }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {announcements
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((announcement) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={announcement.date}>
                    {columns.map((column) => {
                      const value = announcement[column.id];
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[3, 5, 10]} // Küçük sayfa başı satır seçenekleri
        component="div"
        count={announcements.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        sx={{ '.MuiTablePagination-selectLabel, .MuiTablePagination-input': { fontSize: '0.875rem' } }} // Yazı tipini küçülttük
      />
    </Paper>
  );
}
