import React from 'react'
import '../css/footer.css';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <div className='footer'>
        <div className='pages'>
            <Link to="/terms-and-conditions" className="text-white hover:underline">
                Terms and Conditions
              </Link>{' '}
              |{' '}
              <Link to="/privacy-policy" className="text-white hover:underline">
                Privacy Policy
            </Link>
        </div>
        <h4>&copy;Webflix 2024</h4>
    </div>
  )
}

export default Footer