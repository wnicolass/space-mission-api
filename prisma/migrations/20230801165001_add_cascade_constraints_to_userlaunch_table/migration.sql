-- DropForeignKey
ALTER TABLE "UserLaunch" DROP CONSTRAINT "UserLaunch_launchId_fkey";

-- DropForeignKey
ALTER TABLE "UserLaunch" DROP CONSTRAINT "UserLaunch_userId_fkey";

-- AddForeignKey
ALTER TABLE "UserLaunch" ADD CONSTRAINT "UserLaunch_userId_fkey" FOREIGN KEY ("userId") REFERENCES "UserProfile"("userId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserLaunch" ADD CONSTRAINT "UserLaunch_launchId_fkey" FOREIGN KEY ("launchId") REFERENCES "Launch"("launchId") ON DELETE CASCADE ON UPDATE CASCADE;
