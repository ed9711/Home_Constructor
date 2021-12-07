import React, {useRef,Suspense} from 'react'
import { Canvas } from '@react-three/fiber'
import LoadHome from './LoadHome';
import LoadLand from './LoadLand';
import LoadLocation from './LoadLocation';

export default function Model(props) {
    console.log(props);
    const ref = useRef();
    if (props.render.style && props.render.land && props.render.location) {
        return (
            <Canvas>
                <ambientLight />
                <pointLight position={[10, 10, 10]} />
                <Suspense fallback={null}>
                    <LoadHome position={[0, 0, 0]} style={props.render.style} />
                    <LoadLand position={[0, 0, 0]} land={props.render.land} />
                    <LoadLocation position={[0, 0, 0]} location={props.render.location} />
                </Suspense>
            </Canvas>
        )
    }
    if (props.render.style && props.render.land) {
        return (
            <Canvas>
                <ambientLight />
                <pointLight position={[10, 10, 10]} />
                <Suspense fallback={null}>
                    <LoadHome position={[0, 0, 0]} style={props.render.style} />
                    <LoadLand position={[0, 0, 0]} land={props.render.land} />
                </Suspense>
            </Canvas>
        )
    }
    if (props.render.style) {
        return (
            <Canvas>
                <ambientLight />
                <pointLight position={[10, 10, 10]} />
                <Suspense fallback={null}>
                    <LoadHome position={[0, 0, 0]} style={props.render.style} />
                </Suspense>
                
            </Canvas>
        )
    }
    return (
        <Canvas>
            <ambientLight />
            <pointLight position={[10, 10, 10]} />
            <Suspense fallback={null}>
                <LoadHome position={[0, 0, 0]} model={props.render} />
            </Suspense>
        </Canvas>
    )
}
