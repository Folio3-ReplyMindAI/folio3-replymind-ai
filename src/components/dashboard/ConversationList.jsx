import ConversationCard from "@/src/components/dashboard/ConversationCard";

const CONVERSATIONS = [
    {
        id: 1,
        name: "Elena Rodriguez",
        avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuDJgNkGu9f13YNDjyOV7n4N3g3wuQsgZwQswurvDhnDnT4C-rt01GDEkhxsy2GJ9oxYCoRwa_iEsYJ0cRRU8CsRuT4p7H4MGV88iNCYyEKV_arkqcftSQ582FR5e6KwqELe-afmOR0sR75PKQEfuTLO3gv9TxHvtohTcykPAcm2bghfGMAafdK0SCabWEBbbPm18x1rSrjebzZQu0OfPzmxew5-xN6YZdwO_RFa7kqFhxzxyDe8_GpsgQ7iqNs3n2xvzHrxlY1r11Q",
        time: "12:45 PM",
        preview: "Re: Consultation regarding project scope...",
        draft: "Hi Elena, that's perfect!...",
        email: "elena.r@agency.com",
        channel: "WEBSITE",
        messages: [
            { id: 1, from: "them", text: "Hello ReplyMind team, I was looking into your consulting services for our upcoming Q1 expansion. We need a clear timeline on the project scope and resource allocation. Do you have a standard deck or could we jump on a quick 15-minute call this Thursday afternoon?", time: "12:42 PM" },
            { id: 2, from: "me", text: "Hi Elena! Thanks for reaching out. We'd love to help with your expansion. I'm checking the team's availability for Thursday right now.", time: "12:44 PM" },
        ],
    },
];

export default function ConversationList({ onSelectChat }) {
    return (<section className="w-full h-full flex flex-col bg-surface/40 backdrop-blur-md overflow-hidden">
      <header className="px-gutter pt-gutter pb-md space-y-md w-full">
        <div className="flex items-center justify-between">
          <h2 className="font-headline-lg text-headline-lg text-on-surface">Conversations</h2>
          <button className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-surface-container transition-colors group">
            <span className="material-symbols-outlined group-hover:rotate-180">filter_list</span>
          </button>
        </div>
        <div className="relative group">
          <span className="material-symbols-outlined absolute left-sm top-1/2 -translate-y-1/2 text-on-surface-variant opacity-60 group-focus-within:text-primary transition-colors">search</span>
          <input className="w-full pl-xl pr-md py-sm bg-surface-container-low border border-outline-variant/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary transition-all font-body-sm" placeholder="Search chats..." type="text"/>
        </div>
      </header>
      <div className="flex-1 overflow-y-auto custom-scrollbar px-gutter pb-xl space-y-sm w-full">
        {CONVERSATIONS.map((chat) => (<ConversationCard key={chat.id} chat={chat} onSelect={onSelectChat} />))}
      </div>
    </section>);
}
