-- CreateTable
CREATE TABLE "UserLaunch" (
    "userId" TEXT NOT NULL,
    "launchId" TEXT NOT NULL,
    "launchDate" DATE NOT NULL,

    CONSTRAINT "UserLaunch_pkey" PRIMARY KEY ("userId","launchId")
);

-- CreateTable
CREATE TABLE "Launch" (
    "launchId" TEXT NOT NULL,
    "mission" VARCHAR(255) NOT NULL,
    "rocket" VARCHAR(255) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "planetId" VARCHAR(255) NOT NULL,

    CONSTRAINT "Launch_pkey" PRIMARY KEY ("launchId")
);

-- CreateTable
CREATE TABLE "Planet" (
    "planetId" TEXT NOT NULL,
    "planetName" VARCHAR(255) NOT NULL,

    CONSTRAINT "Planet_pkey" PRIMARY KEY ("planetId")
);

-- AddForeignKey
ALTER TABLE "UserLaunch" ADD CONSTRAINT "UserLaunch_userId_fkey" FOREIGN KEY ("userId") REFERENCES "UserProfile"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserLaunch" ADD CONSTRAINT "UserLaunch_launchId_fkey" FOREIGN KEY ("launchId") REFERENCES "Launch"("launchId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Launch" ADD CONSTRAINT "Launch_planetId_fkey" FOREIGN KEY ("planetId") REFERENCES "Planet"("planetId") ON DELETE RESTRICT ON UPDATE CASCADE;
