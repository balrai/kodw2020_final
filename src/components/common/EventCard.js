import React, { useState } from "react";

export default function EventCard({
  time,
  live,
  lang,
  livePageInfo,
  img,
  cardTitle,
  cardBody,
  showPage,
  abstractPrestatation,
  toggleL,
  ref1,
  different,
}) {
  const [showMore, setShowMore] = useState(true);
  function toggle() {
    setShowMore(!showMore);
  }
  function openLivePage() {
    window.scrollTo(0, 0);
    showPage("live", livePageInfo);
    toggleL();
  }

  return (
    <>
      {different ? (
        <div className='card relative' ref={ref1}>
          <div
            className='card-time'
            dangerouslySetInnerHTML={{ __html: time }}
          />
          <img src={img.lg} alt='Desktop Event' className='desktop-event-img' />
          <img src={img.sm} alt='Mobile Event' className='mobile-event-img' />
          {live ? (
            <div className='play different' onClick={openLivePage}>
              <img
                src={
                  lang === "eng"
                    ? "./images/live-btn.png"
                    : lang === "tc"
                    ? "./images/live-cn.png"
                    : "./images/live-cn.png"
                }
                alt=''
                className='live-btn-img'
              />
            </div>
          ) : (
            <div className='play different' onClick={openLivePage}>
              <img
                src={
                  lang === "eng"
                    ? "./images/play-icon.png"
                    : lang === "tc"
                    ? "./images/play-cn.png"
                    : "./images/play-cn.png"
                }
                alt=''
                className='live-btn-img'
              />
            </div>
          )}
        </div>
      ) : (
        <div className='card' ref={ref1}>
          <div
            className='card-time'
            dangerouslySetInnerHTML={{ __html: time }}
          />
          <img src={img.lg} alt='Desktop Event' className='desktop-event-img' />
          <img src={img.sm} alt='Mobile Event' className='mobile-event-img' />
          <div className='card-footer'>
            <>
              {live ? (
                <div className='play' onClick={openLivePage}>
                  <img
                    src={
                      lang === "eng"
                        ? "./images/live-btn.png"
                        : lang === "tc"
                        ? "./images/live-cn.png"
                        : "./images/live-cn.png"
                    }
                    alt=''
                    className='live-btn-img'
                  />
                </div>
              ) : (
                <div className='play' onClick={openLivePage}>
                  <img
                    src={
                      lang === "eng"
                        ? "./images/play-icon.png"
                        : lang === "tc"
                        ? "./images/play-cn.png"
                        : "./images/play-cn.png"
                    }
                    alt=''
                    className='live-btn-img'
                  />
                </div>
              )}
            </>

            <div>
              <div
                className='card-footer-title'
                dangerouslySetInnerHTML={{ __html: cardTitle }}
              />
              {cardBody && (
                <div className='card-footer-para'>
                  <div
                    className={
                      showMore ? "card-footer-body" : "card-footer-body-open"
                    }
                  >
                    <div
                      className='desc'
                      dangerouslySetInnerHTML={{ __html: cardBody }}
                    />
                    <div className='front-speakers'>
                      {livePageInfo.speakers.map(
                        (speaker, i) =>
                          speaker.moderator && (
                            <div className='frontPage-speaker' key={i + 1}>
                              <div className='status'>
                                {lang === "eng"
                                  ? "Moderator: "
                                  : lang === "tc"
                                  ? "主持人: "
                                  : "主持人: "}
                              </div>
                              <div className='frontName'>
                                <div className='name'>
                                  {lang === "eng"
                                    ? speaker.name.en
                                    : lang === "tc"
                                    ? speaker.name.tc
                                    : speaker.name.sc}
                                </div>
                                <div
                                  className='frontName-info'
                                  dangerouslySetInnerHTML={{
                                    __html:
                                      lang === "eng"
                                        ? speaker.title.en
                                        : lang === "tc"
                                        ? speaker.title.tc
                                        : speaker.title.sc,
                                  }}
                                />
                              </div>
                            </div>
                          )
                      )}
                      <div className='frontPage-speaker'>
                        <div className='status'>
                          {lang === "eng"
                            ? "Speaker: "
                            : lang === "tc"
                            ? "講者: "
                            : "讲者:"}
                        </div>
                        <div className='speakers-box'>
                          {livePageInfo.speakers.map(
                            (speaker, i) =>
                              !speaker.moderator && (
                                <div className='frontName' key={i}>
                                  <div className='name'>
                                    {lang === "eng"
                                      ? speaker.name.en
                                      : lang === "tc"
                                      ? speaker.name.tc
                                      : speaker.name.sc}
                                  </div>
                                  <div
                                    className='frontName-info'
                                    dangerouslySetInnerHTML={{
                                      __html:
                                        lang === "eng"
                                          ? speaker.title.en
                                          : lang === "tc"
                                          ? speaker.title.tc
                                          : speaker.title.sc,
                                    }}
                                  />
                                </div>
                              )
                          )}
                        </div>
                      </div>
                    </div>
                    {abstractPrestatation && (
                      <>
                        <div className='abstract'>
                          {lang === "eng"
                            ? "Abstract of Presentation"
                            : lang === "tc"
                            ? "演講摘要"
                            : "演讲摘要"}
                        </div>
                        {livePageInfo.speakers.map(
                          (speaker, i) =>
                            speaker.abstract_topic && (
                              <div className='abstract-box' key={i}>
                                <div className='abstract-topic'>
                                  {lang === "eng"
                                    ? speaker.name.en
                                    : lang === "tc"
                                    ? speaker.name.tc
                                    : speaker.name.sc}{" "}
                                  {lang === "eng"
                                    ? speaker.abstract_topic.en
                                    : lang === "tc"
                                    ? speaker.abstract_topic.tc
                                    : speaker.abstract_topic.sc}
                                </div>
                                <div className='abstract-desc'>
                                  {lang === "eng"
                                    ? speaker.abstract_pre.en
                                    : lang === "tc"
                                    ? speaker.abstract_pre.tc
                                    : speaker.abstract_pre.sc}
                                </div>
                              </div>
                            )
                        )}
                      </>
                    )}
                  </div>

                  <div className='toggle'>
                    {showMore ? (
                      <div onClick={toggle}>
                        {lang === "eng"
                          ? "[more]"
                          : lang === "tc"
                          ? "[打開]"
                          : "[打开]"}
                      </div>
                    ) : (
                      <div onClick={toggle}>
                        {lang === "eng"
                          ? "[less]"
                          : lang === "tc"
                          ? "[縮小]"
                          : "[缩小]"}
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
