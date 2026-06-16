'use client';

import { Suspense, useEffect, useRef, useState, type MutableRefObject } from 'react';
import { Canvas, type ThreeEvent, useFrame } from '@react-three/fiber';
import { ContactShadows, Environment, useCursor } from '@react-three/drei';
import * as THREE from 'three';
import Model from '@/app/components/Model';

const SCROLL_START_Y = 0.8;
const SCROLL_END_Y = -0.85;
const SCROLL_START_X = 0.18;
const SCROLL_END_X = 0;
const SCROLL_START_SCALE = 0.2;
const SCROLL_END_SCALE = 0.32;
const SCROLL_START_ROTATION_X = 1.8;
const SCROLL_END_ROTATION_X = 1.8;
const SCROLL_START_ROTATION_Y = 0;
const SCROLL_END_ROTATION_Y = -0;
const SCROLL_START_ROTATION_Z = -0.42;
const SCROLL_END_ROTATION_Z = 0;
const ENABLE_POINTER_INTERACTION = true;
const SHOW_SHAPE_BLUR = true;
const SHAPE_BLUR_FILTER = 'url(#shape-discreet-blur)';
const SCROLL_PROGRESS_DAMPING = 1.75;
const SCROLL_ROTATION_DAMPING = 2.35;
const SCROLL_POSITION_X_DAMPING = 1.95;
const SCROLL_POSITION_Y_DAMPING = 1.8;
const SCROLL_SCALE_DAMPING = 2.6;
const SCROLL_LIGHT_DAMPING = 1.5;
const POINTER_INTERACTION_UNLOCK_PROGRESS = 0.99;

type AnimatedModelProps = {
  isPointerUnlocked: boolean;
  scrollProgressRef: MutableRefObject<number>;
  layoutMetricsRef: MutableRefObject<LayoutMetrics>;
};

type ScrollKeyframe = {
  positionX: number;
  positionY: number;
  scale: number;
  rotationX: number;
  rotationY: number;
  rotationZ: number;
};

type LayoutMetrics = {
  horizontalFactor: number;
  scaleFactor: number;
  verticalFactor: number;
  isMobile: boolean;
};

type ScrollLight = {
  id: string;
  keyframeIndex: number;
  offsetX: number;
  offsetY: number;
  positionZ: number;
  intensity: number;
  color: string;
  distance: number;
};

const DEFAULT_LAYOUT_METRICS: LayoutMetrics = {
  horizontalFactor: 1,
  scaleFactor: 1,
  verticalFactor: 1,
  isMobile: false,
};

