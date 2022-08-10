import React, {useState } from 'react'
import styles from 'assets/scss/TopBar.module.scss'

import { CgMenuGridR, CgTrello } from 'react-icons/cg'
import AddBoardForm from 'ui/AddBoardForm'
import { useSelector } from 'react-redux'
import { currentUserStateEmail, currentUserStateName } from 'store/slices/currentUserSlice'

const TopBar = () => {
  const [open, setIsOpen] = useState(false);
  const userEmail = useSelector(currentUserStateEmail)
  const userName = useSelector(currentUserStateName)
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
         <li>{userEmail}</li>
      </ul>
      <AddBoardForm open={open} setIsOpen={setIsOpen}/>
    </div>
  )
}

export default TopBar
