// Same logic, just swapped emojis → official SVG logos & tweaked layout
const SVG_ICONS = {
  portrait: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8">
      <path d="M19 3H5a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2V5a2 2 0 00-2-2zm0 16H5V5h14zM7 7h10v10H7z"/>
    </svg>
  ),
  landscape: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8">
      <path d="M19 3H5a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2V5a2 2 0 00-2-2zm0 16H5V5h14zM7 11h10v2H7z"/>
    </svg>
  ),
  square: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8">
      <path d="M19 3H5a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2V5a2 2 0 00-2-2zm0 16H5V5h14z"/>
    </svg>
  ),
  twitterHeader: (
    <svg viewBox="0 0 24 24" fill="#1DA1F2" className="w-8 h-8">
      <path d="M23.643 4.937c-.835.37-1.732.62-2.675.733a4.67 4.67 0 002.048-2.578 9.3 9.3 0 01-2.958 1.13 4.66 4.66 0 00-7.938 4.25 13.229 13.229 0 01-9.602-4.868c-.4.69-.63 1.49-.63 2.342A4.66 4.66 0 003.96 9.824a4.647 4.647 0 01-2.11-.583v.06a4.66 4.66 0 003.737 4.568 4.692 4.692 0 01-2.104.08 4.661 4.661 0 004.352 3.234 9.348 9.348 0 01-5.786 1.995 9.5 9.5 0 01-1.112-.065 13.175 13.175 0 007.14 2.093c8.57 0 13.255-7.098 13.255-13.254 0-.202-.005-.403-.014-.603a9.49 9.49 0 002.323-2.41z"/>
    </svg>
  ),
  twitterPost: (
    <svg viewBox="0 0 24 24" fill="#1DA1F2" className="w-8 h-8">
      <path d="M23.643 4.937c-.835.37-1.732.62-2.675.733a4.67 4.67 0 002.048-2.578 9.3 9.3 0 01-2.958 1.13 4.66 4.66 0 00-7.938 4.25 13.229 13.229 0 01-9.602-4.868c-.4.69-.63 1.49-.63 2.342A4.66 4.66 0 003.96 9.824a4.647 4.647 0 01-2.11-.583v.06a4.66 4.66 0 003.737 4.568 4.692 4.692 0 01-2.104.08 4.661 4.661 0 004.352 3.234 9.348 9.348 0 01-5.786 1.995 9.5 9.5 0 01-1.112-.065 13.175 13.175 0 007.14 2.093c8.57 0 13.255-7.098 13.255-13.254 0-.202-.005-.403-.014-.603a9.49 9.49 0 002.323-2.41z"/>
    </svg>
  ),
  facebookPost: (
    <svg viewBox="0 0 24 24" fill="#1877F2" className="w-8 h-8">
      <path d="M24 12.073c0-6.627-5.373-12-12-12S0 5.446 0 12.073c0 5.99 4.388 10.96 10.125 11.853v-8.385H7.078V12.073h3.047V9.403c0-3.009 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.364h-2.796v8.385C19.612 23.033 24 18.062 24 12.073z"/>
    </svg>
  ),
  instagramPost: (
            <img className="h-12 w-12" src="./instagram.png" alt="Instagram Icon" />

  ),
  instagramStory: (
          <img className="h-12 w-12" src="./instagram.png" alt="Instagram Icon" />
  ),
  pinterestPin: (
    <svg viewBox="0 0 24 24" fill="#E60023" className="w-8 h-8">
      <path d="M12 0C5.373 0 0 5.372 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.401.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.357-.629-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12 0-6.628-5.373-12-12-12z"/>
    </svg>
  ),
  linkedinBanner: (
    <svg viewBox="0 0 24 24" fill="#0077B5" className="w-8 h-8">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 110-4.124 2.062 2.062 0 010 4.124zM7.119 20.452H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z"/>
    </svg>
  ),
  snapchatPost: (
            <img className="h-12 w-12" src="./snapchat.svg" alt="Snapchat Icon" />
   
  ),
  youtubeChannelArt: (
    <svg viewBox="0 0 24 24" fill="#FF0000" className="w-8 h-8">
      <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
    </svg>
  ),
  youtubeThumbnail: (
    <svg viewBox="0 0 24 24" fill="#FF0000" className="w-8 h-8">
      <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
    </svg>
  ),
  infographic: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8">
      <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6zM6 20V4h7v5h5v11H6z"/>
    </svg>
  ),
  custom: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8">
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-.01L12 2z"/>
    </svg>
  )
};

