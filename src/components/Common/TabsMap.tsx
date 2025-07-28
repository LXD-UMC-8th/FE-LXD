import React from "react";
import ExploreTab from "../Feed/Tabs/ExploreTab";
import FeedFriendTab from "../Feed/Tabs/FeedFriendTab";
import LikesTab from "../Feed/Tabs/LikesTab";
import FriendTab from "../Friends/Tabs/FriendTab";
import RequestTab from "../Friends/Tabs/RequestTab";
import FindTab from "../Friends/Tabs/FindTab";
import DiaryTotalTab from "../Diary/Tabs/DiaryTotalTab";
import DiaryLikesTab from "../Diary/Tabs/DiaryLikesTab";
import ProvidedCorrectionTab from "../Corrections/Tabs/ProvidedCorrectionTab";
import ReceivedCorrectionTab from "../Corrections/Tabs/ReceivedCorrectionTab";

const componentMap: Record<string, React.ReactElement> = {
  friendINfeed: <FeedFriendTab />,
  searchINfeed: <ExploreTab />,
  likeINfeed: <LikesTab />,
  totalINdiary: <DiaryTotalTab />,
  likeINdiary: <DiaryLikesTab />,
  findINfriend: <FindTab />,
  friendINfriend: <FriendTab />,
  requestINfriend: <RequestTab />,
  receivedCorrections: <ReceivedCorrectionTab />,
  providedCorrections: <ProvidedCorrectionTab />,
};

interface TabsMapProps {
  tabvalue: { value: string; title?: string; count?: number | undefined };
}
const TabsMap = ({ tabvalue }: TabsMapProps) => {
  return componentMap[tabvalue.value];
};

export default TabsMap;
