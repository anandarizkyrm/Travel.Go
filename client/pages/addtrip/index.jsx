import React, {useEffect} from "react";
import Layout from "../../components/layout/Layout";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from 'react-redux';
import MyAlert from '../../components/alert/Alert';

const InputForm = dynamic(() => import("../../components/addTrip/formInput"), {
  ssr: false,
});


export default function InputForm() {
  
  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin;

  const router = useRouter();
  return (
   
      <div style={{ minHeight: "81.9vh", marginTop : '70px' }}>
           <MyAlert/>
           <InputForm />
      </div>
 
  );
}