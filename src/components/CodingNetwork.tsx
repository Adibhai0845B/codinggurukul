import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function CodingNetwork() {
  const hostRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(48, 1, 0.1, 100);
    camera.position.z = 8;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.setClearColor(0x000000, 0);
    host.appendChild(renderer.domElement);

    const group = new THREE.Group();
    scene.add(group);

    const points = Array.from({ length: 34 }, (_, index) => {
      const angle = index * 2.399;
      const radius = 1.25 + (index % 8) * 0.24;
      return new THREE.Vector3(
        Math.cos(angle) * radius,
        Math.sin(angle) * radius * 0.7,
        ((index % 7) - 3) * 0.28,
      );
    });

    const pointGeometry = new THREE.BufferGeometry().setFromPoints(points);
    const pointMaterial = new THREE.PointsMaterial({ color: 0x60a5fa, size: 0.085, transparent: true, opacity: 0.8 });
    group.add(new THREE.Points(pointGeometry, pointMaterial));

    const linePositions: number[] = [];
    points.forEach((point, index) => {
      for (let next = index + 1; next < points.length; next += 1) {
        if (point.distanceTo(points[next]) < 1.45) {
          linePositions.push(point.x, point.y, point.z, points[next].x, points[next].y, points[next].z);
        }
      }
    });
    const lineGeometry = new THREE.BufferGeometry();
    lineGeometry.setAttribute("position", new THREE.Float32BufferAttribute(linePositions, 3));
    const lineMaterial = new THREE.LineBasicMaterial({ color: 0x2563eb, transparent: true, opacity: 0.2 });
    group.add(new THREE.LineSegments(lineGeometry, lineMaterial));

    const ring = new THREE.Mesh(
      new THREE.TorusGeometry(2.65, 0.018, 8, 100),
      new THREE.MeshBasicMaterial({ color: 0xf97316, transparent: true, opacity: 0.35 }),
    );
    ring.rotation.x = 1.05;
    group.add(ring);

    const resize = () => {
      const width = host.clientWidth;
      const height = host.clientHeight;
      renderer.setSize(width, height, false);
      camera.aspect = width / Math.max(height, 1);
      camera.updateProjectionMatrix();
    };
    const observer = new ResizeObserver(resize);
    observer.observe(host);
    resize();

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let frame = 0;
    const render = (time = 0) => {
      if (!reduceMotion) {
        group.rotation.y = time * 0.00008;
        group.rotation.x = Math.sin(time * 0.00018) * 0.08;
      }
      renderer.render(scene, camera);
      if (!reduceMotion) frame = window.requestAnimationFrame(render);
    };
    render();

    return () => {
      observer.disconnect();
      if (frame) window.cancelAnimationFrame(frame);
      pointGeometry.dispose();
      pointMaterial.dispose();
      lineGeometry.dispose();
      lineMaterial.dispose();
      ring.geometry.dispose();
      (ring.material as THREE.Material).dispose();
      renderer.dispose();
      renderer.domElement.remove();
    };
  }, []);

  return <div ref={hostRef} className="pointer-events-none absolute inset-y-0 right-0 w-full opacity-55 lg:w-[58%]" aria-hidden="true" />;
}