const SCROLL_LIGHTS: ScrollLight[] = [
  {
    id: 'kf1-left',
    keyframeIndex: 0,
    offsetX: -2.2,
    offsetY: 1.25,
    positionZ: 2.4,
    intensity: 7,
    color: '#f8fbff',
    distance: 12,
  },
  {
    id: 'kf1-right',
    keyframeIndex: 0,
    offsetX: 2.15,
    offsetY: 1.18,
    positionZ: 2.05,
    intensity: 7,
    color: '#dceeff',
    distance: 11,
  },
  {
    id: 'kf1-top',
    keyframeIndex: 0,
    offsetX: 0.05,
    offsetY: 2.45,
    positionZ: -0.8,
    intensity: 6,
    color: '#9bcfff',
    distance: 10,
  },
  {
    id: 'kf2-left',
    keyframeIndex: 1,
    offsetX: -2.35,
    offsetY: 0.65,
    positionZ: 2.65,
    intensity: 6,
    color: '#f8fbff',
    distance: 10,
  },
  {
    id: 'kf2-right',
    keyframeIndex: 1,
    offsetX: 2.1,
    offsetY: 0.95,
    positionZ: 1.9,
    intensity: 6,
    color: '#a9d5ff',
    distance: 10,
  },
  {
    id: 'kf2-top',
    keyframeIndex: 1,
    offsetX: -0.05,
    offsetY: 2.1,
    positionZ: -0.9,
    intensity: 5,
    color: '#74b4ff',
    distance: 10,
  },
  {
    id: 'kf3-left',
    keyframeIndex: 2,
    offsetX: -2.1,
    offsetY: 0.95,
    positionZ: 2.3,
    intensity: 6,
    color: '#eef7ff',
    distance: 11,
  },
  {
    id: 'kf3-right',
    keyframeIndex: 2,
    offsetX: 2.25,
    offsetY: 1.08,
    positionZ: 1.7,
    intensity: 7,
    color: '#97c8ff',
    distance: 11,
  },
  {
    id: 'kf3-top',
    keyframeIndex: 2,
    offsetX: 0,
    offsetY: 2.55,
    positionZ: -1.05,
    intensity: 8,
    color: '#6faeff',
    distance: 10,
  },
  {
    id: 'kf4-left',
    keyframeIndex: 3,
    offsetX: -2.2,
    offsetY: 0.25,
    positionZ: 2.8,
    intensity: 6,
    color: '#f2f8ff',
    distance: 10,
  },
  {
    id: 'kf4-right',
    keyframeIndex: 3,
    offsetX: 1.95,
    offsetY: 0.58,
    positionZ: 2.2,
    intensity: 6,
    color: '#9ecbff',
    distance: 10,
  },
  {
    id: 'kf4-bottom',
    keyframeIndex: 3,
    offsetX: -0.1,
    offsetY: -2.05,
    positionZ: 3.2,
    intensity: 5,
    color: '#d8ebff',
    distance: 10,
  },
  {
    id: 'kf5-left',
    keyframeIndex: 4,
    offsetX: -1.95,
    offsetY: 0.4,
    positionZ: 2.85,
    intensity: 6,
    color: '#f8fbff',
    distance: 10,
  },
  {
    id: 'kf5-right',
    keyframeIndex: 4,
    offsetX: 1.9,
    offsetY: 0.18,
    positionZ: 3.1,
    intensity: 7,
    color: '#ffffff',
    distance: 10,
  },
  {
    id: 'kf5-bottom-left',
    keyframeIndex: 4,
    offsetX: -1.25,
    offsetY: -1.25,
    positionZ: 3.65,
    intensity: 5,
    color: '#d5ebff',
    distance: 10,
  },
  {
    id: 'kf5-bottom',
    keyframeIndex: 4,
    offsetX: 0,
    offsetY: -3.6,
    positionZ: 0,
    intensity: 6,
    color: '#d5ebff',
    distance: 10,
  },
  {
    id: 'kf5-bottom-right',
    keyframeIndex: 4,
    offsetX: 1.2,
    offsetY: -1.05,
    positionZ: 3.45,
    intensity: 5,
    color: '#c3e0ff',
    distance: 10,
  },
];

const SCROLL_KEYFRAMES: ScrollKeyframe[] = [
  {
    positionX: SCROLL_START_X,
    positionY: SCROLL_START_Y,
    scale: SCROLL_START_SCALE,
    rotationX: SCROLL_START_ROTATION_X,
    rotationY: SCROLL_START_ROTATION_Y,
    rotationZ: SCROLL_START_ROTATION_Z,
  },
  {
    positionX: -0.4,
    positionY: 0.38,
    scale: 0.124,
    rotationX: 0.8,
    rotationY: -0.54,
    rotationZ: -0.18,
  },
  {
    positionX: 0.5,
    positionY: -0.1,
    scale: 0.134,
    rotationX: 1,
    rotationY: 0.14,
    rotationZ: 0.22,
  },
  {
    positionX: -0.6,
    positionY: -0.55,
    scale: 0.146,
    rotationX: 1.4,
    rotationY: -0.28,
    rotationZ: -0.08,
  },
  {
    positionX: SCROLL_END_X,
    positionY: SCROLL_END_Y,
    scale: SCROLL_END_SCALE,
    rotationX: SCROLL_END_ROTATION_X,
    rotationY: SCROLL_END_ROTATION_Y,
    rotationZ: SCROLL_END_ROTATION_Z,
  },
];

