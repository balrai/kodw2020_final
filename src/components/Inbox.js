import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import axios from "axios";

import ChatBox from "./ChatBox";

import { setRecipientId, setRecipient } from "../redux/actions/inboxActions";
import { checkUnreadMsg } from "../redux/actions/authActions";
import {
  showContacts,
  hideContacts,
} from "../redux/actions/showMsgOnMobileAction";

class Inbox extends Component {
  state = {
    activeChat: this.props.inbox.recipient ? this.props.inbox.recipient : null,
    isRecipientNew: !!this.props.inbox.recipientId,
    chats: [],
    messages: [],
    showNewChat: true,
    latestTimestamp: null,
    chatIdWithNewMessage: null,
    showContactsInMobile: true,

    recipientId: this.props.inbox.recipientId
      ? this.props.inbox.recipientId
      : null,
  };
  constructor(props) {
    super(props);
    this.myrefs = [];
  }
  onChatNotified = (data) => {
    // console.log("notice: ", data);
  };
  run = false;
  onNewMessage = (data) => {
    if (this.run) {
      console.log("new msg: ", data);
      console.log("this.state: ", this.state);
      if (!this.state.activeChat) {
        this.setState({ chatIdWithNewMessage: data.chatId });
        this.reloadContactList();
      }
      if (
        this.state.activeChat &&
        data.chatId === this.state.activeChat.chatId
      ) {
        this.loadNewMessages(data.chatId);
      } else {
        this.setState({ chatIdWithNewMessage: data.chatId });
        this.reloadContactList();
      }
    }
  };

  componentWillUnmount() {
    this.run = false;
    this.props.setRecipientId(null);
    this.props.setRecipient(null);
    this.props.showContacts();
  }

  sortChatsByTime = (chats) => {
    return chats.slice().sort(function (t1, t2) {
      return t2.lastMessage.sentAt - t1.lastMessage.sentAt;
    });
  };
  componentDidMount() {
    this.run = true;
    window.addChatListener(this.onChatNotified);
    window.addChatListener(this.onNewMessage);
    this.reloadContactList();
  }

  reloadContactList = () => {
    let { recipientId, isRecipientNew } = this.state;
    axios
      .post("https://web.nova.hk/viewer/api/chat/v1/getMyChatList", {
        crossDomain: true,
      })
      .then((res) => {
        console.log("contacts: ", res);
        let chats = this.sortChatsByTime(res.data);
        this.setState({ chats: chats });
        if (!!chats && chats.length > 0) {
          chats.forEach((chat) => {
            if (chat.members.length && chat.members[0].profile) {
              if (
                recipientId &&
                recipientId === chat.members[0].profile.userId
              ) {
                this.setState({ activeChat: chat, isRecipientNew: false });
                this.loadActiveChat(chat);
              }
            }
          });
          console.log(
            "isnewrecipient: ",
            isRecipientNew,
            this.state.isRecipientNew
          );
          if (this.state.isRecipientNew) {
            console.log("Is new recipient: ", isRecipientNew);
            this.loadNewChat(recipientId);
          }
          return;
        }
      })
      .catch((err) => console.log("Error getting contacts:", err));
  };
  loadNewMessages = (chatId) => {
    let { latestTimestamp } = this.state;
    if (!chatId) return;

    let data = {
      chatId,
      since: latestTimestamp + 1,
      crossDomain: true,
    };
    axios
      .post("https://web.nova.hk/viewer/api/chat/v1/pullNewMessages", data)
      .then((res) => {
        console.log("New messages: ", res.data);
        res.data.reverse();
        let latestTimestamp = 0;
        let newMsgs = this.state.messages;
        if (!!res.data) {
          res.data.forEach((msg) => {
            latestTimestamp = msg.sentAt;
            newMsgs.push(msg);
          });
        }

        this.setState({
          messages: newMsgs,
          latestTimestamp,
        });
      })
      .catch((err) => console.log("Error loading new messages: ", err));
  };

