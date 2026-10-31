/**
 * Fetch the latest GitHub Release, classify its assets per platform, and wire
 * up the download UI:
 *   - the hero button becomes a direct download for the visitor's platform
 *   - the #download section shows every platform's pills (detected one highlighted)
 * Direct `browser_download_url` links mean visitors never see the GitHub UI.
 * Falls back gracefully if there is no published release yet.
 * API values are treated as untrusted: text goes through textContent and
 * download hrefs must be https on a GitHub host before they are used.
 */
const REPO = 'retroverse-studios/astron';
const API_URL = `https://api.github.com/repos/${REPO}/releases/latest`;

function safeDownloadUrl(value) {
  try {
    const u = new URL(value);
    if (u.protocol !== 'https:') return null;
    if (u.hostname !== 'github.com' && !u.hostname.endsWith('.githubusercontent.com')) return null;
    return u.href;
  } catch {
    return null;
  }
}

/** Map a release asset filename to a slot in the download matrix. */
function classifyAsset(name) {
  const n = name.toLowerCase();
  if (n.endsWith('.exe')) return 'win-setup';
  if (n.endsWith('.msi')) return 'win-msi';
  if (n.endsWith('.dmg')) {
    if (n.includes('aarch64') || n.includes('arm64')) return 'mac-arm';
    return 'mac-x64';
  }
  if (n.endsWith('.appimage')) return 'linux-appimage';
  if (n.endsWith('.deb')) return 'linux-deb';
  if (n.endsWith('.rpm')) return 'linux-rpm';
  return null;
}

/** 'windows' | 'mac' | 'linux' | null */
function detectPlatform() {
  const ua = navigator.userAgent.toLowerCase();
  const plat = (navigator.userAgentData?.platform || navigator.platform || '').toLowerCase();
  if (plat.includes('win') || ua.includes('windows')) return 'windows';
  if (plat.includes('mac') || ua.includes('mac os')) return 'mac';
  if (plat.includes('linux') || ua.includes('linux')) return 'linux';
  return null;
}

/** Best single asset for a platform (used by the hero button). */
const PREFERRED = {
  windows: ['win-setup', 'win-msi'],
  mac: ['mac-arm', 'mac-x64'],
  linux: ['linux-appimage', 'linux-deb', 'linux-rpm'],
};

const PLATFORM_LABEL = { windows: 'WINDOWS', mac: 'MACOS', linux: 'LINUX' };

function formatSize(bytes) {
  if (!bytes) return '';
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

/** Set the hero note to text + a #download anchor, without innerHTML. */
function setHeroNote(heroNote, text, linkLabel) {
  heroNote.textContent = `${text} · `;
  const a = document.createElement('a');
  a.href = '#download';
  a.textContent = linkLabel;
  heroNote.appendChild(a);
}

async function populateDownloads() {
  const heroBtn = document.getElementById('heroDownload');
  const heroNote = document.getElementById('heroDlNote');
  const versionEl = document.getElementById('dlVersion');
  const platformsEl = document.getElementById('platforms');
  const platform = detectPlatform();

  let release;
  try {
    const response = await fetch(API_URL);
    if (!response.ok) throw new Error('No release found');
    release = await response.json();
  } catch {
    versionEl.textContent =
      'Could not check for the latest desktop release just now — the browser version above is fully featured, or see all releases on GitHub below.';
    return;
  }

  const version = typeof release.tag_name === 'string' ? release.tag_name : '';
  const assets = new Map();
  for (const asset of release.assets || []) {
    if (!asset || typeof asset.name !== 'string') continue;
    const slot = classifyAsset(asset.name);
    const url = safeDownloadUrl(asset.browser_download_url);
    if (slot && url && !assets.has(slot)) {
      assets.set(slot, { url, size: asset.size });
    }
  }

  if (assets.size === 0) {
    versionEl.textContent = `${version} — no desktop builds in this release yet. Use the browser version.`;
    return;
  }

  // Fill the download matrix.
  platformsEl.hidden = false;
  versionEl.textContent = `${version} — free & open source, direct downloads:`;
  for (const pill of platformsEl.querySelectorAll('.pill')) {
    const found = assets.get(pill.dataset.asset);
    if (found) {
      pill.href = found.url;
      pill.hidden = false;
      const ext = pill.querySelector('span');
      if (ext && found.size) ext.textContent = `${ext.textContent} · ${formatSize(found.size)}`;
    }
  }

  // Hide platform columns that ended up empty, highlight the visitor's.
  for (const col of platformsEl.querySelectorAll('.platform')) {
    const visible = [...col.querySelectorAll('.pill')].some((p) => !p.hidden);
    if (!visible) {
      col.hidden = true;
    } else if (col.dataset.platform === platform) {
      col.classList.add('detected');
    }
  }

  // Point the hero button straight at the visitor's preferred asset.
  if (platform) {
    const slot = (PREFERRED[platform] || []).find((s) => assets.has(s));
    if (slot) {
      heroBtn.href = assets.get(slot).url;
      heroBtn.textContent = `[ ⬇ DOWNLOAD FOR ${PLATFORM_LABEL[platform]} ]`;
      setHeroNote(heroNote, `${version} · direct download`, 'other platforms ↓');
      return;
    }
  }
  // Unknown platform (or no matching asset): keep the button as an anchor to #download.
  setHeroNote(heroNote, version, 'choose your platform ↓');
}

populateDownloads();
