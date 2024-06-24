import {
  Box,
  Button,
  Divider,
  Modal,
  TextField,
  Typography,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import { useEffect, useState } from "react";

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

export const AdminMgmt = ({ allAdmin }) => {
  const [openAdd, setOpenAdd] = useState(false);
  const handleOpenAdd = () => setOpenAdd(true);
  const handleCloseAdd = () => setOpenAdd(false);

  const [openEdit, setOpenEdit] = useState(false);
  const handleCloseEdit = () => setOpenEdit(false);
  const [admin, setAdmin] = useState({});

  const handleOpenEdit = (row) => {
    setAdmin(row);
    setOpenEdit(true);
  };

  const dataAllStudent = allAdmin.map((adminInfo) => {
    return {
      id: adminInfo.email,
      name: adminInfo.name,
      active: adminInfo.active,
    };
  });

  const columns = [
    {
      field: "id",
      headerName: "Email",
      flex: 100,
    },
    { field: "name", headerName: "Tên CB", flex: 200 },
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

  return (
    <Box sx={{ height: "80vh", width: "100%" }}>
      <Button
        variant="contained"
        color="success"
        onClick={handleOpenAdd}
        sx={{ marginBottom: "15px" }}
        startIcon={<AddIcon />}
      >
        Thêm
      </Button>
      <DataGrid
        columns={columns}
        rows={dataAllStudent}
        autoPageSize

        // paginationOptions={[10,20,50]}
      />
      <AddAdmin open={openAdd} handleClose={handleCloseAdd} />
      <EditAdmin open={openEdit} handleClose={handleCloseEdit} admin={admin} />
    </Box>
  );
};

const AddAdmin = ({ open, handleClose }) => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");

  const handleAddStudent = () => {
    console.log(email, name);
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
          Thêm cán bộ
        </Typography>
        <Divider sx={{ mt: 2 }} />
        <Box>
          <Typography
            variant="body1"
            component="p"
            fontWeight="bold"
            sx={{ mt: 2 }}
          >
            Email<span style={{ color: "red" }}>*</span>
          </Typography>
          <TextField
            type="email"
            variant="outlined"
            size="small"
            fullWidth
            placeholder="Nhập email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Box>
        <Box>
          <Typography
            variant="body1"
            component="p"
            fontWeight="bold"
            sx={{ mt: 2 }}
          >
            Tên cán bộ<span style={{ color: "red" }}>*</span>
          </Typography>
          <TextField
            type="text"
            variant="outlined"
            size="small"
            fullWidth
            placeholder="Nhập tên cán bộ"
            value={name}
            onChange={(e) => setName(e.target.value)}
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

const EditAdmin = ({ open, handleClose, admin }) => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");

  useEffect(() => {
    if (admin) {
      setEmail(admin.email);
      setName(admin.name);
    }
  }, [admin]);

  const handleUpdateStudent = () => {
    console.log(email, name);
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
          Cập nhật thông tin cán bộ
        </Typography>
        <Divider sx={{ mt: 2 }} />
        <Box>
          <Typography
            variant="body1"
            component="p"
            fontWeight="bold"
            sx={{ mt: 2 }}
          >
            Email<span style={{ color: "red" }}>*</span>
          </Typography>
          <TextField
            type="email"
            variant="outlined"
            size="small"
            fullWidth
            placeholder="Nhập email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Box>
        <Box>
          <Typography
            variant="body1"
            component="p"
            fontWeight="bold"
            sx={{ mt: 2 }}
          >
            Tên cán bộ<span style={{ color: "red" }}>*</span>
          </Typography>
          <TextField
            type="text"
            variant="outlined"
            size="small"
            fullWidth
            placeholder="Nhập tên cán bộ"
            value={name}
            onChange={(e) => setName(e.target.value)}
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
