
import { PG } from "@/app/component/common/enums/PG";
import { Rethink_Sans } from "next/font/google";
import Link from "next/link";

interface ILinkButton {
    id: number
    title: string
    path: string
}

export  const linkButtonTitles = [
    {id:1, title:'Review', path:`${PG.ARTICLE}/list/1`},
    {id:2, title:'고객센터', path:`${PG.ARTICLE}/list/2`},
    // 다른 게시판 구현 시 추가 예정
  ];


export default function LinkButton({id, title, path}: ILinkButton) {
    return ( <Link href={`${path}`}
                    className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent
                     md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500
                      dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent
                       dark:border-gray-700" aria-current="page">
                        {title}
            </Link>)
    }

export const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];