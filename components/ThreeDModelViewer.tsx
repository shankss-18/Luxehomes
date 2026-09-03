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

  // Lighting references for Day/Night toggle
  const sunLightRef = useRef<THREE.DirectionalLight | null>(null);
  const hemiLightRef = useRef<THREE.HemisphereLight | null>(null);
  const interiorLightsRef = useRef<THREE.PointLight[]>([]);

  // State
  const [isAutoRotating, setIsAutoRotating] = useState(false);
  const [lightingMode, setLightingMode] = useState<"day" | "evening">("day");
  const [activeRoom, setActiveRoom] = useState<string | null>(null);
  const [cameraView, setCameraView] = useState<"iso" | "top" | "front">("iso");
  const [loading, setLoading] = useState(true);

  // Animation target for smooth camera movement
  const cameraTargetRef = useRef<{
    pos: THREE.Vector3;
    lookAt: THREE.Vector3;
    inProgress: boolean;
  }>({
    pos: new THREE.Vector3(18, 20, 20),
    lookAt: new THREE.Vector3(0, 1, 0),
    inProgress: false,
  });

  const numBhk = bhk || 3;

  // Define key room focal points based on BHK
  const roomTargets: RoomTarget[] = [
    {
      name: "Living & Dining",
      dim: numBhk >= 3 ? "22'0\" x 14'6\"" : "18'6\" x 12'0\"",
      target: [2, 1, 1] as [number, number, number],
      cameraPos: [8, 14, 14] as [number, number, number],
    },
    {
      name: "Master Suite",
      dim: numBhk >= 3 ? "17'6\" x 11'4\"" : "14'0\" x 12'0\"",
      target: [-6, 1, -4] as [number, number, number],
      cameraPos: [-2, 11, 4] as [number, number, number],
    },
    {
      name: "Gourmet Kitchen",
      dim: numBhk >= 3 ? "12'0\" x 9'6\"" : "8'8\" x 8'2\"",
      target: [6, 1, -5] as [number, number, number],
      cameraPos: [11, 10, 2] as [number, number, number],
    },
    {
      name: "Bedroom 2",
      dim: "14'0\" x 12'0\"",
      target: [-6, 1, 4] as [number, number, number],
      cameraPos: [-1, 11, 11] as [number, number, number],
    },
    ...(numBhk >= 3
      ? [
          {
            name: "Bedroom 3",
            dim: "14'0\" x 12'4\"",
            target: [-1, 1, -5] as [number, number, number],
            cameraPos: [4, 11, 3] as [number, number, number],
          },
        ]
      : []),
    {
      name: "Balcony Deck",
      dim: "16'0\" x 6'0\"",
      target: [5, 1, 8] as [number, number, number],
      cameraPos: [9, 9, 15] as [number, number, number],
    },
  ];

  // Helper to build procedural realistic 3D architectural model
  const buildApartmentModel = useCallback(
    (scene: THREE.Scene) => {
      // Materials palette (Luxury warm architectural materials)
      const wallMaterial = new THREE.MeshStandardMaterial({
        color: 0xede8e1, // warm off-white architectural plaster
        roughness: 0.85,
        metalness: 0.05,
      });

      const wallAccentMaterial = new THREE.MeshStandardMaterial({
        color: 0x3d352e, // dark teak slatted feature wall
        roughness: 0.5,
        metalness: 0.15,
      });

      const marbleFloorMaterial = new THREE.MeshStandardMaterial({
        color: 0xf7f4ef, // Italian botticino marble
        roughness: 0.2,
        metalness: 0.15,
      });

      const woodFloorMaterial = new THREE.MeshStandardMaterial({
        color: 0xb58a5f, // warm teak hardwood flooring
        roughness: 0.45,
        metalness: 0.08,
      });

      const kitchenTileMaterial = new THREE.MeshStandardMaterial({
        color: 0xded9d0, // modern slate kitchen stone
        roughness: 0.35,
        metalness: 0.1,
      });

      const balconyDeckMaterial = new THREE.MeshStandardMaterial({
        color: 0x82542e, // exterior teak decking
        roughness: 0.7,
        metalness: 0.05,
      });

      const glassMaterial = new THREE.MeshPhysicalMaterial({
        color: 0xd0e8ff,
        transparent: true,
        opacity: 0.35,
        roughness: 0.05,
        metalness: 0.1,
        transmission: 0.85,
        ior: 1.5,
      });

      const goldBrassMaterial = new THREE.MeshStandardMaterial({
        color: 0xb08d57, // brand gold
        roughness: 0.3,
        metalness: 0.8,
      });

      const furnitureWoodMaterial = new THREE.MeshStandardMaterial({
        color: 0x4a3728, // rich walnut wood
        roughness: 0.5,
        metalness: 0.05,
      });

      const fabricSofaMaterial = new THREE.MeshStandardMaterial({
        color: 0x5a5752, // luxury charcoal-linen sofa
        roughness: 0.9,
        metalness: 0.0,
      });

      const bedLinenMaterial = new THREE.MeshStandardMaterial({
        color: 0xfafafa, // crisp white bedsheets
        roughness: 0.8,
        metalness: 0.0,
      });

      const foliageMaterial = new THREE.MeshStandardMaterial({
        color: 0x2d5a27, // lush plant leaves
        roughness: 0.6,
        metalness: 0.0,
      });

      const modelGroup = new THREE.Group();

      // ─── 1. BASE PLINTH / PODIUM ─────────────────────────────────────
      const plinthGeo = new THREE.BoxGeometry(25, 0.8, 22);
      const plinthMat = new THREE.MeshStandardMaterial({
        color: 0xf5f2ed,
        roughness: 0.9,
      });
      const plinth = new THREE.Mesh(plinthGeo, plinthMat);
      plinth.position.set(0, -0.4, 0);
      plinth.receiveShadow = true;
      modelGroup.add(plinth);

      // Gold accent trim line around plinth
      const trimGeo = new THREE.BoxGeometry(25.1, 0.08, 22.1);
      const trimMesh = new THREE.Mesh(trimGeo, goldBrassMaterial);
      trimMesh.position.set(0, -0.04, 0);
      modelGroup.add(trimMesh);

      // ─── 2. FLOOR ZONES ──────────────────────────────────────────────
      // A. Living & Dining (Marble)
      const livingFloorGeo = new THREE.BoxGeometry(12, 0.05, 12);
      const livingFloor = new THREE.Mesh(livingFloorGeo, marbleFloorMaterial);
      livingFloor.position.set(2, 0.025, 1);
      livingFloor.receiveShadow = true;
      modelGroup.add(livingFloor);

      // Carpet rug under living area
      const rugGeo = new THREE.BoxGeometry(6.5, 0.02, 5);
      const rugMat = new THREE.MeshStandardMaterial({
        color: 0xd8d0c5,
        roughness: 0.95,
        polygonOffset: true,
        polygonOffsetFactor: -2,
        polygonOffsetUnits: -2,
      });
      const rug = new THREE.Mesh(rugGeo, rugMat);
      rug.position.set(0.5, 0.065, 1);
      rug.receiveShadow = true;
      modelGroup.add(rug);

      // B. Kitchen & Utility (Stone tiles)
      const kitchenFloorGeo = new THREE.BoxGeometry(7, 0.05, 7.5);
      const kitchenFloor = new THREE.Mesh(kitchenFloorGeo, kitchenTileMaterial);
      kitchenFloor.position.set(6.5, 0.025, -6);
      kitchenFloor.receiveShadow = true;
      modelGroup.add(kitchenFloor);

      // C. Master Bedroom (Teak hardwood)
      const masterFloorGeo = new THREE.BoxGeometry(8, 0.05, 8.5);
      const masterFloor = new THREE.Mesh(masterFloorGeo, woodFloorMaterial);
      masterFloor.position.set(-6.5, 0.025, -4.5);
      masterFloor.receiveShadow = true;
      modelGroup.add(masterFloor);

      // D. Bedroom 2 (Teak hardwood)
      const bed2FloorGeo = new THREE.BoxGeometry(8, 0.05, 8);
      const bed2Floor = new THREE.Mesh(bed2FloorGeo, woodFloorMaterial);
      bed2Floor.position.set(-6.5, 0.025, 4.5);
      bed2Floor.receiveShadow = true;
      modelGroup.add(bed2Floor);

      // E. Bedroom 3 (if 3 BHK / 4 BHK)
      if (numBhk >= 3) {
        const bed3FloorGeo = new THREE.BoxGeometry(5, 0.05, 7);
        const bed3Floor = new THREE.Mesh(bed3FloorGeo, woodFloorMaterial);
        bed3Floor.position.set(-0.5, 0.025, -6.5);
        bed3Floor.receiveShadow = true;
        modelGroup.add(bed3Floor);
      }

      // F. Balcony Deck (Wood decking planks)
      const balconyFloorGeo = new THREE.BoxGeometry(9.5, 0.05, 4.5);
      const balconyFloor = new THREE.Mesh(balconyFloorGeo, balconyDeckMaterial);
      balconyFloor.position.set(4, 0.025, 8.5);
      balconyFloor.receiveShadow = true;
      modelGroup.add(balconyFloor);

      // ─── 3. CUTAWAY WALLS (Height: 1.5 units) ────────────────────────
      const wallH = 1.4;
      const wallT = 0.28;

      const addWall = (
        x: number,
        z: number,
        w: number,
        d: number,
        isAccent = false
      ) => {
        const geo = new THREE.BoxGeometry(w, wallH, d);
        const mesh = new THREE.Mesh(
          geo,
          isAccent ? wallAccentMaterial : wallMaterial
        );
        mesh.position.set(x, wallH / 2, z);
        mesh.castShadow = true;
        mesh.receiveShadow = true;
        modelGroup.add(mesh);
        return mesh;
      };

      // Outer boundary cutaway walls
      addWall(-10.5, 0, wallT, 18); // Left outer wall
      addWall(10, -2, wallT, 15.5); // Right outer wall
      addWall(0, -9.8, 21, wallT); // Back outer wall
      addWall(-6.5, 9, 8, wallT); // Front left wall
      addWall(9.5, 9, 2, wallT); // Balcony right return wall

      // Interior partition walls
      // Vertical spine dividing bedrooms from living
      addWall(-2.5, 0, wallT, 17.5);
      // Horizontal wall between Master Bed & Bed 2
      addWall(-6.5, 0.3, 8, wallT);
      // Kitchen partition wall
      addWall(3, -6, wallT, 7.5);
      // TV Entertainment feature accent wall in Living Room
      addWall(2.5, -4, 4.5, wallT, true);

      // ─── 4. BALCONY GLASS RAILING ────────────────────────────────────
      const glassGeo = new THREE.BoxGeometry(9.5, 0.85, 0.06);
      const glassRailing = new THREE.Mesh(glassGeo, glassMaterial);
      glassRailing.position.set(4, 0.45, 10.7);
      modelGroup.add(glassRailing);

      // Railing top handrail (brass gold)
      const handrailGeo = new THREE.BoxGeometry(9.55, 0.05, 0.1);
      const handrail = new THREE.Mesh(handrailGeo, goldBrassMaterial);
      handrail.position.set(4, 0.88, 10.7);
      modelGroup.add(handrail);

      // ─── 5. FURNITURE: LIVING & DINING ───────────────────────────────
      // Sectional Sofa L-Shape
      const sofaMainGeo = new THREE.BoxGeometry(4.2, 0.55, 1.6);
      const sofaMain = new THREE.Mesh(sofaMainGeo, fabricSofaMaterial);
      sofaMain.position.set(0.5, 0.3, 2.8);
      sofaMain.castShadow = true;
      modelGroup.add(sofaMain);

      const sofaBackGeo = new THREE.BoxGeometry(4.2, 0.5, 0.4);
      const sofaBack = new THREE.Mesh(sofaBackGeo, fabricSofaMaterial);
      sofaBack.position.set(0.5, 0.7, 3.4);
      modelGroup.add(sofaBack);

      // Sofa return (chaise)
      const sofaChaiseGeo = new THREE.BoxGeometry(1.5, 0.55, 2.2);
      const sofaChaise = new THREE.Mesh(sofaChaiseGeo, fabricSofaMaterial);
      sofaChaise.position.set(-1.0, 0.3, 1.5);
      sofaChaise.castShadow = true;
      modelGroup.add(sofaChaise);

      // Gold throw pillows on sofa
      const pillowGeo = new THREE.BoxGeometry(0.5, 0.35, 0.15);
      const pillow1 = new THREE.Mesh(pillowGeo, goldBrassMaterial);
      pillow1.position.set(1.6, 0.65, 3.1);
      pillow1.rotation.y = 0.1;
      modelGroup.add(pillow1);

      const pillow2 = new THREE.Mesh(pillowGeo, goldBrassMaterial);
      pillow2.position.set(-0.8, 0.65, 2.3);
      pillow2.rotation.y = Math.PI / 2;
      modelGroup.add(pillow2);

      // Designer Coffee Table
      const coffeeTableGeo = new THREE.CylinderGeometry(1.1, 1.1, 0.35, 24);
      const coffeeTableMat = new THREE.MeshStandardMaterial({
        color: 0x2b2b2b,
        roughness: 0.3,
        metalness: 0.2,
      });
      const coffeeTable = new THREE.Mesh(coffeeTableGeo, coffeeTableMat);
      coffeeTable.position.set(0.8, 0.22, 1.0);
      coffeeTable.castShadow = true;
      modelGroup.add(coffeeTable);

      // Wall-mounted TV console on feature wall
      const tvConsoleGeo = new THREE.BoxGeometry(3.6, 0.35, 0.5);
      const tvConsole = new THREE.Mesh(tvConsoleGeo, furnitureWoodMaterial);
      tvConsole.position.set(2.5, 0.2, -3.7);
      modelGroup.add(tvConsole);

      const tvScreenGeo = new THREE.BoxGeometry(2.4, 1.0, 0.05);
      const tvScreenMat = new THREE.MeshStandardMaterial({
        color: 0x111111,
        roughness: 0.1,
        metalness: 0.8,
      });
      const tvScreen = new THREE.Mesh(tvScreenGeo, tvScreenMat);
      tvScreen.position.set(2.5, 0.85, -3.85);
      modelGroup.add(tvScreen);

      // Dining Table with 6 Chairs
      const diningTableGeo = new THREE.BoxGeometry(3.6, 0.6, 2.0);
      const diningTableMat = new THREE.MeshStandardMaterial({
        color: 0xf5f3ee, // Calacatta marble dining top
        roughness: 0.25,
        metalness: 0.1,
      });
      const diningTable = new THREE.Mesh(diningTableGeo, diningTableMat);
      diningTable.position.set(6.5, 0.35, 3.5);
      diningTable.castShadow = true;
      modelGroup.add(diningTable);

      // Dining chairs
      const chairGeo = new THREE.BoxGeometry(0.55, 0.45, 0.55);
      const chairMat = new THREE.MeshStandardMaterial({
        color: 0x3d352e,
        roughness: 0.6,
      });
      for (let i = -1; i <= 1; i++) {
        const chair1 = new THREE.Mesh(chairGeo, chairMat);
        chair1.position.set(6.5 + i * 1.1, 0.25, 2.15);
        modelGroup.add(chair1);

        const chair2 = new THREE.Mesh(chairGeo, chairMat);
        chair2.position.set(6.5 + i * 1.1, 0.25, 4.85);
        modelGroup.add(chair2);
      }

      // ─── 6. KITCHEN COUNTERTOP & APPLIANCES ──────────────────────────
      // L-Shape Kitchen counters
      const counter1Geo = new THREE.BoxGeometry(5.8, 0.75, 1.2);
      const counterMat = new THREE.MeshStandardMaterial({
        color: 0x282725,
        roughness: 0.3,
        metalness: 0.1,
      });
      const counter1 = new THREE.Mesh(counter1Geo, counterMat);
      counter1.position.set(6.5, 0.4, -9.1);
      counter1.castShadow = true;
      modelGroup.add(counter1);

      const counter2Geo = new THREE.BoxGeometry(1.2, 0.75, 4.0);
      const counter2 = new THREE.Mesh(counter2Geo, counterMat);
      counter2.position.set(9.2, 0.4, -6.5);
      counter2.castShadow = true;
      modelGroup.add(counter2);

      // Refrigerator (Stainless steel double door)
      const fridgeGeo = new THREE.BoxGeometry(1.5, 1.6, 1.2);
      const fridgeMat = new THREE.MeshStandardMaterial({
        color: 0xb5b9be,
        metalness: 0.85,
        roughness: 0.2,
      });
      const fridge = new THREE.Mesh(fridgeGeo, fridgeMat);
      fridge.position.set(4.0, 0.8, -9.1);
      fridge.castShadow = true;
      modelGroup.add(fridge);

      // Sink in counter (chrome finish)
      const sinkGeo = new THREE.BoxGeometry(1.0, 0.05, 0.7);
      const sinkMat = new THREE.MeshStandardMaterial({
        color: 0x777777,
        metalness: 0.9,
        roughness: 0.1,
      });
      const sink = new THREE.Mesh(sinkGeo, sinkMat);
      sink.position.set(6.8, 0.78, -9.0);
      modelGroup.add(sink);

      // ─── 7. MASTER BEDROOM SUITE ─────────────────────────────────────
      // King Bed Base & Mattress
      const bedBaseGeo = new THREE.BoxGeometry(3.8, 0.4, 4.2);
      const bedBase = new THREE.Mesh(bedBaseGeo, furnitureWoodMaterial);
      bedBase.position.set(-6.5, 0.22, -4.5);
      bedBase.castShadow = true;
      modelGroup.add(bedBase);

      const mattressGeo = new THREE.BoxGeometry(3.6, 0.35, 4.0);
      const mattress = new THREE.Mesh(mattressGeo, bedLinenMaterial);
      mattress.position.set(-6.5, 0.52, -4.5);
      modelGroup.add(mattress);

      // Plush headboard
      const headboardGeo = new THREE.BoxGeometry(4.2, 1.1, 0.3);
      const headboard = new THREE.Mesh(headboardGeo, furnitureWoodMaterial);
      headboard.position.set(-6.5, 0.7, -6.6);
      modelGroup.add(headboard);

      // Bed pillows
      const pillowMat = new THREE.MeshStandardMaterial({
        color: 0xffffff,
        roughness: 0.7,
      });
      const bedPillow1 = new THREE.Mesh(new THREE.BoxGeometry(1.1, 0.2, 0.65), pillowMat);
      bedPillow1.position.set(-7.4, 0.75, -5.9);
      modelGroup.add(bedPillow1);

      const bedPillow2 = new THREE.Mesh(new THREE.BoxGeometry(1.1, 0.2, 0.65), pillowMat);
      bedPillow2.position.set(-5.6, 0.75, -5.9);
      modelGroup.add(bedPillow2);

      // Bed runner (Gold luxury accent)
      const runnerGeo = new THREE.BoxGeometry(3.65, 0.05, 0.9);
      const runner = new THREE.Mesh(runnerGeo, goldBrassMaterial);
      runner.position.set(-6.5, 0.71, -3.2);
      modelGroup.add(runner);

      // Bedside nightstands with mini lamps
      [-9.0, -4.0].forEach((xPos) => {
        const stand = new THREE.Mesh(
          new THREE.BoxGeometry(0.9, 0.45, 0.7),
          furnitureWoodMaterial
        );
        stand.position.set(xPos, 0.25, -6.3);
        modelGroup.add(stand);

        // Lamp base
        const lamp = new THREE.Mesh(
          new THREE.CylinderGeometry(0.15, 0.2, 0.35, 12),
          goldBrassMaterial
        );
        lamp.position.set(xPos, 0.65, -6.3);
        modelGroup.add(lamp);
      });

      // Master Wardrobe sliding closet
      const wardrobeGeo = new THREE.BoxGeometry(0.6, 1.4, 5.0);
      const wardrobeMat = new THREE.MeshStandardMaterial({
        color: 0xdfd9cf,
        roughness: 0.4,
      });
      const wardrobe = new THREE.Mesh(wardrobeGeo, wardrobeMat);
      wardrobe.position.set(-10.1, 0.7, -4.0);
      modelGroup.add(wardrobe);

      // ─── 8. BEDROOM 2 ────────────────────────────────────────────────
      // Queen bed
      const bed2Base = new THREE.Mesh(
        new THREE.BoxGeometry(3.2, 0.4, 3.8),
        furnitureWoodMaterial
      );
      bed2Base.position.set(-6.5, 0.22, 4.5);
      bed2Base.castShadow = true;
      modelGroup.add(bed2Base);

      const bed2Mat = new THREE.Mesh(
        new THREE.BoxGeometry(3.0, 0.35, 3.6),
        bedLinenMaterial
      );
      bed2Mat.position.set(-6.5, 0.52, 4.5);
      modelGroup.add(bed2Mat);

      // Study desk with chair in Bed 2
      const deskGeo = new THREE.BoxGeometry(2.4, 0.55, 0.9);
      const desk = new THREE.Mesh(deskGeo, furnitureWoodMaterial);
      desk.position.set(-9.0, 0.3, 7.8);
      modelGroup.add(desk);

      // ─── 9. BEDROOM 3 / POOJA SHRINE (if 3 BHK / 4 BHK) ──────────────
      if (numBhk >= 3) {
        // Bed in Bed 3
        const bed3 = new THREE.Mesh(
          new THREE.BoxGeometry(3.0, 0.4, 3.5),
          furnitureWoodMaterial
        );
        bed3.position.set(-0.5, 0.22, -6.5);
        bed3.castShadow = true;
        modelGroup.add(bed3);

        const bed3Mat = new THREE.Mesh(
          new THREE.BoxGeometry(2.8, 0.35, 3.3),
          bedLinenMaterial
        );
        bed3Mat.position.set(-0.5, 0.52, -6.5);
        modelGroup.add(bed3Mat);

        // Sacred Pooja Shrine / Mandir unit near dining
        const mandirGeo = new THREE.BoxGeometry(1.1, 1.2, 0.8);
        const mandir = new THREE.Mesh(mandirGeo, furnitureWoodMaterial);
        mandir.position.set(2.8, 0.6, -1.0);
        modelGroup.add(mandir);

        // Brass bell/finial on mandir
        const bell = new THREE.Mesh(
          new THREE.ConeGeometry(0.12, 0.2, 8),
          goldBrassMaterial
        );
        bell.position.set(2.8, 1.3, -1.0);
        modelGroup.add(bell);
      }

      // ─── 10. BALCONY OUTDOOR PATIO ───────────────────────────────────
      // Outdoor lounge chairs
      const patioChair1 = new THREE.Mesh(
        new THREE.BoxGeometry(1.2, 0.5, 1.2),
        furnitureWoodMaterial
      );
      patioChair1.position.set(1.5, 0.28, 8.5);
      modelGroup.add(patioChair1);

      const patioChair2 = new THREE.Mesh(
        new THREE.BoxGeometry(1.2, 0.5, 1.2),
        furnitureWoodMaterial
      );
      patioChair2.position.set(6.5, 0.28, 8.5);
      modelGroup.add(patioChair2);

      // Outdoor tea table
      const patioTable = new THREE.Mesh(
        new THREE.CylinderGeometry(0.6, 0.6, 0.35, 16),
        goldBrassMaterial
      );
      patioTable.position.set(4.0, 0.2, 8.5);
      modelGroup.add(patioTable);

      // Potted Indoor / Outdoor Plants
      const addPlant = (x: number, z: number, r = 0.5) => {
        // Pot
        const potGeo = new THREE.CylinderGeometry(0.35 * r, 0.25 * r, 0.6 * r, 12);
        const potMat = new THREE.MeshStandardMaterial({
          color: 0xffffff,
          roughness: 0.3,
        });
        const pot = new THREE.Mesh(potGeo, potMat);
        pot.position.set(x, (0.3 * r), z);
        modelGroup.add(pot);

        // Plant foliage sphere
        const foliageGeo = new THREE.DodecahedronGeometry(0.55 * r, 1);
        const foliage = new THREE.Mesh(foliageGeo, foliageMaterial);
        foliage.position.set(x, (0.75 * r), z);
        modelGroup.add(foliage);
      };

      addPlant(8.0, 8.5, 1.1); // Balcony corner plant
      addPlant(0.2, 8.5, 0.9); // Balcony entrance plant
      addPlant(1.5, -3.2, 0.8); // Living room plant beside TV

      scene.add(modelGroup);
      return modelGroup;
    },
    [numBhk]
  );

  // Initialize Three.js WebGL Scene
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Dimensions
    const width = container.clientWidth || 800;
    const height = container.clientHeight || 520;

    // Scene
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // Camera (Isometric perspective angle with optimized near/far planes to eliminate depth-buffer flickering)
    const camera = new THREE.PerspectiveCamera(42, width / height, 0.8, 120);
    camera.position.set(18, 20, 20);
    camera.lookAt(0, 1, 0);
    cameraRef.current = camera;

    // WebGL Renderer with Logarithmic Depth Buffer to prevent coplanar z-fighting on zoom
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
      logarithmicDepthBuffer: true,
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.05;
    container.replaceChildren(renderer.domElement);
    rendererRef.current = renderer;

    // OrbitControls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.maxPolarAngle = Math.PI / 2 - 0.08; // Don't look under floor
    controls.minDistance = 7;
    controls.maxDistance = 45;
    controls.target.set(0, 1, 0);
    controls.autoRotate = isAutoRotating;
    controls.autoRotateSpeed = 0.8;
    controlsRef.current = controls;

    // Lighting
    // Ambient / Hemisphere Light
    const hemiLight = new THREE.HemisphereLight(0xfff8ee, 0xd0c4b4, 1.2);
    scene.add(hemiLight);
    hemiLightRef.current = hemiLight;

    // Directional Sunlight with normalBias to eliminate shadow acne / chattering on zoom
    const sunLight = new THREE.DirectionalLight(0xfff3db, 1.8);
    sunLight.position.set(22, 30, 18);
    sunLight.castShadow = true;
    sunLight.shadow.mapSize.width = 2048;
    sunLight.shadow.mapSize.height = 2048;
    sunLight.shadow.camera.near = 5;
    sunLight.shadow.camera.far = 60;
    sunLight.shadow.camera.left = -16;
    sunLight.shadow.camera.right = 16;
    sunLight.shadow.camera.top = 16;
    sunLight.shadow.camera.bottom = -16;
    sunLight.shadow.bias = -0.00008;
    sunLight.shadow.normalBias = 0.025;
    scene.add(sunLight);
    sunLightRef.current = sunLight;

    // Warm Interior Point Lights
    const warmPoints: THREE.PointLight[] = [];
    const addPoint = (x: number, y: number, z: number, intensity = 1.5, color = 0xffe2b8) => {
      const pl = new THREE.PointLight(color, intensity, 12, 1.2);
      pl.position.set(x, y, z);
      scene.add(pl);
      warmPoints.push(pl);
    };

    addPoint(2, 2.4, 1); // Living room chandelier
    addPoint(-6.5, 2.2, -4.5, 1.0); // Master bedroom ceiling
    addPoint(6.5, 2.2, -6, 1.2); // Kitchen ceiling
    addPoint(-6.5, 2.2, 4.5, 0.9); // Bed 2
    interiorLightsRef.current = warmPoints;

    // Build the 3D procedural apartment
    buildApartmentModel(scene);

    setLoading(false);

    // Animation Render Loop
    const animate = () => {
      animFrameIdRef.current = requestAnimationFrame(animate);

      // Smooth camera interpolation when zooming into a room
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

    // Resize Observer
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
        // Dramatic warm evening sunset look
        sunLightRef.current.color.setHex(0xffaa55);
        sunLightRef.current.intensity = 0.9;
        hemiLightRef.current.color.setHex(0xffeedd);
        hemiLightRef.current.groundColor.setHex(0x2a2535);
        hemiLightRef.current.intensity = 0.6;
        interiorLightsRef.current.forEach((pl) => (pl.intensity = 2.8));
      } else {
        // Crisp bright day look
        sunLightRef.current.color.setHex(0xfff3db);
        sunLightRef.current.intensity = 1.8;
        hemiLightRef.current.color.setHex(0xfff8ee);
        hemiLightRef.current.groundColor.setHex(0xd0c4b4);
        hemiLightRef.current.intensity = 1.2;
        interiorLightsRef.current.forEach((pl) => (pl.intensity = 1.5));
      }
    }
  };

  // Handle Camera view preset clicks (Isometric, Top-Down, Front)
  const setPresetView = (view: "iso" | "top" | "front") => {
    setCameraView(view);
    setActiveRoom(null);
    let targetPos: [number, number, number] = [18, 20, 20];
    let lookTarget: [number, number, number] = [0, 1, 0];

    if (view === "top") {
      targetPos = [0, 26, 0.1];
      lookTarget = [0, 0, 0];
    } else if (view === "front") {
      targetPos = [0, 10, 24];
      lookTarget = [0, 1.5, 0];
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
    <div className="relative w-full aspect-[16/10] min-h-[440px] md:min-h-[520px] bg-gradient-to-b from-[#FAF7F2] to-[#F2EDE4] rounded-2xl overflow-hidden border border-[#E8E4DC] select-none flex flex-col">
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
        <div className="pointer-events-auto flex items-center gap-2 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-full border border-[#E8E4DC] shadow-sm">
          <span className="size-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-[10.5px] font-bold tracking-[0.2em] uppercase text-[#1c1b1b]">
            Interactive 3D Cutaway
          </span>
          <span className="text-[10px] text-[#72716d]">· 360° Orbit</span>
        </div>

        {/* Right: View & Lighting Controls */}
        <div className="pointer-events-auto flex items-center gap-1.5 bg-white/90 backdrop-blur-md p-1 rounded-full border border-[#E8E4DC] shadow-sm">
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
              className={`px-2 py-0.5 rounded text-[10px] uppercase font-semibold transition-all cursor-pointer ${
                cameraView === "iso" && !activeRoom
                  ? "bg-[#B08D57] text-white"
                  : "text-[#72716d] hover:text-[#1c1b1b]"
              }`}
            >
              Isometric
            </button>
            <button
              onClick={() => setPresetView("top")}
              className={`px-2 py-0.5 rounded text-[10px] uppercase font-semibold transition-all cursor-pointer ${
                cameraView === "top" && !activeRoom
                  ? "bg-[#B08D57] text-white"
                  : "text-[#72716d] hover:text-[#1c1b1b]"
              }`}
            >
              Top Plan
            </button>
            <button
              onClick={() => setPresetView("front")}
              className={`px-2 py-0.5 rounded text-[10px] uppercase font-semibold transition-all cursor-pointer ${
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
        <div className="pointer-events-auto flex flex-wrap gap-1.5 bg-white/92 backdrop-blur-md p-1.5 rounded-xl border border-[#E8E4DC] shadow-md max-w-full overflow-x-auto">
          <span className="text-[10px] font-bold tracking-wider uppercase text-[#72716d] px-2 py-1 hidden sm:inline self-center">
            Inspect Room:
          </span>
          {roomTargets.map((r) => {
            const isSelected = activeRoom === r.name;
            return (
              <button
                key={r.name}
                onClick={() => focusRoom(r)}
                className={`px-2.5 py-1 rounded-lg text-[11px] font-medium transition-all flex items-center gap-1.5 cursor-pointer whitespace-nowrap ${
                  isSelected
                    ? "bg-[#1c1b1b] text-white shadow-sm"
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
        <div className="pointer-events-none hidden lg:flex items-center gap-2 bg-black/65 backdrop-blur-sm text-white/80 text-[10px] px-3 py-1.5 rounded-full self-end shadow">
          <span className="material-symbols-outlined text-xs text-[#B08D57]">touch_app</span>
          <span>Left-click drag to orbit · Scroll to zoom · Right-click drag to pan</span>
        </div>
      </div>
    </div>
  );
}
