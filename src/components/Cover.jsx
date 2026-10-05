import { useState } from 'react';

export default function Cover({ src, title, className = '' }) {
  const [failed, setFailed] = useState(false);
  if (!src || failed) {
    return <div className={`cover placeholder ${className}`} aria-hidden="true">{title?.[0]?.toUpperCase() || '?'}</div>;
  }
  return <img className={`cover ${className}`} src={src} alt="" loading="lazy" onError={() => setFailed(true)} />;
}