  loadNewChat = (userId) => {
    const { recipient } = this.props.inbox;
    // ;    axios
    //       .post("https://web.nova.hk/viewer/api/chat/v1/getChatProfile", {
    //         userId,
    //         crossDomain: true,
    //       })
    //       .then((res) => {
    //         console.log("new chat: ", res.data);
    //         let list = this.state.chats;
    //         list.unshift(recipient);
    //         console.log("list: ", list);
    //         this.setState({ chats: list });
    //         console.log("state: ", this.state);
    //       })
    //       .catch((err) => console.log("Error get New Chat: ", err));
    let list = this.state.chats;
    list.unshift(recipient);
    this.setState({ chats: list, activeChat: recipient });
  };
  loadActiveChat = (chat) => {
    if (!chat.chatId) return;

    let chatId = chat.chatId;
    axios
      .post("https://web.nova.hk/viewer/api/chat/v1/getMyChatContent", {
        chatId,
        crossDomain: true,
      })
      .then((res) => {
        console.log("active chat: ", res.data);
        res.data.reverse();
        let latestTimestamp = 0;
        if (!!res.data) {
          res.data.forEach((msg) => {
            latestTimestamp = msg.sentAt;
          });
        }
        this.props.checkUnreadMsg();
        this.setState({ messages: [...res.data], latestTimestamp });
        console.log("STATE: ", this.state);
      })
      .catch((err) => console.log("Error loading msg: ", err));
  };

  setActiveChat = (chat, i) => {
    this.setState({
      recipientId: chat.members[0].profile.userId,
      activeChat: chat,
      messages: [],
    });
    axios
      .post("https://web.nova.hk/viewer/api/chat/v1/getMyChatList", {
        crossDomain: true,
      })
      .then((res) => {
        console.log("contacts: ", res);
        let chats = this.sortChatsByTime(res.data);
        this.setState({ chats: chats });
      })
      .catch((err) => console.log("Error getting new chat list: ", err));

    this.loadActiveChat(chat);
  };

