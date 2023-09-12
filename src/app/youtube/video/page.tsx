"use client";
import { YT_VIDEO_URL } from "@/utility/constants";
import SearchIcon from "@mui/icons-material/Search";
import { Box, Button, Typography } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import TextField from "@mui/material/TextField";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setPageLoading } from "../../../components/counterSlice";

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
    console.log(url);

    if (url.indexOf("youtube") == -1) {
      setErrorMsg("Please enter valid URL");
      setIsLoading(false);
      return;
    }

    fetch(YT_VIDEO_URL + url.trim())
      .then((res) => {
        const header = res.headers.get("Content-Disposition");
        const parts = header!.split(";");
        
        setErrorMsg("Converting ..");
        return { blob: res.blob(), filename: parts[1].split("=")[1]};
      })
      .then(async (obj) => {
        const blob: Promise<Blob> = obj.blob;
        const filename = obj.filename.trim().split(".mp4")[0];
        
        if ((await blob).size == 0) {
          setErrorMsg("File not converted! Something went wrong :(");
          setIsLoading(false);
          return;
        }

        setErrorMsg("Almost done ..");
        const downloadUrl = window.URL.createObjectURL(await blob);
        downloadURI(downloadUrl, filename);
        URL.revokeObjectURL(downloadUrl);

        setIsLoading(false);
        setErrorMsg("Thanks for downloading ..");
      })
      .catch((e) => {
        console.log(e)
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
            <strong>Youtube To MP4 Converter.</strong>
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
