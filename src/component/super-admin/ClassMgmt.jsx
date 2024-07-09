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

export const ClassMgmt = ({allClasses}) => {
    const [openAdd, setOpenAdd] = useState(false);
    const handleOpenAdd = () => setOpenAdd(true);
    const handleCloseAdd = () => setOpenAdd(false);

    const [openEdit, setOpenEdit] = useState(false);
    const handleCloseEdit = () => setOpenEdit(false);
    const [clazz, setClazz] = useState({});
    const [file, setFile] = useState(null);

    const handleOpenEdit = (row) => {
        setClazz(row);
        setOpenEdit(true);
    };

    const columns = [
        {field: "id", headerName: "Mã Lớp", flex: 100},
        {field: "theoryClassId", headerName: "Mã lớp kèm", flex: 100},
        {field: "courseId", headerName: "Mã HP", flex: 200},
        {field: "classType", headerName: '"THEORY_EXERCISE"', flex: 200},
        {field: "maxStudent", headerName: "MAX SV", flex: 80},
        {field: "semester", headerName: "Kì", flex: 80},
        {field: "status", headerName: "Trạng thái", flex: 120},
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
            <DataGrid columns={columns} rows={allClasses} autoPageSize/>
            <AddClazz open={openAdd} handleClose={handleCloseAdd}/>
            <EditClazz open={openEdit} handleClose={handleCloseEdit} clazz={clazz}/>
        </Box>
    );
};

