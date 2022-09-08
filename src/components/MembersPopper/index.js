import React, { useState } from 'react'
import Popover from '@mui/material/Popover'
import Typography from '@mui/material/Typography'

import { Box, Divider, Stack, TextField, Card, Button } from '@mui/material'
import { useSelector } from 'react-redux'

import { currentDashboardState, setCurrentDashboard } from 'store/slices/dashboardsSlice'
import { TiUserDeleteOutline} from 'react-icons/ti'

import { arrayRemove, doc, updateDoc } from 'firebase/firestore'
import { generalBoardCollection } from 'firebase-client'
import { useDispatch } from 'react-redux'

const MembersPopper = () => {
  const dispatch = useDispatch()
  const currentDashboard = useSelector(currentDashboardState)

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
  const [searchTermin, setSearchTermin] = useState('')

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
          <Stack display={'flex'} alignItems={'center'} justifyContent={'center'} spacing={1} pt={1}>
            <TextField
              value={searchTermin}
              onChange={(e) => setSearchTermin(e.target.value)}
              placeholder="Search members"
              size="small"
              sx={{ width: '90%' }}
            />
            <Box p={1} width={'100%'}>
              <Stack spacing={1}>
                <Typography width={'100%'} textAlign={'center'} variant="subtitle1">
                  Board members
                </Typography>
                {currentDashboard.members
                  .filter((member) => member.toLowerCase().includes(searchTermin.toLowerCase()))
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
            </Box>
          </Stack>
        </Box>
      </Popover>
    </>
  )
}

export default MembersPopper
