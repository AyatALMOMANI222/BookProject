import React from 'react';
import { Box, CssBaseline, AppBar, Toolbar, Typography, Drawer, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import { AccountBalance, People, ShoppingCart, AttachMoney } from '@mui/icons-material';
import InboxIcon from '@mui/icons-material/Inbox'; // استيراد الرموز إذا كنت تحتاجها
import MailIcon from '@mui/icons-material/Mail';   // استيراد الرموز إذا كنت تحتاجها
import { DataGrid } from '@mui/x-data-grid';
import Chart from '../chart'; // تأكد من صحة مسار الاستيراد
import StatCard from '../Statcard'; // تأكد من صحة مسار الاستيراد
import CustomMap from '../map'; // تأكد من صحة مسار الاستيراد

const drawerWidth = 190;

const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'name', headerName: 'Name', width: 130 },
    { field: 'age', headerName: 'Age', width: 130 },
];

const rows = [
    { id: 1, name: 'John Doe', age: 35 },
    { id: 2, name: 'Jane Smith', age: 42 },
];

function Dashboard() {
    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar position="fixed" sx={{ width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px` }}>
                <Toolbar>
                    <Typography variant="h6" noWrap component="div">
                     Books Dashboard
                    </Typography>
                </Toolbar>
            </AppBar>

        
            <Drawer
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    '& .MuiDrawer-paper': {
                        width: drawerWidth,
                        boxSizing: 'border-box',
                    },
                }}
                variant="permanent"
                anchor="left"
            >
                <Toolbar />
                <Box sx={{ overflow: 'auto' }}>
                    <List>
                        {['User', 'Books'].map((text, index) => (
                            <ListItem button key={text}>
                                <ListItemIcon>
                                    {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                                </ListItemIcon>
                                <ListItemText primary={text} />
                            </ListItem>
                        ))}
                    </List>
                </Box>
            </Drawer>
            <Box component="main" sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3 }}>
                <Toolbar />


             

                <div style={{ display: 'flex', gap: '16px', marginBottom: '24px' }}>
                    {/* إضافة بطاقات إحصائية */}
                    <StatCard
                     sx={{background:"black"}}
                        title="Total Sales"
                        value="$12,345"
                        icon={<AttachMoney color="primary"/>}
                    />
                    <StatCard
                        title="New Users"
                        value="234"
                        icon={<People color="primary" />}
                    />
                    <StatCard
                        title="Revenue"
                        value="$45,678"
                        icon={<ShoppingCart color="primary" />}
                    />
               
                </div>
                <div style={{ height: "auto", width: 'auto' }}>
                    <DataGrid rows={rows} columns={columns} pageSize={5} sx={{margin:"30px 2px"}} />
                </div>



               <div style={{display:"flex",gap:"20px"}}>
               <Chart />
               <CustomMap />
               </div>
            </Box>
        </Box>
    );
}

export default Dashboard;
