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
  role: 'AI artist & filmmaker',
  showreel: {
    title: 'Showreel', description: 'A glimpse into my world of image and motion.',
    poster: 'assets/showreel-poster.jpg', preview: 'assets/showreel-preview.mp4?v=5',
    film: 'assets/films/showreel.mp4', previewStart: 0, previewLength: 0,
    label: 'Showreel preview', role: 'AI artist & filmmaker', year: '2026',
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
    { id: 'films', number: '01', title: 'Films',
      projects: [
        { id: 'vr-show', title: 'VR Show', type: 'Visual narrative', year: '', role: 'AI filmmaking',
          description: 'A journey through shifting worlds where imagination becomes physical.', poster: 'assets/film-vr-poster.jpg', focal: '50% 50%', preview: 'assets/film-vr-preview.mp4', film: 'assets/films/vr-show.mp4', previewLength: 0, captions: '' },
        { id: 'the-systems-compass', title: 'The Systems Compass', type: 'Science-fiction film', year: '', role: 'AI filmmaking',
          description: 'A speculative vision of people, technology and the systems shaping tomorrow.', poster: 'assets/film-systems-poster.jpg', focal: '50% 50%', preview: 'assets/film-systems-preview.mp4', film: 'assets/films/the-systems-compass.mp4', previewLength: 0, captions: '' },
        { id: 'samurai', title: 'Samurai', type: 'Cinematic short', year: '', role: 'AI filmmaking',
          description: 'A lone warrior meets a force larger than legend beneath a storm-dark sky.', poster: 'assets/film-samurai-poster.jpg', focal: '50% 50%', preview: 'assets/film-samurai-preview.mp4', film: 'assets/films/samurai.mp4', previewLength: 0, captions: '' }
      ]
    },
    { id: 'commercials', number: '02', title: 'Commercials',
      projects: [
        { id: 'one-last-message', title: 'One Last Message', type: 'Commercial film', year: '', role: 'AI filmmaking',
          description: 'A quiet story about distance, memory and the message that still connects us.', poster: 'assets/film-message-poster.jpg', focal: '50% 50%', preview: 'assets/film-message-preview.mp4', film: 'assets/films/one-last-message.mp4', previewLength: 0, captions: '' },
        { id: 'fix-this-plumbing', title: 'Fix This Plumbing', type: 'Commercial film', year: '', role: 'AI filmmaking',
          description: 'A familiar service problem reframed with pace, clarity and character.', poster: 'assets/commercial-fix-plumbing-poster.jpg', focal: '50% 50%', preview: 'assets/commercial-fix-plumbing-preview.mp4', film: 'assets/films/fix-this-plumbing.mp4', previewLength: 0, captions: '' },
        { id: 'real-estate', title: 'Real Estate', type: 'Commercial film', year: '', role: 'AI filmmaking',
          description: 'Architecture and atmosphere shaped into a polished property film.', poster: 'assets/commercial-real-estate-poster.jpg', focal: '50% 50%', preview: 'assets/commercial-real-estate-preview.mp4', film: 'assets/films/real-estate.mp4', previewLength: 0, captions: '' },
        { id: 'the-impossible-drive', title: 'The Impossible Drive', type: 'Automotive film', year: '', role: 'AI filmmaking',
          description: 'An automotive journey that bends landscape, motion and possibility.', poster: 'assets/commercial-impossible-drive-poster.jpg?v=2', focal: '50% 50%', preview: 'assets/commercial-impossible-drive-preview.mp4?v=2', film: 'assets/films/the-impossible-drive.mp4', previewLength: 0, captions: '' }
      ]
    },
    { id: 'short-form', number: '03', title: 'Short-form',
      projects: [
        { id: 'bed', title: 'Bed', type: 'Short-form', year: '', role: 'AI image & motion', description: 'An ordinary bed moves through a world that refuses to slow down.', poster: 'assets/short-bed-poster.jpg', focal: '50% 50%', preview: 'assets/short-bed-preview.mp4', film: 'assets/films/bed.mp4', previewLength: 0, captions: '' },
        { id: 'bubble-world', title: 'Bubble World', type: 'Short-form', year: '', role: 'AI image & motion', description: 'A playful reality expands around one impossible bubble.', poster: 'assets/short-bubble-world-poster.jpg?v=5', focal: '50% 50%', preview: 'assets/short-bubble-world-preview.mp4?v=5', film: 'assets/films/bubble-world.mp4', previewLength: 0, captions: '' },
        { id: 'burger-macro', title: 'Burger Macro', type: 'Short-form', year: '', role: 'AI image & motion', description: 'Heat, texture and appetite captured at an impossibly close scale.', poster: 'assets/short-burger-macro-poster.jpg?v=2', focal: '50% 50%', preview: 'assets/short-burger-macro-preview.mp4?v=2', film: 'assets/films/burger-macro.mp4', previewLength: 0, captions: '' },
        { id: 'camera-motion', title: 'Camera Motion', type: 'Short-form', year: '', role: 'AI image & motion', description: 'One continuous camera move transforms scale, space and perspective.', poster: 'assets/short-camera-motion-poster.jpg?v=2', focal: '50% 50%', preview: 'assets/short-camera-motion-preview.mp4?v=2', film: 'assets/films/camera-motion.mp4', previewLength: 0, captions: '' },
        { id: 'car-versions', title: 'Car Versions', type: 'Short-form', year: '', role: 'AI image & motion', description: 'A single automotive idea evolves through contrasting visual worlds.', poster: 'assets/short-car-versions-poster.jpg', focal: '50% 50%', preview: 'assets/short-car-versions-preview.mp4', film: 'assets/films/car-versions.mp4', previewLength: 0, captions: '' },
        { id: 'coat-01', title: 'Coat 01', type: 'Fashion motion', year: '', role: 'AI image & motion', description: 'Fashion in motion, shaped by silhouette, altitude and cold air.', poster: 'assets/short-coat-01-poster.jpg', focal: '50% 50%', preview: 'assets/short-coat-01-preview.mp4', film: 'assets/films/coat-01.mp4', previewLength: 0, captions: '' },
        { id: 'coat-02', title: 'Coat 02', type: 'Fashion motion', year: '', role: 'AI image & motion', description: 'Texture and movement turn a blue coat into a living form.', poster: 'assets/short-coat-02-poster.jpg?v=2', focal: '50% 50%', preview: 'assets/short-coat-02-preview.mp4?v=2', film: 'assets/films/coat-02.mp4', previewLength: 0, captions: '' },
        { id: 'drink-ad', title: 'Drink Ad', type: 'Product motion', year: '', role: 'AI image & motion', description: 'Colour, condensation and impact built around one refreshing moment.', poster: 'assets/short-drink-ad-poster.jpg?v=2', focal: '50% 50%', preview: 'assets/short-drink-ad-preview.mp4?v=2', film: 'assets/films/drink-ad.mp4', previewLength: 0, captions: '' },
        { id: 'eyewear', title: 'Eyewear', type: 'Fashion motion', year: '', role: 'AI image & motion', description: 'Eyewear becomes character through clean framing and controlled motion.', poster: 'assets/short-eyewear-poster.jpg', focal: '50% 50%', preview: 'assets/short-eyewear-preview.mp4', film: 'assets/films/eyewear.mp4', previewLength: 0, captions: '' },
        { id: 'flavor-switch', title: 'Flavor Switch', type: 'Product motion', year: '', role: 'AI image & motion', description: 'One visual gesture changes the product, colour and entire mood.', poster: 'assets/short-flavor-switch-poster.jpg?v=2', focal: '50% 50%', preview: 'assets/short-flavor-switch-preview.mp4?v=2', film: 'assets/films/flavor-switch.mp4', previewLength: 0, captions: '' },
        { id: 'luxury-real-estate', title: 'Luxury Real Estate', type: 'Architecture motion', year: '', role: 'AI image & motion', description: 'Light and architecture guide a compact tour through modern luxury.', poster: 'assets/short-luxury-real-estate-poster.jpg', focal: '50% 50%', preview: 'assets/short-luxury-real-estate-preview.mp4', film: 'assets/films/luxury-real-estate.mp4', previewLength: 0, captions: '' }
      ]
    }
  ]
};
