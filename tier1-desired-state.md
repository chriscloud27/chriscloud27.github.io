# Tier 1 — Desired State for mach2.cloud
## Instructions for Copilot
Replace the three sections below in the existing site.
Match existing class naming conventions and CSS variables where possible.
Do not change navigation, footer, contact form, experience timeline, or awards section.

---

## SECTION 1 — Hero (replace existing hero block)

```html
<!-- HERO -->
<section id="header" class="hero">
  <div class="hero-content">

    <div class="hero-label">Principal AI-Native Platform Architect</div>

    <h1>
      Scalable AI SaaS infrastructure.<br>
      <em>Built for growth-stage velocity.</em>
    </h1>

    <p class="hero-sub">
      I design automated, secure, high-leverage cloud platforms that scale
      AI-native products from Series A to production — without architectural
      rewrites at every growth milestone.
    </p>

    <ul class="hero-proof">
      <li>
        <strong>2,500+</strong> engineers enabled on production cloud platforms
      </li>
      <li>
        <strong>90%+</strong> operational automation — reduced operational
        headcount dependency
      </li>
      <li>
        <strong>AWS Global Partner Award</strong> — platform delivery at
        1,700-engineer scale
      </li>
    </ul>

    <div class="hero-cta">
      <a href="https://calendly.com/chriscloud-weber/30min" class="btn btn-primary">
        Discuss Your Platform Architecture
      </a>
      <a href="#what-i-build" class="btn btn-secondary">
        See What I Build
      </a>
    </div>

    <div class="hero-meta">
      <span class="badge available">Available</span>
      <span>Remote · US / EU · Growth-Stage AI SaaS</span>
    </div>

  </div>

  <div class="hero-stats">
    <div class="stat">
      <span class="stat-number">13+</span>
      <span class="stat-label">Years designing cloud systems</span>
    </div>
    <div class="stat">
      <span class="stat-number">2,500</span>
      <span class="stat-label">Developers enabled</span>
    </div>
    <div class="stat">
      <span class="stat-number">90%</span>
      <span class="stat-label">Operational automation</span>
    </div>
    <div class="stat">
      <span class="stat-number">3</span>
      <span class="stat-label">AWS · GCP · Azure</span>
    </div>
  </div>
</section>
```

---

## SECTION 2 — "What I Build" (new section, insert after hero, before experience)

```html
<!-- WHAT I BUILD -->
<section id="what-i-build" class="what-i-build">
  <div class="section-header">
    <h2>What I <em>Build</em></h2>
    <p class="section-sub">
      I specialize in growth-stage AI SaaS environments — Series A to C — where
      platform architecture determines whether engineering velocity compounds or
      stalls. Each capability below is backed by a shipped system.
    </p>
  </div>

  <div class="build-grid">

    <div class="build-card">
      <div class="build-icon">⬡</div>
      <h3>Automated Kubernetes Platforms</h3>
      <p>
        Multi-tenant AKS/GKE platforms with self-service provisioning,
        namespace-level governance, and full IaC lifecycle. Scaled to 2,500
        developers with zero provisioning bottlenecks.
      </p>
      <span class="build-tag">Kubernetes · Terraform · OPA · Cilium</span>
    </div>

    <div class="build-card">
      <div class="build-icon">◈</div>
      <h3>AI Workload Infrastructure Pipelines</h3>
      <p>
        Inference-ready cloud architectures with latency-aware autoscaling,
        model serving pipelines, and cost-controlled GPU/CPU routing. Designed
        for production load, not demo conditions.
      </p>
      <span class="build-tag">Vertex AI · SageMaker · Kubernetes · Cost Architecture</span>
    </div>

    <div class="build-card">
      <div class="build-icon">◻</div>
      <h3>Secure-by-Design Cloud Guardrails</h3>
      <p>
        Security and compliance embedded at the infrastructure layer — not
        retrofitted. Policy-as-code, least-privilege IAM, and automated
        compliance drift detection. Built to survive enterprise sales cycles.
      </p>
      <span class="build-tag">OPA · IAM · Policy-as-Code · Compliance Automation</span>
    </div>

    <div class="build-card">
      <div class="build-icon">⟳</div>
      <h3>High-Velocity CI/CD Ecosystems</h3>
      <p>
        GitOps-driven delivery pipelines with automated environment
        provisioning, progressive deployment, and rollback-safe release
        strategies. Reduced deployment cycle time by 60%+ on prior platforms.
      </p>
      <span class="build-tag">GitOps · ArgoCD · GitHub Actions · Terraform</span>
    </div>

    <div class="build-card">
      <div class="build-icon">△</div>
      <h3>Platform Systems That Scale Without Headcount</h3>
      <p>
        Developer self-service, automated runbooks, and operational abstraction
        layers that let small infra teams support large engineering organisations.
        90%+ automation achieved on production CDN and Kubernetes platforms.
      </p>
      <span class="build-tag">Internal Developer Platform · Automation · SRE Patterns</span>
    </div>

    <div class="build-card">
      <div class="build-icon">◎</div>
      <h3>Cloud Cost Architecture</h3>
      <p>
        Cost modeled as an architectural variable from day one — not an
        afterthought. Unit economics aligned to revenue growth, automated
        cost anomaly detection, and rightsizing built into the platform lifecycle.
      </p>
      <span class="build-tag">FinOps · Cost Attribution · Cloud Unit Economics</span>
    </div>

  </div>
</section>
```

