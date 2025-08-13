import { useContext, useEffect, useState } from 'react'
import Sidebar from '../../components/sidebar/sidebar'
import styles from './profile.module.css'
import { appContext } from '../../App'
import UserTop from '../../components/usertopinfo/userinfo'
import { useNavigate } from 'react-router-dom'
import useFetch from '../../utils/useFetch'

export default function Profile() {
  const app = useContext(appContext)
  const navigate = useNavigate()
  const [profileData, setProfileData] = useState({
    username: '',
    display_name: '',
    about: '',
    photo: '',
  })
  const [password, setPassword] = useState({ oldpassword: '', newpassword: '' })

  const updateUserFetch = useFetch('users', 'PUT', {
    display_name: profileData.display_name,
    about: profileData.about,
    profile_photo: profileData.photo,
  })

  const updatePasswordFetch = useFetch('update', 'PUT', password)

  useEffect(() => {
    if (app.user == null) navigate('/')
    setProfileData(app.user)
  }, [])

  if (app.user == null) return

  async function updateUserProfile(e) {
    e.preventDefault()
    const data = await updateUserFetch.fetchData()
    if (data.user) {
      app.setUser(data.user)
    }
  }

  async function updateUserPassword(e) {
    e.preventDefault()
    const data = await updatePasswordFetch.fetchData()
    console.log(data)
  }

  return (
    <div className={styles.home}>
      <Sidebar />
      <div className={styles.rest}>
        <UserTop />
        <div className={styles.profile}>
          <h2>My Profile</h2>

          <form action="">
            <h3>Personal Information</h3>
            <div className={styles.hor}>
              <div className={styles.vert}>
                <label htmlFor="Username" className={styles.half}>
                  Username
                </label>
                <input
                  type="text"
                  readOnly
                  className={styles.username}
                  value={profileData.username}
                  onChange={(e) => {
                    setProfileData({ ...profileData, username: e.target.value })
                  }}
                />
              </div>
              <div className={styles.vert}>
                <label htmlFor="Username" className={styles.half}>
                  Display Name
                </label>
                <input
                  type="text"
                  className={styles.half}
                  value={profileData.display_name}
                  onChange={(e) => {
                    setProfileData({
                      ...profileData,
                      display_name: e.target.value,
                    })
                  }}
                />
              </div>
            </div>
            <label htmlFor="Username">Profile Picture (url)</label>
            <input
              type="text"
              value={profileData.photo}
              onChange={(e) => {
                setProfileData({
                  ...profileData,
                  photo: e.target.value,
                })
              }}
            />
            <label htmlFor="Username">About</label>
            <input
              type="text"
              value={profileData.about}
              onChange={(e) => {
                setProfileData({ ...profileData, about: e.target.value })
              }}
            />
            <button onClick={(e) => updateUserProfile(e)}>
              <img src="/savechanges.svg" alt="" />
              <p>Save Changes</p>
            </button>
          </form>

          <form action="">
            <h3>Privacy and Security</h3>
            <label htmlFor="Username">Old Password</label>
            <input
              type="password"
              value={password.oldpassword}
              onChange={(e) =>
                setPassword({ ...password, oldpassword: e.target.value })
              }
            />
            <label htmlFor="Username">New Password</label>
            <input
              type="password"
              value={password.newpassword}
              onChange={(e) =>
                setPassword({ ...password, newpassword: e.target.value })
              }
            />
            <button onClick={(e) => updateUserPassword(e)}>
              <img src="/changepassowrd.svg" alt="" />
              <p>Change Password</p>
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
