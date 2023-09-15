import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import DownloadForOfflineIcon from "@mui/icons-material/DownloadForOffline";
import LinearProgress from "@mui/material/LinearProgress";
import { useSelector } from "react-redux";
import HomeIcon from "@mui/icons-material/Home";

type customProps = {
  onMenuClick(): void;
};

export default function ButtonAppBar(props: customProps) {
  const isPageLoading = useSelector(
    (state: any) => state.counter.isPageLoading
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            onClick={props.onMenuClick}
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, display: "flex", alignItems: "center" }}
          >
            {/* <IconButton size="large" color="default">
              <DownloadForOfflineIcon />
            </IconButton>{" "} */}
            Social Downloader
          </Typography>
          <IconButton href="/">
            <HomeIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      {isPageLoading ? (
        <Box sx={{ width: "100%" }}>
          <LinearProgress />
        </Box>
      ) : (
        ""
      )}
    </Box>
  );
}
