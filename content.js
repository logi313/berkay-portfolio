/* EDIT YOUR PORTFOLIO HERE. Paths are relative to index.html.
   Add preview: 'assets/your-loop.mp4' and film: 'assets/films/your-film.mp4' (see README: Filmler ve oynatıcı).
   film also accepts a Vimeo link ('https://vimeo.com/123456789'), an unlisted link or pasted embed code.
   No layout changes are needed. Empty media uses the poster gracefully.
   previewStart / previewLength control a loop from a longer preview file.
   Add your profile URL to a social entry to show it in the footer.
*/
window.PORTFOLIO = {
  email: 'hello@berkayalioglu.com',
  location: 'Turkey · 40.1885° N, 29.0610° E',
 
  showreel: {
    title: 'Showreel', description: 'A glimpse into my world of image and motion.',
    poster: 'assets/showreel-poster.jpg', preview: 'assets/showreel-preview.mp4?v=6',
    film: 'assets/films/showreel.mp4', previewStart: 0, previewLength: 0,
    label: 'Showreel preview',
    captions: '', demo: false
  },
  about: {
    poster: 'assets/original-09.webp', video: 'assets/about.mp4', playbackRate: 0.72,
    headline: 'THE PERSON\nBEHIND THE WORK',
    bio: 'I’m Berkay, an AI artist and filmmaker working across visual storytelling, advertising and experimental film.',
    approach: 'I use generative tools as part of the creative process from early concepts and visual development to motion and final frame.'
  },
  socials: { Instagram: '', Vimeo: '', Behance: '', LinkedIn: '' },
  categories: [
    { id: 'commercials', number: '01', title: 'Commercials',
      projects: [
        { id: 'one-last-message', title: 'One Last Message', type: 'Commercial film',
          description: 'A grandmother’s voice message, saved for the day she’s gone, carries a lifetime of small moments.', poster: 'assets/film-message-poster.jpg', focal: '50% 50%', preview: 'assets/film-message-preview.mp4', film: 'assets/films/one-last-message.mp4', previewLength: 0, captions: '' },
        { id: 'the-impossible-drive', title: 'The Impossible Drive', type: 'Automotive film',
          description: 'One message from a hotel room becomes a drive through city lights, desert roads and a mountain sunset.', poster: 'assets/commercial-impossible-drive-poster.jpg?v=2', focal: '50% 50%', preview: 'assets/commercial-impossible-drive-preview.mp4?v=2', film: 'assets/films/the-impossible-drive.mp4?v=2', previewLength: 0, captions: '' },
        { id: 'fix-this-plumbing', title: 'Fix This Plumbing', type: 'Commercial film',
          description: 'A dripping tap floods the living room while he carries on as normal, until the plumber finally walks in.', poster: 'assets/commercial-fix-plumbing-poster.jpg', focal: '50% 50%', preview: 'assets/commercial-fix-plumbing-preview.mp4', film: 'assets/films/fix-this-plumbing.mp4', previewLength: 0, captions: '' },
        { id: 'real-estate', title: 'One Door Closed', type: 'Commercial film',
          description: 'A home loan falls through, and a young couple finds another way home.', poster: 'assets/commercial-real-estate-poster.jpg', focal: '50% 50%', preview: 'assets/commercial-real-estate-preview.mp4', film: 'assets/films/real-estate.mp4', previewLength: 0, captions: '' }
      ]
    },
    { id: 'short-form', number: '02', title: 'Short-form',
      projects: [
        { id: 'eyewear', title: 'City Frames', type: 'Fashion motion', description: 'Amber lenses turn a grey business district into her own city.', poster: 'assets/short-eyewear-poster.jpg', focal: '50% 50%', preview: 'assets/short-eyewear-preview.mp4', film: 'assets/films/eyewear.mp4', previewLength: 0, captions: '' },
        { id: 'camera-motion', title: 'Through the Lens', type: 'Short-form', description: 'A mountain at first light, and the camera made to carry it home.', poster: 'assets/short-camera-motion-poster.jpg?v=3', focal: '50% 50%', preview: 'assets/short-camera-motion-preview.mp4?v=2', film: 'assets/films/camera-motion.mp4', previewLength: 0, captions: '' },
        { id: 'drink-ad', title: 'Poolside Sparkle', type: 'Product motion', description: 'A lazy afternoon on a pool float, and the one thing worth reaching for: an ice-cold can.', poster: 'assets/short-drink-ad-poster.jpg?v=3', focal: '50% 50%', preview: 'assets/short-drink-ad-preview.mp4?v=2', film: 'assets/films/drink-ad.mp4', previewLength: 0, captions: '' },
        { id: 'bed', title: 'The Bed Commute', type: 'Short-form', description: 'Too comfortable to get up, he takes his bed all the way to the office.', poster: 'assets/short-bed-poster.jpg', focal: '50% 50%', preview: 'assets/short-bed-preview.mp4', film: 'assets/films/bed.mp4', previewLength: 0, captions: '' },
        { id: 'coat-01', title: 'Summit Jacket', type: 'Fashion motion', description: 'From desert rock to a summit above the clouds, a jacket made for whatever the weather does.', poster: 'assets/short-coat-01-poster.jpg?v=2', focal: '50% 50%', preview: 'assets/short-coat-01-preview.mp4', film: 'assets/films/coat-01.mp4', previewLength: 0, captions: '' },
        { id: 'flavor-switch', title: 'Mixed Up', type: 'Product motion', description: 'Strawberry, lemon, orange, pistachio, chocolate: one ice cream that can’t pick a flavour.', poster: 'assets/short-flavor-switch-poster.jpg?v=2', focal: '50% 50%', preview: 'assets/short-flavor-switch-preview.mp4?v=2', film: 'assets/films/flavor-switch.mp4', previewLength: 0, captions: '' },
        { id: 'coat-02', title: 'Waterproof Trench', type: 'Fashion motion', description: 'A trench coat walks through a car wash and comes out untouched.', poster: 'assets/short-coat-02-poster.jpg?v=2', focal: '50% 50%', preview: 'assets/short-coat-02-preview.mp4?v=2', film: 'assets/films/coat-02.mp4', previewLength: 0, captions: '' },
        { id: 'bubble-world', title: 'Bubblegum ’90s', type: 'Short-form', description: 'A ’90s school hallway, one giant bubble and all the space she needs.', poster: 'assets/short-bubble-world-poster.jpg?v=6', focal: '50% 50%', preview: 'assets/short-bubble-world-preview.mp4?v=5', film: 'assets/films/bubble-world.mp4', previewLength: 0, captions: '' },
        { id: 'burger-macro', title: 'Double Smash', type: 'Short-form', description: 'Cheese melts, pickles drop and two smashed patties stack into one perfect burger.', poster: 'assets/short-burger-macro-poster.jpg?v=2', focal: '50% 50%', preview: 'assets/short-burger-macro-preview.mp4?v=2', film: 'assets/films/burger-macro.mp4', previewLength: 0, captions: '' },
        { id: 'car-versions', title: 'The Color Garage', type: 'Short-form', description: 'One sports car, three colours and three rooms of light, revealed one door at a time.', poster: 'assets/short-car-versions-poster.jpg', focal: '50% 50%', preview: 'assets/short-car-versions-preview.mp4', film: 'assets/films/car-versions.mp4', previewLength: 0, captions: '' },
        { id: 'luxury-real-estate', title: 'Skyline Residence', type: 'Architecture motion', description: 'Warm light, stone and a rooftop terrace above the city: a residence seen after dark.', poster: 'assets/short-luxury-real-estate-poster.jpg', focal: '50% 50%', preview: 'assets/short-luxury-real-estate-preview.mp4', film: 'assets/films/luxury-real-estate.mp4', previewLength: 0, captions: '' }
      ]
    },
    { id: 'films', number: '03', title: 'Films',
      projects: [
        { id: 'vr-show', title: 'Virtual Legend', type: 'Visual narrative',
          description: 'A new VR headset turns a quiet night in into a battle for another world.', poster: 'assets/film-vr-poster.jpg', focal: '50% 50%', preview: 'assets/film-vr-preview.mp4', film: 'assets/films/vr-show.mp4', previewLength: 0, captions: '' },
        { id: 'the-systems-compass', title: 'The Systems Compass', type: 'Science-fiction film',
          description: 'A hopeful vision of tomorrow, where people, science and shared systems learn to move as one.', poster: 'assets/film-systems-poster.jpg', focal: '50% 50%', preview: 'assets/film-systems-preview.mp4', film: 'assets/films/the-systems-compass.mp4', previewLength: 0, captions: '' },
        { id: 'samurai', title: 'Dragonfall', type: 'Cinematic short',
          description: 'A lone warrior meets a force larger than legend beneath a storm-dark sky.', poster: 'assets/film-samurai-poster.jpg', focal: '50% 50%', preview: 'assets/film-samurai-preview.mp4', film: 'assets/films/samurai.mp4', previewLength: 0, captions: '' }
      ]
    }
  ]
};
