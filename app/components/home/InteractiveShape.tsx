'use client';

import { Suspense, useEffect, useRef, useState, type MutableRefObject } from 'react';
import { Canvas, type ThreeEvent, useFrame } from '@react-three/fiber';
import { ContactShadows, Environment, useCursor } from '@react-three/drei';
import * as THREE from 'three';
import Model from '@/app/components/home/Model';

const SCROLL_START_Y = 0.8;
const SCROLL_END_Y = -0.85;
const SCROLL_START_X = -0.18;
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
const SCROLL_LIGHT_DAMPING = 2.75;

type AnimatedModelProps = {
  scrollProgressRef: MutableRefObject<number>;
  layoutMetricsRef: MutableRefObject<LayoutMetrics>;
  layoutMetrics: LayoutMetrics;
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
  allowPointerInteraction: boolean;
  cameraDistance: number;
  cameraFov: number;
  shadowPositionY: number;
  shadowScale: number;
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
  allowPointerInteraction: false,
  cameraDistance: 4.5,
  cameraFov: 32,
  shadowPositionY: -1.45,
  shadowScale: 6,
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
    positionX: 0.4,
    positionY: 0.38,
    scale: 0.124,
    rotationX: 0.8,
    rotationY: -0.54,
    rotationZ: -0.18,
  },
  {
    positionX: -0.5,
    positionY: -0.1,
    scale: 0.134,
    rotationX: 1,
    rotationY: 0.14,
    rotationZ: 0.22,
  },
  {
    positionX: 0.4,
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

const SCROLL_KEYFRAMES_MOBILE: ScrollKeyframe[] = [
  {
    positionX: 0,

    positionY: 1.2,

    scale: 0.28,

    rotationX: 1.8,

    rotationY: 0,

    rotationZ: -0.35,
  },

  {
    positionX: 0.15,

    positionY: 0.2,

    scale: 0.12,

    rotationX: 0.8,

    rotationY: -0.4,

    rotationZ: -0.15,
  },

  {
    positionX: -0.15,

    positionY: -0.1,

    scale: 0.13,

    rotationX: 1,

    rotationY: 0.1,

    rotationZ: 0.2,
  },

  {
    positionX: 0.15,

    positionY: -0.65,

    scale: 0.14,

    rotationX: 1.4,

    rotationY: -0.2,

    rotationZ: -0.08,
  },

  {
    positionX: 0,

    positionY: -1.4,

    scale: 0.24,

    rotationX: 1.8,

    rotationY: 0,

    rotationZ: 0,
  },
];

function getScrollState(
  progress: number,

  isMobile: boolean,
): ScrollKeyframe {
  const keyframes = isMobile ? SCROLL_KEYFRAMES_MOBILE : SCROLL_KEYFRAMES;

  const segmentCount = keyframes.length - 1;

  const scaledProgress = THREE.MathUtils.clamp(progress, 0, 1) * segmentCount;

  const segmentIndex = Math.min(
    Math.floor(scaledProgress),

    segmentCount - 1,
  );

  const currentKeyframe = keyframes[segmentIndex];

  const nextKeyframe = keyframes[segmentIndex + 1];

  const localProgress = scaledProgress - segmentIndex;

  const easedProgress = THREE.MathUtils.smootherstep(
    localProgress,

    0,

    1,
  );

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

    scale: THREE.MathUtils.lerp(
      currentKeyframe.scale,

      nextKeyframe.scale,

      easedProgress,
    ),

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
    light.offsetX * (layoutMetrics.isMobile ? 0.9 : layoutMetrics.horizontalFactor);
  const verticalOffset =
    light.offsetY * (layoutMetrics.isMobile ? 0.94 : layoutMetrics.verticalFactor);

  return [
    keyframe.positionX * layoutMetrics.horizontalFactor + horizontalOffset,
    keyframe.positionY * layoutMetrics.verticalFactor + verticalOffset,
    light.positionZ,
  ];
}

function AnimatedModel({ scrollProgressRef, layoutMetricsRef, layoutMetrics }: AnimatedModelProps) {
  const groupRef = useRef<THREE.Group>(null);
  const glintLightRef = useRef<THREE.PointLight>(null);
  const materialRef = useRef<THREE.MeshPhysicalMaterial | null>(null);
  const dragStartRef = useRef({ x: 0, y: 0 });
  const dragOffsetStartRef = useRef({ x: 0, y: 0, z: 0 });
  const dragOffsetRef = useRef({ x: 0, y: 0, z: 0 });
  const smoothScrollRef = useRef(0);
  const shineRef = useRef(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const interactionsEnabled = layoutMetrics.allowPointerInteraction;

  useCursor(
    interactionsEnabled && (isHovered || isDragging),
    isDragging ? 'grabbing' : 'grab',
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
      z: dragOffsetRef.current.z,
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

    if (!isDragging) {
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
    const scrollState = getScrollState(
      scrollProgress,

      layoutMetricsRef.current.isMobile,
    );
    const layoutMetrics = layoutMetricsRef.current;
    const hoverY =
      interactionsEnabled && isHovered
        ? state.pointer.x * (layoutMetrics.isMobile ? 0.12 : 0.18)
        : 0;
    const hoverX =
      interactionsEnabled && isHovered
        ? state.pointer.y * (layoutMetrics.isMobile ? 0.08 : 0.12)
        : 0;
    const hoverZ = interactionsEnabled && isHovered ? state.pointer.x * -0.03 : 0;
    const idleLift = 0;
    const basePositionY = scrollState.positionY * layoutMetrics.verticalFactor;
    const basePositionX = scrollState.positionX * layoutMetrics.horizontalFactor;
    const baseScale = scrollState.scale * layoutMetrics.scaleFactor;
    const baseRotationX = scrollState.rotationX;
    const baseRotationY = scrollState.rotationY;
    const baseRotationZ = scrollState.rotationZ;

    if (!interactionsEnabled || !isDragging) {
      dragOffsetRef.current.x = THREE.MathUtils.damp(dragOffsetRef.current.x, 0, 3, delta);
      dragOffsetRef.current.y = THREE.MathUtils.damp(dragOffsetRef.current.y, 0, 3, delta);
      dragOffsetRef.current.z = THREE.MathUtils.damp(dragOffsetRef.current.z, 0, 3, delta);
    }

    groupRef.current.rotation.x = THREE.MathUtils.damp(
      groupRef.current.rotation.x,
      baseRotationX + dragOffsetRef.current.x + hoverX,
      isDragging ? 10 : SCROLL_ROTATION_DAMPING,
      delta,
    );
    groupRef.current.rotation.y = THREE.MathUtils.damp(
      groupRef.current.rotation.y,
      baseRotationY + dragOffsetRef.current.y + hoverY,
      isDragging ? 10 : SCROLL_ROTATION_DAMPING,
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
        baseScale * (interactionsEnabled ? (isDragging ? 1.08 : isHovered ? 1.04 : 1) : 1),
        SCROLL_SCALE_DAMPING,
        delta,
      ),
    );

    const chrome = materialRef.current;
    if (chrome) {
      const scrollShine = THREE.MathUtils.lerp(0.15, 1.35, scrollProgress);
      const interactionShine = interactionsEnabled
        ? isDragging
          ? 1.3 + shineRef.current
          : isHovered
            ? 0.75 + shineRef.current * 0.15
            : 0
        : 0;

      chrome.envMapIntensity = THREE.MathUtils.damp(
        chrome.envMapIntensity,
        1.2 + scrollShine * 0.5 + interactionShine * 0.14,
        5,
        delta,
      );
      chrome.roughness = THREE.MathUtils.damp(
        chrome.roughness,
        isDragging ? 0.06 : isHovered ? 0.085 : THREE.MathUtils.lerp(0.2, 0.09, scrollProgress),
        4.5,
        delta,
      );
      chrome.clearcoat = THREE.MathUtils.damp(
        chrome.clearcoat,
        isDragging ? 0.98 : isHovered ? 0.94 : THREE.MathUtils.lerp(0.82, 0.96, scrollProgress),
        4.5,
        delta,
      );
      chrome.clearcoatRoughness = THREE.MathUtils.damp(
        chrome.clearcoatRoughness,
        isDragging ? 0.065 : isHovered ? 0.085 : THREE.MathUtils.lerp(0.16, 0.09, scrollProgress),
        4.5,
        delta,
      );
    }

    if (glintLightRef.current) {
      glintLightRef.current.position.x = THREE.MathUtils.damp(
        glintLightRef.current.position.x,
        interactionsEnabled ? state.pointer.x * 2.4 : 0,
        SCROLL_LIGHT_DAMPING,
        delta,
      );
      glintLightRef.current.position.y = THREE.MathUtils.damp(
        glintLightRef.current.position.y,
        (interactionsEnabled ? state.pointer.y * 1.8 : 0) +
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
        THREE.MathUtils.lerp(5, 14, scrollProgress) +
          (interactionsEnabled ? (isDragging ? 8 + shineRef.current * 6 : isHovered ? 4 : 0) : 0),
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
      const mobileWidthRatio = viewportWidth / 430;
      const isMobile = viewportWidth < 768;
      const allowPointerInteraction =
        ENABLE_POINTER_INTERACTION && window.matchMedia('(pointer: fine)').matches;
      const nextLayoutMetrics: LayoutMetrics = {
        horizontalFactor: isMobile
          ? THREE.MathUtils.clamp(mobileWidthRatio * 1.02, 0.84, 0.96)
          : THREE.MathUtils.clamp(widthRatio, 0.94, 1.05),
        scaleFactor: isMobile
          ? THREE.MathUtils.clamp(mobileWidthRatio * 1.08, 0.82, 0.98)
          : THREE.MathUtils.clamp(sectionHeightRatio * 0.94, 0.96, 1.06),
        verticalFactor: isMobile
          ? THREE.MathUtils.clamp(sectionHeightRatio, 0.96, 1.12)
          : THREE.MathUtils.clamp(sectionHeightRatio, 0.98, 1.24),
        isMobile,
        allowPointerInteraction,
        cameraDistance: isMobile ? 5.25 : 4.5,
        cameraFov: isMobile ? 40 : 32,
        shadowPositionY: isMobile ? -1.55 : -1.45,
        shadowScale: isMobile ? 5.2 : 6,
      };

      layoutMetricsRef.current = nextLayoutMetrics;
      setLayoutMetrics((currentLayoutMetrics) => {
        if (
          currentLayoutMetrics.horizontalFactor === nextLayoutMetrics.horizontalFactor &&
          currentLayoutMetrics.scaleFactor === nextLayoutMetrics.scaleFactor &&
          currentLayoutMetrics.verticalFactor === nextLayoutMetrics.verticalFactor &&
          currentLayoutMetrics.isMobile === nextLayoutMetrics.isMobile &&
          currentLayoutMetrics.allowPointerInteraction ===
            nextLayoutMetrics.allowPointerInteraction &&
          currentLayoutMetrics.cameraDistance === nextLayoutMetrics.cameraDistance &&
          currentLayoutMetrics.cameraFov === nextLayoutMetrics.cameraFov &&
          currentLayoutMetrics.shadowPositionY === nextLayoutMetrics.shadowPositionY &&
          currentLayoutMetrics.shadowScale === nextLayoutMetrics.shadowScale
        ) {
          return currentLayoutMetrics;
        }

        return nextLayoutMetrics;
      });
    };

    const updateScrollProgress = () => {
      const rect = section.getBoundingClientRect();
      const scrollRange = Math.max(section.clientHeight - window.innerHeight, 1);

      scrollProgressRef.current = THREE.MathUtils.clamp(-rect.top / scrollRange, 0, 1);
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
    <div
      ref={containerRef}
      className={`absolute inset-0 z-0 ${layoutMetrics.allowPointerInteraction ? '' : 'pointer-events-none'}`}
      style={{ touchAction: layoutMetrics.allowPointerInteraction ? 'none' : 'pan-y' }}
    >
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
        camera={{ position: [0, 0, layoutMetrics.cameraDistance], fov: layoutMetrics.cameraFov }}
        dpr={layoutMetrics.isMobile ? [1, 1.05] : [1, 1.2]}
        gl={{ alpha: true, antialias: false, powerPreference: 'high-performance' }}
        className="absolute w-full h-full z-10"
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
          <Environment files="/CHROME_BG.exr" environmentIntensity={1.55} />
          <AnimatedModel
            scrollProgressRef={scrollProgressRef}
            layoutMetricsRef={layoutMetricsRef}
            layoutMetrics={layoutMetrics}
          />
          <ContactShadows
            position={[0, layoutMetrics.shadowPositionY, 0]}
            opacity={layoutMetrics.isMobile ? 0.22 : 0.28}
            scale={layoutMetrics.shadowScale}
            blur={layoutMetrics.isMobile ? 2.2 : 2.6}
            far={layoutMetrics.isMobile ? 3 : 3.2}
            color="#050505"
          />
        </Suspense>
      </Canvas>
    </div>
  );
}
