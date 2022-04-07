import React from 'react'
import '../Components.css'

const Header = (props) => {
  return (
    <div className='dashboard-header text-center'>{props.HeadingName}<span className='text-muted'>{props.MutedHeadName}</span></div>
  )
}
export default Header