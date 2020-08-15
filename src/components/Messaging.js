import React, { useEffect } from "react";
import { connect } from "react-redux";
import {} from "../redux/actions/pageActions";
import {
  getCurrentProfile,
  joinCommunity,
} from "../redux/actions/profileActions";
import { loadContactList } from "../redux/actions/contactListActions";

import EditProfile from "./EditProfile";
import Inbox from "./Inbox";

function Messaging({
  language,
  profile,
  user,
  joinCommunity,
  getCurrentProfile,
  loadContactList,

  show,
}) {
  useEffect(() => {
    if (profile.profile === null) getCurrentProfile();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className='community-wrapper'>
      {profile.load ? (
        <div className='inbox-wrapper loading'>
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
        <Inbox
        // setRecipientId={setRecipientId}
        // inbox={inbox}
        // profile={profile.profile}
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
  loadContactList,
};

export default connect(mapStateToProps, mapDispatchToProps)(Messaging);
