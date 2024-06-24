import {Box} from "@mui/material";
import {DataGrid} from "@mui/x-data-grid";

export const AdminMgmt = ({allAdmin}) => {
    const dataAllStudent = allAdmin.map(adminInfo => {
        return {
            id: adminInfo.email,
            name: adminInfo.name,
            active: adminInfo.active,
        }
    });

    const columns = [
        {
            field: 'id',
            header: 'email',
            flex: 100
        },
        {field: 'name',header: "Tên CB", flex: 200},
        {field: 'active',header: 'Đang hoạt động',flex: 80}
    ]

    return (
        <Box sx={{height:'80vh',width:'100%'}}>
            <DataGrid
                columns={columns}
                rows={dataAllStudent}
                autoPageSize

                // paginationOptions={[10,20,50]}
            >

            </DataGrid>
        </Box>
    )
}