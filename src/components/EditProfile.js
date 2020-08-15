import React, { useState, useRef } from "react";
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";
import axios from "axios";
import setAuthToken from "../utils/setAuthToken";

export default function EditProfile({
  user,
  joinCommunity,
  loading,
  create,
  close,
  getCurrentProfile,
  language,
}) {
  const cropper = useRef(null);
  const [profilePic, setProfilePic] = useState(null);
  const [profilePicName, setProfilePicName] = useState(null);
  const [file, setFile] = useState(null);
  const [roll, setRoll] = useState(false);
  const [upload, setUpload] = useState(false);

  const [preview, setPreview] = useState(null);
  const [showCropper, setShowCropper] = useState(false);
  const [firstName, setFirstName] = useState(
    user.firstName ? user.firstName : ""
  );
  const [lastName, setLastName] = useState(user.lastName ? user.lastName : "");
  const [email, setEmail] = useState(user.email ? user.email : "");
  const [company, setCompany] = useState(user.company ? user.company : "");
  const [title, setTitle] = useState(user.job_title ? user.job_title : "");
  const [country, setCountry] = useState(user.country ? user.country : "");
  const [linkedIn, setLinkedIn] = useState(user.linkedIn ? user.linkedIn : "");
  const [bio, setBio] = useState(user.bio ? user.bio : "");
  const [tncFlag, setChecked] = useState(false);

  const [errCheck, setErrCheck] = useState(false);
  const [errFN, setErrFN] = useState(false);
  const [errLN, setErrLN] = useState(false);
  const [errEmail, setErrEmail] = useState(false);
  const [errTitle, setErrTitle] = useState(false);
  const [errCountry, setErrCountry] = useState(false);
  const [errCompany, setErrCompany] = useState(false);

  let error = false;

  async function handleSubmit() {
    setRoll(true);
    if (create && !tncFlag) {
      setErrCheck(true);
      error = true;
    }
    if (firstName === "") {
      setErrFN(true);
      error = true;
    }
    if (lastName === "") {
      setErrLN(true);
      error = true;
    }
    if (email === "") {
      setErrEmail(true);
      error = true;
    }
    if (title === "") {
      setErrTitle(true);
      error = true;
    }
    if (company === "") {
      setErrCompany(true);
      error = true;
    }
    if (country === "") {
      setErrCountry(true);
      error = true;
    }
    if (error) {
      setRoll(false);
      return;
    }

    let data;
    if (upload) {
      try {
        let awsObj = await getPresignedUrl();
        await uploadImage(awsObj);
        data = {
          displayName: "Test",
          profilePicUrl: awsObj.fileUrl,
          firstName,
          lastName,
          email,
          company,
          job_title: title,
          country,
          linkedIn,
          bio,
          tncFlag,
        };
      } catch (err) {
        console.log(err);
      }
    } else {
      data = {
        displayName: "Test",
        profilePicUrl: !!user.profilePicUrl
          ? user.profilePicUrl
          : "https://nova-web-static.s3-ap-southeast-1.amazonaws.com/event/kodw2020/profile.png",
        firstName,
        lastName,
        email,
        company,
        job_title: title,
        country,
        linkedIn,
        bio,
        tncFlag,
      };
    }

    if (create) {
      updateLangCode(language);
      joinCommunity(data);
    } else {
      updateProfile(data);
    }
  }

  // update language code
  function updateLangCode(language) {
    let lang =
      language === "eng" ? "en-gb" : language === "tc" ? "zh-hk" : "zh-cn";
    console.log("lang: ", lang);
    let data = {
      initialProfile: {
        langCode: lang,
      },
    };
    return axios
      .post("https://web.nova.hk/viewer/api/user/v1/updateInitialProfile", data)
      .then((res) => {
        console.log("response of updating lang code: ", res.data);
        return;
      })
      .catch((err) => console.log("Error updating language code.", err));
  }

  // update profile
  function updateProfile(data) {
    const dataV = { ...data, crossDomain: true };
    axios
      .post("https://web.nova.hk/viewer/api/chat/v1/updateChatProfile", dataV)
      .then((res) => {
        console.log("updated profile: ", res.data);
        setRoll(false);
        getCurrentProfile();
        close();
      })
      .catch((err) => console.log("Error updating profile."));
  }

  async function uploadImage(awsObj) {
    setAuthToken();
    await axios
      .put(awsObj.uploadUrl, file, {
        headers: {
          "Content-Type": "image/png",
        },
      })
      .then((res) => {
        console.log("upload response: ", res.data);

        let token = localStorage.getItem("kodw2020Token");
        setAuthToken(token);

        return;
      })
      .catch((err) => console.log("Error uploading file", err));
  }

  async function getPresignedUrl() {
    let data = {
      fileCategory: "user",
      filename: !!profilePicName ? profilePicName : null,
      fileType: "png",
      isPublic: true,
    };
    console.log("data: ", data);
    return await axios
      .post(
        "https://web.nova.hk/viewer/api/file/v1/uploadMyEventMaterial",
        data
      )
      .then((res) => {
        console.log("presigned url: ", res.data);
        return res.data.message;
      })
      .catch((err) => console.log("Error getting presigned url."));
  }

  function _crop() {
    if (
      cropper.current &&
      typeof cropper.current.getCroppedCanvas() === "undefined"
    ) {
      return;
    }

    //image in dataUrl
    setProfilePic(cropper.current.getCroppedCanvas().toDataURL());
    cropper.current
      .getCroppedCanvas()
      .toBlob((blob) => setFile(blob), "image/png");
  }

  function handleChange(e) {
    setProfilePicName(e.target.files[0].name);
    setPreview(URL.createObjectURL(e.target.files[0]));
    if (e.target.files[0]) {
      setUpload(true);
    }
  }

  return (
    <div className='edit-profile'>
      {!create && (
        <img
          src='./images/cross.png'
          alt='cross'
          id='close-edit-profile'
          onClick={close}
        />
      )}
      <div className='edit-profile-title'>
        {language === "eng" &&
          (create ? "CREATE YOUR PROFILE" : "EDIT YOUR PROFILE")}
        {language === "tc" && (create ? "建立個人檔案" : "編輯您的個人資料")}
        {language === "sc" && (create ? "建立个人档案" : "编辑您的个人资料")}
      </div>
      {console.log("test")}
      <div className='edit-profile-row'>
        <div className='edit-profile-left'>
          <div className='profile-img-box'>
            <img
              src={
                !!profilePic
                  ? profilePic
                  : user.profilePicUrl
                  ? user.profilePicUrl
                  : "https://nova-web-static.s3-ap-southeast-1.amazonaws.com/event/kodw2020/profile.png"
              }
              alt='profile'
              id='profile-img'
            />
            <div className='edit-pic'>
              <div className='edit-txt'>
                {language === "eng"
                  ? "Edit"
                  : language === "tc"
                  ? "編輯"
                  : "编辑"}
              </div>

              <input
                type='file'
                id='image-upload'
                accept='image/*'
                onClick={() => setShowCropper(true)}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>
        <div className='edit-profile-right'>
          {showCropper && (
            <div className='cropper-wrapper'>
              <div className='cropper-box'>
                <Cropper
                  ref={cropper}
                  src={preview}
                  style={{ height: 400, width: "100%" }}
                  // Cropper.js options
                  aspectRatio={1 / 1}
                  guides={false}
                  crop={_crop}
                  viewMode={1}
                  dragMode='move'
                  scalable={true}
                  cropBoxMovable={true}
                  cropBoxResizable={true}
                />
                <div className='done-box'>
                  <div
                    className='done-cropping'
                    onClick={() => setShowCropper(false)}
                  >
                    {/* {language === "eng"
                      ? "Done"
                      : language === "tc"
                      ? "完成了"
                      : "完成了"} */}
                    &#10004;
                  </div>
                  <div
                    className='cancel-cropping'
                    onClick={() => {
                      setProfilePic(
                        !!user.profilePicUrl
                          ? user.profilePicUrl
                          : "https://nova-web-static.s3-ap-southeast-1.amazonaws.com/event/kodw2020/profile.png"
                      );
                      setShowCropper(false);
                    }}
                  >
                    &#10007;
                  </div>
                </div>
              </div>
            </div>
          )}
          <div className='edit-profile-form-row'>
            <div className='edit-profile-form-group'>
              <label htmlFor='first_name'>
                {language === "eng"
                  ? "First Name*"
                  : language === "tc"
                  ? "名字*"
                  : "名字"}
              </label>
              <input
                type='text'
                className={
                  errFN ? "edit-profile-input err" : "edit-profile-input"
                }
                value={firstName}
                onChange={(e) => {
                  setFirstName(e.target.value);
                  setErrFN(false);
                }}
              />
            </div>
            <div className='edit-profile-form-group'>
              <label htmlFor='last_name'>
                {language === "eng"
                  ? "Last Name*"
                  : language === "tc"
                  ? "姓氏*"
                  : "姓氏*"}
              </label>
              <input
                type='text'
                className={
                  errLN ? "edit-profile-input err" : "edit-profile-input"
                }
                value={lastName}
                onChange={(e) => {
                  setLastName(e.target.value);
                  setErrLN(false);
                }}
              />
            </div>
          </div>
          <div className='edit-profile-form-row'>
            <div className='edit-profile-form-group'>
              <label htmlFor='email'>
                {language === "eng"
                  ? "Email*"
                  : language === "tc"
                  ? "電郵*"
                  : "电邮*"}
              </label>
              <input
                type='email'
                disabled
                className={
                  errEmail ? "edit-profile-input err" : "edit-profile-input"
                }
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setErrEmail(false);
                }}
              />
            </div>
            <div className='edit-profile-form-group'>
              <label htmlFor='title'>
                {language === "eng"
                  ? "Title*"
                  : language === "tc"
                  ? "職位*"
                  : "职位*"}
              </label>
              <input
                type='text'
                className={
                  errTitle ? "edit-profile-input err" : "edit-profile-input"
                }
                value={title}
                onChange={(e) => {
                  setTitle(e.target.value);
                  setErrTitle(false);
                }}
              />
            </div>
          </div>
          <div className='edit-profile-form-row'>
            <div className='edit-profile-form-group'>
              <label htmlFor='company'>
                {language === "eng"
                  ? "Company / Organisation*"
                  : language === "tc"
                  ? "公司/機構*"
                  : "公司/机构 职位*"}
              </label>
              <input
                type='text'
                className={
                  errCompany ? "edit-profile-input err" : "edit-profile-input"
                }
                value={company}
                onChange={(e) => {
                  setCompany(e.target.value);
                  setErrCompany(false);
                }}
              />
            </div>
            <div className='edit-profile-form-group'>
              <label htmlFor='country'>
                {language === "eng"
                  ? "Country / Region*"
                  : language === "tc"
                  ? "國家/地區*"
                  : "国家/地区"}
              </label>
              <input
                type='text'
                className={
                  errCountry ? "edit-profile-input err" : "edit-profile-input"
                }
                value={country}
                onChange={(e) => {
                  setCountry(e.target.value);
                  setErrCountry(false);
                }}
              />
            </div>
          </div>
          <div className='edit-profile-form-row-complex'>
            <div className='edit-profile-form-group linkedIn'>
              <label htmlFor='linkedIn'>LinkedIn</label>
              <div className='linkedIn-edit-box'>
                <div className='static-linkedIn'>https://www.linkedin.com/</div>
                <input
                  type='text'
                  className='edit-profile-input-linkedIn'
                  value={linkedIn}
                  onChange={(e) => setLinkedIn(e.target.value)}
                />
              </div>
            </div>

            <div className='full-row'>
              <label htmlFor='about_user'>
                {language === "eng"
                  ? "Tell Us More About You"
                  : language === "tc"
                  ? "自我介紹"
                  : "自我介绍"}
              </label>

              <textarea
                name='about_user'
                id='about_user'
                maxLength='280'
                placeholder={
                  language === "eng"
                    ? "Briefly introduce yourself so other attendees can learn more about you (max. 40 words)"
                    : language === "tc"
                    ? "簡單介紹自己，讓其他參加者了解您更多（最多40字）"
                    : "简单介绍自己，让其他参加者了解您更多（最多40字） "
                }
                value={bio}
                onChange={(e) => setBio(e.target.value)}
              ></textarea>
            </div>
            <div className='edit-profile-mandatory-lg'>
              {language === "eng"
                ? "* Mandatory fields"
                : language === "tc"
                ? "* 必須填寫的欄位"
                : "* 必须填写的栏位"}
            </div>
            {create && (
              <div className='edit-profile-agree-box'>
                <input
                  type='checkbox'
                  id='edit-profile-agree'
                  checked={tncFlag}
                  onChange={() => {
                    setErrCheck(false);
                    setChecked(!tncFlag);
                  }}
                />
                <div
                  className={
                    errCheck
                      ? "edit-profile-agree-label err"
                      : "edit-profile-agree-label"
                  }
                >
                  {language === "eng" ? (
                    <>
                      By checking this box, you agree to our{" "}
                      <a
                        href='https://www.kodw.org/en/article/terms-of-use/'
                        class='terms-anchor'
                        target='_blank'
                        rel='noopener noreferrer'
                      >
                        Terms of Use
                      </a>{" "}
                      and acknowledgement that you have read our{" "}
                      <a
                        href='https://novacast-prod.s3.amazonaws.com/bundles/JtDzftDh/pdf/Nova_Privacy_Policy_for_HKDC_en.pdf'
                        target='_blank'
                        rel='noopener noreferrer'
                        class='terms-anchor'
                      >
                        Privacy Policy
                      </a>
                      .
                    </>
                  ) : language === "tc" ? (
                    <>
                      本人已閱讀及同意以上
                      <a
                        href='https://www.kodw.org/tc/article/terms-of-use/'
                        target='_blank'
                        rel='noopener noreferrer'
                      >
                        使用條款
                      </a>
                      及
                      <a
                        href='https://novacast-prod.s3.amazonaws.com/bundles/JtDzftDh/pdf/Nova_Privacy_Policy_for_HKDC_tc.pdf'
                        target='_blank'
                        rel='noopener noreferrer'
                      >
                        私隱政策
                      </a>
                      。
                    </>
                  ) : (
                    <>
                      本人已阅读及同意以上
                      <a
                        href='https://www.kodw.org/sc/article/terms-of-use/'
                        target='_blank'
                        rel='noopener noreferrer'
                      >
                        使用条款
                      </a>
                      及
                      <a
                        href='https://novacast-prod.s3.amazonaws.com/bundles/JtDzftDh/pdf/Nova_Privacy_Policy_for_HKDC_sc.pdf'
                        target='_blank'
                        rel='noopener noreferrer'
                      >
                        私隐政策
                      </a>
                      。
                    </>
                  )}
                </div>
              </div>
            )}
          </div>
          <div className='edit-profile-mandatory-ipad'>
            {language === "eng"
              ? "* Mandatory fields"
              : language === "tc"
              ? "* 必須填寫的欄位"
              : "* 必须填写的栏位"}
          </div>
        </div>
      </div>
      <div className='edit-profile-sumbit-box'>
        <div className='edit-profile-submit' onClick={handleSubmit}>
          {language === "eng" ? (
            <>
              <img
                src='https://nova-web-static.s3.ap-southeast-1.amazonaws.com/event/kodw2020/submit.png'
                alt='submit'
                className='edit-profile-lg-submit'
              />
              <img
                src='https://nova-web-static.s3.ap-southeast-1.amazonaws.com/event/kodw2020/submit-mobile-btn.png'
                alt='submit'
                className='edit-profile-sm-submit'
              />
            </>
          ) : language === "tc" ? (
            <>
              <img
                src='https://nova-web-static.s3.ap-southeast-1.amazonaws.com/event/kodw2020/submit-cn.png'
                alt='submit'
                className='edit-profile-lg-submit'
              />
              <img
                src='https://nova-web-static.s3.ap-southeast-1.amazonaws.com/event/kodw2020/submit-cn-sm.png'
                alt='submit'
                className='edit-profile-sm-submit'
              />
            </>
          ) : (
            <>
              <img
                src='https://nova-web-static.s3.ap-southeast-1.amazonaws.com/event/kodw2020/submit-cn.png'
                alt='submit'
                className='edit-profile-lg-submit'
              />
              <img
                src='https://nova-web-static.s3.ap-southeast-1.amazonaws.com/event/kodw2020/submit-cn-sm.png'
                alt='submit'
                className='edit-profile-sm-submit'
              />
            </>
          )}

          {loading || roll ? <div className='edit-profile-loader'></div> : null}
        </div>
      </div>

      <a
        href={
          language === "eng"
            ? "https://novacast-prod.s3.amazonaws.com/bundles/JtDzftDh/pdf/KODW_2020_FAQ_EN_31_July.pdf"
            : language === "tc"
            ? "https://novacast-prod.s3.amazonaws.com/bundles/JtDzftDh/pdf/KODW_2020_FAQ_TC_31_July.pdf"
            : "https://novacast-prod.s3.amazonaws.com/bundles/JtDzftDh/pdf/KODW_2020_FAQ_SC_31_July.pdf"
        }
        className='edit-profile-faq'
        target='_blank'
        rel='noopener noreferrer'
      >
        <img
          src={
            language === "eng"
              ? "./images/faq-purple.png"
              : language === "tc"
              ? "./images/faq-purple-tc.png"
              : "./images/faq-purple-sc.png"
          }
          alt=''
        />
      </a>
    </div>
  );
}
