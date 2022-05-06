import React, { useState } from "react";
import youtubeApi from "../api/youtube";
import Cards from "./Cards";

export default function InputKeyword() {
  //states- input query, movies
  const [keyword, setKeyword] = useState(() => "");
  //create the state for movies, and update that state appropriate
  const [videoData, setVideoData] = useState(() => []);
  const [nextPage, setNextPage] = useState(() => "");
  const [dataLength, setDataLength] = useState(() => 15);
  const [totalResults, setTotalResults] = useState(() => 0);
  const [hasMore, setHasMore] = useState(() => true);

  const search = async (e) => {
    e.preventDefault();
    console.log("res.data.items: ");
    try {
      const res = await youtubeApi.get("/search", {
        params: {
          q: keyword
        }
      });

      console.log(res.data.items);
      setVideoData(res.data.items);
      setNextPage(res.data.nextPageToken);
      setDataLength(res.data.pageInfo.resultsPerPage);
      setTotalResults(res.data.pageInfo.totalResults);
      if (!hasMore) {
        setHasMore((prevState) => !prevState);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const fetchMoreData = async (query, pageToken, videos, results) => {
    if (videos.length < results) {
      console.log("fetchmoredata api called");
      try {
        const res = await youtubeApi.get("/search", {
          params: {
            q: query,
            pageToken: pageToken
          }
        });
        setVideoData((prevData) => {
          return prevData.concat(res.data.items);
        });
        setDataLength((prevLen) => {
          return prevLen + res.data.items.length;
        });
        console.log(dataLength);
        setNextPage(res.data.nextPageToken);
      } catch (err) {
        console.error(`catch error: ${err}`);
      }
    } else {
      setHasMore((prevState) => !prevState);
      return;
    }
  };

  return (
    <div>
      <form className="form" onSubmit={search}>
        <input
          className="input"
          type="text"
          name="keyword"
          placeholder="i.e. Jurassic Park"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
        />
        <button className="button" type="submit">
          Search
        </button>
      </form>
      <Cards
        query={keyword}
        videos={videoData}
        results={totalResults}
        nextPageToken={nextPage}
        dataLength={dataLength}
        hasMore={hasMore}
        fetchMoreData={fetchMoreData}
      />
    </div>
  );
}
