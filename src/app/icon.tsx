import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default async function Icon() {
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
          borderRadius: "8px",
          fontFamily: "Caveat",
          fontSize: 26,
          fontWeight: 700,
          color: "white",
          paddingTop: 2,
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
