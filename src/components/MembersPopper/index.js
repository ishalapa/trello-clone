import React, { useState } from 'react'
import Popover from '@mui/material/Popover'
import Typography from '@mui/material/Typography'

import { Box, Divider, Stack, TextField, Card, Button, IconButton } from '@mui/material'
import { useSelector } from 'react-redux'
import { currentUserStateEmail, currentUserStateId, setUsers, usersState } from 'store/slices/usersSlice'

import {
  currentDashboardState,
  dashboardsState,
  dashboardState,
  setCurrentDashboard,
} from 'store/slices/dashboardsSlice'
import { TiUserDeleteOutline, TiUserAddOutline } from 'react-icons/ti'
import { arrayRemove, arrayUnion, deleteDoc, doc, query, setDoc, updateDoc, where } from 'firebase/firestore'
import { generalBoardCollection } from 'firebase-client'
import { useDispatch } from 'react-redux'
import { usersCollection } from 'firebase-client'

const MembersPopper = () => {
  const dispatch = useDispatch()
  const currentDashboard = useSelector(currentDashboardState)
  const userList = useSelector(usersState)

  const genNumKey = (key) => {
    return key + new Date().getTime()
  }
  // const qGeneralBoardCollection = query(generalBoardCollection, where('members', 'array-contains', `${userEmail}`))
  const dashboardDoc = doc(generalBoardCollection, `${currentDashboard.id}`)
  

  const [anchorEl, setAnchorEl] = useState(null)

  const openPopper = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const open = Boolean(anchorEl)
  const id = open ? 'simple-popover' : undefined
  //
  const [isAddMembersOpen, setIsAddMembersOpen] = useState(false)

  const addMember = async (user) => {
    if (currentDashboard.members.includes(user.name)) {
      return
    } else {
      // await deleteDoc(doc(usersCollection, user.id))

      dispatch(setCurrentDashboard({ ...currentDashboard, members: [...currentDashboard.members, user.name] }))

      await updateDoc(dashboardDoc, {
        members: arrayUnion(user.name),
      })
    }
  }
  console.log(currentDashboard.members)
  const deleteMember = async (member) => {
    await updateDoc(dashboardDoc, {
      members: arrayRemove(member),
    })
    const filteredMembers = currentDashboard.members.filter(memb => memb !== member)

    dispatch(setCurrentDashboard({ ...currentDashboard, members: filteredMembers }))
    // dispatch(setUsers([...userList, member]))

    // await setDoc(usersCollection, { name: member })
  }
  return (
    <>
      <Button aria-describedby={id} variant="outlined" onClick={openPopper}>
        Members
      </Button>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
      >
        <Box maxHeight={400} width={350}>
          <Typography fontSize={14} textAlign="center" variant="subtitle2" sx={{ p: 1 }}>
            Members
          </Typography>
          <Divider />
          <Stack display={'flex'} alignItems={'center'} spacing={1}>
            <Stack pt={1} direction={'row'} spacing={1}>
              <TextField placeholder="Search members" size="small" />
              <Button onClick={() => setIsAddMembersOpen(!isAddMembersOpen)} size="small" variant="contained">
                {isAddMembersOpen ? 'Add memmbers' : 'Board Members'}
              </Button>
              {/* <CustomSelect /> */}
            </Stack>
            <Box p={1} width={'100%'}>
              {/* <UserCircle handleClick={handleClick} size={45} /> */}
              {!isAddMembersOpen ? (
                <Stack spacing={1}>
                  <Typography width={'100%'} textAlign={'center'} variant="body1">
                    Choose members to add
                  </Typography>
                  {userList &&
                    userList.map((user) => (
                      <Card
                        key={user.id}
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          paddingRight: '2px',
                        }}
                      >
                        <Typography color={'black'} p={1} variant="body1">
                          {user.name}
                        </Typography>
                        <Box
                          onClick={() => addMember(user)}
                          height={33}
                          width={53}
                          display={'flex'}
                          alignItems={'center'}
                          justifyContent={'center'}
                          borderRadius={1}
                          sx={{ '&:hover': { backgroundColor: '#e6f0ff', color: 'black', cursor: 'pointer' } }}
                        >
                          <TiUserAddOutline size={23} color={'0073e6'} />
                        </Box>
                      </Card>
                    ))}
                </Stack>
              ) : (
                <Stack spacing={1}>
                  <Typography width={'100%'} textAlign={'center'} variant="subtitle1">
                    Board members
                  </Typography>
                  {currentDashboard &&
                    currentDashboard.members.map((member) => (
                      <Card
                        key={`${member}${new Date().getTime()}`}
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          paddingRight: '2px',
                        }}
                      >
                        <Typography color={'black'} p={1} variant="body1">
                          {member}
                        </Typography>
                        <Box
                          onClick={() => deleteMember(member)}
                          height={33}
                          width={53}
                          display={'flex'}
                          alignItems={'center'}
                          justifyContent={'center'}
                          borderRadius={1}
                          sx={{ '&:hover': { backgroundColor: '#ffe6e6', color: 'black', cursor: 'pointer' } }}
                        >
                          <TiUserDeleteOutline size={23} color={'800000'} />
                        </Box>
                      </Card>
                    ))}
                </Stack>
              )}
            </Box>
          </Stack>
        </Box>
      </Popover>
    </>
  )
}

export default MembersPopper
