'use client';
import { MAX_FILE_SIZE_BYTES, MAX_PDF_PAGES } from './constants';

export async function parseFile(file: File): Promise<{ text: string; name: string }> {
  if (file.size > MAX_FILE_SIZE_BYTES) throw new Error('File is too large (max 2 MB). Try pasting the text instead.');

  const ext = file.name.split('.').pop()?.toLowerCase() ?? '';

  if (ext === 'doc') {
    throw new Error('Legacy .doc files aren\'t supported. Please save as .docx or copy-paste the text.');
  }

  if (ext === 'pdf' || file.type === 'application/pdf') {
    return parsePdf(file);
  }

  if (ext === 'docx' || file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
    return parseDocx(file);
  }

  // txt / md / plain text
  return parseTxt(file);
}

async function parsePdf(file: File): Promise<{ text: string; name: string }> {
  const pdfjsLib = await import('pdfjs-dist');
  pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js`;

  const arrayBuffer = await file.arrayBuffer();
  const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;

  const maxPages = Math.min(pdf.numPages, MAX_PDF_PAGES);
  const lines: string[] = [];

  for (let p = 1; p <= maxPages; p++) {
    const page = await pdf.getPage(p);
    const content = await page.getTextContent();

    // Group items by y-position
    const byY = new Map<number, string[]>();
    for (const item of content.items) {
      if ('str' in item) {
        const y = Math.round((item as any).transform[5]);
        if (!byY.has(y)) byY.set(y, []);
        byY.get(y)!.push(item.str);
      }
    }

    const sorted = [...byY.entries()].sort((a, b) => b[0] - a[0]);
    for (const [, words] of sorted) {
      const line = words.join(' ').trim();
      if (line) lines.push(line);
    }
  }

  const text = lines.join('\n').trim();
  if (text.length < 50) {
    throw new Error('Couldn\'t extract text from this PDF — it may be scanned. Try pasting the text instead.');
  }

  return { text, name: file.name };
}

async function parseDocx(file: File): Promise<{ text: string; name: string }> {
  const mammoth = await import('mammoth');
  const arrayBuffer = await file.arrayBuffer();
  const result = await mammoth.extractRawText({ arrayBuffer });
  const text = result.value.trim();
  if (!text) throw new Error('Couldn\'t extract text from this file. Try pasting the text instead.');
  return { text, name: file.name };
}

async function parseTxt(file: File): Promise<{ text: string; name: string }> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const text = (e.target?.result as string ?? '').trim();
      resolve({ text, name: file.name });
    };
    reader.onerror = () => reject(new Error('Failed to read the file.'));
    reader.readAsText(file);
  });
}
