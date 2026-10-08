import JSZip from 'jszip';
import { SkillItem } from '../types';

export async function generateSpckZip(currentSkills: SkillItem[], presetName: string = 'custom'): Promise<Blob> {
  const zip = new JSZip();

  // Load actual vanilla files from /spck-app/ or fallback to embedded templates
  let indexHtml = '';
  let styleCss = '';
  let appJs = '';
  let manifestJson = '';
  let readmeMd = '';

  try {
    const [resHtml, resCss, resJs, resManifest, resReadme] = await Promise.all([
      fetch('/spck-app/index.html').then(r => r.text()),
      fetch('/spck-app/style.css').then(r => r.text()),
      fetch('/spck-app/app.js').then(r => r.text()),
      fetch('/spck-app/manifest.json').then(r => r.text()),
      fetch('/spck-app/README.md').then(r => r.text()),
    ]);

    indexHtml = resHtml;
    styleCss = resCss;
    appJs = resJs;
    manifestJson = resManifest;
    readmeMd = resReadme;
  } catch (e) {
    console.warn('Falling back to local template fetch error:', e);
  }

  // If appJs was fetched, let's also inject the user's customized skills into the default preset
  if (appJs && currentSkills.length > 0) {
    const serializedSkills = JSON.stringify(currentSkills, null, 2);
    // Inject user's current customized skills as the default active preset
    appJs = appJs.replace(
      /custom:\s*\[\]/,
      `custom: ${serializedSkills}`
    );
  }

  // Add files to zip
  zip.file('index.html', indexHtml || '<!DOCTYPE html><html><body><h1>SkillRadar</h1></body></html>');
  zip.file('style.css', styleCss || 'body { background: #0f172a; color: #fff; }');
  zip.file('app.js', appJs || '// SkillRadar App');
  zip.file('manifest.json', manifestJson || '{}');
  zip.file('README.md', readmeMd || '# SkillRadar for Spck Editor');

  // Also include a backup JSON profile inside the zip!
  const backupProfile = {
    exportedFrom: 'SkillRadar Web App',
    preset: presetName,
    skills: currentSkills,
    date: new Date().toISOString()
  };
  zip.file('my-skills-profile.json', JSON.stringify(backupProfile, null, 2));

  // Generate blob
  const zipBlob = await zip.generateAsync({
    type: 'blob',
    compression: 'DEFLATE',
    compressionOptions: { level: 9 }
  });

  return zipBlob;
}

export function triggerDownloadBlob(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}
