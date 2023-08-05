import React from 'react'
import "../App.css"
import { MdClose } from 'react-icons/md'


const Form = ({handleSubmit,handleOnChange,handleClose,res}) => {
    return (
        <div className='addContainer'>
            <form onSubmit={handleSubmit}>
            <div className="close-btn" onClick={handleClose}><MdClose /></div>
            <h2 class="centered-text">Add Items</h2>
            <label htmlFor='name'>Name :</label>
            <input type='text' id="name" name="name" onChange={handleOnChange} value={res.name}/>

            <label htmlFor='description'>Description :</label>
            <input type='Text' id="description" name="description" onChange={handleOnChange} value={res.description}/>

            <button className='btn'>Submit</button>
            </form>
        </div>
    )
}

export default Form;