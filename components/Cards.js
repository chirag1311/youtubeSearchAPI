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
    <>
      {/* using react-infinite sroller for lazy loading!
          the next parameter requires the action to performed for nextpage
          hasMore is the decider parameter to stay or exit the scroller
          loader will display the element while the api data is being fetched 
          (can use spinner or custom cards as well)
          endMessage displays what to display at the end of search results    */}
      <InfiniteScroll
        dataLength={dataLength}
        next={() => fetchMoreData(query, nextPageToken, videos, results)}
        hasMore={hasMore}
        loader={<h4 className="scroll--loader">Loading...</h4>}
        endMessage={
          <p className="scroll--end" style={{ textAlign: "center" }}>
            <b>Yay! You have seen it all</b>
          </p>
        }
      >
        <div className="search--container">
          <div className="card--container">
            {videos
              .filter((video) => video.id.kind === "youtube#video")
              .map((video, index) => (
                <SearchCards key={index} video={video} index={index} />
              ))}
          </div>
        </div>
      </InfiniteScroll>
    </>
  );
}
