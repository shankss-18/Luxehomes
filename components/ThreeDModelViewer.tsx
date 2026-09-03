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
    pos: new THREE.Vector3(18, 19, 20),
    lookAt: new THREE.Vector3(0, 0.8, 0),
    inProgress: false,
  });

  const numBhk = bhk || 3;

  // Key room targets matching reference layout
  const roomTargets: RoomTarget[] = [
    {
      name: "Living & Dining Salon",
      dim: "24'0\" x 16'0\"",
      target: [2.5, 0.8, 1.2] as [number, number, number],
      cameraPos: [9, 13, 13] as [number, number, number],
    },
    {
      name: "Master Suite & Ensuite",
      dim: "17'6\" x 13'0\"",
      target: [-6.2, 0.8, 4.2] as [number, number, number],
      cameraPos: [-2, 10, 11] as [number, number, number],
    },
    {
      name: "Traditional Mandir / Pooja",
      dim: "6'0\" x 5'0\"",
      target: [-1.2, 0.8, 1.2] as [number, number, number],
      cameraPos: [1.8, 6.5, 6.5] as [number, number, number],
    },
    {
      name: "Bedroom 2 (Study)",
      dim: "15'0\" x 12'6\"",
      target: [-6.5, 0.8, -4.5] as [number, number, number],
      cameraPos: [-2, 10, 2.5] as [number, number, number],
    },
    ...(numBhk >= 3
      ? [
          {
            name: "Bedroom 3 (Twin Suite)",
            dim: "14'0\" x 12'0\"",
            target: [-0.5, 0.8, -5.2] as [number, number, number],
            cameraPos: [3.5, 9.5, 1.5] as [number, number, number],
          },
        ]
      : []),
    {
      name: "Gourmet Kitchen & Utility",
      dim: "14'6\" x 10'0\"",
      target: [6.5, 0.8, -4.8] as [number, number, number],
      cameraPos: [11.5, 9.5, 2.0] as [number, number, number],
    },
    {
      name: "Wrap-Around Balcony Deck",
      dim: "22'0\" x 7'0\"",
      target: [5.2, 0.8, 6.5] as [number, number, number],
      cameraPos: [9.5, 8.5, 13.5] as [number, number, number],
    },
  ];

  // Helper to build procedural 3D model with strict vertical tiering (Zero Z-Fighting)
  const buildApartmentModel = useCallback(
    (scene: THREE.Scene) => {
      // ─── MATERIALS (Warm Quiet Luxury Palette) ───────────────────────
      const plinthMat = new THREE.MeshStandardMaterial({
        color: 0xf3efe9,
        roughness: 0.9,
      });

      const wallMat = new THREE.MeshStandardMaterial({
        color: 0xf0ece5, // warm off-white architectural plaster
        roughness: 0.85,
        metalness: 0.02,
      });

      const wallWoodFlutedMat = new THREE.MeshStandardMaterial({
        color: 0x42362b, // dark teak fluted TV wall
        roughness: 0.5,
        metalness: 0.1,
      });

      const marbleFloorMat = new THREE.MeshStandardMaterial({
        color: 0xf5f2eb, // Italian Botticino polished marble
        roughness: 0.22,
        metalness: 0.12,
      });

      const woodFloorMat = new THREE.MeshStandardMaterial({
        color: 0xb48352, // Warm teak hardwood parquet
        roughness: 0.45,
        metalness: 0.06,
      });

      const stoneKitchenTileMat = new THREE.MeshStandardMaterial({
        color: 0xd6cfc4, // Slate stone tiles
        roughness: 0.4,
        metalness: 0.08,
      });

      const teakBalconyDeckMat = new THREE.MeshStandardMaterial({
        color: 0x764b2b, // Outdoor teak wood decking
        roughness: 0.65,
        metalness: 0.04,
      });

      const bathTileMat = new THREE.MeshStandardMaterial({
        color: 0xcfc9c0,
        roughness: 0.3,
        metalness: 0.1,
      });

      const poojaMarbleMat = new THREE.MeshStandardMaterial({
        color: 0xfbf9f6,
        roughness: 0.18,
        metalness: 0.2,
      });

      const glassBalustradeMat = new THREE.MeshPhysicalMaterial({
        color: 0xdaf0ff,
        transparent: true,
        opacity: 0.42,
        roughness: 0.05,
        metalness: 0.1,
        transmission: 0.85,
        ior: 1.5,
      });

      const stainlessSteelMat = new THREE.MeshStandardMaterial({
        color: 0xcccccc,
        metalness: 0.9,
        roughness: 0.2,
      });

      const darkCabinetMat = new THREE.MeshStandardMaterial({
        color: 0x222120, // Matte black modern kitchen cabinets
        roughness: 0.35,
        metalness: 0.15,
      });

      const counterQuartzMat = new THREE.MeshStandardMaterial({
        color: 0xeae6df,
        roughness: 0.25,
        metalness: 0.08,
      });

      const fabricSofaMat = new THREE.MeshStandardMaterial({
        color: 0xe0dbd1, // luxury cream-linen sofa
        roughness: 0.9,
      });

      const darkWoodFurnitureMat = new THREE.MeshStandardMaterial({
        color: 0x3d3228, // rich walnut wood
        roughness: 0.5,
      });

      const whiteLinenMat = new THREE.MeshStandardMaterial({
        color: 0xfcfcfc,
        roughness: 0.85,
      });

      const blanketAccentMat = new THREE.MeshStandardMaterial({
        color: 0x9b7b59, // tan bed runner
        roughness: 0.8,
      });

      const poojaTeakMat = new THREE.MeshStandardMaterial({
        color: 0x6e431f, // carved mandir teakwood
        roughness: 0.45,
      });

      const goldBrassMat = new THREE.MeshStandardMaterial({
        color: 0xb08d57, // gold brass trims
        metalness: 0.85,
        roughness: 0.25,
      });

      const foliageMat = new THREE.MeshStandardMaterial({
        color: 0x2d6124, // lush green plants
        roughness: 0.6,
      });

      const potMat = new THREE.MeshStandardMaterial({
        color: 0xe5dfd7,
        roughness: 0.6,
      });

      const modelGroup = new THREE.Group();

      // ─── TIER 0: BASE PLINTH (Top sits at y = 0.0) ───────────────────
      const plinthGeo = new THREE.BoxGeometry(26, 0.6, 23);
      const plinth = new THREE.Mesh(plinthGeo, plinthMat);
      plinth.position.set(0, -0.3, 0);
      plinth.receiveShadow = true;
      modelGroup.add(plinth);

      // Brass hairline trim around plinth
      const trimGeo = new THREE.BoxGeometry(26.1, 0.04, 23.1);
      const trimMesh = new THREE.Mesh(trimGeo, goldBrassMat);
      trimMesh.position.set(0, -0.02, 0);
      modelGroup.add(trimMesh);

      // ─── TIER 1: ROOM FLOORS (Top sits at y = 0.06, well above plinth)
      const floorThickness = 0.05;
      const floorY = 0.035; // Center Y, top at 0.06

      // A. Living & Dining Salon (Italian Marble)
      const livingFloorGeo = new THREE.BoxGeometry(12.5, floorThickness, 13);
      const livingFloor = new THREE.Mesh(livingFloorGeo, marbleFloorMat);
      livingFloor.position.set(2.5, floorY, 1.5);
      livingFloor.receiveShadow = true;
      modelGroup.add(livingFloor);

      // B. Gourmet Kitchen & Utility (Slate Stone Tiles)
      const kitchenFloorGeo = new THREE.BoxGeometry(7.2, floorThickness, 8);
      const kitchenFloor = new THREE.Mesh(kitchenFloorGeo, stoneKitchenTileMat);
      kitchenFloor.position.set(6.8, floorY, -6);
      kitchenFloor.receiveShadow = true;
      modelGroup.add(kitchenFloor);

      // C. Central Mandir / Pooja Room (White Makrana Marble)
      const poojaFloorGeo = new THREE.BoxGeometry(3.2, floorThickness, 3.2);
      const poojaFloor = new THREE.Mesh(poojaFloorGeo, poojaMarbleMat);
      poojaFloor.position.set(-1.2, floorY, 1.2);
      poojaFloor.receiveShadow = true;
      modelGroup.add(poojaFloor);

      // D. Master Suite & Bath (Teak Wood Parquet)
      const masterFloorGeo = new THREE.BoxGeometry(8.2, floorThickness, 8.8);
      const masterFloor = new THREE.Mesh(masterFloorGeo, woodFloorMat);
      masterFloor.position.set(-6.8, floorY, 4.4);
      masterFloor.receiveShadow = true;
      modelGroup.add(masterFloor);

      // E. Bedroom 2 - Study / Guest (Teak Wood)
      const bed2FloorGeo = new THREE.BoxGeometry(8.2, floorThickness, 8.2);
      const bed2Floor = new THREE.Mesh(bed2FloorGeo, woodFloorMat);
      bed2Floor.position.set(-6.8, floorY, -4.5);
      bed2Floor.receiveShadow = true;
      modelGroup.add(bed2Floor);

      // F. Bedroom 3 - Twin Beds (Teak Wood)
      if (numBhk >= 3) {
        const bed3FloorGeo = new THREE.BoxGeometry(5.2, floorThickness, 7.2);
        const bed3Floor = new THREE.Mesh(bed3FloorGeo, woodFloorMat);
        bed3Floor.position.set(-0.5, floorY, -6.4);
        bed3Floor.receiveShadow = true;
        modelGroup.add(bed3Floor);
      }

      // G. Wrap-Around Balcony Deck (Teak Wood Decking)
      const balconyFloorGeo = new THREE.BoxGeometry(10.5, floorThickness, 5.2);
      const balconyFloor = new THREE.Mesh(balconyFloorGeo, teakBalconyDeckMat);
      balconyFloor.position.set(5.5, floorY, 8.6);
      balconyFloor.receiveShadow = true;
      modelGroup.add(balconyFloor);

      // ─── TIER 2: AREA RUGS (y = 0.075, elevated above floor) ─────────
      const createRug = (w: number, d: number, x: number, z: number, color = 0xdad3c8) => {
        const geo = new THREE.BoxGeometry(w, 0.015, d);
        const mat = new THREE.MeshStandardMaterial({
          color,
          roughness: 0.95,
          polygonOffset: true,
          polygonOffsetFactor: -1,
          polygonOffsetUnits: -1,
        });
        const mesh = new THREE.Mesh(geo, mat);
        mesh.position.set(x, 0.068, z);
        mesh.receiveShadow = true;
        modelGroup.add(mesh);
        return mesh;
      };

      createRug(6.2, 4.5, 1.2, 1.5); // Living room sofa rug
      createRug(5.2, 5.0, -6.8, 4.2, 0xd0c8bd); // Master bedroom rug
      createRug(4.2, 4.2, -6.8, -4.5, 0xd0c8bd); // Bed 2 rug

      // ─── TIER 3: WALLS (Resting exactly on floor at y = 0.06) ────────
      const wallHeight = 2.4;
      const wallCenterY = 0.06 + wallHeight / 2; // y = 1.26
      const wallThickness = 0.28;

      const addWall = (w: number, d: number, x: number, z: number, customMat = wallMat) => {
        const geo = new THREE.BoxGeometry(w, wallHeight, d);
        const mesh = new THREE.Mesh(geo, customMat);
        mesh.position.set(x, wallCenterY, z);
        mesh.castShadow = true;
        mesh.receiveShadow = true;
        modelGroup.add(mesh);
        return mesh;
      };

      // Outer Perimeter cutaway walls
      addWall(wallThickness, 17.5, -11.0, 0.0); // West outer boundary wall
      addWall(16.5, wallThickness, -2.8, -10.1); // North outer wall (Bedrooms)
      addWall(8.5, wallThickness, 9.2, -10.1); // North-East kitchen wall
      addWall(wallThickness, 8.5, 13.5, -6.0); // East outer wall
      addWall(13.5, wallThickness, -4.2, 8.9); // South master bedroom wall

      // Interior Partitions
      addWall(wallThickness, 8.2, -2.8, -6.0); // Between Bed 3 and Bed 2/Hall
      addWall(wallThickness, 7.5, 3.2, -6.2); // Kitchen partition wall
      addWall(8.2, wallThickness, -6.8, 0.0); // Between Master bed and Bed 2
      addWall(wallThickness, 4.8, -2.8, 4.0); // Master bed hallway partition
      addWall(3.2, wallThickness, -1.2, 2.8); // Pooja room North partition
      addWall(wallThickness, 3.2, 0.4, 1.2); // Pooja room East partition

      // Wood Fluted TV Feature Wall in Living Room
      addWall(wallThickness, 4.5, 8.5, 1.8, wallWoodFlutedMat);

      // Mounted Flat Screen TV on Feature Wall
      const tvGeo = new THREE.BoxGeometry(0.08, 1.1, 2.4);
      const tvMat = new THREE.MeshStandardMaterial({
        color: 0x111111,
        roughness: 0.2,
        metalness: 0.8,
      });
      const tv = new THREE.Mesh(tvGeo, tvMat);
      tv.position.set(8.4, 1.35, 1.8);
      tv.castShadow = true;
      modelGroup.add(tv);

      // TV Media Credenza underneath
      const credenzaGeo = new THREE.BoxGeometry(0.7, 0.38, 3.2);
      const credenza = new THREE.Mesh(credenzaGeo, darkWoodFurnitureMat);
      credenza.position.set(8.1, 0.25, 1.8);
      credenza.castShadow = true;
      modelGroup.add(credenza);

      // ─── TIER 4: MODERN GLASS BALUSTRADE RAILINGS ─────────────────────
      const addBalustrade = (w: number, d: number, x: number, z: number) => {
        // Glass panel
        const glassGeo = new THREE.BoxGeometry(w, 0.95, d);
        const glass = new THREE.Mesh(glassGeo, glassBalustradeMat);
        glass.position.set(x, 0.54, z);
        modelGroup.add(glass);

        // Top stainless steel handrail
        const railGeo = new THREE.BoxGeometry(w + 0.05, 0.06, d + 0.05);
        const rail = new THREE.Mesh(railGeo, stainlessSteelMat);
        rail.position.set(x, 1.02, z);
        rail.castShadow = true;
        modelGroup.add(rail);
      };

      addBalustrade(10.5, 0.08, 5.5, 11.2); // Balcony South glass railing
      addBalustrade(0.08, 5.2, 10.8, 8.6); // Balcony East glass railing

      // ─── TIER 5: CENTRAL TRADITIONAL MANDIR / POOJA ROOM ──────────────
      // (As highlighted in user reference image)
      const poojaGroup = new THREE.Group();

      // Carved wooden temple altar base
      const mandirBaseGeo = new THREE.BoxGeometry(1.6, 0.85, 1.1);
      const mandirBase = new THREE.Mesh(mandirBaseGeo, poojaTeakMat);
      mandirBase.position.set(-1.2, 0.48, 0.6);
      mandirBase.castShadow = true;
      poojaGroup.add(mandirBase);

      // Tiered temple canopy (Shikhara)
      const mandirCanopyGeo = new THREE.ConeGeometry(0.45, 0.65, 4);
      const mandirCanopy = new THREE.Mesh(mandirCanopyGeo, goldBrassMat);
      mandirCanopy.position.set(-1.2, 1.25, 0.6);
      mandirCanopy.rotation.y = Math.PI / 4;
      poojaGroup.add(mandirCanopy);

      // Brass bell & traditional diya lamps
      const diyaGeo = new THREE.CylinderGeometry(0.08, 0.05, 0.15, 8);
      for (let i = -1; i <= 1; i += 2) {
        const diya = new THREE.Mesh(diyaGeo, goldBrassMat);
        diya.position.set(-1.2 + i * 0.55, 0.95, 0.6);
        poojaGroup.add(diya);
      }

      // Warm glowing sacred light inside Mandir
      const poojaLight = new THREE.PointLight(0xffb74d, 1.6, 5, 1.5);
      poojaLight.position.set(-1.2, 1.1, 0.7);
      poojaGroup.add(poojaLight);
      modelGroup.add(poojaGroup);

      // ─── TIER 6: LIVING & DINING SALON FURNISHINGS ────────────────────
      // L-Shaped Luxury Cream Sofa
      const sofaMainGeo = new THREE.BoxGeometry(4.2, 0.75, 1.1);
      const sofaMain = new THREE.Mesh(sofaMainGeo, fabricSofaMat);
      sofaMain.position.set(1.5, 0.44, 0.2);
      sofaMain.castShadow = true;
      modelGroup.add(sofaMain);

      const sofaChaiseGeo = new THREE.BoxGeometry(1.1, 0.75, 2.4);
      const sofaChaise = new THREE.Mesh(sofaChaiseGeo, fabricSofaMat);
      sofaChaise.position.set(3.05, 0.44, 1.55);
      sofaChaise.castShadow = true;
      modelGroup.add(sofaChaise);

      // Glass & Wood Coffee Table
      const tableGeo = new THREE.BoxGeometry(1.8, 0.35, 0.9);
      const coffeeTable = new THREE.Mesh(tableGeo, darkWoodFurnitureMat);
      coffeeTable.position.set(1.5, 0.24, 1.6);
      coffeeTable.castShadow = true;
      modelGroup.add(coffeeTable);

      // 6-Seater Wooden Dining Table
      const diningGeo = new THREE.BoxGeometry(1.8, 0.75, 3.2);
      const diningTable = new THREE.Mesh(diningGeo, darkWoodFurnitureMat);
      diningTable.position.set(5.5, 0.44, 1.5);
      diningTable.castShadow = true;
      modelGroup.add(diningTable);

      // Dining Chairs (6 upholstered chairs)
      const chairGeo = new THREE.BoxGeometry(0.55, 0.85, 0.55);
      for (let i = -1; i <= 1; i++) {
        // Left side chairs
        const c1 = new THREE.Mesh(chairGeo, fabricSofaMat);
        c1.position.set(4.4, 0.49, 1.5 + i * 1.05);
        c1.castShadow = true;
        modelGroup.add(c1);

        // Right side chairs
        const c2 = new THREE.Mesh(chairGeo, fabricSofaMat);
        c2.position.set(6.6, 0.49, 1.5 + i * 1.05);
        c2.castShadow = true;
        modelGroup.add(c2);
      }

      // ─── TIER 7: GOURMET KITCHEN & UTILITY ─────────────────────────────
      // L-Shaped dark modern cabinetry
      const kitchenBase1Geo = new THREE.BoxGeometry(5.8, 0.85, 1.1);
      const kitchenBase1 = new THREE.Mesh(kitchenBase1Geo, darkCabinetMat);
      kitchenBase1.position.set(6.8, 0.49, -9.5);
      kitchenBase1.castShadow = true;
      modelGroup.add(kitchenBase1);

      const kitchenBase2Geo = new THREE.BoxGeometry(1.1, 0.85, 4.5);
      const kitchenBase2 = new THREE.Mesh(kitchenBase2Geo, darkCabinetMat);
      kitchenBase2.position.set(9.2, 0.49, -6.8);
      kitchenBase2.castShadow = true;
      modelGroup.add(kitchenBase2);

      // Light Quartz Countertop
      const counterTop1Geo = new THREE.BoxGeometry(5.9, 0.08, 1.15);
      const counterTop1 = new THREE.Mesh(counterTop1Geo, counterQuartzMat);
      counterTop1.position.set(6.8, 0.95, -9.5);
      counterTop1.castShadow = true;
      modelGroup.add(counterTop1);

      const counterTop2Geo = new THREE.BoxGeometry(1.15, 0.08, 4.5);
      const counterTop2 = new THREE.Mesh(counterTop2Geo, counterQuartzMat);
      counterTop2.position.set(9.2, 0.95, -6.8);
      counterTop2.castShadow = true;
      modelGroup.add(counterTop2);

      // Double-door Stainless Steel Refrigerator
      const fridgeGeo = new THREE.BoxGeometry(1.4, 1.9, 1.1);
      const fridge = new THREE.Mesh(fridgeGeo, stainlessSteelMat);
      fridge.position.set(3.8, 1.01, -9.5);
      fridge.castShadow = true;
      modelGroup.add(fridge);

      // Utility / Laundry Machine
      const washerGeo = new THREE.BoxGeometry(0.85, 0.85, 0.85);
      const washerMat = new THREE.MeshStandardMaterial({ color: 0xf5f5f5, roughness: 0.3 });
      const washer = new THREE.Mesh(washerGeo, washerMat);
      washer.position.set(10.2, 0.49, -9.5);
      washer.castShadow = true;
      modelGroup.add(washer);

      // ─── TIER 8: MASTER SUITE (Bottom-Left) ───────────────────────────
      // King Bed Frame & Mattress
      const kingBedGeo = new THREE.BoxGeometry(3.2, 0.55, 3.4);
      const kingBed = new THREE.Mesh(kingBedGeo, darkWoodFurnitureMat);
      kingBed.position.set(-6.8, 0.34, 4.4);
      kingBed.castShadow = true;
      modelGroup.add(kingBed);

      const kingMattressGeo = new THREE.BoxGeometry(2.9, 0.35, 3.1);
      const kingMattress = new THREE.Mesh(kingMattressGeo, whiteLinenMat);
      kingMattress.position.set(-6.8, 0.65, 4.4);
      kingMattress.castShadow = true;
      modelGroup.add(kingMattress);

      // Padded Headboard
      const headboardGeo = new THREE.BoxGeometry(3.4, 1.2, 0.25);
      const headboard = new THREE.Mesh(headboardGeo, darkWoodFurnitureMat);
      headboard.position.set(-6.8, 0.96, 2.7);
      headboard.castShadow = true;
      modelGroup.add(headboard);

      // Folded Bed Runner
      const runnerGeo = new THREE.BoxGeometry(2.92, 0.04, 0.9);
      const runner = new THREE.Mesh(runnerGeo, blanketAccentMat);
      runner.position.set(-6.8, 0.84, 5.2);
      modelGroup.add(runner);

      // Dual Nightstands with reading lamps
      const nsGeo = new THREE.BoxGeometry(0.65, 0.5, 0.65);
      for (let i = -1; i <= 1; i += 2) {
        const ns = new THREE.Mesh(nsGeo, darkWoodFurnitureMat);
        ns.position.set(-6.8 + i * 2.05, 0.31, 2.8);
        ns.castShadow = true;
        modelGroup.add(ns);

        const lampGeo = new THREE.CylinderGeometry(0.18, 0.22, 0.38, 8);
        const lamp = new THREE.Mesh(lampGeo, whiteLinenMat);
        lamp.position.set(-6.8 + i * 2.05, 0.75, 2.8);
        modelGroup.add(lamp);
      }

      // Ensuite Bathroom Glass Shower Partition
      const showerGlassGeo = new THREE.BoxGeometry(0.06, 1.8, 2.2);
      const showerGlass = new THREE.Mesh(showerGlassGeo, glassBalustradeMat);
      showerGlass.position.set(-9.2, 0.96, 7.2);
      modelGroup.add(showerGlass);

      // Vanity counter in bathroom
      const vanityGeo = new THREE.BoxGeometry(1.4, 0.75, 0.6);
      const vanity = new THREE.Mesh(vanityGeo, counterQuartzMat);
      vanity.position.set(-7.5, 0.44, 8.4);
      vanity.castShadow = true;
      modelGroup.add(vanity);

      // ─── TIER 9: SECOND BEDROOM WITH STUDY (Top-Left) ─────────────────
      // Queen Bed
      const queenBedGeo = new THREE.BoxGeometry(2.8, 0.5, 3.0);
      const queenBed = new THREE.Mesh(queenBedGeo, whiteLinenMat);
      queenBed.position.set(-6.8, 0.31, -4.5);
      queenBed.castShadow = true;
      modelGroup.add(queenBed);

      const queenHeadboard = new THREE.Mesh(new THREE.BoxGeometry(3.0, 1.1, 0.2), darkWoodFurnitureMat);
      queenHeadboard.position.set(-6.8, 0.86, -6.1);
      queenHeadboard.castShadow = true;
      modelGroup.add(queenHeadboard);

      // Study Workstation Desk with Laptop
      const deskGeo = new THREE.BoxGeometry(2.0, 0.72, 0.85);
      const desk = new THREE.Mesh(deskGeo, darkWoodFurnitureMat);
      desk.position.set(-9.8, 0.42, -2.5);
      desk.castShadow = true;
      modelGroup.add(desk);

      const laptopGeo = new THREE.BoxGeometry(0.4, 0.03, 0.3);
      const laptop = new THREE.Mesh(laptopGeo, stainlessSteelMat);
      laptop.position.set(-9.8, 0.8, -2.5);
      modelGroup.add(laptop);

      // ─── TIER 10: THIRD BEDROOM (Twin Single Beds - Top Middle) ───────
      if (numBhk >= 3) {
        const singleBedGeo = new THREE.BoxGeometry(1.6, 0.45, 2.8);
        for (let i = -1; i <= 1; i += 2) {
          const sBed = new THREE.Mesh(singleBedGeo, whiteLinenMat);
          sBed.position.set(-0.5 + i * 1.3, 0.29, -6.5);
          sBed.castShadow = true;
          modelGroup.add(sBed);

          const sHead = new THREE.Mesh(new THREE.BoxGeometry(1.8, 0.95, 0.15), darkWoodFurnitureMat);
          sHead.position.set(-0.5 + i * 1.3, 0.75, -8.0);
          modelGroup.add(sHead);
        }
      }

      // ─── TIER 11: BALCONY DECK LOUNGE & PLANTS ────────────────────────
      // Outdoor Rattan Lounge Chairs
      const outdoorChairGeo = new THREE.BoxGeometry(0.85, 0.65, 0.85);
      const outdoorChairMat = new THREE.MeshStandardMaterial({ color: 0x5a4635, roughness: 0.8 });

      const chair1 = new THREE.Mesh(outdoorChairGeo, outdoorChairMat);
      chair1.position.set(3.2, 0.39, 8.5);
      chair1.castShadow = true;
      modelGroup.add(chair1);

      const chair2 = new THREE.Mesh(outdoorChairGeo, outdoorChairMat);
      chair2.position.set(5.2, 0.39, 8.5);
      chair2.castShadow = true;
      modelGroup.add(chair2);

      // Low round outdoor table
      const outdoorTableGeo = new THREE.CylinderGeometry(0.45, 0.45, 0.35, 12);
      const outdoorTable = new THREE.Mesh(outdoorTableGeo, darkWoodFurnitureMat);
      outdoorTable.position.set(4.2, 0.24, 8.5);
      outdoorTable.castShadow = true;
      modelGroup.add(outdoorTable);

      // Potted Foliage Plants (Ceramic Pots + Foliage spheres)
      const addPlant = (x: number, z: number, r = 1.0) => {
        const potGeo = new THREE.CylinderGeometry(0.35 * r, 0.25 * r, 0.65 * r, 12);
        const pot = new THREE.Mesh(potGeo, potMat);
        pot.position.set(x, 0.06 + (0.32 * r), z);
        pot.castShadow = true;
        modelGroup.add(pot);

        const fGeo = new THREE.DodecahedronGeometry(0.55 * r, 1);
        const fMesh = new THREE.Mesh(fGeo, foliageMat);
        fMesh.position.set(x, 0.06 + (0.75 * r), z);
        fMesh.castShadow = true;
        modelGroup.add(fMesh);
      };

      addPlant(9.8, 8.5, 1.2); // Balcony corner plant
      addPlant(1.2, 8.5, 0.9); // Balcony entrance plant
      addPlant(7.5, 3.6, 0.85); // Living room plant beside TV
      addPlant(-3.2, 0.8, 0.8); // Plant beside Mandir

      scene.add(modelGroup);
      return modelGroup;
    },
    [numBhk]
  );

  // Initialize Three.js WebGL Scene with 100% Rock-Solid Z-Buffer (No Flickering)
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const width = container.clientWidth || 800;
    const height = container.clientHeight || 520;

    // 1. Scene
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // 2. Camera with tight near/far ratio to maximize 24-bit depth precision (ZERO Flickering)
    const camera = new THREE.PerspectiveCamera(40, width / height, 1.0, 90.0);
    camera.position.set(18, 19, 20);
    camera.lookAt(0, 0.8, 0);
    cameraRef.current = camera;

    // 3. WebGL Renderer with High-Performance Settings (Standard Linear Depth Buffer)
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.08;
    container.replaceChildren(renderer.domElement);
    rendererRef.current = renderer;

    // 4. OrbitControls with smooth damping and clamped distances
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.maxPolarAngle = Math.PI / 2 - 0.08; // Keep above floor horizon
    controls.minDistance = 8;
    controls.maxDistance = 42;
    controls.target.set(0, 0.8, 0);
    controls.autoRotate = isAutoRotating;
    controls.autoRotateSpeed = 0.8;
    controlsRef.current = controls;

    // 5. Lighting Setup (Soft Daylight with normalBias to eliminate shadow acne)
    const hemiLight = new THREE.HemisphereLight(0xfff8ee, 0xd0c4b4, 1.25);
    scene.add(hemiLight);
    hemiLightRef.current = hemiLight;

    const sunLight = new THREE.DirectionalLight(0xfff5e6, 1.85);
    sunLight.position.set(22, 28, 18);
    sunLight.castShadow = true;
    sunLight.shadow.mapSize.width = 2048;
    sunLight.shadow.mapSize.height = 2048;
    sunLight.shadow.camera.near = 8;
    sunLight.shadow.camera.far = 55;
    sunLight.shadow.camera.left = -16;
    sunLight.shadow.camera.right = 16;
    sunLight.shadow.camera.top = 16;
    sunLight.shadow.camera.bottom = -16;
    sunLight.shadow.bias = -0.00015;
    sunLight.shadow.normalBias = 0.035; // Crucial: prevents shadow acne & chatter on zoom
    scene.add(sunLight);
    sunLightRef.current = sunLight;

    // Warm Interior Point Lights
    const warmPoints: THREE.PointLight[] = [];
    const addPoint = (x: number, y: number, z: number, intensity = 1.6, color = 0xffe2b8) => {
      const pl = new THREE.PointLight(color, intensity, 14, 1.3);
      pl.position.set(x, y, z);
      scene.add(pl);
      warmPoints.push(pl);
    };

    addPoint(2.5, 2.2, 1.5); // Living room chandelier
    addPoint(-6.5, 2.1, 4.2, 1.1); // Master bedroom
    addPoint(6.5, 2.1, -6.0, 1.3); // Kitchen
    addPoint(-6.5, 2.1, -4.5, 1.0); // Bedroom 2
    interiorLightsRef.current = warmPoints;

    // Build procedural 3D model
    buildApartmentModel(scene);

    setLoading(false);

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

    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener("resize", handleResize);

    return () => {
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
        hemiLightRef.current.intensity = 1.25;
        interiorLightsRef.current.forEach((pl) => (pl.intensity = 1.6));
      }
    }
  };

  // Handle Camera View presets
  const setPresetView = (view: "iso" | "top" | "front") => {
    setCameraView(view);
    setActiveRoom(null);
    let targetPos: [number, number, number] = [18, 19, 20];
    let lookTarget: [number, number, number] = [0, 0.8, 0];

    if (view === "top") {
      targetPos = [0, 25, 0.1];
      lookTarget = [0, 0, 0];
    } else if (view === "front") {
      targetPos = [0, 9, 23];
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
    <div className="relative w-full aspect-[16/10] min-h-[440px] md:min-h-[530px] bg-gradient-to-b from-[#FAF7F2] to-[#F2EDE4] rounded-3xl overflow-hidden border border-[#E8E4DC] select-none flex flex-col shadow-lg">
      {/* ── 3D Canvas Mount ─────────────────────────────────────────── */}
      <div ref={containerRef} className="w-full h-full cursor-grab active:cursor-grabbing" />

      {/* Loading overlay */}
      {loading && (
        <div className="absolute inset-0 bg-[#FAF7F2]/90 flex items-center justify-center gap-3 text-sm text-[#72716d]">
          <span className="size-4 border-2 border-[#B08D57] border-t-transparent rounded-full animate-spin" />
          <span>Generating 3D Architectural Cutaway...</span>
        </div>
      )}

      {/* ── TOP HUD CONTROLS BAR ─────────────────────────────────────── */}
      <div className="absolute top-4 inset-x-4 flex items-center justify-between pointer-events-none">
        {/* Left: 3D Badge & Status */}
        <div className="pointer-events-auto flex items-center gap-2 bg-white/95 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-[#E8E4DC] shadow-sm">
          <span className="size-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-[10.5px] font-bold tracking-[0.2em] uppercase text-[#1c1b1b]">
            Architectural Cutaway 3D
          </span>
          <span className="text-[10px] text-[#72716d] hidden sm:inline">· 360° Real-time Orbit</span>
        </div>

        {/* Right: View & Lighting Controls */}
        <div className="pointer-events-auto flex items-center gap-1.5 bg-white/95 backdrop-blur-md p-1 rounded-full border border-[#E8E4DC] shadow-sm">
          {/* Day / Evening Lighting Mode */}
          <button
            onClick={toggleLighting}
            title={lightingMode === "day" ? "Switch to Evening Lighting" : "Switch to Day Lighting"}
            className="px-2.5 py-1 rounded-full text-[11px] font-medium transition-all flex items-center gap-1 text-[#474741] hover:text-[#B08D57] hover:bg-[#FAF7F2] cursor-pointer"
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
            className={`px-2.5 py-1 rounded-full text-[11px] font-medium transition-all flex items-center gap-1 cursor-pointer ${
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

      {/* ── ROOM INSPECTOR PILLS (BOTTOM HUD) ────────────────────────── */}
      <div className="absolute bottom-4 inset-x-4 flex flex-col sm:flex-row sm:items-end justify-between gap-3 pointer-events-none">
        {/* Room Navigation Pills */}
        <div className="pointer-events-auto flex flex-wrap gap-1.5 bg-white/95 backdrop-blur-md p-1.5 rounded-2xl border border-[#E8E4DC] shadow-md max-w-full overflow-x-auto">
          <span className="text-[10px] font-bold tracking-wider uppercase text-[#72716d] px-2.5 py-1 hidden sm:inline self-center">
            Inspect Room:
          </span>
          {roomTargets.map((r) => {
            const isSelected = activeRoom === r.name;
            return (
              <button
                key={r.name}
                onClick={() => focusRoom(r)}
                className={`px-2.5 py-1 rounded-xl text-[11px] font-medium transition-all flex items-center gap-1.5 cursor-pointer whitespace-nowrap ${
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
        <div className="pointer-events-none hidden lg:flex items-center gap-2 bg-black/70 backdrop-blur-sm text-white/85 text-[10px] px-3.5 py-1.5 rounded-full self-end shadow">
          <span className="material-symbols-outlined text-xs text-[#B08D57]">touch_app</span>
          <span>Left-click drag to orbit · Scroll to zoom · Right-click to pan</span>
        </div>
      </div>
    </div>
  );
}
