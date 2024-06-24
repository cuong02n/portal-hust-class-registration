import {Box} from "@mui/material";
import {DataGrid} from "@mui/x-data-grid";

export const CourseRelationShipMgmt = ({allRelation})=>{

    const columns = [
        {field: 'id',headerName: 'Mã HP',flex: 100},
        {field: 'courseId',headerName: "Mã học phần", flex: 200},
        {field: 'courseConstraintId',headerName: 'Mã Hp điều kiện',flex:200},
        {field: 'relation',headerName: 'Loại ràng buộc',flex: 80},
    ]

    return (
        <Box sx={{height:'80vh',width:'100%'}}>
            <DataGrid
                columns={columns}
                rows={allRelation}
                autoPageSize

                // paginationOptions={[10,20,50]}
            >

            </DataGrid>
        </Box>
    )
}