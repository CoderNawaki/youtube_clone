import {Link } from "react-router-dom";

import {Card,CardContent,CardMedia, Typography} from "@mui/material";
import { CheckCircle } from "@mui/icons-material";

import { demoThumbnailUrl,demoVideoUrl,demoVideoTitle,
    demoChannelUrl, demoChannelTitle } from "../utils/constants";

const VideoCard = ({video:{id:{videoId},snippet}}) => {
    console.log(videoId,snippet);
  return (
    <Card>
        <Link to={videoId? `/video/${videoId}`:demoVideoUrl}>
         <CardMedia image={snippet?.thumbnails?.high?.url} 
                    alt ={snippet?.title}
                    sx={{width:358, height:180}}/>
        </Link>
        <CardContent sx={{backgroundColor:'#1e1e1e', height:'106px'}} >
            <Link to={videoId?`/video/${videoId}`:demoVideoUrl}>
                <Typography variant="subtitle1" fontWeight="bold" color="#fff">
                    {snippet?.title.slice(0,60) || demoVideoTitle.slice(0,60)}
                </Typography>
            </Link>
            <Link to={snippet?.channelId ? `/channel/${channelId}`:demoChannelUrl}>
                <Typography variant="subtitle1" fontWeight="bold" color="#fff">
                    {snippet?.channelTitle || demoChannelTitle}
                </Typography>
            </Link>
            </CardContent>
    </Card>
  )
}

export default VideoCard