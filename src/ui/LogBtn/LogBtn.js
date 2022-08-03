import React from 'react'
import styles from "./LogBtn.module.scss"

const LogBtn = ({textColor, color, onClick, children, ...props}) => {
  return (
    <div style={{backgroundColor: color, color: textColor}} className={styles.LogBtn}>{children}</div>
  )
}

export default LogBtn