import React, { useRef, useMemo } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Stars, Points, PointMaterial } from '@react-three/drei'
import { useLocation } from 'react-router-dom'
import * as THREE from 'three'

// 1. Water Component with moving wave vertices (Larger and shinier)
function Water() {
  const meshRef = useRef()

  useFrame((state) => {
    const time = state.clock.getElapsedTime()
    const position = meshRef.current.geometry.attributes.position
    
    for (let i = 0; i < position.count; i++) {
      const u = position.getX(i)
      const v = position.getY(i)
      // Compound wave equation for larger ripples
      const z = Math.sin(u * 0.12 + time * 1.5) * 0.22 + 
                Math.cos(v * 0.18 + time * 1.2) * 0.22 +
                Math.sin((u + v) * 0.06 + time * 1.8) * 0.1
      position.setZ(i, z)
    }
    position.needsUpdate = true
  })

  return (
    <mesh ref={meshRef} rotation={[-Math.PI / 2, 0, 0]} position={[0, -5.5, 0]}>
      <planeGeometry args={[140, 140, 32, 32]} />
      <meshStandardMaterial
        color="#030814"
        roughness={0.08}
        metalness={0.9}
        flatShading
      />
    </mesh>
  )
}

// 2. Suspension Bridge Component (Thicker and more detailed structure)
function Bridge() {
  const cablePath = useMemo(() => {
    const points = []
    for (let x = -35; x <= 35; x += 2) {
      let y = 0
      if (x < -12) {
        y = 0.07 * Math.pow(x + 12, 2) + 3.0
      } else if (x > 12) {
        y = 0.07 * Math.pow(x - 12, 2) + 3.0
      } else {
        // Middle span sag
        y = 0.02 * Math.pow(x, 2) + 1.2
      }
      points.push(new THREE.Vector3(x, y, 0))
    }
    return new THREE.CatmullRomCurve3(points)
  }, [])

  return (
    <group position={[0, -2.2, 0]}>
      {/* Road Deck */}
      <mesh position={[0, 0.15, 0]}>
        <boxGeometry args={[70, 0.4, 4.0]} />
        <meshStandardMaterial color="#0A1224" roughness={0.9} metalness={0.2} />
      </mesh>
      
      {/* Neon Road Markings */}
      <mesh position={[0, 0.36, 1.9]}>
        <boxGeometry args={[70, 0.02, 0.08]} />
        <meshStandardMaterial color="#E58324" emissive="#E58324" emissiveIntensity={1.2} />
      </mesh>
      <mesh position={[0, 0.36, -1.9]}>
        <boxGeometry args={[70, 0.02, 0.08]} />
        <meshStandardMaterial color="#E58324" emissive="#E58324" emissiveIntensity={1.2} />
      </mesh>

      {/* Bridge Tower 1 (Left: X = -12) */}
      <group position={[-12, 3.8, 0]}>
        {/* Columns */}
        <mesh position={[0, 0, 1.8]}>
          <cylinderGeometry args={[0.32, 0.48, 7.6, 8]} />
          <meshStandardMaterial color="#0A1833" metalness={0.8} roughness={0.15} />
        </mesh>
        <mesh position={[0, 0, -1.8]}>
          <cylinderGeometry args={[0.32, 0.48, 7.6, 8]} />
          <meshStandardMaterial color="#0A1833" metalness={0.8} roughness={0.15} />
        </mesh>
        {/* Cross Beams */}
        <mesh position={[0, 2.5, 0]}>
          <boxGeometry args={[0.2, 0.25, 3.6]} />
          <meshStandardMaterial color="#E58324" emissive="#E58324" emissiveIntensity={1.5} />
        </mesh>
        <mesh position={[0, -0.5, 0]}>
          <boxGeometry args={[0.2, 0.25, 3.6]} />
          <meshStandardMaterial color="#E58324" emissive="#E58324" emissiveIntensity={1.5} />
        </mesh>
      </group>

      {/* Bridge Tower 2 (Right: X = 12) */}
      <group position={[12, 3.8, 0]}>
        {/* Columns */}
        <mesh position={[0, 0, 1.8]}>
          <cylinderGeometry args={[0.32, 0.48, 7.6, 8]} />
          <meshStandardMaterial color="#0A1833" metalness={0.8} roughness={0.15} />
        </mesh>
        <mesh position={[0, 0, -1.8]}>
          <cylinderGeometry args={[0.32, 0.48, 7.6, 8]} />
          <meshStandardMaterial color="#0A1833" metalness={0.8} roughness={0.15} />
        </mesh>
        {/* Cross Beams */}
        <mesh position={[0, 2.5, 0]}>
          <boxGeometry args={[0.2, 0.25, 3.6]} />
          <meshStandardMaterial color="#E58324" emissive="#E58324" emissiveIntensity={1.5} />
        </mesh>
        <mesh position={[0, -0.5, 0]}>
          <boxGeometry args={[0.2, 0.25, 3.6]} />
          <meshStandardMaterial color="#E58324" emissive="#E58324" emissiveIntensity={1.5} />
        </mesh>
      </group>

      {/* Suspension Main Cables */}
      <mesh>
        <tubeGeometry args={[cablePath, 64, 0.16, 8, false]} />
        <meshStandardMaterial color="#E58324" emissive="#E58324" emissiveIntensity={1.6} />
      </mesh>
    </group>
  )
}

