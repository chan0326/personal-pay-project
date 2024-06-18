'use client'
import { IUser } from "@/app/component/user/model/user"
import UserColumns from "@/app/component/user/module/users-columns"
import { findAllUsers } from "@/app/component/user/service/user-service"
import { getAllUsers } from "@/app/component/user/service/user-slice"
import { DataGrid } from "@mui/x-data-grid"
import { NextPage } from "next"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"

const UsersPage: NextPage = () => {
  const [pageSize, setPageSize] = useState(5);
  const dispatch = useDispatch()

 const allUsers: [] = useSelector(getAllUsers)

  if(allUsers !== undefined){
      console.log('allUser is not undefined')
      
      console.log('length is '+ allUsers.length)
      for(let i=0; i< allUsers.length; i++){
          console.log(JSON.stringify(allUsers[i]))
      }
  }else{
      console.log('allUser is undefined')
  }
  

  useEffect(() => {
      dispatch(findAllUsers(1))
  }, [])

  return (<>
        <h2>사용자 목록</h2>
        <div style={{ height: 600, width: "100%" }}>
      {allUsers && <DataGrid 
        rows={allUsers}
        columns={UserColumns()}
        pageSizeOptions={[5, 10, 20]} 
        checkboxSelection
      />}
    </div>
  </>)
}

  export default UsersPage


