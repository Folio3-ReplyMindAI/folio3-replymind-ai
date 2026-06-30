import StatsCard from "@/src/components/dashboard/StatsCard";

export default function StatsGrid() {
    return (<section className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-gutter w-full">
      <StatsCard icon="mail" label="Total Messages" value="1,284" change="+12%" variant="green" />
      <StatsCard icon="auto_awesome" label="AI Acceptance Rate" value="94.2%" change="+5.4%" variant="orange" />
      <StatsCard icon="forward_to_inbox" label="Auto-replies" value="856" change="+42" variant="tertiary" />
      <StatsCard icon="bolt" label="System Status" value="Healthy" change="Active" variant="green" />
    </section>);
}
