import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { SECTORS, getSectorForTicker } from '../utils/marketData';

export default function ThreeCanvas({
  stocks,
  heightMetric,
  areaMetric,
  colorMetric,
  selectedSector,
  searchQuery,
  selectedStock,
  onSelectStock,
  layoutShape
}) {
  const containerRef = useRef(null);
  const tooltipRef = useRef(null);
  
  // Track hovered stock to display tooltip content
  const [hoveredStock, setHoveredStock] = useState(null);
  const [sectorLabels, setSectorLabels] = useState([]);
  
  // Keep refs of Three.js objects for dynamic updates
  const sceneRef = useRef(null);
  const cameraRef = useRef(null);
  const controlsRef = useRef(null);
  const blocksGroupRef = useRef(null);
  const hoverOutlineRef = useRef(null);
  const shadesGroupRef = useRef(null);
  
  // Map of symbol -> Mesh to find meshes quickly for highlighting/animation
  const meshesMapRef = useRef(new Map());

  // Handle resizing
  useEffect(() => {
    if (!containerRef.current) return;
    
    const handleResize = () => {
      const width = containerRef.current.clientWidth;
      const height = containerRef.current.clientHeight;
      
      if (cameraRef.current && sceneRef.current) {
        cameraRef.current.aspect = width / height;
        cameraRef.current.updateProjectionMatrix();
      }
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Main Three.js setup effect
  useEffect(() => {
    if (!containerRef.current) return;

    const width = containerRef.current.clientWidth;
    const height = containerRef.current.clientHeight;

    // 1. Create Scene
    const scene = new THREE.Scene();
    scene.background = new THREE.Color('#f8fafc'); 
    scene.fog = new THREE.Fog('#f8fafc', 150, 450);
    sceneRef.current = scene;

    // 2. Create Camera
    const camera = new THREE.PerspectiveCamera(42, width / height, 0.1, 1000);
    // Position camera based on layout shape for optimal framing
    if (layoutShape === '2-sided') {
      camera.position.set(45, 55, 65); // look down the river channel
    } else {
      camera.position.set(0, 60, 75); // angled bird's eye view
    }
    cameraRef.current = camera;

    // 3. Create Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.0;
    
    // Clear previous canvas
    containerRef.current.innerHTML = '';
    containerRef.current.appendChild(renderer.domElement);

    // 4. Create Orbit Controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.maxPolarAngle = Math.PI / 2 - 0.05; // don't go below ground
    controls.minDistance = 15;
    controls.maxDistance = 180;
    controls.target.set(0, 0, 0);
    controlsRef.current = controls;

    // 5. Setup Lights
    const ambientLight = new THREE.AmbientLight('#ffffff', 0.4);
    scene.add(ambientLight);

    // Sunlight shadow caster
    const dirLight = new THREE.DirectionalLight('#ffffff', 0.8);
    dirLight.position.set(30, 80, 40);
    dirLight.castShadow = true;
    dirLight.shadow.mapSize.width = 2048;
    dirLight.shadow.mapSize.height = 2048;
    dirLight.shadow.camera.near = 0.5;
    dirLight.shadow.camera.far = 200;
    const d = 50;
    dirLight.shadow.camera.left = -d;
    dirLight.shadow.camera.right = d;
    dirLight.shadow.camera.top = d;
    dirLight.shadow.camera.bottom = -d;
    dirLight.shadow.bias = -0.0005;
    scene.add(dirLight);



    // 6. Generate Ground (Uniform Solid Concrete base plane extending in all directions)
    const terrainGroup = new THREE.Group();
    scene.add(terrainGroup);

    const terrainMat = new THREE.MeshStandardMaterial({
      color: '#64748b', // Strong concrete slate grey base color for high contrast
      roughness: 0.85,
      metalness: 0.15,
      flatShading: true
    });

    const terrainGeo = new THREE.PlaneGeometry(1000, 1000);
    terrainGeo.rotateX(-Math.PI / 2);
    const terrainMesh = new THREE.Mesh(terrainGeo, terrainMat);
    terrainMesh.position.y = -0.2;
    terrainMesh.receiveShadow = true;
    terrainGroup.add(terrainMesh);

    // Generate sector divider lines on the base (flat concrete surface at y = -0.18)
    const lineVertices = [];

    if (layoutShape === '2-sided') {
      // Left bank boundaries and dividers
      lineVertices.push(-48, -0.18, -48,  -10, -0.18, -48);
      lineVertices.push(-48, -0.18,  48,  -10, -0.18,  48);
      lineVertices.push(-48, -0.18, -48,  -48, -0.18,  48);
      lineVertices.push(-10, -0.18, -48,  -10, -0.18,  48);
      
      // Left dividers (5 sectors => 4 dividers)
      for (let j = 1; j < 5; j++) {
        const zVal = -44 + j * (88 / 5);
        lineVertices.push(-48, -0.18, zVal,  -10, -0.18, zVal);
      }
      
      // Right bank boundaries and dividers
      lineVertices.push(10, -0.18, -48,  48, -0.18, -48);
      lineVertices.push(10, -0.18,  48,  48, -0.18,  48);
      lineVertices.push(10, -0.18, -48,  10, -0.18,  48);
      lineVertices.push(48, -0.18, -48,  48, -0.18,  48);
      
      // Right dividers (6 sectors => 5 dividers)
      for (let k = 1; k < 6; k++) {
        const zVal = -44 + k * (88 / 6);
        lineVertices.push(10, -0.18, zVal,  48, -0.18, zVal);
      }
    } else {
      // 4-sided outlines
      // Outer square
      lineVertices.push(-48, -0.18, -48,   48, -0.18, -48);
      lineVertices.push( 48, -0.18, -48,   48, -0.18,  48);
      lineVertices.push( 48, -0.18,  48,  -48, -0.18,  48);
      lineVertices.push(-48, -0.18,  48,  -48, -0.18, -48);
      
      // Inner square
      lineVertices.push(-15, -0.18, -15,   15, -0.18, -15);
      lineVertices.push( 15, -0.18, -15,   15, -0.18,  15);
      lineVertices.push( 15, -0.18,  15,  -15, -0.18,  15);
      lineVertices.push(-15, -0.18,  15,  -15, -0.18, -15);
      
      // Corner diagonals separating the sides
      lineVertices.push(-48, -0.18, -48,  -15, -0.18, -15);
      lineVertices.push( 48, -0.18, -48,   15, -0.18, -15);
      lineVertices.push( 48, -0.18,  48,   15, -0.18,  15);
      lineVertices.push(-48, -0.18,  48,  -15, -0.18,  15);
      
      // North dividers (3 sectors => 2 dividers along X, running from z = 15 to 48)
      for (let j = 1; j < 3; j++) {
        const xVal = -44 + j * (88 / 3);
        lineVertices.push(xVal, -0.18, 15,  xVal, -0.18, 48);
      }
      
      // East dividers (3 sectors => 2 dividers along Z, running from x = 15 to 48)
      for (let j = 1; j < 3; j++) {
        const zVal = -44 + j * (88 / 3);
        lineVertices.push(15, -0.18, zVal,  48, -0.18, zVal);
      }
      
      // South dividers (3 sectors => 2 dividers along X, running from z = -15 to -48)
      for (let j = 1; j < 3; j++) {
        const xVal = 44 - j * (88 / 3);
        lineVertices.push(xVal, -0.18, -15,  xVal, -0.18, -48);
      }
      
      // West dividers (2 sectors => 1 divider along Z, running from x = -15 to -48)
      for (let j = 1; j < 2; j++) {
        const zVal = 44 - j * (88 / 2);
        lineVertices.push(-15, -0.18, zVal,  -48, -0.18, zVal);
      }
    }

    const linesGeo = new THREE.BufferGeometry();
    linesGeo.setAttribute('position', new THREE.Float32BufferAttribute(lineVertices, 3));
    const linesMat = new THREE.LineBasicMaterial({
      color: '#1e293b', // Darker slate-grey divider color for high contrast on the grey base
      linewidth: 2.0
    });
    const sectorLinesMesh = new THREE.LineSegments(linesGeo, linesMat);
    scene.add(sectorLinesMesh);

    // 7. Create Stock Blocks Group
    const blocksGroup = new THREE.Group();
    scene.add(blocksGroup);
    blocksGroupRef.current = blocksGroup;

    const shadesGroup = new THREE.Group();
    scene.add(shadesGroup);
    shadesGroupRef.current = shadesGroup;

    // 8. Add Hover Outline Mesh
    const outlineGeo = new THREE.BoxGeometry(1.02, 1.02, 1.02);
    const outlineMat = new THREE.MeshBasicMaterial({
      color: '#4f46e5',
      wireframe: true,
      transparent: true,
      opacity: 0.0
    });
    const hoverOutline = new THREE.Mesh(outlineGeo, outlineMat);
    scene.add(hoverOutline);
    hoverOutlineRef.current = hoverOutline;

    // Setup Raycasting for Mouse Interaction
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();
    let hoveredMesh = null;
    
    const handleMouseMove = (event) => {
      const rect = renderer.domElement.getBoundingClientRect();
      mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
      
      // Update tooltip position
      if (tooltipRef.current) {
        tooltipRef.current.style.left = `${event.clientX}px`;
        tooltipRef.current.style.top = `${event.clientY}px`;
      }
    };

    const handleMouseClick = () => {
      if (hoveredMesh) {
        const stockData = hoveredMesh.userData.stock;
        onSelectStock(stockData);
      }
    };

    renderer.domElement.addEventListener('mousemove', handleMouseMove);
    renderer.domElement.addEventListener('click', handleMouseClick);

    // 9. Animation Loop
    const clock = new THREE.Clock();
    let animationFrameId;

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      
      const elapsedTime = clock.getElapsedTime();
      
      // A. Water Waves animation removed as floor is solid concrete.

      // B. Update Raycaster
      raycaster.setFromCamera(mouse, camera);
      
      if (blocksGroup.children.length > 0) {
        const intersects = raycaster.intersectObjects(blocksGroup.children);
        
        if (intersects.length > 0) {
          const intersected = intersects[0].object;
          
          if (hoveredMesh !== intersected) {
            if (hoveredMesh) {
              setMeshEmissiveIntensity(hoveredMesh, hoveredMesh.userData.originalEmissiveIntensity);
              hoveredMesh.scale.set(1, 1, 1);
            }
            
            hoveredMesh = intersected;
            setHoveredStock(intersected.userData.stock);
            
            hoveredMesh.userData.originalEmissiveIntensity = getMeshEmissiveIntensity(hoveredMesh);
            setMeshEmissiveIntensity(hoveredMesh, Math.min(2.0, hoveredMesh.userData.originalEmissiveIntensity + 0.6));
            hoveredMesh.scale.set(1.03, 1.03, 1.03);
            
            // outline helper sizing
            hoverOutline.position.copy(hoveredMesh.position);
            hoverOutline.scale.copy(hoveredMesh.scale).multiplyScalar(1.01);
            hoverOutline.scale.y = hoveredMesh.scale.y; 
            hoverOutline.rotation.copy(hoveredMesh.rotation);
            hoverOutline.material.opacity = 0.65;
            
            if (tooltipRef.current) {
              tooltipRef.current.style.display = 'flex';
            }
          }
        } else {
          if (hoveredMesh) {
            setMeshEmissiveIntensity(hoveredMesh, hoveredMesh.userData.originalEmissiveIntensity);
            hoveredMesh.scale.set(1, 1, 1);
            hoveredMesh = null;
            setHoveredStock(null);
            
            hoverOutline.material.opacity = 0;
            if (tooltipRef.current) {
              tooltipRef.current.style.display = 'none';
            }
          }
        }
      }

      // C. Project 3D Sector Labels to 2D Screen Space
      updateSectorLabels(camera, width, height);
      
      // D. Update Controls and Render
      controls.update();
      renderer.render(scene, camera);
    };

    // Helper to project 3D coordinate of sectors to screen-space HTML tags
    const updateSectorLabels = (cam, w, h) => {
      const keys = Object.keys(SECTORS);
      const labelsData = keys.map((key, idx) => {
        let lx = 0, lz = 0;
        const ly = 0.5; // height above ground
        
        // Calculate mid position of each sector's waterfront section
        if (layoutShape === '2-sided') {
          // Left side: sectors 0, 1, 2, 3, 4
          // Right side: sectors 5, 6, 7, 8, 9, 10
          if (idx < 5) {
            const zPct = (idx + 0.5) / 5;
            lz = -44 + zPct * 88;
            lx = -11.5; // edge of left bank
          } else {
            const zPct = (idx - 5 + 0.5) / 6;
            lz = -44 + zPct * 88;
            lx = 11.5; // edge of right bank
          }
        } else {
          // 4-Sided: North (0-2), East (3-5), South (6-8), West (9-10)
          if (idx < 3) {
            // North: z = 16.5, x along coast
            const xPct = (idx + 0.5) / 3;
            lx = -44 + xPct * 88;
            lz = 16.5;
          } else if (idx < 6) {
            // East: x = 16.5, z along coast
            const zPct = (idx - 3 + 0.5) / 3;
            lz = -44 + zPct * 88;
            lx = 16.5;
          } else if (idx < 9) {
            // South: z = -16.5, x along coast
            const xPct = (idx - 6 + 0.5) / 3;
            lx = 44 - xPct * 88; // reverse flow
            lz = -16.5;
          } else {
            // West: x = -16.5, z along coast
            const zPct = (idx - 9 + 0.5) / 2;
            lz = 44 - zPct * 88;
            lx = -16.5;
          }
        }
        
        const tempV = new THREE.Vector3(lx, ly, lz);
        tempV.project(cam);
        
        const isBehind = tempV.z > 1.0;
        
        const xScreen = (tempV.x * 0.5 + 0.5) * w;
        const yScreen = (-tempV.y * 0.5 + 0.5) * h;
        
        return {
          id: key,
          name: SECTORS[key].label,
          color: `hsl(${SECTORS[key].hue}, 85%, 32%)`, // High contrast color
          x: xScreen,
          y: yScreen,
          visible: !isBehind,
        };
      });
      setSectorLabels(labelsData);
    };

    animate();

    // Clean up
    return () => {
      cancelAnimationFrame(animationFrameId);
      if (renderer.domElement && containerRef.current) {
        renderer.domElement.removeEventListener('mousemove', handleMouseMove);
        renderer.domElement.removeEventListener('click', handleMouseClick);
        containerRef.current.innerHTML = '';
      }
      
      scene.remove(sectorLinesMesh);
      linesGeo.dispose();
      linesMat.dispose();
      terrainMat.dispose();
      outlineGeo.dispose();
      outlineMat.dispose();
      renderer.dispose();

      scene.remove(shadesGroup);
      shadesGroup.children.forEach(child => {
        child.geometry.dispose();
        child.material.dispose();
      });
    };
  }, [onSelectStock, layoutShape]);

  // Re-generate blocks when data or visual configuration changes
  useEffect(() => {
    const scene = sceneRef.current;
    const blocksGroup = blocksGroupRef.current;
    if (!scene || !blocksGroup || !stocks || stocks.length === 0) return;

    // Remove old blocks
    while (blocksGroup.children.length > 0) {
      const child = blocksGroup.children[0];
      child.geometry.dispose();
      if (Array.isArray(child.material)) {
        child.material.forEach(mat => mat.dispose());
      } else {
        child.material.dispose();
      }
      if (child.userData.topTexture) {
        child.userData.topTexture.dispose();
      }
      blocksGroup.remove(child);
    }
    meshesMapRef.current.clear();

    // Remove old shades
    const shadesGroup = shadesGroupRef.current;
    if (shadesGroup) {
      while (shadesGroup.children.length > 0) {
        const child = shadesGroup.children[0];
        child.geometry.dispose();
        if (Array.isArray(child.material)) {
          child.material.forEach(mat => mat.dispose());
        } else {
          child.material.dispose();
        }
        shadesGroup.remove(child);
      }
    }

    const sectorKeys = Object.keys(SECTORS);

    // Group stocks by sector
    const stocksBySector = {};
    sectorKeys.forEach(k => { stocksBySector[k] = []; });
    
    stocks.forEach(stock => {
      const sector = getSectorForTicker(stock.symbol);
      if (sector && stocksBySector[sector]) {
        stocksBySector[sector].push(stock);
      }
    });

    // Define sector distribution parameters
    let sectorPlacements = {};
    if (layoutShape === '2-sided') {
      // Left side: sectors 0,1,2,3,4. Right side: sectors 5,6,7,8,9,10
      sectorKeys.forEach((key, idx) => {
        if (idx < 5) {
          const L_c = 88 / 5;
          sectorPlacements[key] = {
            side: 'left',
            cStart: -44 + idx * L_c,
            cEnd: -44 + (idx + 1) * L_c,
            L_c: L_c
          };
        } else {
          const L_c = 88 / 6;
          const localIdx = idx - 5;
          sectorPlacements[key] = {
            side: 'right',
            cStart: -44 + localIdx * L_c,
            cEnd: -44 + (localIdx + 1) * L_c,
            L_c: L_c
          };
        }
      });
    } else {
      // 4-Sided: North (3 sectors), East (3 sectors), South (3 sectors), West (2 sectors)
      sectorKeys.forEach((key, idx) => {
        if (idx < 3) {
          const L_c = 88 / 3;
          sectorPlacements[key] = {
            side: 'north',
            cStart: -44 + idx * L_c,
            cEnd: -44 + (idx + 1) * L_c,
            L_c: L_c
          };
        } else if (idx < 6) {
          const L_c = 88 / 3;
          const localIdx = idx - 3;
          sectorPlacements[key] = {
            side: 'east',
            cStart: -44 + localIdx * L_c,
            cEnd: -44 + (localIdx + 1) * L_c,
            L_c: L_c
          };
        } else if (idx < 9) {
          const L_c = 88 / 3;
          const localIdx = idx - 6;
          sectorPlacements[key] = {
            side: 'south',
            cStart: 44 - localIdx * L_c,
            cEnd: 44 - (localIdx + 1) * L_c,
            L_c: L_c
          };
        } else {
          const L_c = 88 / 2;
          const localIdx = idx - 9;
          sectorPlacements[key] = {
            side: 'west',
            cStart: 44 - localIdx * L_c,
            cEnd: 44 - (localIdx + 1) * L_c,
            L_c: L_c
          };
        }
      });
    }

    const gap = 0.03; // tiny gap between packed columns/rows

    // Loop through sectors and pack blocks
    sectorKeys.forEach((sectorKey) => {
      const sectorStocks = stocksBySector[sectorKey];
      if (!sectorStocks || sectorStocks.length === 0) return;

      const placement = sectorPlacements[sectorKey];
      const sectorColorConfig = SECTORS[sectorKey];
      
      // Sort stocks by Market Cap descending
      const sortedStocks = [...sectorStocks].sort((a, b) => b.marketCap - a.marketCap);
      const totalInSector = sortedStocks.length;

      // Split into two columns: waterfront (large-cap) and inland (small-cap)
      let waterfrontStocks = [];
      let inlandStocks = [];
      
      if (totalInSector === 1) {
        waterfrontStocks = [sortedStocks[0]];
      } else {
        const numWaterfront = Math.ceil(totalInSector / 2);
        waterfrontStocks = sortedStocks.slice(0, numWaterfront);
        inlandStocks = sortedStocks.slice(numWaterfront);
      }

      // Helper to lay out blocks in a column packed along the coast axis
      const layoutColumn = (colStocks, columnType) => {
        const K = colStocks.length;
        if (K === 0) return;

        // Calculate size factors
        const sizeFactors = colStocks.map(stock => {
          let footprintVal = stock.marketCap;
          if (areaMetric === 'volume') footprintVal = stock.volume;
          if (areaMetric === 'price') footprintVal = stock.price;

          if (areaMetric === 'marketCap') {
            return Math.max(0.7, Math.min(3.2, 0.5 + Math.log10(footprintVal / 1e9) * 0.8));
          } else if (areaMetric === 'volume') {
            return Math.max(0.7, Math.min(3.2, 0.4 + Math.log10(footprintVal / 1e5) * 0.7));
          } else {
            return Math.max(0.7, Math.min(3.2, 0.4 + Math.log10(footprintVal) * 0.7));
          }
        });

        // Sum size factors to distribute coast width proportionally
        const sumSizeFactors = sizeFactors.reduce((a, b) => a + b, 0);

        let accumulatedWidth = 0;
        colStocks.forEach((stock, colIdx) => {
          const sizeFactor = sizeFactors[colIdx];
          
          // Proportional width along coast
          const wAllocated = (sizeFactor / sumSizeFactors) * Math.abs(placement.cEnd - placement.cStart);
          
          // Center coordinate along coast
          const cCenter = Math.min(placement.cStart, placement.cEnd) + accumulatedWidth + wAllocated / 2;
          accumulatedWidth += wAllocated;

          // Perpendicular depth inland
          // For inland column, keep a flat back-border of 14 units.
          // For waterfront column, let depth be dynamic to represent sizeFactor, creating the jagged coast.
          let dValue = 14.0;
          if (columnType === 'waterfront') {
            dValue = Math.max(3.0, Math.min(14.0, sizeFactor * 4.2));
          }

          // Compute absolute global dimensions and centers
          const transform = getBlockTransform(placement.side, columnType, cCenter, dValue, placement.L_c, wAllocated, sizeFactor);

          // Height mapping
          let heightVal = stock.changePercent;
          let boxHeight = 2.5;

          if (heightMetric === 'performance') {
            boxHeight = Math.max(0.3, 2.5 + heightVal * 0.7);
          } else if (heightMetric === 'marketCap') {
            boxHeight = Math.max(0.5, Math.log10(stock.marketCap / 1e9) * 2.2);
          } else if (heightMetric === 'price') {
            boxHeight = Math.max(0.5, Math.log10(stock.price) * 2.2);
          } else {
            boxHeight = Math.max(0.5, Math.log10(stock.volume / 1e5) * 2.0);
          }

          // Color mapping
          let matColor = new THREE.Color();
          let emissiveColor = new THREE.Color();
          let emissiveInt = 0.25;

          if (colorMetric === 'performance') {
            const change = stock.changePercent;
            
            if (change > 0) {
              const t = Math.min(1.0, change / 3.0); 
              matColor.set('#cbd5e1').lerp(new THREE.Color('#10b981'), t);
              emissiveColor.set('#10b981').multiplyScalar(t);
              emissiveInt = t * 0.4;
            } else if (change < 0) {
              const t = Math.min(1.0, -change / 3.0); 
              matColor.set('#cbd5e1').lerp(new THREE.Color('#ef4444'), t);
              emissiveColor.set('#ef4444').multiplyScalar(t);
              emissiveInt = t * 0.4;
            } else {
              matColor.set('#cbd5e1');
              emissiveColor.set('#000000');
              emissiveInt = 0.0;
            }
          } else {
            const sectorHue = sectorColorConfig.hue;
            const performanceOffset = Math.max(-15, Math.min(15, stock.changePercent * 3));
            const lightness = Math.max(30, Math.min(75, 52 + performanceOffset));
            
            matColor.setHSL(sectorHue / 360, 0.85, lightness / 100);
            emissiveColor.setHSL(sectorHue / 360, 0.9, 0.5);
            emissiveInt = 0.28;
          }

          // Create Box Mesh
          const geometry = new THREE.BoxGeometry(transform.scaleX, boxHeight, transform.scaleZ);
          // Origin to bottom of column
          geometry.translate(0, boxHeight / 2, 0);

          const sideMaterial = new THREE.MeshStandardMaterial({
            color: matColor,
            roughness: 0.15,
            metalness: 0.85,
            emissive: emissiveColor,
            emissiveIntensity: emissiveInt,
            flatShading: true
          });

          // Create canvas texture for the top face to draw the ticker symbol
          const topTexture = createBlockTexture(stock.symbol, '#' + matColor.getHexString());
          const topMaterial = new THREE.MeshStandardMaterial({
            color: '#ffffff', // base white color so the texture colors show correctly
            map: topTexture,
            roughness: 0.15,
            metalness: 0.85,
            emissive: emissiveColor,
            emissiveIntensity: emissiveInt,
            flatShading: true
          });

          // Materials array order: [+X, -X, +Y (Top), -Y, +Z, -Z]
          const materials = [
            sideMaterial, // +X
            sideMaterial, // -X
            topMaterial,  // +Y (Top)
            sideMaterial, // -Y
            sideMaterial, // +Z
            sideMaterial  // -Z
          ];

          const box = new THREE.Mesh(geometry, materials);
          box.position.set(transform.x, -0.2, transform.z); // align base on ground plane
          box.rotation.y = transform.rotationY;
          
          box.castShadow = true;
          box.receiveShadow = true;
          
          box.userData = {
            stock: stock,
            originalColor: matColor.clone(),
            originalEmissive: emissiveColor.clone(),
            originalEmissiveIntensity: emissiveInt,
            sector: sectorKey,
            topTexture: topTexture
          };

          // Apply selected highlight outline
          if (selectedStock && selectedStock.symbol === stock.symbol) {
            setMeshEmissiveIntensity(box, 1.8);
            box.scale.set(1.05, 1.05, 1.05);
            
            const outline = hoverOutlineRef.current;
            if (outline) {
              outline.position.copy(box.position);
              outline.scale.copy(box.scale).multiplyScalar(1.01);
              outline.scale.y = box.scale.y;
              outline.rotation.copy(box.rotation);
              outline.material.opacity = 0.8;
              outline.material.color.set('#4f46e5');
            }
          }

          // Apply search highlights (glow and size boost) so matches stand out
          let isSearchMatch = false;
          if (searchQuery) {
            const query = searchQuery.toLowerCase();
            isSearchMatch = stock.symbol.toLowerCase().includes(query) || stock.name.toLowerCase().includes(query);
          }
          
          if (isSearchMatch) {
            const currentInt = getMeshEmissiveIntensity(box);
            setMeshEmissiveIntensity(box, Math.min(1.8, currentInt + 0.8));
            box.scale.set(1.02, 1.02, 1.02);
          }

          // Apply filter transparencies - only sector selections can dim other blocks.
          // Search matches will be highlighted, but other blocks remain visible.
          let opacityVal = 1.0;
          if (selectedSector && selectedSector !== sectorKey) {
            opacityVal = 0.45;
          }
          
          if (opacityVal < 1.0) {
            setMeshOpacity(box, opacityVal);
            box.castShadow = false;
          }

          blocksGroup.add(box);
          meshesMapRef.current.set(stock.symbol, box);
        });
      };

      // Lay out both columns
      layoutColumn(inlandStocks, 'inland');
      layoutColumn(waterfrontStocks, 'waterfront');
    });

    // Generate Sector Shading Planes
    if (shadesGroup) {
      sectorKeys.forEach((sectorKey) => {
        const placement = sectorPlacements[sectorKey];
        if (!placement) return;
        
        const sectorColorConfig = SECTORS[sectorKey];
        if (!sectorColorConfig) return;
        
        const sectorHue = sectorColorConfig.hue;
        
        let opacity = 0.24;
        if (selectedSector && selectedSector !== sectorKey) {
          opacity = 0.05;
        }
        
        let W = 1, H = 1;
        let centerX = 0, centerZ = 0;
        
        const { side, cStart, cEnd } = placement;
        
        if (layoutShape === '2-sided') {
          if (side === 'left') {
            W = 15;
            H = Math.abs(cEnd - cStart);
            centerX = -7.5;
            centerZ = (cStart + cEnd) / 2;
          } else {
            W = 15;
            H = Math.abs(cEnd - cStart);
            centerX = 7.5;
            centerZ = (cStart + cEnd) / 2;
          }
        } else {
          // 4-sided
          if (side === 'north') {
            W = Math.abs(cEnd - cStart);
            H = 15;
            centerX = (cStart + cEnd) / 2;
            centerZ = 7.5;
          } else if (side === 'south') {
            W = Math.abs(cEnd - cStart);
            H = 15;
            centerX = (cStart + cEnd) / 2;
            centerZ = -7.5;
          } else if (side === 'east') {
            W = 15;
            H = Math.abs(cEnd - cStart);
            centerX = 7.5;
            centerZ = (cStart + cEnd) / 2;
          } else if (side === 'west') {
            W = 15;
            H = Math.abs(cEnd - cStart);
            centerX = -7.5;
            centerZ = (cStart + cEnd) / 2;
          }
        }
        
        const shadeGeo = new THREE.PlaneGeometry(W, H);
        shadeGeo.rotateX(-Math.PI / 2);
        
        const shadeMat = new THREE.MeshBasicMaterial({
          color: new THREE.Color().setHSL(sectorHue / 360, 0.85, 0.55),
          transparent: true,
          opacity: opacity,
          side: THREE.DoubleSide
        });
        
        const shadeMesh = new THREE.Mesh(shadeGeo, shadeMat);
        shadeMesh.position.set(centerX, -0.19, centerZ);
        shadesGroup.add(shadeMesh);
      });
    }

  }, [stocks, heightMetric, areaMetric, colorMetric, selectedSector, searchQuery, selectedStock, layoutShape]);


  // getBlockTransform is hoisted to the bottom of this file to keep layout clean and avoid re-declarations.

  // Smooth camera fly-to animation when selected stock changes
  useEffect(() => {
    const camera = cameraRef.current;
    const controls = controlsRef.current;
    if (!camera || !controls || !selectedStock) return;
    
    const targetMesh = meshesMapRef.current.get(selectedStock.symbol);
    if (!targetMesh) return;
    
    const startTarget = controls.target.clone();
    const endTarget = targetMesh.position.clone();
    endTarget.y += 1.0; 
    
    const startCamPos = camera.position.clone();
    
    // Position camera offset from block
    const offsetDir = new THREE.Vector3(0, 0, 1);
    if (layoutShape === '2-sided') {
      // offset along X axis for channel
      offsetDir.set(targetMesh.position.x > 0 ? 12 : -12, 10, 8);
    } else {
      // offset radially
      offsetDir.copy(targetMesh.position).normalize().multiplyScalar(15);
      offsetDir.y = 10;
    }
    
    const endCamPos = targetMesh.position.clone().add(offsetDir);
    
    let animProgress = 0;
    const duration = 40; 
    
    const flyCam = () => {
      animProgress++;
      const t = animProgress / duration;
      const ease = 1 - Math.pow(1 - t, 3);
      
      const currentTarget = new THREE.Vector3().lerpVectors(startTarget, endTarget, ease);
      controls.target.copy(currentTarget);
      
      const currentCamPos = new THREE.Vector3().lerpVectors(startCamPos, endCamPos, ease);
      camera.position.copy(currentCamPos);
      
      if (animProgress < duration) {
        requestAnimationFrame(flyCam);
      }
    };
    
    flyCam();
  }, [selectedStock, layoutShape]);

  // Format currency helper
  const formatCurrency = (val) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(val);
  };

  // Format market cap helper
  const formatMarketCap = (val) => {
    if (val >= 1e12) return `$${(val / 1e12).toFixed(2)}T`;
    if (val >= 1e9) return `$${(val / 1e9).toFixed(2)}B`;
    return `$${(val / 1e6).toFixed(2)}M`;
  };

  return (
    <div className="canvas-container">
      <div ref={containerRef} className="canvas-viewport" />
      
      {/* 2D Projected HTML labels for coast sections */}
      {sectorLabels.map(label => label.visible && (
        <div
          key={label.id}
          style={{
            position: 'absolute',
            left: `${label.x}px`,
            top: `${label.y}px`,
            transform: 'translate(-50%, -50%)',
            pointerEvents: 'none',
            zIndex: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
          }}
        >
          <div
            style={{
              fontFamily: "'Outfit', sans-serif",
              fontSize: '11px',
              fontWeight: 700,
              color: label.color,
              background: 'rgba(255, 255, 255, 0.85)',
              border: `1px solid ${label.color}40`,
              backdropFilter: 'blur(4px)',
              padding: '4px 10px',
              borderRadius: '12px',
              whiteSpace: 'nowrap',
              letterSpacing: '0.5px',
              boxShadow: '0 4px 10px rgba(0,0,0,0.08)',
              opacity: selectedSector && selectedSector !== label.id ? 0.3 : 1.0,
              transition: 'opacity 0.2s ease'
            }}
          >
            {label.name}
          </div>
          {/* Subtle line pointing down to shoreline */}
          <div
            style={{
              width: '1px',
              height: '8px',
              background: `linear-gradient(to bottom, ${label.color}, transparent)`,
              opacity: selectedSector && selectedSector !== label.id ? 0.2 : 0.6
            }}
          />
        </div>
      ))}

      {/* Floating Tooltip card */}
      <div ref={tooltipRef} className="hover-tooltip">
        {hoveredStock && (
          <>
            <div className="tooltip-header">
              <span className="tooltip-symbol">{hoveredStock.symbol}</span>
              <span className={`tooltip-change ${hoveredStock.changePercent >= 0 ? 'up' : 'down'}`}>
                {hoveredStock.changePercent >= 0 ? '+' : ''}
                {hoveredStock.changePercent.toFixed(2)}%
              </span>
            </div>
            <div className="tooltip-name">{hoveredStock.name}</div>
            <div className="tooltip-price">{formatCurrency(hoveredStock.price)}</div>
            <div style={{ color: 'var(--text-muted)', fontSize: '10px', marginTop: '2px' }}>
              Cap: {formatMarketCap(hoveredStock.marketCap)}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

// General helper mapping side variables to absolute coordinates (hoisted to prevent redeclaration)
const getBlockTransform = (side, column, cCenter, dValue, L_c, wAllocated, sizeFactor) => {
  let x = 0, z = 0;
  let scaleX = 1, scaleZ = 1;
  let rotationY = 0;
  
  const gap = 0.03;
  
  if (side === 'left') {
    // 2-sided Left side: outer wall at x = -48, water at x = -10
    z = cCenter;
    scaleZ = wAllocated - gap;
    
    if (column === 'inland') {
      x = -48 + 7; // center of inland
      scaleX = 14 - gap;
    } else {
      x = -34 + dValue / 2; // starts at x = -34, extends by dValue
      scaleX = dValue - gap;
    }
    rotationY = 0;
  } 
  else if (side === 'right') {
    // 2-sided Right side: outer wall at x = 48, water at x = 10
    z = cCenter;
    scaleZ = wAllocated - gap;
    
    if (column === 'inland') {
      x = 48 - 7;
      scaleX = 14 - gap;
    } else {
      x = 34 - dValue / 2;
      scaleX = dValue - gap;
    }
    rotationY = 0;
  }
  else if (side === 'north') {
    // 4-sided North side: outer wall at z = 48, water at z = 15
    x = cCenter;
    scaleX = wAllocated - gap;
    
    if (column === 'inland') {
      z = 48 - 7;
      scaleZ = 14 - gap;
    } else {
      z = 34 - dValue / 2;
      scaleZ = dValue - gap;
    }
    rotationY = 0;
  }
  else if (side === 'south') {
    // 4-sided South side: outer wall at z = -48, water at z = -15
    x = cCenter;
    scaleX = wAllocated - gap;
    
    if (column === 'inland') {
      z = -48 + 7;
      scaleZ = 14 - gap;
    } else {
      z = -34 + dValue / 2;
      scaleZ = dValue - gap;
    }
    rotationY = 0;
  }
  else if (side === 'east') {
    // 4-sided East side: outer wall at x = 48, water at x = 15
    z = cCenter;
    scaleZ = wAllocated - gap;
    
    if (column === 'inland') {
      x = 48 - 7;
      scaleX = 14 - gap;
    } else {
      x = 34 - dValue / 2;
      scaleX = dValue - gap;
    }
    rotationY = 0;
  }
  else if (side === 'west') {
    // 4-sided West side: outer wall at x = -48, water at x = -15
    z = cCenter;
    scaleZ = wAllocated - gap;
    
    if (column === 'inland') {
      x = -48 + 7;
      scaleX = 14 - gap;
    } else {
      x = -34 + dValue / 2;
      scaleX = dValue - gap;
    }
    rotationY = 0;
  }
  
  return { x, z, scaleX, scaleZ, rotationY };
};

// Dynamic 2D canvas texture generator for drawing the ticker symbol on the top face of stock cuboids
const createBlockTexture = (text, baseColorHex) => {
  const canvas = document.createElement('canvas');
  canvas.width = 256;
  canvas.height = 256; // square texture fits the box UV coordinates perfectly
  const ctx = canvas.getContext('2d');
  
  // Fill background with the block's base color
  ctx.fillStyle = baseColorHex;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  
  // Draw light ticker text (bold sans-serif) with a subtle drop shadow
  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 64px "Outfit", "Inter", "Segoe UI", sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  
  // Subtle text styling for visual clarity
  ctx.shadowColor = 'rgba(0, 0, 0, 0.4)';
  ctx.shadowBlur = 6;
  ctx.shadowOffsetX = 0;
  ctx.shadowOffsetY = 2;
  
  ctx.fillText(text, canvas.width / 2, canvas.height / 2);
  
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
};

// Helpers for multi-material (array of materials) emissive and opacity settings on meshes
const setMeshEmissiveIntensity = (mesh, val) => {
  if (Array.isArray(mesh.material)) {
    mesh.material.forEach(m => { m.emissiveIntensity = val; });
  } else if (mesh.material) {
    mesh.material.emissiveIntensity = val;
  }
};

const getMeshEmissiveIntensity = (mesh) => {
  if (Array.isArray(mesh.material)) {
    return mesh.material[0].emissiveIntensity;
  }
  return mesh.material ? mesh.material.emissiveIntensity : 0;
};

const setMeshOpacity = (mesh, opacity) => {
  if (Array.isArray(mesh.material)) {
    mesh.material.forEach(m => {
      m.transparent = opacity < 1.0;
      m.opacity = opacity;
    });
  } else if (mesh.material) {
    mesh.material.transparent = opacity < 1.0;
    mesh.material.opacity = opacity;
  }
};
