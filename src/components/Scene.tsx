import { ScrollControls } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { Suspense } from 'react';
import { Enterprise } from './Enterprise';

export function Scene() {
    return (
        <div className="fixed inset-0 z-0 pointer-events-none">
            <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
                {/* Lights */}
                <ambientLight intensity={0.5} />
                <directionalLight position={[10, 10, 5]} intensity={2} color="#ffffff" />
                <directionalLight position={[-10, -10, -5]} intensity={1} color="#4338ca" /> {/* Blue rim light */}

                {/* ScrollControls allows us to map scroll position to 3D animations */}
                <ScrollControls pages={4} damping={0.25}>
                    <Suspense fallback={null}>
                        <Enterprise />
                    </Suspense>
                </ScrollControls>
            </Canvas>
        </div>
    );
}
