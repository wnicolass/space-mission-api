-- CreateTable
CREATE TABLE "LaunchesHistory" (
    "id" TEXT NOT NULL,
    "launchId" VARCHAR(255) NOT NULL,
    "userId" VARCHAR(255) NOT NULL,
    "launchDate" DATE NOT NULL,

    CONSTRAINT "LaunchesHistory_pkey" PRIMARY KEY ("id")
);
