import React, { useState } from 'react'
import styles from 'assets/scss/TopBar.module.scss'

import { CgMenuGridR, CgTrello } from 'react-icons/cg'
import AddBoardForm from 'ui/AddBoardForm'

import LogOutPopper from 'components/LogOutPopper'
import UserCircle from 'ui/UserCircle'

import { Link } from 'react-router-dom'
import { Typography } from '@mui/material'

const TopBar = () => {
  const [openModal, setOpenModal] = useState(false)

  const [anchorEl, setAnchorEl] = useState(null)
  const [open, setOpen] = useState(false)
  const [placement, setPlacement] = useState()

  const handleClick = (newPlacement) => (event) => {
    setAnchorEl(event.currentTarget)
    setOpen((prev) => placement !== newPlacement || !prev)
    setPlacement(newPlacement)
  }
  return (
    <div className={styles.containerTop}>
      <ul className={styles.leftSide}>
        <li>
          <CgMenuGridR size={29} />
        </li>
        <li style={{ display: 'flex', alignItems:"center" }}>
          <CgTrello size={25} color="white" />
          <Link to="./">
            <Typography color={"#fff"} fontSize={18}>Trello</Typography>
          </Link>
        </li>
        <li className={styles.create} onClick={() => setOpenModal(true)}>
          Create board
        </li>
      </ul>
      <ul className={styles.rightSide}>
        <li className={styles.inputBlock}>
          <input type="text" placeholder="Search" />
        </li>
        <LogOutPopper open={open} anchorEl={anchorEl} placement={placement} />
        <UserCircle handleClick={handleClick} size={45} />
      </ul>
      <AddBoardForm open={openModal} setIsOpen={setOpenModal} />
    </div>
  )
}

export default TopBar
