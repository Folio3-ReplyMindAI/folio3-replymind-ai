import Icon from "@/src/components/common/Icon";

function FooterCol({ title, links }) {
    return (<div className="flex flex-col gap-6">
      <span className="text-label-md text-text-primary">{title}</span>
      {links.map((l) => (<a key={l} href="#" className="text-body-sm text-text-secondary hover:text-accent transition-colors">
          {l}
        </a>))}
    </div>);
}

export default function Footer() {
    return (<footer className="w-full py-20 bg-surface-container border-t border-border">
      <div className="max-w-7xl mx-auto px-8 flex flex-col md:flex-row justify-between items-start gap-16">
        <div className="flex flex-col gap-8">
          <span className="text-headline-md hero-gradient-text">ReplyMind</span>
          <p className="text-body-sm text-text-secondary max-w-sm">
            Building the future of human-centric communication tools for high-performance
            teams who value their time.
          </p>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-16">
          <FooterCol title="Product" links={["Features", "Integrations", "Pricing"]}/>
          <FooterCol title="Legal" links={["Privacy Policy", "Terms of Service", "Security"]}/>
          <FooterCol title="Support" links={["Help Center", "Status", "Twitter"]}/>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-8 mt-20 pt-10 border-t border-border/30 flex justify-between items-center text-body-sm text-text-secondary opacity-80 flex-wrap gap-4">
        <p>&copy; 2024 ReplyMind Systems Inc. All rights reserved.</p>
        <div className="flex gap-3 items-center">
          <Icon name="public" className="text-sm"/>
          <span>English (US)</span>
        </div>
      </div>
    </footer>);
}
