import React, { Component } from "react";
import axios from "axios";

export default class ChatBox extends Component {
  state = {
    recipientId: null,
    chatId: null,
    latestTimestamp: 0,
    msg: "",
    messages: [],
  };

  componentDidMount() {
    if (this.state.recipientId !== null) this.scrollToBottom();
    this.focusInput.focus();
  }
  componentDidUpdate() {
    this.scrollToBottom();
  }

  sendMsg = () => {
    let { msg } = this.state;
    this.setState({ msg: "" });
    let { loadNewMessages, recipientId, chat, reloadContactList } = this.props;
    let chatId = chat.chatId ? chat.Id : null;

    if (msg.trim() !== "") {
      if (!recipientId) {
        return;
      }
      let data = {
        crossDomain: true,
        recipientId,
        message: {
          type: "Text",
          payload: {
            text: msg,
          },
        },
      };
      axios
        .post("https://web.nova.hk/viewer/api/chat/v1/send", data)
        .then((res) => {
          console.log("send message response: ", res.data);

          loadNewMessages(res.data.chatId);
          if (!chatId) {
            reloadContactList();
          }
        })
        .catch((err) => console.log("Error sending msg: ", err));
    }
  };
  scrollToBottom = () => {
    const { newChat } = this.props;
    // this.messagesEnd.scrollIntoView({ behavior: "smooth", block: "nearest" });
    if (newChat) {
      const scrollHeight = this.messageList.scrollHeight;
      const height = this.messageList.clientHeight;
      const maxScrollTop = scrollHeight - height;
      this.messageList.scrollTop = maxScrollTop > 0 ? maxScrollTop : 0;
    } else {
      const scrollHeight2 = this.msgList.scrollHeight;
      const height2 = this.msgList.clientHeight;
      const maxScrollTop2 = scrollHeight2 - height2;
      this.msgList.scrollTop = maxScrollTop2 > 0 ? maxScrollTop2 : 0;
    }
  };
  onKeyDownHandler = (e) => {
    console.log("on press, e: ", e);
    if (e.key === "Enter") {
      this.sendMsg();
    }
  };

  render() {
    let { newChat, chat, messages, profile, language } = this.props;
    let { msg } = this.state;

    return (
      <>
        {console.log(
          "inside chatbox: ",
          messages,
          "chat:",
          chat,
          "profile: ",
          profile
        )}
        {newChat ? (
          <>
            <div className='chatbox-top-bar'>
              <img
                src={chat.profilePicUrl}
                alt='profile'
                className='chatbox-pp'
              />
              <div className='chatbox-name'>{chat.firstName}</div>
            </div>

            <div className='msg-list' ref={(el) => (this.messageList = el)}>
              <div className='welcome-msg'>
                {language === "eng" ? (
                  <>
                    Meet other KODW speakers and participants! Send a private
                    message to {chat.firstName} {chat.lastName} to make new
                    connections.
                    <br />
                    Type your message below to start a conversation with{" "}
                    {chat.firstName} {chat.lastName}
                  </>
                ) : language === "tc" ? (
                  <>
                    如想認識其他KODW講者及參加者， 可發送私人信息予
                    {chat.firstName} {chat.lastName}，以建立新的聯繫。
                    <br /> 請於以下位置輸入您的信息，與{chat.firstName}{" "}
                    {chat.lastName}進行對話。
                  </>
                ) : (
                  <>
                    如想认识其他KODW讲者及参加者， 可发送私人信息予
                    {chat.firstName} {chat.lastName}，以建立新的联系。
                    <br />
                    请于以下位置输入您的信息，与{chat.firstName} {chat.lastName}
                    进行对话。
                  </>
                )}
              </div>
              {!!messages &&
                messages.length > 0 &&
                messages.map((message, i) =>
                  message.sentBy === profile.userId ? (
                    <div className='msg-container my-msg'>
                      <div className='msg-wrap'>
                        <div className='msg '>{message.payload.text}</div>
                        <div className='msg-time'>
                          {new Date(message.sentAt).toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className='msg-container other-msg'>
                      <div className='msg-wrap'>
                        <div className='msg'>{message.payload.text}</div>
                        <div className='msg-time'>
                          {new Date(message.sentAt).toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </div>
                      </div>
                    </div>
                  )
                )}
            </div>
            <div className='input-msg-box'>
              <input
                ref={(input) => {
                  this.focusInput = input;
                }}
                type='text'
                className='msg-input'
                value={msg}
                onChange={(e) => this.setState({ msg: e.target.value })}
                onKeyPress={this.onKeyDownHandler}
              />
              <div className='send' onClick={this.sendMsg}>
                {language === "eng"
                  ? "Send"
                  : language === "tc"
                  ? "發送"
                  : "发送"}
              </div>
            </div>
          </>
        ) : (
          <>
            <div className='chatbox-top-bar'>
              <img
                src={chat.members[0].profile.profilePicUrl}
                alt='profile'
                className='chatbox-pp'
              />
              <div className='chatbox-name'>
                {chat.members[0].profile.firstName}
              </div>
            </div>
            <div className='msg-list' ref={(el) => (this.msgList = el)}>
              {newChat && (
                <div className='welcome-msg'>
                  {language === "eng" ? (
                    <>
                      Meet other KODW speakers and participants! Send a private
                      message to {chat.firstName} {chat.lastName} to make new
                      connections.
                      <br />
                      Type your message below to start a conversation with{" "}
                      {chat.firstName} {chat.lastName}
                    </>
                  ) : language === "tc" ? (
                    <>
                      如想認識其他KODW講者及參加者， 可發送私人信息予
                      {chat.firstName} {chat.lastName}，以建立新的聯繫。
                      <br /> 請於以下位置輸入您的信息，與{chat.firstName}{" "}
                      {chat.lastName}進行對話。
                    </>
                  ) : (
                    <>
                      如想认识其他KODW讲者及参加者， 可发送私人信息予
                      {chat.firstName} {chat.lastName}，以建立新的联系。
                      <br />
                      请于以下位置输入您的信息，与{chat.firstName}{" "}
                      {chat.lastName}
                      进行对话。
                    </>
                  )}
                </div>
              )}
              {!!messages &&
                messages.length > 0 &&
                messages.map((message, i) =>
                  message.sentBy === profile.userId ? (
                    <div className='msg-container my-msg'>
                      <div className='msg-wrap'>
                        <div className='msg '>{message.payload.text}</div>
                        <div className='msg-time'>
                          {new Date(message.sentAt).toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className='msg-container other-msg'>
                      <div className='msg-wrap'>
                        <div className='msg'>{message.payload.text}</div>
                        <div className='msg-time'>
                          {new Date(message.sentAt).toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </div>
                      </div>
                    </div>
                  )
                )}
            </div>
            <div className='input-msg-box'>
              <input
                ref={(input) => {
                  this.focusInput = input;
                }}
                type='text'
                className='msg-input'
                value={msg}
                onChange={(e) => this.setState({ msg: e.target.value })}
                onKeyPress={this.onKeyDownHandler}
              />
              <div className='send' onClick={this.sendMsg}>
                {language === "eng"
                  ? "Send"
                  : language === "tc"
                  ? "發送"
                  : "发送"}
              </div>
            </div>
          </>
        )}
      </>
    );
  }
}
