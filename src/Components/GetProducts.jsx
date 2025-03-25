import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import Carousel from "./Carousel";


const GetProducts = () => {
    let [products, setProducts] = useState([]);
    let [error, setError] = useState("");
    let [loading, setLoading] = useState(false);
    let [filteredProducts, setFilteredProducts] = useState([])

    const img_url = "https://bethm.pythonanywhere.com/static/images/";

    const navigate = useNavigate();

    const getProducts = async () => {
        setError("");
        setLoading("Please wait...");

        try {
            const response = await axios.get("https://bethm.pythonanywhere.com/api/getproducts");
            setProducts(response.data);
            setFilteredProducts(response.data);
            setLoading("");  
        } catch (error) {
            setLoading("");  
            setError("Something went wrong. Please try again.");
        }
    };

    const handleSearch = (value) => {
        const filtered = products.filter((product) => 
        product.product_name.toLowerCase().includes(value.toLowerCase()) )

        setFilteredProducts(filtered);
    }

    useEffect(() => {
        getProducts();
    }, []);

    return (
        <div className="container-fluid bg-dark">
            <Navbar/>
            <Carousel/>
            <h1 className="mt-5 text-center text-white"><b><u>Our Products</u></b></h1>
            <br />

       
            {loading && (
                <div className="d-flex justify-content-center my-3">
                    <div className="spinner-border text-info" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                </div>
            )}

            {error && <b className="text-danger d-block text-center">{error}</b>}

            <div className="row justify-content-center my-4">
                <div className="col-md-4">
                    <input type="text" className="form-control" placeholder="Search product by name" onChange={(e) => handleSearch(e.target.value)}/>
                </div>
            </div>

            <div className="row">
                {filteredProducts.map((product) => (
                    <div className="col-md-3 justify-content-center mb-4" key={product.id}>
                        <div className="card shadow card-margin">
                            <img 
                                src={img_url + product.product_photo} 
                                alt={product.product_name} 
                                className="card-img-top product_img mt-4" 
                                style={{width:"100%",height:"350px",objectFit:"cover"}}
                            />
                            <div className="card-body">
                                <h5 className="mt-2">{product.product_name}</h5>
                                <p className="text-muted" >{product.product_desc.slice(0,100)}...</p>
                                <b className="text-success">{product.product_cost}/=</b>
                                <br />
                                <button 
                                    className="btn btn-dark mt-2 w-100"
                                    onClick={() => navigate("/singleproduct", { state: { product } })}
                                >
                                    View Details
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <Footer/>
        </div>
    );
};

export default GetProducts;
