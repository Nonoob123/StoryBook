async (page) => {
  const text = document.querySelectorAll('script')[0].textContent;
  const lines = text.split('\n');
  let err = null;
  let ok = 0;
  for (let i = 0; i < lines.length; i++) {
    try {
      eval(lines.slice(0, i+1).join('\n'));
      ok = i + 1;
    } catch(e) {
      err = { line: i + 1, msg: e.message };
      break;
    }
  }
  return { error: err, good: ok, totalLines: lines.length };
}