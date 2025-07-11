import React from "react";
import UserListSection from "../UserListSection";
import ProfileModal from "../ProfileModal";
import ConfirmModal from "../ConfirmModal";


interface FriendTabProps {
  friendList: { id: string; name: string; username: string }[];
  selectedUser: { id: string; name: string; username: string } | undefined;
  showProfileModal: boolean;
  showConfirmModal: boolean;
  onUserCardClick: (user: { id: string; name: string; username: string }) => void;
  onFriendButtonClick: (user: { id: string; name: string; username: string }) => void;
  onCloseProfileModal: () => void;
  onOpenConfirmModal: () => void;
  onCloseConfirmModal: () => void;
  onConfirmDelete: () => void;
}

export default function FriendTab({
  friendList,
  selectedUser,
  showProfileModal,
  showConfirmModal,
  onUserCardClick,
  onFriendButtonClick,
  onCloseProfileModal,
  onOpenConfirmModal,
  onCloseConfirmModal,
  onConfirmDelete,
}: FriendTabProps) {
  return (
    <div className="max-w-5xl mx-auto p-6">
      <UserListSection
        users={friendList}
        onUserCardClick={onUserCardClick}
        onFriendButtonClick={onFriendButtonClick}
      />

      {showProfileModal && selectedUser && (
        <ProfileModal
          user={selectedUser}
          onClose={onCloseProfileModal}
          onUnfriendClick={() => {
            onCloseProfileModal();
            onOpenConfirmModal();
          }}
        />
      )}

      {showConfirmModal && selectedUser && (
        <ConfirmModal
          user={selectedUser}
          onConfirm={onConfirmDelete}
          onClose={onCloseConfirmModal}
        />
      )}
    </div>
  );
}