function getScrollState(progress: number): ScrollKeyframe {
  const segmentCount = SCROLL_KEYFRAMES.length - 1;
  const scaledProgress = THREE.MathUtils.clamp(progress, 0, 1) * segmentCount;
  const segmentIndex = Math.min(Math.floor(scaledProgress), segmentCount - 1);
  const currentKeyframe = SCROLL_KEYFRAMES[segmentIndex];
  const nextKeyframe = SCROLL_KEYFRAMES[segmentIndex + 1];
  const localProgress = scaledProgress - segmentIndex;
  const easedProgress = THREE.MathUtils.smootherstep(localProgress, 0, 1);

  return {
    positionX: THREE.MathUtils.lerp(
      currentKeyframe.positionX,
      nextKeyframe.positionX,
      easedProgress,
    ),
    positionY: THREE.MathUtils.lerp(
      currentKeyframe.positionY,
      nextKeyframe.positionY,
      easedProgress,
    ),
    scale: THREE.MathUtils.lerp(currentKeyframe.scale, nextKeyframe.scale, easedProgress),
    rotationX: THREE.MathUtils.lerp(
      currentKeyframe.rotationX,
      nextKeyframe.rotationX,
      easedProgress,
    ),
    rotationY: THREE.MathUtils.lerp(
      currentKeyframe.rotationY,
      nextKeyframe.rotationY,
      easedProgress,
    ),
    rotationZ: THREE.MathUtils.lerp(
      currentKeyframe.rotationZ,
      nextKeyframe.rotationZ,
      easedProgress,
    ),
  };
}

function getScrollLightPosition(
  light: ScrollLight,
  layoutMetrics: LayoutMetrics,
): [number, number, number] {
  const keyframe = SCROLL_KEYFRAMES[Math.min(light.keyframeIndex, SCROLL_KEYFRAMES.length - 1)];
  const horizontalOffset =
    light.offsetX * (layoutMetrics.isMobile ? 0.82 : layoutMetrics.horizontalFactor);
  const verticalOffset =
    light.offsetY * (layoutMetrics.isMobile ? 0.88 : layoutMetrics.verticalFactor);

  return [
    keyframe.positionX * layoutMetrics.horizontalFactor + horizontalOffset,
    keyframe.positionY * layoutMetrics.verticalFactor + verticalOffset,
    light.positionZ,
  ];
}

