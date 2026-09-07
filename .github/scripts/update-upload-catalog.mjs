import fs from 'node:fs';

const [manifestPath, downloadUrl, storage, customCatalogPath] = process.argv.slice(2);
if (!manifestPath || !downloadUrl || !storage) throw new Error('Argumentos de publicacao ausentes.');
const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
const catalogPath = customCatalogPath || 'public/catalog.json';
const catalog = JSON.parse(fs.readFileSync(catalogPath, 'utf8'));
catalog.playbooks ||= [];
catalog.changes ||= [];

const now = new Date().toISOString();
const key = String(manifest.productCode).toLowerCase();
const prior = catalog.playbooks.find(item => String(item.productCode).toLowerCase() === key);
if (prior?.storage === 'repository' && prior.downloadUrl) {
  try {
    const oldName = decodeURIComponent(new URL(prior.downloadUrl).pathname.split('/').pop());
    const oldPath = `playbooks/${oldName}`;
    if (oldName !== manifest.targetFile && /^[A-Za-z0-9._-]+\.apbx$/i.test(oldName) && fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
  } catch (_) {}
}
const item = {
  productCode: manifest.productCode,
  name: manifest.name,
  author: manifest.author || 'Desconhecido',
  version: manifest.version,
  description: manifest.description || '',
  category: manifest.category || 'balanced',
  tags: Array.isArray(manifest.tags) ? manifest.tags.slice(0, 10) : [],
  featured: Boolean(manifest.featured),
  source: manifest.source === 'ame' ? 'ame' : 'ktw',
  verified: true,
  verifiedAt: now,
  publishedAt: prior?.publishedAt || now,
  sha256: String(manifest.sha256).toLowerCase(),
  downloadUrl,
  website: manifest.website || null,
  git: manifest.git || null,
  publicNotes: manifest.publicNotes || '',
  storage,
  analysis: manifest.analysis || {},
};

catalog.playbooks = catalog.playbooks.filter(entry => String(entry.productCode).toLowerCase() !== key);
catalog.playbooks.push(item);
catalog.playbooks.sort((a, b) => a.name.localeCompare(b.name, 'pt-BR'));
catalog.updatedAt = now;
catalog.changes.unshift({
  id: `${manifest.productCode}-${Date.now()}`,
  productCode: manifest.productCode,
  name: manifest.name,
  version: manifest.version,
  type: prior ? 'updated' : 'published',
  date: now,
  storage,
  summary: manifest.publicNotes || (prior ? `Arquivo e analise atualizados para v${manifest.version}.` : `Novo playbook v${manifest.version} analisado e publicado.`),
});
catalog.changes = catalog.changes.slice(0, 100);
fs.writeFileSync(catalogPath, JSON.stringify(catalog, null, 2) + '\n');
