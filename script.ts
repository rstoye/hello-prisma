import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient({ log: [{ level: "query", emit: "event" }] });
prisma.$on("query" as never, async (e: any) => {
  console.log(`Query: ${e.query}`);
  console.log(`Params: ${e.params}`);
});

async function main() {
  const allEvents = await prisma.event.findMany();
  if (allEvents.length === 0) {
    const events = await prisma.event.createMany({
      data: [
        { name: "Bowling", date: new Date(2022, 5, 10) },
        { name: "Dart", date: new Date(2022, 6, 10) },
        { name: "Bowling 2", date: new Date(2022, 5, 10) },
        { name: "Dart 2", date: new Date(2022, 8, 10) },
        { name: "Fencing", date: new Date(2022, 9, 10) },
      ],
    });
    console.log("events", events);
  }

  const someEvents = await prisma.event.findMany({
    where: { date: new Date(2022, 5, 10) },
  });

  console.log("someEvents", someEvents);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
