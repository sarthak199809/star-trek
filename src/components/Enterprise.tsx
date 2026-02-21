import { useGLTF, useScroll, Trail } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { useRef } from 'react';
import * as THREE from 'three';

export function Enterprise() {
    const { scene } = useGLTF('/models/enterprise.glb');
    const group = useRef<THREE.Group>(null);
    const scroll = useScroll();

    useFrame((state) => {
        if (!group.current || !scroll) return;

        const r = scroll.offset;

        let targetPos = new THREE.Vector3(0, 0, 0);
        let targetRot = new THREE.Euler(0, -Math.PI / 4, 0);

        if (r < 0.2) {
            const progress = r / 0.2;
            targetPos.set(0, -1 + progress * 0.5, 0);
            targetRot.set(0.1, -Math.PI / 4 + progress * 0.5, 0.1);
        }
        else if (r < 0.6) {
            const progress = (r - 0.2) / 0.4;

            if (progress < 0.33) {
                const subP = progress / 0.33;
                targetPos.set(-1 * subP, 0.5 * subP, 2 * subP);
                targetRot.set(0.2 * subP, -Math.PI / 4 + 0.5 + subP * Math.PI, 0);
            } else if (progress < 0.66) {
                const subP = (progress - 0.33) / 0.33;
                targetPos.set(-1 + 2 * subP, 0.5 - 1 * subP, 2 - 2 * subP);
                targetRot.set(0.2 - 0.4 * subP, Math.PI / 4 + Math.PI - subP * (Math.PI / 2), 0);
            } else {
                const subP = (progress - 0.66) / 0.34;
                targetPos.set(1.5, -0.5, -1);
                targetRot.set(-0.2, Math.PI / 4 + Math.PI / 2 - subP * Math.PI / 4, 0.1 * subP);
            }
        }
        else if (r < 0.8) {
            const progress = (r - 0.6) / 0.2;
            targetPos.set(1.5 - progress * 5, -0.5 + progress * 2, -4);
            targetRot.set(progress * 0.5, -Math.PI / 4 - progress, progress * 0.5);
        }
        else {
            const progress = (r - 0.8) / 0.2;
            targetPos.set(-3.5 + progress * 3.5, 1.5 - progress * 2, -4 + progress * 3);
            targetRot.set(0.5 - progress * 0.5, -Math.PI / 4 - 1 + progress * 1.5, 0.5 - progress * 0.5);
        }

        group.current.position.lerp(targetPos, 0.05);

        const currentQuat = new THREE.Quaternion().setFromEuler(group.current.rotation);
        const targetQuat = new THREE.Quaternion().setFromEuler(targetRot);
        currentQuat.slerp(targetQuat, 0.05);
        group.current.rotation.setFromQuaternion(currentQuat);

        group.current.position.y += Math.sin(state.clock.elapsedTime) * 0.002;
    });

    return (
        <group ref={group}>
            <Trail
                width={0.2}
                color="#60a5fa" // blue-400
                length={8}
                decay={1}
                local={false}
                stride={0}
                interval={1}
                target={group}
            >
                <primitive object={scene} scale={[0.005, 0.005, 0.005]} />
            </Trail>
        </group>
    );
}

useGLTF.preload('/models/enterprise.glb');
