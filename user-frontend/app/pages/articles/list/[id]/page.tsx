'use client'

import { useRouter } from "next/navigation"
import { DataGrid } from '@mui/x-data-grid';
import { useState, useEffect } from "react"
import { Box, Button, Input } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux'
import { NextPage } from "next";
import { findAllArticles } from "@/app/component/article/service/article-service";
import ArticlesColumns from "@/app/component/article/module/articles-columns";
import { getAllArticles } from "@/app/component/article/service/article-slice";
import MoveButton from "@/app/atoms/button/MoveButton";
import { PG } from "@/app/component/common/enums/PG";
import { parseCookies } from "nookies";
// import React from "react";




const ArticleListPage: NextPage = ({ params }: any) => {
  const dispatch = useDispatch()
  const allArticles: [] = useSelector(getAllArticles)    
  const [writeCheck, setWriteCheck] = useState(false)

const handleWrite = () => {
    if (parseCookies().accessToken !== undefined && params.id !== '3'){
      setWriteCheck(true)
    } else {
      setWriteCheck(false)
      console.log('로그인이 필요합니다.')
    }
}
  useEffect(() => {
    dispatch(findAllArticles(params.id))
    console.log(typeof(params.id))
    handleWrite()
  }, [])

  return (<>
    <h2>게시글 목록</h2>
    <table className="container" >
      <thead>
        <tr>
          <td>
            {writeCheck && <MoveButton text={"글쓰기"} path={`${PG.ARTICLE}/save`} />}
          </td>
        </tr>
      </thead>
      <tbody>

        <tr>
          <td>
            <Box sx={{ height: 600, width: '100%' }}>
              {allArticles && <DataGrid
                rows={allArticles}
                columns={ArticlesColumns()}
                initialState={{
                  pagination: {
                    paginationModel: {
                      pageSize: 10,
                    },
                  },
                }}
                pageSizeOptions={[10]}
                checkboxSelection
                disableRowSelectionOnClick
              />}
            </Box>
          </td>
        </tr>
      </tbody>
    </table>
  </>)
}

export default ArticleListPage