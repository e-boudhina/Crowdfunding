import React from 'react'


function Header(){
    return (
      <div>
      <meta charSet="utf-8" />
      <meta httpEquiv="x-ua-compatible" content="ie=edge" />
      <title>YoungBucks </title>
      <meta name="description" content />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link rel="manifest" href="site.webmanifest" />
      <link rel="shortcut icon" type="image/x-icon" href="assets/img/favicon.png" />
      {/* Place favicon.png in the root directory */}
      {/* CSS here */}
      <link rel="stylesheet" href="assets/css/bootstrap.min.css" />
      <link rel="stylesheet" href="assets/css/owl.carousel.min.css" />
      <link rel="stylesheet" href="assets/css/animate.min.css" />
      <link rel="stylesheet" href="assets/css/magnific-popup.css" />
      <link rel="stylesheet" href="assets/css/fontawesome-all.min.css" />
      <link rel="stylesheet" href="assets/css/flaticon.css" />
      <link rel="stylesheet" href="assets/css/meanmenu.css" />
      <link rel="stylesheet" href="assets/css/slick.css" />
      <link rel="stylesheet" href="assets/css/style.css" />
      <link rel="stylesheet" href="assets/css/responsive.css" />
      <div id="preloader" style={{display: 'none'}}>
        <div className="preloader">
          <span />
          <span />
        </div>
      </div>
      <header id="sticky-header" className="header header-transparent mt-60">
        <div className="container">
          <div className="header-box white-bg pl-50 pr-50">
            <div className="row">
              <div className="col-xl-2 col-lg-2 col-md-3 col-5 d-flex align-items-center">
                <div className="header__logo">
                  <a href="index.html"><img src="assets/img/logo/logo.png" alt="" /></a>
                </div>
              </div>
              <div className="col-xl-10 col-lg-10 col-7 col-md-9">
                <div className="header__right f-right">
                  <div className="header__icon f-right mt-30">
                    <a className="login-btn" href="login.html"><i className="fas fa-lock" /></a>
                  </div>
                  <div className="header__icon f-right mt-30 ml-30 d-none d-md-block">
                    <a className="btn" href="contact.html">start campaign</a>
                  </div>
                </div>
                <div className="header__menu f-right">
                  <nav id="mobile-menu" style={{display: 'block'}}>
                    <ul>
                      <li><a href="index.html">Home</a>
                        <ul className="submenu">
                          <li><a href="index.html">Home style 1</a></li>
                          <li><a href="index-2.html">Home style 2</a></li>
                          <li><a href="index-3.html">Home style 3</a></li>
                        </ul>
                      </li>
                      <li><a href="#">Pages</a>
                        <ul className="submenu">
                          <li><a href="team.html">Volunteer</a></li>
                          <li><a href="team-detail.html">Volunteer Details</a></li>
                          <li><a href="progress.html">Progress Explore</a></li>
                          <li><a href="progress-done.html">Progress Done</a></li>
                          <li><a href="fund-details.html">Fund Details</a></li>
                          <li><a href="/events">Event</a></li>
                          <li><a href="eventsdet">Event Details</a></li>
                          <li><a href="portfolio.html">Portfolio</a></li>
                          <li><a href="project-details.html">Portfolio Details</a></li>
                          <li><a href="we-do.html">Service</a></li>
                          <li><a href="support.html">Support</a></li>
                          <li><a href="contact.html">Contact</a></li>
                        </ul>
                      </li>
                      <li><a href="progress.html">Explore</a></li>
                      <li><a href="shop.html">Shop</a>
                        <ul className="submenu">
                          <li><a href="shop.html">Shop Default</a></li>
                          <li><a href="category.html">Shop With Category</a></li>
                          <li><a href="product-details.html">Product Details</a></li>
                          <li><a href="cart.html">Shopping Cart</a></li>
                          <li><a href="checkout.html">Checkout</a></li>
                          <li><a href="wishlist.html">Wishlist</a></li>
                          <li><a href="login.html">Login</a></li>
                          <li><a href="register.html">Register</a></li>
                        </ul>
                      </li>
                      <li><a href="blog.html">Blog</a>
                        <ul className="submenu">
                          <li><a href="blog.html">Blog Right Sidebar</a></li>
                          <li><a href="blog-left-sidebar.html">Blog Left Sidebar</a></li>
                          <li><a href="blog-grid-sidebar.html">Blog Grid Sidebar</a></li>
                          <li><a href="blog-grid-sidebar-left.html">Blog Grid Left Sidebar</a></li>
                          <li><a href="blog-2-col.html">Blog 2 Column</a></li>
                          <li><a href="blog-2-col-masonry.html">Blog 2 Column masonry</a></li>
                          <li><a href="blog-3-col.html">Blog 3 Column</a></li>
                          <li><a href="blog-3-col-masonry.html">Blog 3 Column masonry</a></li>
                          <li><a href="blog-details.html">Blog Details Image</a></li>
                          <li><a href="blog-details-audio.html">Blog Details Audio</a></li>
                          <li><a href="blog-details-video.html">Blog Details Video</a></li>
                          <li><a href="blog-details-gallery.html">Blog Details Gallery</a></li>
                        </ul>
                      </li>
                      <li><a href="contact.html">Contact</a></li>
                    </ul>
                  </nav>
                </div>
              </div>
              <div className="col-12">
                <div className="mobile-menu" />
              </div>
            </div>
          </div>
        </div>
      </header>
    </div>
     )
}
export default Header
