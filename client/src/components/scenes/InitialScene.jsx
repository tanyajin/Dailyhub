import { Canvas } from "@react-three/fiber";
import { Scroll, ScrollControls } from "@react-three/drei";
import { motion } from "framer-motion";
import * as THREE from 'three';
import { angleToRadians } from '../../tools/angle'
import { OrbitControls, Environment } from '@react-three/drei';
import {useEffect } from 'react'

import { useNavigate } from 'react-router-dom'
import RoomOverview from './RoomOverview';
import tokenValidate from '../../tools/tokenValidate'


export default function InitialScene() {
  const navigate = useNavigate();

  //验证是否已经登录 
  const checkToken = async () => {
    const isAuthenticated = await tokenValidate.isAuthenticated()
    if (isAuthenticated) {
      navigate('/home')
    }
  }

  useEffect(() => {
    checkToken();
  }, [navigate])

  function handleNavigate() {
    navigate('/login')
  }


  return (
    <>
      <Canvas shadows >
        <ScrollControls pages={1} damping={0.1}>
          <Scroll>
         
            <OrbitControls enableZoom={false} minPolarAngle={angleToRadians(60)} maxPolarAngle={angleToRadians(60)} />

            <ambientLight args={['#ffffff', 0.25]} />
            <spotLight args={['#ffffff', 1.5, 7, angleToRadians(45), 0.4]} position={[-1, 1, 0]} castShadow />
            <directionalLight args={['#ffffff', 0.5]} position={[-1, 3, 0]} />

            <RoomOverview />

            <Environment background>
              <mesh scale={100}>
                <sphereGeometry args={[1, 1, 1]} />
                <meshBasicMaterial color='#b98b93' side={THREE.BackSide} />

              </mesh>
            </Environment>


          </Scroll>
         
          <Scroll html>
            <motion.section
              className={`h-screen w-screen p-8 max-w-screen-2xl mx-auto flex flex-col items-start justify-center`}
              initial={{
                opacity: 0,
                y: 50,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
                transition: {
                  duration: 1,
                  delay: 0.6,
                },
              }}
            >
              <div className="flex flex-col ">
                <h1 className="text-6xl font-extrabold leading-snug">
                  Welcome to
                  <br />
                  <span >Myroom</span>
                </h1>
                <motion.p
                  className="text-lg text-gray-600 mt-4 italic"
                  initial={{
                    opacity: 0,
                    y: 25,
                  }}
                  whileInView={{
                    opacity: 1,
                    y: 0,
                  }}
                  transition={{
                    duration: 1,
                    delay: 1.5,
                  }}
                >
                  A Room of Your Own
                </motion.p>
                <motion.button
                  onClick={handleNavigate}
                  className={`bg-red-200 text-gray-600 py-4 px-8 
      rounded-lg font-bold text-lg mt-16`}
                  initial={{
                    opacity: 0,
                    y: 25,
                  }}
                  whileInView={{
                    opacity: 1,
                    y: 0,
                  }}
                  transition={{
                    duration: 1,
                    delay: 2,
                  }}

                >
                  Enter Myroom
                </motion.button >
              </div >
            </motion.section>

          </Scroll>
        </ScrollControls>

      </Canvas>
    </>
  );
};
