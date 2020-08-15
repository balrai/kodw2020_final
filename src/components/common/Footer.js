import React from "react";

export default function Footer({ lang }) {
  return (
    <>
      <div className='social-media-box'>
        <div className='social-inner-box'>
          <div className='fb'>
            <a
              href='https://www.facebook.com/kodwhkdc'
              target='_blank'
              rel='noopener noreferrer'
            >
              <img src='./images/fb.png' alt='' id='fb' />
            </a>
          </div>
          <div className='twitter'>
            <a
              href='https://twitter.com/kodw_hkdc'
              target='_blank'
              rel='noopener noreferrer'
            >
              <img src='./images/twitter.png' alt='' id='twitter' />
            </a>
          </div>
          <div className='insta'>
            <a
              href='https://www.instagram.com/kodw_hkdc'
              target='_blank'
              rel='noopener noreferrer'
            >
              <img src='./images/insta.png' alt='' id='insta' />
            </a>
          </div>
          <div className='linkedin'>
            <a
              href='https://www.linkedin.com/company/knowledge-of-design-week'
              target='_blank'
              rel='noopener noreferrer'
            >
              <img src='./images/linkedin.png' alt='' id='linkedin' />
            </a>
          </div>
          <div className='yt'>
            <a
              href='https://www.youtube.com/channel/UCB9QTGZRIJyjEwIrBh09uZw'
              target='_blank'
              rel='noopener noreferrer'
            >
              <img src='./images/yt.png' alt='' id='yt' />
            </a>
          </div>
          <div className='weibo'>
            <a
              href='https://www.weibo.com/kodwhkdc?is_all=1'
              target='_blank'
              rel='noopener noreferrer'
            >
              <img src='./images/weibo.png' alt='' id='weibo' />
            </a>
          </div>
          <div className='wechat'>
            <img src='./images/wechat.png' alt='' id='wechat' />
          </div>
        </div>
      </div>
      <footer>
        <div className='inner-footer'>
          <div className='institute-box'>
            <div className='organiser'>
              <div className='in-label'>
                {lang === "eng"
                  ? "ORGANISER"
                  : lang === "tc"
                  ? "主辦機構"
                  : "主办机构"}
              </div>
              <div className='institute'>
                <div className='org-box'>
                  <a
                    href='https://www.hkdesigncentre.org/'
                    target='_blank'
                    rel='noopener noreferrer'
                    id='hkdc-a'
                  >
                    <img src='./images/hkdc.png' alt='' />
                  </a>
                  <a
                    href='https://www.idk-hkdc.org/'
                    target='_blank'
                    rel='noopener noreferrer'
                    id='idk-a'
                  >
                    <img src='./images/idk.png' alt='' />
                  </a>
                </div>
              </div>
            </div>
            <div className='co-organiser'>
              <div className='in-label'>
                {lang === "eng"
                  ? "CO-ORGANISERS"
                  : lang === "tc"
                  ? "協辦機構"
                  : "协办机构"}
              </div>
              <div className='institute'>
                <a
                  href='http://www.hkdi.edu.hk/en/'
                  target='_blank'
                  rel='noopener noreferrer'
                  className='hkdi-a'
                >
                  <img src='./images/hkdi.png' alt='' id='hkdi-logo' />
                </a>
                <a
                  href='https://www.sd.polyu.edu.hk/en/'
                  target='_blank'
                  rel='noopener noreferrer'
                  id='poly-U'
                >
                  <img src='./images/poly.png' alt='' />
                </a>
              </div>
            </div>
            <div className='lead-sponsor'>
              <div className='in-label'>
                {lang === "eng"
                  ? "LEAD SPONSOR"
                  : lang === "tc"
                  ? "主要贊助機構"
                  : "主要赞助机构"}
              </div>
              <div className='institute'>
                <a
                  href='https://www.createhk.gov.hk/'
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  <img
                    src='./images/createhk.png'
                    alt=''
                    id='createhk-lg-icon'
                  />
                  <img
                    src='./images/logo-createHK.png'
                    alt=''
                    id='createhk-sm-icon'
                  />
                </a>
              </div>
            </div>
          </div>

          {lang === "eng" ? (
            <>
              <div className='disclaimer'>
                Disclaimer: The Government of the Hong Kong Special
                Administrative Region provides funding support to the project
                only, and does not otherwise take part in the project. Any
                opinions, findings, conclusions or recommendations expressed in
                these materials/events (or by members of the project team) are
                those of the project organizers only and do not reflect the
                views of the Government of the Hong Kong Special Administrative
                Region, the Communications and Creative Industries Branch of the
                Commerce and Economic Development Bureau, Create Hong Kong, the
                CreateSmart Initiative Secretariat or the CreateSmart Initiative
                Vetting Committee.
              </div>
              <div className='links'>
                <div className='left-link'>USEFUL LINKS</div>
                <div className='right-links'>
                  <a
                    href='https://www.kodw.org/en/article/terms-of-use/'
                    target='_blank'
                    rel='noopener noreferrer'
                  >
                    Terms of Use
                  </a>
                  <a
                    href='https://nova-webcast.s3-ap-southeast-1.amazonaws.com/legacy/disclaimer/Nova+Privacy+Policy+for+HKDC(Live).pdf'
                    target='_blank'
                    rel='noopener noreferrer'
                  >
                    Privacy Policy
                  </a>
                  <a
                    href='https://www.kodw.org/en/article/hkdc-copyright-policy-statement/'
                    target='_blank'
                    rel='noopener noreferrer'
                  >
                    Copyright Policy
                  </a>
                </div>
              </div>
              <div className='links'>
                <div className='rights'>ALL RIGHTS RESERVED.</div>
                <div className='copyright'>
                  HONG KONG DESIGN CENTRE © 2020 - KNOWLEDGE OF DESIGN WEEK
                </div>
              </div>
            </>
          ) : lang === "tc" ? (
            <>
              <div className='disclaimer'>
                免責聲明:香港特別行政區政府僅為本項目提供資助，除此之外並無參與項目。在本刊物／活動內（或由項目小組成員）表達的任何意見、研究成果、結論或建議，均不代表香港特別行政區政府、商務及經濟發展局通訊及創意產業科、創意香港、創意智優計劃秘書處或創意智優計劃審核委員會的觀點。
              </div>
              <div className='links'>
                <div className='left-link'>相關連結</div>
                <div className='right-links'>
                  <a
                    href='https://www.kodw.org/tc/article/terms-of-use/'
                    target='_blank'
                    rel='noopener noreferrer'
                  >
                    使用條款
                  </a>
                  <a
                    href='https://nova-webcast.s3-ap-southeast-1.amazonaws.com/legacy/disclaimer/Nova+Privacy+Policy+for+HKDC(Live).pdf'
                    target='_blank'
                    rel='noopener noreferrer'
                  >
                    私隱政策
                  </a>
                  <a
                    href='https://www.kodw.org/tc/article/hkdc-copyright-policy-statement/'
                    target='_blank'
                    rel='noopener noreferrer'
                  >
                    香港設計中心版權聲明
                  </a>
                </div>
              </div>
              <div className='links'>主辦單位保留更改節目流程之最終權利。</div>
            </>
          ) : (
            <>
              <div className='disclaimer'>
                免责声明:香港特别行政区政府仅为本项目提供资助，除此之外并无参与项目。在本刊物／活动内（或由项目小组成员）表达的任何意见、研究成果、结论或建议，均不代表香港特别行政区政府、商务及经济发展局通讯及创意产业科、创意香港、创意智优计划秘书处或创意智优计划审核委员会的观点。
              </div>
              <div className='links'>
                <div className='left-link'>相关连结</div>
                <div className='right-links'>
                  <a
                    href='https://www.kodw.org/sc/article/terms-of-use/'
                    target='_blank'
                    rel='noopener noreferrer'
                  >
                    使用条款
                  </a>
                  <a
                    href='https://nova-webcast.s3-ap-southeast-1.amazonaws.com/legacy/disclaimer/Nova+Privacy+Policy+for+HKDC(Live).pdf'
                    target='_blank'
                    rel='noopener noreferrer'
                  >
                    私隐政策
                  </a>
                  <a
                    href='https://www.kodw.org/sc/article/hkdc-copyright-policy-statement/'
                    target='_blank'
                    rel='noopener noreferrer'
                  >
                    香港设计中心版权声明
                  </a>
                </div>
              </div>
              <div className='links'>主办单位保留更改节目流程之最终权利。</div>
            </>
          )}
        </div>
      </footer>
    </>
  );
}