---

## SECTION 3 — Portfolio / Case Studies (replace existing portfolio section)

```html
<!-- PORTFOLIO -->
<section id="portfolio" class="portfolio">
  <div class="section-header">
    <h2>Architecture <em>that shipped.</em></h2>
    <p class="section-sub">
      Real systems. Real constraints. Each case includes the architecture
      decision reasoning — not just the outcome.
    </p>
  </div>

  <!-- CASE 01 -->
  <div class="case-study">
    <div class="case-meta">
      <span class="case-number">Case 01</span>
      <div class="case-tags">
        <span>Azure Kubernetes</span>
        <span>Multi-Tenancy</span>
        <span>Platform Engineering</span>
        <span>IaC</span>
        <span>Governance</span>
        <span>Microsoft</span>
      </div>
    </div>

    <h3>Cloud Infrastructure Powering Enterprise Development at Scale</h3>
    <p class="case-context">Capgemini × Microsoft · Enterprise · 2,500+ engineers · Global distributed teams</p>

    <div class="case-body">
      <div class="case-col">
        <h4>Problem</h4>
        <p>
          A global engineering organisation needed a unified Kubernetes platform
          supporting thousands of developers across distributed teams. The
          constraint was not technical capability — it was governance at scale.
          Each team operating independently created provisioning bottlenecks,
          inconsistent security posture, and no shared cost visibility.
        </p>

        <h4>Architecture Decision</h4>
        <p>
          We chose multi-tenant AKS over separate clusters per team because
          governance complexity was the binding constraint, not cost isolation.
          The trade-off was blast radius risk, mitigated through namespace-level
          RBAC, OPA policy enforcement, and network policy segmentation.
          Infrastructure was fully codified in Terraform with a self-service
          provisioning layer — teams could create environments without opening
          a ticket. Co-authored the platform design guidance published externally
          as a Microsoft reference model.
        </p>

        <h4>Stack</h4>
        <p>Azure Kubernetes Service · Terraform · OPA/Gatekeeper · Azure Policy · Helm · Jenkins · Azure Monitor</p>
      </div>

      <div class="case-col">
        <h4>Outcome</h4>
        <ul class="case-outcomes">
          <li>Platform scaled to <strong>2,500 developers</strong></li>
          <li>Provisioning friction eliminated via self-service IaC layer</li>
          <li>Architecture guidance published externally as Microsoft enterprise reference model</li>
          <li>Kubernetes know-how scaled to <strong>300+ architects</strong></li>
        </ul>

        <h4>What I'd Improve Today</h4>
        <p>
          I'd introduce Cilium network policies from day one rather than
          retrofitting them at scale. The security model becomes significantly
          cleaner when identity-aware networking is structural. I'd also
          instrument FinOps attribution at the namespace level earlier —
          cost visibility per team compresses cloud waste faster than any
          rightsizing exercise after the fact.
        </p>
      </div>
    </div>
  </div>

  <!-- CASE 02 -->
  <div class="case-study">
    <div class="case-meta">
      <span class="case-number">Case 02</span>
      <div class="case-tags">
        <span>AWS</span>
        <span>Data Pipelines</span>
        <span>Reliability Engineering</span>
        <span>Self-Service Infra</span>
        <span>AWS Partner Award</span>
      </div>
    </div>

    <h3>Award-Winning Cloud Platform — Autonomous Driving</h3>
    <p class="case-context">AWS · Automotive · 1,700 engineers · Mission-critical workloads · Strict compliance</p>

    <div class="case-body">
      <div class="case-col">
        <h4>Problem</h4>
        <p>
          Autonomous vehicle development generates extreme data volumes at
          irregular velocity — sensor data, simulation runs, model training
          jobs — all requiring strict processing guarantees and compliance
          across a distributed team of 1,700 engineers. The architecture had
          to handle production throughput without slowing development cycles.
        </p>

        <h4>Architecture Decision</h4>
        <p>
          AWS was the primary cloud for this platform given the ecosystem
          depth for ML workloads and existing vendor relationships. The core
          decision was to build a self-service developer layer on top of the
          data infrastructure rather than centralising pipeline management —
          teams needed autonomy to define their own ingestion and processing
          jobs without creating infrastructure bottlenecks. Automated
          provisioning ensured compliance guardrails were enforced without
          slowing delivery.
        </p>

        <h4>Stack</h4>
        <p>AWS (S3 · EC2 · EKS · Lambda · SageMaker) · Terraform · CloudFormation · AWS IAM · CloudWatch · Data Pipeline automation</p>
      </div>

      <div class="case-col">
        <h4>Outcome</h4>
        <ul class="case-outcomes">
          <li>Platform enabled <strong>1,700 engineers</strong> with no delivery bottlenecks</li>
          <li>High-throughput data pipelines operational at production scale</li>
          <li>Recognised with the <strong>AWS Global Partner Award</strong> for outstanding cloud platform delivery</li>
        </ul>

        <h4>What I'd Improve Today</h4>
        <p>
          The observability layer was added iteratively rather than designed
          upfront. For AI/ML workloads especially, I'd now instrument model
          serving latency, pipeline throughput, and cost-per-inference from
          the first deployment — not after performance issues surface. Reactive
          observability in production AI systems is an expensive lesson.
        </p>
      </div>
    </div>
  </div>

  <!-- CASE 03 -->
  <div class="case-study">
    <div class="case-meta">
      <span class="case-number">Case 03</span>
      <div class="case-tags">
        <span>Architecture Audit</span>
        <span>Cost Optimisation</span>
        <span>International Rollout</span>
        <span>Automation</span>
        <span>SaaS</span>
      </div>
    </div>

    <h3>Platform Optimisation — 40% Sales Efficiency Improvement</h3>
    <p class="case-context">Enterprise SaaS · International rollout · Cloud cost exceeding revenue growth</p>

    <div class="case-body">
      <div class="case-col">
        <h4>Problem</h4>
        <p>
          A SaaS company experiencing declining sales efficiency traced the
          root cause to platform performance degradation and operational
          complexity accumulating under international rollout pressure.
          Cloud cost was growing faster than revenue with no cost attribution
          model in place. Engineering was firefighting instead of shipping.
        </p>

        <h4>Architecture Decision</h4>
        <p>
          The audit surfaced three distinct failure modes: unattributed cloud
          spend across regions, a deployment pipeline with no environment
          parity between staging and production, and a database layer not
          designed for multi-region read patterns. The rebuild prioritised
          automation-first operations and cost attribution per customer segment
          before addressing scale — fixing the visibility problem first made
          every subsequent architectural decision cheaper and faster.
        </p>

        <h4>Stack</h4>
        <p>AWS Amplify · Terraform · GitHub Actions · CloudWatch · Cost Explorer · Multi-region RDS · CDN optimisation</p>
      </div>

      <div class="case-col">
        <h4>Outcome</h4>
        <ul class="case-outcomes">
          <li>Sales efficiency improved by <strong>40%</strong> following optimisation</li>
          <li>Cloud cost realigned to revenue with per-segment attribution</li>
          <li>International rollout unblocked across five countries</li>
          <li>Engineering team returned to product delivery velocity</li>
        </ul>

        <h4>What I'd Improve Today</h4>
        <p>
          I'd run the cost attribution model before any architectural changes —
          not in parallel. Teams move faster when they can see the financial
          impact of infrastructure decisions in real time. On this engagement,
          cost visibility came two weeks after the architectural changes began,
          which meant some optimisations were sequenced suboptimally.
        </p>
      </div>
    </div>
  </div>

  <!-- CASE 04 -->
  <div class="case-study">
    <div class="case-meta">
      <span class="case-number">Case 04</span>
      <div class="case-tags">
        <span>AWS Amplify</span>
        <span>BaaS</span>
        <span>Startup Architecture</span>
        <span>Developer Experience</span>
        <span>Seed Stage</span>
      </div>
    </div>

    <h3>BaaS Platform — Seed Startup to Production</h3>
    <p class="case-context">Seed-Stage SaaS · 5-engineer team · Zero budget for over-engineering · Series A readiness required</p>

    <div class="case-body">
      <div class="case-col">
        <h4>Problem</h4>
        <p>
          A seed-stage SaaS startup needed to move from prototype to
          production-grade backend infrastructure within weeks — not months.
          The team had no dedicated infrastructure engineer. The constraint was
          not ambition but resource reality: any architecture decision that
          required ongoing ops overhead was a non-starter.
        </p>

        <h4>Architecture Decision</h4>
        <p>
          We chose AWS Amplify Backend-as-a-Service deliberately, accepting
          reduced infrastructure control in exchange for operational simplicity
          and developer autonomy. This was not a default choice — it was a
          trade-off made explicit. The decision criteria: time-to-market
          velocity at seed stage outweighs infrastructure sovereignty. The
          architecture was designed with a clear upgrade path — the BaaS
          abstraction layer was documented so that a future infrastructure
          engineer could migrate to a custom Kubernetes layer at Series A
          without a full rewrite.
        </p>

        <h4>Stack</h4>
        <p>AWS Amplify · AppSync (GraphQL) · DynamoDB · Cognito · Lambda · S3 · CloudFront</p>
      </div>

      <div class="case-col">
        <h4>Outcome</h4>
        <ul class="case-outcomes">
          <li>Time-to-market significantly accelerated — weeks, not months</li>
          <li>Developer experience and team autonomy measurably improved</li>
          <li>Platform foundation built to scale beyond seed stage</li>
          <li>Upgrade path to custom infrastructure documented for Series A</li>
        </ul>

        <h4>What I'd Improve Today</h4>
        <p>
          I'd formalise the architectural decision record (ADR) earlier — a
          written record of why BaaS was chosen, what was traded off, and
          what the migration trigger conditions are. Seed-stage teams move fast
          and lose context. When the Series A infrastructure hire arrives six
          months later, they need to understand the reasoning, not just
          reverse-engineer the implementation.
        </p>
      </div>
    </div>
  </div>

</section>
```

