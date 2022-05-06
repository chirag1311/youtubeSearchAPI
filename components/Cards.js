import React from "react";
import "../src/styles.css";
import InfiniteScroll from "react-infinite-scroll-component";
import SearchCards from "./SearchCards";

export default function Cards({
  query,
  videos,
  results,
  nextPageToken,
  dataLength,
  hasMore,
  fetchMoreData
}) {
  return (
    <div className={results < 1 ? "searchContainer" : "searchContainer show"}>
      <InfiniteScroll
        dataLength={dataLength}
        next={() => fetchMoreData(query, nextPageToken, videos, results)}
        hasMore={hasMore}
        loader={<h4>Loading...</h4>}
        endMessage={
          <p style={{ textAlign: "center" }}>
            <b>Yay! You have seen it all</b>
          </p>
        }
      >
        <div className="card--container">
          {videos
            .filter((video) => video.id.kind === "youtube#video")
            .map((video, index) => (
              <SearchCards key={index} video={video} index={index} />
            ))}
        </div>
      </InfiniteScroll>
    </div>
  );
}
