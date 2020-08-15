import React from "react";

export default function EventTab({
  time,
  lang,
  tab,
  active,
  changeTab,
  info,
  live,
  scroll,
  ref1,
  day,
}) {
  return (
    <>
      <div
        className={
          active && lang === "eng"
            ? "activeTab " + day
            : active && lang !== "eng"
            ? "activeTab chinese-tab " + day
            : !active && lang === "eng"
            ? "eventTab " + day
            : !active && lang !== "eng"
            ? "eventTab chinese-tab " + day
            : ""
        }
        onClick={() => {
          changeTab(tab);
          scroll(ref1);
        }}
      >
        <div className={live ? "live" : ""}>
          <div className='eventTime'>
            <div>{time}</div> (GMT+8)
          </div>
          <div
            className='eventInfo'
            dangerouslySetInnerHTML={{ __html: info }}
          />
        </div>
      </div>
    </>
  );
}
