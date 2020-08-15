import React, { Component } from "react";
import ReactDOM from "react-dom";
import { connect } from "react-redux";
import { showPage } from "../redux/actions/pageActions";

class LivePage extends Component {
  state = {
    iframeHeight: "400px",
  };

  render() {
    const {
      live: { livePage },
      lang,
      showPage,
    } = this.props;

    return (
      <>
        <iframe
          id='session-content-frame'
          scrolling='no'
          height={this.state.iframeHeight}
          onLoad={() => {
            const obj = ReactDOM.findDOMNode(this);

            this.setState({
              iframeHeight: obj.contentWindow.document.body.scrollHeight + "px",
            });
          }}
          src={
            lang === "eng"
              ? livePage.iframe_url.en
              : lang === "tc"
              ? livePage.iframe_url.tc
              : livePage.iframe_url.sc
          }
          frameBorder='0'
        ></iframe>
        {livePage.iframe_url.en === "./day2_5_eng" && (
          <div className='space-below'></div>
        )}
        {livePage.iframe_url.en !== "./day2_5_eng" && (
          <div className='speakers-wrapper'>
            <div className='speakers'>
              <div className='speakers-left-box'>
                <div className='green-rect'>
                  {lang === "eng"
                    ? "Connect with Speakers"
                    : lang === "tc"
                    ? "聯繫講者"
                    : "联系讲者"}
                </div>
                <div className='speaker-box'>
                  {livePage.speakers.map((speaker, i) => (
                    <div className='speaker' key={i}>
                      {speaker.linkedIn === "" ? (
                        <img
                          src='./images/network.png'
                          alt=''
                          className='network-icon'
                          onClick={() => showPage("community", {})}
                        />
                      ) : (
                        <a
                          href={`https://www.linkedin.com/${speaker.linkedIn}`}
                          target='_blank'
                          rel='noopener noreferrer'
                        >
                          <img
                            src='./images/linkedIn-purple.png'
                            alt='LinkedIn'
                            className='speaker-linkedIn'
                          />
                        </a>
                      )}
                      <div className='speaker-info'>
                        <div className='speaker-name'>
                          {lang === "eng"
                            ? speaker.name.en
                            : lang === "tc"
                            ? speaker.name.tc
                            : speaker.name.sc}
                        </div>
                        <div
                          className='speaker-position'
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
                  ))}
                </div>
              </div>
              {console.log("sponsor: ", livePage.sponsor)}
              {livePage.sponsor && (
                <div className='speakers-right-box'>
                  {livePage.sponsors.map((sponsor) => (
                    <div className='sponsor' key={sponsor.id}>
                      <div className='sponsor-label'>
                        {lang === "eng"
                          ? sponsor.title.en
                          : lang === "tc"
                          ? sponsor.title.tc
                          : sponsor.title.sc}
                      </div>
                      <div className='sponsor-img-box'>
                        {!!sponsor.link ? (
                          <a
                            href={sponsor.link}
                            target='_blank'
                            rel='noopener noreferrer'
                          >
                            <img
                              src={sponsor.img}
                              alt='sponsor'
                              className={sponsor.style}
                            />
                          </a>
                        ) : (
                          <img
                            src={sponsor.img}
                            alt='sponsor'
                            className={sponsor.style}
                          />
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div className='webcast-info'>
              {lang === "eng"
                ? `The webcast is best viewed with the newest version of Chrome, Firefox,
        Microsoft Edge or Safari browser, with a broadband connection of 3Mbps
        or above.`
                : lang === "tc"
                ? `我們建議閣下使用最新版本之Chrome、Firefox、Microsoft Edge 或 Safari 網頁瀏覽
器，以及3Mbps 或更高的寬頻網速，以享受最佳觀賞體驗。`
                : `我们建议阁下使用最新版本Chrome、Firefox、Microsoft Edge或Safari网页浏览器，
以及3Mbps或更高的宽频网速，以享受最佳观赏体验。`}
            </div>
          </div>
        )}
      </>
    );
  }
}

function mapStateToProps(state) {
  return {
    live: state.live,
    lang: state.lang,
  };
}
const mapDispatchToProps = { showPage };

export default connect(mapStateToProps, mapDispatchToProps)(LivePage);
