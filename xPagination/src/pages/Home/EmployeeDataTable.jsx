import React, {useState, useEffect } from 'react';
import styles from './EmployeeDataTable.module.css';
import axios from "axios";
import Pagination from '../../Pagination/Pagination.jsx';

const EmployeeDataTable = () => {

  let[employees, setEmployees] = useState([]);
  let [isMounted, setIsMounted] = useState(false);


   let[currentPage,setCurrentPage] =  useState(1);
     let[totalPages,setTotalPages] = useState(1);
     let [currentEmployees, setCurrentEmployees] = useState([]);
     const maxRecords = 10;

  useEffect( ()=>{
    async function fetchData(){

      try {
        let data =  await axios.get("https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json");
          // console.log(data.data[1]);
      setEmployees(data.data);

      } catch (error) {
        console.error("somefailed to fetch data", error);
      }
      

    }
    
    fetchData();
    setIsMounted(true);


  },[]);

  useEffect(()=>{
    if(isMounted){
      console.log(employees);
      setCurrentEmployees(employees.slice(0,10));
      setTotalPages(Math.ceil(employees.length/maxRecords));
      console.log("only one ", totalPages);
    }

  },[employees, isMounted]);

  useEffect(()=>{
    if(isMounted){
      let startIdx = (currentPage-1)*maxRecords;
      let endIdx =  startIdx+10;
      setCurrentEmployees(employees.slice(startIdx, endIdx));
    }
   
  },[currentPage]);



  // const employees = [
  //   { id: 11, name: 'Keshav Muddaiah', email: 'keshav@mailinator.com', role: 'member' },
  //   { id: 12, name: 'Nita Ramesh', email: 'nita@mailinator.com', role: 'member' },
  //   { id: 13, name: 'Julia Huntsman', email: 'julia@mailinator.com', role: 'member' },
  //   { id: 14, name: 'Juan Alonso', email: 'juan@mailinator.com', role: 'admin' },
  //   { id: 15, name: 'Gabriel Montoya', email: 'gabriel@mailinator.com', role: 'admin' },
  //   { id: 16, name: 'Beatrice Iglesias', email: 'beatrice@mailinator.com', role: 'admin' },
  //   { id: 17, name: 'Sarah Symms', email: 'sarah@mailinator.com', role: 'admin' },
  //   { id: 18, name: 'Patrick Pinheiro', email: 'patrick@mailinator.com', role: 'admin' },
  //   { id: 19, name: 'Anand Patel', email: 'anand@mailinator.com', role: 'member' },
  //   { id: 20, name: 'Kishore Kalburgi', email: 'kishore@mailinator.com', role: 'member' },
  // ];

  return (
    <div className={styles.tableContainer}>
      <h1>Employee Data Table</h1>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
          </tr>
        </thead>
        <tbody>
          {currentEmployees.map((employee) => (
            <tr key={employee.id}>
              <td>{employee.id}</td>
              <td>{employee.name}</td>
              <td>{employee.email}</td>
              <td>{employee.role}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {totalPages >1 &&  <Pagination  currentPage={currentPage} setCurrentPage={setCurrentPage} totalPages={totalPages}  ></Pagination> }
     
    </div>
  );
};

export default EmployeeDataTable;