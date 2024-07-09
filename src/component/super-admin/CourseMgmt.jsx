import {Box, Button, Divider, Modal, TextField, Typography,} from "@mui/material";
import {DataGrid} from "@mui/x-data-grid";
import {useEffect, useState} from "react";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import PublishIcon from "@mui/icons-material/Publish";

const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 500,
    bgcolor: "background.paper",
    boxShadow: 24,
    borderRadius: "10px",
    maxHeight: "90vh",
    overflowY: "auto",
    p: 4,
};

export const CourseMgmt = ({allCourse}) => {
    const [openAdd, setOpenAdd] = useState(false);
    const handleOpenAdd = () => setOpenAdd(true);
    const handleCloseAdd = () => setOpenAdd(false);

    const [openEdit, setOpenEdit] = useState(false);
    const handleCloseEdit = () => setOpenEdit(false);
    const [course, setCourse] = useState({});
    const [file, setFile] = useState(null);

    const handleOpenEdit = (row) => {
        setCourse(row);
        setOpenEdit(true);
    };

    const columns = [
        {field: "id", headerName: "Mã HP", flex: 100},
        {field: "courseName", headerName: "Tên HP", flex: 200},
        {field: "courseNameE", headerName: "Tên HP TA", flex: 200},
        {field: "courseType", headerName: "Loại HP", flex: 120},
        {field: "credit", headerName: "Số TC", flex: 80},
        {field: "creditInfo", headerName: "Chi tiết", flex: 80},
        {field: "needExperiment", headerName: "Cần TN", flex: 60},
        {field: "schoolName", headerName: "Đơn vị QL", flex: 100},
        {
            field: "edit",
            headerName: "Chỉnh sửa",
            flex: 100,
            renderCell: (params) => (
                <Button
                    variant="contained"
                    color="info"
                    size="small"
                    onClick={() => {
                        handleOpenEdit(params.row);
                    }}
                >
                    <EditIcon/>
                </Button>
            ),
        },
        {
            field: "delete",
            headerName: "Xóa",
            flex: 100,
            renderCell: (params) => (
                <Button
                    variant="contained"
                    color="error"
                    size="small"
                    onClick={() => {
                        console.log(params.row.id);
                    }}
                >
                    <DeleteIcon/>
                </Button>
            ),
        },
    ];

    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
    };

    const handleUploadFile = () => {
        console.log(file.name);
        const formData = new FormData();
        formData.append("file", file);
        console.log(formData);
    };

    return (
        <Box sx={{height: "80vh", width: "100%"}}>
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    mb: 2,
                }}
            >
                <Button
                    variant="contained"
                    color="success"
                    onClick={handleOpenAdd}
                    sx={{marginBottom: "15px"}}
                    startIcon={<AddIcon/>}
                >
                    Thêm
                </Button>
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                >
                    <Typography fontWeight="bold" mr={2}>
                        Nhập từ file excel
                    </Typography>
                    <input type="file" onChange={handleFileChange}/>
                    <Button
                        variant="contained"
                        color="inherit"
                        startIcon={<PublishIcon/>}
                        onClick={handleUploadFile}
                    >
                        Upload
                    </Button>
                </Box>
            </Box>
            <DataGrid
                columns={columns}
                rows={allCourse}
                autoPageSize

                // paginationOptions={[10,20,50]}
            />
            <AddCourse open={openAdd} handleClose={handleCloseAdd}/>
            <EditCourse
                open={openEdit}
                handleClose={handleCloseEdit}
                course={course}
            />
        </Box>
    );
};

