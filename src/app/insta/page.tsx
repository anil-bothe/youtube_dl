"use client";
import { INSTA_VIDEO_URL } from "@/utility/constants";
import SearchIcon from "@mui/icons-material/Search";
import { Box, Button, Typography } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import TextField from "@mui/material/TextField";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setPageLoading } from "../../components/counterSlice";

export default function AudioPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [url, setInputText] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setPageLoading({ isLoading: false, msg: "" }));
  });

  function downloadURI(uri: string, file_name: string) {
    let link = document.createElement("a");
    link.href = uri;
    link.download = file_name + ".mp4";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  const onSearchClick = () => {
    //https://www.youtube.com/watch?v=S3Dpfyc15qQ

    setIsLoading(true);
    setErrorMsg("Getting Info ..");

    if (url.indexOf("instagram") == -1) {
      setErrorMsg("Please enter valid URL");
      setIsLoading(false);
      return;
    }

    fetch(INSTA_VIDEO_URL + url.trim())
      .then((res) =>
        res.text().then((txt) => {
          setErrorMsg("Converting ..");
          const downloadUrl = JSON.parse(txt)["videoURL"];
          console.log(downloadUrl);
          downloadURI(downloadUrl, "instagram-video");
          setErrorMsg("downloading started ..");
          setIsLoading(false);
        })
      )
      .catch((e) => {
        console.log(e);
        setErrorMsg("Something went wrong!");
        setIsLoading(false);
      });
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
            <strong>Instagram To MP4 Converter.</strong>
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
            label="Instagram URL"
            variant="outlined"
            onChange={(e) => setInputText(e.target.value)}
          />
          <Box>
            <Button
              size="medium"
              variant="contained"
              disabled={true}
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
              {errorMsg != "" ? errorMsg : "This feather will come soon ! "}
            </Typography>
          </Box>
        )}
      </Box>
    </main>
  );
}
