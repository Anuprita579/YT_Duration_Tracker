import React from "react";

const page = () => {
  return (
    <div style={{ padding: "2rem", fontFamily: "Arial, sans-serif" }}>
      <h1>Privacy Policy for YouTube Duration Tracker</h1>
      <p>
        This Chrome extension does not collect, store, or transmit any user
        data.
      </p>
      <p>
        It solely reads publicly available data on YouTube playlist pages (such
        as video titles and durations) to calculate playlist duration and
        playback time estimates.
      </p>
      <p>No personally identifiable information is collected or shared.</p>
      <p>This extension does not use cookies, trackers, or remote scripts.</p>
      <p>
        If you have any questions, feel free to{" "}
        <a href="mailto:anupritamhapankar22@gmail.com">Mail me</a>.
      </p>
    </div>
  );
};

export default page;
