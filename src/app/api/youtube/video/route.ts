import { NextResponse } from "next/server";
import ytdl from "ytdl-core";

export async function GET(request: Request, response: Response) {
  const { searchParams } = new URL(request.url);
  const url = searchParams.get("link");
  const responseHeaders = new Headers(response.headers);
  console.log("Youtube URL: ", url);

  if (!url) {
    return NextResponse.json({ data: "No URL" });
  }

  // const videoMetaData = await ytdl.getBasicInfo(url);

  responseHeaders.set(
    "Content-Disposition",
    `attachment; filename="youtube-video.mp4"`
  );

  responseHeaders.set("Content-Type", "video/mp4");

  responseHeaders.set(
    "User-Agent",
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.88 Safari/537.36"
  );

  const data = ytdl(url, { quality: "highestvideo", filter: "videoandaudio" }); //send it dowwwwn
    
  return new Response(data as any, {
    headers: responseHeaders,
  });
}
