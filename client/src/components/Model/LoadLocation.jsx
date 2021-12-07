import React, { useRef } from 'react'
import { useFrame, useLoader } from '@react-three/fiber'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'


export default function LoadLocation(props) {

    const ref = useRef();
    
    useFrame((state, delta) => {
        // ref.current.rotation.y += 0.01;
    })
    // Return the view, these are regular Threejs elements expressed in JSX
    
    const vancouver = useLoader(GLTFLoader, `/3d_assets/vancouver/scene.gltf`);
    const toronto = useLoader(GLTFLoader, `/3d_assets/toronto/scene.gltf`);

    if (props.location==="vancouver") {
        return (
            <mesh
            {...props}
            ref={ref}
            scale={1}>
            <primitive ref={ref} position={[-25, -7, -8]} object={vancouver.scene} scale={0.08}/>
            </mesh>
        )
    } else if (props.location==="toronto") {
        return (
            <mesh
            {...props}
            ref={ref}
            scale={1}>
            <primitive ref={ref} position={[10, -4, -4]} object={toronto.scene} scale={0.03}/>
            </mesh>
        )
    } 

    return(<mesh
        {...props}
        ref={ref}
        scale={1}>
        </mesh>);
    
}
