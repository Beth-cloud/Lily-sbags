import { useRef, useState } from "react";
import axios from "axios";

const AddProduct = () => {

    let [product_name, setProductName] = useState("")
    let [product_desc, setProductDesc] = useState("")
    let [product_cost, setProductCost] = useState("")
    let [product_photo, setProductPhoto] = useState ("")
    let [loading, setLoading] = useState("")
    let [success,setSuccess] = useState("")
    let [error, setError] = useState("")
    const fileInputRef = useRef("")

    const submitForm  = async (e) => {
        e.preventDefault();

        try {
            setError("")
            setSuccess("")
            setLoading("Please wait...")

            const data = new FormData ()
            data.append("product_name", product_name)
            data.append("product_desc", product_desc)
            data.append("product_cost", product_cost)
            data.append ("product_photo", product_photo)

            const response = await axios.post("https://bethm.pythonanywhere.com/api/addproduct", data)
            setLoading("")
            setSuccess(response.data.success)
            setProductName("")
            setProductDesc("")
            setProductCost("")
            fileInputRef.current.value=""
        } catch (error) {
            setLoading("")
            setError(error.message)
        }
    }
    return ( 
        <div className="lily row justify-content-center mt-5 bg-dark" >
            <div className="col-md-4 card shadow p-4">
                <h2>Add product</h2>
                <b className="text-warning">{loading}</b>
                <b className="text-danger">{error}</b>
                <b className="text-success">{success}</b>

                <form onSubmit={submitForm}>
                    <input type="text" className="form-control" placeholder="Enter the product name" required value={product_name} onChange={(e)=>setProductName(e.target.value)}/> <br />
                    <textarea name="" id="" className="form-control" placeholder="Enter the product description" required value={product_desc} onChange={(e)=>setProductDesc(e.target.value)}></textarea> <br />
                    <input type="number" className="form-control" placeholder="Enter the product cost" required value={product_cost} onChange={(e)=>setProductCost(e.target.value)}/> <br />
                    <input type="file" ref={fileInputRef} className="form-control" required onChange={(e)=>setProductPhoto(e.target.files[0])}/> <br />
                    <button className="btn btn-primary text-white">Add Product</button>
                    
                </form>
            </div>
        </div>
     );
}
 
export default AddProduct;