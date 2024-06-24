import {
  Box,
  Button,
  Divider,
  Modal,
  TextField,
  Typography,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
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
  p: 4,
};

export const StudentMgmt = ({ allStudent }) => {
  const [openAdd, setOpenAdd] = useState(false);
  const handleOpenAdd = () => setOpenAdd(true);
  const handleCloseAdd = () => setOpenAdd(false);

  const [openEdit, setOpenEdit] = useState(false);
  const handleCloseEdit = () => setOpenEdit(false);
  const [student, setStudent] = useState({});
  const [file, setFile] = useState(null);

  // console.log(allStudent.length);
  const dataAllStudent = allStudent.map((studentInfo) => {
    return {
      id: "20" + studentInfo.email.split("@")[0].slice(-6),
      name: studentInfo.name,
      className: studentInfo.studentClassName,
      active: studentInfo.active,
      maxCredit: studentInfo.maxCredit,
    };
  });

  const handleOpenEdit = (row) => {
    setStudent(row);
    setOpenEdit(true);
  };

  const columns = [
    {
      field: "id",
      headerName: "Mssv",
      flex: 150,
    },
    { field: "name", headerName: "Tên SV", flex: 300 },
    { field: "className", headerName: "Lớp SV", flex: 250 },
    { field: "maxCredit", headerName: "TC tối đa", flex: 100 },
    { field: "active", headerName: "Đang hoạt động", flex: 200 },
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
          <EditIcon />
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
          <DeleteIcon />
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
    <Box sx={{ height: "80vh", width: "100%" }}>
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
          sx={{ marginBottom: "15px" }}
          startIcon={<AddIcon />}
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
          <input type="file" onChange={handleFileChange} />
          <Button
            variant="contained"
            color="inherit"
            startIcon={<PublishIcon />}
            onClick={handleUploadFile}
          >
            Upload
          </Button>
        </Box>
      </Box>
      <DataGrid
        columns={columns}
        rows={dataAllStudent}
        autoPageSize

        // paginationOptions={[10,20,50]}
      />
      <AddStudent open={openAdd} handleClose={handleCloseAdd} />
      <EditStudent
        open={openEdit}
        handleClose={handleCloseEdit}
        student={student}
      />
    </Box>
  );
};

const AddStudent = ({ open, handleClose }) => {
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [className, setClassName] = useState("");

  const handleAddStudent = () => {
    console.log(id, name, className);
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
          Thêm sinh viên
        </Typography>
        <Divider sx={{ mt: 2 }} />
        <Box>
          <Typography
            variant="body1"
            component="p"
            fontWeight="bold"
            sx={{ mt: 2 }}
          >
            Mã sinh viên<span style={{ color: "red" }}>*</span>
          </Typography>
          <TextField
            type="text"
            variant="outlined"
            size="small"
            fullWidth
            placeholder="Nhập mã sinh viên"
            value={id}
            onChange={(e) => setId(e.target.value)}
          />
        </Box>
        <Box>
          <Typography
            variant="body1"
            component="p"
            fontWeight="bold"
            sx={{ mt: 2 }}
          >
            Tên sinh viên<span style={{ color: "red" }}>*</span>
          </Typography>
          <TextField
            type="text"
            variant="outlined"
            size="small"
            fullWidth
            placeholder="Nhập tên sinh viên"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </Box>
        <Box>
          <Typography
            variant="body1"
            component="p"
            fontWeight="bold"
            sx={{ mt: 2 }}
          >
            Tên lớp<span style={{ color: "red" }}>*</span>
          </Typography>
          <TextField
            type="text"
            variant="outlined"
            size="small"
            fullWidth
            placeholder="Nhập tên lớp"
            value={className}
            onChange={(e) => setClassName(e.target.value)}
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
            sx={{ ml: 1 }}
            onClick={handleAddStudent}
          >
            Thêm
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

const EditStudent = ({ open, handleClose, student }) => {
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [className, setClassName] = useState("");

  useEffect(() => {
    if (student) {
      setId(student.id);
      setName(student.name);
      setClassName(student.className);
    }
  }, [student]);

  const handleUpdateStudent = () => {
    console.log(id, name, className);
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
          Cập nhật thông tin sinh viên
        </Typography>
        <Divider sx={{ mt: 2 }} />
        <Box>
          <Typography
            variant="body1"
            component="p"
            fontWeight="bold"
            sx={{ mt: 2 }}
          >
            Mã sinh viên<span style={{ color: "red" }}>*</span>
          </Typography>
          <TextField
            type="text"
            variant="outlined"
            size="small"
            fullWidth
            placeholder="Nhập mã sinh viên"
            value={id}
            onChange={(e) => setId(e.target.value)}
          />
        </Box>
        <Box>
          <Typography
            variant="body1"
            component="p"
            fontWeight="bold"
            sx={{ mt: 2 }}
          >
            Tên sinh viên<span style={{ color: "red" }}>*</span>
          </Typography>
          <TextField
            type="text"
            variant="outlined"
            size="small"
            fullWidth
            placeholder="Nhập tên sinh viên"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </Box>
        <Box>
          <Typography
            variant="body1"
            component="p"
            fontWeight="bold"
            sx={{ mt: 2 }}
          >
            Tên lớp<span style={{ color: "red" }}>*</span>
          </Typography>
          <TextField
            type="text"
            variant="outlined"
            size="small"
            fullWidth
            placeholder="Nhập tên lớp"
            value={className}
            onChange={(e) => setClassName(e.target.value)}
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
            sx={{ ml: 1 }}
            onClick={handleUpdateStudent}
          >
            Cập nhật
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};
