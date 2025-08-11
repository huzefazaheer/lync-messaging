import styles from './chat.module.css'

import ChatMessage from '../../components/chatmessage/chatmessage'

export default function Chat() {
  return (
    <div className={styles.chat}>
      <div className={styles.top}>
        <div className={styles.usercard}>
          <img src="/profileimg.png" alt="" />
          <div>
            <p className={styles.displayname}>John Doe</p>
            <p className={styles.username}>@exampleuser</p>
          </div>
        </div>
      </div>
      <div className={styles.msgs}>
        <ChatMessage msg={'Hello this is a message'} />
        <ChatMessage msg={'This is a person'} isSent={true} />
        <ChatMessage
          msg={
            'This is a particularly long message\noasudhuoasduoash This is a particularly long message\noasudhuoasduoash'
          }
          isSent={true}
        />
      </div>
      <div className={styles.sendmsg}>
        <textarea></textarea>
        <p className={styles.msghint}>Send a message</p>
        <div className={styles.control}>
          <img src="/emojis.svg" alt="" />
          <img src="/options.svg" alt="" />
          <button>Send</button>
        </div>
      </div>
    </div>
  )
}
