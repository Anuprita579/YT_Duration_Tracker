export const metadata = {
  title: "YT Duration Tracker",
  description: "My App helps analyze Youtube Playlists",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body id="root">{children}</body>
    </html>
  );
}
