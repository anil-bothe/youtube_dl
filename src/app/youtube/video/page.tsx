"use client";
import { setPageLoading } from "@/redux/counterSlice";
import { useAppDispatch } from "@/redux/hooks";
import { YT_VIDEO_URL } from "@/utility/constants";
import SearchIcon from "@mui/icons-material/Search";
import { Box, Button, Grid, Typography } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import { styled } from "@mui/material/styles";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function AudioPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [url, setInputText] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setPageLoading({ isLoading: false, msg: "" }));
  });

  function downloadURI(uri: string) {
    let link = document.createElement("a");
    link.href = uri;
    link.download = "youtube_video.mp4";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setErrorMsg("Please wait download start shortly.");
    setTimeout(() => {
      setErrorMsg("");
      setIsLoading(false);
    }, 15000);
  }

  const onSearchClick = () => {
    // https://www.youtube.com/watch?v=S3Dpfyc15qQ

    setIsLoading(true);
    setErrorMsg("Getting Info ..");

    if (url.indexOf("youtu") == -1) {
      setErrorMsg("Please enter valid URL");
      setIsLoading(false);
      return;
    }

    downloadURI(YT_VIDEO_URL + url.trim());
  };

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: "transparent",
    boxShadow: "none",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
  }));

  return (
    <main style={{ position: "relative", height: "91vh" }}>
      <Box className="background-image"></Box>
      <Box className="parentBoxLayout">
        <Box className="childrenBoxLayout1">
          <Image alt="Insta Logo" src="/youtube.png" width={359 - 275} height={253 - 200} />
          <Typography color="warning" component="h2" className="medium-font">
            <strong>Youtube To MP4 Converter.</strong>
          </Typography>
          <Typography className="txt-gray" color="warning">
            Unlimited downloads & free
          </Typography>
        </Box>

        <Grid container spacing={2}>
          <Grid item md={8} xs={12}>
            <TextField
              size="small"
              sx={{ width: "100%", mr: 2 }}
              id="outlined-basic"
              label="Youtube URL"
              variant="outlined"
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={(k) => {
                if (k.key === "Enter") {
                  k.preventDefault();
                  onSearchClick();
                }
              }}
            />
          </Grid>
          <Grid item md={4} xs={12}>
            <Button
              size="medium"
              variant="contained"
              color="secondary"
              startIcon={<SearchIcon />}
              onClick={onSearchClick}
            >
              Search
            </Button>
          </Grid>
          <Grid item md={12} xs={12}>
            {isLoading ? (
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: 2,
                }}
              >
                <CircularProgress /> {errorMsg} ...
              </Box>
            ) : (
              <Box textAlign="center">
                <Typography sx={{ color: "blueviolet" }}>
                  {errorMsg != "" ? errorMsg : "We are happy to help you ! "}
                </Typography>
              </Box>
            )}
          </Grid>
        </Grid>
      </Box>
    </main>
  );
}
