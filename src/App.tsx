import React, { useEffect, useState } from 'react'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import CssBaseline from '@mui/material/CssBaseline'

import './App.css'

const urlCrew: string = 'https://api.spacexdata.com/v4/crew'

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
  const [profilData, setProfilData] = useState(null)

  // componentDidMount
  useEffect(() => {
    fetch(urlCrew)
      .then((res) => res.json())
      .then((result) => setUsers(result))
  }, [])

  const handleClick = (id) => {
    fetch(`${urlCrew}/${id}`)
      .then((res) => res.json())
      .then((result) => setProfilData(result))
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

  const displayProfil = (profil) => {
    if (profil === null) {
      return <p>pas de detail</p>
    } else {
      const { name, agency, image } = profil
      return (
        <div>
          <p>{name}</p>
          <p>{agency}</p>
          <img src={image} alt={name} style={{ width: '100%' }} />
        </div>
      )
    }
  }

  return (
    <Container maxWidth="md">
      <CssBaseline />
      <Box sx={{ textAlign: 'center' }}>
        <h1>SpaceX Crew</h1>
      </Box>
      <div style={{ display: 'flex', width: '100%' }}>
        <section>
          <h2>Liste de tripulants</h2>
          {displayUsers(users)}
        </section>
        <section>
          <h2>Details du membre</h2>
          {displayProfil(profilData)}
        </section>
      </div>
    </Container>
  )
}

export default App
