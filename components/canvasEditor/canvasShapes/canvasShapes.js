import { fabric } from 'fabric';

// ==================== EXISTING SHAPES ====================
export const addRectangle = (canvas) => {
  if (!canvas) return;

  const rect = new fabric.Rect({
    left: 150,
    top: 150,
    width: 100,
    height: 100,
    fill: '#ff6b6b',
    selectable: true,
    evented: true,
    hasControls: true,
    hasBorders: true,
    lockMovementX: false,
    lockMovementY: false,
    lockRotation: false,
    lockScalingX: false,
    lockScalingY: false,
    hoverCursor: 'move'
  });

  canvas.add(rect);
  canvas.setActiveObject(rect);
  canvas.renderAll();
};

export const addCircle = (canvas) => {
  if (!canvas) return;

  const circle = new fabric.Circle({
    left: 200,
    top: 200,
    radius: 50,
    fill: '#ff6b6b',
    selectable: true,
    evented: true,
    hasControls: true,
    hasBorders: true,
    lockMovementX: false,
    lockMovementY: false,
    lockRotation: false,
    lockScalingX: false,
    lockScalingY: false,
    hoverCursor: 'move'
  });

  canvas.add(circle);
  canvas.setActiveObject(circle);
  canvas.renderAll();
};

export const addPolygon = (sides, canvas) => {
  if (!canvas) return;
  
  const points = [];
  const radius = 50;
  const centerX = 0;
  const centerY = 0;
  
  for (let i = 0; i < sides; i++) {
    const angle = (i * 2 * Math.PI) / sides - Math.PI / 2;
    points.push({
      x: centerX + radius * Math.cos(angle),
      y: centerY + radius * Math.sin(angle)
    });
  }
  
  const polygon = new fabric.Polygon(points, {
    left: canvas.width / 2,
    top: canvas.height / 2,
    fill: '#3b82f6',
    stroke: '#1e40af',
    strokeWidth: 2,
    originX: 'center',
    originY: 'center'
  });
  
  canvas.add(polygon);
  canvas.setActiveObject(polygon);
  canvas.renderAll();
};

export const addLine = (canvas) => {
  if (!canvas) return;
  
  const line = new fabric.Line([50, 100, 200, 100], {
    left: canvas.width / 2,
    top: canvas.height / 2,
    stroke: '#374151',
    strokeWidth: 3,
    originX: 'center',
    originY: 'center'
  });
  
  canvas.add(line);
  canvas.setActiveObject(line);
  canvas.renderAll();
};

export const addDiamond = (canvas) => {
  if (!canvas) return;
  
  const points = [
    { x: 0, y: -50 },
    { x: 50, y: 0 },
    { x: 0, y: 50 },
    { x: -50, y: 0 }
  ];
  
  const diamond = new fabric.Polygon(points, {
    left: canvas.width / 2,
    top: canvas.height / 2,
    fill: '#8b5cf6',
    stroke: '#7c3aed',
    strokeWidth: 2,
    originX: 'center',
    originY: 'center'
  });
  
  canvas.add(diamond);
  canvas.setActiveObject(diamond);
  canvas.renderAll();
};

export const addStar = (canvas) => {
  if (!canvas) return;
  
  const points = [];
  const outerRadius = 50;
  const innerRadius = 25;
  const spikes = 5;
  
  for (let i = 0; i < spikes * 2; i++) {
    const angle = (i * Math.PI) / spikes;
    const radius = i % 2 === 0 ? outerRadius : innerRadius;
    points.push({
      x: Math.cos(angle - Math.PI / 2) * radius,
      y: Math.sin(angle - Math.PI / 2) * radius
    });
  }
  
  const star = new fabric.Polygon(points, {
    left: canvas.width / 2,
    top: canvas.height / 2,
    fill: '#fbbf24',
    stroke: '#f59e0b',
    strokeWidth: 2,
    originX: 'center',
    originY: 'center'
  });
  
  canvas.add(star);
  canvas.setActiveObject(star);
  canvas.renderAll();
};

