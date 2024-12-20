import { DataGrid, GridColDef } from '@mui/x-data-grid';
import Link from 'next/link';
import { Worker } from '@/types/dataModels';
import { Paper, Typography } from '@mui/material';

interface WorkerListProps {
  botId: string;
  workers: Worker[];
}

const WorkerList: React.FC<WorkerListProps> = ({ botId, workers }) => {
  const columns: GridColDef[] = [
    {
      field: 'name',
      headerName: 'Worker Name',
      sortable: true,
      flex: 1,
      renderCell: (params) => (
        <Link href={`/bot/${botId}/worker/${params.row.id}`} style={{ textDecoration: 'none', color: '#1976d2' }}>
          {params.value}
        </Link>
      ),
    },
    {
      field: 'description',
      headerName: 'Description',
      sortable: true,
      flex: 1,
    },
    {
      field: 'created',
      headerName: 'Created On',
      sortable: true,
      flex: 1,
      renderCell: (params) => {
        const date = new Date(params.value);
        return date.toISOString(); // Format the date to ISO UTC
      },
    },
  ];
  if (workers.length === 0) {
    return (
      <Paper style={{ marginTop: '1.5rem', padding: '1rem' }}>
        <Typography variant="body1">No Workers found</Typography>
      </Paper>
    );
  }

  return (
      <div style={{height: 400, width: '100%'}}>
          <DataGrid
              rows={workers}
              columns={columns}
              autoPageSize
              disableRowSelectionOnClick
              getRowId={(row) => row.id} // Set the unique id field
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

export default WorkerList;
