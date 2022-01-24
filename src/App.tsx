import React, { useEffect, useState } from 'react'
import './App.css'

const urlCrew = 'https://api.spacexdata.com/v4/crew'

const CardUser = ({ user, handleClick }) => {
  return (
    <p
      onClick={() => {
        handleClick(user.id)
      }}
    >
      {user.name}
    </p>
  )
}

function App() {
  const [users, setUsers] = useState(null)

  // Récupération des datas au montage
  useEffect(() => {
    fetch(urlCrew)
      .then((res) => res.json())
      .then((result) => setUsers(result))
  }, [])

  const handleClick = (id) => {
    //setIdProfil(id);
    console.log('click', id)
  }

  const displayUsers = (users) => {
    if (users === null) {
      return 'loading'
    } else {
      return users.map((user, i) => {
        return <CardUser key={i} user={user} handleClick={handleClick} />
      })
    }
  }

  return (
    <div>
      <section>
        <h2>Liste de tripulants</h2>
        {displayUsers(users)}
      </section>
      <section>
        <h2>Details du membre</h2>
        {/* {displayDetail()} */}
      </section>
    </div>
  )
}

export default App