export const addArrow = (canvas) => {
  if (!canvas) return;
  
  const points = [
    { x: -40, y: -10 },
    { x: 20, y: -10 },
    { x: 20, y: -20 },
    { x: 40, y: 0 },
    { x: 20, y: 20 },
    { x: 20, y: 10 },
    { x: -40, y: 10 }
  ];
  
  const arrow = new fabric.Polygon(points, {
    left: canvas.width / 2,
    top: canvas.height / 2,
    fill: '#10b981',
    stroke: '#059669',
    strokeWidth: 2,
    originX: 'center',
    originY: 'center'
  });
  
  canvas.add(arrow);
  canvas.setActiveObject(arrow);
  canvas.renderAll();
};

// ==================== LINE TYPES (Image 1) ====================

// Solid line
export const addSolidLine = (canvas) => {
  if (!canvas) return;
  
  const line = new fabric.Line([0, 0, 100, 0], {
    left: canvas.width / 2,
    top: canvas.height / 2,
    stroke: '#000000',
    strokeWidth: 2,
    originX: 'center',
    originY: 'center'
  });
  
  canvas.add(line);
  canvas.setActiveObject(line);
  canvas.renderAll();
};

// Dashed line
export const addDashedLine = (canvas) => {
  if (!canvas) return;
  
  const line = new fabric.Line([0, 0, 100, 0], {
    left: canvas.width / 2,
    top: canvas.height / 2,
    stroke: '#000000',
    strokeWidth: 2,
    strokeDashArray: [10, 5],
    originX: 'center',
    originY: 'center'
  });
  
  canvas.add(line);
  canvas.setActiveObject(line);
  canvas.renderAll();
};

// Dotted line
export const addDottedLine = (canvas) => {
  if (!canvas) return;
  
  const line = new fabric.Line([0, 0, 100, 0], {
    left: canvas.width / 2,
    top: canvas.height / 2,
    stroke: '#000000',
    strokeWidth: 2,
    strokeDashArray: [2, 8],
    strokeLineCap: 'round',
    originX: 'center',
    originY: 'center'
  });
  
  canvas.add(line);
  canvas.setActiveObject(line);
  canvas.renderAll();
};

// Arrow line (right)
export const addArrowLineRight = (canvas) => {
  if (!canvas) return;
  
  const centerX = canvas.width / 2;
  const centerY = canvas.height / 2;
  
  const line = new fabric.Line([-40, 0, 40, 0], {
    stroke: '#000000',
    strokeWidth: 2,
    originX: 'center',
    originY: 'center'
  });
  
  const arrowHead = new fabric.Polygon([
    { x: 40, y: 0 },
    { x: 30, y: -5 },
    { x: 30, y: 5 }
  ], {
    fill: '#000000',
    stroke: '#000000',
    strokeWidth: 1,
    originX: 'center',
    originY: 'center'
  });
  
  const group = new fabric.Group([line, arrowHead], {
    left: centerX,
    top: centerY,
    originX: 'center',
    originY: 'center'
  });
  
  canvas.add(group);
  canvas.setActiveObject(group);
  canvas.renderAll();
};

// Double arrow line
export const addDoubleArrowLine = (canvas) => {
  if (!canvas) return;
  
  const centerX = canvas.width / 2;
  const centerY = canvas.height / 2;
  
  const line = new fabric.Line([-30, 0, 30, 0], {
    stroke: '#000000',
    strokeWidth: 2,
    originX: 'center',
    originY: 'center'
  });
  
  const leftArrow = new fabric.Polygon([
    { x: -40, y: 0 },
    { x: -30, y: -5 },
    { x: -30, y: 5 }
  ], {
    fill: '#000000',
    stroke: '#000000',
    strokeWidth: 1,
    originX: 'center',
    originY: 'center'
  });
  
  const rightArrow = new fabric.Polygon([
    { x: 40, y: 0 },
    { x: 30, y: -5 },
    { x: 30, y: 5 }
  ], {
    fill: '#000000',
    stroke: '#000000',
    strokeWidth: 1,
    originX: 'center',
    originY: 'center'
  });
  
  const group = new fabric.Group([line, leftArrow, rightArrow], {
    left: centerX,
    top: centerY,
    originX: 'center',
    originY: 'center'
  });
  
  canvas.add(group);
  canvas.setActiveObject(group);
  canvas.renderAll();
};

