import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import CreateStudent from './CreateStudent';
import ViewStudent from './ViewStudent';


const theme = createTheme();

export default function StudentContainer() {
  const [value, setValue] = React.useState('1');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="md">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >

          <Box sx={{ width: '100%', typography: 'body1' }}>
            <TabContext value={value}>
              <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <TabList onChange={handleChange} aria-label="lab API tabs example">
                  <Tab label="Create Student" value="1" />
                  <Tab label="View Student" value="2" />
                  <Tab label="Update Student" value="3" />
                </TabList>
              </Box>
              <TabPanel value="1"  >
                <CreateStudent></CreateStudent>
              </TabPanel>
              <TabPanel value="2">
                <ViewStudent></ViewStudent>
              </TabPanel>
              <TabPanel value="3">Update Student</TabPanel>
            </TabContext>
          </Box>

        </Box>

      </Container>
    </ThemeProvider>
  );
}