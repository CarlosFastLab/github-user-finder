import React, { useState, useCallback } from 'react';
import api from './services/api';
import apiMap from './services/apiMap'

import Header from './components/Header'
import Sidebar from './components/SideBar'
import { WrappedMap } from './components/GMap'

import './components/styles/app.css'

export default function App() {
  const [user, setUser] = useState({});
  const [likedRepositories, setLikedRepositories] = useState([])
  const [userSearch, setUserSearch] = useState('');
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState(null);
  const [lat, setLat] = useState(null);
  const [lng, setLng] = useState(null);

  function handleInputChange(e) {
    setUserSearch(e.target.value);
    setAlert(null);
  }

  const handleSubmit = useCallback((e) => {
    e.preventDefault();
    async function submit() {
      setLoading(true);
      setAlert(null);
      try {
        if (userSearch === '') {
          throw new Error('Informe o nome de um usuário!');
        }
        const responseUser = await api.get(`/users/${userSearch}`);
        const responseRepos = await api.get(`/users/${userSearch}/starred`, {
          responseType: 'json',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          }
        });
        setUser(responseUser.data);
        setLikedRepositories(responseRepos.data);
        const userLocation = responseUser.data.location
        const responseCoordinates = await apiMap.get(`/json?address=${userLocation}&key=${process.env.REACT_APP_GOOGLE_KEY}`);
        const dataCoordinates = {
          lat: responseCoordinates.data.results[0].geometry.location.lat,
          lng: responseCoordinates.data.results[0].geometry.location.lng,
        };
        setLat(dataCoordinates.lat);
        setLng(dataCoordinates.lng);
      } catch (error) {
        setAlert(true);
        console.log(error);
      } finally {
        setLoading(false);
      }
    }
    submit();
  }, [userSearch])

  return (
    <>
      <div className="main">
        <Header />
        <Sidebar
          user={user}
          handleInputChange={handleInputChange}
          handleSubmit={handleSubmit}
          loading={loading}
          userSearch={userSearch}
          error={alert}
          likedRepositories={likedRepositories}
        />
        <WrappedMap
          lat={lat}
          lng={lng}
          googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=${process.env.REACT_APP_GOOGLE_KEY}`}
          loadingElement={<div style={{ height: "100%" }} />}
          containerElement={<div style={
            {
              height: "98.7%",
              width: "75.1%",
              marginLeft: '25%',
              zIndex: "-1",
              backgroundColor: '#232424'
            }
          }
          />}
          mapElement={<div style={{ height: "90%" }} />}
        />
      </div>
    </>
  );
}
