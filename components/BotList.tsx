import { DataGrid, GridColDef } from '@mui/x-data-grid';
import Link from 'next/link';
import { Bot } from '@/types/dataModels';
import { Paper, Typography } from '@mui/material';

interface BotListProps {
  bots: Bot[];
}

const BotList: React.FC<BotListProps> = ({ bots }) => {
  const columns: GridColDef[] = [
    {
      field: 'name',
      headerName: 'Bot Name',
      flex: 1,
      renderCell: (params) => (
        <Link href={`/bot/${params.row.id}`} style={{ textDecoration: 'none', color: '#1976d2' }}>
          {params.value}
        </Link>
      ),
    },
    {
      field: 'description',
      headerName: 'Description',
      flex: 1,
    },
    {
      field: 'status',
      headerName: 'Status',
      flex: 1,
    },
    {
      field: 'created',
      headerName: 'Creation Date',
      flex: 1,
      renderCell: (params) => {
        const date = new Date(params.value); // Convert to Date object
        return date.toISOString(); // Format the date as needed
      },
    },
  ];

  return (
    <Paper style={{ marginTop: '1.5rem', padding: '1rem' }}>
      <Typography variant="h5" style={{ marginBottom: '1rem' }}>
        Bot List
      </Typography>
      <div style={{ height: 400, width: '100%' }}>
        <DataGrid
          rows={bots}
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
    </Paper>
  );
};

export default BotList;
