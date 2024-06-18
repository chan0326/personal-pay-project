'use client'
import { PG } from '@/app/component/common/enums/PG';
import { useRouter } from 'next/navigation';
import { Box, Link } from '@mui/material';
import LinkButton, { linkButtonTitles } from '@/app/atoms/button/LinkButton';
import { useEffect, useState } from 'react';
import { destroyCookie, parseCookies } from 'nookies';
import { logout } from '../../user/service/user-service';
import { useDispatch } from 'react-redux';

function ReferenceHeader() {
  const router = useRouter();
  const dispatch = useDispatch();
  const [showMyPage, setShowMyPage] = useState(false);

  useEffect(() => {
    console.log('헤더 useEffect 쿠키 : ' + parseCookies().accessToken)
    if (parseCookies().accessToken === undefined) {
      console.log('쿠키-X header-X')
      setShowMyPage(false)
    } else {
      console.log('쿠키-O header-O')
      setShowMyPage(true)
    }
  }, [parseCookies().accessToken])

  const logoutHandler = () => {
    console.log('로그아웃 전 : ' + parseCookies().accessToken)
    dispatch(logout())
      .then((res: any) => {
        destroyCookie(null, 'accessToken')
        setShowMyPage(false)
        console.log('로그아웃 후 : ' + parseCookies().accessToken)
      })
      .catch(((err: any) => {
        console.log('로그아웃 실행에서 에러가 발생함' + err)
      }))
  }

  return <nav className="bg-white border-gray-200 dark:bg-gray-900">
    <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
      <Link href={PG.HOME} className="flex items-center space-x-3 rtl:space-x-reverse">
        <img src="https://flowbite.com/docs/images/logo.svg" className="h-8" alt="Flowbite Logo" />
        <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Toeic! Doit!</span>
      </Link> 
      {/* 버튼 keep
      <button type="button" className="flex text-sm bg-gray-800 rounded-full md:me-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600" id="user-menu-button" aria-expanded="false" data-dropdown-toggle="user-dropdown" data-dropdown-placement="bottom">
        <span className="sr-only">Open user menu</span>
        <img src="https://flowbite.com/docs/images/logo.svg" className="h-8" alt="Flowbite Logo" />
      </button> */}

      {!showMyPage && 
        <div className="flex px-4 py-3 float-end">
          <span className="block text-sm text-gray-900 dark:text-white"><a href={`${PG.USER}/login`}>로그인</a></span>
          <span className="block text-sm  text-gray-500 truncate dark:text-gray-400 mx-5"><a href={`${PG.USER}/join`}>회원가입</a></span>
        </div>
      }
      {showMyPage &&
        <div className="flex px-4 py-3 float-end">
          <span className="block text-sm text-gray-900 dark:text-white"><a href="#">강의실 입장</a></span>
          <span className="block text-sm  text-gray-500 truncate dark:text-gray-400 mx-5"><a href={`${PG.USER}/detail/${1}`}>마이페이지</a></span>
          <span className="block text-sm  text-gray-500 truncate dark:text-gray-400 mx-5"><a href={`${PG.Calendar}/detail/${1}`}>캘린더</a></span>
          <span onClick={logoutHandler} className="block text-sm  text-gray-500 truncate dark:text-gray-400"> <a href='#'>Logout</a></span>
        </div>
      }

      <div className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1" id="navbar-user">
        <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
          {linkButtonTitles.map((item) => (
            <li key={item.id}>
              <LinkButton id={item.id} title={item.title} path={item.path} />
            </li>
          ))}

        </ul>
      </div>
    </div>
  </nav>
}

export default ReferenceHeader;

