import YouTube from "react-youtube";

const YoutubeEmbed = ({ id }) => {
  if (!id) {
    return null;
  }

  const playerVars = {
    height: "800",
    width: "95%",
    autoplay: 1,
    enablejsapi: 1,
    webShare: 0,
  };

  const _onReady = (event) => {
    event.target.pauseVideo();
  };

  return <YouTube videoId={id} opts={playerVars} onReady={_onReady} />;
};

export default YoutubeEmbed;
