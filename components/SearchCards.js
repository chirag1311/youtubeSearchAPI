import React from "react";
import "../src/styles.css";

export default function SearchCards({ video, index }) {
  return (
    <div className="card--list">
      <div className="card" key={index}>
        <img
          className="card--image"
          alt={video.snippet.title + "Poster"}
          src={video.snippet.thumbnails.medium.url}
        />
        <div className="card--content">
          <h3 className="card--title">{video.snippet.title}</h3>
          <p>
            <small>
              RELEASE DATE: {video.snippet.publishedAt.slice(0, 10)}
            </small>
          </p>
          <p>
            <small>CHANNEL: {video.snippet.channelTitle}</small>
          </p>
          <p className="card--desc">{video.snippet.description}</p>
        </div>
      </div>
    </div>
  );
}
