import Link from 'next/link';
import Container from '@/components/layout/Container';
import Badge from '@/components/ui/Badge';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import { UsersIcon, CalendarIcon, ClipboardIcon } from '@/components/icons';

const FEATURES = [
  {
    icon: UsersIcon,
    title: 'Coach Management',
    description: 'View all coaches, their specialties, and availability in one place.',
  },
  {
    icon: CalendarIcon,
    title: 'Availability Tracking',
    description: 'See real-time availability and book sessions with available time slots.',
  },
  {
    icon: ClipboardIcon,
    title: 'Session Management',
    description: 'Create and manage training sessions, assign athletes, and track everything.',
  },
] as const;

export default function HomePage() {
  return (
    <>
      <div className="section-hero">
        <Container>
          <section className="pt-12 pb-16 md:pt-16 md:pb-20">
            <Badge className="mb-4">COACH SCHEDULING</Badge>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-5 tracking-tight">
              Schedule Training Sessions
              <br />
              <span className="text-[#FF6B35]">With Ease</span>
            </h1>
            <p className="text-lg text-gray-600 mb-8 max-w-2xl leading-relaxed">
              Connect coaches with athletes through an intuitive scheduling platform.
              Manage availability, book sessions, and streamline your training operations.
            </p>
            <div className="flex gap-4">
              <Link href="/coaches">
                <Button variant="primary">Browse Coaches</Button>
              </Link>
              <Link href="/sessions">
                <Button variant="secondary">View Sessions</Button>
              </Link>
            </div>
          </section>
        </Container>
      </div>

      <div className="section-features">
        <Container>
          <section className="py-12 md:py-16 pb-20">
            <div className="mb-10">
              <Badge className="mb-4">FEATURES</Badge>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3 tracking-tight">
                Everything You Need
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl leading-relaxed">
                Powerful tools to manage your coaching operations efficiently.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-5 md:gap-6">
              {FEATURES.map((feature) => (
                <Card key={feature.title} className="group">
                  <div className="w-11 h-11 bg-[#FF6B35]/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-[#FF6B35]/15">
                    <feature.icon className="w-5 h-5 text-[#FF6B35]" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{feature.description}</p>
                </Card>
              ))}
            </div>
          </section>
        </Container>
      </div>
    </>
  );
}