const CANVAS_PRESETS = {
  portrait:       { width: 800,  height: 1000, label: 'Portrait',       icon: SVG_ICONS.portrait,       displaySize: 300 },
  landscape:      { width: 1000, height: 800,  label: 'Landscape',      icon: SVG_ICONS.landscape,      displaySize: 350 },
  square:         { width: 800,  height: 800,  label: 'Square',         icon: SVG_ICONS.square,         displaySize: 300 },
  twitterHeader:  { width: 1500, height: 500,  label: 'Twitter header', icon: SVG_ICONS.twitterHeader,  displaySize: 400 },
  twitterPost:    { width: 1024, height: 512,  label: 'Twitter post',   icon: SVG_ICONS.twitterPost,    displaySize: 400 },
  facebookPost:   { width: 1200, height: 628,  label: 'Facebook post',  icon: SVG_ICONS.facebookPost,   displaySize: 350 },
  instagramPost:  { width: 1080, height: 1080, label: 'Instagram post', icon: SVG_ICONS.instagramPost,  displaySize: 300 },
  instagramStory: { width: 1080, height: 1920, label: 'Instagram story',icon: SVG_ICONS.instagramStory, displaySize: 200 },
  pinterestPin:   { width: 735,  height: 1102, label: 'Pinterest post', icon: SVG_ICONS.pinterestPin,   displaySize: 250 },
  linkedinBanner: { width: 1200, height: 627,  label: 'LinkedIn banner',icon: SVG_ICONS.linkedinBanner, displaySize: 350 },
  snapchatPost:   { width: 1080, height: 1920, label: 'Snapchat post',  icon: SVG_ICONS.snapchatPost,   displaySize: 200 },
  youtubeChannelArt:{width:2560,height:1440,label:'Youtube channel art',icon:SVG_ICONS.youtubeChannelArt,displaySize:400},
  youtubeThumbnail:{width:1280,height:720,label:'Youtube thumbnail',icon:SVG_ICONS.youtubeThumbnail,displaySize:350},
  infographic:    { width: 800,  height: 2000, label: 'Infographic',    icon: SVG_ICONS.infographic,    displaySize: 300 },
  custom:         { width: 800,  height: 600,  label: 'Custom size',    icon: SVG_ICONS.custom,         displaySize: 300 }
};

const CanvasPreset = ({ setHasSelectedCanvas, setCanvasSize }) => {
  const selectCanvasType = (preset) => {
    const selected = CANVAS_PRESETS[preset] || CANVAS_PRESETS.portrait;
    setCanvasSize(selected);
    setHasSelectedCanvas(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center p-4">
      <div className="max-w-7xl w-full">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-slate-800 mb-2">Create a New Design</h1>
          <p className="text-lg text-slate-600">Select a canvas type to get started</p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
          {Object.entries(CANVAS_PRESETS).map(([key, preset]) => (
            <div
              key={key}
              onClick={() => selectCanvasType(key)}
              className="bg-white rounded-xl shadow hover:shadow-lg transition-all duration-200 cursor-pointer p-4 flex flex-col items-center"
            >
              <div className="mb-3">{preset.icon}</div>

           

              <h3 className="text-sm font-semibold text-slate-800 text-center">{preset.label}</h3>
              <p className="text-xs text-slate-500">
                {preset.width}×{preset.height}px
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CanvasPreset;