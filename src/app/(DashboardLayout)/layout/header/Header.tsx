import React, { useState } from "react";
import {
  Box,
  AppBar,
  Toolbar,
  styled,
  Stack,
  IconButton,
  Badge,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import PropTypes from "prop-types";

// components
import Profile from "./Profile";
import { IconBellRinging, IconMenu } from "@tabler/icons-react";

interface ItemType {
  toggleMobileSidebar: (event: React.MouseEvent<HTMLElement>) => void;
}

const Header = ({ toggleMobileSidebar }: ItemType) => {
  // const lgUp = useMediaQuery((theme) => theme.breakpoints.up('lg'));
  // const lgDown = useMediaQuery((theme) => theme.breakpoints.down('lg'));

  const [anchorEl2, setAnchorEl2] = useState(null);

  const AppBarStyled = styled(AppBar)(({ theme }) => ({
    boxShadow: "none",
    background: theme.palette.background.paper,
    justifyContent: "center",
    backdropFilter: "blur(4px)",
    [theme.breakpoints.up("lg")]: {
      minHeight: "70px",
    },
  }));
  const ToolbarStyled = styled(Toolbar)(({ theme }) => ({
    width: "100%",
    color: theme.palette.text.secondary,
  }));

  const handleToggleNotification = (event: any) => {
    setAnchorEl2(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl2(null);
  };

  return (
    <AppBarStyled position="sticky" color="default">
      <ToolbarStyled>
        {/* <IconButton
          color="inherit"
          aria-label="menu"
          onClick={toggleMobileSidebar}
          sx={{
            display: {
              lg: "none",
              xs: "inline",
            },
          }}
        >
          <IconMenu width="20" height="20" />
        </IconButton> */}

        {/* <IconButton
          size="large"
          aria-label="show 11 new notifications"
          color="inherit"
          aria-controls="msgs-menu"
          aria-haspopup="true"
          onClick={handleToggleNotification}
          sx={{
            ...(typeof anchorEl2 === "object" && {
              color: "secondary.main",
            }),
          }}
        >
          <Badge variant="dot" color="primary">
            <IconBellRinging size="21" stroke="1.5" />
          </Badge>
        </IconButton> */}
        <Menu
          id="msgs-menu"
          anchorEl={anchorEl2}
          keepMounted
          open={Boolean(anchorEl2)}
          onClose={handleClose}
          anchorOrigin={{ horizontal: "left", vertical: "bottom" }}
          transformOrigin={{ horizontal: "left", vertical: "top" }}
          sx={{
            "& .MuiMenu-paper": {
              width: "400px",
            },
          }}
        >
          <MenuItem>
            <ListItemIcon>
              <div>this</div>
            </ListItemIcon>
            <ListItemText>My Profile</ListItemText>
          </MenuItem>
          <MenuItem>
            <ListItemIcon>
              <div>this</div>
            </ListItemIcon>
            <ListItemText>My Account</ListItemText>
          </MenuItem>
          <MenuItem>
            <ListItemIcon>
              <div>this</div>
            </ListItemIcon>
            <ListItemText>My Tasks</ListItemText>
          </MenuItem>
          <Box mt={1} py={1} px={2}>
            <div>this</div>
          </Box>
        </Menu>

        <Box flexGrow={1} />
        <Stack spacing={1} direction="row" alignItems="center">
          {/* <Button variant="contained" disableElevation color="primary"  target="_blank" href="https://adminmart.com/product/modernize-next-js-admin-dashboard">
            Upgrade to Pro
          </Button> */}
          <Profile />
        </Stack>
      </ToolbarStyled>
    </AppBarStyled>
  );
};

Header.propTypes = {
  sx: PropTypes.object,
};

export default Header;
