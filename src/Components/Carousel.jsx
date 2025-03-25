const Carousel = () => {
    return (
      
      <section class="row">
      <div class="col-md-12">
        <div class="carousel slide" id="mycarousel" data-bs-ride="carousel">
          <div class="carousel-inner">
            <div class="carousel-item active">
              <img src="images/slide12.jpg" alt="" class="d-block w-100" style={{height:"700px", objectFit:"cover"}}/>
            </div>

            <div class="carousel-item">
              <img src="images/slide9.jpg" alt="" class="d-block w-100" style={{height:"700px", objectFit:"cover"}}/>
            </div>

            <div class="carousel-item">
              <img src="images/slide15.jpg" alt="" class="d-block w-100" style={{height:"700px", objectFit:"cover"}}/>

            </div>

            <div class="carousel-item">
              <img src="images/slide13.jpg" alt="" class="d-block w-100" style={{height:"700px", objectFit:"cover"}}/>
            </div>
          </div>

          <a href="#mycarousel" class="carousel-control-prev" data-bs-slide="prev">
            <span class="carousel-control-prev-icon bg-dark" ></span>
          </a>
            
          <a href="#mycarousel" class="carousel-control-next" data-bs-slide="next">
            <span class="carousel-control-next-icon bg-dark"></span>
          </a>

          <ol class="carousel-indicators">
            <li data-bs-slide-to="0" data-bs-target="#mycarousel"class="active"></li>
            <li data-bs-slide-to="1" data-bs-target="#mycarousel"></li>
            <li data-bs-slide-to="2" data-bs-target="#mycarousel"></li>
            <li data-bs-slide-to="3" data-bs-target="#mycarousel"></li>
          </ol>
        </div>
      </div>
    </section>
    );
  };
  
  export default Carousel;