import React from "react";
import Footer from "./Footer";
import Navbar from "./Navbar";

const AboutUs = () => {
  return (
    <section className="container-fluid">
        <Navbar/>
      <div className="justify-content-center">
        <h1>About Us</h1>
        <p>
          Welcome to our store! We specialize in high-quality electronics at competitive prices.
          Our mission is to ensure customer satisfaction through excellent service and top-notch products.
        </p>

        {/* Reviews Section */}
        <section className="reviews">
          <h2>Customer Reviews</h2>
          <div className="review">
            <p>"Amazing products and fast delivery!" 
                <br /> <strong>John D.</strong></p>
          </div>
          <div className="review">
            <p>"Great customer service, highly recommend!" 
                <br /> <strong>Sarah L.</strong></p>
          </div>
          <div className="review">
            <p>"Best prices for quality electronics." 
                <br /> <strong>Michael K.</strong></p>
          </div>
        </section>

        {/* Location Section */}
        <section className="location">
          <h2>Our Location</h2>
          <p>Visit our store at:</p>
          <p><strong>123 Tech Street, Nairobi, Kenya</strong></p>
          <img src="images/nairobi.jpeg" alt="" />
        </section>
        <Footer/>
      </div>
    </section>
  );
};

export default AboutUs;
