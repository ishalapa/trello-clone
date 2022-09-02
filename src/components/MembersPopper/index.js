import React, { useState } from 'react'
import Popover from '@mui/material/Popover'
import Typography from '@mui/material/Typography'

import { Box, Divider, Stack, TextField, Card, Button } from '@mui/material'
import { useSelector } from 'react-redux'
import { usersState } from 'store/slices/usersSlice'

import { currentDashboardState, setCurrentDashboard } from 'store/slices/dashboardsSlice'
import { TiUserDeleteOutline, TiUserAddOutline } from 'react-icons/ti'
import { MdDone } from 'react-icons/md'

import { arrayRemove, arrayUnion, doc, updateDoc } from 'firebase/firestore'
import { generalBoardCollection } from 'firebase-client'
import { useDispatch } from 'react-redux'

const MembersPopper = () => {
  const dispatch = useDispatch()
  const currentDashboard = useSelector(currentDashboardState)
  const userList = useSelector(usersState)

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
  const [searchTerm, setSearchTerm] = useState('')

  const addMember = async (user) => {
    if (currentDashboard.members.includes(user.name)) {
      return
    } else {
      dispatch(setCurrentDashboard({ ...currentDashboard, members: [...currentDashboard.members, user.name] }))
      await updateDoc(dashboardDoc, {
        members: arrayUnion(user.name),
      })
    }
  }
  const deleteMember = async (member) => {
    await updateDoc(dashboardDoc, {
      members: arrayRemove(member),
    })
    const filteredMembers = currentDashboard.members.filter((memb) => memb !== member)

    dispatch(setCurrentDashboard({ ...currentDashboard, members: filteredMembers }))
  }

  return (
    <>
      <Button aria-describedby={id} variant="contained" onClick={openPopper}>
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
              <TextField
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search members"
                size="small"
              />
              <Button onClick={() => setIsAddMembersOpen(!isAddMembersOpen)} size="small" variant="contained">
                {isAddMembersOpen ? 'Add memmbers' : 'Board Members'}
              </Button>
            </Stack>
            <Box p={1} width={'100%'}>
              {!isAddMembersOpen ? (
                <Stack spacing={1}>
                  <Typography width={'100%'} textAlign={'center'} variant="body1">
                    Choose members to add to this board
                  </Typography>
                  {userList &&
                    userList
                      .filter((user) => user.name.toLowerCase().includes(searchTerm.toLowerCase()))
                      .map((user) => (
                        <Box key={user.id} display={'flex'} alignItems={'center'}>
                          <Card
                            sx={{
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'space-between',
                              width: '100%',
                              paddingRight: '1px',
                            }}
                          >
                            <Typography color={'black'} p={1} variant="body1">
                              {user.name}
                            </Typography>

                            <Box display={'flex'} justifyContent={'space-between'} alignItems={'center'}>
                              {currentDashboard.members.includes(user.name) && <MdDone size={23} color={'0073e6'} />}
                              <Button
                                onClick={() => addMember(user)}
                                variant={'text'}
                                sx={{ '&:hover': { backgroundColor: '#e6f0ff' } }}
                              >
                                <TiUserAddOutline size={23} color={'0073e6'} />
                              </Button>
                            </Box>
                          </Card>
                        </Box>
                      ))}
                </Stack>
              ) : (
                <Stack spacing={1}>
                  <Typography width={'100%'} textAlign={'center'} variant="subtitle1">
                    Board members
                  </Typography>
                  {currentDashboard &&
                    currentDashboard.members
                      .filter((member) => member.toLowerCase().includes(searchTerm.toLowerCase()))
                      .map((member) => (
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
                          <Button
                            onClick={() => deleteMember(member)}
                            variant={'text'}
                            sx={{ '&:hover': { backgroundColor: '#ffe6e6' } }}
                          >
                            <TiUserDeleteOutline size={23} color={'800000'} />
                          </Button>
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
