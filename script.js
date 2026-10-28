(function () {
  var start = new Date(2025, 5, 1);      // Sun Jun 1 2025
  var end = new Date(2026, 7, 31);       // Aug 31 2026
  var summit = [new Date(2025, 5, 1), new Date(2025, 10, 30)];
  var sonarx = [new Date(2025, 7, 1), new Date(2026, 6, 31)];
  var cells = document.getElementById('cells');
  var months = document.getElementById('months');
  var mn = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  var lastMonth = -1, col = 0, d = new Date(start);
  function within(day, r) { return day >= r[0] && day <= r[1]; }
  while (d <= end) {
    var week = document.createElement('span');
    week.style.display = 'contents';
    for (var i = 0; i < 7; i++) {
      var day = new Date(d.getFullYear(), d.getMonth(), d.getDate() + i);
      var c = document.createElement('span');
      var n = (within(day, summit) ? 1 : 0) + (within(day, sonarx) ? 1 : 0);
      c.className = 'c' + (n ? ' l' + n : '');
      if (day > end) c.style.visibility = 'hidden';
      week.appendChild(c);
    }
    cells.appendChild(week);
    var m = d.getMonth();
    var label = document.createElement('span');
    if (m !== lastMonth) { label.textContent = mn[m]; lastMonth = m; }
    months.appendChild(label);
    d = new Date(d.getFullYear(), d.getMonth(), d.getDate() + 7);
    col++;
  }
  var btn = document.getElementById('copy');
  btn.addEventListener('click', function () {
    var text = document.getElementById('email').textContent;
    function sel() {
      var r = document.createRange(); r.selectNodeContents(document.getElementById('email'));
      var s = window.getSelection(); s.removeAllRanges(); s.addRange(r);
      btn.textContent = 'Selected';
    }
    try {
      navigator.clipboard.writeText(text).then(function () { btn.textContent = 'Copied'; }, sel);
    } catch (e) { sel(); }
    setTimeout(function () { btn.textContent = 'Copy'; }, 1800);
  });
  var links = document.querySelectorAll('.tabs a');
  links.forEach(function (a) {
    a.addEventListener('click', function () {
      links.forEach(function (x) { x.classList.remove('on'); });
      a.classList.add('on');
    });
  });
})();
