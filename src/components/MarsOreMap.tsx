import { useState } from "react";
import { Modal } from "antd";

import { Acquisition } from "../api/acquisitions";

type Props = {
  acquisitions: Acquisition[];
};

type OreSite = {
  x: number;
  y: number;
  id: string;
  timestamp: number;
  ore_sites: number;
};

// Simple LCG for deterministic “random” per site
const createSeededRNG = (seed: number) => {
  let state = seed;
  return () => {
    state = (state * 9301 + 49297) % 233280;
    return state / 233280;
  };
};
const generateSiteFromAcquisition = (acq: Acquisition, index: number): OreSite => {
  // Create a generator seeded by timestamp+index
  const rng = createSeededRNG(acq.timestamp + index);

  // Uniformly scatter inside a circle:
  // - u in [0,1), r = sqrt(u) * radius
  // - θ in [0, 2π)
  const u = rng();
  const r = Math.sqrt(u) * 50; // radius in percent (0–50%)
  const theta = rng() * Math.PI * 2; // angle
  const x = 50 + r * Math.cos(theta); // center at 50%
  const y = 50 + r * Math.sin(theta);

  return {
    id: `ORE-${index + 1}`,
    x,
    y,
    timestamp: acq.timestamp,
    ore_sites: acq.ore_sites,
  };
};

const MarsOreMap = ({ acquisitions }: Props) => {
  const [selectedSite, setSelectedSite] = useState<OreSite | null>(null);

  // Convert acquisitions into displayable ore sites
  const allSites = acquisitions.map((acq, i) => generateSiteFromAcquisition(acq, i));
  return (
    <div
      className="w-96 h-96 rounded-full relative overflow-hidden md:shadow-xl planet-spin bg-contain md:bg-cover bg-no-repeat"
      style={{
        backgroundImage: "url(/mars.png)",
        backgroundPosition: "center",
      }}
    >
      {allSites.map(site => (
        <div
          key={site.id}
          className="absolute cursor-pointer group"
          style={{
            top: `${site.y}%`,
            left: `${site.x}%`,
            transform: "translate(-50%, -50%)",
          }}
          onClick={() => setSelectedSite(site)}
          title={`Ore Site ${site.id}`}
        >
          {/* Outer “ping” circle */}
          <span className="absolute block w-2 h-2 rounded-full opacity-60 animate-ping group-hover:animate-none bg-gray-500" />
          {/* Inner solid dot */}
          <span className="absolute block w-1 h-1 rounded-full inset-0 m-auto bg-white" />
        </div>
      ))}

      <Modal
        open={!!selectedSite}
        title={`Ore Site: ${selectedSite?.id}`}
        footer={null}
        onCancel={() => setSelectedSite(null)}
      >
        <p>
          <strong>Detected at:</strong>{" "}
          {selectedSite && new Date(selectedSite.timestamp * 1000).toLocaleString()}
        </p>
        <p>
          <strong>Ore sites found:</strong> {selectedSite?.ore_sites}
        </p>
      </Modal>
    </div>
  );
};

export default MarsOreMap;