const AddCourse = ({open, handleClose}) => {
    const [id, setId] = useState("");
    const [courseName, setCourseName] = useState("");
    const [courseNameE, setCourseNameE] = useState("");
    const [courseType, setCourseType] = useState("");
    const [credit, setCredit] = useState("");
    const [creditInfo, setCreditInfo] = useState("");
    const [needExperiment, setNeedExperiment] = useState("");
    const [schoolName, setSchoolName] = useState("");

    const handleAddCourse = () => {
        console.log(
            id,
            className,
            classNameE,
            courseType,
            credit,
            creditInfo,
            needExperiment,
            schoolName
        );
    };

    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <Typography variant="h6" component="h2" fontWeight="bold">
                    Thêm học phần
                </Typography>
                <Divider sx={{mt: 2}}/>
                <Box>
                    <Typography
                        variant="body1"
                        component="p"
                        fontWeight="bold"
                        sx={{mt: 2}}
                    >
                        Mã học phần<span style={{color: "red"}}>*</span>
                    </Typography>
                    <TextField
                        type="text"
                        variant="outlined"
                        size="small"
                        fullWidth
                        placeholder="Nhập mã học phần"
                        value={id}
                        onChange={(e) => setId(e.target.value)}
                    />
                </Box>
                <Box>
                    <Typography
                        variant="body1"
                        component="p"
                        fontWeight="bold"
                        sx={{mt: 2}}
                    >
                        Tên học phần<span style={{color: "red"}}>*</span>
                    </Typography>
                    <TextField
                        type="text"
                        variant="outlined"
                        size="small"
                        fullWidth
                        placeholder="Nhập tên học phần"
                        value={courseName}
                        onChange={(e) => setCourseName(e.target.value)}
                    />
                </Box>
                <Box>
                    <Typography
                        variant="body1"
                        component="p"
                        fontWeight="bold"
                        sx={{mt: 2}}
                    >
                        Tên học phần TA<span style={{color: "red"}}>*</span>
                    </Typography>
                    <TextField
                        type="text"
                        variant="outlined"
                        size="small"
                        fullWidth
                        placeholder="Nhập tên học phần TA"
                        value={courseNameE}
                        onChange={(e) => setCourseNameE(e.target.value)}
                    />
                </Box>
                <Box>
                    <Typography
                        variant="body1"
                        component="p"
                        fontWeight="bold"
                        sx={{mt: 2}}
                    >
                        Loại học phần<span style={{color: "red"}}>*</span>
                    </Typography>
                    <TextField
                        type="text"
                        variant="outlined"
                        size="small"
                        fullWidth
                        placeholder="Nhập loại học phần"
                        value={courseType}
                        onChange={(e) => setCourseType(e.target.value)}
                    />
                </Box>
                <Box>
                    <Typography
                        variant="body1"
                        component="p"
                        fontWeight="bold"
                        sx={{mt: 2}}
                    >
                        Số tín chỉ<span style={{color: "red"}}>*</span>
                    </Typography>
                    <TextField
                        type="text"
                        variant="outlined"
                        size="small"
                        fullWidth
                        placeholder="Nhập số tín chỉ"
                        value={credit}
                        onChange={(e) => setCredit(e.target.value)}
                    />
                </Box>
                <Box>
                    <Typography
                        variant="body1"
                        component="p"
                        fontWeight="bold"
                        sx={{mt: 2}}
                    >
                        Chi tiết<span style={{color: "red"}}>*</span>
                    </Typography>
                    <TextField
                        type="text"
                        variant="outlined"
                        size="small"
                        fullWidth
                        placeholder="Nhập chi tiết"
                        value={creditInfo}
                        onChange={(e) => setCreditInfo(e.target.value)}
                    />
                </Box>
                <Box>
                    <Typography
                        variant="body1"
                        component="p"
                        fontWeight="bold"
                        sx={{mt: 2}}
                    >
                        Cần TN<span style={{color: "red"}}>*</span>
                    </Typography>
                    <TextField
                        type="text"
                        variant="outlined"
                        size="small"
                        fullWidth
                        placeholder="Nhập cần TN"
                        value={needExperiment}
                        onChange={(e) => setNeedExperiment(e.target.value)}
                    />
                </Box>
                <Box>
                    <Typography
                        variant="body1"
                        component="p"
                        fontWeight="bold"
                        sx={{mt: 2}}
                    >
                        Đơn vị QL<span style={{color: "red"}}>*</span>
                    </Typography>
                    <TextField
                        type="text"
                        variant="outlined"
                        size="small"
                        fullWidth
                        placeholder="Nhập đơn vị QL"
                        value={schoolName}
                        onChange={(e) => setSchoolName(e.target.value)}
                    />
                </Box>
                <Box
                    sx={{
                        mt: 2,
                        display: "flex",
                        justifyContent: "flex-end",
                        alignItems: "center",
                    }}
                >
                    <Button variant="outlined" color="primary" onClick={handleClose}>
                        Hủy
                    </Button>
                    <Button
                        variant="contained"
                        color="primary"
                        sx={{ml: 1}}
                        onClick={handleAddCourse}
                    >
                        Thêm
                    </Button>
                </Box>
            </Box>
        </Modal>
    );
};

