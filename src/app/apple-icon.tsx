import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default async function AppleIcon() {
  const fontData = await readFile(
    join(process.cwd(), "src/app/fonts/Caveat-Bold.ttf")
  );

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#B8A9C9",
          borderRadius: "36px",
          fontFamily: "Caveat",
          fontSize: 140,
          fontWeight: 700,
          color: "white",
          paddingTop: 8,
        }}
      >
        G
      </div>
    ),
    {
      ...size,
      fonts: [
        {
          name: "Caveat",
          data: fontData,
          weight: 700,
          style: "normal",
        },
      ],
    }
  );
}
