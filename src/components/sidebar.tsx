import HeadphonesIcon from "@mui/icons-material/Headphones";
import HomeIcon from "@mui/icons-material/Home";
import InstagramIcon from "@mui/icons-material/Instagram";
import YouTubeIcon from "@mui/icons-material/YouTube";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ListSubheader from "@mui/material/ListSubheader";
import { useRouter } from "next/navigation";
import * as React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPageLoading } from "../redux/counterSlice";

export default function Sidebar() {
  const [open, setOpen] = React.useState(true);

  const router = useRouter();
  const dispatch = useDispatch();

  function goToURL(url: string) {
    dispatch(setPageLoading({ isLoading: true, msg: url }));
    router.push(url);
  }

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <Box>
      <List
        sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
        component="nav"
        aria-labelledby="nested-list-subheader"
        subheader={
          <ListSubheader
            component="h2"
            id="nested-list-subheader"
            sx={{
              backgroundColor: "#FFC436",
              p: 1,
              display: "flex",
              alignItems: "centrer",
              justifyContent: "center",
              boxShadow: "-2px 0px 4px #000",
            }}
          >
            <strong>Admin Panel</strong>
          </ListSubheader>
        }
      >
        <ListItemButton href="/">
          <ListItemIcon>
            <HomeIcon />
          </ListItemIcon>
          <ListItemText primary="Home Page" />
        </ListItemButton>

        <ListItemButton
          onClick={() => {
            goToURL("/youtube/video");
          }}
        >
          <ListItemIcon>
            <YouTubeIcon />
          </ListItemIcon>
          <ListItemText primary="Video Downloader" />
        </ListItemButton>
        <ListItemButton
          onClick={() => {
            goToURL("/youtube/audio");
          }}
        >
          <ListItemIcon>
            <HeadphonesIcon />
          </ListItemIcon>
          <ListItemText primary="Audio Downloader" />
        </ListItemButton>
        <ListItemButton
          onClick={() => {
            goToURL("/insta");
          }}
        >
          <ListItemIcon>
            <InstagramIcon />
          </ListItemIcon>
          <ListItemText primary="Instagram Downloader" />
        </ListItemButton>
      </List>
    </Box>
  );
}
