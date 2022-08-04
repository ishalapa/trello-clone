import React, {useState } from 'react'
import styles from 'assets/scss/TopBar.module.scss'

import { CgMenuGridR, CgTrello } from 'react-icons/cg'
import AddBoardForm from 'ui/AddBoardForm'
import { useSelector } from 'react-redux'
import { dashboardsState } from 'store/slices/dashboardsSlice'



const TopBar = () => {
  const [open, setIsOpen] = useState(false);
  const dashboards = useSelector(dashboardsState)
  console.log(dashboards)
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
        <li className={styles.create} onClick={() => setIsOpen(true)}>Create board</li>
      </ul>
      <ul className={styles.rightSide}>
        <li className={styles.inputBlock}><input type="text" placeholder='Search'/></li>
        <li>Icon</li>
        <li>Icon</li>
        <li>Icon</li>
      </ul>
      <AddBoardForm open={open} setIsOpen={setIsOpen}/>
    </div>
  )
}

export default TopBar
