import React from "react";
import ExploreTab from "../FeedPage/ExploreTab";
import FeedFriendTab from "../FeedPage/FeedFriendTab";
import LikesTab from "../FeedPage/LikesTab";
import FriendTab from "../friend/Tabs/FriendTab";
import RequestTab from "../friend/Tabs/RequestTab";
import FindTab from "../friend/Tabs/FindTab";
import CorrectionComponent from "../CorrectionComponent";

const componentMap: Record<string, React.ReactElement> = {
  friendINfeed: <FeedFriendTab />,
  searchINfeed: <ExploreTab />,
  likeINfeed: <LikesTab />,
  totalINdiary: <div>모두/다이어리 컴포넌트</div>,
  likeINdiary: <div>좋아요/다이어리 컴포넌트</div>,
  findINfriend: <FindTab />,
  friendINfriend: <FriendTab />,
  requestINfriend: <RequestTab />,
  receivedCorrections: <CorrectionComponent />,
  providedCorrections: <div>내가 제공한 교정 컴포넌트</div>,
};

interface ComponentMapProps {
  tabvalue: { value: string; title: string; count?: number | undefined };
}
const ComponentMap = ({ tabvalue }: ComponentMapProps) => {
  return componentMap[tabvalue.value];
};

export default ComponentMap;
