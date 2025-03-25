import axios from "axios";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";

const SingleProduct = () => {
    const { product } = useLocation().state || {};
    const [phone, setPhone] = useState("");
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(null);
    const [error, setError] = useState(null);

    const submitForm = async (e) => {
        e.preventDefault();
        setLoading(true);
        setSuccess(null);
        setError(null);

        try {
            const data = new FormData();
            data.append("amount", product.product_cost);
            data.append("phone", phone);

            const response = await axios.post(
                "https://bethm.pythonanywhere.com/api/mpesa_payment",
                data
            );

            setLoading(false);
            setSuccess(response.data.message);
        } catch (err) {
            setLoading(false);
            setError(err.response?.data?.message || "Payment failed. Try again.");
        }
    };

    const img_url = "https://bethm.pythonanywhere.com/static/images/";

    return (
        <div className="container mt-4">
            <Navbar/>
            <div className="row justify-content-center">
                {/* Product Image */}
                <div className="col-md-4 card shadow p-3">
                    <img
                        src={img_url + product.product_photo}
                        alt={product.product_name}
                        className="img-fluid rounded"
                    />
                </div>

                {/* Product Details */}
                <div className="col-md-5 card shadow p-4">
                    <h2>{product.product_name}</h2>
                    <h3 className="text-success">{product.product_cost}/=</h3>
                    <p className="text-muted">{product.product_desc}</p>

                    {/* Status Messages */}
                    {loading && <p className="text-warning">Processing payment...</p>}
                    {error && <p className="text-danger">{error}</p>}
                    {success && <p className="text-success">{success}</p>}

                    {/* Payment Form */}
                    <form onSubmit={submitForm}>
                        <input
                            type="number"
                            placeholder="Amount"
                            required
                            readOnly
                            value={product.product_cost}
                            className="form-control mb-2"
                        />

                        <input
                            type="tel"
                            placeholder="Enter Mpesa No 2547xxxxxxxx"
                            required
                            className="form-control mb-3"
                            onChange={(e) => setPhone(e.target.value)}
                            value={phone}
                        />

                        <button className="btn btn-primary w-100" disabled={loading}>
                            {loading ? "Processing..." : "Pay Now"}
                        </button>
                    </form>
                </div>
            </div>
            <Footer/>
        </div>
    );
};

export default SingleProduct;
