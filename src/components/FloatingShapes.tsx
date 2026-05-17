import { useRef, useMemo, useState, useCallback, type RefObject } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Float, MeshDistortMaterial, MeshWobbleMaterial } from '@react-three/drei';
import * as THREE from 'three';
import {
    pointInRects,
    useSectionContentRects,
    type ContentRect,
} from '@/hooks/use-section-content-rects';

type ShapeConfig = {
    id: string;
    position: [number, number, number];
    color: string;
    type: 'torus' | 'icosahedron' | 'octahedron';
    speed?: number;
};

const SHAPES: ShapeConfig[] = [
    { id: 'torus-1', position: [-4, 2, -3], color: '#ff0033', type: 'torus', speed: 1.2 },
    { id: 'torus-2', position: [4, -1, -5], color: '#00f0ff', type: 'torus', speed: 0.8 },
    { id: 'ico-1', position: [3, 3, -4], color: '#ff1a4d', type: 'icosahedron' },
    { id: 'ico-2', position: [-3, -2, -3], color: '#33f3ff', type: 'icosahedron' },
    { id: 'oct-1', position: [0, 2.5, -6], color: '#ff0033', type: 'octahedron' },
    { id: 'oct-2', position: [-2, 1, -4], color: '#00f0ff', type: 'octahedron' },
];

type BlurSpot = {
    id: string;
    x: number;
    y: number;
    color: string;
};

function projectToScreen(
    position: [number, number, number],
    camera: THREE.Camera,
    size: { width: number; height: number }
) {
    const vec = new THREE.Vector3(...position);
    vec.project(camera);
    return {
        x: (vec.x * 0.5 + 0.5) * size.width,
        y: (-vec.y * 0.5 + 0.5) * size.height,
    };
}

function useShapeOverlap(
    rectsRef: RefObject<ContentRect[]>,
    onBlurChange: (spot: BlurSpot | null) => void,
    id: string,
    color: string
) {
    const meshRef = useRef<THREE.Mesh>(null);
    const { camera, size } = useThree();

    useFrame(() => {
        if (!meshRef.current) return;

        const worldPos = new THREE.Vector3();
        meshRef.current.getWorldPosition(worldPos);
        const { x, y } = projectToScreen(
            [worldPos.x, worldPos.y, worldPos.z],
            camera,
            size
        );
        const overlaps = pointInRects(x, y, rectsRef.current);

        if (overlaps) {
            onBlurChange({ id, x, y, color });
        } else {
            onBlurChange(null);
        }

        const materials = Array.isArray(meshRef.current.material)
            ? meshRef.current.material
            : [meshRef.current.material];

        materials.forEach((mat) => {
            if (!('opacity' in mat)) return;
            const m = mat as THREE.MeshStandardMaterial;
            const target = overlaps ? 0.55 : 0.8;
            m.opacity = THREE.MathUtils.lerp(m.opacity, target, 0.08);
            if ('emissiveIntensity' in m) {
                m.emissiveIntensity = THREE.MathUtils.lerp(
                    m.emissiveIntensity,
                    overlaps ? 0.1 : 0.2,
                    0.08
                );
            }
        });
    });

    return meshRef;
}

function FloatingTorus({
    position,
    color,
    speed = 1,
    rectsRef,
    onBlurChange,
    id,
}: {
    position: [number, number, number];
    color: string;
    speed?: number;
    rectsRef: RefObject<ContentRect[]>;
    onBlurChange: (id: string, spot: BlurSpot | null) => void;
    id: string;
}) {
    const meshRef = useShapeOverlap(
        rectsRef,
        (spot) => onBlurChange(id, spot),
        id,
        color
    );

    useFrame((state) => {
        if (meshRef.current) {
            meshRef.current.rotation.x = state.clock.elapsedTime * 0.1 * speed;
            meshRef.current.rotation.y = state.clock.elapsedTime * 0.15 * speed;
        }
    });

    return (
        <Float speed={2} rotationIntensity={0.5} floatIntensity={1.5}>
            <mesh ref={meshRef} position={position}>
                <torusGeometry args={[1.2, 0.4, 16, 50]} />
                <MeshDistortMaterial
                    color={color}
                    distort={0.3}
                    speed={2}
                    roughness={0.1}
                    metalness={0.8}
                    emissive={color}
                    emissiveIntensity={0.2}
                    transparent
                    opacity={0.85}
                />
            </mesh>
        </Float>
    );
}

function FloatingIcosahedron({
    position,
    color,
    rectsRef,
    onBlurChange,
    id,
}: {
    position: [number, number, number];
    color: string;
    rectsRef: RefObject<ContentRect[]>;
    onBlurChange: (id: string, spot: BlurSpot | null) => void;
    id: string;
}) {
    const meshRef = useShapeOverlap(
        rectsRef,
        (spot) => onBlurChange(id, spot),
        id,
        color
    );

    useFrame((state) => {
        if (meshRef.current) {
            meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.3) * 0.3;
            meshRef.current.rotation.z = Math.cos(state.clock.elapsedTime * 0.2) * 0.2;
        }
    });

    return (
        <Float speed={1.5} rotationIntensity={0.3} floatIntensity={1}>
            <mesh ref={meshRef} position={position}>
                <icosahedronGeometry args={[1, 0]} />
                <MeshWobbleMaterial
                    color={color}
                    factor={0.4}
                    speed={1.5}
                    roughness={0.2}
                    metalness={0.6}
                    emissive={color}
                    emissiveIntensity={0.15}
                    transparent
                    opacity={0.8}
                    wireframe
                />
            </mesh>
        </Float>
    );
}

