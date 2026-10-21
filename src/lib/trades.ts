import type { Metadata } from "next";

export type Trade = {
  path: string;
  label: string;
  eyebrow: string;
  title: string;
  h1: string;
  lede: string;
  texts: string[];
  quote: { item: string; amount: string }[];
  total: string;
  differentTitle: string;
  different: string[];
  faq: { question: string; answer: string }[];
};

const priceQuestion = {
  question: "Does Gus quote my price?",
  answer: "No. Gus never names a price in chat. You approve every quote before it goes out.",
};

const softwareQuestion = {
  question: "Do I need to learn new software?",
  answer: "No. You text Gus, the same way you text anyone.",
};

export const trades = {
  houseCleaning: {
    path: "/house-cleaning",
    label: "House cleaning",
    eyebrow: "For house cleaners",
    title: "For House Cleaning Businesses: Run It From Your Phone",
    h1: "Run your cleaning business from your phone, not a spreadsheet.",
    lede: "Most of your day is on a client's floor, not at a computer. Gus takes new cleaning requests from your website, texts you the details, and waits for your OK before anything is booked. Then you manage the week by text.",
    texts: [
      "What's my week look like?",
      "Block off Thursday afternoon. Dentist.",
      "Who still owes me for last month?",
      "Daniel paid invoice LL-1036 by check today.",
    ],
    quote: [
      { item: "Standard clean, 3 bed / 2 bath", amount: "$160" },
      { item: "Inside oven", amount: "$35" },
      { item: "Inside fridge", amount: "$25" },
    ],
    total: "$220",
    differentTitle: "What's different about cleaning",
    different: [
      "Most of your work is repeat clients on a set day, so the first booking matters less than keeping the weekly slots full and tracking who has paid.",
      "Access details (a gate code, a pet, a key under the mat) belong in the request, so you are not hunting through texts on the way to the door.",
    ],
    faq: [
      {
        question: "Can customers book recurring weekly or biweekly visits?",
        answer: "They send a request; you approve it by text. Recurring schedules are managed by you.",
      },
      priceQuestion,
      {
        question: "What if a client wants to skip a week?",
        answer: "They message; you handle it. Automatic rescheduling is not built yet.",
      },
      softwareQuestion,
    ],
  },
  handyman: {
    path: "/handyman",
    label: "Handyman",
    eyebrow: "For handymen",
    title: "For Handyman Businesses: Answer Every Small-Job Request",
    h1: "Answer every small-job request before you finish the one you're on.",
    lede: "A handyman's day is ten different jobs, and most requests arrive while you are up a ladder. Gus collects what the customer needs from your website, texts you a short summary, and holds the request until you say yes or no.",
    texts: [
      "What needs my OK today?",
      "Approve the Alvarez request for Tuesday.",
      "Send the quote to Jordan.",
      "Who still owes me money?",
    ],
    quote: [
      { item: "Replace bathroom faucet", amount: "$120" },
      { item: "Repair two sections of fence", amount: "$180" },
      { item: "Mount TV and hide cable", amount: "$90" },
    ],
    total: "$390",
    differentTitle: "What's different about handyman work",
    different: [
      "One visit often covers several unrelated small jobs, so the quote is a list of line items and not a single price.",
      'Customers often add "can you also..." later. Each request arrives as its own text, so nothing gets lost between jobs.',
    ],
    faq: [
      {
        question: "Can customers describe the job in detail?",
        answer:
          "They describe the job in the website chat, and you get the details by text before you approve anything.",
      },
      priceQuestion,
      {
        question: "What if a job needs a second visit?",
        answer: "You approve or decline each request as it comes in and can block time off by text.",
      },
      softwareQuestion,
    ],
  },
  plumbing: {
    path: "/plumbing",
    label: "Plumbing",
    eyebrow: "For plumbers",
    title: "For Plumbers: Never Lose a Job While You're Under a Sink",
    h1: "Never lose a job because you were under a sink when the request came in.",
    lede: "Plumbing requests come at all hours, and the customer calls the next company if nobody answers. Gus takes the request from your website at any hour, gets the details, and texts you right away. You decide what to take and when.",
    texts: [
      "What needs my OK?",
      "Approve the Patel request for tomorrow morning.",
      "Block off Friday. Taking the day off.",
      "Marked invoice 1042 paid, check.",
    ],
    quote: [
      { item: "Diagnose slow kitchen drain", amount: "$95" },
      { item: "Clear drain line", amount: "$175" },
      { item: "Replace P-trap", amount: "$60" },
    ],
    total: "$330",
    differentTitle: "What's different about plumbing",
    different: [
      "The real job often shows up only once the pipe is opened, so the quote can change. Quotes wait for your OK, and you decide what the customer sees.",
      "After-hours requests wait for you with the details, and you see them by text the moment they arrive. Gus does not dispatch or promise a response time.",
    ],
    faq: [
      {
        question: "Can Gus handle emergencies?",
        answer:
          "Gus takes the request and texts you immediately. It does not dispatch anyone or promise a response time. You decide.",
      },
      priceQuestion,
      {
        question: "What if the job changes once I'm on site?",
        answer: "You control the quote. Nothing is sent without your OK.",
      },
      softwareQuestion,
    ],
  },
  painting: {
    path: "/painting",
    label: "Painting",
    eyebrow: "For painters",
    title: "For Painters: Multi-Day Jobs, Quotes and Payments by Text",
    h1: "Keep multi-day jobs, quotes and payments straight without paperwork.",
    lede: "A painting job runs over several days, weather moves it, and the quote has to list prep, paint and coats. Gus takes the request from your website, texts you the details, and holds the quote until you approve it. Then you track the job and who has paid, by text.",
    texts: [
      "What's my week look like?",
      "Block off Wednesday and Thursday. Rain.",
      "Send the quote to Ms. Kim.",
      "Who still owes me money?",
    ],
    quote: [
      { item: "Prep and patch, living room and hallway", amount: "$400" },
      { item: "Two coats, walls", amount: "$900" },
      { item: "Trim and doors", amount: "$350" },
    ],
    total: "$1,650",
    differentTitle: "What's different about painting",
    different: [
      "Jobs span days, so blocking time off, including several days in a row, is something you do often. You can do it by text.",
      "Quotes are bigger and the customer thinks about them longer. A quote link the customer can open, accept or decline at their own pace suits that.",
    ],
    faq: [
      {
        question: "Can I block several days at once?",
        answer: 'Yes. Text it the way you would say it, like "block off Wednesday and Thursday."',
      },
      priceQuestion,
      {
        question: "What if the customer wants to accept later?",
        answer:
          "They get a link to see the quote and accept or decline when ready, with no account needed.",
      },
      softwareQuestion,
    ],
  },
  hvac: {
    path: "/hvac",
    label: "HVAC",
    eyebrow: "For HVAC",
    title: "For HVAC Businesses: Handle the Busy Season by Text",
    h1: "Handle the first hot week of summer without losing your evenings.",
    lede: "Heating and cooling work comes in waves. One heat wave fills your calendar and your phone at the same time. Gus takes requests from your website around the clock, texts you the details, and holds everything until you approve it.",
    texts: [
      "What needs my OK?",
      "Approve the Nguyen request for Monday.",
      "Block off Saturday afternoon.",
      "Who still owes me money?",
    ],
    quote: [
      { item: "Seasonal tune-up, one system", amount: "$140" },
      { item: "Replace capacitor", amount: "$210" },
      { item: "Replace air filter", amount: "$30" },
    ],
    total: "$380",
    differentTitle: "What's different about HVAC",
    different: [
      "Demand spikes in a few weeks of the year. Seeing every pending request in one text, and approving or declining each one, keeps a busy week from getting away from you.",
      "Many customers are repeat, with a yearly tune-up. Knowing who is paid up and who is not matters before you book their next visit.",
    ],
    faq: [
      {
        question: "Can Gus handle a no-heat or no-cool emergency?",
        answer:
          "Gus takes the request and texts you immediately. It does not dispatch anyone or promise a response time. You decide.",
      },
      priceQuestion,
      {
        question: "Can Gus set up yearly maintenance visits?",
        answer: "Customers send requests and you approve them. Automatic recurring plans are not built yet.",
      },
      softwareQuestion,
    ],
  },
} satisfies Record<string, Trade>;

/** Every trade page as peers (Concord's "Who we help"), landscapers included. */
export const whoWeHelp = [
  { label: trades.handyman.label, href: trades.handyman.path },
  { label: trades.houseCleaning.label, href: trades.houseCleaning.path },
  { label: trades.hvac.label, href: trades.hvac.path },
  { label: "Landscaping", href: "/landscapers" },
  { label: trades.painting.label, href: trades.painting.path },
  { label: trades.plumbing.label, href: trades.plumbing.path },
];

export const larkspurExampleLine =
  "Larkspur is a made-up landscaping company. Gus works the same way for any trade.";

export function tradeMetadata(trade: Trade): Metadata {
  return { title: trade.title, description: trade.lede, alternates: { canonical: trade.path } };
}
