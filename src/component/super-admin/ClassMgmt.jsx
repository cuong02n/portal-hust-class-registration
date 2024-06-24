import {Box} from "@mui/material";
import {DataGrid} from "@mui/x-data-grid";

export const ClassMgmt = ({allClasses}) => {

    const columns = [
        {field: 'id',headerName: 'Mã Lớp',flex: 100},
        {field: 'theoryClassId',headerName: 'Mã lớp kèm',flex: 100},
        {field: 'courseId',headerName: "Mã HP", flex: 200},
        {field: 'classType',headerName: '"THEORY_EXERCISE"',flex:200},
        {field: 'maxStudent',headerName: 'MAX SV',flex: 80},
        {field: 'semester',headerName: 'Kì',flex: 80},
        {field: 'status',headerName: 'Trạng thái',flex: 60},
    ]

    return (
        <Box sx={{height:'80vh',width:'100%'}}>
            <DataGrid
                columns={columns}
                rows={allClasses}
                autoPageSize
            >

            </DataGrid>
        </Box>
    )
}