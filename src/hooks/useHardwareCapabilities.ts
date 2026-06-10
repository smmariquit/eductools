import { useState, useEffect } from 'react';

interface HardwareProfile {
  isLowEnd: boolean;
  deviceMemory?: number;
  hardwareConcurrency?: number;
  unsupportedWebGL?: boolean;
}

/**
 * A hook to detect the hardware capabilities of the client device.
 * Used to gracefully degrade or completely disable heavy 3D WebGL 
 * simulations on budget smartphones common in the Philippine public school sector.
 */
export const useHardwareCapabilities = (): HardwareProfile => {
  const [profile, setProfile] = useState<HardwareProfile>({ isLowEnd: false });

  useEffect(() => {
    // navigator.deviceMemory and hardwareConcurrency are not supported in all browsers (e.g., Safari),
    // but they are widely supported in Chromium-based browsers which dominate Android usage.
    const nav = navigator as any;
    
    const deviceMemory = nav.deviceMemory; // Returns RAM in GB (approximate, maxes at 8)
    const hardwareConcurrency = nav.hardwareConcurrency; // Returns logical CPU cores

    // Heuristic for a sub-$100 smartphone:
    // 1. If device explicitly reports <= 4GB RAM
    // 2. Or if device reports <= 4 logical cores
    const isMemoryLow = deviceMemory !== undefined && deviceMemory <= 4;
    const isCpuLow = hardwareConcurrency !== undefined && hardwareConcurrency <= 4;
    
    let unsupportedWebGL = false;
    
    // Quick WebGL test
    try {
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
      if (!gl) {
        unsupportedWebGL = true;
      }
    } catch (e) {
      unsupportedWebGL = true;
    }

    setProfile({
      isLowEnd: isMemoryLow || isCpuLow || unsupportedWebGL,
      deviceMemory,
      hardwareConcurrency,
      unsupportedWebGL
    });
  }, []);

  return profile;
};
