import styles from './styles.module.css'

export default function CreateGroupChat({
  showModal,
  setShowModal,
  createGroup,
  groupdata,
  setgroupdata,
}) {
  async function handleClick(e) {
    e.preventDefault()
    await createGroup()
    setShowModal(false)
  }

  return (
    <div className={`${styles.modal} ${showModal ? '' : styles.hidden}`}>
      <h2>Create Group Chat</h2>
      <form action="">
        <label htmlFor="">Group Name</label>
        <input
          type="text"
          value={groupdata.name}
          onChange={(e) => setgroupdata({ ...groupdata, name: e.target.value })}
        />
        <label htmlFor="">Group Profile Image (url)</label>
        <input
          type="text"
          value={groupdata.photo}
          onChange={(e) =>
            setgroupdata({ ...groupdata, photo: e.target.value })
          }
        />
        <button onClick={(e) => handleClick(e)}>Create</button>
      </form>
    </div>
  )
}
