import React from 'react'

import styles from "assets/scss/TopBarStart.module.scss"
import { Link } from 'react-router-dom'
import { CgTrello } from 'react-icons/cg'
import LogBtn from 'ui/LogBtn'

const TopBarStart = () => {
  return (
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
        <li><LogBtn color={"white"} textColor={"black"}>Log In</LogBtn></li>
        <li>
          <LogBtn>Get Trello for free</LogBtn>
        </li>
      </ul>
    </div>
  )
}

export default TopBarStart