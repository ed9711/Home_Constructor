import React, {Suspense, useEffect, useRef, useState } from 'react'
import { useThree, useFrame } from '@react-three/fiber'
import { useDrag } from "@use-gesture/react";
import LoadHome from './LoadHome';
import LoadLand from './LoadLand';
import LoadLocation from './LoadLocation';

function useEventListener(eventName, handler, element = window) {
    const savedHandler = useRef();

    useEffect(() => {
      savedHandler.current = handler;
    }, [handler]);
  
    useEffect(
      () => {
        // Make sure element supports addEventListener
        const isSupported = element && element.addEventListener;
        if (!isSupported) return;
        // Create event listener that calls handler function stored in ref
        const eventListener = (event) => savedHandler.current(event);
        // Add event listener
        element.addEventListener(eventName, eventListener);
        // Remove event listener on cleanup
        return () => {
          element.removeEventListener(eventName, eventListener);
        };
      },
      [eventName, element]
    );
  }

export default function Model(props) {
    const { camera } = useThree();
    // camera.position.z = 15;

    const keyPressed = {
    };
    const handleKeyDown = (e) => {
        if (!keyPressed[e.key]) {
            keyPressed[e.key] = new Date().getTime();
        }
    };

    const handleKeyUp = (e) => {
        delete keyPressed[e.key];
    };

    const mouseWheel = (e) => {
        let delta = e.wheelDelta;
        delta = delta / 240;
        delta = -delta;
        if (delta <= 0) {
            delta -= camera.position.z * 0.1;
        } else {
            delta += camera.position.z * 0.1;
        }
        if (camera.position.z + delta > 1 && camera.position.z + delta < 200) {
            camera.translateZ(delta);
        }
    };
    useEventListener('keydown', handleKeyDown);
    useEventListener('keyup', handleKeyUp);
    useEventListener('wheel', mouseWheel);
    useFrame((_, delta) => {
        // move camera according to key pressed
        Object.entries(keyPressed).forEach((e) => {
            const [key, start] = e;
            const duration = new Date().getTime() - start;

            // longer press = faster
            let momentum = Math.sqrt(duration + 200) * 0.01 + 0.05;
            momentum = momentum * delta / 0.016;
            momentum = momentum + camera.position.z * 0.02;

            switch (key) {
                case 'w': camera.translateY(momentum); break;
                case 's': camera.translateY(-momentum); break;
                case 'd': camera.translateX(momentum); break;
                case 'a': camera.translateX(-momentum); break;
                default:
            }
        });
    });
    
    
    //drag
    const ref = useRef();
    const { size, viewport } = useThree();
    const aspect = size.width / viewport.width;
    const [position, setPosition] = useState([0, 0, 0]);
    const bind = useDrag(({ offset: [x, y] }) => {
        const [,, z] = position;
        setPosition([x / aspect, -y / aspect, z]);
    }, { pointerEvents: true });

    // rotate
    useFrame((state, delta) => {
        ref.current.rotation.y += 0.01;
    })

    if (props.render.style && props.render.land && props.render.location) {
        return (
            <mesh
            position={position} {...bind()}
            ref={ref}
            >
                <ambientLight />
                <pointLight position={[10, 10, 10]} />
                <Suspense fallback={null}>
                    <LoadHome position={[0, 0, 0]} style={props.render.style} />
                    <LoadLand position={[0, 0, 0]} land={props.render.land} />
                    <LoadLocation position={[0, 0, 0]} location={props.render.location} />
                </Suspense>
            </mesh>
        )
    }
    if (props.render.style && props.render.land) {
        return (
            <mesh
            position={position} {...bind()}
            ref={ref}
            >
                <ambientLight />
                <pointLight position={[10, 10, 10]} />
                <Suspense fallback={null}>
                    <LoadHome position={[0, 0, 0]} style={props.render.style} />
                    <LoadLand position={[0, 0, 0]} land={props.render.land} />
                </Suspense>
            </mesh>
        )
    }
    if (props.render.style) {
        return (
            <mesh
            position={position} {...bind()}
            ref={ref}
            >
                <ambientLight />
                <pointLight position={[10, 10, 10]} />
                <Suspense fallback={null}>
                    <LoadHome position={[0, 0, 0]} style={props.render.style} />
                </Suspense>
                
            </mesh>
        )
    }
    return (
        <mesh
            position={position} {...bind()}
            ref={ref}
            >
            <ambientLight />
            <pointLight position={[10, 10, 10]} />
            <Suspense fallback={null}>
                <LoadHome position={[0, 0, 0]} model={props.render} />
            </Suspense>
        </mesh>
    )
}
