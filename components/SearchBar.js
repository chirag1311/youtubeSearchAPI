import React, { useState } from "react";
import youtubeApi from "../api/youtube";
import Cards from "./Cards";
import "../src/styles.css";

export default function SearchBar() {
  //states- input query, movies
  const [keyword, setKeyword] = useState(() => "");
  //create the states for parameters of search output array, and update that state appropriate
  const [videoData, setVideoData] = useState(() => []);
  const [nextPage, setNextPage] = useState(() => "");
  const [dataLength, setDataLength] = useState(() => 15);
  const [totalResults, setTotalResults] = useState(() => 0);
  const [hasMore, setHasMore] = useState(() => false);

  // The search function is called with e as event paramenter only when search button is pressed
  // On submitting, youtube Searh api is called which returns data in Json format
  // All the relevant states are set respective to their nature

  const search = async (e) => {
    e.preventDefault();

    //API is called only if there is a keyword input
    if (keyword.length > 0) {
      console.log(
        "search api called - if error - kindly add Google API key in ../api/youtube"
      );
      try {
        const res = await youtubeApi.get("/search", {
          params: {
            q: keyword
          }
        });

        //console.log(res.data.items);
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
    } else {
      // returns if search button is pressed with no keyword
      return;
    }
  };

  // fetchMoreData is called by the next parameter in the react-infinite-scroll dependency
  // react-infinite-scroll is defined in the Cards Component

  const fetchMoreData = async (query, pageToken, videos, results) => {
    //checks the length of the current Videodata state with total results and runs the api if there are results left to display
    if (videos.length < results) {
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
        //console.log(dataLength);
        setNextPage(res.data.nextPageToken);
      } catch (err) {
        console.error(err);
      }
    } else {
      //if the videoData array length equals the results, hasMore is set to false to tell the react-infinite scroller to display the end msg
      setHasMore((prevState) => !prevState);
      return;
    }
  };

  // returns the search inputBar and the Search button which initiates the search API
  // event.target is used to set State, input element value is received by the onChange property
  //
  return (
    <div className="form--container">
      {/* creating the search bar using forms */}
      <form className="form" onSubmit={search}>
        <input
          className="input"
          type="text"
          name="keyword"
          placeholder="Search"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
        />
        <button className="button" type="submit">
          Search
        </button>
      </form>
      {/* Cards component is rendered only if we have successfully fetched data from API  */}
      <div className="searchData--container">
        {videoData.length > 1 ? (
          <Cards
            query={keyword}
            videos={videoData}
            results={totalResults}
            nextPageToken={nextPage}
            dataLength={dataLength}
            hasMore={hasMore}
            fetchMoreData={fetchMoreData}
          />
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}
