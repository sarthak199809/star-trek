import { useGLTF, Trail } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { useRef } from 'react';
import * as THREE from 'three';

export function Enterprise() {
    const { scene } = useGLTF('/models/enterprise.glb');
    const group = useRef<THREE.Group>(null);

    // Track current position and rotation for extremely smooth framerate-independent lerping
    const currentPos = useRef(new THREE.Vector3(2, -0.5, 2));
    const currentRot = useRef(new THREE.Euler(0.1, -Math.PI / 4 + 0.2, 0.1));
    const currentScale = useRef(new THREE.Vector3(0.015, 0.015, 0.015));

    useFrame((state, delta) => {
        if (!group.current) return;

        const isMobile = window.innerWidth < 768;

        // Directly calculate scroll progress from the native window layout
        // `maxScroll` prevents NaNs if DOM isn't fully ready
        const scrollY = window.scrollY || document.documentElement.scrollTop;
        const maxScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
        const r = Math.max(0, Math.min(1, scrollY / maxScroll));

        let targetPos = new THREE.Vector3(0, 0, 0);
        let targetRot = new THREE.Euler(0, -Math.PI / 4, 0);
        let targetScale = isMobile ? new THREE.Vector3(0.008, 0.008, 0.008) : new THREE.Vector3(0.015, 0.015, 0.015);

        // Based on approximate section heights: Hero (100vh), Features (400vh), Legacy (100vh), Footer (100vh)
        // Total ~700vh. Hero = 0-0.15, Features = 0.15-0.75, Legacy = 0.75-0.9, Footer = 0.9-1.0

        if (r < 0.15) {
            const progress = r / 0.15;
            targetPos.set(isMobile ? 0 : 2, -0.5 + progress * 0.5, isMobile ? 1 : 2);
            targetRot.set(0.1, -Math.PI / 4 + 0.2 + progress * 0.1, 0.1);
        }
        else if (r >= 0.15 && r < 0.20) {
            // Smooth transition diving into features (0.15 - 0.20)
            const p = (r - 0.15) / 0.05;
            targetPos.set((isMobile ? 0 : 2) - p * 0.8, 0, (isMobile ? 1 : 2) - p);
            targetRot.set(
                THREE.MathUtils.lerp(0.1, 0, p),
                THREE.MathUtils.lerp(-Math.PI / 4 + 0.3, -Math.PI / 2, p),
                THREE.MathUtils.lerp(0.1, Math.PI / 2 - 0.2, p)
            );
        }
        else if (r >= 0.20 && r < 0.75) {
            // The features section
            const progress = (r - 0.20) / 0.55;

            // On mobile, text is full width, so keep ship centered and placed just above the title (y=1)
            // On desktop, push ship left to balance text on right
            targetPos.set(isMobile ? 0 : -2, isMobile ? 1.0 : 0, 1);

            // Smoother continuous rotation matching the 4 features
            targetRot.set(0, -Math.PI / 2 + progress * (1.5 * Math.PI), Math.PI / 2 - 0.2);
        }
        else if (r >= 0.75 && r < 0.9) {
            // Legacy fast fly-by
            const progress = (r - 0.75) / 0.15;
            targetPos.set((isMobile ? 0 : 1.2) - progress * 10, progress * 4, 1 - progress * 6);
            targetRot.set(progress * 0.5, Math.PI - progress * (Math.PI / 4), (Math.PI / 2 - 0.2) - progress * 0.5);
        }
        else {
            // Final landing
            const progress = (r - 0.9) / 0.1;
            targetPos.set((isMobile ? -2 : -8.8) + progress * (isMobile ? 1 : 3.8), 4 - progress, -5 - progress);
            targetRot.set(0.5 + progress * 0.2, 3 * Math.PI / 4 - progress * 0.5, Math.PI / 2 - 0.7 - progress * 0.2);
        }

        // Apply smooth slerping / lerping INDEPENDENT of actual scroll speed
        // This gives the "frame by frame" continuous tracking feeling while still being smooth
        currentPos.current.lerp(targetPos, delta * 5);
        currentScale.current.lerp(targetScale, delta * 5);

        const qCurrent = new THREE.Quaternion().setFromEuler(currentRot.current);
        const qTarget = new THREE.Quaternion().setFromEuler(targetRot);
        qCurrent.slerp(qTarget, delta * 5);
        currentRot.current.setFromQuaternion(qCurrent);

        // Apply the smoothed values
        group.current.position.copy(currentPos.current);
        group.current.rotation.copy(currentRot.current);
        group.current.scale.copy(currentScale.current);

        // Add subtle constant floating on top of the targeted position
        group.current.position.y += Math.sin(state.clock.elapsedTime) * 0.05;
        group.current.position.z += Math.cos(state.clock.elapsedTime) * 0.02;
    });

    // Extract the dynamic scale logic internally instead of passing as prop to primitive
    // because primitive updates scale destructively
    // We already apply scale to the parent group!

    return (
        <group ref={group}>
            <Trail
                width={0.5}
                color="#60a5fa" // blue-400
                length={8}
                decay={1}
                local={false}
                stride={0}
                interval={1}
                target={group}
            >
                {/* Reset primitive scale to 1 because group handles dynamic scaling */}
                <primitive object={scene} scale={[1, 1, 1]} />
            </Trail>
        </group>
    );
}

useGLTF.preload('/models/enterprise.glb');