// Line with circles at ends
export const addLineWithCircles = (canvas) => {
  if (!canvas) return;
  
  const centerX = canvas.width / 2;
  const centerY = canvas.height / 2;
  
  const line = new fabric.Line([-35, 0, 35, 0], {
    stroke: '#000000',
    strokeWidth: 2,
    originX: 'center',
    originY: 'center'
  });
  
  const leftCircle = new fabric.Circle({
    radius: 5,
    fill: '#000000',
    left: -40,
    top: 0,
    originX: 'center',
    originY: 'center'
  });
  
  const rightCircle = new fabric.Circle({
    radius: 5,
    fill: '#000000',
    left: 40,
    top: 0,
    originX: 'center',
    originY: 'center'
  });
  
  const group = new fabric.Group([line, leftCircle, rightCircle], {
    left: centerX,
    top: centerY,
    originX: 'center',
    originY: 'center'
  });
  
  canvas.add(group);
  canvas.setActiveObject(group);
  canvas.renderAll();
};

// Line with squares at ends
export const addLineWithSquares = (canvas) => {
  if (!canvas) return;
  
  const centerX = canvas.width / 2;
  const centerY = canvas.height / 2;
  
  const line = new fabric.Line([-35, 0, 35, 0], {
    stroke: '#000000',
    strokeWidth: 2,
    originX: 'center',
    originY: 'center'
  });
  
  const leftSquare = new fabric.Rect({
    width: 10,
    height: 10,
    fill: '#000000',
    left: -40,
    top: 0,
    originX: 'center',
    originY: 'center'
  });
  
  const rightSquare = new fabric.Rect({
    width: 10,
    height: 10,
    fill: '#000000',
    left: 40,
    top: 0,
    originX: 'center',
    originY: 'center'
  });
  
  const group = new fabric.Group([line, leftSquare, rightSquare], {
    left: centerX,
    top: centerY,
    originX: 'center',
    originY: 'center'
  });
  
  canvas.add(group);
  canvas.setActiveObject(group);
  canvas.renderAll();
};
// ==================== BASIC SHAPES (Image 2 - Row 1) ====================

// Square
export const addSquare = (canvas) => {
  if (!canvas) return;
  
  const square = new fabric.Rect({
    left: canvas.width / 2,
    top: canvas.height / 2,
    width: 80,
    height: 80,
    fill: '#000000',
    originX: 'center',
    originY: 'center'
  });
  
  canvas.add(square);
  canvas.setActiveObject(square);
  canvas.renderAll();
};

// Rounded rectangle
export const addRoundedRectangle = (canvas) => {
  if (!canvas) return;
  
  const rect = new fabric.Rect({
    left: canvas.width / 2,
    top: canvas.height / 2,
    width: 100,
    height: 60,
    fill: '#000000',
    rx: 15,
    ry: 15,
    originX: 'center',
    originY: 'center'
  });
  
  canvas.add(rect);
  canvas.setActiveObject(rect);
  canvas.renderAll();
};

// Triangle
export const addTriangle = (canvas) => {
  if (!canvas) return;
  
  const triangle = new fabric.Triangle({
    left: canvas.width / 2,
    top: canvas.height / 2,
    width: 80,
    height: 80,
    fill: '#000000',
    originX: 'center',
    originY: 'center'
  });
  
  canvas.add(triangle);
  canvas.setActiveObject(triangle);
  canvas.renderAll();
};

// Inverted triangle
export const addInvertedTriangle = (canvas) => {
  if (!canvas) return;
  
  const triangle = new fabric.Triangle({
    left: canvas.width / 2,
    top: canvas.height / 2,
    width: 80,
    height: 80,
    fill: '#000000',
    angle: 180,
    originX: 'center',
    originY: 'center'
  });
  
  canvas.add(triangle);
  canvas.setActiveObject(triangle);
  canvas.renderAll();
};

// Pentagon
export const addPentagon = (canvas) => {
  if (!canvas) return;
  addPolygon(5, canvas);
};

// Hexagon
export const addHexagon = (canvas) => {
  if (!canvas) return;
  addPolygon(6, canvas);
};

// Octagon
export const addOctagon = (canvas) => {
  if (!canvas) return;
  addPolygon(8, canvas);
};

// ==================== STAR VARIATIONS ====================

