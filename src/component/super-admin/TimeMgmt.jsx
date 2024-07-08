import {useEffect, useState} from "react";
import {getMetadataSemester} from "../../api/PublicApi.js";
import {Box, Button, Grid, MenuItem, Select, Tooltip, Typography} from "@mui/material";
import {DatePicker, DateTimePicker, LocalizationProvider} from "@mui/x-date-pickers";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import {setCurrentSemester, setDayStartYear} from "../../api/SuperAdminApi.js";
import {toast} from "react-toastify";
import * as Constant from "../../util/constants/Constant.js"
import * as MetadataApi from "../../api/SuperAdminApi.js";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";

export const TimeMgmt = ({currentSemester, setSemester}) => {

    const [startYear, setStartYear] = useState(null)
    const [startOfficialElitech, setStartOfficialElitech] = useState()
    const [endOfficialElitech, setEndOfficialElitech] = useState(null)
    const [startOfficialStandard, setStartOfficialStandard] = useState(null)
    const [endOfficialStandard, setEndOfficialStandard] = useState(null)
    const [startUnofficialElitech, setStartUnofficialElitech] = useState(null)
    const [endUnofficialElitech, setEndUnofficialElitech] = useState(null)
    const [startUnofficialStandard, setStartUnofficialStandard] = useState(null)
    const [endUnofficialStandard, setEndUnofficialStandard] = useState(null)
    const [startFree, setStartFree] = useState(null)
    const [endFree, setEndFree] = useState(null)


    const handleSaveAllMetadata = () => {
        if(new Date(startYear).getDay()!==1){
            toast.error('Ngày bắt đầu phải là thứ 2')
            throw 'Ngày bắt đầu phải là thứ 2'
        }
        MetadataApi.setDayStartYear(currentSemester.slice(0,4),startYear)
        MetadataApi.startRegisterOfficialElitech(currentSemester, startOfficialElitech)
        MetadataApi.endRegisterOfficialElitech(currentSemester, endOfficialElitech)
        MetadataApi.startRegisterOfficialStandard(currentSemester, startOfficialStandard)
        MetadataApi.endRegisterOfficialStandard(currentSemester, endOfficialStandard)
        MetadataApi.startRegisterUnofficialElitech(currentSemester, startUnofficialElitech)
        MetadataApi.endRegisterUnofficialElitech(currentSemester, endUnofficialElitech)
        MetadataApi.startRegisterUnofficialStandard(currentSemester, startUnofficialStandard)
        MetadataApi.endRegisterUnofficialStandard(currentSemester, endUnofficialStandard)
        MetadataApi.startFreeRegister(currentSemester, startFree)
        MetadataApi.endFreeRegister(currentSemester, endFree)
        toast.success("Thành công")
    }

    const [tmpCurrentSemester, setTmpCurrentSemester] = useState(currentSemester)
    const getListSemesterAvailable = () => {
        const curDate = new Date()
        const curYear = curDate.getFullYear()
        const semesters = [];
        for (let i = -1; i <= 1; i++) {
            const year = curYear + i;
            for (let j = 1; j <= 3; j++) {
                semesters.push(`${year}${j}`);
            }
        }
        return semesters;
    }

    const fetchMetadataSemester = async (currentSemester) => {
        const data = await getMetadataSemester(currentSemester)
        const jsonData = data.reduce((obj, item) => {
            obj[item.metadataPk.metadataKey] = item.value;
            return obj;
        }, {});

        setStartYear(jsonData[Constant.START_WEEK_1])
        setStartOfficialElitech(jsonData[Constant.START_REGISTER_CLASS_OFFICIAL_ELITECH])
        setEndOfficialElitech(jsonData[Constant.END_REGISTER_CLASS_OFFICIAL_ELITECH])
        setStartOfficialStandard(jsonData[Constant.START_REGISTER_CLASS_OFFICIAL_STANDARD])
        setEndOfficialStandard(jsonData[Constant.END_REGISTER_CLASS_OFFICIAL_STANDARD])
        setStartUnofficialElitech(jsonData[Constant.START_REGISTER_CLASS_UNOFFICIAL_ELITECH])
        setEndUnofficialElitech(jsonData[Constant.END_REGISTER_CLASS_UNOFFICIAL_ELITECH])
        setStartUnofficialStandard(jsonData[Constant.START_REGISTER_CLASS_UNOFFICIAL_STANDARD])
        setEndUnofficialStandard(jsonData[Constant.END_REGISTER_CLASS_UNOFFICIAL_STANDARD])
        setStartFree(jsonData[Constant.START_REGISTER_FREE])
        setEndFree(jsonData[Constant.END_REGISTER_FREE])
    }

    const handleButtonConfirmChangeCurrentSemester = async () => {
        await setCurrentSemester(tmpCurrentSemester)
        toast.success("Thay đổi kì học thành công: " + tmpCurrentSemester)
        setSemester(tmpCurrentSemester)
    }

    useEffect(() => {
        if (currentSemester) fetchMetadataSemester(currentSemester)
    }, [currentSemester]);

    return (
        <Box sx={{padding: 2}}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <Grid container spacing={2} alignItems="center">
                    <Grid item xs={12} display={'flex'} alignItems={'center'}>
                        <Grid item xs={4} display={'flex'} >
                            <Typography>Kì học hiện tại: </Typography>
                            <Tooltip title={
                                <Box maxWidth={'40vw'} fontSize={16}>
                                    Mục này để thay đổi kì học hiện tại, sinh viên đăng nhập sẽ thấy mục: kì học hiện tại là giá trị này.
                                </Box>
                            }
                            ><HelpOutlineIcon/></Tooltip>
                        </Grid>
                        <Grid item xs={3}>
                            <Select
                                name="name"
                                variant="outlined"
                                label='Kì học'
                                value={tmpCurrentSemester || currentSemester || ''}
                                fullWidth
                                labelId="demo-simple-select-error-label"
                                id="demo-simple-select-error"
                                onChange={(e) => setTmpCurrentSemester(e.target.value)}
                            >
                                {getListSemesterAvailable().reverse().map((s, index) => {
                                    return <MenuItem value={s} key={index}>{s}</MenuItem>
                                })}
                            </Select>
                        </Grid>
                        <Grid item xs={2}>
                            <Button
                                variant={'outlined'}
                                onClick={handleButtonConfirmChangeCurrentSemester}
                                sx={{ml: '30px'}}>
                                <Typography>Xác nhận</Typography>
                            </Button>
                        </Grid>
                    </Grid>

                    <Grid item xs={12} display={'flex'} alignItems={'center'}>
                        <Grid item xs={4}>
                            <Typography>Ngày bắt đầu năm học <b>{currentSemester?currentSemester.slice(0,4):'????'}</b> (Ngày thứ 2 của tuần 1): </Typography>
                        </Grid>
                        <DatePicker value={dayjs(startYear)}
                                        onChange={e => setStartYear(e.toISOString())}/>
                    </Grid>

                    <Grid item xs={12} display={'flex'} alignItems={'center'}>
                        <Grid item xs={4}>
                            <Typography>Đăng ký chính thức - CT ELITECH<b> kì {currentSemester}</b></Typography>
                        </Grid>
                        <Grid item xs={3}>
                            <DateTimePicker value={dayjs(startOfficialElitech)}
                                            onChange={e => setStartOfficialElitech(e.toISOString())}/>
                        </Grid>
                        <Grid item xs={3}>
                            <DateTimePicker value={dayjs(endOfficialElitech)}
                                            onChange={e => setEndOfficialElitech(e.toISOString())}/>
                        </Grid>

                    </Grid>
                    <Grid item xs={12} display={'flex'} alignItems={'center'}>
                        <Grid item xs={4}>
                            <Typography>Đăng ký chính thức - CT chuẩn kì<b> kì {currentSemester}</b></Typography>
                        </Grid>
                        <Grid item xs={3}>
                            <DateTimePicker value={dayjs(startOfficialStandard)}
                                            onChange={e => setStartOfficialStandard(e.toISOString())}/>
                        </Grid>
                        <Grid item xs={3}>
                            <DateTimePicker value={dayjs(endOfficialStandard)}
                                            onChange={e => setEndOfficialStandard(e.toISOString())}/>
                        </Grid>

                    </Grid>
                    <Grid item xs={12} display={'flex'} alignItems={'center'}>
                        <Grid item xs={4}>
                            <Typography>Đăng ký điều chỉnh - CT ELITECH<b> kì {currentSemester}</b></Typography>
                        </Grid>
                        <Grid item xs={3}>
                            <DateTimePicker value={dayjs(startUnofficialElitech)}
                                            onChange={e => setStartUnofficialElitech(e.toISOString())}/>
                        </Grid>
                        <Grid item xs={3}>
                            <DateTimePicker value={dayjs(endUnofficialElitech)}
                                            onChange={e => setEndUnofficialElitech(e.toISOString())}/>
                        </Grid>

                    </Grid>
                    <Grid item xs={12} display={'flex'} alignItems={'center'}>
                        <Grid item xs={4}>
                            <Typography>Đăng ký điều chỉnh - CT Chuẩn kì<b> kì {currentSemester}</b></Typography>
                        </Grid>
                        <Grid item xs={3}>
                            <DateTimePicker value={dayjs(startUnofficialStandard)}
                                            onChange={e => setStartUnofficialStandard(e.toISOString())}/>
                        </Grid>
                        <Grid item xs={3}>
                            <DateTimePicker value={dayjs(endUnofficialStandard)}
                                            onChange={e => setEndUnofficialStandard(e.toISOString())}/>
                        </Grid>

                    </Grid>
                    <Grid item xs={12} display={'flex'} alignItems={'center'}>
                        <Grid item xs={4}>
                            <Typography>Đăng ký tự do<b> kì {currentSemester}</b> </Typography>
                        </Grid>
                        <Grid item xs={3}>
                            <DateTimePicker value={dayjs(startFree)} onChange={e => setStartFree(e.toISOString())}/>
                        </Grid>
                        <Grid item xs={3}>
                            <DateTimePicker value={dayjs(endFree)} onChange={e => setEndFree(e.toISOString())}/>
                        </Grid>
                    </Grid>
                    <Grid item xs={8} display={'flex'} alignItems={'center'} justifyContent={'center'}>
                        <Button
                            variant={'outlined'}
                            sx={{ml: '30px'}}
                            onClick={handleSaveAllMetadata}

                        >
                            <Typography>Xác nhận</Typography>
                        </Button>
                    </Grid>
                </Grid>
            </LocalizationProvider>
        </Box>
    )
}