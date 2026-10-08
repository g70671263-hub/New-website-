import React, { useState, useEffect } from 'react';
import { APIProvider, Map, AdvancedMarker, InfoWindow, useMap } from '@vis.gl/react-google-maps';
import { AnalyzedBusiness } from '../types/business';
import { Star, Globe, Phone, MapPin, ExternalLink, Sparkles } from 'lucide-react';

declare const google: any;

interface GoogleBusinessMapProps {
  apiKey: string;
  businesses: AnalyzedBusiness[];
  selectedBusiness: AnalyzedBusiness | null;
  onSelectBusiness: (business: AnalyzedBusiness) => void;
  country: string;
}

// Country coordinates mapping for smooth auto-centering
const COUNTRY_COORDINATES: Record<string, { lat: number; lng: number; zoom: number }> = {
  'United States': { lat: 39.8283, lng: -98.5795, zoom: 4 },
  'United Kingdom': { lat: 55.3781, lng: -3.436, zoom: 6 },
  'Canada': { lat: 56.1304, lng: -106.3468, zoom: 4 },
  'Germany': { lat: 51.1657, lng: 10.4515, zoom: 6 },
  'India': { lat: 20.5937, lng: 78.9629, zoom: 5 },
  'Australia': { lat: -25.2744, lng: 133.7751, zoom: 4 },
  'United Arab Emirates': { lat: 23.4241, lng: 53.8478, zoom: 7 },
  'France': { lat: 46.2276, lng: 2.2137, zoom: 6 },
  'Japan': { lat: 36.2048, lng: 138.2529, zoom: 6 },
  'Singapore': { lat: 1.3521, lng: 103.8198, zoom: 12 },
  'Netherlands': { lat: 52.1326, lng: 5.2913, zoom: 7 },
  'Brazil': { lat: -14.235, lng: -51.9253, zoom: 4 },
  'Spain': { lat: 40.4637, lng: -3.7492, zoom: 6 },
  'Italy': { lat: 41.8719, lng: 12.5674, zoom: 6 },
};

function MapCameraController({
  businesses,
  selectedBusiness,
  country,
}: {
  businesses: AnalyzedBusiness[];
  selectedBusiness: AnalyzedBusiness | null;
  country: string;
}) {
  const map = useMap();

  useEffect(() => {
    if (!map) return;

    if (selectedBusiness && selectedBusiness.lat && selectedBusiness.lng) {
      map.panTo({ lat: selectedBusiness.lat, lng: selectedBusiness.lng });
      map.setZoom(15);
      return;
    }

    if (businesses.length > 0) {
      const valid = businesses.filter((b) => b.lat !== 0 && b.lng !== 0);
      if (valid.length > 0) {
        if (valid.length === 1) {
          map.panTo({ lat: valid[0].lat, lng: valid[0].lng });
          map.setZoom(14);
        } else {
          const bounds = new google.maps.LatLngBounds();
          valid.forEach((b) => bounds.extend({ lat: b.lat, lng: b.lng }));
          map.fitBounds(bounds, 60);
        }
        return;
      }
    }

    // Default to country coordinate
    const preset = COUNTRY_COORDINATES[country] || { lat: 20, lng: 0, zoom: 2 };
    map.panTo({ lat: preset.lat, lng: preset.lng });
    map.setZoom(preset.zoom);
  }, [map, businesses, selectedBusiness, country]);

  return null;
}