// 4-pointed star
export const addFourPointStar = (canvas) => {
  if (!canvas) return;
  
  const points = [
    { x: 0, y: -50 },
    { x: 15, y: -15 },
    { x: 50, y: 0 },
    { x: 15, y: 15 },
    { x: 0, y: 50 },
    { x: -15, y: 15 },
    { x: -50, y: 0 },
    { x: -15, y: -15 }
  ];
  
  const star = new fabric.Polygon(points, {
    left: canvas.width / 2,
    top: canvas.height / 2,
    fill: '#000000',
    originX: 'center',
    originY: 'center'
  });
  
  canvas.add(star);
  canvas.setActiveObject(star);
  canvas.renderAll();
};

// 6-pointed star
export const addSixPointStar = (canvas) => {
  if (!canvas) return;
  
  const points = [];
  const outerRadius = 50;
  const innerRadius = 25;
  const spikes = 6;
  
  for (let i = 0; i < spikes * 2; i++) {
    const angle = (i * Math.PI) / spikes;
    const radius = i % 2 === 0 ? outerRadius : innerRadius;
    points.push({
      x: Math.cos(angle - Math.PI / 2) * radius,
      y: Math.sin(angle - Math.PI / 2) * radius
    });
  }
  
  const star = new fabric.Polygon(points, {
    left: canvas.width / 2,
    top: canvas.height / 2,
    fill: '#000000',
    originX: 'center',
    originY: 'center'
  });
  
  canvas.add(star);
  canvas.setActiveObject(star);
  canvas.renderAll();
};

// 8-pointed star
export const addEightPointStar = (canvas) => {
  if (!canvas) return;
  
  const points = [];
  const outerRadius = 50;
  const innerRadius = 25;
  const spikes = 8;
  
  for (let i = 0; i < spikes * 2; i++) {
    const angle = (i * Math.PI) / spikes;
    const radius = i % 2 === 0 ? outerRadius : innerRadius;
    points.push({
      x: Math.cos(angle - Math.PI / 2) * radius,
      y: Math.sin(angle - Math.PI / 2) * radius
    });
  }
  
  const star = new fabric.Polygon(points, {
    left: canvas.width / 2,
    top: canvas.height / 2,
    fill: '#000000',
    originX: 'center',
    originY: 'center'
  });
  
  canvas.add(star);
  canvas.setActiveObject(star);
  canvas.renderAll();
};

// Starburst/Sun
export const addStarburst = (canvas) => {
  if (!canvas) return;
  
  const points = [];
  const outerRadius = 50;
  const innerRadius = 15;
  const spikes = 16;
  
  for (let i = 0; i < spikes * 2; i++) {
    const angle = (i * Math.PI) / spikes;
    const radius = i % 2 === 0 ? outerRadius : innerRadius;
    points.push({
      x: Math.cos(angle) * radius,
      y: Math.sin(angle) * radius
    });
  }
  
  const starburst = new fabric.Polygon(points, {
    left: canvas.width / 2,
    top: canvas.height / 2,
    fill: '#000000',
    originX: 'center',
    originY: 'center'
  });
  
  canvas.add(starburst);
  canvas.setActiveObject(starburst);
  canvas.renderAll();
};

// ==================== ARROW VARIATIONS ====================

// Left arrow
export const addLeftArrow = (canvas) => {
  if (!canvas) return;
  
  const points = [
    { x: 40, y: -10 },
    { x: -20, y: -10 },
    { x: -20, y: -20 },
    { x: -40, y: 0 },
    { x: -20, y: 20 },
    { x: -20, y: 10 },
    { x: 40, y: 10 }
  ];
  
  const arrow = new fabric.Polygon(points, {
    left: canvas.width / 2,
    top: canvas.height / 2,
    fill: '#000000',
    originX: 'center',
    originY: 'center'
  });
  
  canvas.add(arrow);
  canvas.setActiveObject(arrow);
  canvas.renderAll();
};

// Up arrow
export const addUpArrow = (canvas) => {
  if (!canvas) return;
  
  const points = [
    { x: 0, y: -40 },
    { x: 20, y: -20 },
    { x: 10, y: -20 },
    { x: 10, y: 40 },
    { x: -10, y: 40 },
    { x: -10, y: -20 },
    { x: -20, y: -20 }
  ];
  
  const arrow = new fabric.Polygon(points, {
    left: canvas.width / 2,
    top: canvas.height / 2,
    fill: '#000000',
    originX: 'center',
    originY: 'center'
  });
  
  canvas.add(arrow);
  canvas.setActiveObject(arrow);
  canvas.renderAll();
};

