const routes = [
  ["Home", "/"],
  ["Foundry", "/about/"],
  ["Approach", "/approach/"],
  ["Solutions", "/solutions/"],
  ["Partnership", "/partnership/"],
];

const activeRoute = (href) => {
  const current = window.location.pathname.replace(/index\.html$/, "");
  if (href === "/") return current === "/";
  return current.startsWith(href);
};

class SiteHeader extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <header class="site-header" data-header>
        <div class="nav-shell">
          <a class="brand" href="/" aria-label="Chuzosho home">
            <span class="brand-mark" aria-hidden="true">CZ</span><span class="brand-name">CHUZOSHO</span>
          </a>
          <button class="nav-toggle" type="button" aria-label="Open navigation" aria-expanded="false"><span></span><span></span><span></span></button>
          <nav class="nav-links" aria-label="Primary navigation">
            ${routes.map(([label, href]) => `<a class="nav-link" href="${href}" ${activeRoute(href) ? 'aria-current="page"' : ""}>${label}</a>`).join("")}
            <a class="nav-cta" href="/contact/">Start a conversation</a>
          </nav>
        </div>
      </header>`;
    const header = this.querySelector("[data-header]");
    const toggle = this.querySelector(".nav-toggle");
    const nav = this.querySelector(".nav-links");
    const syncHeader = () => header.classList.toggle("is-scrolled", scrollY > 18);
    syncHeader();
    addEventListener("scroll", syncHeader, { passive: true });
    toggle.addEventListener("click", () => {
      const open = nav.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", String(open));
      toggle.setAttribute("aria-label", open ? "Close navigation" : "Open navigation");
      document.body.classList.toggle("nav-open", open);
    });
  }
}

class SiteFooter extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <footer class="site-footer">
        <div class="footer-shell">
          <div class="footer-top">
            <div class="footer-brand"><a class="brand" href="/"><span class="brand-mark">CZ</span><span>CHUZOSHO</span></a><p>A Hosho Digital Company.</p></div>
            <div class="footer-nav">
              <div><h3>Foundry</h3><a href="/about/">About</a><a href="/approach/">Approach</a><a href="/partnership/">Partnership</a></div>
              <div><h3>Solutions</h3><a href="/solutions/harness/">Harness</a><a href="/solutions/codegraff/">CodeGraff</a><a href="/solutions/codedb/">CodeDB</a></div>
              <div><h3>Connect</h3><a href="/contact/">Contact</a><a href="https://hoshodigital.com/">HOSHŌ DIGITAL</a></div>
            </div>
          </div>
          <div class="footer-bottom"><span>© 2026 Chuzosho.</span><span>A Hosho Digital Company.</span></div>
        </div>
      </footer>`;
  }
}

customElements.define("site-header", SiteHeader);
customElements.define("site-footer", SiteFooter);

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("is-visible");
      observer.unobserve(entry.target);
    }
  });
}, { threshold: .12, rootMargin: "0px 0px -40px" });
document.querySelectorAll("[data-reveal]").forEach((node) => observer.observe(node));

document.querySelectorAll("form[data-demo-form]").forEach((form) => {
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const button = form.querySelector("button[type='submit']");
    button.textContent = "Endpoint required";
    button.disabled = true;
  });
});
