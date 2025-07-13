import React from "react";
import ExploreTab from "../FeedPage/ExploreTab";
import FeedFriendTab from "../FeedPage/FeedFriendTab";
import LikesTab from "../FeedPage/LikesTab";
import FriendTab from "../friend/Tabs/FriendTab";

const componentMap: Record<string, React.ReactElement> = {
  "친구/피드": <FeedFriendTab />,
  "탐색/피드": <ExploreTab title1="한국어" title2="English" />,
  "좋아요/피드": <LikesTab />,
  "모두/다이어리": <div>모두/다이어리 컴포넌트</div>,
  "좋아요/다이어리": <div>좋아요/다이어리 컴포넌트</div>,
  "친구/친구찾기": <div>친구/친구찾기 컴포넌트</div>,
  "친구/친구": <FriendTab />,
  "친구/요청": <div>친구/요청 컴포넌트</div>,
};

const ComponentMap = ({ title }: { title: string }) => {
  return componentMap[title];
};

export default ComponentMap;
