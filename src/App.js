import React, { useState, useEffect } from "react";
import Header from "./components/common/Header";
import DayTab from "./components/common/DayTab";
import Day from "./components/Day";
import LivePage from "./components/LivePage";
import Footer from "./components/common/Footer";
import EventTab from "./components/common/EventTab";
import Community from "./components/Community";
import Messaging from "./components/Messaging";

import { connect } from "react-redux";
import {
  changeDate,
  changeTab,
  updateTabText,
  showPage,
} from "./redux/actions/pageActions";
import { changePageLanguage } from "./redux/actions/pageActions";
import { changeLiveSession } from "./redux/actions/liveSessionAction";
import {
  getInitialUserProfile,
  newMsgArrived,
} from "./redux/actions/authActions";

import Aug26Data from "./data/Aug26";
import Aug27Data from "./data/Aug27";
import Aug28Data from "./data/Aug28";

function App({
  changeDate,
  changeTab,
  updateTabText,
  showPage,
  date,
  activeTab,
  liveSession,
  lang,
  live,
  getInitialUserProfile,
  newMsgArrived,
  changeLiveSession,
  changePageLanguage,
}) {
  const [agenda, setAgenda] = useState(false);

  let myRefDay1 = [];
  Aug26Data.forEach((element) => {
    let ref = React.createRef();
    return myRefDay1.push(ref);
  });

  let myRefDay2 = [];
  Aug26Data.forEach((element) => {
    let ref = React.createRef();
    return myRefDay2.push(ref);
  });
  let myRefDay3 = [];
  Aug26Data.forEach((element) => {
    let ref = React.createRef();
    return myRefDay3.push(ref);
  });

  useEffect(() => {
    let url = window.location.search;
    if (!!url) {
      let urlParams = new URLSearchParams(url);
      let day = urlParams.get("day");
      let session = urlParams.get("session");
      let language = urlParams.get("lang");
      startLiveSession(day, session, language);
    }
    getInitialUserProfile();
    window.addChatListener(newMsgArrived);
    setInterval(function () {
      checkLiveSession();
    }, 1000);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // start live session if user visit the page through shared linnk
  function startLiveSession(day, session, language) {
    let liveData;
    let i = parseInt(session);
    if (day === "aug26") {
      liveData = Aug26Data[i];
    } else if (day === "aug27") {
      liveData = Aug27Data[i];
    } else if (day === "aug28") {
      liveData = Aug28Data[i];
    }
    changePageLanguage(language);
    showPage("live", liveData);
  }

  function checkLiveSession() {
    let timestamp = Date.now();
    if (timestamp >= session1 && timestamp <= session2) {
      changeLiveSession(1);
    } else if (timestamp >= session2 && timestamp <= session3) {
      changeLiveSession(2);
    } else if (timestamp >= session3 && timestamp <= session4) {
      changeLiveSession(3);
    } else if (timestamp >= session4 && timestamp <= session5) {
      changeLiveSession(4);
    } else if (timestamp >= session5 && timestamp <= session6) {
      changeLiveSession(5);
    } else if (timestamp >= session6 && timestamp <= session7) {
      changeLiveSession(6);
    } else if (timestamp >= session7) {
      changeLiveSession(7);
    }
  }
  const session1 = 1597284000000;
  const session2 = 1597284900000;
  const session3 = 1597294800000;
  const session4 = 1597300200000;
  const session5 = 1597305600000;
  const session6 = 1597311900000;
  const session7 = 1597323600000;

  const executeScroll = (ref) => {
    ref.current.scrollIntoView({
      behavior: "smooth",
      block: "end",
    });
  };
  function toggleAgenda() {
    return setAgenda(!agenda);
  }

  function changeDay(date) {
    changeDate(date);
  }

  function gotoFrontPage() {
    showPage("main", {});
  }

  return (
    <div
      className={
        agenda
          ? "freeze App"
          : lang === "tc" || lang === "sc"
          ? "App chinese-word"
          : "App"
      }
    >
      <div className={live.showPage === "main" ? "sticky" : ""}>
        <img
          className='banner'
          src='./images/banner-xl.jpg'
          alt='banner'
          id='xl-banner'
        />
        <img
          className='banner'
          src='./images/banner-lg.jpg'
          alt='banner'
          id='lg-banner'
        />
        <img
          className='banner'
          src='./images/banner-ipad.jpg'
          alt='banner'
          id='ipad-banner'
        />
        <img
          className='banner'
          src='./images/banner-mobile.png'
          alt=''
          id='mobile-banner'
        />
        <Header />

        <div className={live.showPage === "main" ? "bar" : "hide"}>
          <div className='inner-bar'>
            <div className='days'>
              <DayTab
                value='AUG 26'
                date={
                  lang === "eng"
                    ? "AUG 26"
                    : lang === "tc"
                    ? "8月26日"
                    : "8月26日"
                }
                day={
                  lang === "eng"
                    ? "WEDNESDAY"
                    : lang === "tc"
                    ? "星期三"
                    : "星期三"
                }
                active={date === "AUG 26" ? true : false}
                changeDay={changeDay}
              />
              <DayTab
                value='AUG 27'
                date={
                  lang === "eng"
                    ? "AUG 27"
                    : lang === "tc"
                    ? "8月27日"
                    : "8月27日"
                }
                day={
                  lang === "eng"
                    ? "THURSDAY"
                    : lang === "tc"
                    ? "星期四"
                    : "星期四"
                }
                active={date === "AUG 27" ? true : false}
                changeDay={changeDay}
              />
              <DayTab
                value='AUG 28'
                date={
                  lang === "eng"
                    ? "AUG 28"
                    : lang === "tc"
                    ? "8月28日"
                    : "8月28日"
                }
                day={
                  lang === "eng"
                    ? "FRIDAY"
                    : lang === "tc"
                    ? "星期五"
                    : "星期五"
                }
                active={date === "AUG 28" ? true : false}
                changeDay={changeDay}
              />
            </div>
            <div className='inner-right'>
              <a
                href={
                  lang === "eng"
                    ? "https://novacast-prod.s3.amazonaws.com/bundles/JtDzftDh/pdf/KODW_2020_FAQ_EN_31_July.pdf"
                    : lang === "tc"
                    ? "https://novacast-prod.s3.amazonaws.com/bundles/JtDzftDh/pdf/KODW_2020_FAQ_TC_31_July.pdf"
                    : "https://novacast-prod.s3.amazonaws.com/bundles/JtDzftDh/pdf/KODW_2020_FAQ_SC_31_July.pdf"
                }
                target='_blank'
                rel='noopener noreferrer'
              >
                <img
                  src={
                    lang === "eng"
                      ? "./images/faq.png"
                      : lang === "tc"
                      ? "./images/faq-tc.png"
                      : "./images/faq-sc.png"
                  }
                  alt=''
                  id='faq'
                />
              </a>
              <img
                src='./images/agenda.png'
                alt=''
                id='calender'
                onClick={() => toggleAgenda()}
              />
              {agenda && lang === "eng" && (
                <div className='agenda-pop-up' onClick={() => toggleAgenda()}>
                  <div className='agenda-box'>
                    <img
                      src='./images/cross.png'
                      alt=''
                      id='cross'
                      onClick={() => toggleAgenda()}
                    />
                    <img
                      src='./images/agenda_EN.jpg'
                      alt=''
                      onClick={(e) => e.stopPropagation()}
                      className='lg-agenda'
                    />
                    <img
                      src='./images/agenda_sm_EN.jpg'
                      alt=''
                      onClick={(e) => e.stopPropagation()}
                      className='sm-agenda'
                    />
                  </div>
                </div>
              )}
              {agenda && lang === "tc" && (
                <div className='agenda-pop-up' onClick={() => toggleAgenda()}>
                  <div className='agenda-box'>
                    <img
                      src='./images/cross.png'
                      alt=''
                      id='cross'
                      onClick={() => toggleAgenda()}
                    />
                    <img
                      src='./images/agenda_TC.jpg'
                      alt=''
                      onClick={(e) => e.stopPropagation()}
                      className='lg-agenda'
                    />
                    <img
                      src='./images/agenda_sm_TC.jpg'
                      alt=''
                      onClick={(e) => e.stopPropagation()}
                      className='sm-agenda'
                    />
                  </div>
                </div>
              )}
              {agenda && lang === "sc" && (
                <div className='agenda-pop-up' onClick={() => toggleAgenda()}>
                  <div className='agenda-box'>
                    <img
                      src='./images/cross.png'
                      alt=''
                      id='cross'
                      onClick={() => toggleAgenda()}
                    />
                    <img
                      src='./images/agenda_SC.jpg'
                      alt=''
                      onClick={(e) => e.stopPropagation()}
                      className='lg-agenda'
                    />
                    <img
                      src='./images/agenda_sm_SC.jpg'
                      alt=''
                      onClick={(e) => e.stopPropagation()}
                      className='sm-agenda'
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className={live.showPage === "main" ? "event-box" : "hide"}>
          {date === "AUG 26" &&
            Aug26Data.map((data, i) => (
              <EventTab
                day='day-one'
                key={data.id}
                lang={lang}
                time={data.time}
                info={
                  lang === "eng"
                    ? data.session_name.en
                    : lang === "tc"
                    ? data.session_name.tc
                    : data.session_name.sc
                }
                tab={data.id}
                live={liveSession === data.live ? true : false}
                changeTab={changeTab}
                active={activeTab === data.id ? true : false}
                scroll={executeScroll}
                ref1={myRefDay1[i]}
              />
            ))}
          {date === "AUG 27" &&
            Aug27Data.map((data, i) => (
              <EventTab
                day='day-2'
                key={data.id}
                lang={lang}
                time={data.time}
                info={
                  lang === "eng"
                    ? data.session_name.en
                    : lang === "tc"
                    ? data.session_name.tc
                    : data.session_name.sc
                }
                tab={data.id}
                live={liveSession === data.live ? true : false}
                changeTab={changeTab}
                active={activeTab === data.id ? true : false}
                scroll={executeScroll}
                ref1={myRefDay2[i]}
              />
            ))}
          {date === "AUG 28" &&
            Aug28Data.map((data, i) => (
              <EventTab
                day='day-3'
                key={data.id}
                lang={lang}
                time={data.time}
                info={
                  lang === "eng"
                    ? data.session_name.en
                    : lang === "tc"
                    ? data.session_name.tc
                    : data.session_name.sc
                }
                tab={data.id}
                live={liveSession === data.live ? true : false}
                changeTab={changeTab}
                active={activeTab === data.id ? true : false}
                scroll={executeScroll}
                ref1={myRefDay3[i]}
              />
            ))}
        </div>
      </div>
      {console.log("live: ", live.showLivePage)}
      <div className={live.showPage === "main" ? "main-content" : "hide"}>
        {date === "AUG 26" ? (
          <Day data={Aug26Data} myRef={myRefDay1} />
        ) : date === "AUG 27" ? (
          <Day data={Aug27Data} myRef={myRefDay2} />
        ) : (
          <Day data={Aug28Data} myRef={myRefDay3} />
        )}
      </div>

      {live.showPage === "community" && <Community />}
      {live.showPage === "messaging" && <Messaging />}

      {live.showPage === "live" && (
        <div className='live-page'>
          <div className='back' onClick={gotoFrontPage}>
            <img src='./images/back.png' alt='' />
            BACK
          </div>
          <LivePage />
        </div>
      )}
      <Footer lang={lang} />
    </div>
  );
}
function mapStateToProps(state) {
  return {
    date: state.date,
    activeTab: state.activeTab,
    liveSession: state.liveSession,
    lang: state.lang,
    live: state.live,
  };
}
const mapDispatchToProps = {
  changeDate,
  changeTab,
  updateTabText,
  showPage,
  getInitialUserProfile,
  newMsgArrived,
  changeLiveSession,
  changePageLanguage,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
