import React from 'react'
import styles from "assets/scss/TopBar.module.scss"

const TopBar = () => {
  return (
    <div className={styles.containerTop}>
        <ul className={styles.leftSide}>
            <li>Menu</li>
            <li>Logo</li>
        </ul>
        <ul className={styles.rightSide}>
            <li>Search</li>
            <li>Icon</li>
            <li>Icon</li>
            <li>Icon</li>
        </ul>
    </div>
  )
}

export default TopBar