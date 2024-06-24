import {Box} from "@mui/material";
import {DataGrid} from "@mui/x-data-grid";

export const StudentMgmt = ({allStudent}) => {
    console.log(allStudent.length)
    const dataAllStudent = allStudent.map(studentInfo => {
        return {
            id: '20' + studentInfo.email.split('@')[0].slice(-6),
            name: studentInfo.name,
            className: studentInfo.studentClassName,
            active: studentInfo.active,
            maxCredit: studentInfo.maxCredit,

        }
    });

    const columns = [
        {
            field: 'id',
            header: 'Mssv',
            flex: 100
        },
        {field: 'name',header: "Tên SV", flex: 200},
        {field: 'className',header: 'Lớp SV',flex:200},
        {field: 'maxCredit',header: 'TC tối đa',flex: 80},
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