// 3. Container Ship Component (Larger, more container cargo stacks)
function Ship() {
  const shipRef = useRef()

  useFrame((state) => {
    const time = state.clock.getElapsedTime()
    if (shipRef.current) {
      shipRef.current.position.x = -28 + (time * 0.6) % 65
      shipRef.current.position.y = -4.5 + Math.sin(time * 0.8) * 0.1
      shipRef.current.rotation.z = Math.sin(time * 0.8) * 0.02
      shipRef.current.rotation.y = Math.PI / 2 + Math.cos(time * 0.45) * 0.02
    }
  })

  const containers = useMemo(() => {
    const boxes = []
    const colors = ['#E58324', '#1A2F5C', '#8F9EB3', '#DF8F36', '#223863', '#FFFFFF']
    for (let z = -0.6; z <= 0.6; z += 0.45) {
      for (let x = -1.6; x <= 1.6; x += 0.6) {
        const height = 1 + Math.floor(Math.random() * 3)
        for (let y = 0; y < height; y++) {
          boxes.push({
            pos: [x, 0.42 + y * 0.35, z],
            color: colors[Math.floor(Math.random() * colors.length)]
          })
        }
      }
    }
    return boxes
  }, [])

  return (
    <group ref={shipRef} position={[-25, -4.5, 4.2]}>
      {/* Ship Hull (Larger) */}
      <mesh castShadow>
        <boxGeometry args={[5.8, 0.8, 1.8]} />
        <meshStandardMaterial color="#071226" roughness={0.3} metalness={0.7} />
      </mesh>
      {/* Ship Bow */}
      <mesh position={[3.3, 0.2, 0]} rotation={[0, 0, -Math.PI / 4]}>
        <boxGeometry args={[1.2, 0.6, 1.8]} />
        <meshStandardMaterial color="#071226" roughness={0.3} metalness={0.7} />
      </mesh>
      {/* Cabin Structure */}
      <mesh position={[-2.2, 0.8, 0]}>
        <boxGeometry args={[0.9, 1.0, 1.4]} />
        <meshStandardMaterial color="#EAEFF8" metalness={0.6} />
      </mesh>
      {/* Containers Stack */}
      {containers.map((c, i) => (
        <mesh key={i} position={c.pos}>
          <boxGeometry args={[0.55, 0.32, 0.4]} />
          <meshStandardMaterial color={c.color} roughness={0.5} metalness={0.1} />
        </mesh>
      ))}
    </group>
  )
}

// 4. Cargo Train Component (Larger Locomotive, more cargo cars)
function Train() {
  const trainRef = useRef()

  useFrame((state) => {
    const time = state.clock.getElapsedTime()
    if (trainRef.current) {
      trainRef.current.position.x = 35 - (time * 2.2) % 75
    }
  })

  return (
    <group ref={trainRef} position={[25, -4.8, -7.5]}>
      {/* Locomotive (Larger) */}
      <group position={[0, 0.4, 0]}>
        <mesh>
          <boxGeometry args={[2.0, 0.7, 0.5]} />
          <meshStandardMaterial color="#E58324" roughness={0.4} metalness={0.5} />
        </mesh>
        <mesh position={[0.5, 0.5, 0]}>
          <boxGeometry args={[0.7, 0.45, 0.45]} />
          <meshStandardMaterial color="#1a2f5c" />
        </mesh>
        <mesh position={[-1.01, 0.12, 0]}>
          <sphereGeometry args={[0.12, 8, 8]} />
          <meshBasicMaterial color="#FFFFFF" />
        </mesh>
      </group>

      {/* Cargo Cars (Larger) */}
      {[1, 2, 3, 4, 5, 6].map((idx) => (
        <mesh key={idx} position={[idx * 2.3, 0.4, 0]}>
          <boxGeometry args={[2.0, 0.55, 0.45]} />
          <meshStandardMaterial color={idx % 2 === 0 ? '#1A2F5C' : '#8F9EB3'} />
        </mesh>
      ))}
    </group>
  )
}

