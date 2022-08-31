import React, {useState} from 'react';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { currentDashboardIdState, currentDashboardState } from 'store/slices/dashboardsSlice';
import { useSelector } from 'react-redux';
import { TiUserDeleteOutline } from 'react-icons/ti';
import { Card, Divider, Stack, TextField } from '@mui/material';
import { Box } from '@mui/system';
import { arrayUnion, doc, updateDoc } from 'firebase/firestore';
import { generalBoardCollection } from 'firebase-client';
import { currentTaskState } from 'store/slices/tasksSlice';

const AssignMembersPopper = ({card}) => {
    const currentDashboard = useSelector(currentDashboardState)
    const dashboardId = useSelector(currentDashboardIdState)
    const tasksDoc = doc(generalBoardCollection, `${dashboardId}`, 'cards', card.id)
    const currentTask = useSelector(currentTaskState)

  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;


  const addMember = async (member) => {
    await updateDoc(tasksDoc, {
      members: arrayUnion({ email: member, id: currentTask.id, key: member }),
    })
  }
  return (
    <div>
      <Button size='small' aria-describedby={id} variant="outlined" onClick={handleClick}>
        Add
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
              <Button size="small" variant="contained">
                Board members
              </Button>
              {/* <CustomSelect /> */}
            </Stack>
            <Box p={1} width={'100%'}>
               
                <Stack spacing={1}>
                  <Typography width={'100%'} textAlign={'center'} variant="subtitle1">
                    Board members
                  </Typography>
                  {currentDashboard &&
                    currentDashboard.members.map((member) => (
                      <Card
                      onClick={() => addMember(member)}
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
    </div>
  );
}
export default AssignMembersPopper