function AnimatedModel({
  isPointerUnlocked,
  scrollProgressRef,
  layoutMetricsRef,
}: AnimatedModelProps) {
  const groupRef = useRef<THREE.Group>(null);
  const glintLightRef = useRef<THREE.PointLight>(null);
  const materialRef = useRef<THREE.MeshPhysicalMaterial | null>(null);
  const dragStartRef = useRef({ x: 0, y: 0 });
  const dragOffsetStartRef = useRef({ x: 0, y: 0 });
  const dragOffsetRef = useRef({ x: 0, y: 0 });
  const smoothScrollRef = useRef(0);
  const shineRef = useRef(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const interactionsEnabled = ENABLE_POINTER_INTERACTION && isPointerUnlocked;
  const hovered = interactionsEnabled && isHovered;
  const dragging = interactionsEnabled && isDragging;

  useCursor(
    hovered || dragging,
    dragging ? 'grabbing' : 'grab',
    'auto',
  );

  const handlePointerDown = (event: ThreeEvent<PointerEvent>) => {
    if (!interactionsEnabled) {
      return;
    }

    event.stopPropagation();
    setIsDragging(true);
    dragStartRef.current = { x: event.clientX, y: event.clientY };
    dragOffsetStartRef.current = {
      x: dragOffsetRef.current.x,
      y: dragOffsetRef.current.y,
    };

    const target = event.target as EventTarget & {
      setPointerCapture?: (pointerId: number) => void;
    };
    target.setPointerCapture?.(event.pointerId);
  };

  const handlePointerUp = (event: ThreeEvent<PointerEvent>) => {
    if (!interactionsEnabled) {
      return;
    }

    event.stopPropagation();
    setIsDragging(false);

    const target = event.target as EventTarget & {
      releasePointerCapture?: (pointerId: number) => void;
    };
    target.releasePointerCapture?.(event.pointerId);
  };

  const handlePointerOver = (event: ThreeEvent<PointerEvent>) => {
    if (!interactionsEnabled) {
      return;
    }

    event.stopPropagation();
    setIsHovered(true);
  };

  const handlePointerOut = (event: ThreeEvent<PointerEvent>) => {
    if (!interactionsEnabled) {
      return;
    }

    event.stopPropagation();
    setIsHovered(false);
  };

  const handlePointerMove = (event: ThreeEvent<PointerEvent>) => {
    if (!interactionsEnabled) {
      return;
    }

    event.stopPropagation();

    if (!dragging) {
      return;
    }

    const deltaX = event.clientX - dragStartRef.current.x;
    const deltaY = event.clientY - dragStartRef.current.y;

    dragOffsetRef.current.y = dragOffsetStartRef.current.y + deltaX * 0.0125;
    dragOffsetRef.current.x = THREE.MathUtils.clamp(
      dragOffsetStartRef.current.x + deltaY * 0.01,
      -0.9,
      0.9,
    );

    shineRef.current = Math.min(2.2, Math.abs(deltaX) * 0.0035 + Math.abs(deltaY) * 0.0045);
  };

  useFrame((state, delta) => {
    if (!groupRef.current) {
      return;
    }

    smoothScrollRef.current = THREE.MathUtils.damp(
      smoothScrollRef.current,
      scrollProgressRef.current,
      SCROLL_PROGRESS_DAMPING,
      delta,
    );

    const scrollProgress = smoothScrollRef.current;
    const scrollState = getScrollState(scrollProgress);
    const layoutMetrics = layoutMetricsRef.current;
    const hoverY = hovered && !dragging ? state.pointer.x * (layoutMetrics.isMobile ? 0.12 : 0.18) : 0;
    const hoverX = hovered && !dragging ? state.pointer.y * (layoutMetrics.isMobile ? 0.08 : 0.12) : 0;
    const hoverZ = hovered && !dragging ? state.pointer.x * -0.03 : 0;
    const idleLift = 0;
    const basePositionY = scrollState.positionY * layoutMetrics.verticalFactor;
    const basePositionX = scrollState.positionX * layoutMetrics.horizontalFactor;
    const baseScale = scrollState.scale * layoutMetrics.scaleFactor;
    const baseRotationX = scrollState.rotationX;
    const baseRotationY = scrollState.rotationY;
    const baseRotationZ = scrollState.rotationZ;

    if (!dragging) {
      dragOffsetRef.current.x = THREE.MathUtils.damp(dragOffsetRef.current.x, 0, 3, delta);
      dragOffsetRef.current.y = THREE.MathUtils.damp(dragOffsetRef.current.y, 0, 3, delta);
    }

    groupRef.current.rotation.x = THREE.MathUtils.damp(
      groupRef.current.rotation.x,
      baseRotationX + dragOffsetRef.current.x + hoverX,
      dragging ? 10 : SCROLL_ROTATION_DAMPING,
      delta,
    );
    groupRef.current.rotation.y = THREE.MathUtils.damp(
      groupRef.current.rotation.y,
      baseRotationY + dragOffsetRef.current.y + hoverY,
      dragging ? 10 : SCROLL_ROTATION_DAMPING,
      delta,
    );
    groupRef.current.rotation.z = THREE.MathUtils.damp(
      groupRef.current.rotation.z,
      baseRotationZ + hoverZ,
      SCROLL_ROTATION_DAMPING,
      delta,
    );
    groupRef.current.position.x = THREE.MathUtils.damp(
      groupRef.current.position.x,
      basePositionX,
      SCROLL_POSITION_X_DAMPING,
      delta,
    );
    groupRef.current.position.y = THREE.MathUtils.damp(
      groupRef.current.position.y,
      basePositionY + idleLift,
      SCROLL_POSITION_Y_DAMPING,
      delta,
    );
    groupRef.current.scale.setScalar(
      THREE.MathUtils.damp(
        groupRef.current.scale.x,
        baseScale * (dragging ? 1.08 : hovered ? 1.04 : 1),
        SCROLL_SCALE_DAMPING,
        delta,
      ),
    );

    const chrome = materialRef.current;
    if (chrome) {
      const scrollShine = THREE.MathUtils.lerp(0.15, 1.35, scrollProgress);
      const interactionShine = dragging ? 1.3 + shineRef.current : hovered ? 0.75 + shineRef.current * 0.15 : 0;

      chrome.envMapIntensity = THREE.MathUtils.damp(
        chrome.envMapIntensity,
        1.2 + scrollShine * 0.5 + interactionShine * 0.14,
        5,
        delta,
      );
      chrome.roughness = THREE.MathUtils.damp(
        chrome.roughness,
        dragging ? 0.06 : hovered ? 0.085 : THREE.MathUtils.lerp(0.2, 0.09, scrollProgress),
        4.5,
        delta,
      );
      chrome.clearcoat = THREE.MathUtils.damp(
        chrome.clearcoat,
        dragging ? 0.98 : hovered ? 0.94 : THREE.MathUtils.lerp(0.82, 0.96, scrollProgress),
        4.5,
        delta,
      );
      chrome.clearcoatRoughness = THREE.MathUtils.damp(
        chrome.clearcoatRoughness,
        dragging ? 0.065 : hovered ? 0.085 : THREE.MathUtils.lerp(0.16, 0.09, scrollProgress),
        4.5,
        delta,
      );
    }

    if (glintLightRef.current) {
      glintLightRef.current.position.x = THREE.MathUtils.damp(
        glintLightRef.current.position.x,
        hovered || dragging ? state.pointer.x * 2.4 : 0,
        SCROLL_LIGHT_DAMPING,
        delta,
      );
      glintLightRef.current.position.y = THREE.MathUtils.damp(
        glintLightRef.current.position.y,
        ((hovered || dragging) ? state.pointer.y * 1.8 : 0) +
          THREE.MathUtils.lerp(1.9, -0.1, scrollProgress),
        SCROLL_LIGHT_DAMPING,
        delta,
      );
      glintLightRef.current.position.z = THREE.MathUtils.damp(
        glintLightRef.current.position.z,
        2.4,
        SCROLL_LIGHT_DAMPING,
        delta,
      );
      glintLightRef.current.intensity = THREE.MathUtils.damp(
        glintLightRef.current.intensity,
        THREE.MathUtils.lerp(5, 14, scrollProgress) + (dragging ? 8 + shineRef.current * 6 : hovered ? 4 : 0),
        SCROLL_LIGHT_DAMPING,
        delta,
      );
    }

    shineRef.current = THREE.MathUtils.damp(shineRef.current, 0, 4, delta);
  });

  return (
    <>
      <pointLight
        ref={glintLightRef}
        position={[0, 1.1, 2.4]}
        intensity={5}
        distance={10}
        color="#e5f2ff"
      />
      <group
        ref={groupRef}
        position={[0, SCROLL_START_Y, 0]}
        onPointerDown={interactionsEnabled ? handlePointerDown : undefined}
        onPointerUp={interactionsEnabled ? handlePointerUp : undefined}
        onPointerOver={interactionsEnabled ? handlePointerOver : undefined}
        onPointerOut={interactionsEnabled ? handlePointerOut : undefined}
        onPointerMove={interactionsEnabled ? handlePointerMove : undefined}
      >
        <Model materialRef={materialRef} />
      </group>
    </>
  );
}

export default function InteractiveShape() {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollProgressRef = useRef(0);
  const layoutMetricsRef = useRef<LayoutMetrics>(DEFAULT_LAYOUT_METRICS);
  const [layoutMetrics, setLayoutMetrics] = useState(DEFAULT_LAYOUT_METRICS);
  const [isPointerUnlocked, setIsPointerUnlocked] = useState(false);

  useEffect(() => {
    const section = containerRef.current?.closest('section');

    if (!section) {
      return;
    }

    const updateLayoutMetrics = () => {
      const viewportHeight = Math.max(window.innerHeight, 1);
      const viewportWidth = Math.max(window.innerWidth, 1);
      const sectionHeightRatio = section.clientHeight / viewportHeight;
      const widthRatio = viewportWidth / 1440;
      const isMobile = viewportWidth < 768;
      const nextLayoutMetrics = {
        horizontalFactor: isMobile
          ? THREE.MathUtils.clamp(viewportWidth / 430, 0.7, 0.88)
          : THREE.MathUtils.clamp(widthRatio, 0.94, 1.05),
        scaleFactor: isMobile
          ? THREE.MathUtils.clamp((viewportWidth / 430) * 0.92, 0.66, 0.84)
          : THREE.MathUtils.clamp(sectionHeightRatio * 0.94, 0.96, 1.06),
        verticalFactor: isMobile
          ? THREE.MathUtils.clamp(sectionHeightRatio * 1.08, 1, 1.42)
          : THREE.MathUtils.clamp(sectionHeightRatio, 0.98, 1.24),
        isMobile,
      };

      layoutMetricsRef.current = nextLayoutMetrics;
      setLayoutMetrics((currentLayoutMetrics) => {
        if (
          currentLayoutMetrics.horizontalFactor === nextLayoutMetrics.horizontalFactor &&
          currentLayoutMetrics.scaleFactor === nextLayoutMetrics.scaleFactor &&
          currentLayoutMetrics.verticalFactor === nextLayoutMetrics.verticalFactor &&
          currentLayoutMetrics.isMobile === nextLayoutMetrics.isMobile
        ) {
          return currentLayoutMetrics;
        }

        return nextLayoutMetrics;
      });
    };

    const updateScrollProgress = () => {
      const rect = section.getBoundingClientRect();
      const scrollRange = Math.max(section.clientHeight - window.innerHeight, 1);

      const nextScrollProgress = THREE.MathUtils.clamp(-rect.top / scrollRange, 0, 1);

      scrollProgressRef.current = nextScrollProgress;
      setIsPointerUnlocked(nextScrollProgress >= POINTER_INTERACTION_UNLOCK_PROGRESS);
    };

    updateLayoutMetrics();
    updateScrollProgress();
    window.addEventListener('scroll', updateScrollProgress, { passive: true });
    window.addEventListener('resize', updateLayoutMetrics);
    window.addEventListener('resize', updateScrollProgress);

    return () => {
      window.removeEventListener('scroll', updateScrollProgress);
      window.removeEventListener('resize', updateLayoutMetrics);
      window.removeEventListener('resize', updateScrollProgress);
    };
  }, []);

  return (
    <div ref={containerRef} className="absolute inset-0 z-10 touch-none">
      {SHOW_SHAPE_BLUR ? (
        <svg aria-hidden="true" className="pointer-events-none absolute h-0 w-0 overflow-hidden">
          <defs>
            <filter
              id="shape-discreet-blur"
              x="-25%"
              y="-25%"
              width="150%"
              height="150%"
              colorInterpolationFilters="sRGB"
            >
              <feGaussianBlur
                in="SourceGraphic"
                stdDeviation="1.1"
                edgeMode="duplicate"
                result="gaussianBlur"
              />
              <feColorMatrix
                in="gaussianBlur"
                type="matrix"
                values="1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 0.74 0"
                result="premultipliedGaussianBlur"
              />
              <feBlend in="SourceGraphic" in2="premultipliedGaussianBlur" mode="normal" />
            </filter>
          </defs>
        </svg>
      ) : null}
      <Canvas
        camera={{ position: [0, 0, 4.5], fov: 32 }}
        dpr={[1, 1.2]}
        gl={{ alpha: true, antialias: false, powerPreference: 'high-performance' }}
        className="h-full w-full"
        style={SHOW_SHAPE_BLUR ? { filter: SHAPE_BLUR_FILTER } : undefined}
      >
        <ambientLight intensity={0.1} />
        <hemisphereLight intensity={0.42} color="#eff7ff" groundColor="#091119" />
        <directionalLight position={[3.6, 2.8, 4.2]} intensity={2.2} color="#ffffff" />
        <directionalLight position={[-2.8, -1.1, 2.6]} intensity={0.4} color="#ffd3b1" />
        <directionalLight position={[0.2, 3.8, -2.8]} intensity={2.1} color="#a7d3ff" />
        {SCROLL_LIGHTS.map((light) => (
          <pointLight
            key={light.id}
            position={getScrollLightPosition(light, layoutMetrics)}
            intensity={light.intensity}
            color={light.color}
            distance={light.distance}
          />
        ))}
        <Suspense fallback={null}>
          <Environment files="/BG_CHROME_METAL.exr" environmentIntensity={1.55} />
          <AnimatedModel
            isPointerUnlocked={isPointerUnlocked}
            scrollProgressRef={scrollProgressRef}
            layoutMetricsRef={layoutMetricsRef}
          />
          <ContactShadows
            position={[0, -1.45, 0]}
            opacity={0.28}
            scale={6}
            blur={2.6}
            far={3.2}
            color="#050505"
          />
        </Suspense>
      </Canvas>
    </div>
  );
}
