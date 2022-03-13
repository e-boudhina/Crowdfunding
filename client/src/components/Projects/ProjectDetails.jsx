import React from 'react'


function ProjectDetails(){


    return (
      <div className="col-md-12">
      <div className="bakix-video mb-60">
        <img src="assets/img/causes/details/fund-video.jpg" alt="" />
        <a className="popup-video" href="https://www.youtube.com/watch?v=Y6MlVop80y0"><i className="fas fa-play" /></a>
      </div>
      <div className="fund-progress mb-50">
        <div className="progress">
          <div className="progress-bar w-75" role="progressbar" aria-valuenow={60} aria-valuemin={0} aria-valuemax={100} />
        </div>
        <div className="payment-count details-fund-count d-md-flex justify-content-between mt-20 fix">
          <div className="fund-count">
            <h2>$32,678</h2>
            <span>Pledged</span>
          </div>
          <div className="fund-count  ">
            <h2>$33,467</h2>
            <span>Target</span>
          </div>
          <div className="fund-count  ">
            <h2>300</h2>
            <span>Backers</span>
          </div>
          <div className="fund-count  ">
            <h2>07</h2>
            <span>Days To Go</span>
          </div>
        </div>
      </div>
      <div className="fund-text mb-50">
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore
          magna
          aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
          consequat.
          Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
          Excepteur
          sint
          occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Sed ut
          perspiciatis
          unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.</p>
      </div>
    </div>

)
}
export default ProjectDetails