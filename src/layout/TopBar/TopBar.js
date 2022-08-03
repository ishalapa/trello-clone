import React from 'react'
import styles from 'assets/scss/TopBar.module.scss'

import { CgMenuGridR, CgTrello } from 'react-icons/cg'

const TopBar = () => {
  return (
    <div className={styles.containerTop}>
      <ul className={styles.leftSide}>
        <li>
          <CgMenuGridR size={29} />
        </li>
        <li>
          <a className={styles.a} href="/">
            <CgTrello size={25} color="white" />
            <p>Trello</p>
          </a>
        </li>
        <li className={styles.create}>Create board</li>
      </ul>
      <ul className={styles.rightSide}>
        <li className={styles.inputBlock}><input type="text" placeholder='Search'/></li>
        <li>Icon</li>
        <li>Icon</li>
        <li>Icon</li>
      </ul>
    </div>
  )
}

export default TopBar