  render() {
    const {
      chats,
      recipientId,
      activeChat,
      isRecipientNew,
      messages,
      latestTimestamp,
      showContactsInMobile,
    } = this.state;
    const {
      language,
      profile,
      showMsgs,
      showContacts,
      hideContacts,
    } = this.props;

    return (
      <div className='inbox-wrapper'>
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
        <div
          // className={
          //   showContactsInMobile && !isRecipientNew && !showMsgs
          //     ? "show-in-mobile inbox-contacts"
          //     : showContactsInMobile && isRecipientNew && showMsgs
          //     ? "hide-in-mobile inbox-contacts"
          //     : showContactsInMobile && !isRecipientNew && !showMsgs
          //     ? "show-in-mobile inbox-contacts"
          //     : "hide-in-mobile inbox-contacts"
          // }
          className={
            showMsgs
              ? "hide-in-mobile inbox-contacts"
              : "show-in-mobile inbox-contacts"
          }
        >
          <div className='inbox-title'>
            {language === "eng"
              ? "INBOX"
              : language === "tc"
              ? "收件箱"
              : "收件箱"}
          </div>
          <div
            className='inbox-contact-holder'
            onClick={() => {
              hideContacts();
            }}
          >
            {chats.map((chat, i) => (
              <>
                {console.log("CHAT: ", chat)}
                {i === 0 && isRecipientNew && chat.pk === recipientId ? (
                  <div className='inbox-contact active'>
                    <img
                      src={chat.profilePicUrl}
                      alt='Profile'
                      className='inbox-profile-img'
                    />
                    <div className='inbox-profile-info'>
                      <div className='inbox-profile-name'>{chat.firstName}</div>
                      <div className='inbox-lastMsg'>
                        {!!chat.lastMessage && chat.lastMessage.payload.text}
                      </div>
                    </div>
                    <div className='inbox-time'>
                      {!!chat.lastMessage &&
                        new Date(chat.lastMessage.sentAt).toLocaleTimeString(
                          [],
                          { hour: "2-digit", minute: "2-digit" }
                        )}
                    </div>
                  </div>
                ) : i === 0 && isRecipientNew && !!chat.pk ? (
                  <div
                    className='inbox-contact'
                    onClick={() =>
                      this.setState({
                        recipientId: chat.pk,
                        activeChat: chat,
                        messages: [],
                      })
                    }
                  >
                    <img
                      src={chat.profilePicUrl}
                      alt='Profile'
                      className='inbox-profile-img'
                    />
                    <div className='inbox-profile-info'>
                      <div className='inbox-profile-name'>{chat.firstName}</div>
                      <div className='inbox-lastMsg'>
                        {!!chat.lastMessage && chat.lastMessage.payload.text}
                      </div>
                    </div>
                    <div className='inbox-time'>
                      {!!chat.lastMessage &&
                        new Date(chat.lastMessage.sentAt).toLocaleTimeString(
                          [],
                          { hour: "2-digit", minute: "2-digit" }
                        )}
                    </div>
                  </div>
                ) : recipientId === chat.members[0].profile.userId ? (
                  <div
                    className='inbox-contact active'
                    profile={chat.members[0].profile}
                    userId={chat.members[0].profile.userId}
                    chatId={chat ? chat.chatId : null}
                  >
                    <img
                      src={chat.members[0].profile.profilePicUrl}
                      alt='Profile Pic'
                      className='inbox-profile-img'
                    />
                    <div className='inbox-profile-info'>
                      <div className='inbox-profile-name'>
                        {chat.members[0].profile.firstName}
                      </div>
                      <div className='inbox-lastMsg'>
                        {!!chat.lastMessage && chat.lastMessage.payload.text}
                      </div>
                    </div>
                    <div className='inbox-time'>
                      {!!chat.lastMessage &&
                        new Date(chat.lastMessage.sentAt).toLocaleTimeString(
                          [],
                          { hour: "2-digit", minute: "2-digit" }
                        )}
                    </div>
                  </div>
                ) : (
                  <div
                    className='inbox-contact'
                    profile={chat.members[0].profile}
                    userId={chat.members[0].profile.userId}
                    chatId={chat ? chat.chatId : null}
                    onClick={() => {
                      this.setActiveChat(chat, i);
                    }}
                  >
                    <img
                      src={chat.members[0].profile.profilePicUrl}
                      alt='Profile Pic'
                      className='inbox-profile-img'
                    />
                    <div className='inbox-profile-info'>
                      <div className='inbox-profile-name'>
                        {chat.members[0].profile.firstName}
                      </div>
                      <div className='inbox-lastMsg'>
                        {!!chat.lastMessage && chat.lastMessage.payload.text}
                      </div>
                      <div className='inbox-time'>
                        {!!chat.lastMessage &&
                          new Date(chat.lastMessage.sentAt).toLocaleTimeString(
                            [],
                            {
                              hour: "2-digit",
                              minute: "2-digit",
                            }
                          )}
                      </div>
                    </div>

                    {chat.lastSeen > chat.lastMessage.sentAt ? null : (
                      <div className='new-msg-notice'></div>
                    )}
                  </div>
                )}
              </>
            ))}
          </div>
        </div>
        <div
          className={
            showMsgs ? "show-in-mobile msg-box" : "hide-in-mobile msg-box"
          }
        >
          <div
            className='go-back-to-contacts-mobile'
            onClick={() => showContacts()}
          >
            <img src='./images/white-triangle.png' alt='back' />
          </div>
          {activeChat === null && (
            <>
              <div className='chatbox-top-bar'></div>
            </>
          )}

          {activeChat !== null &&
          isRecipientNew &&
          recipientId === activeChat.pk ? (
            <ChatBox
              newChat={true}
              messages={messages}
              chat={activeChat}
              profile={profile}
              loadNewMessages={this.loadNewMessages}
              latestTimestamp={latestTimestamp}
              recipientId={recipientId}
              reloadContactList={this.reloadContactList}
              language={language}
            />
          ) : activeChat !== null ? (
            <ChatBox
              newChat={false}
              messages={messages}
              chat={activeChat}
              profile={profile}
              loadNewMessages={this.loadNewMessages}
              latestTimestamp={latestTimestamp}
              recipientId={recipientId}
              reloadContactList={this.reloadContactList}
              language={language}
            />
          ) : null}
        </div>
      </div>
    );
  }
}
Inbox.propTypes = {
  language: PropTypes.string.isRequired,
  profile: PropTypes.object.isRequired,
  inbox: PropTypes.object.isRequired,
  chats: PropTypes.array.isRequired,
  // loadContactList: PropTypes.func.isRequired,
  setRecipientId: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  return {
    language: state.lang,
    profile: state.profile.profile,
    inbox: state.inbox,
    chats: state.contactList,
    showMsgs: state.showMsgs.showMsgs,
  };
}

const mapDispatchToProps = {
  // loadContactList,
  setRecipientId,
  setRecipient,
  showContacts,
  hideContacts,
  checkUnreadMsg,
};

export default connect(mapStateToProps, mapDispatchToProps)(Inbox);