// 5. Cargo Truck Component (Larger Cab and Trailer)
function Truck() {
  const truckRef = useRef()

  useFrame((state) => {
    const time = state.clock.getElapsedTime()
    if (truckRef.current) {
      truckRef.current.position.x = -40 + (time * 2.8) % 80
    }
  })

  return (
    <group ref={truckRef} position={[-35, -1.85, 0.4]}>
      {/* Cabin (Larger) */}
      <mesh position={[1.1, 0.35, 0]}>
        <boxGeometry args={[0.7, 0.7, 0.55]} />
        <meshStandardMaterial color="#EAEFF8" metalness={0.7} roughness={0.1} />
      </mesh>
      {/* Cargo Trailer (Larger) */}
      <mesh position={[-0.3, 0.5, 0]}>
        <boxGeometry args={[2.2, 0.9, 0.6]} />
        <meshStandardMaterial color="#E58324" metalness={0.5} roughness={0.4} />
      </mesh>
      {/* Wheels */}
      <mesh position={[0.8, 0.08, 0.28]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.16, 0.16, 0.12, 8]} />
        <meshStandardMaterial color="#050505" />
      </mesh>
      <mesh position={[0.8, 0.08, -0.28]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.16, 0.16, 0.12, 8]} />
        <meshStandardMaterial color="#050505" />
      </mesh>
      <mesh position={[-1.1, 0.08, 0.28]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.16, 0.16, 0.12, 8]} />
        <meshStandardMaterial color="#050505" />
      </mesh>
      <mesh position={[-1.1, 0.08, -0.28]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.16, 0.16, 0.12, 8]} />
        <meshStandardMaterial color="#050505" />
      </mesh>
    </group>
  )
}

// 6. Network Globe Component (Larger wireframe connections)
function NetworkGlobe({ active }) {
  const globeRef = useRef()

  useFrame((state) => {
    if (globeRef.current) {
      globeRef.current.rotation.y = state.clock.getElapsedTime() * 0.18
      globeRef.current.rotation.x = Math.sin(state.clock.getElapsedTime() * 0.05) * 0.06
      
      const targetScale = active ? 1.0 : 0.001
      const currentScale = globeRef.current.scale.x
      const newScale = THREE.MathUtils.lerp(currentScale, targetScale, 0.08)
      globeRef.current.scale.setScalar(newScale)
    }
  })

  const arcs = useMemo(() => {
    const points = {
      london: new THREE.Vector3(-1.6, 3.0, 2.0),
      dubai: new THREE.Vector3(0.6, 1.2, 3.8),
      india: new THREE.Vector3(2.4, -0.8, 3.1)
    }

    const makeCurve = (p1, p2) => {
      const mid = new THREE.Vector3().addVectors(p1, p2).normalize().multiplyScalar(4.8)
      const curve = new THREE.QuadraticBezierCurve3(p1, mid, p2)
      return curve.getPoints(24)
    }

    return [
      makeCurve(points.london, points.dubai),
      makeCurve(points.dubai, points.india),
      makeCurve(points.london, points.india)
    ]
  }, [])

  return (
    <group ref={globeRef} position={[8, 5, -8]} scale={[0.001, 0.001, 0.001]}>
      {/* Globe Wireframe Sphere (Larger R=4.0) */}
      <mesh>
        <sphereGeometry args={[4, 24, 24]} />
        <meshStandardMaterial
          color="#1A2F5C"
          wireframe
          transparent
          opacity={0.35}
        />
      </mesh>
      
      <mesh>
        <sphereGeometry args={[3.96, 12, 12]} />
        <meshStandardMaterial
          color="#060d1b"
          roughness={0.9}
        />
      </mesh>

      {/* Network Connections */}
      {arcs.map((pts, i) => {
        const lineGeom = new THREE.BufferGeometry().setFromPoints(pts)
        return (
          <line key={i} geometry={lineGeom}>
            <lineBasicMaterial color="#E58324" linewidth={2.5} />
          </line>
        )
      })}

      {/* Nodes */}
      <mesh position={[-1.6, 3.0, 2.0]}>
        <sphereGeometry args={[0.16, 12, 12]} />
        <meshBasicMaterial color="#E58324" />
      </mesh>
      <mesh position={[0.6, 1.2, 3.8]}>
        <sphereGeometry args={[0.16, 12, 12]} />
        <meshBasicMaterial color="#E58324" />
      </mesh>
      <mesh position={[2.4, -0.8, 3.1]}>
        <sphereGeometry args={[0.16, 12, 12]} />
        <meshBasicMaterial color="#E58324" />
      </mesh>
    </group>
  )
}

