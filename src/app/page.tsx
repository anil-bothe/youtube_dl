"use client";

import { Box, Button, Typography } from "@mui/material";
import InstagramIcon from "@mui/icons-material/Instagram";
import YouTubeIcon from "@mui/icons-material/YouTube";
import HeadphonesIcon from "@mui/icons-material/Headphones";
import { useRouter } from "next/navigation";
import { setPageLoading } from "../components/counterSlice";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";

export default function Home() {
  const router = useRouter();
  const isPageLoading = useSelector(
    (state: any) => state.counter.isPageLoading
  );
  
  const msg = useSelector(
    (state: any) => state.counter.pageLoadingMsg
  );

  const dispatch = useDispatch();

  function goToURL(url: string) {
    dispatch(setPageLoading({isLoading: true, msg: url}));
    router.push(url);
  }

  // useEffect(() => {
  //   // code to run after render goes here
  //   dispatch(setPageLoading({isLoading: false}));
  // });

  return (
    <main style={{ position: "relative", height: "91vh" }}>
      <Box
        sx={{
          backgroundImage: "url(/chaitanya_mahaprabhu.jpg)",
          height: "100%",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center",
          filter: "brightness(50%)",
        }}
      ></Box>
      <Box
        sx={{
          p: 10,
          position: "absolute",
          top: "40%",
          left: "50%",
          width: 720,
          transform: "translate(-50%, -50%)",
        }}
        className="bg-light form"
      >
        <Box sx={{ mb: 5 }}>
          <Typography color="warning" component="h2" fontSize={25}>
            <strong>Youtube, Instagram MP4 & MP3 Converter</strong>
          </Typography>
          <Typography color="warning">
            Click on the following button to download the appropriate file.
          </Typography>
        </Box>

        <Box
          component="div"
          sx={{
            mb: 2,
            gap: 2,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Button
            size="small"
            disabled={isPageLoading}
            variant="contained"
            color="info"
            startIcon={<HeadphonesIcon />}
            onClick={() => goToURL("/youtube/audio")}
          >
            Youtube Audios
          </Button>

          <Button
            size="small"
            variant="contained"
            disabled={isPageLoading}
            color="error"
            startIcon={<YouTubeIcon />}
            onClick={() => goToURL("/youtube/video")}
          >
            Youtube Videos
          </Button>

          <Button
            size="small"
            variant="contained"
            disabled={isPageLoading}
            color="secondary"
            startIcon={<InstagramIcon />}
            onClick={() => goToURL("/insta")}
          >
            Instagram videos
          </Button>
        </Box>
        {isPageLoading ? (
          <Box textAlign={"center"}>
            <Typography>Please wait URL is opening: {msg}</Typography>
          </Box>
        ) : (
          ""
        )}
      </Box>
    </main>
  );
}
