import { useState, useEffect } from 'react';
import { Play, Pause, SkipForward, Music } from 'lucide-react';
import { playHudClickSound } from '../../lib/audio';

const EA_TRAX_PLAYLIST = [
  { id: 1, title: 'Nine Thou (Grant Mohrman Mix)', artist: 'Styles of Beyond', album: 'NFS Most Wanted (2005)' },
  { id: 2, title: 'Shapeshifter', artist: 'Celldweller ft. Style of Beyond', album: 'NFS Most Wanted (2005)' },
  { id: 3, title: 'Fired Up', artist: 'Hush', album: 'NFS Most Wanted (2005)' },
  { id: 4, title: 'I Am Rock', artist: 'Rock', album: 'NFS Most Wanted (2005)' },
  { id: 5, title: 'Skinnyman', artist: 'Static-X', album: 'NFS Most Wanted (2005)' },
];

export default function EaTraxPlayer() {
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showBanner, setShowBanner] = useState(true);

  const track = EA_TRAX_PLAYLIST[currentTrackIndex];

  const handleNextTrack = () => {
    playHudClickSound();
    setCurrentTrackIndex((prev) => (prev + 1) % EA_TRAX_PLAYLIST.length);
    setShowBanner(true);
  };

  const handleTogglePlay = () => {
    playHudClickSound();
    setIsPlaying(!isPlaying);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowBanner(false);
    }, 6000);
    return () => clearTimeout(timer);
  }, [currentTrackIndex]);

  return (
    <div className="ea-trax">
      <div className="ea-trax__pill">
        <button
          className="ea-trax__btn"
          onClick={handleTogglePlay}
          title={isPlaying ? 'Pause EA Trax' : 'Play EA Trax'}
        >
          {isPlaying ? <Pause size={12} /> : <Play size={12} />}
        </button>

        <div className="ea-trax__info" onClick={() => setShowBanner(!showBanner)}>
          <Music size={12} className={isPlaying ? 'ea-trax__icon--spinning' : ''} />
          <span className="ea-trax__title">{track.title}</span>
          <span className="ea-trax__artist">— {track.artist}</span>
        </div>

        <button
          className="ea-trax__btn"
          onClick={handleNextTrack}
          title="Next Track"
        >
          <SkipForward size={12} />
        </button>

        {isPlaying && (
          <div className="ea-trax__eq">
            <span className="eq-bar eq-bar--1" />
            <span className="eq-bar eq-bar--2" />
            <span className="eq-bar eq-bar--3" />
            <span className="eq-bar eq-bar--4" />
          </div>
        )}
      </div>

      {showBanner && (
        <div className="ea-trax__banner">
          <span className="ea-trax__banner-header">EA TRAX™</span>
          <span className="ea-trax__banner-song">{track.title}</span>
          <span className="ea-trax__banner-by">PERFORMED BY {track.artist.toUpperCase()}</span>
        </div>
      )}
    </div>
  );
}
