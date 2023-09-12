import { NextResponse } from "next/server";

// https://www.instagram.com/reel/Cwu3PQutZ96/?utm_source=ig_web_copy_link

// accepts the URL of an instagram page
const getVideo = async (url: string) => {
  // const instaID = url.split("/reel/")[1].split("/")[0]
  const newURL = url + "&__a=1&__d=dis";
  let val = "";
  try {
    await fetch(newURL).then((res) =>
      res
        .text()
        .then(
          (jsn) => JSON.parse(jsn)["graphql"]["shortcode_media"]["video_url"]
        )
        .then((val) => {
          console.log(val);
        })
    );
  } catch (e) {
    console.log(e);
  }
};

export async function GET(request: Request, response: Response) {
  const { searchParams } = new URL(request.url);
  const url = searchParams.get("link");
  const responseHeaders = new Headers(response.headers);
  console.log("Youtube URL: ", url);

  if (!url) {
    return NextResponse.json({ data: "No URL" });
  }

  return NextResponse.json({
    videoURL: "",
  });
}
