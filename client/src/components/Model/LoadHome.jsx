import React, { useRef } from 'react'
import { useFrame, useLoader } from '@react-three/fiber'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'


export default function LoadHome(props) {

    const ref = useRef();
    
    useFrame((state, delta) => {
        // ref.current.rotation.y += 0.01;
    })
    // Return the view, these are regular Threejs elements expressed in JSX
    
    const house = useLoader(GLTFLoader, `/3d_assets/house/scene.gltf`);
    const apartment = useLoader(GLTFLoader, `/3d_assets/apartment/scene.gltf`);
    const townhouse = useLoader(GLTFLoader, `/3d_assets/townhouse/scene.gltf`);

    if (props.style==="house") {
        return (
            <mesh
            {...props}
            ref={ref}
            scale={0.8}>
            <primitive ref={ref} position={[-2, -0.5, -1]} object={house.scene} scale={0.2}/>
            </mesh>
        )
    } else if (props.style==="apartment") {
        console.log("render apartment");
        return (
            <mesh
            {...props}
            ref={ref}
            scale={1}>
            <primitive ref={ref} position={[0, -2.2, 1]} object={apartment.scene} scale={0.002}/>
            </mesh>
        )
    } else if (props.style==="townhouse") {
        console.log("render townhouse");
        return (
            <mesh
            {...props}
            ref={ref}
            scale={1}>
            <primitive ref={ref} position={[-0.5, -2.2, 1]} object={townhouse.scene} scale={0.0015}/>
            </mesh>
        )
    }

    return(<mesh
        {...props}
        ref={ref}
        scale={1}>
        </mesh>);
    
}
