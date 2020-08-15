import React from "react";
import { connect } from "react-redux";
import {
  changePageLanguage,
  showPage,
  toggleLanguage,
} from "../../redux/actions/pageActions";
import { getCurrentProfile } from "../../redux/actions/profileActions";
import { seenUnreadMsg } from "../../redux/actions/authActions";

let counter = 0;
function Header({
  language,
  changePageLanguage,
  showPage,
  showOptions,
  toggleLanguage,
  getCurrentProfile,
  hasUnreadMsg,
  seenUnreadMsg,
  live,
}) {
  function changeLanguage(lang) {
    toggleLanguage(!showOptions);
    if (counter < 1) {
      counter++;
      console.log(counter, "counter");
      return;
    }
    console.log("outer", counter);
    changePageLanguage(lang);
    counter--;
    return;
  }

  function goToFrontPage() {
    showPage("main", {});
    toggleLanguage(false);
  }

  function goToCommunity() {
    showPage("community", {});
    toggleLanguage(false);
    window.scrollTo(0, 0);
  }
  function goToInbox() {
    showPage("messaging", {});
    toggleLanguage(false);
    // seenUnreadMsg();
    window.scrollTo(0, 0);
  }

  return (
    <header>
      {console.log("render", showOptions)}
      <div className='logo-box'>
        <img
          src='./images/logo-kodw.png'
          alt='Kodw Logo'
          id='kodw-logo'
          onClick={goToFrontPage}
        />
        <div className='right-head'>
          <img
            src='./images/logo-event-lg.png'
            alt='Design Logo'
            id='design-logo'
          />
          <img src='./images/logo-hkdc.png' alt='HKDC' id='hkdc' />
        </div>
      </div>
      <div className='head-box'>
        <div className='misc-left-box'>
          <div className='inbox-box'>
            <img
              src='./images/msg.png'
              alt='Inbox'
              id='inbox'
              onClick={goToInbox}
            />
            {hasUnreadMsg && <div className='unread-msg'></div>}
          </div>
          <div className='network' onClick={goToCommunity}>
            <img src='./images/network.png' alt='Networking' id='networking' />
            <div>
              {language === "eng"
                ? "Networking"
                : language === "tc"
                ? "網絡拓展"
                : "网络拓展"}
            </div>
          </div>
        </div>
        <div className='misc-right-box'>
          <div className='welcome-box'>
            <span id='wlcm'>
              {language === "eng"
                ? "Welcome"
                : language === "tc"
                ? "您好"
                : "您好"}{" "}
            </span>{" "}
            <span data-nc-comp='profile' data-display-name></span> (
            <div data-nc-comp='profile' data-action-logout id='sign-out'>
              {language === "eng"
                ? "Sign out"
                : language === "tc"
                ? "登出"
                : "登出"}
            </div>
            )
          </div>
          <div className='lang'>
            <div className={showOptions ? "lang-bg color" : "lang-bg"}>
              <div
                className={
                  showOptions && language === "eng"
                    ? "active show"
                    : showOptions
                    ? "show en"
                    : language === "tc" || language === "sc"
                    ? "active"
                    : ""
                }
                onClick={(e) => changeLanguage("eng")}
              >
                EN
              </div>

              <div
                className={
                  showOptions && language === "tc"
                    ? "active show"
                    : showOptions
                    ? "show"
                    : language === "eng"
                    ? "active"
                    : ""
                }
                onClick={(e) => changeLanguage("tc")}
              >
                繁
              </div>
              <div
                className={
                  showOptions && language === "sc"
                    ? "active show"
                    : showOptions
                    ? "show"
                    : ""
                }
                onClick={(e) => changeLanguage("sc")}
              >
                简
              </div>
            </div>
          </div>
        </div>
      </div>
      {live.showPage === "community" ? (
        <div
          className='back-from-network back'
          onClick={() => showPage("main", {})}
        >
          <img src='./images/back.png' alt='' />
          BACK
        </div>
      ) : live.showPage === "messaging" ? (
        <div
          className='back-from-network back'
          onClick={() => showPage("community", {})}
        >
          <img src='./images/back.png' alt='' />
          BACK
        </div>
      ) : null}
    </header>
  );
}

function mapStateToProps(state) {
  return {
    language: state.lang,
    showOptions: state.toggleLang,
    hasUnreadMsg: state.auth.hasUnreadMsg,
    live: state.live,
  };
}

const mapDispatchToProps = {
  changePageLanguage,
  showPage,
  toggleLanguage,
  getCurrentProfile,
  seenUnreadMsg,
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