// Down arrow
export const addDownArrow = (canvas) => {
  if (!canvas) return;
  
  const points = [
    { x: 0, y: 40 },
    { x: 20, y: 20 },
    { x: 10, y: 20 },
    { x: 10, y: -40 },
    { x: -10, y: -40 },
    { x: -10, y: 20 },
    { x: -20, y: 20 }
  ];
  
  const arrow = new fabric.Polygon(points, {
    left: canvas.width / 2,
    top: canvas.height / 2,
    fill: '#000000',
    originX: 'center',
    originY: 'center'
  });
  
  canvas.add(arrow);
  canvas.setActiveObject(arrow);
  canvas.renderAll();
};

// Double-headed arrow horizontal
export const addDoubleArrowHorizontal = (canvas) => {
  if (!canvas) return;
  
  const points = [
    { x: -40, y: 0 },
    { x: -20, y: -15 },
    { x: -20, y: -8 },
    { x: 20, y: -8 },
    { x: 20, y: -15 },
    { x: 40, y: 0 },
    { x: 20, y: 15 },
    { x: 20, y: 8 },
    { x: -20, y: 8 },
    { x: -20, y: 15 }
  ];
  
  const arrow = new fabric.Polygon(points, {
    left: canvas.width / 2,
    top: canvas.height / 2,
    fill: '#000000',
    originX: 'center',
    originY: 'center'
  });
  
  canvas.add(arrow);
  canvas.setActiveObject(arrow);
  canvas.renderAll();
};

// ==================== ADDITIONAL SHAPES ====================

// Chevron/Banner right
export const addChevronRight = (canvas) => {
  if (!canvas) return;
  
  const points = [
    { x: -30, y: -25 },
    { x: 20, y: -25 },
    { x: 40, y: 0 },
    { x: 20, y: 25 },
    { x: -30, y: 25 }
  ];
  
  const chevron = new fabric.Polygon(points, {
    left: canvas.width / 2,
    top: canvas.height / 2,
    fill: '#000000',
    originX: 'center',
    originY: 'center'
  });
  
  canvas.add(chevron);
  canvas.setActiveObject(chevron);
  canvas.renderAll();
};

// Bowtie/Hourglass
export const addBowtie = (canvas) => {
  if (!canvas) return;
  
  const points = [
    { x: -40, y: -30 },
    { x: -40, y: 30 },
    { x: 0, y: 0 },
    { x: 40, y: 30 },
    { x: 40, y: -30 }
  ];
  
  const bowtie = new fabric.Polygon(points, {
    left: canvas.width / 2,
    top: canvas.height / 2,
    fill: '#000000',
    originX: 'center',
    originY: 'center'
  });
  
  canvas.add(bowtie);
  canvas.setActiveObject(bowtie);
  canvas.renderAll();
};

// Oval/Ellipse
export const addOval = (canvas) => {
  if (!canvas) return;
  
  const ellipse = new fabric.Ellipse({
    left: canvas.width / 2,
    top: canvas.height / 2,
    rx: 60,
    ry: 30,
    fill: '#000000',
    originX: 'center',
    originY: 'center'
  });
  
  canvas.add(ellipse);
  canvas.setActiveObject(ellipse);
  canvas.renderAll();
};

// Speech bubble
export const addSpeechBubble = (canvas) => {
  if (!canvas) return;
  
  const centerX = canvas.width / 2;
  const centerY = canvas.height / 2;
  
  // Main bubble rectangle (centered)
  const bubble = new fabric.Rect({
    width: 80,
    height: 50,
    fill: '#000000',
    rx: 10,  // rounded corners
    ry: 10,
    originX: 'center',
    originY: 'center',
    left: 0,
    top: 0
  });
  
  // Speech bubble tail (positioned relative to bubble)
  const tail = new fabric.Polygon([
    { x: -25, y: 25 },   // bottom-left point
    { x: -15, y: 25 },   // bottom-right point
    { x: -30, y: 40 }    // tip point
  ], {
    fill: '#000000',
    originX: 'center',
    originY: 'center'
  });
  
  const group = new fabric.Group([bubble, tail], {
    left: centerX,
    top: centerY,
    originX: 'center',
    originY: 'center'
  });
  
  canvas.add(group);
  canvas.setActiveObject(group);
  canvas.renderAll();
};

