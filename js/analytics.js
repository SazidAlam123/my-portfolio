/* Google Analytics 4 - loads only after the visitor accepts (cookie notice). */
(function () {
  var ID = 'G-1PPTGL3QLV', KEY = 'cookie-consent-v1', loaded = false;

  function get() { try { return localStorage.getItem(KEY); } catch (e) { return null; } }
  function set(v) { try { localStorage.setItem(KEY, v); } catch (e) {} }

  window.dataLayer = window.dataLayer || [];
  window.gtag = function () { window.dataLayer.push(arguments); };

  function load() {
    if (loaded) return;
    loaded = true;
    window['ga-disable-' + ID] = false;
    var s = document.createElement('script');
    s.async = true;
    s.src = 'https://www.googletagmanager.com/gtag/js?id=' + ID;
    document.head.appendChild(s);
    window.gtag('js', new Date());
    window.gtag('config', ID);
  }

  function clearCookies() {
    var host = location.hostname, parts = host.split('.');
    var root = parts.length > 2 ? parts.slice(-2).join('.') : host;
    var domains = ['', host, '.' + host, root, '.' + root];
    document.cookie.split(';').forEach(function (c) {
      var n = c.split('=')[0].trim();
      if (n.indexOf('_ga') !== 0) return;
      domains.forEach(function (d) {
        document.cookie = n + '=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/' + (d ? '; domain=' + d : '');
      });
    });
  }

  function btn(text, cls, fn) {
    var b = document.createElement('button');
    b.type = 'button'; b.className = cls; b.textContent = text; b.onclick = fn;
    return b;
  }

  function closeBanner() {
    var d = document.getElementById('ckb');
    if (d) d.remove();
  }

  function banner() {
    if (document.getElementById('ckb')) return;
    var d = document.createElement('div');
    d.id = 'ckb'; d.className = 'ckb';
    d.setAttribute('role', 'dialog');
    d.setAttribute('aria-label', 'Cookie notice');
    var p = document.createElement('p');
    p.appendChild(document.createTextNode('I use Google Analytics cookies to see which pages are useful. They load only if you accept. '));
    var a = document.createElement('a');
    a.href = '/privacy#cookies'; a.textContent = 'Privacy policy';
    p.appendChild(a);
    var w = document.createElement('div');
    w.className = 'ckb-btns';
    w.appendChild(btn('Decline', 'ckb-no', function () {
      set('denied'); window['ga-disable-' + ID] = true; clearCookies(); closeBanner();
    }));
    w.appendChild(btn('Accept', 'ckb-yes', function () {
      set('granted'); closeBanner(); load();
    }));
    d.appendChild(p); d.appendChild(w);
    document.body.appendChild(d);
  }

  var v = get();
  if (v === 'granted') load();
  else if (v === 'denied') window['ga-disable-' + ID] = true;
  else banner();

  document.addEventListener('click', function (e) {
    var t = e.target;
    var s = t.closest && t.closest('[data-cookie-settings]');
    if (s) { e.preventDefault(); banner(); return; }
    var a = t.closest && t.closest('a[data-track]');
    if (!a || get() !== 'granted') return;
    window.gtag('event', 'click_' + a.getAttribute('data-track'), { link_url: a.href, page_path: location.pathname });
  });
})();
