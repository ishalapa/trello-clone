import React, { useState } from 'react'
import { Button, Card, Divider, IconButton, Popover, Stack, TextField, Typography } from '@mui/material'
import { useSelector } from 'react-redux'
import { currentUserStateEmail, currentUserStateId, usersState } from 'store/slices/usersSlice'
import { Box } from '@mui/system'
import { arrayRemove, arrayUnion, doc, updateDoc } from 'firebase/firestore'
import { usersCollection } from 'firebase-client'
import { AiFillHeart } from 'react-icons/ai'
import { currentDashboardState, setCurrentDashboard } from 'store/slices/dashboardsSlice'
import { TiUserAddOutline } from 'react-icons/ti'
import { MdDone } from 'react-icons/md'
import { useDispatch } from 'react-redux'
import { generalBoardCollection } from 'firebase-client'
import CustomSelect from 'components/CustomSelect'

const AddMemberPopper = () => {
  const dispatch = useDispatch()
  const userList = useSelector(usersState)
  const userEmail = useSelector(currentUserStateEmail)
  const userID = useSelector(currentUserStateId)
  const currentDashboard = useSelector(currentDashboardState)

  const [searchTermin, setSearchTermin] = useState('')
  const [members, setMembers] = useState('All');

  const dashboardDoc = doc(generalBoardCollection, `${currentDashboard.id}`)

  const currentUser = userList.filter((user) => user.email === userEmail)[0]

  const addMember = async (user) => {
    if (currentDashboard.members.includes(user.email)) {
      return
    } else {
      dispatch(setCurrentDashboard({ ...currentDashboard, members: [...currentDashboard.members, user.email] }))
      await updateDoc(dashboardDoc, {
        members: arrayUnion(user.email),
      })
    }
  }

  const checkIfFavofite = (user) => {
    const isUserFavorite = currentUser.favorites && currentUser.favorites.some(el => el.id === user.id)
    return isUserFavorite
  }
  
  const toggleFavorite = async (user) => {
    const userDoc = doc(usersCollection, `${userID}`)
    const isUserFavorite = checkIfFavofite({email: user.email, id: user.id})
    if (isUserFavorite) {
        await updateDoc(userDoc, {
            favorites: arrayRemove({email: user.email, id: user.id}),
          })
    } else {
        await updateDoc(userDoc, {
            favorites: arrayUnion({email: user.email, id: user.id}),
          })
    }
  }
  // Open popper
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
  const currentMembers = members === "Favorites" && currentUser.favorites && currentUser ? currentUser.favorites : userList

  return (
    <>
      <Button aria-describedby={id} variant="contained" onClick={openPopper}>
        Add Members
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
          <Stack pt={1} direction={'row'} spacing={1} display={'flex'} justifyContent={'center'}>
            <TextField
              value={searchTermin}
              onChange={(e) => setSearchTermin(e.target.value)}
              placeholder="Search members"
              size="small"
            />
            <CustomSelect members={members} setMembers={setMembers}/>
          </Stack>
          <Box p={1} width={'100%'}>
            <Stack spacing={1}>
              <Typography width={'100%'} textAlign={'center'} variant="body1">
                Choose members to add to this board
              </Typography>
              {currentMembers && currentUser && currentMembers
                  .filter((user) => user.email.toLowerCase().includes(searchTermin.toLowerCase()))
                  .map((user) => (
                    <Box key={user.id} display={'flex'} alignItems={'center'} position="relative">
                      {checkIfFavofite(user) ? (
                        <IconButton color={'error'} onClick={() => toggleFavorite(user)} sx={{ right: '5px' }}>
                          <AiFillHeart size={22} />
                        </IconButton>
                      ) : (
                        <IconButton color={'default'} onClick={() => toggleFavorite(user)} sx={{ right: '5px' }}>
                          <AiFillHeart size={22} />
                        </IconButton>
                      )}
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
                          {user.email}
                        </Typography>

                        <Box display={'flex'} justifyContent={'space-between'} alignItems={'center'}>
                          {currentDashboard.members.includes(user.email) && <MdDone size={23} color={'0073e6'} />}
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
          </Box>
        </Box>
      </Popover>
    </>
  )
}

export default AddMemberPopper
