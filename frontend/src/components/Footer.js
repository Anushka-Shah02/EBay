import React from 'react'
import './Footer.css'
import youtube from '../images/youtube.png'
import twitter from '../images/twitter.png'
import fb from '../images/fb.png'
import linkedin from '../images/in.png'


function Footer() {
  return (
    <div className='footer'>
     
     <div className='last'>
     <div className='partition'>
     <div className='part1'>
        <h1 className='foot-head'>Connect with us</h1>
        <input type="text" placeholder="Enter Email ID"/>
        <div className='icons'>
        <img className='logs' src={youtube} alt=''/>
        <img className='logs' src={fb} alt=''/>
        <img className='logs' src={linkedin} alt=''/>
        <img className='logs' src={twitter} alt=''/>
        </div>
        <p>© Copyright 2023 ebay. All rights reserved</p>
      
      </div>

      <div className='bod'>
      </div>
     </div>

      <div className='partition'>
      <div className='part2'>
          <div className='detail1'>
            <h2 className='effect'>Useful Links</h2>
            <h3 className='effect'>About ebay</h3>
            <h3 className='effect'>Help and Support</h3>
            <h3 className='effect'>FAQs</h3>
            <h3 className='effect'>Buying Guide</h3>
            <h3 className='effect'>Return Policy</h3>
            <h3 className='effect'>Store Locator</h3>
          </div>

          <div className='details2'>
            <h3 className='effect'>Site Map</h3>
            <h3 className='effect'>E-Waste</h3>
            <h3 className='effect'>Terms of Use</h3>
            <h3 className='effect'>Privacy Policy</h3>
            <h3 className='effect'>Disclaimer</h3>
            <h3 className='effect'>Unboxed</h3>
          </div>
      </div>

      <div className='bod'>
      </div>

      </div>  
      
      <div className='partition'>
      <div className='part2'>
          <div className='detail1'>
            <h2 className='effect'>Products</h2>
            <h3 className='effect'>Televisions</h3>
            <h3 className='effect'>Home Appliances</h3>
            <h3 className='effect'>Phones & Wearables</h3>
            <h3 className='effect'>Kitchen Appliances</h3>
            <h3 className='effect'>Audio & Video</h3>
            <h3 className='effect'>Health & Fitness</h3>
          </div>

          <div className='details2'>
            <h3 className='effect'>Grooming & Personal</h3>
            <h3 className='effect'>Smart Devices</h3>
            <h3 className='effect'>Gaming</h3>
            <h3 className='effect'>Accessories</h3>
            <h3 className='effect'>Top Brands</h3>
          </div>
      </div>

      </div> 

     </div>

    </div>
  )
}

export default Footer
