import React from "react";
import ExploreTab from "../FeedPage/ExploreTab";
import FeedFriendTab from "../FeedPage/FeedFriendTab";
import LikesTab from "../FeedPage/LikesTab";
import FriendTab from "../friend/Tabs/FriendTab";
import RequestTab from "../friend/Tabs/RequestTab";
import FindTab from "../friend/Tabs/FindTab";

const componentMap: Record<string, React.ReactElement> = {
  friendINfeed: <FeedFriendTab />,
  searchINfeed: <ExploreTab title1="한국어" title2="English" />,
  likeINfeed: <LikesTab />,
  totalINdiary: <div>모두/다이어리 컴포넌트</div>,
  likeINdiary: <div>좋아요/다이어리 컴포넌트</div>,
  findINfriend: <FindTab />,
  friendINfriend: <FriendTab />,
  requestINfriend: <RequestTab />,
};

interface ComponentMapProps {
  value: string;
}

const ComponentMap = ({ value }: ComponentMapProps) => {
  return componentMap[value];
};

export default ComponentMap;
