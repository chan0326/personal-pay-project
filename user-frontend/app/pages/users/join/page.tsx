'use client';
import { API } from '@/app/component/common/enums/API';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useRef, useState } from 'react';
import { NextPage } from 'next';
import { IUser } from '@/app/component/user/model/user';
import { getExistsId } from '@/app/component/user/service/user-slice';
import { useDispatch, useSelector } from 'react-redux';
import { existsId, save } from '@/app/component/user/service/user-service';
import { PG } from '@/app/component/common/enums/PG';
import MoveButton from '@/app/atoms/button/MoveButton';

const JoinPage: NextPage = () => {
    const router = useRouter();
    const dispatch = useDispatch();
    const [idCheck, setIdCheck] = useState('')
    const [user, setUser] = useState({} as IUser)
    const [pwCheck, setPwCheck] = useState('')
    const IsWrongId = useSelector(getExistsId)
    const PasswordRef = useRef<HTMLInputElement>(null);

    const handleUsername = (e: any) => {
        const ID_CHECK = /^[a-zA-Z][a-zA-Z0-9]{5,19}$/g;
        if (ID_CHECK.test(e.target.value)) {
            setIdCheck('true')
            setUser({ ...user, username: e.target.value })
        } else {
            setIdCheck('false')
        }
    }

    const handlePassword = (e: any) => {
        const PW_CHECK = /^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[\{\}\[\]\/?.,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"]).{7,19}$/g;
        if (PW_CHECK.test(e.target.value)) {
            setPwCheck('true')
            setUser({ ...user, password: e.target.value })
        } else {
            setPwCheck('false')
        }
    }

    const handleName = (e: any) => {
        setUser({ ...user, name: e.target.value })
    }

    const handlePhone = (e: any) => {
        setUser({ ...user, phone: e.target.value })
    }

    const handleAddressId = (e: any) => {
        setUser({ ...user, addressId: e.target.value })
    }

    const handleJob = (e: any) => {
        setUser({ ...user, job: e.target.value })
    }

    const handleSubmit = () => {
        console.log(user)
        dispatch(existsId(user.username))
            .then((res: any) => {
                if (res.payload.message === "FAILURE") {
                    dispatch(save(user))
                        .then((resp: any) => {
                            if (resp.payload.message === "SUCCESS") {
                                console.log('서버에서 넘어온 payload ' + JSON.stringify(resp))
                                console.log("회원 가입 성공")
                                router.push(PG.HOME)
                                router.refresh()
                            }
                        })
                        .catch((err: any) => {
                            console.log("회원 가입실패")
                        })
                } else {
                    console.log("아이디 중복")
                }
            })
            .catch((err: any) => { })
            .finally(() => {
                console.log("최종적으로 반드시 이뤄져야 할 로직")
            })
        if (PasswordRef.current) {
            PasswordRef.current.value = "";
        }
    }
    const handleIdCheck = () => {
        dispatch(existsId(user.username))
            .then((res: any) => {
                if (res.payload.message === "FAILURE") {
                    alert("사용 가능한 아이디입니다.")
                } else {
                    alert("이미 사용중인 아이디입니다.")
                }
            })
            .catch((err: any) => {
                console.log("아이디 중복 확인 실패")
            })
    }

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-purple-400 to-pink-500">
          <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full">
            <h1 className="text-3xl font-bold text-center text-gray-800 mb-4">Create Account</h1>
    
            {/* Form Inputs */}
            <div className="space-y-4">
              {/* Username */}
              <div>
                <label htmlFor="username" className="block text-gray-700 font-bold mb-2">Username</label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  placeholder="Enter Username"
                  required
                  onChange={handleUsername}
                  className="w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring focus:ring-purple-500"
                />
                <p className="text-xs text-gray-500 mt-1">
                  * 6-20 characters, English letters (uppercase/lowercase) or numbers
                </p>
                {idCheck === 'false' && (
                  <p className="text-red-500 text-xs italic mt-1">Invalid username</p>
                )}
                {idCheck === 'true' && (
                  <p className="text-green-500 text-xs italic mt-1">Valid username</p>
                )}
                <button
                  type="button"
                  onClick={handleIdCheck}
                  className="w-full mt-2 px-4 py-2 bg-purple-500 hover:bg-purple-700 text-white rounded-md focus:outline-none focus:ring focus:ring-purple-500"
                >
                  Check Availability
                </button>
              </div>
    
              {/* Password */}
              <div>
                <label htmlFor="psw" className="block text-gray-700 font-bold mb-2">Password</label>
                <input
                  type="password"
                  id="psw"
                  name="psw"
                  placeholder="Enter Password"
                  required
                  onChange={handlePassword}
                  className="w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring focus:ring-purple-500"
                />
                <p className="text-xs text-gray-500 mt-1">
                  * 8-20 characters, at least 1 uppercase letter, 1 lowercase letter, 1 number, and 1 special character
                </p>
                {pwCheck === 'false' && (
                  <p className="text-red-500 text-xs italic mt-1">Invalid password</p>
                )}
                {pwCheck === 'true' && (
                  <p className="text-green-500 text-xs italic mt-1">Valid password</p>
                )}
              </div>
    
              {/* Name */}
              <div>
                <label htmlFor="name" className="block text-sm font-bold mb-2">Name</label>
                <input type="name" placeholder="Enter Name" name="name" required onChange={handleName} className="w-full p-2 mb-4 border rounded" />
              </div>
    
              {/* Phone */}
              <div>
                <label htmlFor="phone" className="block text-sm font-bold mb-2">Phone</label>
                <input type="phone" placeholder="Enter Phone" name="phone" required onChange={handlePhone} className="w-full p-2 mb-4 border rounded" />
              </div>
    
              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-sm font-bold mb-2">Email</label>
                <input type="email" placeholder="Enter Email" name="email" required onChange={handleAddressId} className="w-full p-2 mb-4 border rounded" />
              </div>
    
              {/* Job */}
              <div>
                <label htmlFor="job" className="block text-sm font-bold mb-2">Job</label>
                <input type="job" placeholder="Enter Job" name="job" required onChange={handleJob} className="w-full p-2 mb-4 border rounded" />
              </div>
    
              <div className="flex justify-between">
                <button type="button" className="w-1/2 mr-2 py-2 px-4 bg-gray-500 hover:bg-gray-700 text-white rounded-md focus:outline-none focus:ring focus:ring-gray-500">
                  Cancel
                </button>
                <button 
                  type="submit" 
                  onClick={handleSubmit} 
                  className="w-1/2 ml-2 py-2 px-4 bg-green-500 hover:bg-green-700 text-white rounded-md focus:outline-none focus:ring focus:ring-green-500"
                >
                  Sign Up
                </button>
              </div>
            </div>
          </div>
        </div>
      );
    };

export default JoinPage;
