import React, { Component } from "react";
import PropTypes from "prop-types";
import EditProfile from "./EditProfile";
import axios from "axios";

class Networking extends Component {
  constructor() {
    super();
    this.tmpList = [];
  }
  state = {
    search: null,
    openEdit: false,
    star: [],
    sortBy: null,
    filter: false,
    profiles: null, // new code
    originalProfiles: null, // new code
  };
  componentDidMount() {
    this.loadMembers();
  }

  // list profiles
  loadMembers = () => {
    const { filter, sortBy } = this.state;
    axios
      .post("https://web.nova.hk/viewer/api/chat/v1/listMembers", {
        crossDomain: true,
      })
      .then((res) => {
        console.log("members:", res);
        let list = res.data;

        if (filter) {
          list = list.filter((val) => val.isStarred);
        }
        if (sortBy === "byName") {
          list = list.slice().sort((a, b) => {
            return a.firstName.localeCompare(b.firstName.toString());
          });
        } else if (this.state.sortBy === "byCompany") {
          list = list.slice().sort((a, b) => {
            return a.company.localeCompare(b.company.toString());
          });
        }

        this.setState({ profiles: [...list], originalProfiles: res.data });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  toggleProfileEdit = () => {
    this.setState({ openEdit: !this.state.openEdit });
    console.log("profile-edit");
  };

  // add star
  addStar = (userId) => {
    axios
      .post("https://web.nova.hk/viewer/api/chat/v1/star", {
        userId,
        isStarred: true,
      })
      .then((res) => {
        console.log("add start: ", res.data);
        this.loadMembers();
      })
      .catch((err) => console.log("Error giving star"));
  };
  // remove star
  removeStar = (userId) => {
    axios
      .post("https://web.nova.hk/viewer/api/chat/v1/star", {
        userId,
        isStarred: false,
      })
      .then((res) => {
        console.log("add start: ", res.data);
        this.loadMembers();
      })
      .catch((err) => console.log("Error removing star"));
  };

  // sortByName(A-Z)  new-code
  sortByName = () => {
    console.log("state.filter: ", this.state.filter);
    let list;
    if (this.state.filter) {
      list = [...this.state.profiles];
      let newList = list.slice().sort((a, b) => {
        console.log("firstName:", a.firstName);
        return a.firstName.toString().localeCompare(b.firstName.toString());
      });
      console.log("sorted list: ", newList);
      this.setState({
        sortBy: "byName",
        profiles: [...newList],
      });
    } else {
      list = [...this.state.originalProfiles];
      let newList = list.slice().sort((a, b) => {
        console.log("firstName:", a.firstName);
        return a.firstName.toString().localeCompare(b.firstName.toString());
      });
      console.log("sorted list: ", newList);
      this.setState({
        sortBy: "byName",
        profiles: [...newList],
        originalProfiles: [...newList],
      });
    }
  };

  // sortByCompany(A-Z) new-code
  sortByCompany = () => {
    let list;
    if (this.state.filter) {
      list = [...this.state.profiles];

      let newList = list.slice().sort((a, b) => {
        console.log("a: ", a, "\nb: ", b);
        let companyA = a.company.split(" ")[0].toString();
        let companyB = b.company.split(" ")[0].toString();
        return companyA.localeCompare(companyB);
      });
      console.log("sorted list: ", newList);
      this.setState({
        sortBy: "byCompany",
        profiles: [...newList],
      });
    } else {
      list = [...this.state.originalProfiles];
      let newList = list.slice().sort((a, b) => {
        console.log("a: ", a, "\nb: ", b);
        let companyA = a.company.split(" ")[0].toString();
        let companyB = b.company.split(" ")[0].toString();
        return companyA.localeCompare(companyB);
      });
      console.log("sorted list: ", newList);
      this.setState({
        sortBy: "byCompany",
        profiles: [...newList],
        originalProfiles: [...newList],
      });
    }
  };

  handleFilter = (e) => {
    let target = e.target;
    console.log("target: ", target);
    let value = target.name === "filter" ? target.checked : target.value;
    console.log("value:", value);
    if (value) {
      this.filterByStar(value);
    } else {
      this.unfilterByStar(value);
    }
  };

  // fileter by star  - new-code
  filterByStar = (value) => {
    console.log("filter by star");
    let list = [...this.state.profiles];
    let newList = list.filter((val) => val.isStarred);

    this.setState({ profiles: [...newList], filter: value });
  };
  unfilterByStar = (value) => {
    if (this.state.sortBy === "byName") {
      let list = [...this.state.originalProfiles];
      let newList = list.slice().sort((a, b) => {
        console.log("firstName:", a.firstName);
        return a.firstName.toString().localeCompare(b.firstName.toString());
      });
      this.setState({
        sortBy: "byName",
        profiles: [...newList],
        originalProfiles: [...newList],
        filter: value,
      });
    } else if (this.state.sortBy === "byCompany") {
      let list = [...this.state.originalProfiles];
      let newList = list.slice().sort((a, b) => {
        console.log("a: ", a, "\nb: ", b);
        let companyA = a.company.split(" ")[0].toString();
        let companyB = b.company.split(" ")[0].toString();
        return companyA.localeCompare(companyB);
      });
      this.setState({
        sortBy: "byCompany",
        profiles: [...newList],
        originalProfiles: [...newList],
        filter: value,
      });
    } else {
      this.setState({
        profiles: [...this.state.originalProfiles],
        filter: value,
      });
    }
  };

  // handle search
  handleSearch = (e) => {
    if (e) {
      this.setState({ search: e.target.value });
      this.search(e.target.value);
    } else {
      this.search();
    }
  };

  search = (txt) => {
    let { profiles, originalProfiles } = this.state;
    console.log("tmplist: ", this.tmpList);
    if (!this.tmpList.length) {
      this.tmpList = profiles.length ? [...profiles] : [...originalProfiles];
    }
    if (!!txt && txt !== "") {
      console.log("tmplist: ", this.tmpList);
      let list = [...this.tmpList];
      let newList = list.filter((val) => {
        console.log("val: ", val);
        console.log("val.firstname: ", val.firstName);
        console.log("typeof('val.firstname')", typeof val.firstName);
        return (
          val.firstName.toLowerCase().includes(txt.toLowerCase()) ||
          val.lastName.toLowerCase().includes(txt.toLowerCase()) ||
          val.company.toLowerCase().includes(txt.toLowerCase()) ||
          val.country.toLowerCase().includes(txt.toLowerCase())
        );
      });
      return this.setState({ profiles: [...newList] });
    } else if (!!this.tmpList) {
      this.setState({ profiles: [...this.tmpList] });
      this.tmpList = [];

      return;
    }
  };

  render() {
    const {
      data,
      setRecipientId,
      setRecipient,
      showPage,
      getCurrentProfile,
      language,
      showMsgsAction,
    } = this.props;
    const { sortBy, filter, search } = this.state;
    return (
      <div className='networking'>
        {console.log("data.profiles: ", data.profiles)}
        <a
          href={
            language === "eng"
              ? "https://novacast-prod.s3.amazonaws.com/bundles/JtDzftDh/pdf/KODW_2020_FAQ_EN_31_July.pdf"
              : language === "tc"
              ? "https://novacast-prod.s3.amazonaws.com/bundles/JtDzftDh/pdf/KODW_2020_FAQ_TC_31_July.pdf"
              : "https://novacast-prod.s3.amazonaws.com/bundles/JtDzftDh/pdf/KODW_2020_FAQ_SC_31_July.pdf"
          }
          className='inbox-faq'
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
        {this.state.openEdit && (
          <div
            className='edit-profile-wrapper'
            onClick={this.toggleProfileEdit}
          >
            <div
              className='edit-profile-modal'
              onClick={(e) => e.stopPropagation()}
            >
              <EditProfile
                user={data.profile}
                joinCommunity={null}
                loading={data.profile.loading}
                create={false}
                close={this.toggleProfileEdit}
                getCurrentProfile={getCurrentProfile}
                language={language}
              />
            </div>
          </div>
        )}
        <div className='network-left'>
          <div className='search-box'>
            <input
              type='text'
              id='search'
              value={this.state.search}
              placeholder={
                language === "eng"
                  ? "Search"
                  : language === "tc"
                  ? "搜尋"
                  : "搜寻"
              }
              onChange={this.handleSearch}
            />
            {this.state.search ? (
              <img
                src='./images/cross-filter.png'
                alt='cross'
                id='search-cross'
                onClick={() => {
                  this.setState({ search: "" });
                  this.handleSearch();
                }}
              />
            ) : (
              <img src='./images/search.png' alt='search' />
            )}
          </div>
          <div className='sort-wrapper'>
            <div className='sortby'>
              <div className='network-left-label'>
                {language === "eng"
                  ? "Sort by"
                  : language === "tc"
                  ? "排序"
                  : "排序"}
              </div>
              <div
                className={
                  this.state.sortBy === "byName"
                    ? "sort-by-name boldText"
                    : "sort-by-name"
                }
                onClick={this.sortByName}
              >
                {language === "eng"
                  ? "Name (A-Z)"
                  : language === "tc"
                  ? "姓名(A-Z)"
                  : "姓名(A-Z)"}

                {sortBy === "byName" && (
                  <img
                    src='./images/cross-filter.png'
                    alt=''
                    onClick={(e) => {
                      e.stopPropagation();
                      this.setState({ sortBy: null });
                    }}
                  />
                )}
              </div>
              <div
                className={
                  this.state.sortBy === "byCompany"
                    ? "sort-by-company boldText"
                    : "sort-by-company"
                }
                onClick={this.sortByCompany}
              >
                {language === "eng"
                  ? "Company (A-Z)"
                  : language === "tc"
                  ? "公司(A-Z)"
                  : "公司(A-Z)"}

                {sortBy === "byCompany" && (
                  <img
                    src='./images/cross-filter.png'
                    alt=''
                    onClick={(e) => {
                      e.stopPropagation();
                      this.setState({ sortBy: null });
                    }}
                  />
                )}
              </div>
            </div>
            <div className='filter'>
              <div className='network-left-label'>
                {language === "eng"
                  ? "Filter by"
                  : language === "tc"
                  ? "篩選"
                  : "筛选"}
              </div>
              <div className='starred'>
                <input
                  id='filter'
                  type='checkbox'
                  name='filter'
                  checked={this.state.filter}
                  onChange={this.handleFilter}
                />
                <label htmlFor='filter'>
                  {language === "eng"
                    ? "Starred"
                    : language === "tc"
                    ? "已加上星號"
                    : "已加上星号"}
                </label>
              </div>
            </div>
          </div>
        </div>
        <div className='network-right'>
          {data.loading && (
            <div className='network-loader-wrapper'>
              <div className='loading-profile'></div>
            </div>
          )}{" "}
          {!!data.profile && !sortBy && !filter && !search && (
            <div className='contact'>
              <div className='contact-profile-img'>
                <div className='contact-profile-img-wrapper'>
                  <img src={data.profile.profilePicUrl} alt='profile' />
                  <div onClick={this.toggleProfileEdit} id='profile-edit'>
                    {language === "eng"
                      ? "Edit"
                      : language === "tc"
                      ? "編輯"
                      : "编辑"}
                  </div>
                </div>
              </div>
              <div className='contact-top'>
                <div className='contact-name'>
                  {data.profile.firstName + " " + data.profile.lastName}
                </div>
                <div className='contact-country'>{data.profile.country}</div>
                <div className='contact-position'>{data.profile.job_title}</div>
                <div className='contact-company'>{data.profile.company}</div>
                <div className='contact-bio'>{data.profile.bio}</div>
              </div>

              <div className='contact-footer'>
                <div className='me'>
                  {language === "eng"
                    ? "It's you!"
                    : language === "tc"
                    ? "您好"
                    : "您好"}
                </div>
                <div className='network-linkedIn'>
                  {!!data.profile.linkedIn ? (
                    <a
                      href={"https://www.linkedin.com/" + data.profile.linkedIn}
                      target='_blank'
                      rel='noopener noreferrer'
                    >
                      <img src='./images/linkedIn-on.png' alt='linkedIn' />
                    </a>
                  ) : (
                    <img src='./images/linkedIn-off.png' alt='linkedIn' />
                  )}
                </div>
              </div>
            </div>
          )}
          {this.state.profiles !== null &&
            // data.profiles.map(  // new code
            this.state.profiles.map(
              (member) =>
                member.pk !== data.profile.userId && (
                  <div className='contact'>
                    <div className='contact-profile-img'>
                      <div className='contact-profile-img-wrapper'>
                        <img src={member.profilePicUrl} alt='profile' />
                      </div>
                    </div>

                    <div className='contact-top'>
                      <div className='contact-name'>
                        {member.firstName + " " + member.lastName}
                      </div>
                      <div className='contact-country'>{member.country}</div>
                      <div className='contact-position'>{member.job_title}</div>
                      <div className='contact-company'>{member.company}</div>
                      <div className='contact-bio'>{member.bio}</div>
                    </div>
                    <div className='contact-footer'>
                      <div className='star'>
                        {member.isStarred ||
                        this.state.star.includes(member.pk) ? (
                          <img
                            src='./images/star_on.png'
                            alt='star on'
                            onClick={() => {
                              this.removeStar(member.pk);
                              let newStarList = this.state.star.filter(
                                (val) => val !== member.pk
                              );
                              this.setState({ star: [...newStarList] });
                            }}
                          />
                        ) : (
                          <img
                            src='./images/star_off.png'
                            alt='star off'
                            onClick={() => {
                              this.addStar(member.pk);
                              this.setState({
                                star: [...this.state.star, member.pk],
                              });
                            }}
                          />
                        )}
                      </div>
                      <div
                        className='send-msg'
                        onClick={() => {
                          setRecipientId(member.pk);
                          setRecipient(member);
                          showMsgsAction();
                          window.scrollTo(0, 0);
                          showPage("messaging", {});
                        }}
                      >
                        <img src='./images/mail.png' alt='send msg' />
                      </div>
                      <div className='network-linkedIn'>
                        {!!member.linkedIn ? (
                          <a
                            href={"https://www.linkedin.com/" + member.linkedIn}
                            target='_blank'
                            rel='noopener noreferrer'
                          >
                            <img
                              src='./images/linkedIn-on.png'
                              alt='linkedIn'
                            />
                          </a>
                        ) : (
                          <img src='./images/linkedIn-off.png' alt='linkedIn' />
                        )}
                      </div>
                    </div>
                  </div>
                )
            )}
        </div>
      </div>
    );
  }
}
Networking.propTypes = {
  data: PropTypes.object.isRequired,
  setRecipientId: PropTypes.func.isRequired,
  setRecipient: PropTypes.func.isRequired,
  showPage: PropTypes.func.isRequired,
  language: PropTypes.string.isRequired,
  showMsgsAction: PropTypes.func.isRequired,
};

export default Networking;
