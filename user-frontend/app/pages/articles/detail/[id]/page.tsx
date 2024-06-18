'use client'
import { useState, useEffect } from "react"
import { Box, Button, Input, Typography } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux'
import { articleDeleteById, findAllArticles, findArticleById, modifyArticle } from "@/app/component/article/service/article-service";
import { getAllArticles, getArticleById } from "@/app/component/article/service/article-slice";
import { IArticle } from "@/app/component/article/model/article";
import { MyTypography } from "@/app/component/common/style/cell";
import { jwtDecode } from "jwt-decode";
import { parseCookies } from "nookies";

export default function ArticleDetailPage({ params }: any) {
  const dispatch = useDispatch()
  const getArticle: IArticle = useSelector(getArticleById)
  const [article, setArticle] = useState({} as IArticle)


  const handleDelete = () => {
    alert("삭제완료")
    dispatch(articleDeleteById(params.id))
  }
  const update = () => {
    setArticle({ ...article, id: params.id })
    console.log("수정완료")
    console.log(article)
    dispatch(modifyArticle(article))
  }
  const handleTitle = (e: any) => {
    setArticle({ ...article, title: e.target.value })
  }
  const handleContent = (e: any) => {
    setArticle({ ...article, content: e.target.value })
  }

  const handleId = (e: any) => {

  }

  useEffect(() => {
    dispatch(findArticleById(params.id))
    console.log("토큰을 jwtDecode(언박싱)한 내용" + JSON.stringify(jwtDecode<any>(parseCookies().accessToken)))
  }, [])


  return (<>
    <h3>{getArticle.id}번 게시판 상세</h3>

    <span>ID</span><Typography textAlign="center" sx={{ fontSize: "1.5rem" }} >  {getArticle.id}</Typography>
    <span>title</span><Typography textAlign="center" sx={{ fontSize: "1.5rem" }}>  {getArticle.title}</Typography>
    <span>content</span><Typography textAlign="center" sx={{ fontSize: "1.5rem" }}>  {getArticle.content}</Typography>
    <span>registerDate</span><Typography textAlign="center" sx={{ fontSize: "1.5rem" }}>  {getArticle.registerDate}</Typography>
    <span>작성자</span><Typography textAlign="center" sx={{ fontSize: "1.5rem" }}>  {getArticle.writerUsername}</Typography>
    <span>regDate</span><Typography textAlign="center" sx={{ fontSize: "1.5rem" }}>  {getArticle.regDate}</Typography>
    <span>modDate</span><Typography textAlign="center" sx={{ fontSize: "1.5rem" }}>  {getArticle.modDate} </Typography>
    <div className="clearfix">
    </div><br />

    <div className="editor mx-auto w-10/12 flex flex-col text-gray-800 border border-gray-300 p-4 shadow-lg max-w-2xl">
      {MyTypography('게시글 수정', "1.5rem")}


      <input onChange={handleTitle} className="title bg-gray-100 border border-gray-300 p-2 mb-4 outline-none" placeholder="Title" title="text" name="title" />

      <textarea onChange={handleContent} className="content bg-gray-100 sec p-3 h-60 border
   border-gray-300 outline-none" placeholder="Content" name="content"></textarea>

      <div className="buttons flex">
        <div className="btn  overflow-hidden relative w-30 bg-white text-blue-500 p-3 px-4 rounded-xl font-bold uppercase -- before:block before:absolute before:h-full before:w-1/2 before:rounded-full
  before:bg-pink-400 before:top-0 before:left-1/4 before:transition-transform before:opacity-0 before:hover:opacity-100 hover:text-200 hover:before:animate-ping transition-all duration-00"
        >취소</div>

        <button onClick={update} type="submit" className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
          수정
          <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
          </svg>
        </button>

      </div>
    </div>

    <button onClick={handleDelete} className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-red-700 rounded-lg hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
      삭제
      <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
      </svg>
    </button>

  </>)
}