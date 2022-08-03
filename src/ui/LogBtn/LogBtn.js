import React from 'react'
import styles from "./LogBtn.module.scss"

const LogBtn = ({onClick, children, ...props}) => {
  return (
    <div className={styles.LogBtn}>{children}</div>
  )
}

export default LogBtn