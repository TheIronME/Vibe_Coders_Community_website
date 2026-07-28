import { Particles, ParticlesProvider } from '@tsparticles/react'
import { loadSlim } from '@tsparticles/slim'
import type { Engine } from '@tsparticles/engine'

const initEngine = async (engine: Engine) => {
  await loadSlim(engine)
}

/** 全屏霓虹粒子网络背景，鼠标悬停会推开粒子、点击迸发 */
export default function ParticleField() {
  return (
    <ParticlesProvider init={initEngine}>
      <Particles
        id="vibe-particles"
        className="!fixed inset-0 -z-10"
        options={{
          fullScreen: false,
          fpsLimit: 60,
          detectRetina: true,
          background: { color: { value: 'transparent' } },
          particles: {
            number: { value: 90, density: { enable: true } },
            color: { value: ['#ff2ea6', '#22e6ff', '#ffe24a', '#a855f7'] },
            shape: { type: 'circle' },
            opacity: {
              value: { min: 0.15, max: 0.75 },
              animation: { enable: true, speed: 1, sync: false },
            },
            size: { value: { min: 1, max: 3.2 } },
            links: {
              enable: true,
              distance: 140,
              color: { value: '#8b5cf6' },
              opacity: 0.22,
              width: 1,
            },
            move: {
              enable: true,
              speed: 0.8,
              direction: 'none',
              random: true,
              straight: false,
              outModes: { default: 'out' },
            },
          },
          interactivity: {
            events: {
              onHover: { enable: true, mode: 'repulse' },
              onClick: { enable: true, mode: 'push' },
            },
            modes: {
              repulse: { distance: 130, duration: 0.4 },
              push: { quantity: 4 },
            },
          },
        }}
      />
    </ParticlesProvider>
  )
}
