import React from 'react'
import { Link } from 'react-router-dom'
import '../Components.css'

const FooterBar = () => {
  return (
    <div className="Footer">Copyright © 2022 <Link to="https://lead-tronics.com/" className="Footer-Link">LeadTronics.</Link> Designed by <Link to="https://lead-tronics.com/" className="Footer-Link">LeadTronics Pvt.Ltd</Link> All rights reserved.</div>
  )
}
export default FooterBar
