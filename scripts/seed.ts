const { PrismaClient } = require('@prisma/client');

const db = new PrismaClient();



async function main() {
  console.log(`Start seeding ...`);


  try {

    await db.category.createMany({
      data : [
        {name : "Music"},
        {name : "Photography"},
        {name : "Fitness"},
        {name : "Accounting"},
        {name : "Computer Science"},
        {name : "Filming"},
        {name : "Engineering"}
      ]
      
    })

    console.log("sucres")

  }  catch(e){
    console.log(e ,"error")


  } finally {
    await db.$disconnect()
  }

 

} 

main()