// 7. Floating Sky Nodes (More points for network density)
function SkyNodes() {
  const pointsRef = useRef()

  const [positions, count] = useMemo(() => {
    const numPoints = 80
    const coords = new Float32Array(numPoints * 3)
    for (let i = 0; i < numPoints; i++) {
      coords[i * 3] = (Math.random() - 0.5) * 60 // X
      coords[i * 3 + 1] = Math.random() * 20 - 2 // Y
      coords[i * 3 + 2] = (Math.random() - 0.5) * 40 - 5 // Z
    }
    return [coords, numPoints]
  }, [])

  useFrame((state) => {
    const time = state.clock.getElapsedTime()
    if (pointsRef.current) {
      pointsRef.current.rotation.y = time * 0.02
      pointsRef.current.rotation.x = Math.sin(time * 0.01) * 0.04
    }
  })

  return (
    <Points ref={pointsRef} positions={positions} stride={3}>
      <PointMaterial
        transparent
        color="#E58324"
        size={0.16}
        sizeAttenuation={true}
        depthWrite={false}
        opacity={0.8}
      />
    </Points>
  )
}

// 8. Camera Rig linking camera coordinates to routing (Brings camera closer for large models)
function CameraRig({ path }) {
  const { camera } = useThree()
  
  const configs = useMemo(() => ({
    '/': {
      pos: [0, 3.2, 11.5], // Moved closer from Z=17 to Z=11.5, Y=3.2
      lookAt: [0, -1.5, 0]
    },
    '/about': {
      pos: [-4.2, 1.8, 6.0], // Zoomed right onto the bridge deck & truck
      lookAt: [-10, 1.2, 0]
    },
    '/solutions': {
      pos: [0, -2.4, 7.8], // Extremely low angle looking directly up at the huge cargo ship
      lookAt: [0, -3.8, 0]
    },
    '/network': {
      pos: [5, 4.5, -2.0], // Camera zooms close into the rotating wireframe globe
      lookAt: [8, 5.0, -8]
    },
    '/insights': {
      pos: [-9, 3.2, 11.5], // Profile view looking at the bridge span
      lookAt: [0, -1, 0]
    },
    '/contact': {
      pos: [0, -2.2, 6.5], // Low camera position looking up into the sky/bridge towers
      lookAt: [0, 1.5, 0]
    }
  }), [])

  const currentConfig = configs[path] || configs['/']
  const targetPos = useMemo(() => new THREE.Vector3(...currentConfig.pos), [currentConfig])
  const targetLookAt = useMemo(() => new THREE.Vector3(...currentConfig.lookAt), [currentConfig])
  
  const currentLookAtRef = useRef(new THREE.Vector3(0, 0, 0))

  useFrame(() => {
    camera.position.lerp(targetPos, 0.05)
    currentLookAtRef.current.lerp(targetLookAt, 0.05)
    camera.lookAt(currentLookAtRef.current)
  })

  return null
}

// 9. Main Background3D Export
export default function Background3D() {
  const location = useLocation()

  return (
    <div className="bg-3d-container" style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100vw',
      height: '100vh',
      zIndex: -1,
      pointerEvents: 'none',
      overflow: 'hidden'
    }}>
      <Canvas
        camera={{ position: [0, 3.2, 11.5], fov: 45 }}
        gl={{ antialias: true, alpha: false }}
        onCreated={({ gl }) => {
          gl.setClearColor('#050b18')
        }}
      >
        <fog attach="fog" args={['#050b18', 10, 40]} />
        <ambientLight intensity={0.7} />
        
        {/* Lights (Brightened for high visibility) */}
        <directionalLight
          position={[10, 22, 8]}
          intensity={1.8}
          color="#EAEFF8"
        />
        
        <pointLight position={[-15, 10, -5]} intensity={1.2} color="#E58324" />
        <pointLight position={[15, 6, 8]} intensity={1.5} color="#1A2F5C" />

        {/* Scene Meshes */}
        <Water />
        <Bridge />
        <Ship />
        <Train />
        <Truck />
        
        <NetworkGlobe active={location.pathname === '/network'} />
        
        <SkyNodes />
        <Stars radius={80} depth={40} count={600} factor={3.5} saturation={0.5} fade speed={1.2} />
        
        <CameraRig path={location.pathname} />
      </Canvas>
    </div>
  )
}
