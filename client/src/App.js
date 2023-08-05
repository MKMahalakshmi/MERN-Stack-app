import { useEffect, useState } from 'react';
// import './App.css';
import axios from "axios"
import Form from './components/Form';

axios.defaults.baseURL = "http://localhost:8080/"

function App() {
  const [addSection, setAddSection] = useState(false)
  const [editSection, setEditSection] = useState(false)
  const [formData, setFormData] = useState({
    name : "",
    description : ""
  })
  const [formDataEdit, setFormDataEdit] = useState({
    _id : "",
    name : "",
    description : ""
  })
  const [dataList,setDataList] = useState([])
  
  const handleOnChange = (e) => {
    const {value,name} = e.target
    setFormData((preve) => {
      return{
        ...preve,
        [name] : value
      }
    })
  }

  //Create a data
  const handleSubmit = async(e) =>{
    e.preventDefault()
    const data = await axios.post("/create",formData)
    console.log(data)
    if(data.data.success)
    {
      setAddSection(false)
      alert(data.data.message)
      getFetchData()
    }
  }

  //read a data
  const getFetchData = async()=>{
    const data = await axios.get("/")
    console.log(data)
    if(data.data.success)
    {
      setDataList(data.data.data)
    }
  }

  useEffect(()=>{
    getFetchData()
  },[])

  //delete a data
  const handleDelete = async(id) =>{
    const data = await axios.delete("/delete/"+id)
      if(data.data.success){
        getFetchData()
        alert(data.data.message)
      }
  }

  //edit a data
  const handleUpdate = async(e) => {
    e.preventDefault()
    const data = await axios.put("/update",formDataEdit)
      if(data.data.success){
        getFetchData()
        alert(data.data.message)
        setEditSection(false)
      }
  }

  const handleEditOnChange = async(e) => {
    const {value,name} = e.target
      setFormDataEdit((preve) => {
        return{
          ...preve,
          [name] : value
        }
    })
  }

  const handleEdit = (el) => {
    setFormDataEdit(el)
    setEditSection(true)
  }

  return (
    <>
      <div className='container'>
        <button className='btn btn-add' onClick={()=>setAddSection(true)}>Add</button>
        {
          addSection && (
            <Form 
            handleSubmit = {handleSubmit}
            handleOnChange = {handleOnChange}
            handleClose = {() => setAddSection(false)}
            res = {formData}
            />
          )
        }

        {
          editSection && (
            <Form 
            handleSubmit = {handleUpdate}
            handleOnChange = {handleEditOnChange}
            handleClose = {() => setEditSection(false)}
            res = {formDataEdit}
            />
          )
        }

        <div className='tableContainer'>
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Description</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {
                dataList[0] ? (
                dataList.map((el)=>{
                  return(
                    <tr>
                      <td>{el.name}</td>
                      <td>{el.description}</td>
                      <td>
                      <button className='btn btn-edit' onClick={()=>handleEdit(el)}> Edit </button>
                      <button className='btn btn-delete' onClick = {() => handleDelete (el._id)}> Delete </button>
                      </td>
                    </tr>
                  )
                }) )
                 : (<p style={{textAlign : "center"}}>No Data Available</p>)
              }
            </tbody>
          </table>
        </div>




        
      </div>
    </>
  );
}

export default App;
