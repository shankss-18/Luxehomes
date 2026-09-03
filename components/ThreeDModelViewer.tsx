"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

interface RoomTarget {
  name: string;
  dim?: string;
  target: [number, number, number];
  cameraPos: [number, number, number];
}

interface ThreeDModelViewerProps {
  bhk: number | null;
  projectName: string;
  tower: string;
  unitNumber: string;
  facing: string;
  carpetArea: number;
}

export default function ThreeDModelViewer({
  bhk = 3,
  projectName,
  tower,
  unitNumber,
  facing,
  carpetArea,
}: ThreeDModelViewerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const controlsRef = useRef<OrbitControls | null>(null);
  const animFrameIdRef = useRef<number | null>(null);

  // Lighting references for Day/Evening toggle
  const sunLightRef = useRef<THREE.DirectionalLight | null>(null);
  const hemiLightRef = useRef<THREE.HemisphereLight | null>(null);
  const interiorLightsRef = useRef<THREE.PointLight[]>([]);

  // State
  const [isAutoRotating, setIsAutoRotating] = useState(false);
  const [lightingMode, setLightingMode] = useState<"day" | "evening">("day");
  const [activeRoom, setActiveRoom] = useState<string | null>(null);
  const [cameraView, setCameraView] = useState<"iso" | "top" | "front">("iso");
  const [loading, setLoading] = useState(true);

  // Smooth camera transitions
  const cameraTargetRef = useRef<{
    pos: THREE.Vector3;
    lookAt: THREE.Vector3;
    inProgress: boolean;
  }>({
    pos: new THREE.Vector3(20, 22, 22),
    lookAt: new THREE.Vector3(0, 0.8, 0),
    inProgress: false,
  });

  const numBhk = bhk || 3;

  // Key room targets matching reference layout
  const roomTargets: RoomTarget[] = [
    {
      name: "Living & Dining Salon",
      dim: "24'0\" x 16'0\"",
      target: [5.5, 0.8, 2.2] as [number, number, number],
      cameraPos: [13, 14, 14] as [number, number, number],
    },
    {
      name: "Master Suite & Ensuite",
      dim: "17'6\" x 13'0\"",
      target: [-7.0, 0.8, 4.5] as [number, number, number],
      cameraPos: [-2, 11, 12] as [number, number, number],
    },
    {
      name: "Traditional Mandir / Pooja",
      dim: "6'0\" x 5'0\"",
      target: [-1.3, 0.8, 0.3] as [number, number, number],
      cameraPos: [1.8, 6.5, 6.5] as [number, number, number],
    },
    {
      name: "Bedroom 2 (Study)",
      dim: "15'0\" x 12'6\"",
      target: [-7.0, 0.8, -5.0] as [number, number, number],
      cameraPos: [-2, 11, 3.0] as [number, number, number],
    },
    ...(numBhk >= 3
      ? [
          {
            name: "Bedroom 3 (Twin Suite)",
            dim: "14'0\" x 12'0\"",
            target: [-0.5, 0.8, -6.0] as [number, number, number],
            cameraPos: [3.5, 10.0, 2.0] as [number, number, number],
          },
        ]
      : []),
    {
      name: "Gourmet Kitchen & Utility",
      dim: "14'6\" x 10'0\"",
      target: [6.5, 0.8, -5.7] as [number, number, number],
      cameraPos: [12.0, 10.0, 2.0] as [number, number, number],
    },
    {
      name: "Wrap-Around Balcony Deck",
      dim: "22'0\" x 7'0\"",
      target: [4.0, 0.8, 8.6] as [number, number, number],
      cameraPos: [10.0, 9.5, 15.0] as [number, number, number],
    },
  ];

  // Helper to build procedural 3D model with 100% DISJOINT non-overlapping floor geometry
  const buildApartmentModel = useCallback(
    (scene: THREE.Scene) => {
      // ─── MATERIALS (Warm Quiet Luxury Palette) ───────────────────────
      const plinthMat = new THREE.MeshStandardMaterial({
        color: 0xf1ece4,
        roughness: 0.9,
      });

      const wallMat = new THREE.MeshStandardMaterial({
        color: 0xf2eee7, // warm off-white architectural plaster
        roughness: 0.85,
        metalness: 0.02,
      });

      const wallWoodFlutedMat = new THREE.MeshStandardMaterial({
        color: 0x403429, // dark teak fluted TV wall
        roughness: 0.5,
        metalness: 0.1,
      });

      const marbleFloorMat = new THREE.MeshStandardMaterial({
        color: 0xf6f3ec, // Italian Botticino polished marble
        roughness: 0.88, // Satin-matte finish: eliminates specular glare & color shifting during rotation!
        metalness: 0.0,
      });

      const woodFloorMat = new THREE.MeshStandardMaterial({
        color: 0xb28150, // Warm teak hardwood parquet
        roughness: 0.85, // Uniform diffuse response from all 360 camera angles
        metalness: 0.0,
      });

      const stoneKitchenTileMat = new THREE.MeshStandardMaterial({
        color: 0xd4cdc2, // Slate stone tiles
        roughness: 0.88,
        metalness: 0.0,
      });

      const teakBalconyDeckMat = new THREE.MeshStandardMaterial({
        color: 0x724726, // Outdoor teak wood decking
        roughness: 0.85,
        metalness: 0.0,
      });

      const poojaMarbleMat = new THREE.MeshStandardMaterial({
        color: 0xfcfbf8,
        roughness: 0.88,
        metalness: 0.0,
      });

      const glassBalustradeMat = new THREE.MeshPhysicalMaterial({
        color: 0xe6f4ff,
        transparent: true,
        opacity: 0.45,
        roughness: 0.05,
        metalness: 0.1,
        transmission: 0.85,
        ior: 1.5,
        depthWrite: false, // Prevents depth-sorting buffer fighting
      });

      const stainlessSteelMat = new THREE.MeshStandardMaterial({
        color: 0xd0d0d0,
        metalness: 0.9,
        roughness: 0.2,
      });

      const darkCabinetMat = new THREE.MeshStandardMaterial({
        color: 0x201f1e, // Matte black modern kitchen cabinets
        roughness: 0.35,
        metalness: 0.15,
      });

      const counterQuartzMat = new THREE.MeshStandardMaterial({
        color: 0xeae6df,
        roughness: 0.25,
        metalness: 0.08,
      });

      const fabricSofaMat = new THREE.MeshStandardMaterial({
        color: 0xe2ded4, // luxury cream-linen sofa
        roughness: 0.9,
      });

      const darkWoodFurnitureMat = new THREE.MeshStandardMaterial({
        color: 0x3a2f26, // rich walnut wood
        roughness: 0.5,
      });

      const whiteLinenMat = new THREE.MeshStandardMaterial({
        color: 0xffffff,
        roughness: 0.85,
      });

      const blanketAccentMat = new THREE.MeshStandardMaterial({
        color: 0x967654, // tan bed runner
        roughness: 0.8,
      });

      const poojaTeakMat = new THREE.MeshStandardMaterial({
        color: 0x6a3f1c, // carved mandir teakwood
        roughness: 0.45,
      });

      const goldBrassMat = new THREE.MeshStandardMaterial({
        color: 0xb08d57, // gold brass trims
        metalness: 0.85,
        roughness: 0.25,
      });

      const foliageMat = new THREE.MeshStandardMaterial({
        color: 0x2a5e22, // lush green plants
        roughness: 0.6,
      });

      const potMat = new THREE.MeshStandardMaterial({
        color: 0xe6e0d8,
        roughness: 0.6,
      });

      const modelGroup = new THREE.Group();

      // ─── TIER 0: BASE PLINTH (Top sits at y = 0.0) ───────────────────
      const plinthGeo = new THREE.BoxGeometry(26, 0.6, 24);
      const plinth = new THREE.Mesh(plinthGeo, plinthMat);
      plinth.position.set(0, -0.3, 0);
      plinth.receiveShadow = true;
      modelGroup.add(plinth);

      // Brass hairline trim around plinth
      const trimGeo = new THREE.BoxGeometry(26.08, 0.04, 24.08);
      const trimMesh = new THREE.Mesh(trimGeo, goldBrassMat);
      trimMesh.position.set(0, -0.02, 0);
      modelGroup.add(trimMesh);

      // ─── TIER 1: NON-OVERLAPPING DISJOINT ROOM FLOORS (y = 0.025, height = 0.05, top at 0.05)
      const floorH = 0.05;
      const floorY = 0.025;

      const addFloor = (w: number, d: number, cx: number, cz: number, mat: THREE.Material) => {
        const geo = new THREE.BoxGeometry(w, floorH, d);
        const mesh = new THREE.Mesh(geo, mat);
        mesh.position.set(cx, floorY, cz);
        mesh.receiveShadow = true;
        mesh.castShadow = false; // Floors NEVER cast shadows onto themselves!
        modelGroup.add(mesh);
        return mesh;
      };

      // 1. West Wing (Master Suite - South): X: [-11, -3], Z: [0, 9] (8 x 9)
      addFloor(8.0, 9.0, -7.0, 4.5, woodFloorMat);

      // 2. West Wing (Bedroom 2 Study - North): X: [-11, -3], Z: [-10, 0] (8 x 10)
      addFloor(8.0, 10.0, -7.0, -5.0, woodFloorMat);

      // 3. Center North (Bedroom 3 Twin Beds): X: [-3, 2], Z: [-10, -2] (5 x 8)
      if (numBhk >= 3) {
        addFloor(5.0, 8.0, -0.5, -6.0, woodFloorMat);
      }

      // 4. North East (Kitchen & Utility): X: [2, 11], Z: [-10, -1.5] (9 x 8.5)
      addFloor(9.0, 8.5, 6.5, -5.75, stoneKitchenTileMat);

      // 5. Living & Dining Salon: X: [0, 11], Z: [-1.5, 6] (11 x 7.5)
      addFloor(11.0, 7.5, 5.5, 2.25, marbleFloorMat);

      // 6. Central Hallway Link: X: [-3, 0], Z: [2, 6] (3 x 4)
      addFloor(3.0, 4.0, -1.5, 4.0, marbleFloorMat);

      // 7. Traditional Mandir (Elevated Sacred Marble Dais): X: [-3, 0], Z: [-1, 2] (3 x 3)
      // Elevated by 0.03m like an authentic raised marble platform!
      const poojaDaisGeo = new THREE.BoxGeometry(3.0, 0.08, 3.0);
      const poojaDais = new THREE.Mesh(poojaDaisGeo, poojaMarbleMat);
      poojaDais.position.set(-1.5, 0.04, 0.5);
      poojaDais.receiveShadow = true;
      modelGroup.add(poojaDais);

      // 8. Wrap-Around Balcony Deck: X: [-3, 11], Z: [6, 11.2] (14 x 5.2)
      addFloor(14.0, 5.2, 4.0, 8.6, teakBalconyDeckMat);

      // ─── TIER 2: AREA RUGS (Resting cleanly at y = 0.056, strictly above floor) ───
      const createRug = (w: number, d: number, x: number, z: number, color = 0xd8d1c6) => {
        const geo = new THREE.BoxGeometry(w, 0.006, d);
        const mat = new THREE.MeshStandardMaterial({
          color,
          roughness: 0.95,
          metalness: 0.0,
        });
        const mesh = new THREE.Mesh(geo, mat);
        mesh.position.set(x, 0.056, z);
        mesh.receiveShadow = true;
        mesh.castShadow = false;
        modelGroup.add(mesh);
        return mesh;
      };

      createRug(5.8, 4.2, 4.2, 2.2); // Living room sofa rug
      createRug(4.8, 4.5, -7.0, 4.5, 0xcfc7bc); // Master bedroom rug
      createRug(4.0, 3.8, -7.0, -5.0, 0xcfc7bc); // Bed 2 rug

      // ─── TIER 3: WALLS (Resting exactly at y = 0.05) ─────────────────
      const wallHeight = 2.3;
      const wallCenterY = 0.05 + wallHeight / 2; // y = 1.20
      const wallThickness = 0.28;

      const addWall = (w: number, d: number, x: number, z: number, customMat = wallMat) => {
        const geo = new THREE.BoxGeometry(w, wallHeight, d);
        const mesh = new THREE.Mesh(geo, customMat);
        mesh.position.set(x, wallCenterY, z);
        mesh.castShadow = true;
        mesh.receiveShadow = false; // Eliminates wall self-shadow acne entirely!
        modelGroup.add(mesh);
        return mesh;
      };

      // Outer Perimeter cutaway walls
      addWall(wallThickness, 19.2, -11.0, -0.5); // West outer boundary wall
      addWall(16.2, wallThickness, -2.9, -10.1); // North outer wall (Bedrooms)
      addWall(8.8, wallThickness, 6.6, -10.1); // North-East kitchen wall
      addWall(wallThickness, 8.8, 11.0, -5.75); // East kitchen outer wall
      addWall(wallThickness, 7.8, 11.0, 2.25); // East living outer wall
      addWall(8.2, wallThickness, -7.0, 9.0); // South master bedroom wall

      // Interior Partitions
      addWall(wallThickness, 8.0, -3.0, -6.0); // Between Bed 3 and Bed 2
      addWall(wallThickness, 8.5, 2.0, -5.75); // Kitchen partition wall
      addWall(8.0, wallThickness, -7.0, 0.0); // Between Master bed and Bed 2
      addWall(wallThickness, 4.0, -3.0, 4.0); // Master bed hallway partition
      addWall(3.0, wallThickness, -1.5, 2.0); // Pooja room North partition
      addWall(wallThickness, 3.0, 0.0, 0.5); // Pooja room East partition

      // Wood Fluted TV Feature Wall in Living Room
      addWall(wallThickness, 4.2, 10.8, 2.5, wallWoodFlutedMat);

      // Mounted Flat Screen TV
      const tvGeo = new THREE.BoxGeometry(0.08, 1.1, 2.4);
      const tvMat = new THREE.MeshStandardMaterial({
        color: 0x111111,
        roughness: 0.2,
        metalness: 0.8,
      });
      const tv = new THREE.Mesh(tvGeo, tvMat);
      tv.position.set(10.7, 1.35, 2.5);
      tv.castShadow = true;
      modelGroup.add(tv);

      // TV Media Credenza
      const credenzaGeo = new THREE.BoxGeometry(0.7, 0.38, 3.2);
      const credenza = new THREE.Mesh(credenzaGeo, darkWoodFurnitureMat);
      credenza.position.set(10.3, 0.24, 2.5);
      credenza.castShadow = true;
      modelGroup.add(credenza);

      // ─── TIER 4: MODERN GLASS BALUSTRADE RAILINGS ─────────────────────
      const addBalustrade = (w: number, d: number, x: number, z: number) => {
        // Glass panel
        const glassGeo = new THREE.BoxGeometry(w, 0.95, d);
        const glass = new THREE.Mesh(glassGeo, glassBalustradeMat);
        glass.position.set(x, 0.53, z);
        modelGroup.add(glass);

        // Top stainless steel handrail
        const railGeo = new THREE.BoxGeometry(w + 0.05, 0.06, d + 0.05);
        const rail = new THREE.Mesh(railGeo, stainlessSteelMat);
        rail.position.set(x, 1.01, z);
        rail.castShadow = true;
        modelGroup.add(rail);
      };

      addBalustrade(14.0, 0.08, 4.0, 11.2); // Balcony South glass railing
      addBalustrade(0.08, 5.2, 11.0, 8.6); // Balcony East glass railing

      // ─── TIER 5: CENTRAL TRADITIONAL MANDIR / POOJA ROOM ──────────────
      const poojaGroup = new THREE.Group();

      // Carved wooden temple altar base
      const mandirBaseGeo = new THREE.BoxGeometry(1.6, 0.85, 1.1);
      const mandirBase = new THREE.Mesh(mandirBaseGeo, poojaTeakMat);
      mandirBase.position.set(-1.3, 0.51, 0.3);
      mandirBase.castShadow = true;
      poojaGroup.add(mandirBase);

      // Tiered temple canopy (Shikhara)
      const mandirCanopyGeo = new THREE.ConeGeometry(0.45, 0.65, 4);
      const mandirCanopy = new THREE.Mesh(mandirCanopyGeo, goldBrassMat);
      mandirCanopy.position.set(-1.3, 1.28, 0.3);
      mandirCanopy.rotation.y = Math.PI / 4;
      poojaGroup.add(mandirCanopy);

      // Traditional diya lamps
      const diyaGeo = new THREE.CylinderGeometry(0.08, 0.05, 0.15, 8);
      for (let i = -1; i <= 1; i += 2) {
        const diya = new THREE.Mesh(diyaGeo, goldBrassMat);
        diya.position.set(-1.3 + i * 0.55, 0.98, 0.3);
        poojaGroup.add(diya);
      }

      // Warm glowing sacred light inside Mandir
      const poojaLight = new THREE.PointLight(0xffaa44, 1.8, 5, 1.5);
      poojaLight.position.set(-1.3, 1.15, 0.4);
      poojaGroup.add(poojaLight);
      modelGroup.add(poojaGroup);

      // ─── TIER 6: LIVING & DINING SALON FURNISHINGS ────────────────────
      // L-Shaped Luxury Cream Sofa
      const sofaMainGeo = new THREE.BoxGeometry(4.2, 0.75, 1.1);
      const sofaMain = new THREE.Mesh(sofaMainGeo, fabricSofaMat);
      sofaMain.position.set(4.2, 0.43, 0.8);
      sofaMain.castShadow = true;
      modelGroup.add(sofaMain);

      const sofaChaiseGeo = new THREE.BoxGeometry(1.1, 0.75, 2.2);
      const sofaChaise = new THREE.Mesh(sofaChaiseGeo, fabricSofaMat);
      sofaChaise.position.set(5.75, 0.43, 2.0);
      sofaChaise.castShadow = true;
      modelGroup.add(sofaChaise);

      // Coffee Table
      const tableGeo = new THREE.BoxGeometry(1.8, 0.35, 0.9);
      const coffeeTable = new THREE.Mesh(tableGeo, darkWoodFurnitureMat);
      coffeeTable.position.set(4.2, 0.23, 2.2);
      coffeeTable.castShadow = true;
      modelGroup.add(coffeeTable);

      // 6-Seater Wooden Dining Table
      const diningGeo = new THREE.BoxGeometry(1.8, 0.75, 3.2);
      const diningTable = new THREE.Mesh(diningGeo, darkWoodFurnitureMat);
      diningTable.position.set(8.2, 0.43, 2.5);
      diningTable.castShadow = true;
      modelGroup.add(diningTable);

      // Dining Chairs
      const chairGeo = new THREE.BoxGeometry(0.55, 0.85, 0.55);
      for (let i = -1; i <= 1; i++) {
        const c1 = new THREE.Mesh(chairGeo, fabricSofaMat);
        c1.position.set(7.1, 0.48, 2.5 + i * 1.05);
        c1.castShadow = true;
        modelGroup.add(c1);

        const c2 = new THREE.Mesh(chairGeo, fabricSofaMat);
        c2.position.set(9.3, 0.48, 2.5 + i * 1.05);
        c2.castShadow = true;
        modelGroup.add(c2);
      }

      // ─── TIER 7: GOURMET KITCHEN & UTILITY ─────────────────────────────
      // L-Shaped dark cabinetry
      const kitchenBase1Geo = new THREE.BoxGeometry(5.8, 0.85, 1.1);
      const kitchenBase1 = new THREE.Mesh(kitchenBase1Geo, darkCabinetMat);
      kitchenBase1.position.set(6.5, 0.48, -9.4);
      kitchenBase1.castShadow = true;
      modelGroup.add(kitchenBase1);

      const kitchenBase2Geo = new THREE.BoxGeometry(1.1, 0.85, 4.5);
      const kitchenBase2 = new THREE.Mesh(kitchenBase2Geo, darkCabinetMat);
      kitchenBase2.position.set(8.8, 0.48, -6.6);
      kitchenBase2.castShadow = true;
      modelGroup.add(kitchenBase2);

      // Light Quartz Countertop
      const counterTop1Geo = new THREE.BoxGeometry(5.9, 0.08, 1.15);
      const counterTop1 = new THREE.Mesh(counterTop1Geo, counterQuartzMat);
      counterTop1.position.set(6.5, 0.94, -9.4);
      counterTop1.castShadow = true;
      modelGroup.add(counterTop1);

      const counterTop2Geo = new THREE.BoxGeometry(1.15, 0.08, 4.5);
      const counterTop2 = new THREE.Mesh(counterTop2Geo, counterQuartzMat);
      counterTop2.position.set(8.8, 0.94, -6.6);
      counterTop2.castShadow = true;
      modelGroup.add(counterTop2);

      // Refrigerator
      const fridgeGeo = new THREE.BoxGeometry(1.4, 1.9, 1.1);
      const fridge = new THREE.Mesh(fridgeGeo, stainlessSteelMat);
      fridge.position.set(3.2, 1.0, -9.4);
      fridge.castShadow = true;
      modelGroup.add(fridge);

      // Washing Machine
      const washerGeo = new THREE.BoxGeometry(0.85, 0.85, 0.85);
      const washerMat = new THREE.MeshStandardMaterial({ color: 0xf5f5f5, roughness: 0.3 });
      const washer = new THREE.Mesh(washerGeo, washerMat);
      washer.position.set(10.0, 0.48, -9.4);
      washer.castShadow = true;
      modelGroup.add(washer);

      // ─── TIER 8: MASTER SUITE (Bottom-Left) ───────────────────────────
      // King Bed Frame & Mattress
      const kingBedGeo = new THREE.BoxGeometry(3.2, 0.55, 3.4);
      const kingBed = new THREE.Mesh(kingBedGeo, darkWoodFurnitureMat);
      kingBed.position.set(-7.0, 0.33, 4.5);
      kingBed.castShadow = true;
      modelGroup.add(kingBed);

      const kingMattressGeo = new THREE.BoxGeometry(2.9, 0.35, 3.1);
      const kingMattress = new THREE.Mesh(kingMattressGeo, whiteLinenMat);
      kingMattress.position.set(-7.0, 0.64, 4.5);
      kingMattress.castShadow = true;
      modelGroup.add(kingMattress);

      // Headboard
      const headboardGeo = new THREE.BoxGeometry(3.4, 1.2, 0.25);
      const headboard = new THREE.Mesh(headboardGeo, darkWoodFurnitureMat);
      headboard.position.set(-7.0, 0.95, 2.8);
      headboard.castShadow = true;
      modelGroup.add(headboard);

      // Runner
      const runnerGeo = new THREE.BoxGeometry(2.92, 0.04, 0.9);
      const runner = new THREE.Mesh(runnerGeo, blanketAccentMat);
      runner.position.set(-7.0, 0.83, 5.3);
      modelGroup.add(runner);

      // Nightstands with lamps
      const nsGeo = new THREE.BoxGeometry(0.65, 0.5, 0.65);
      for (let i = -1; i <= 1; i += 2) {
        const ns = new THREE.Mesh(nsGeo, darkWoodFurnitureMat);
        ns.position.set(-7.0 + i * 2.05, 0.3, 2.9);
        ns.castShadow = true;
        modelGroup.add(ns);

        const lampGeo = new THREE.CylinderGeometry(0.18, 0.22, 0.38, 8);
        const lamp = new THREE.Mesh(lampGeo, whiteLinenMat);
        lamp.position.set(-7.0 + i * 2.05, 0.74, 2.9);
        modelGroup.add(lamp);
      }

      // Ensuite Bathroom Glass Shower
      const showerGlassGeo = new THREE.BoxGeometry(0.06, 1.8, 2.2);
      const showerGlass = new THREE.Mesh(showerGlassGeo, glassBalustradeMat);
      showerGlass.position.set(-9.4, 0.95, 7.2);
      modelGroup.add(showerGlass);

      // Vanity counter
      const vanityGeo = new THREE.BoxGeometry(1.4, 0.75, 0.6);
      const vanity = new THREE.Mesh(vanityGeo, counterQuartzMat);
      vanity.position.set(-7.5, 0.43, 8.4);
      vanity.castShadow = true;
      modelGroup.add(vanity);

      // ─── TIER 9: SECOND BEDROOM WITH STUDY (Top-Left) ─────────────────
      const queenBedGeo = new THREE.BoxGeometry(2.8, 0.5, 3.0);
      const queenBed = new THREE.Mesh(queenBedGeo, whiteLinenMat);
      queenBed.position.set(-7.0, 0.3, -5.0);
      queenBed.castShadow = true;
      modelGroup.add(queenBed);

      const queenHeadboard = new THREE.Mesh(new THREE.BoxGeometry(3.0, 1.1, 0.2), darkWoodFurnitureMat);
      queenHeadboard.position.set(-7.0, 0.85, -6.6);
      queenHeadboard.castShadow = true;
      modelGroup.add(queenHeadboard);

      // Study Workstation
      const deskGeo = new THREE.BoxGeometry(2.0, 0.72, 0.85);
      const desk = new THREE.Mesh(deskGeo, darkWoodFurnitureMat);
      desk.position.set(-9.8, 0.41, -2.5);
      desk.castShadow = true;
      modelGroup.add(desk);

      const laptopGeo = new THREE.BoxGeometry(0.4, 0.03, 0.3);
      const laptop = new THREE.Mesh(laptopGeo, stainlessSteelMat);
      laptop.position.set(-9.8, 0.79, -2.5);
      modelGroup.add(laptop);

      // ─── TIER 10: THIRD BEDROOM (Twin Single Beds - Top Middle) ───────
      if (numBhk >= 3) {
        const singleBedGeo = new THREE.BoxGeometry(1.6, 0.45, 2.8);
        for (let i = -1; i <= 1; i += 2) {
          const sBed = new THREE.Mesh(singleBedGeo, whiteLinenMat);
          sBed.position.set(-0.5 + i * 1.3, 0.28, -6.5);
          sBed.castShadow = true;
          modelGroup.add(sBed);

          const sHead = new THREE.Mesh(new THREE.BoxGeometry(1.8, 0.95, 0.15), darkWoodFurnitureMat);
          sHead.position.set(-0.5 + i * 1.3, 0.74, -8.0);
          modelGroup.add(sHead);
        }
      }

      // ─── TIER 11: BALCONY DECK LOUNGE & PLANTS ────────────────────────
      const outdoorChairGeo = new THREE.BoxGeometry(0.85, 0.65, 0.85);
      const outdoorChairMat = new THREE.MeshStandardMaterial({ color: 0x564332, roughness: 0.8 });

      const chair1 = new THREE.Mesh(outdoorChairGeo, outdoorChairMat);
      chair1.position.set(2.0, 0.38, 8.6);
      chair1.castShadow = true;
      modelGroup.add(chair1);

      const chair2 = new THREE.Mesh(outdoorChairGeo, outdoorChairMat);
      chair2.position.set(4.0, 0.38, 8.6);
      chair2.castShadow = true;
      modelGroup.add(chair2);

      const outdoorTableGeo = new THREE.CylinderGeometry(0.45, 0.45, 0.35, 12);
      const outdoorTable = new THREE.Mesh(outdoorTableGeo, darkWoodFurnitureMat);
      outdoorTable.position.set(3.0, 0.23, 8.6);
      outdoorTable.castShadow = true;
      modelGroup.add(outdoorTable);

      // Potted Foliage Plants
      const addPlant = (x: number, z: number, r = 1.0) => {
        const potGeo = new THREE.CylinderGeometry(0.35 * r, 0.25 * r, 0.65 * r, 12);
        const pot = new THREE.Mesh(potGeo, potMat);
        pot.position.set(x, 0.05 + 0.32 * r, z);
        pot.castShadow = true;
        modelGroup.add(pot);

        const fGeo = new THREE.DodecahedronGeometry(0.55 * r, 1);
        const fMesh = new THREE.Mesh(fGeo, foliageMat);
        fMesh.position.set(x, 0.05 + 0.75 * r, z);
        fMesh.castShadow = true;
        modelGroup.add(fMesh);
      };

      addPlant(9.5, 8.6, 1.2); // Balcony corner plant
      addPlant(-0.5, 8.6, 0.9); // Balcony entrance plant
      addPlant(9.5, 5.0, 0.85); // Living room plant
      addPlant(-3.2, 1.5, 0.8); // Plant beside Mandir

      scene.add(modelGroup);
      return modelGroup;
    },
    [numBhk]
  );

  // Initialize Three.js WebGL Scene (Zero Flickering Guaranteed)
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const width = container.clientWidth || 800;
    const height = container.clientHeight || 520;

    // 1. Scene
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // 2. Camera with large zoom-out range and balanced near/far
    const camera = new THREE.PerspectiveCamera(38, width / height, 0.5, 250.0);
    camera.position.set(20, 22, 22);
    camera.lookAt(0, 0.8, 0);
    cameraRef.current = camera;

    // 3. WebGL Renderer with Logarithmic Depth Buffer & Opaque Background (Zero Flickering)
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: false, // Prevents alpha-buffer frame flickering on canvas
      powerPreference: "high-performance",
      logarithmicDepthBuffer: true, // Eliminates Z-fighting across all camera angles and zoom levels!
      precision: "highp",
      stencil: false,
    });
    renderer.setClearColor(0xf5f1eb, 1.0); // Solid matching luxury background
    renderer.setSize(width, height, false);
    renderer.setPixelRatio(Math.min(typeof window !== "undefined" ? window.devicePixelRatio : 1, 1.75));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.NeutralToneMapping;
    renderer.toneMappingExposure = 1.0;

    // Explicit Touch & Selection Styling on Canvas (Prevents browser touch fighting)
    renderer.domElement.style.touchAction = "none";
    renderer.domElement.style.userSelect = "none";
    renderer.domElement.style.webkitUserSelect = "none";
    renderer.domElement.style.outline = "none";
    renderer.domElement.style.display = "block";
    renderer.domElement.style.width = "100%";
    renderer.domElement.style.height = "100%";

    container.replaceChildren(renderer.domElement);
    rendererRef.current = renderer;

    // 4. OrbitControls with Expanded Zoom Range & Dedicated Touch Handling
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.08;
    controls.maxPolarAngle = Math.PI / 2 - 0.08; // Stay above floor horizon
    controls.minDistance = 6;
    controls.maxDistance = 85; // Allows zooming out significantly more as requested!
    controls.target.set(0, 0.8, 0);
    controls.autoRotate = isAutoRotating;
    controls.autoRotateSpeed = 0.8;

    // Explicit touch gesture assignment (1-finger rotate, 2-finger zoom/pan)
    controls.touches = {
      ONE: THREE.TOUCH.ROTATE,
      TWO: THREE.TOUCH.DOLLY_PAN,
    };

    // Stop programmatic camera lerp immediately when user touches/interacts!
    controls.addEventListener("start", () => {
      cameraTargetRef.current.inProgress = false;
    });

    controlsRef.current = controls;

    // 5. Balanced Architectural Lighting Rig (Zero Color Shifting Across 360° Orbit)
    const hemiLight = new THREE.HemisphereLight(0xfff8ee, 0xd0c4b4, 1.25);
    scene.add(hemiLight);
    hemiLightRef.current = hemiLight;

    // Key Sun Light (Top-Right)
    const sunLight = new THREE.DirectionalLight(0xfff5e6, 1.25);
    sunLight.position.set(20, 28, 16);
    sunLight.castShadow = true;
    sunLight.shadow.mapSize.width = 1024;
    sunLight.shadow.mapSize.height = 1024;
    sunLight.shadow.camera.near = 5;
    sunLight.shadow.camera.far = 70;
    sunLight.shadow.camera.left = -18;
    sunLight.shadow.camera.right = 18;
    sunLight.shadow.camera.top = 18;
    sunLight.shadow.camera.bottom = -18;
    sunLight.shadow.bias = -0.0001;
    sunLight.shadow.normalBias = 0.015; // Clean, stable contact shadow without acne or shimmering
    scene.add(sunLight);
    sunLightRef.current = sunLight;

    // Balanced Fill Sun (Top-Left Opposite — Keeps Backside Uniformly Lit)
    const fillLight = new THREE.DirectionalLight(0xffeedd, 0.6);
    fillLight.position.set(-18, 22, -14);
    scene.add(fillLight);

    // Warm Interior Point Lights
    const warmPoints: THREE.PointLight[] = [];
    const addPoint = (x: number, y: number, z: number, intensity = 1.5, color = 0xffe2b8) => {
      const pl = new THREE.PointLight(color, intensity, 14, 1.3);
      pl.position.set(x, y, z);
      scene.add(pl);
      warmPoints.push(pl);
    };

    addPoint(5.5, 2.2, 2.2); // Living room
    addPoint(-7.0, 2.1, 4.5, 1.1); // Master bedroom
    addPoint(6.5, 2.1, -5.7, 1.2); // Kitchen
    addPoint(-7.0, 2.1, -5.0, 1.0); // Bedroom 2
    interiorLightsRef.current = warmPoints;

    // Build procedural 3D model
    buildApartmentModel(scene);

    setLoading(false);

    // Cancel camera animation on touch to prevent dual-source camera jitter
    const handleTouchStart = () => {
      cameraTargetRef.current.inProgress = false;
    };
    container.addEventListener("touchstart", handleTouchStart, { passive: true });

    // Render loop
    const animate = () => {
      animFrameIdRef.current = requestAnimationFrame(animate);

      if (cameraTargetRef.current.inProgress) {
        const { pos, lookAt } = cameraTargetRef.current;
        camera.position.lerp(pos, 0.055);
        controls.target.lerp(lookAt, 0.055);

        if (
          camera.position.distanceTo(pos) < 0.08 &&
          controls.target.distanceTo(lookAt) < 0.08
        ) {
          cameraTargetRef.current.inProgress = false;
        }
      }

      controls.update();
      renderer.render(scene, camera);
    };
    animate();

    // Debounced resize handler (Prevents buffer re-allocation jitter on mobile address-bar shifts)
    let lastW = width;
    let lastH = height;
    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      if (Math.abs(w - lastW) > 6 || Math.abs(h - lastH) > 6) {
        lastW = w;
        lastH = h;
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
        renderer.setSize(w, h, false);
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      container.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("resize", handleResize);
      if (animFrameIdRef.current) cancelAnimationFrame(animFrameIdRef.current);
      controls.dispose();
      renderer.dispose();
      renderer.forceContextLoss();
    };
  }, [buildApartmentModel, isAutoRotating]);

  // Handle Auto-Rotate toggle
  const toggleAutoRotate = () => {
    setIsAutoRotating((prev) => {
      const next = !prev;
      if (controlsRef.current) controlsRef.current.autoRotate = next;
      return next;
    });
  };

  // Handle Day / Evening Lighting mode toggle
  const toggleLighting = () => {
    const nextMode = lightingMode === "day" ? "evening" : "day";
    setLightingMode(nextMode);

    if (sunLightRef.current && hemiLightRef.current) {
      if (nextMode === "evening") {
        sunLightRef.current.color.setHex(0xffa550);
        sunLightRef.current.intensity = 0.95;
        hemiLightRef.current.color.setHex(0xffeedd);
        hemiLightRef.current.groundColor.setHex(0x2a2535);
        hemiLightRef.current.intensity = 0.65;
        interiorLightsRef.current.forEach((pl) => (pl.intensity = 2.8));
      } else {
        sunLightRef.current.color.setHex(0xfff5e6);
        sunLightRef.current.intensity = 1.85;
        hemiLightRef.current.color.setHex(0xfff8ee);
        hemiLightRef.current.groundColor.setHex(0xd0c4b4);
        hemiLightRef.current.intensity = 1.3;
        interiorLightsRef.current.forEach((pl) => (pl.intensity = 1.5));
      }
    }
  };

  // Handle Camera View presets
  const setPresetView = (view: "iso" | "top" | "front") => {
    setCameraView(view);
    setActiveRoom(null);
    let targetPos: [number, number, number] = [20, 22, 22];
    let lookTarget: [number, number, number] = [0, 0.8, 0];

    if (view === "top") {
      targetPos = [0, 28, 0.1];
      lookTarget = [0, 0, 0];
    } else if (view === "front") {
      targetPos = [0, 10, 25];
      lookTarget = [0, 1.2, 0];
    }

    cameraTargetRef.current = {
      pos: new THREE.Vector3(...targetPos),
      lookAt: new THREE.Vector3(...lookTarget),
      inProgress: true,
    };
  };

  // Handle room inspection focus
  const focusRoom = (room: RoomTarget) => {
    setActiveRoom(room.name);
    cameraTargetRef.current = {
      pos: new THREE.Vector3(...room.cameraPos),
      lookAt: new THREE.Vector3(...room.target),
      inProgress: true,
    };
  };

  return (
    <div
      className="relative w-full aspect-[16/10] min-h-[380px] sm:min-h-[440px] md:min-h-[530px] bg-[#FAF7F2] rounded-2xl sm:rounded-3xl overflow-hidden border border-[#E8E4DC] select-none flex flex-col shadow-lg touch-none"
      style={{ touchAction: "none" }}
    >
      {/* ── 3D Canvas Mount (Touch-Action None prevents browser gesture conflict) ── */}
      <div
        ref={containerRef}
        className="w-full h-full cursor-grab active:cursor-grabbing touch-none select-none"
        style={{ touchAction: "none", WebkitTouchCallout: "none" }}
      />

      {/* Loading overlay */}
      {loading && (
        <div className="absolute inset-0 bg-[#FAF7F2]/90 flex items-center justify-center gap-3 text-sm text-[#72716d]">
          <span className="size-4 border-2 border-[#B08D57] border-t-transparent rounded-full animate-spin" />
          <span>Rendering 3D Architectural Masterplan...</span>
        </div>
      )}

      {/* ── TOP HUD CONTROLS BAR ─────────────────────────────────────── */}
      <div className="absolute top-3 sm:top-4 inset-x-3 sm:inset-x-4 flex items-center justify-between pointer-events-none gap-2">
        {/* Left: 3D Badge & Status */}
        <div className="pointer-events-auto flex items-center gap-1.5 sm:gap-2 bg-white/95 backdrop-blur-md px-2.5 sm:px-3.5 py-1.5 rounded-full border border-[#E8E4DC] shadow-sm shrink-0">
          <span className="size-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-[10px] sm:text-[10.5px] font-bold tracking-[0.15em] sm:tracking-[0.2em] uppercase text-[#1c1b1b]">
            <span className="sm:hidden">3D Cutaway</span>
            <span className="hidden sm:inline">Architectural Cutaway 3D</span>
          </span>
          <span className="text-[10px] text-[#72716d] hidden md:inline">· 360° Real-time Orbit</span>
        </div>

        {/* Right: View & Lighting Controls */}
        <div className="pointer-events-auto flex items-center gap-1 sm:gap-1.5 bg-white/95 backdrop-blur-md p-1 rounded-full border border-[#E8E4DC] shadow-sm shrink-0">
          {/* Day / Evening Lighting Mode */}
          <button
            onClick={toggleLighting}
            title={lightingMode === "day" ? "Switch to Evening Lighting" : "Switch to Day Lighting"}
            className="px-2 sm:px-2.5 py-1 rounded-full text-[10.5px] sm:text-[11px] font-medium transition-all flex items-center gap-1 text-[#474741] hover:text-[#B08D57] hover:bg-[#FAF7F2] cursor-pointer"
          >
            <span className="material-symbols-outlined text-sm text-[#B08D57]">
              {lightingMode === "day" ? "light_mode" : "bedtime"}
            </span>
            <span className="hidden sm:inline capitalize">{lightingMode}</span>
          </button>

          {/* Auto Rotate Toggle */}
          <button
            onClick={toggleAutoRotate}
            title="Auto Rotate 360°"
            className={`px-2 sm:px-2.5 py-1 rounded-full text-[10.5px] sm:text-[11px] font-medium transition-all flex items-center gap-1 cursor-pointer ${
              isAutoRotating
                ? "bg-[#1c1b1b] text-white"
                : "text-[#474741] hover:text-[#B08D57] hover:bg-[#FAF7F2]"
            }`}
          >
            <span className="material-symbols-outlined text-sm">360</span>
            <span className="hidden sm:inline">Rotate</span>
          </button>

          {/* Preset Camera Views */}
          <div className="hidden md:flex items-center gap-1 pl-1 border-l border-[#E8E4DC]">
            <button
              onClick={() => setPresetView("iso")}
              className={`px-2.5 py-0.5 rounded text-[10px] uppercase font-semibold transition-all cursor-pointer ${
                cameraView === "iso" && !activeRoom
                  ? "bg-[#B08D57] text-white"
                  : "text-[#72716d] hover:text-[#1c1b1b]"
              }`}
            >
              Isometric
            </button>
            <button
              onClick={() => setPresetView("top")}
              className={`px-2.5 py-0.5 rounded text-[10px] uppercase font-semibold transition-all cursor-pointer ${
                cameraView === "top" && !activeRoom
                  ? "bg-[#B08D57] text-white"
                  : "text-[#72716d] hover:text-[#1c1b1b]"
              }`}
            >
              Top Plan
            </button>
            <button
              onClick={() => setPresetView("front")}
              className={`px-2.5 py-0.5 rounded text-[10px] uppercase font-semibold transition-all cursor-pointer ${
                cameraView === "front" && !activeRoom
                  ? "bg-[#B08D57] text-white"
                  : "text-[#72716d] hover:text-[#1c1b1b]"
              }`}
            >
              Front
            </button>
          </div>
        </div>
      </div>

      {/* ── ROOM INSPECTOR PILLS (BOTTOM HUD - MOBILE SCROLLABLE) ────── */}
      <div className="absolute bottom-3 sm:bottom-4 inset-x-3 sm:inset-x-4 flex flex-col sm:flex-row sm:items-end justify-between gap-2.5 sm:gap-3 pointer-events-none">
        {/* Room Navigation Pills */}
        <div className="pointer-events-auto flex items-center gap-1.5 bg-white/95 backdrop-blur-md p-1.5 rounded-2xl border border-[#E8E4DC] shadow-md max-w-full overflow-x-auto no-scrollbar whitespace-nowrap">
          <span className="text-[10px] font-bold tracking-wider uppercase text-[#72716d] px-2 py-1 hidden sm:inline self-center shrink-0">
            Inspect:
          </span>
          {roomTargets.map((r) => {
            const isSelected = activeRoom === r.name;
            return (
              <button
                key={r.name}
                onClick={() => focusRoom(r)}
                className={`px-2.5 py-1 rounded-xl text-[10.5px] sm:text-[11px] font-medium transition-all flex items-center gap-1.5 cursor-pointer shrink-0 ${
                  isSelected
                    ? "bg-[#1c1b1b] text-white shadow-xs"
                    : "bg-[#FAF7F2] text-[#474741] hover:text-[#B08D57] hover:border-[#B08D57] border border-transparent"
                }`}
              >
                <span className={`size-1.5 rounded-full ${isSelected ? "bg-[#B08D57]" : "bg-[#72716d]"}`} />
                <span>{r.name}</span>
                {r.dim && (
                  <span className="text-[9.5px] opacity-70 hidden md:inline">
                    ({r.dim})
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Interaction Hint */}
        <div className="pointer-events-none hidden lg:flex items-center gap-2 bg-black/75 backdrop-blur-sm text-white/90 text-[10px] px-3.5 py-1.5 rounded-full self-end shadow">
          <span className="material-symbols-outlined text-xs text-[#B08D57]">touch_app</span>
          <span>Left-click drag to orbit · Scroll to zoom out (expanded range) · Right-click to pan</span>
        </div>
      </div>
    </div>
  );
}
