"use client";

import { Box, Button, Grid, Typography } from "@mui/material";
import InstagramIcon from "@mui/icons-material/Instagram";
import YouTubeIcon from "@mui/icons-material/YouTube";
import HeadphonesIcon from "@mui/icons-material/Headphones";
import { useRouter } from "next/navigation";
import { setPageLoading } from "../redux/counterSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";

export default function Home() {
  const router = useRouter();
  const isPageLoading = useAppSelector(
    (state: any) => state.counter.isPageLoading
  );

  const msg = useAppSelector((state: any) => state.counter.pageLoadingMsg);

  const dispatch = useAppDispatch();

  function goToURL(url: string) {
    dispatch(setPageLoading({ isLoading: true, msg: url }));
    router.push(url);
  }

  // useEffect(() => {
  //   // code to run after render goes here
  //   dispatch(setPageLoading({isLoading: false}));
  // });

  return (
    <main style={{ position: "relative", height: "91vh" }}>
      <Box className="background-image"></Box>
      <Box className="parentBoxLayout">
        <Box className="childrenBoxLayout1">
          <Typography color="warning" component="h1" className="large-font">
            <strong>Social Media Downloader</strong>
          </Typography>
          <Typography className="txt-gray" color="warning">
            Unlimited downloads & free.
          </Typography>
        </Box>

        <Grid container spacing={2}>
          <Grid item md={4} xs={12}>
            <Button title="Youtube to MP4" fullWidth variant="outlined" color="error" onClick={() => goToURL("/youtube/video")} startIcon={<YouTubeIcon />}>Youtube MP4</Button>
          </Grid>
          <Grid item md={4} xs={12}>
            <Button title="Youtube to MP3" fullWidth variant="outlined" color="secondary" onClick={() => goToURL("/youtube/audio")} startIcon={<HeadphonesIcon />}>Youtube MP3</Button>
          </Grid>
          <Grid item md={4} xs={12}>
            <Button title="Instagram to MP4" fullWidth variant="outlined" color="primary" onClick={() => goToURL("/insta")} startIcon={<InstagramIcon />}>Instagram MP4</Button>
          </Grid>
          <Grid item md={12} xs={12}></Grid>
        </Grid>
      </Box>
    </main>
  );
}