---

## CSS additions needed (append to existing stylesheet)

```css
/* HERO — updated */
.hero-label {
  font-size: 0.85rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: #00E5FF;
  margin-bottom: 1rem;
}

.hero-proof {
  list-style: none;
  padding: 0;
  margin: 1.5rem 0 2rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.hero-proof li {
  font-size: 0.95rem;
  color: rgba(255,255,255,0.75);
  padding-left: 1.2rem;
  position: relative;
}

.hero-proof li::before {
  content: '—';
  position: absolute;
  left: 0;
  color: #00E5FF;
}

.hero-cta {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  margin-bottom: 1.5rem;
}

.hero-meta {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-size: 0.85rem;
  color: rgba(255,255,255,0.5);
}

/* WHAT I BUILD */
.what-i-build {
  padding: 5rem 2rem;
  background: #fff;
}

.build-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
  margin-top: 2.5rem;
}

.build-card {
  border: 1px solid rgba(11,31,58,0.1);
  border-radius: 8px;
  padding: 1.75rem;
  transition: border-color 0.2s, box-shadow 0.2s;
}

.build-card:hover {
  border-color: #00E5FF;
  box-shadow: 0 4px 20px rgba(0,229,255,0.08);
}

.build-icon {
  font-size: 1.5rem;
  color: #00E5FF;
  margin-bottom: 1rem;
}

.build-card h3 {
  font-size: 1rem;
  font-weight: 600;
  color: #0B1F3A;
  margin-bottom: 0.75rem;
}

.build-card p {
  font-size: 0.9rem;
  color: #444;
  line-height: 1.6;
  margin-bottom: 1rem;
}

.build-tag {
  font-size: 0.75rem;
  color: #0B1F3A;
  opacity: 0.5;
  font-family: 'JetBrains Mono', monospace;
}

/* CASE STUDIES — expanded */
.case-study {
  border-top: 1px solid rgba(11,31,58,0.1);
  padding: 3rem 0;
}

.case-study:last-child {
  border-bottom: 1px solid rgba(11,31,58,0.1);
}

.case-context {
  font-size: 0.85rem;
  color: #888;
  margin-bottom: 1.5rem;
  font-family: 'JetBrains Mono', monospace;
}

.case-body {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3rem;
  margin-top: 1.5rem;
}

@media (max-width: 768px) {
  .case-body {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
}

.case-col h4 {
  font-size: 0.75rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: #00E5FF;
  margin-bottom: 0.5rem;
  margin-top: 1.5rem;
}

.case-col h4:first-child {
  margin-top: 0;
}

.case-col p {
  font-size: 0.9rem;
  color: #333;
  line-height: 1.7;
}

.case-outcomes {
  padding-left: 1rem;
  margin: 0;
}

.case-outcomes li {
  font-size: 0.9rem;
  color: #333;
  line-height: 1.7;
  margin-bottom: 0.4rem;
}
```
