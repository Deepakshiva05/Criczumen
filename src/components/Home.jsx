import React from 'react';
import ball from '../assets/ball.json';
import Lottie from 'lottie-react';
import stump from '../assets/stump.json';

const Home = () => {
  return (
    <div>
      <section>
        <div className="container">
            <div className="row d-flex justify-center items-center">
            <div className="col-lg-6 col-md-6 z-10">
                <Lottie animationData={ball} style={{height:"10cm"}}></Lottie>
            </div>
            <div className="col-lg-6 col-md-6">
                <h1 className='text-3xl lg:text-5xl font-serif'>The Free <span className='text-green-600'>Cricket Score</span>  <br /> Finder App</h1>
                <p className='text-l mt-2 font-mono'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet, et cumque! Velit nobis ipsa, beatae accusamus nisi eligendi.</p>
                <button className='bg-green-600 p-2 w-[3cm] text-white rounded-md mt-3'>Get Started</button>
                
            </div>
            </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
