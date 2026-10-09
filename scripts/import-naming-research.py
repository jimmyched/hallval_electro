"""Import a complete naming-review export, retaining its browser storage bridge."""
import argparse
import html
import json
import re
from html.parser import HTMLParser
from pathlib import Path

parser = argparse.ArgumentParser(description=__doc__)
parser.add_argument('export', type=Path)
parser.add_argument('--output', type=Path, default=Path(__file__).resolve().parents[1] / 'public/research/naming.html')
args = parser.parse_args()
document = args.export.read_text(encoding='utf-8')

class ExportFrame(HTMLParser):
    source = None

    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        if tag == 'iframe' and attrs.get('id') == 'codex-visualization':
            self.source = attrs.get('data-srcdoc')

frame = ExportFrame()
frame.feed(document)
if not frame.source:
    raise ValueError('Expected the complete standalone naming export and its storage bridge.')

match = re.search(r'^const data=(\{[^\n]+\});$', frame.source, re.M)
if not match:
    raise ValueError('The naming research dataset is missing.')
data = json.loads(match[1])

def sanitize(value):
    if isinstance(value, dict):
        return {key: Path(item).name if key == 'sourceFile' and isinstance(item, str) and item.startswith('/') else sanitize(item) for key, item in value.items()}
    if isinstance(value, list):
        return [sanitize(item) for item in value]
    return value

data = sanitize(data)
literal = json.dumps(data, ensure_ascii=False, separators=(',', ':')).replace('</', '<\\/')
inner = frame.source[:match.start(1)] + literal + frame.source[match.end(1):]
robots = '<meta name="robots" content="noindex, nofollow, noarchive">'
inner = inner.replace('<head>', '<head>\n' + robots, 1)
inner = inner.replace('All names and earlier decisions retained.</span></footer>', 'All names and earlier decisions retained.</span><span>Shortlists save separately in each browser.</span></footer>', 1)
document, count = re.subn(r'data-srcdoc="[^"]*"', lambda _: 'data-srcdoc="' + html.escape(inner, quote=True) + '"', document, count=1)
if count != 1:
    raise ValueError('Expected one embedded review frame.')
document = document.replace('<head>', '<head>\n' + robots, 1)
if '/Users/' in document or '127.0.0.1' in document:
    raise ValueError('Unexpected local-machine reference remains in the public export.')
args.output.parent.mkdir(parents=True, exist_ok=True)
args.output.write_text(document, encoding='utf-8')
print(f'Imported {len(data["records"])} names with all history and international analysis.')
