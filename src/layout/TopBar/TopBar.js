import React, {useState} from 'react'
import styles from 'assets/scss/TopBar.module.scss'

import { CgMenuGridR, CgTrello } from 'react-icons/cg'
import { useDispatch, useSelector } from 'react-redux'
import { dashboardState, openDashboardForm } from 'store/slices/dashboardSlice'
import AddBoardForm from 'ui/AddBoardForm'

const TopBar = () => {
  const dispatch = useDispatch()
  const isDashOpen = useSelector(dashboardState)

  const openCreateForm = () => {
    dispatch(openDashboardForm(!isDashOpen))
    console.log(isDashOpen)
  }

  const [open, setIsOpen] = useState(false);
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
