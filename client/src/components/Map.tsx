import { useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { Location } from "@/hooks/use-locations";
import { MapPin } from "lucide-react";

// Fix for default Leaflet marker icons in React
import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";

let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41]
});

L.Marker.prototype.options.icon = DefaultIcon;

// Custom neon pin icon
const createCustomIcon = (color: string) => new L.DivIcon({
  className: "custom-pin",
  html: `<div style="
    background-color: ${color};
    width: 12px;
    height: 12px;
    border-radius: 50%;
    box-shadow: 0 0 10px ${color}, 0 0 20px ${color};
    border: 2px solid white;
  "></div>`,
  iconSize: [12, 12],
  iconAnchor: [6, 6]
});

const purpleIcon = createCustomIcon("#b026ff");
const greenIcon = createCustomIcon("#00ff9d");

interface MapProps {
  locations: Location[];
  selectedId: number | null;
  onSelect: (id: number) => void;
}

function MapUpdater({ center, zoom }: { center: [number, number], zoom: number }) {
  const map = useMap();
  useEffect(() => {
    map.flyTo(center, zoom, { duration: 1.5 });
  }, [center, zoom, map]);
  return null;
}

export function Map({ locations, selectedId, onSelect }: MapProps) {
  const selectedLocation = locations.find(l => l.id === selectedId);
  const center: [number, number] = selectedLocation 
    ? [selectedLocation.lat, selectedLocation.lng] 
    : [-14.2350, -51.9253]; // Brazil Center
  
  const zoom = selectedLocation ? 12 : 4;

  return (
    <div className="w-full h-full z-0 relative">
      <MapContainer 
        center={[-14.2350, -51.9253]} 
        zoom={4} 
        style={{ height: "100%", width: "100%", background: "#0a0a0a" }}
        zoomControl={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
        />
        
        <MapUpdater center={center} zoom={zoom} />

        {locations.map((loc) => (
          <Marker 
            key={loc.id} 
            position={[loc.lat, loc.lng]}
            icon={loc.id === selectedId ? greenIcon : purpleIcon}
            eventHandlers={{
              click: () => onSelect(loc.id),
            }}
          >
            <Popup className="glass-popup">
              <div className="p-1">
                <h3 className="font-bold text-sm text-primary mb-1 font-display">{loc.name}</h3>
                <p className="text-xs text-muted-foreground line-clamp-2">{loc.description}</p>
                <div className="mt-2 flex gap-1 flex-wrap">
                  {loc.categories.slice(0, 2).map(cat => (
                    <span key={cat.id} className="text-[10px] px-1.5 py-0.5 rounded-full bg-primary/20 text-primary border border-primary/30">
                      {cat.icon} {cat.name}
                    </span>
                  ))}
                </div>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
      
      {/* Decorative corners */}
      <div className="absolute top-4 left-4 w-32 h-32 border-l-2 border-t-2 border-primary/30 rounded-tl-3xl pointer-events-none z-[1000]" />
      <div className="absolute bottom-4 right-4 w-32 h-32 border-r-2 border-b-2 border-primary/30 rounded-br-3xl pointer-events-none z-[1000]" />
    </div>
  );
}
