import { Link } from 'react-router-dom'
import Mach2Logo from './Mach2Logo'

export default function Nav() {
  return (
    <nav>
      <Link to="/" className="nav-logo">
        <Mach2Logo size={40} />
        <span style={{ color: 'var(--cyan)' }}>
          MaCh2<span style={{ color: 'var(--g500)' }}>.cloud</span>
        </span>
      </Link>

      <ul className="nav-links">
        <li><Link to="/">Home</Link></li>
        <li><a href="/#experience">Experience</a></li>
        <li className="nav-item has-dropdown">
          <span>Cases</span>
          <ul className="nav-dropdown">
            <li><Link to="/cases/case-01-capgemini-kubernetes">Case 01 — Kubernetes at Enterprise</Link></li>
            <li><Link to="/cases/case-02-aws-autonomous-driving">Case 02 — Autonomous Driving Platform</Link></li>
            <li><Link to="/cases/case-03-enterprise-saas-optimization">Case 03 — SaaS Optimization</Link></li>
            <li><Link to="/cases/case-04-baas-seed-startup">Case 04 — BaaS Startup to Production</Link></li>
          </ul>
        </li>
        <li><a href="/#portfolio">Portfolio</a></li>
        <li><Link to="/about">About</Link></li>
        <li><Link to="/blog">Blog</Link></li>
        <li><a href="/#connect">Connect</a></li>
      </ul>

      <a
        href="https://calendly.com/chriscloud-weber/30min"
        target="_blank"
        rel="noopener noreferrer"
        className="btn btn-p"
      >
        Get in touch
      </a>
    </nav>
  )
}
