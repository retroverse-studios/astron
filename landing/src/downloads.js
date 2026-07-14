/**
 * Fetch the latest GitHub Release, classify its assets per platform, and wire
 * up the download UI:
 *   - the hero button becomes a direct download for the visitor's platform
 *   - the #download section shows every platform's pills (detected one highlighted)
 * Direct `browser_download_url` links mean visitors never see the GitHub UI.
 * Falls back gracefully if there is no published release yet.
 */
const REPO = 'retroverse-studios/astron';
const API_URL = `https://api.github.com/repos/${REPO}/releases/latest`;
const RELEASES_URL = `https://github.com/${REPO}/releases`;

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
      'First desktop release coming soon — the browser version is fully featured in the meantime.';
    return;
  }

  const version = release.tag_name || '';
  const assets = new Map();
  for (const asset of release.assets || []) {
    const slot = classifyAsset(asset.name);
    if (slot && !assets.has(slot)) {
      assets.set(slot, { url: asset.browser_download_url, size: asset.size });
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
      heroNote.innerHTML =
        `${version} · direct download · <a href="#download">other platforms ↓</a>`;
      return;
    }
  }
  // Unknown platform (or no matching asset): keep the button as an anchor to #download.
  heroNote.innerHTML = `${version} · <a href="#download">choose your platform ↓</a>`;
}

populateDownloads();
