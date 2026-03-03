import Mach2Logo from '../Mach2Logo'

export default function Hero() {
  return (
    <section id="header">
      <div className="wrap">
        <div className="hgrid">

          <div>
            <div className="eyebrow rise r1">Principal AI-Native Cloud Architect</div>
            <h1 className="rise r2">
              Your platform should<br />
              <em>accelerate growth.</em> Right now it probably isn't.
            </h1>
            <p className="hero-sub rise r3">
              I help <strong>Seed–Series C SaaS CTOs and engineering leaders</strong> build
              scalable SaaS infrastructure for growth-stage velocity. I design{' '}
              <strong>automated, secure, high-leverage cloud platforms</strong> that scale
              AI-native products without architectural rewrites.
            </p>
            <div className="hero-btns rise r4">
              <a
                href="https://calendly.com/chriscloud-weber/30min"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-p"
              >
                Get in touch
              </a>
              <a href="#portfolio" className="btn btn-g">See My Work</a>
            </div>
            <div className="trust rise r5">
              <div className="t-item">
                <span className="t-n">13+</span>
                <span className="t-l">Years designing enterprise cloud systems</span>
              </div>
              <div className="t-item">
                <span className="t-n">2,500</span>
                <span className="t-l">Developers enabled on global platforms</span>
              </div>
              <div className="t-item">
                <span className="t-n">90%</span>
                <span className="t-l">Operational automation on prior platforms</span>
              </div>
              <div className="t-item">
                <span className="t-n">3 Clouds</span>
                <span className="t-l">AWS · GCP · Azure — no vendor bias</span>
              </div>
            </div>
          </div>

          <div className="hphoto rise r6">
            <img src="https://mach2.cloud/assets/img/Chris.png" alt="Christian Weber" />
            <div className="pbadge">
              <span className="pb-l">Available</span>
              <span className="pb-v">Remote · US / EU</span>
            </div>
          </div>

        </div>
      </div>

      {/* Hidden preload for logo (used in timeline) */}
      <span style={{ display: 'none' }}>
        <Mach2Logo size={1} />
      </span>
    </section>
  )
}
