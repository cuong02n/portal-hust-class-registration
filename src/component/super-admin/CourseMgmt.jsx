import {Box} from "@mui/material";
import {DataGrid} from "@mui/x-data-grid";

export const CourseMgmt = ({allCourse}) => {

    const columns = [
        {field: 'id',headerName: 'Mã HP',flex: 100},
        {field: 'courseName',headerName: "Tên HP", flex: 200},
        {field: 'courseNameE',headerName: 'Tên HP TA',flex:200},
        {field: 'courseType',headerName: 'Loại HP',flex: 80},
        {field: 'credit',headerName: 'Số TC',flex: 80},
        {field: 'creditInfo',headerName: "Chi tiết",flex: 100},
        {field: 'needExperiment',headerName: 'Cần TN',flex: 60},
        {field: 'schoolName',headerName: 'Đơn vị QL',flex: 100}
    ]

    return (
        <Box sx={{height:'80vh',width:'100%'}}>
            <DataGrid
                columns={columns}
                rows={allCourse}
                autoPageSize

                // paginationOptions={[10,20,50]}
            >

            </DataGrid>
        </Box>
    )
}