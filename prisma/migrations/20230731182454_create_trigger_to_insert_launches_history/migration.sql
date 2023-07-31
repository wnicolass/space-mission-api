CREATE OR REPLACE FUNCTION insert_on_history()
RETURNS TRIGGER AS
$$
BEGIN
  IF (TG_OP = 'DELETE') THEN
    INSERT INTO public."LaunchesHistory"("id", "launchId", "userId", "launchDate")
    VALUES (gen_random_uuid (), OLD."launchId", OLD."userId", OLD."launchDate");
  END IF;
  RETURN OLD;
END;
$$
LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS insert_on_launches_history on public."UserLaunch";

CREATE TRIGGER insert_on_launches_history
  AFTER DELETE
  ON public."UserLaunch"
  FOR EACH ROW
  EXECUTE FUNCTION insert_on_history();