function FloatingOctahedron({
    position,
    color,
    rectsRef,
    onBlurChange,
    id,
}: {
    position: [number, number, number];
    color: string;
    rectsRef: RefObject<ContentRect[]>;
    onBlurChange: (id: string, spot: BlurSpot | null) => void;
    id: string;
}) {
    const meshRef = useShapeOverlap(
        rectsRef,
        (spot) => onBlurChange(id, spot),
        id,
        color
    );
    const baseY = position[1];

    useFrame((state) => {
        if (meshRef.current) {
            meshRef.current.rotation.y = state.clock.elapsedTime * 0.25;
            meshRef.current.position.y =
                baseY + Math.sin(state.clock.elapsedTime * 0.8) * 0.3;
        }
    });

    return (
        <Float speed={2.5} rotationIntensity={0.8} floatIntensity={2}>
            <mesh ref={meshRef} position={position}>
                <octahedronGeometry args={[0.8, 0]} />
                <meshStandardMaterial
                    color={color}
                    roughness={0.1}
                    metalness={0.9}
                    emissive={color}
                    emissiveIntensity={0.3}
                    transparent
                    opacity={0.75}
                />
            </mesh>
        </Float>
    );
}

function ParticleField() {
    const pointsRef = useRef<THREE.Points>(null);

    const particles = useMemo(() => {
        const count = 300;
        const positions = new Float32Array(count * 3);
        for (let i = 0; i < count; i++) {
            positions[i * 3] = (Math.random() - 0.5) * 25;
            positions[i * 3 + 1] = (Math.random() - 0.5) * 25;
            positions[i * 3 + 2] = (Math.random() - 0.5) * 15;
        }
        return positions;
    }, []);

    useFrame((state) => {
        if (pointsRef.current) {
            pointsRef.current.rotation.y = state.clock.elapsedTime * 0.02;
            pointsRef.current.rotation.x =
                Math.sin(state.clock.elapsedTime * 0.01) * 0.1;
        }
    });

    return (
        <points ref={pointsRef}>
            <bufferGeometry>
                <bufferAttribute
                    attach="attributes-position"
                    args={[particles, 3]}
                />
            </bufferGeometry>
            <pointsMaterial
                size={0.03}
                color="#ff0033"
                transparent
                opacity={0.6}
                sizeAttenuation
            />
        </points>
    );
}

function Scene({
    rectsRef,
    onBlurChange,
}: {
    rectsRef: RefObject<ContentRect[]>;
    onBlurChange: (id: string, spot: BlurSpot | null) => void;
}) {
    return (
        <>
            <ambientLight intensity={0.3} />
            <pointLight position={[10, 10, 10]} intensity={1} color="#ff0033" />
            <pointLight position={[-10, -5, 5]} intensity={0.8} color="#00f0ff" />
            <pointLight position={[0, 10, -5]} intensity={0.5} color="#ffffff" />

            {SHAPES.map((shape) => {
                const props = {
                    key: shape.id,
                    id: shape.id,
                    position: shape.position,
                    color: shape.color,
                    rectsRef,
                    onBlurChange,
                };

                if (shape.type === 'torus') {
                    return <FloatingTorus {...props} speed={shape.speed} />;
                }
                if (shape.type === 'icosahedron') {
                    return <FloatingIcosahedron {...props} />;
                }
                return <FloatingOctahedron {...props} />;
            })}

            <ParticleField />
        </>
    );
}

export function FloatingShapes() {
    const rectsRef = useSectionContentRects();
    const [blurSpots, setBlurSpots] = useState<BlurSpot[]>([]);
    const spotsMapRef = useRef<Map<string, BlurSpot>>(new Map());

    const handleBlurChange = useCallback((id: string, spot: BlurSpot | null) => {
        const map = spotsMapRef.current;
        const had = map.has(id);

        if (spot) {
            map.set(id, spot);
        } else {
            map.delete(id);
        }

        if ((spot && !had) || (!spot && had)) {
            setBlurSpots(Array.from(map.values()));
        } else if (spot && had) {
            const prev = map.get(id);
            if (
                prev &&
                (Math.abs(prev.x - spot.x) > 4 || Math.abs(prev.y - spot.y) > 4)
            ) {
                map.set(id, spot);
                setBlurSpots(Array.from(map.values()));
            }
        }
    }, []);

    return (
        <div className="fixed inset-0 pointer-events-none" style={{ zIndex: 1 }}>
            {blurSpots.map((spot) => (
                <div
                    key={spot.id}
                    className="shape-blur-spot"
                    style={{
                        left: spot.x - 100,
                        top: spot.y - 100,
                        width: 200,
                        height: 200,
                        background: `radial-gradient(circle, ${spot.color}40 0%, transparent 72%)`,
                    }}
                />
            ))}

            <Canvas
                camera={{ position: [0, 0, 8], fov: 60 }}
                dpr={[1, 1.5]}
                gl={{ antialias: true, alpha: true }}
                style={{ background: 'transparent' }}
            >
                <Scene rectsRef={rectsRef} onBlurChange={handleBlurChange} />
            </Canvas>
        </div>
    );
}
