import React from "react";
import EventCard from "./common/EventCard";
import { connect } from "react-redux";
import VizSensor from "react-visibility-sensor";
import {
  changeDate,
  changeTab,
  updateTabText,
  showPage,
  toggleLanguage,
} from "../redux/actions/pageActions";

// const scrollToRef = (ref) => window.scrollTo(0, ref.current.offsetTop);

function Day({
  changeDate,
  changeTab,
  updateTabText,
  showPage,
  toggleLanguage,
  showOptions,
  date,
  activeTab,
  liveSession,
  lang,
  live,
  show,
  myRef,
  data,
}) {
  function toggleL() {
    toggleLanguage(false);
    console.log("toggle: ", showOptions);
  }
  return (
    <>
      <div className='space'>
        {lang === "eng" ? (
          <>
            Click here to check{" "}
            <a
              href='https://www.timeanddate.com/worldclock/fixedtime.html?msg=KODW2020&iso=20200826T10&p1=102'
              target='_blank'
              rel='noopener noreferrer'
            >
              world clock
            </a>
          </>
        ) : lang === "tc" ? (
          <>
            <a
              href='https://www.timeanddate.com/worldclock/fixedtime.html?msg=KODW2020&iso=20200826T10&p1=102'
              target='_blank'
              rel='noopener noreferrer'
            >
              按此查詢國際時間
            </a>
          </>
        ) : (
          <>
            <a
              href='https://www.timeanddate.com/worldclock/fixedtime.html?msg=KODW2020&iso=20200826T10&p1=102'
              target='_blank'
              rel='noopener noreferrer'
            >
              按此查询国际时间
            </a>
          </>
        )}
      </div>
      <div className='card-box'>
        {data.map((data, i) => (
          <VizSensor
            onChange={(isVisible) => {
              if (isVisible) changeTab(data.id);
            }}
            key={data.id}
          >
            <EventCard
              different={data.different}
              key={data.id}
              ref1={myRef[i]}
              time={data.htmlTime}
              live={liveSession === data.live ? true : false}
              abstractPrestatation={data.abstract_presentation ? true : false}
              toggleL={toggleL}
              livePageInfo={{
                title: data.session_name,
                speakers: data.speakers,
                time: data.htmlTime,
                sponsor: data.sponsor ? true : false,
                sponsors: data.sponsors,
                iframe_url: data.iframe_url,
              }}
              lang={lang}
              img={
                lang === "eng"
                  ? data.session_img.en
                  : lang === "tc"
                  ? data.session_img.tc
                  : data.session_img.sc
              }
              cardTitle={
                lang === "eng"
                  ? data.session_name.en
                  : lang === "tc"
                  ? data.session_name.tc
                  : data.session_name.sc
              }
              cardBody={
                lang === "eng"
                  ? data.session_info.en
                  : lang === "tc"
                  ? data.session_info.tc
                  : data.session_info.sc
              }
              showPage={showPage}
            />
          </VizSensor>
        ))}
      </div>
    </>
  );
}

function mapStateToProps(state) {
  return {
    date: state.date,
    activeTab: state.activeTab,
    liveSession: state.liveSession,
    lang: state.lang,
    live: state.live,
    showOptions: state.toggleLang,
  };
}
const mapDispatchToProps = {
  changeDate,
  changeTab,
  updateTabText,
  showPage,
  toggleLanguage,
};

export default connect(mapStateToProps, mapDispatchToProps)(Day);
