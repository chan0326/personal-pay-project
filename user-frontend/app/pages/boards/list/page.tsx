'use client'
import CardButton from "@/app/atoms/button/CardButton"
import { IBoard } from "@/app/component/board/model/board"
import { findAllBoards, findBoardById } from "@/app/component/board/service/board-service"
import { getAllBoards } from "@/app/component/board/service/board-slice"
import { log } from "console"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"

export default function BoardCards() {
    const dispatch = useDispatch()
    const allBoard = useSelector(getAllBoards)
    
    useEffect(() => {
        dispatch(findAllBoards())
    }, [])

    return (<>
        <h2>게시판 목록 들어옴</h2>
        {allBoard.map((board:IBoard)=>(
           <CardButton key={board.id} id={board.id} title={board.title} description={board.description} />
        ))}
    </>)
}