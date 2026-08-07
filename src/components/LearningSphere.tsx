import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function LearningSphere() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(42, 1, 0.1, 100);
    camera.position.set(0, 0, 7.2);

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    mount.appendChild(renderer.domElement);

    const group = new THREE.Group();
    group.rotation.set(-0.15, -0.25, 0.08);
    scene.add(group);

    // An open book forms the centre of the scene, with each page angled toward the spine.
    const book = new THREE.Group();
    book.rotation.set(-0.32, 0.08, 0);
    group.add(book);

    const coverMaterial = new THREE.MeshBasicMaterial({ color: 0x2563eb });
    const pageMaterial = new THREE.MeshBasicMaterial({ color: 0xe0f2fe });
    [-1, 1].forEach((side) => {
      const cover = new THREE.Mesh(new THREE.BoxGeometry(1.42, 1.78, 0.11), coverMaterial.clone());
      cover.position.set(side * 0.7, 0, 0);
      cover.rotation.z = side * -0.18;
      book.add(cover);

      const pages = new THREE.Mesh(new THREE.BoxGeometry(1.3, 1.64, 0.08), pageMaterial.clone());
      pages.position.set(side * 0.65, 0.03, 0.1);
      pages.rotation.z = side * -0.18;
      book.add(pages);

      for (let lineIndex = 0; lineIndex < 5; lineIndex += 1) {
        const y = 0.52 - lineIndex * 0.25;
        const line = new THREE.Line(
          new THREE.BufferGeometry().setFromPoints([
            new THREE.Vector3(side * 0.22, y, 0.16),
            new THREE.Vector3(side * 1.06, y + side * -0.14, 0.16),
          ]),
          new THREE.LineBasicMaterial({ color: lineIndex === 0 ? 0xf97316 : 0x60a5fa, transparent: true, opacity: 0.75 }),
        );
        book.add(line);
      }
    });

    // A graduation cap floats above the book to make the education theme unmistakable.
    const cap = new THREE.Group();
    cap.position.set(0.15, 1.86, 0.15);
    cap.rotation.z = -0.08;
    const capTop = new THREE.Mesh(new THREE.BoxGeometry(1.35, 0.1, 0.95), new THREE.MeshBasicMaterial({ color: 0xfb923c }));
    const capBase = new THREE.Mesh(new THREE.CylinderGeometry(0.42, 0.58, 0.48, 4), new THREE.MeshBasicMaterial({ color: 0x1d4ed8 }));
    capBase.position.y = -0.25;
    cap.add(capTop, capBase);
    const tassel = new THREE.Line(
      new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(0.62, 0, 0.15), new THREE.Vector3(0.78, -0.62, 0.15)]),
      new THREE.LineBasicMaterial({ color: 0xfbbf24 }),
    );
    cap.add(tassel);
    group.add(cap);

    const glow = new THREE.Mesh(
      new THREE.SphereGeometry(1.85, 40, 40),
      new THREE.MeshBasicMaterial({ color: 0x123b77, transparent: true, opacity: 0.18 }),
    );
    glow.position.z = -0.7;
    group.add(glow);

    const rings: THREE.Line[] = [];
    [[2.1, 0.8, 0.1], [2.35, -0.65, 1.25], [2.02, 1.45, -0.55]].forEach(([radius, x, y], index) => {
      const curve = new THREE.EllipseCurve(0, 0, radius, radius * 0.48, 0, Math.PI * 2);
      const points = curve.getPoints(120).map((point) => new THREE.Vector3(point.x, point.y, 0));
      const line = new THREE.Line(
        new THREE.BufferGeometry().setFromPoints(points),
        new THREE.LineBasicMaterial({ color: index === 1 ? 0xfb923c : 0x93c5fd, transparent: true, opacity: 0.46 }),
      );
      line.rotation.set(x, y, index * 0.7);
      rings.push(line);
      group.add(line);
    });

    const nodeGeometry = new THREE.SphereGeometry(0.075, 16, 16);
    const nodes = [
      [-1.45, 1.05, 0.65], [1.5, 0.85, -0.35], [-1.65, -0.72, -0.2],
      [1.25, -1.2, 0.7], [0.25, 1.7, -0.4], [0.3, -1.65, -0.65],
    ];
    nodes.forEach((position, index) => {
      const node = new THREE.Mesh(
        nodeGeometry,
        new THREE.MeshBasicMaterial({ color: index % 3 === 0 ? 0xfb923c : 0xbfdbfe }),
      );
      node.position.fromArray(position);
      group.add(node);
    });

    const particleCount = 260;
    const particlePositions = new Float32Array(particleCount * 3);
    for (let index = 0; index < particleCount; index += 1) {
      const radius = 2.5 + Math.random() * 2.6;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      particlePositions[index * 3] = radius * Math.sin(phi) * Math.cos(theta);
      particlePositions[index * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      particlePositions[index * 3 + 2] = radius * Math.cos(phi);
    }
    const particlesGeometry = new THREE.BufferGeometry();
    particlesGeometry.setAttribute("position", new THREE.BufferAttribute(particlePositions, 3));
    const particles = new THREE.Points(
      particlesGeometry,
      new THREE.PointsMaterial({ color: 0x93c5fd, size: 0.025, transparent: true, opacity: 0.6 }),
    );
    scene.add(particles);

    const pointer = { x: 0, y: 0 };
    const onPointerMove = (event: PointerEvent) => {
      const bounds = mount.getBoundingClientRect();
      pointer.x = ((event.clientX - bounds.left) / bounds.width - 0.5) * 0.55;
      pointer.y = ((event.clientY - bounds.top) / bounds.height - 0.5) * 0.4;
    };
    mount.addEventListener("pointermove", onPointerMove);

    const resize = () => {
      const width = mount.clientWidth;
      const height = mount.clientHeight;
      renderer.setSize(width, height, false);
      camera.aspect = width / Math.max(height, 1);
      camera.updateProjectionMatrix();
    };
    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(mount);
    resize();

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let frame = 0;
    const render = (time = 0) => {
      group.rotation.y += (pointer.x - group.rotation.y) * 0.025;
      group.rotation.x += (-pointer.y - group.rotation.x) * 0.025;
      if (!reducedMotion) {
        group.rotation.y += 0.0015;
        book.position.y = Math.sin(time * 0.0012) * 0.07 - 0.2;
        cap.position.y = 1.86 + Math.sin(time * 0.0012 + 0.8) * 0.09;
        rings.forEach((ring, index) => { ring.rotation.z = time * 0.00008 * (index % 2 ? -1 : 1) + index; });
        particles.rotation.y = time * 0.000025;
      }
      renderer.render(scene, camera);
      frame = window.requestAnimationFrame(render);
    };
    frame = window.requestAnimationFrame(render);

    return () => {
      window.cancelAnimationFrame(frame);
      resizeObserver.disconnect();
      mount.removeEventListener("pointermove", onPointerMove);
      mount.removeChild(renderer.domElement);
      scene.traverse((object) => {
        if (object instanceof THREE.Mesh || object instanceof THREE.Line || object instanceof THREE.Points) {
          object.geometry.dispose();
          const materials = Array.isArray(object.material) ? object.material : [object.material];
          materials.forEach((material) => material.dispose());
        }
      });
      renderer.dispose();
    };
  }, []);

  return (
    <div className="relative h-full min-h-[430px] w-full" aria-hidden="true">
      <div ref={mountRef} className="absolute inset-0 cursor-crosshair" />
      <div className="pointer-events-none absolute left-[5%] top-[18%] rounded-2xl border border-white/10 bg-slate-950/55 px-4 py-3 shadow-2xl backdrop-blur-xl">
        <p className="font-mono text-[10px] uppercase tracking-[.2em] text-blue-300">Learn • Practise • Grow</p>
        <p className="mt-1 text-xl font-black text-white">Ideas into skills <span className="text-orange-400">↗</span></p>
      </div>
      <div className="pointer-events-none absolute bottom-[14%] right-[2%] rounded-2xl border border-white/10 bg-slate-950/55 px-4 py-3 shadow-2xl backdrop-blur-xl">
        <p className="font-mono text-xs text-slate-300"><span className="text-orange-400">const</span> future =</p>
        <p className="mt-1 font-mono text-sm font-bold text-blue-200">buildSkills();</p>
      </div>
    </div>
  );
}
