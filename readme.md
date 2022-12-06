# Övning

Detta är ett API för att registrera träningstillfällen. Dessa sparas i en mongo-databas. När man hämtar ett träningstillfälle, hämtas automatiskt vädret för den tidpunkten via ett väder-api.

**Kom igång**

För att kunna köra api:ets kod måste MongoDB finnas installerat eller via Docker.

Starta med docker:

```sh
docker run -d --name mongo-on-docker  -p 27017:27017 mongo
```

---

**1. Refaktorisering**

- Dela upp så att app.ts är en egen fil som importeras från server.ts
- Flytta ut alla databasanrop till en egen fil och exportera ut funktionerna createExercise, getExerciseById och getAllExercises
- Flytta ut anropet för weather-data till en egen fil och exportera ut funktioner som kan anropas

---

**2. Dependency injection**

- Wrappa app i en funktion - makeApp - som används istället i server.ts
- Skicka in createExercise, getExerciseById och getAllExercises via dependency injection

---

**3. app.spec.ts**

- Skapa en app.spec.ts
- Skapa jest.fn() för funktionerna som skapar mockvarianter av createExercise, getExerciseById och getAllExercises
- Använd mockfunktionerna och makeApp för att skapa en testversion av app

---

**3. Validering**

- Skapa tester för att skicka in rätt data och felaktig data (expecta statuskod 200 resp. 400)
- Skriv kod för validering tills testerna är gröna

---

**4. nock**

- Installera nock och mocka api-anropet mot weather-api

---

**5. Fler tester**

- Skapa 3 testsviter - en för varje api-endpoint
- Kom på passande tester och lägg in i testsviterna

---

**6. Test coverage**

- Kör jest och visa upp test coverage report
- Är det några tester som saknas?
- Skriv ytterligare tester för att förbättra test coverage

---

**7. Extra**

- Se till att även GET /exercise får med väderdata på alla som returneras i listan
  - Tänk på DRY!
- Vidareutveckla väderfunktionen så att hänsyn tas till aktivitetens verkliga datum
- Utöka så man kan posta in longitud och latitud när man lägger till en aktivitet
- Skicka med aktivitetens riktiga longitud och latitud när man hämtar väder

---