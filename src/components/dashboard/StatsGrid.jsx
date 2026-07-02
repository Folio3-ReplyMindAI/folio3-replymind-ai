import StatsCard from "@/src/components/dashboard/StatsCard";

export default function StatsGrid() {
    return (<section className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-gutter w-full">
      <StatsCard icon="mail" label="Total Messages" value="1,284" change="+12%" trend="up" spark={[8, 11, 9, 14, 12, 18, 22]} />
      <StatsCard icon="auto_awesome" label="AI Acceptance Rate" value="94.2%" change="+5.4%" trend="up" spark={[80, 83, 82, 88, 90, 92, 94]} stroke="var(--color-violet)" />
      <StatsCard icon="forward_to_inbox" label="Auto-replies" value="856" change="+42" trend="up" spark={[5, 7, 6, 9, 12, 11, 15]} stroke="#16a34a" />
      <StatsCard icon="bolt" label="Avg. Response" value="1.4s" change="-0.3s" trend="up" spark={[24, 20, 21, 17, 15, 14, 14]} stroke="var(--color-cyan)" />
    </section>);
}