// Heart
export const addHeart = (canvas) => {
  if (!canvas) return;
  
  // Create heart using path
  const heartPath = 'M12,21.35l-1.45-1.32C5.4,15.36,2,12.28,2,8.5 C2,5.42,4.42,3,7.5,3c1.74,0,3.41,0.81,4.5,2.09C13.09,3.81,14.76,3,16.5,3 C19.58,3,22,5.42,22,8.5c0,3.78-3.4,6.86-8.55,11.54L12,21.35z';
  
  const heart = new fabric.Path(heartPath, {
    left: canvas.width / 2,
    top: canvas.height / 2,
    fill: '#000000',
    scaleX: 3,
    scaleY: 3,
    originX: 'center',
    originY: 'center'
  });
  
  canvas.add(heart);
  canvas.setActiveObject(heart);
  canvas.renderAll();
};

// Cross/Plus
export const addCross = (canvas) => {
  if (!canvas) return;
  
  const points = [
    { x: -15, y: -40 },
    { x: 15, y: -40 },
    { x: 15, y: -15 },
    { x: 40, y: -15 },
    { x: 40, y: 15 },
    { x: 15, y: 15 },
    { x: 15, y: 40 },
    { x: -15, y: 40 },
    { x: -15, y: 15 },
    { x: -40, y: 15 },
    { x: -40, y: -15 },
    { x: -15, y: -15 }
  ];
  
  const cross = new fabric.Polygon(points, {
    left: canvas.width / 2,
    top: canvas.height / 2,
    fill: '#000000',
    originX: 'center',
    originY: 'center'
  });
  
  canvas.add(cross);
  canvas.setActiveObject(cross);
  canvas.renderAll();
};

// Cloud
export const addCloud = (canvas) => {
  if (!canvas) return;

  // Create all cloud components with their local coordinates
  const components = [
    // Main cloud body
    new fabric.Ellipse({
      rx: 40,
      ry: 20,
      fill: '#000000',
      originX: 'center',
      originY: 'center',
      left: 0,
      top: 0
    }),
    // Left bump
    new fabric.Circle({
      radius: 15,
      fill: '#000000',
      originX: 'center',
      originY: 'center',
      left: -25,
      top: -10
    }),
    // Top center bump
    new fabric.Circle({
      radius: 18,
      fill: '#000000',
      originX: 'center',
      originY: 'center',
      left: 0,
      top: -15
    }),
    // Right bump
    new fabric.Circle({
      radius: 15,
      fill: '#000000',
      originX: 'center',
      originY: 'center',
      left: 25,
      top: -10
    })
  ];

  // Calculate the bounding box of all components
  let minX = Infinity, maxX = -Infinity, minY = Infinity, maxY = -Infinity;
  components.forEach(obj => {
    const left = obj.left - (obj.originX === 'center' ? obj.width/2 : 0);
    const right = obj.left + (obj.originX === 'center' ? obj.width/2 : obj.width);
    const top = obj.top - (obj.originY === 'center' ? obj.height/2 : 0);
    const bottom = obj.top + (obj.originY === 'center' ? obj.height/2 : obj.height);
    
    minX = Math.min(minX, left);
    maxX = Math.max(maxX, right);
    minY = Math.min(minY, top);
    maxY = Math.max(maxY, bottom);
  });

  const width = maxX - minX;
  const height = maxY - minY;

  // Create group with all components
  const group = new fabric.Group(components, {
    left: canvas.width / 2,
    top: canvas.height / 2,
    originX: 'center',
    originY: 'center',
    width: width,
    height: height
  });

  canvas.add(group);
  canvas.setActiveObject(group);
  canvas.renderAll();
};

// Shield
export const addShield = (canvas) => {
  if (!canvas) return;
  
  const points = [
    { x: 0, y: -40 },
    { x: 30, y: -30 },
    { x: 30, y: 10 },
    { x: 0, y: 40 },
    { x: -30, y: 10 },
    { x: -30, y: -30 }
  ];
  
  const shield = new fabric.Polygon(points, {
    left: canvas.width / 2,
    top: canvas.height / 2,
    fill: '#000000',
    originX: 'center',
    originY: 'center'
  });
  
  canvas.add(shield); 
  canvas.setActiveObject(shield);
  canvas.renderAll(); 
}