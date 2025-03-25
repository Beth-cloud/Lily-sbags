const Footer = () => {
    return ( 
      <div>
            <section class="row text-light p-4 bg-primary">
                <div class="col-md-4">
                    <h5 class="text-center">About Us</h5>

                    <p>We sell branded bags with a whole variety of selections.Our bags are at an affordable price.</p>
                    <p>We also partner with different brands of bags and textile to ensure that our products have a variety of sources and are of high quality. </p>
                    <p>You are all welcome to visit our stalls located at every mall and supermarket near you.</p>
                </div>

                <div class="col-md-4">
                    <h5 class="text-center">Contact Us</h5>          
                    <input type="email" placeholder="Enter your email" class="form-control"/><br/>
                    <textarea class="form-control" placeholder="leave a comment"rows="7" ></textarea><br/>
                    <input type="submit" value="Send Message" class="btn btn-outline-danger"/>          
                </div>

                <div class="col-md-4">
                    <h5 class="text-center">Stay Connected</h5><br/>
                    <a href="https://facebook.com"><img src="images/fb.png" height="40px" width="40px" alt=""/></a>
                    <a href="https://instagram.com"><img src="images/in.png" height="40px" width="40px" alt=""/></a> <br />
                    <h5>You can also find us in:</h5>
                    <p class="text-white">Our headquarters are located at the darwins building in Nairobi.The building is just next to the odeon building.</p> <br />

                </div>
            </section>


            <footer class="bg-dark text-white text-center p-2">
              <h5>Developed by B.Wanjiru &copy;2025. All rights reserved</h5>
            </footer>
             
      </div>

     );
}
 
export default Footer;