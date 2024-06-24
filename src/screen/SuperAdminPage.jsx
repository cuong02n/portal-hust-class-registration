import {useEffect, useState} from "react";
import {getMyInfo} from "../api/UserApi.js";
import {
    AppBar,
    Box,
    CssBaseline,
    Divider,
    Drawer,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Typography
} from "@mui/material";
import Toolbar from '@mui/material/Toolbar';
import UpdateIcon from '@mui/icons-material/Update';
import GroupIcon from '@mui/icons-material/Group';
import {AdminPanelSettings} from "@mui/icons-material";
import BookIcon from '@mui/icons-material/Book';
import StackedLineChartIcon from '@mui/icons-material/StackedLineChart';
import {StudentMgmt} from "../component/super-admin/StudentMgmt.jsx";
import {getAllAdmin, getAllStudent} from "../api/SuperAdminApi.js";
import {AdminMgmt} from "../component/super-admin/AdminMgmt.jsx";
import {TimeMgmt} from "../component/super-admin/TimeMgmt.jsx";
import {getAllClass, getAllCourse, getCurrentSemester} from "../api/PublicApi.js";
import {CourseMgmt} from "../component/super-admin/CourseMgmt.jsx";
import {ClassMgmt} from "../component/super-admin/ClassMgmt.jsx";

export const SuperAdminPage = () => {
    const drawerWidth = 240

    const [info, setInfo] = useState(undefined)

    const [allStudent, setAllStudent] = useState([])
    const [allAdmin, setAllAdmin] = useState([])

    const [currentSemester, setCurrentSemester] = useState(undefined)
    const [currentSemesterForMetadataManagement,setCurrentSemesterForMetadataManagement] = useState(undefined)

    const [allCourses,setAllCourses] = useState(undefined)
    const [allClasses,setAllClasses] = useState(undefined)

    const fetchDataInfo = async () => {
        const data = await getMyInfo()
        setInfo(data)
    }

    const fetchAllStudent = async () => {
        const data = await getAllStudent()
        setAllStudent(data)
    }
    const fetchDataAdmin = async () => {
        const data = await getAllAdmin()
        setAllAdmin(data)
    }

    const [currentState, setCurrentState] = useState('TimeMgmt')


    const fetchCurrentSemester = async () => {
        const data = await getCurrentSemester()
        console.log(data)
        setCurrentSemester(data)
    }
    const fetchDataAllCourse = async () => {
        const data = await getAllCourse()
        console.log(data)
        setAllCourses(data)
    }

    const fetchDataAllClasses = async (currentSemester)=>{
        const data = await getAllClass('20231')
        setAllClasses(data)
    }



    useEffect(() => {
        fetchDataInfo()
        fetchCurrentSemester()
        fetchAllStudent()
        fetchDataAdmin()
        fetchDataAllCourse()
    }, []);

    useEffect(() => {
        fetchDataAllClasses(currentSemester)
    }, [currentSemester]);
    return (
        <Box sx={{display: 'flex'}}>
            <CssBaseline/>
            <AppBar
                position="fixed"
                sx={{width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px`}}
            >
                <Toolbar>
                    <Typography variant="h6" noWrap component="div">
                        Quản lý hệ thống
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
                <Toolbar/>
                <Divider/>
                <List>
                    <ListItem key={0} disablePadding>
                        <ListItemButton onClick={()=>setCurrentState('TimeMgmt')}>
                            <ListItemIcon>
                                <UpdateIcon/>
                            </ListItemIcon>
                            <ListItemText primary={'QL Thời gian đăng ký sv'}/>
                        </ListItemButton>
                    </ListItem>

                    <ListItem key={1} disablePadding>
                        <ListItemButton onClick={()=>setCurrentState('StudentMgmt')}>
                            <ListItemIcon>
                                <GroupIcon/>
                            </ListItemIcon>
                            <ListItemText primary={'QL Sinh viên'}/>
                        </ListItemButton>
                    </ListItem>

                    <ListItem key={2} disablePadding>
                        <ListItemButton onClick={()=>setCurrentState('AdminMgmt')}>
                            <ListItemIcon>
                                <AdminPanelSettings/>
                            </ListItemIcon>
                            <ListItemText primary={'QL Cán bộ'}/>
                        </ListItemButton>
                    </ListItem>

                    <ListItem key={3} disablePadding>
                        <ListItemButton onClick={()=>setCurrentState('CourseMgmt')}>
                            <ListItemIcon>
                                <BookIcon/>
                            </ListItemIcon>
                            <ListItemText primary={'QL Học phần'}/>
                        </ListItemButton>
                    </ListItem>

                    <ListItem key={4} disablePadding>
                        <ListItemButton onClick={()=>setCurrentState('ClassMgmt')}>
                            <ListItemIcon>
                                <BookIcon/>
                            </ListItemIcon>
                            <ListItemText primary={'QL Lớp học'}/>
                        </ListItemButton>
                    </ListItem>

                </List>
                <Divider/>
                <List>
                    <ListItem key={5} disablePadding>
                        <ListItemButton>
                            <ListItemIcon>
                                <StackedLineChartIcon/>
                            </ListItemIcon>
                            <ListItemText primary={'Grafana'}/>
                        </ListItemButton>
                    </ListItem>
                </List>
            </Drawer>
            <Box
                component="main"
                sx={{flexGrow: 1, bgcolor: 'background.default', p: 3}}
            >
                <Toolbar/>
                {currentState==='TimeMgmt' &&
                    <TimeMgmt currentSemester={currentSemester} setSemester={setCurrentSemester}/>
                }
                {currentState==='StudentMgmt' &&
                    <StudentMgmt allStudent={allStudent}/>
                }
                {currentState==='AdminMgmt' &&
                    <AdminMgmt allAdmin={allAdmin}/>
                }
                {currentState==='CourseMgmt' &&
                    <CourseMgmt allCourse={allCourses}/>
                }
                {currentState==='ClassMgmt' &&
                    <ClassMgmt allClasses={allClasses}/>
                }
            </Box>
        </Box>
    )
        ;
}