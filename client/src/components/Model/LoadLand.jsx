import React, { useRef } from 'react'
import { useFrame, useLoader } from '@react-three/fiber'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'


export default function LoadLand(props) {

    const ref = useRef()
    
    useFrame((state, delta) => {
        // ref.current.rotation.x = 0.4;
        // ref.current.rotation.y += 0.01;
    })
    // Return the view, these are regular Threejs elements expressed in JSX
    let distance = -5;
    let scale = 15;
    if (props.land==="large"){
        distance = -10;
        scale = 25;
    }
    const lawn = useLoader(GLTFLoader, `/3d_assets/lawn/scene.gltf`);
    if (props.land){
        return (
            <mesh
            {...props}
            ref={ref}
            scale={1}>
            <primitive ref={ref} position={[0, 0, distance]} object={lawn.scene} scale={scale}/>
            </mesh>
        )
    } else {
        return (
            <mesh
            {...props}
            ref={ref}
            scale={1}>
            </mesh>
        )
    }

    
}
