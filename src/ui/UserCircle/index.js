import { Typography } from '@mui/material';
import { Box } from '@mui/system';
import React, {useState, useEffect} from 'react'
import { useSelector } from 'react-redux';
import { currentUserStateName } from 'store/slices/usersSlice';

const UserCircle = ({handleClick, size}) => {
    const [iconName, setIconName] = useState("")
    const userName = useSelector(currentUserStateName)

  useEffect(() => {
    if(userName) {
      setIconName(userName.split(' ')[0].slice(0, 1) + userName.split(' ')[1].slice(0, 1))
    } else setIconName("")
  }, [userName]);

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
              {iconName ? iconName : "User"}
            </Typography>
          </Box>
        </Box>
  )
}

export default UserCircle