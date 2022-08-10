import React, { useState } from 'react'
import styles from 'assets/scss/TopBar.module.scss'

import { CgMenuGridR, CgTrello } from 'react-icons/cg'
import AddBoardForm from 'ui/AddBoardForm'
import { useSelector } from 'react-redux'
import { currentUserStateEmail, currentUserStateName } from 'store/slices/currentUserSlice'

import { Button, Typography, Box } from '@mui/material'
import LogOutPopper from 'components/LogOutPopper'

const TopBar = () => {
  const [openModal, setOpenModal] = useState(false)
  const userEmail = useSelector(currentUserStateEmail)
  const userName = useSelector(currentUserStateName)

  const [anchorEl, setAnchorEl] = useState(null)
  const [open, setOpen] = useState(false)
  const [placement, setPlacement] = useState()
  const iconName = userName.split(' ')[0].slice(0, 1) + userName.split(' ')[1].slice(0, 1)

  const handleClick = (newPlacement) => (event) => {
    setAnchorEl(event.currentTarget)
    setOpen((prev) => placement !== newPlacement || !prev)
    setPlacement(newPlacement)
    console.log(userName)
  }
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
        <li className={styles.create} onClick={() => setOpenModal(true)}>
          Create board
        </li>
      </ul>
      <ul className={styles.rightSide}>
        <li className={styles.inputBlock}>
          <input type="text" placeholder="Search" />
        </li>
        <LogOutPopper open={open} anchorEl={anchorEl} placement={placement} />
        <Box onClick={handleClick('bottom-start')} variant="contained">
          <Box
            display="flex"
            alignItems="center"
            justifyContent="center"
            width={45}
            height={45}
            sx={{ backgroundColor: '#004285', cursor:"pointer" }}
            borderRadius="50%"
          >
            <Typography color={'white'} fontSize={14} textAlign="center" variant="subtitle2" sx={{ p: 1 }}>
              {iconName}
            </Typography>
          </Box>
        </Box>
      </ul>
      <AddBoardForm open={openModal} setIsOpen={setOpenModal} />
    </div>
  )
}

export default TopBar
