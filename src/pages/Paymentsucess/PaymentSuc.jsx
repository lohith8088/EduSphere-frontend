import React from 'react'
import './PaymentSuc.css'
import { Link, useParams } from 'react-router-dom';

const PaymentSuc = ({user}) => {
  const { id } = useParams(); // Fixed: useParams is a function

  return (
    <div className="payment-suc-page">
      {user && <div className="suc-message">
        <h2>Payment Successful! 🎉</h2>
        <p>Thank you for enrolling with EduSphere, {user.name}!</p>
        <p>Your transaction ID: <strong>{id}</strong></p>
        <p>Course access has been added to your account.</p>
        <Link to={`/${user._id}/dashboard`} className='common-btn'>
          Go to Dashboard
        </Link>
      </div>}
    </div>
  )
}

export default PaymentSuc