export const GoogleBusinessMap: React.FC<GoogleBusinessMapProps> = ({
  apiKey,
  businesses,
  selectedBusiness,
  onSelectBusiness,
  country,
}) => {
  const defaultPos = COUNTRY_COORDINATES[country] || { lat: 51.5074, lng: -0.1278, zoom: 11 };
  const [activeWindow, setActiveWindow] = useState<AnalyzedBusiness | null>(null);

  useEffect(() => {
    if (selectedBusiness) {
      setActiveWindow(selectedBusiness);
    }
  }, [selectedBusiness]);

  return (
    <div className="relative w-full h-full min-h-[420px] rounded-2xl overflow-hidden border border-slate-800 shadow-xl bg-slate-950">
      <APIProvider apiKey={apiKey} libraries={['places', 'marker']}>
        <Map
          mapId="DEMO_MAP_ID"
          defaultCenter={{ lat: defaultPos.lat, lng: defaultPos.lng }}
          defaultZoom={defaultPos.zoom}
          gestureHandling="greedy"
          disableDefaultUI={false}
          className="w-full h-full min-h-[420px]"
        >
          <MapCameraController
            businesses={businesses}
            selectedBusiness={selectedBusiness}
            country={country}
          />

          {/* Render markers for each business */}
          {businesses.map((business) => {
            if (!business.lat || !business.lng) return null;
            const isSelected = selectedBusiness?.id === business.id;
            const isHighOpp = business.opportunityScore >= 85;

            return (
              <AdvancedMarker
                key={business.id}
                position={{ lat: business.lat, lng: business.lng }}
                onClick={() => {
                  onSelectBusiness(business);
                  setActiveWindow(business);
                }}
              >
                <div
                  className={`relative flex items-center justify-center cursor-pointer transition-all transform hover:scale-125 ${
                    isSelected ? 'scale-125 z-30' : 'z-10'
                  }`}
                >
                  <div
                    className={`w-9 h-9 rounded-full flex items-center justify-center font-mono font-bold text-xs text-white shadow-lg border-2 ${
                      isHighOpp
                        ? 'bg-gradient-to-tr from-amber-500 to-rose-500 border-white ring-2 ring-amber-400/50'
                        : 'bg-indigo-600 border-slate-900'
                    }`}
                  >
                    {business.opportunityScore}%
                  </div>
                  {isHighOpp && (
                    <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-amber-300 rounded-full border border-slate-900 flex items-center justify-center text-[8px] text-slate-900 font-bold">
                      ★
                    </span>
                  )}
                </div>
              </AdvancedMarker>
            );
          })}

          {/* Info Window */}
          {activeWindow && activeWindow.lat && activeWindow.lng && (
            <InfoWindow
              position={{ lat: activeWindow.lat, lng: activeWindow.lng }}
              onCloseClick={() => setActiveWindow(null)}
            >
              <div className="p-1 max-w-[240px] text-slate-900 font-sans">
                <div className="flex items-center justify-between gap-2">
                  <h4 className="font-bold text-xs text-slate-950 truncate">
                    {activeWindow.name}
                  </h4>
                  <span className="font-mono text-[10px] font-bold text-amber-600 bg-amber-50 px-1.5 py-0.5 rounded border border-amber-200">
                    {activeWindow.opportunityScore}% Opp
                  </span>
                </div>

                <div className="flex items-center gap-1.5 mt-1 text-[11px] text-slate-600">
                  <Star className="w-3 h-3 text-amber-500 fill-amber-500" />
                  <span className="font-semibold text-slate-800">{activeWindow.rating || 'N/A'}</span>
                  <span>({activeWindow.reviewsCount || 0} reviews)</span>
                </div>

                <p className="text-[10px] text-slate-500 mt-1 truncate">
                  {activeWindow.address}
                </p>

                <div className="mt-2 pt-1.5 border-t border-slate-200">
                  <span className="text-[10px] font-semibold text-indigo-700 block">
                    How you can help:
                  </span>
                  <p className="text-[10px] text-slate-600 line-clamp-2 mt-0.5">
                    {activeWindow.howWeCanHelp}
                  </p>
                </div>

                {activeWindow.website && (
                  <a
                    href={activeWindow.website}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 mt-2 text-[10px] font-semibold text-indigo-600 hover:text-indigo-800"
                  >
                    <Globe className="w-2.5 h-2.5" />
                    <span>Visit Website</span>
                    <ExternalLink className="w-2.5 h-2.5" />
                  </a>
                )}
              </div>
            </InfoWindow>
          )}
        </Map>
      </APIProvider>

      {/* Floating Map Overlay Badge */}
      <div className="absolute top-3 left-3 bg-slate-900/90 border border-slate-800 px-3 py-1.5 rounded-xl shadow-lg backdrop-blur-md flex items-center gap-2 text-xs z-10">
        <MapPin className="w-3.5 h-3.5 text-rose-500" />
        <span className="text-slate-200 font-medium">
          {country} &middot; {businesses.length} Businesses Pinned
        </span>
      </div>
    </div>
  );
};
