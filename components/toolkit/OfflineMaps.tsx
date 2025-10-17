import React, { useRef, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { MapPin, Search } from 'lucide-react';

// Fix: Declare google on window to fix TypeScript errors for missing google maps types.
declare global {
  interface Window {
    google: any;
  }
}

const OfflineMaps: React.FC = () => {
  const mapRef = useRef<HTMLDivElement>(null);
  // Fix: Use 'any' for map instance to avoid needing full google maps type definitions.
  const mapInstance = useRef<any | null>(null);
  // Fix: Use 'any' for autocomplete instance to avoid needing full google maps type definitions.
  const autocomplete = useRef<any | null>(null);
  const [userLocation, setUserLocation] = useState({ lat: 34.052235, lng: -118.243683 }); // Default to LA
  const { t } = useTranslation();

  useEffect(() => {
    if (mapRef.current && !mapInstance.current) {
      mapInstance.current = new window.google.maps.Map(mapRef.current, {
        center: userLocation,
        zoom: 15,
        disableDefaultUI: true,
        styles: [
          { elementType: 'geometry', stylers: [{ color: '#242f3e' }] },
          { elementType: 'labels.text.stroke', stylers: [{ color: '#242f3e' }] },
          { elementType: 'labels.text.fill', stylers: [{ color: '#746855' }] },
          { featureType: 'administrative.locality', elementType: 'labels.text.fill', stylers: [{ color: '#d59563' }] },
          { featureType: 'poi', elementType: 'labels.text.fill', stylers: [{ color: '#d59563' }] },
          { featureType: 'poi.park', elementType: 'geometry', stylers: [{ color: '#263c3f' }] },
          { featureType: 'poi.park', elementType: 'labels.text.fill', stylers: [{ color: '#6b9a76' }] },
          { featureType: 'road', elementType: 'geometry', stylers: [{ color: '#38414e' }] },
          { featureType: 'road', elementType: 'geometry.stroke', stylers: [{ color: '#212a37' }] },
          { featureType: 'road', elementType: 'labels.text.fill', stylers: [{ color: '#9ca5b3' }] },
          { featureType: 'road.highway', elementType: 'geometry', stylers: [{ color: '#746855' }] },
          { featureType: 'road.highway', elementType: 'geometry.stroke', stylers: [{ color: '#1f2835' }] },
          { featureType: 'road.highway', elementType: 'labels.text.fill', stylers: [{ color: '#f3d19c' }] },
          { featureType: 'transit', elementType: 'geometry', stylers: [{ color: '#2f3948' }] },
          { featureType: 'transit.station', elementType: 'labels.text.fill', stylers: [{ color: '#d59563' }] },
          { featureType: 'water', elementType: 'geometry', stylers: [{ color: '#17263c' }] },
          { featureType: 'water', elementType: 'labels.text.fill', stylers: [{ color: '#515c6d' }] },
          { featureType: 'water', elementType: 'labels.text.stroke', stylers: [{ color: '#17263c' }] },
        ],
      });
      new window.google.maps.Marker({
        position: userLocation,
        map: mapInstance.current,
        title: t('yourLocation'),
        icon: {
            // Fix: Use window.google to be consistent and avoid 'google' not found error.
            path: window.google.maps.SymbolPath.CIRCLE,
            scale: 8,
            fillColor: '#4285F4',
            fillOpacity: 1,
            strokeWeight: 2,
            strokeColor: 'white'
        }
      });
    }

    const input = document.getElementById('autocomplete-input') as HTMLInputElement;
    if (input && !autocomplete.current) {
        // Fix: Use window.google to be consistent and avoid 'google' not found error.
        autocomplete.current = new window.google.maps.places.Autocomplete(input);
        autocomplete.current.bindTo('bounds', mapInstance.current!);
        autocomplete.current.addListener('place_changed', () => {
            const place = autocomplete.current?.getPlace();
            if(place && place.geometry && place.geometry.location) {
                mapInstance.current?.setCenter(place.geometry.location);
                mapInstance.current?.setZoom(17);
            }
        });
    }

  }, [userLocation, t]);

  return (
    <div className="h-full w-full flex flex-col">
      <div className="relative mb-4">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20}/>
        <input
            id="autocomplete-input"
            type="text"
            placeholder={t('searchPlaceholder')}
            className="w-full bg-gray-700 text-white rounded-lg py-2 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-red-500"
        />
      </div>
      <div ref={mapRef} className="flex-grow w-full rounded-lg" />
    </div>
  );
};

export default OfflineMaps;
