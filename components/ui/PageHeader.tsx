import Badge from './Badge';

interface PageHeaderProps {
  badge: string;
  title: string;
  description: string;
}

export default function PageHeader({ badge, title, description }: PageHeaderProps) {
  return (
    <div className="section-hero">
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        <section className="pt-10 pb-8 md:pt-12 md:pb-10">
          <Badge className="mb-3">{badge}</Badge>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3 tracking-tight">{title}</h1>
          <p className="text-base text-gray-600 max-w-xl leading-relaxed">{description}</p>
        </section>
      </div>
    </div>
  );
}

