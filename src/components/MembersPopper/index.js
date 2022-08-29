import React, { useState } from 'react'
import Popover from '@mui/material/Popover'
import Typography from '@mui/material/Typography'

import { Box, Divider, Stack, TextField, Card, Button, IconButton } from '@mui/material'
import { useSelector } from 'react-redux'
import { usersState } from 'store/slices/usersSlice'

import { currentDashboardState } from 'store/slices/dashboardsSlice'
import { TiUserDeleteOutline, TiUserAddOutline } from 'react-icons/ti'

const MembersPopper = () => {
  const currentDushboard = useSelector(currentDashboardState)
  const userList = useSelector(usersState)
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
                  <Typography width={"100%"} textAlign={"center"} variant="body1">
                    Choose members to add
                  </Typography>
                  {userList &&
                    userList.map((user, index) => (
                      <Card
                        key={index}
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          paddingRight: "2px",
                        }}
                      >
                        <Typography color={'black'} p={1} variant="body1">
                          {user.name}
                        </Typography>
                        <Box
                          height={33}
                          width={53}
                          display={'flex'}
                          alignItems={'center'}
                          justifyContent={'center'}
                          borderRadius={1}
                          sx={{ '&:hover': { backgroundColor: '#e6f0ff', color: 'black', cursor:"pointer" } }}
                        >
                          <TiUserAddOutline size={23} color={'0073e6'} />
                        </Box>
                      </Card>
                    ))}
                </Stack>
              ) : (
                <Stack spacing={1}>
                  <Typography width={"100%"} textAlign={"center"} variant="subtitle1">
                    Board members
                  </Typography>
                  {currentDushboard &&
                    currentDushboard.members.map((member, index) => (
                      <Card
                        key={index}
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
                          height={33}
                          width={53}
                          display={'flex'}
                          alignItems={'center'}
                          justifyContent={'center'}
                          borderRadius={1}
                          sx={{ '&:hover': { backgroundColor: '#ffe6e6', color: 'black', cursor:"pointer" } }}
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