const AddClazz = ({open, handleClose}) => {
    const [id, setId] = useState("");
    const [theoryClassId, setTheoryClassId] = useState("");
    const [courseId, setCourseId] = useState("");
    const [classType, setClassType] = useState("");
    const [maxStudent, setMaxStudent] = useState("");
    const [semester, setSemester] = useState("");
    const [status, setStatus] = useState("");

    const handleAddClazz = () => {
        console.log(
            id,
            theoryClassId,
            courseId,
            classType,
            maxStudent,
            semester,
            status
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
                    Thêm lớp học
                </Typography>
                <Divider sx={{mt: 2}}/>
                <Box>
                    <Typography
                        variant="body1"
                        component="p"
                        fontWeight="bold"
                        sx={{mt: 2}}
                    >
                        Mã lớp học<span style={{color: "red"}}>*</span>
                    </Typography>
                    <TextField
                        type="text"
                        variant="outlined"
                        size="small"
                        fullWidth
                        placeholder="Nhập mã lớp học"
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
                        Mã lớp kèm<span style={{color: "red"}}>*</span>
                    </Typography>
                    <TextField
                        type="text"
                        variant="outlined"
                        size="small"
                        fullWidth
                        placeholder="Nhập mã lớp kèm"
                        value={theoryClassId}
                        onChange={(e) => setTheoryClassId(e.target.value)}
                    />
                </Box>
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
                        value={courseId}
                        onChange={(e) => setCourseId(e.target.value)}
                    />
                </Box>
                <Box>
                    <Typography
                        variant="body1"
                        component="p"
                        fontWeight="bold"
                        sx={{mt: 2}}
                    >
                        THEORY_EXERCISE<span style={{color: "red"}}>*</span>
                    </Typography>
                    <TextField
                        type="text"
                        variant="outlined"
                        size="small"
                        fullWidth
                        placeholder="Nhập THEORY_EXERCISE"
                        value={classType}
                        onChange={(e) => setClassType(e.target.value)}
                    />
                </Box>
                <Box>
                    <Typography
                        variant="body1"
                        component="p"
                        fontWeight="bold"
                        sx={{mt: 2}}
                    >
                        Max SV<span style={{color: "red"}}>*</span>
                    </Typography>
                    <TextField
                        type="text"
                        variant="outlined"
                        size="small"
                        fullWidth
                        placeholder="Nhập max sv"
                        value={maxStudent}
                        onChange={(e) => setMaxStudent(e.target.value)}
                    />
                </Box>
                <Box>
                    <Typography
                        variant="body1"
                        component="p"
                        fontWeight="bold"
                        sx={{mt: 2}}
                    >
                        Kì<span style={{color: "red"}}>*</span>
                    </Typography>
                    <TextField
                        type="text"
                        variant="outlined"
                        size="small"
                        fullWidth
                        placeholder="Nhập kì"
                        value={semester}
                        onChange={(e) => setSemester(e.target.value)}
                    />
                </Box>
                <Box>
                    <Typography
                        variant="body1"
                        component="p"
                        fontWeight="bold"
                        sx={{mt: 2}}
                    >
                        Trạng thái<span style={{color: "red"}}>*</span>
                    </Typography>
                    <TextField
                        type="text"
                        variant="outlined"
                        size="small"
                        fullWidth
                        placeholder="Nhập trạng thái"
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
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
                        onClick={handleAddClazz}
                    >
                        Thêm
                    </Button>
                </Box>
            </Box>
        </Modal>
    );
};

const EditClazz = ({open, handleClose, clazz}) => {
    const [id, setId] = useState("");
    const [theoryClassId, setTheoryClassId] = useState("");
    const [courseId, setCourseId] = useState("");
    const [classType, setClassType] = useState("");
    const [maxStudent, setMaxStudent] = useState("");
    const [semester, setSemester] = useState("");
    const [status, setStatus] = useState("");

    useEffect(() => {
        if (clazz) {
            setId(clazz.id);
            setTheoryClassId(clazz.theoryClassId);
            setCourseId(clazz.courseId);
            setClassType(clazz.classType);
            setMaxStudent(clazz.maxStudent);
            setSemester(clazz.semester);
            setStatus(clazz.status);
        }
    }, [clazz]);

    const handleUpdateClazz = () => {
        console.log(
            id,
            theoryClassId,
            courseId,
            classType,
            maxStudent,
            semester,
            status
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
                    Cập nhật thông tin lớp học
                </Typography>
                <Divider sx={{mt: 2}}/>
                <Box>
                    <Typography
                        variant="body1"
                        component="p"
                        fontWeight="bold"
                        sx={{mt: 2}}
                    >
                        Mã lớp học<span style={{color: "red"}}>*</span>
                    </Typography>
                    <TextField
                        type="text"
                        variant="outlined"
                        size="small"
                        fullWidth
                        placeholder="Nhập mã lớp học"
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
                        Mã lớp kèm<span style={{color: "red"}}>*</span>
                    </Typography>
                    <TextField
                        type="text"
                        variant="outlined"
                        size="small"
                        fullWidth
                        placeholder="Nhập mã lớp kèm"
                        value={theoryClassId}
                        onChange={(e) => setTheoryClassId(e.target.value)}
                    />
                </Box>
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
                        value={courseId}
                        onChange={(e) => setCourseId(e.target.value)}
                    />
                </Box>
                <Box>
                    <Typography
                        variant="body1"
                        component="p"
                        fontWeight="bold"
                        sx={{mt: 2}}
                    >
                        THEORY_EXERCISE<span style={{color: "red"}}>*</span>
                    </Typography>
                    <TextField
                        type="text"
                        variant="outlined"
                        size="small"
                        fullWidth
                        placeholder="Nhập THEORY_EXERCISE"
                        value={classType}
                        onChange={(e) => setClassType(e.target.value)}
                    />
                </Box>
                <Box>
                    <Typography
                        variant="body1"
                        component="p"
                        fontWeight="bold"
                        sx={{mt: 2}}
                    >
                        Max SV<span style={{color: "red"}}>*</span>
                    </Typography>
                    <TextField
                        type="text"
                        variant="outlined"
                        size="small"
                        fullWidth
                        placeholder="Nhập max sv"
                        value={maxStudent}
                        onChange={(e) => setMaxStudent(e.target.value)}
                    />
                </Box>
                <Box>
                    <Typography
                        variant="body1"
                        component="p"
                        fontWeight="bold"
                        sx={{mt: 2}}
                    >
                        Kì<span style={{color: "red"}}>*</span>
                    </Typography>
                    <TextField
                        type="text"
                        variant="outlined"
                        size="small"
                        fullWidth
                        placeholder="Nhập kì"
                        value={semester}
                        onChange={(e) => setSemester(e.target.value)}
                    />
                </Box>
                <Box>
                    <Typography
                        variant="body1"
                        component="p"
                        fontWeight="bold"
                        sx={{mt: 2}}
                    >
                        Trạng thái<span style={{color: "red"}}>*</span>
                    </Typography>
                    <TextField
                        type="text"
                        variant="outlined"
                        size="small"
                        fullWidth
                        placeholder="Nhập trạng thái"
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
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
                        onClick={handleUpdateClazz}
                    >
                        Cập nhật
                    </Button>
                </Box>
            </Box>
        </Modal>
    );
};
