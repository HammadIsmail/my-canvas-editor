import { 
  Square, 
  Circle, 
  
  X, 
 
  Heart, 
  Shield,
  ArrowLeftRight,
 
  Star, 
  Shapes,
  Triangle,
  Diamond,
  Hexagon,
  Pentagon,
  Minus,
  ArrowRight,
  ArrowLeft,
  ArrowUp,
  ArrowDown,
  ChevronRight,
  MessageSquare,
  Hourglass,
  Cloud,
} from 'lucide-react';
import {
  addRectangle,
  addCircle,
  addPolygon,
  addLine,
  addDiamond,
  addStar,
  addArrow,
  addSolidLine,
  addDashedLine,
  addDottedLine,
  addArrowLineRight,
  addDoubleArrowLine,
  addLineWithCircles,
  addLineWithSquares,
  addSquare,
  addRoundedRectangle,
  addTriangle,
  addInvertedTriangle,
  addPentagon,
  addHexagon,
  addOctagon,
  addFourPointStar,
  addSixPointStar,
  addEightPointStar,
  addStarburst,
  addLeftArrow,
  addUpArrow,
  addDownArrow,
  addDoubleArrowHorizontal,
  addChevronRight,
  addBowtie,
  addOval,
  addSpeechBubble,
  addHeart,
  addCross,
  addCloud,
  addShield
} from '../canvasShapes/canvasShapes';  

export const getElements = (canvas) => [
  {
    category: 'Basic Shapes',
    items: [
      { 
        name: 'Rectangle', 
        icon: Square, 
        action: () => addRectangle(canvas),
        description: 'Basic rectangle shape'
      },
      { 
        name: 'Circle', 
        icon: Circle, 
        action: () => addCircle(canvas),
        description: 'Perfect circle shape'
      },
      { 
        name: 'Triangle', 
        icon: Triangle, 
        action: () => addTriangle(canvas),
        description: 'Triangle shape'
      },
       { 
        name: 'Inverted Triangle', 
        icon: Triangle, 
        action: () => addInvertedTriangle(canvas),
        description: 'Inverted triangle shape'
      },
      { 
        name: 'Line', 
        icon: Minus, 
        action: () => addLine(canvas),
        description: 'Straight line'
      },
      { 
        name: 'Square', 
        icon: Square, 
        action: () => addSquare(canvas),
        description: 'Perfect square shape'
      },
      { 
        name: 'Rounded Rectangle', 
        icon: Square, 
        action: () => addRoundedRectangle(canvas),
        description: 'Rectangle with rounded corners'
      },
      { 
        name: 'Oval', 
        icon: Circle, 
        action: () => addOval(canvas),
        description: 'Elliptical shape'
      }
    ]
  },
  {
    category: 'Polygons',
    items: [
      { 
        name: 'Pentagon', 
        icon: Pentagon, 
        action: () => addPentagon(canvas),
        description: '5-sided polygon'
      },
      { 
        name: 'Hexagon', 
        icon: Hexagon, 
        action: () => addHexagon(canvas),
        description: '6-sided polygon'
      },
      { 
        name: 'Octagon', 
        icon: Shapes, 
        action: () => addOctagon(canvas),
        description: '8-sided polygon'
      },
      { 
        name: 'Diamond', 
        icon: Diamond, 
        action: () => addDiamond(canvas),
        description: 'Diamond shape'
      }
    ]
  },
  {
    category: 'Special Shapes',
    items: [
      { 
        name: 'Star', 
        icon: Star, 
        action: () => addStar(canvas),
        description: '5-pointed star'
      },
      { 
        name: '4-Pointed Star', 
        icon: Star, 
        action: () => addFourPointStar(canvas),
        description: '4-pointed star'
      },
      { 
        name: '6-Pointed Star', 
        icon: Star, 
        action: () => addSixPointStar(canvas),
        description: '6-pointed star'
      },
      { 
        name: '8-Pointed Star', 
        icon: Star, 
        action: () => addEightPointStar(canvas),
        description: '8-pointed star'
      },
      { 
        name: 'Starburst', 
        icon: Star, 
        action: () => addStarburst(canvas),
        description: 'Sunburst shape'
      },
      { 
        name: 'Heart', 
        icon: Heart, 
        action: () => addHeart(canvas),
        description: 'Heart shape'
      },
      { 
        name: 'Cross', 
        icon: X, 
        action: () => addCross(canvas),
        description: 'Plus/Cross shape'
      },
      { 
        name: 'Cloud', 
        icon: Cloud, 
        action: () => addCloud(canvas),
        description: 'Cloud shape'
      },
      { 
        name: 'Shield', 
        icon: Shield, 
        action: () => addShield(canvas),
        description: 'Shield shape'
      }
    ]
  },
  {
    category: 'Arrows',
    items: [
      { 
        name: 'Right Arrow', 
        icon: ArrowRight, 
        action: () => addArrow(canvas),
        description: 'Arrow pointing right'
      },
      { 
        name: 'Left Arrow', 
        icon: ArrowLeft, 
        action: () => addLeftArrow(canvas),
        description: 'Arrow pointing left'
      },
      { 
        name: 'Up Arrow', 
        icon: ArrowUp, 
        action: () => addUpArrow(canvas),
        description: 'Arrow pointing up'
      },
      { 
        name: 'Down Arrow', 
        icon: ArrowDown, 
        action: () => addDownArrow(canvas),
        description: 'Arrow pointing down'
      },
      { 
        name: 'Double Arrow', 
        icon: ArrowLeftRight, 
        action: () => addDoubleArrowHorizontal(canvas),
        description: 'Double-headed arrow'
      }
    ]
  },
  {
    category: 'Lines',
    items: [
      { 
        name: 'Solid Line', 
        icon: Minus, 
        action: () => addSolidLine(canvas),
        description: 'Basic solid line'
      },
      { 
        name: 'Dashed Line', 
        icon: Minus, 
        action: () => addDashedLine(canvas),
        description: 'Dashed line'
      },
      { 
        name: 'Dotted Line', 
        icon: Minus, 
        action: () => addDottedLine(canvas),
        description: 'Dotted line'
      },
      { 
        name: 'Arrow Line', 
        icon: ArrowRight, 
        action: () => addArrowLineRight(canvas),
        description: 'Line with arrow'
      },
      { 
        name: 'Double Arrow Line', 
        icon: ArrowLeftRight, 
        action: () => addDoubleArrowLine(canvas),
        description: 'Line with arrows at both ends'
      },
      { 
        name: 'Line with Circles', 
        icon: Circle, 
        action: () => addLineWithCircles(canvas),
        description: 'Line with circles at ends'
      },
      { 
        name: 'Line with Squares', 
        icon: Square, 
        action: () => addLineWithSquares(canvas),
        description: 'Line with squares at ends'
      }
    ]
  },
  {
    category: 'Other Shapes',
    items: [
      { 
        name: 'Speech Bubble', 
        icon: MessageSquare, 
        action: () => addSpeechBubble(canvas),
        description: 'Speech/thought bubble'
      },
      { 
        name: 'Chevron', 
        icon: ChevronRight, 
        action: () => addChevronRight(canvas),
        description: 'Banner/chevron shape'
      },
      { 
        name: 'Bowtie', 
        icon: Hourglass, 
        action: () => addBowtie(canvas),
        description: 'Bowtie/hourglass shape'
      }
    ]
  }
];