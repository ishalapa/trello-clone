import React from 'react'

import { Link } from 'react-router-dom'

import styles from 'assets/scss/Start.module.scss'
import { CgTrello } from 'react-icons/cg'
import LogBtn from 'ui/LogBtn'
const Start = () => {
  return (
    <>
    <div className={styles.containerTop}>
      <ul className={styles.leftSide}>
        <li>
          <a className={styles.a} href="/">
            <CgTrello size={30} color="#0073e6"/>
            <p className={styles.logoText}>Trello</p>
          </a>
        </li>
      </ul>
      <ul className={styles.rightSide}>
        <li><Link style={{color:"black"}} to={"/"}>Log In</Link></li>
        <li className={styles.btnBlock}>
          <LogBtn>Get Trello for free</LogBtn>
        </li>
      </ul>
    </div>
    <div className={styles.main}></div>
    </>
    
  )
}

export default Start
