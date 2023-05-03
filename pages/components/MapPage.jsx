import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import { useState, useEffect } from 'react'
import L from 'leaflet'

const greenIcon = L.icon({
    iconUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.4/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
  })

const apiUrl = 'https://api.mmaya.gob.bo:8443/v1/siasbo/pozos/9?size=47'

const fetchMarkers = async () => {
  const response = await fetch(apiUrl)
  const data = await response.json()
  const markers = data.content.map((item) => ({
    lat: item.latitudDec,
    lng: item.longitudDec,
  }))
  return markers
}

const MapPage = () => {
  const [markers, setMarkers] = useState([])

  useEffect(() => {
    const fetchMarkersData = async () => {
      const markersData = await fetchMarkers()
      setMarkers(markersData)
    }
    fetchMarkersData()
  }, [])

  return (
    <div style={{ height: '500px' }}>
      <MapContainer center={[0, 0]} zoom={2} style={{ height: '100%' }}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        {markers.map((marker, index) => (
          <Marker key={index} position={[marker.lat, marker.lng]} icon={greenIcon}>
            <Popup>
              Marker {index + 1}
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  )
}

export default MapPage
