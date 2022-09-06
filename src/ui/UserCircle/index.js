import React, {useState, useEffect} from 'react'

import { Typography, Box } from '@mui/material';

const UserCircle = ({handleClick, size, authorName}) => {

  const [userAvatarInitials, setUserAvatarInitials] = useState("")

  const createDefaultUserAvatar = () => {
    setUserAvatarInitials(authorName.split(' ')[0].slice(0, 1) + authorName.split(' ')[1].slice(0, 1))
 }

 useEffect(() => {
  authorName && createDefaultUserAvatar()
 },[])

  return (
    <Box onClick={handleClick('bottom-start')} variant="contained">
          <Box
            display="flex"
            alignItems="center"
            justifyContent="center"
            width={size}
            height={size}
            sx={{ backgroundColor: '#004285', cursor:"pointer" }}
            borderRadius="50%"
          >
            <Typography color={'white'} fontSize={14} textAlign="center" variant="subtitle2" sx={{ p: 1 }}>
              {userAvatarInitials}
            </Typography>
          </Box>
        </Box>
  )
}

export default UserCircle