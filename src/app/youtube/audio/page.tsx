"use client";
import { setPageLoading } from "@/redux/counterSlice";
import { useAppDispatch } from "@/redux/hooks";
import { YT_AUDIO_URL } from "@/utility/constants";
import SearchIcon from "@mui/icons-material/Search";
import { Box, Button, Typography } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import TextField from "@mui/material/TextField";
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
    link.download = "youtube_audio.mp3";
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
    //https://www.youtube.com/watch?v=S3Dpfyc15qQ

    setIsLoading(true);
    setErrorMsg("Getting Info ..");

    if (url.indexOf("youtube") == -1) {
      setErrorMsg("Please enter valid URL");
      setIsLoading(false);
      return;
    }
    
    downloadURI(YT_AUDIO_URL + url.trim());
  };

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
          width: 720,
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
        className="bg-light form"
      >
        <Box sx={{ mb: 10 }}>
          <Typography color="warning" component="h2" fontSize={25}>
            <strong>Youtube To MP3 Converter.</strong>
          </Typography>
          <Typography color="warning">Unlimited downloads & free</Typography>
        </Box>

        <Box
          component="form"
          sx={{ my: 2, display: "flex", justifyContent: "space-between" }}
          noValidate
          autoComplete="off"
        >
          <TextField
            size="small"
            sx={{ width: "100%", mr: 2 }}
            id="outlined-basic"
            label="Youtube URL"
            variant="outlined"
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                onSearchClick();
              }
            }}
          />
          <Box>
            <Button
              size="medium"
              variant="contained"
              color="secondary"
              startIcon={<SearchIcon />}
              onClick={onSearchClick}
            >
              Search
            </Button>
          </Box>
        </Box>

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
      </Box>
    </main>
  );
}
