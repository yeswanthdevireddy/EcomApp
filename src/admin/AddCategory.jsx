import { useState } from "react";
import { addCategory } from "../apis/category";
import { useNavigate } from "react-router-dom";

function AddCategory()
{
    const[name,setName]=useState("");
    const navigate = useNavigate();

    const submit= async()=>{
        if(!name.trim()) return alert("name required")
        await addCategory(name);
        setName("");
        alert(" category created");
    }

    return(
        <>
        <h3>Add Category</h3>
        <input type="text" placeholder="enter category" value={name} onChange={e=>setName(e.target.value)} />
        <button onClick={submit}>Save</button>
        </>
    )
}

export default AddCategory;