const EditCourse = ({open, handleClose, course}) => {
    const [id, setId] = useState("");
    const [courseName, setCourseName] = useState("");
    const [courseNameE, setCourseNameE] = useState("");
    const [courseType, setCourseType] = useState("");
    const [credit, setCredit] = useState("");
    const [creditInfo, setCreditInfo] = useState("");
    const [needExperiment, setNeedExperiment] = useState("");
    const [schoolName, setSchoolName] = useState("");

    useEffect(() => {
        if (course) {
            setId(course.id);
            setCourseName(course.courseName);
            setCourseNameE(course.courseNameE);
            setCourseType(course.courseType);
            setCredit(course.credit);
            setCreditInfo(course.creditInfo);
            setNeedExperiment(course.needExperiment);
            setSchoolName(course.schoolName);
        }
    }, [course]);

    const handleUpdateCourse = () => {
        console.log(
            id,
            className,
            classNameE,
            courseType,
            credit,
            creditInfo,
            needExperiment,
            schoolName
        );
    };

    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <Typography variant="h6" component="h2" fontWeight="bold">
                    Cập nhật thông tin học phần
                </Typography>
                <Divider sx={{mt: 2}}/>
                <Box>
                    <Typography
                        variant="body1"
                        component="p"
                        fontWeight="bold"
                        sx={{mt: 2}}
                    >
                        Mã học phần<span style={{color: "red"}}>*</span>
                    </Typography>
                    <TextField
                        type="text"
                        variant="outlined"
                        size="small"
                        fullWidth
                        placeholder="Nhập mã học phần"
                        value={id}
                        onChange={(e) => setId(e.target.value)}
                    />
                </Box>
                <Box>
                    <Typography
                        variant="body1"
                        component="p"
                        fontWeight="bold"
                        sx={{mt: 2}}
                    >
                        Tên học phần<span style={{color: "red"}}>*</span>
                    </Typography>
                    <TextField
                        type="text"
                        variant="outlined"
                        size="small"
                        fullWidth
                        placeholder="Nhập tên học phần"
                        value={courseName}
                        onChange={(e) => setCourseName(e.target.value)}
                    />
                </Box>
                <Box>
                    <Typography
                        variant="body1"
                        component="p"
                        fontWeight="bold"
                        sx={{mt: 2}}
                    >
                        Tên học phần TA<span style={{color: "red"}}>*</span>
                    </Typography>
                    <TextField
                        type="text"
                        variant="outlined"
                        size="small"
                        fullWidth
                        placeholder="Nhập tên học phần TA"
                        value={courseNameE}
                        onChange={(e) => setCourseNameE(e.target.value)}
                    />
                </Box>
                <Box>
                    <Typography
                        variant="body1"
                        component="p"
                        fontWeight="bold"
                        sx={{mt: 2}}
                    >
                        Loại học phần<span style={{color: "red"}}>*</span>
                    </Typography>
                    <TextField
                        type="text"
                        variant="outlined"
                        size="small"
                        fullWidth
                        placeholder="Nhập loại học phần"
                        value={courseType}
                        onChange={(e) => setCourseType(e.target.value)}
                    />
                </Box>
                <Box>
                    <Typography
                        variant="body1"
                        component="p"
                        fontWeight="bold"
                        sx={{mt: 2}}
                    >
                        Số tín chỉ<span style={{color: "red"}}>*</span>
                    </Typography>
                    <TextField
                        type="text"
                        variant="outlined"
                        size="small"
                        fullWidth
                        placeholder="Nhập số tín chỉ"
                        value={credit}
                        onChange={(e) => setCredit(e.target.value)}
                    />
                </Box>
                <Box>
                    <Typography
                        variant="body1"
                        component="p"
                        fontWeight="bold"
                        sx={{mt: 2}}
                    >
                        Chi tiết<span style={{color: "red"}}>*</span>
                    </Typography>
                    <TextField
                        type="text"
                        variant="outlined"
                        size="small"
                        fullWidth
                        placeholder="Nhập chi tiết"
                        value={creditInfo}
                        onChange={(e) => setCreditInfo(e.target.value)}
                    />
                </Box>
                <Box>
                    <Typography
                        variant="body1"
                        component="p"
                        fontWeight="bold"
                        sx={{mt: 2}}
                    >
                        Cần TN<span style={{color: "red"}}>*</span>
                    </Typography>
                    <TextField
                        type="text"
                        variant="outlined"
                        size="small"
                        fullWidth
                        placeholder="Nhập cần TN"
                        value={needExperiment}
                        onChange={(e) => setNeedExperiment(e.target.value)}
                    />
                </Box>
                <Box>
                    <Typography
                        variant="body1"
                        component="p"
                        fontWeight="bold"
                        sx={{mt: 2}}
                    >
                        Đơn vị QL<span style={{color: "red"}}>*</span>
                    </Typography>
                    <TextField
                        type="text"
                        variant="outlined"
                        size="small"
                        fullWidth
                        placeholder="Nhập đơn vị QL"
                        value={schoolName}
                        onChange={(e) => setSchoolName(e.target.value)}
                    />
                </Box>
                <Box
                    sx={{
                        mt: 2,
                        display: "flex",
                        justifyContent: "flex-end",
                        alignItems: "center",
                    }}
                >
                    <Button variant="outlined" color="primary" onClick={handleClose}>
                        Hủy
                    </Button>
                    <Button
                        variant="contained"
                        color="primary"
                        sx={{ml: 1}}
                        onClick={handleUpdateCourse}
                    >
                        Cập nhật
                    </Button>
                </Box>
            </Box>
        </Modal>
    );
};
