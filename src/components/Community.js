import React, { useEffect } from "react";
import { connect } from "react-redux";
import { showPage } from "../redux/actions/pageActions";
import {
  getCurrentProfile,
  loadMembers,
  joinCommunity,
} from "../redux/actions/profileActions";
import { setRecipientId, setRecipient } from "../redux/actions/inboxActions";
import { hideContacts } from "../redux/actions/showMsgOnMobileAction";

import EditProfile from "./EditProfile";
import Networking from "./Networking";

function Community({
  language,
  profile,
  user,
  joinCommunity,
  loadMembers,
  getCurrentProfile,
  setRecipientId,
  setRecipient,
  showPage,
  show,
  hideContacts,
}) {
  useEffect(() => {
    if (profile.profile === null) getCurrentProfile();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className='community-wrapper'>
      {profile.load ? (
        <div className='networking loading'>
          <div className='loading-profile'></div>
        </div>
      ) : profile.profile === null ? (
        <EditProfile
          user={user}
          joinCommunity={joinCommunity}
          loading={profile.loading}
          create={true}
          close={null}
          language={language}
        />
      ) : (
        <Networking
          loadMembers={loadMembers}
          data={profile}
          setRecipientId={setRecipientId}
          setRecipient={setRecipient}
          showPage={showPage}
          getCurrentProfile={getCurrentProfile}
          language={language}
          showMsgsAction={hideContacts}
        />
      )}
    </div>
  );
}

function mapStateToProps(state) {
  return {
    language: state.lang,
    profile: state.profile,
    user: state.auth.user,
  };
}

const mapDispatchToProps = {
  getCurrentProfile,
  joinCommunity,
  showPage,
  setRecipientId,
  setRecipient,
  hideContacts,
};

export default connect(mapStateToProps, mapDispatchToProps)(Community);
