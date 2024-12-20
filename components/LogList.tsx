import { DataGrid, GridColDef } from '@mui/x-data-grid';
import Link from 'next/link';
import { LogSummary } from '@/types/dataModels';
import { Paper, Typography } from '@mui/material';

interface LogListProps {
  from: string
  logs: LogSummary[];
}

const LogList: React.FC<LogListProps> = ({ logs, from }) => {
  const columns: GridColDef[] = [
    {
      field: 'id',
      headerName: 'Log ID',
      sortable: true,
      flex: 1,
      renderCell: (params) => (
        <Link href={`/log/${params.value}?from=${from}`} style={{ textDecoration: 'none', color: '#1976d2' }}>
          {params.value}
        </Link>
      ),
    },
    {
      field: 'created',
      headerName: 'Created On',
      sortable: true,
      flex: 1,
      renderCell: (params) => {
        const date = new Date(params.value);
        return date.toISOString(); // Format the date as ISO UTC
      },
    }
  ];

  if (logs.length === 0) {
    return (
      <Paper style={{ marginTop: '1.5rem', padding: '1rem' }}>
        <Typography variant="body1">No Logs found</Typography>
      </Paper>
    );
  }
  return (
      <div style={{height: 600, width: '100%'}}>
          <DataGrid
              rows={logs}
              columns={columns}
              initialState={{
                  pagination: {
                      paginationModel: {
                          pageSize: 25,
                      },
                  },
              }}
              pageSizeOptions={[25, 50, 100]}
              disableRowSelectionOnClick
              getRowId={(row) => row.id} // Set the unique id field
              hideFooterPagination={logs.length < 5} // Conditionally hide pagination footer
              sx={{
                  '& .MuiDataGrid-sortIcon': {
                      color: '#ffffff', // Change the color of the sorting arrows
                      fontSize: '1.2rem', // Adjust the size of the sorting arrows
                  },
                  '& .MuiDataGrid-columnHeader': {
                      backgroundColor: '#1976d2', // Header background color
                      color: '#ffffff', // Header text color
                      fontWeight: 'bold',
                  },
                  '& .MuiDataGrid-row:nth-of-type(odd)': {
                      backgroundColor: '#f5f5f5', // Odd row color
                  },
                  '& .MuiDataGrid-row:nth-of-type(even)': {
                      backgroundColor: '#e0f7fa', // Even row color
                  },
                  '& .MuiDataGrid-row:hover': {
                      backgroundColor: '#b2ebf2', // Hover effect
                  },
              }}
          />
      </div>
  );
};

export default LogList;
