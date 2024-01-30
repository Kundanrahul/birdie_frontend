import React, { useState } from 'react';
import './Sidebar.css';
import FlutterDashRounded from '@mui/icons-material/FlutterDashRounded';
import HomeIcon from "@mui/icons-material/Home";
import SearchIcon from "@mui/icons-material/Search";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import ListItemIcon from '@mui/material/ListItemIcon';
import ListAltIcon from "@mui/icons-material/ListAlt";
import PermIdentityIcon from "@mui/icons-material/PermIdentity";
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import MoreIcon from "@mui/icons-material/More"
import CustomeLink from './CustomLink';
import SidebarOptions from './SidebarOptions';
import DoneIcon from '@mui/icons-material/Done';
import Button from "@mui/material/Button";
import { Avatar, Divider, IconButton, Menu, MenuItem } from '@mui/material';
import AddPhotoAlternateOutlinedIcon from '@mui/icons-material/AddPhotoAlternateOutlined';
import SubscriptionsIcon from '@mui/icons-material/Subscriptions';
import useLoggedInUser from '../../hooks/useLoggedInUser';

const Sidebar = ({ handleLogout, user }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  
  

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
    setAnchorEl(sidebarOpen ? null : anchorEl);
  };

  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  const openMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const closeMenu = () => {
    setAnchorEl(null);
  };

  const loggedInUser = useLoggedInUser();
  const userProfilepic = loggedInUser[0]?.profileImage ? loggedInUser[0]?.profileImage : "";
  const result = user?.email?.split('@')[0];

  return (
    <>
      <button className="sidebar__toggle" onClick={toggleSidebar}>
    {sidebarOpen ? <span className="close-icon"> </span> : <span className="open-icon">☰</span>}
  </button>
      <div className={`sidebar ${sidebarOpen ? 'open' : ''}`}>
        <FlutterDashRounded className='sidebar__birdie'/>
        <CustomeLink to='/home/feed' onClick={closeSidebar}>
          <SidebarOptions active Icon={HomeIcon} text="Home" />
        </CustomeLink>
        <CustomeLink to='/home/explore' onClick={closeSidebar}>
          <SidebarOptions Icon={SearchIcon} text="Explore"  />
        </CustomeLink>
        <CustomeLink to='/home/notifications' onClick={closeSidebar}>
          <SidebarOptions Icon={NotificationsNoneIcon} text="Notifications" />
        </CustomeLink>
        <CustomeLink to='/home/messages' onClick={closeSidebar}>
          <SidebarOptions Icon={MailOutlineIcon} text="Messages" />
        </CustomeLink>
        <CustomeLink to='/home/bookmarks' onClick={closeSidebar}>
          <SidebarOptions Icon={BookmarkBorderIcon} text="Bookmarks" />
        </CustomeLink>
        <CustomeLink to='/home/lists' onClick={closeSidebar}>
          <SidebarOptions Icon={ListAltIcon} text="Lists" />
        </CustomeLink>
        <CustomeLink to='/home/profile' onClick={closeSidebar}>
          <SidebarOptions Icon={PermIdentityIcon} text="Profile" />
        </CustomeLink>
        <CustomeLink to='/home/more' onClick={closeSidebar}>
          <SidebarOptions Icon={MoreIcon} text="More" />
        </CustomeLink>
        <CustomeLink to='/home/subscribe' onClick={closeSidebar} >
          <SidebarOptions Icon={SubscriptionsIcon} text="Subscribe" />
        </CustomeLink>
        <Button variant="outlined" className="sidebar__tweet" fullWidth>
          Post
        </Button>
        <div className='Profile__info'>
          <Avatar src={userProfilepic}></Avatar>
          <div className='user__info'>
            <h4>
              {loggedInUser[0]?.name ? loggedInUser[0]?.name : user && user?.displayName}
            </h4>
            <h5>
              @{result}
            </h5>
          </div>
          <IconButton
            size='small'
            sx={{ ml: 2 }}
            aria-controls="basic-menu"
            aria-haspopup="true"
            aria-expanded={Boolean(anchorEl)}
            onClick={openMenu}>
            <MoreHorizIcon />
          </IconButton>
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={closeMenu}>
            <MenuItem className='Profile__info'>
              <Avatar></Avatar>
              <div className='user__info subUser__info'>
                <div>
                  <h4>
                    {loggedInUser[0]?.name ? loggedInUser[0]?.name : user && user?.displayName}
                  </h4>
                  <h5 style={{ color: 'black' }}>
                    @{result}
                  </h5>
                </div>
                <ListItemIcon className='done_icon'>
                  <DoneIcon />
                </ListItemIcon>
              </div>
            </MenuItem>
            <Divider />
            <MenuItem onClick={closeMenu}>Add an existing account</MenuItem>
            <MenuItem onClick={handleLogout}>Log out</MenuItem>
          </Menu>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
