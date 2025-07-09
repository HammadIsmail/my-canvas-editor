export const TEMPLATES = {
  instagramPost: {
    id: 'instagram-post',
    name: 'Instagram Post',
    config: {
      width: 1080,
      height: 1080,
      backgroundColor: '#ffffff',
      objects: [
        {
          type: 'rect',
          left: 50,
          top: 50,
          width: 980,
          height: 980,
          fill: '#f8f9fa',
          rx: 20,
          ry: 20,
          stroke: '#e9ecef',
          strokeWidth: 2,
          selectable: true
        },
        {
          type: 'textbox',
          text: 'Your Heading Here',
          left: 540,
          top: 300,
          width: 900,
          fontSize: 72,
          fontFamily: 'Arial',
          fill: '#212529',
          fontWeight: 'bold',
          textAlign: 'center',
          originX: 'center',
          selectable: true
        }
      ]
    }
  },
  story: {
    id: 'story',
    name: 'Instagram Story',
    config: {
      width: 1080,
      height: 1920,
      backgroundColor: '#000000',
      objects: [
        {
          type: 'textbox',
          text: 'Swipe Up!',
          left: 540,
          top: 1600,
          fontSize: 64,
          fontFamily: 'Arial',
          fill: '#ffffff',
          fontWeight: 'bold',
          textAlign: 'center',
          originX: 'center',
          selectable: true
        }
      ]
    }
  },
  businessCard: {
    id: 'business-card',
    name: 'Business Card',
    config: {
      width: 750,
      height: 450,
      backgroundColor: '#ffffff',
      objects: [
        {
          type: 'rect',
          left: 0,
          top: 0,
          width: 750,
          height: 150,
          fill: '#2c3e50',
          selectable: true
        },
        {
          type: 'textbox',
          text: 'Your Name',
          left: 375,
          top: 75,
          fontSize: 32,
          fontFamily: 'Helvetica',
          fill: '#ffffff',
          fontWeight: 'bold',
          originX: 'center',
          originY: 'center',
          selectable: true
        }
      ]
    }
  }
};